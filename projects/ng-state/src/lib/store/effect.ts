import { inject, DestroyRef, Injector } from '@angular/core';
import {
    combineLatest,
    distinctUntilChanged,
    startWith,
    Observable,
    pairwise,
    debounceTime,
} from 'rxjs';
import { Store } from './store';

// ------------------------------
// Core Types
// ------------------------------

export type WatchResult<T> = {
    oldValue: T | undefined;
    newValue: T | undefined;
    hasChanges: boolean;
};

export type NestedWatchResult<T> = {
    [K in keyof T]?: T[K] extends object
    ? NestedWatchResult<T[K]>
    : WatchResult<T[K]>;
};

// ------------------------------
// Path-based Type Utils
// ------------------------------

export type PathArray = readonly (string | number)[];

// Split "a/b/c" → ["a","b","c"]
export type SplitPath<S extends string> =
    S extends `${infer Head}/${infer Tail}`
    ? [Head, ...SplitPath<Tail>]
    : [S];

// Build a NestedWatchResult tree containing only selected paths
export type DeepPartialAtPath<T, P extends readonly (string | number)[]> =
    P extends [infer Head, ...infer Rest]
    ? Head extends keyof T
    ? {
        [K in Head]:
        Rest extends []
        ? WatchResult<NonNullable<T[Head]>> // ✅ leaf non-nullable
        : DeepPartialAtPath<
            NonNullable<T[Head]>,
            Extract<Rest, readonly (string | number)[]>
        >;
    }
    : unknown
    : WatchResult<NonNullable<T>>;


type FlattenWatchResult<Root, Paths extends (string | PathArray)[]> =
    UnionToIntersection<
        Paths[number] extends infer P
        ? P extends string
        ? DeepPartialAtPath<Root, SplitPath<P>>
        : P extends PathArray
        ? DeepPartialAtPath<Root, P>
        : never
        : never
    >;
// Helper to turn union into intersection
type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

// ------------------------------
// Effect Function Overloads
// ------------------------------

type EffectsCallback<T = any> = (changes: NestedWatchResult<T>) => void;

// Mode 1: array of observables
export function createEffect<T, R = T>(
    sources: Observable<T>[],
    callback: EffectsCallback<R>,
    options?: { debounceTime?: number; destroyRef?: DestroyRef }
): void;

// Mode 2: store + paths (type-safe!)
export function createEffect<
    T,
    const P extends (string | PathArray)[]
>(
    store: Store<T>,
    paths: P,
    callback: (result: FlattenWatchResult<T, P>) => void,
    options?: { debounceTime?: number; destroyRef?: DestroyRef }
): void;

// ------------------------------
// Implementation
// ------------------------------

export function createEffect<T, R = T>(
    storeOrSources: Store<T> | Observable<T>[],
    pathsOrCallback: (string | string[])[] | EffectsCallback<R>,
    callbackOrOptions?: EffectsCallback<R> | { debounceTime?: number },
    options?: { debounceTime?: number; destroyRef?: DestroyRef },
): void {
    const destroyRef = options?.destroyRef ? options.destroyRef : inject(DestroyRef);

    let observables: Observable<any>[] = [];
    let callback: EffectsCallback<R>;
    let debounceMs = 200;

    if (typeof callbackOrOptions === 'function') {
        callback = callbackOrOptions;
        debounceMs = options?.debounceTime ?? debounceMs;
    } else {
        callback = pathsOrCallback as EffectsCallback<R>;
        debounceMs = callbackOrOptions?.debounceTime ?? debounceMs;
    }

    if (Array.isArray(storeOrSources) && typeof pathsOrCallback === 'function') {
        // Mode 1: array of observables
        observables = (storeOrSources as Observable<T>[]).map(obs =>
            obs.pipe(startWith(undefined), debounceTime(debounceMs), distinctUntilChanged())
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
            callback(result as any);
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
