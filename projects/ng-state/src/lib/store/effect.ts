import { inject, DestroyRef } from '@angular/core';
import { combineLatest, distinctUntilChanged, startWith, Observable, pairwise, debounceTime } from 'rxjs';
import { Store } from './store';

type WatchResult<T> = {
    oldValue: T | undefined;
    newValue: T | undefined;
    hasChanges: boolean;
};

type NestedWatchResult<T> = {
    [K in keyof T]?: T[K] extends object ? NestedWatchResult<T[K]> : WatchResult<T[K]>;
};

type EffectsCallback<T = any> = (changes: NestedWatchResult<T>) => void;

export function createEffect<T>(sources: Observable<T>[], callback: EffectsCallback<T>, options?: { debounceTime: number }): void;
export function createEffect<T>(store: Store<T>, paths: (string | string[])[], callback: EffectsCallback<T>, options?: { debounceTime: number }): void;
export function createEffect<T>(
    storeOrSources: Store<T> | Observable<T>[],
    pathsOrCallback: (string | string[])[] | EffectsCallback<T>,
    callbackOrOptions?: EffectsCallback<T> | { debounceTime?: number },
    options?: { debounceTime: number },
): void {
    const destroyRef = inject(DestroyRef);

    let observables: Observable<any>[] = [];
    let callback: EffectsCallback<T>;
    let debounceMs = 200;

    if (typeof callbackOrOptions === 'function') {
        callback = callbackOrOptions;
        debounceMs = options?.debounceTime ?? debounceMs;
    } else {
        callback = pathsOrCallback as EffectsCallback<T>;
        debounceMs = callbackOrOptions?.debounceTime ?? debounceMs;
    }


    if (Array.isArray(storeOrSources) && typeof pathsOrCallback === 'function') {
        // Mode 1: array of observables
        observables = (storeOrSources as Observable<T>[]).map(obs =>
            obs.pipe(
                startWith(undefined),
                debounceTime(debounceMs),
                distinctUntilChanged()
            )
        );
    } else if (storeOrSources instanceof Store && Array.isArray(pathsOrCallback)) {
        // Mode 2: store + paths
        const store: Store<T> = storeOrSources;
        const paths: (string | string[])[] = pathsOrCallback;

        observables = paths.map((path) => {
            const pathArray = typeof path === 'string' ? path.split('/') : path;
            const initialValue = pathArray.reduce((acc: any, key: string | number) => acc?.[key], store.snapshot());
            return store.select(pathArray).pipe(
                startWith(initialValue),
                debounceTime(debounceMs),
                distinctUntilChanged()
            );
        });
    } else {
        throw new Error('Invalid arguments passed to createEffect');
    }

    const subscription = combineLatest(observables).pipe(pairwise()).subscribe(([previous, current]) => {
        let hasAnyChange = false;
        const result: any = {};

        current.forEach((newValue, i) => {
            const oldValue = previous[i];
            const hasChanges = oldValue !== newValue;
            if (hasChanges) hasAnyChange = true;

            if (storeOrSources instanceof Store) {
                const rawPath = (pathsOrCallback as (string | string[])[])[i];
                const pathArray = typeof rawPath === 'string' ? rawPath.split('/') : rawPath;
                setNested(result, pathArray, { oldValue, newValue, hasChanges });
            } else {
                result[`obs${i}`] = { oldValue, newValue, hasChanges };
            }
        });

        if (hasAnyChange) {
            callback(result as NestedWatchResult<T>);
        }
    });

    destroyRef.onDestroy(() => subscription.unsubscribe());
}

function setNested(obj: any, path: (string | number)[], value: any) {
    let current = obj;
    path.forEach((key, index) => {
        if (index === path.length - 1) {
            current[key] = value;
        } else {
            if (!current[key]) current[key] = {};
            current = current[key];
        }
    });
}
