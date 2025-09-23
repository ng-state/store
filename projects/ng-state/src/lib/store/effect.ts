import { inject, DestroyRef } from '@angular/core';
import { combineLatest, distinctUntilChanged, startWith, Observable, pairwise } from 'rxjs';
import { Store } from './store';

// Leaf result type
export type WatchResult<T> = {
    oldValue: T | undefined;
    newValue: T | undefined;
    hasChanges: boolean;
};

// Nested result type, recursively applies WatchResult to object leaves
export type NestedWatchResult<T> = {
    [K in keyof T]?: T[K] extends object ? NestedWatchResult<T[K]> : WatchResult<T[K]>;
};

// Effect callback receives a nested result
export type EffectsCallback<T = any> = (changes: NestedWatchResult<T>) => void;

export function createEffect<T>(sources: Observable<T>[], callback: EffectsCallback<T>): void;
export function createEffect<T>(store: Store<T>, paths: (string | string[])[], callback: EffectsCallback<T>): void;
export function createEffect<T>(
    storeOrSources: Store<T> | Observable<T>[],
    pathsOrCallback: (string | string[])[] | EffectsCallback<T>,
    maybeCallback?: EffectsCallback<T>
): void {
    const destroyRef = inject(DestroyRef);

    let observables: Observable<any>[] = [];
    let callback: EffectsCallback<T>;

    if (Array.isArray(storeOrSources) && typeof pathsOrCallback === 'function') {
        // Mode 1: array of observables
        observables = (storeOrSources as Observable<T>[]).map((obs) =>
            obs.pipe(
                startWith(undefined),
                distinctUntilChanged()
            )
        );
        callback = pathsOrCallback as EffectsCallback<T>;
    } else if (storeOrSources instanceof Store && Array.isArray(pathsOrCallback) && typeof maybeCallback === 'function') {
        // Mode 2: store + paths
        const store: Store<T> = storeOrSources;
        const paths: (string | string[])[] = pathsOrCallback;
        callback = maybeCallback as EffectsCallback<T>;

        observables = paths.map((path) => {
            const pathArray = typeof path === 'string' ? path.split('/') : path;
            const initialValue = pathArray.reduce((acc: any, key: string | number) => acc?.[key], store.snapshot());
            return store.select(pathArray).pipe(
                startWith(initialValue),
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
