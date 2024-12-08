import { Signal } from '@angular/core';
import { Store } from '../store/store';

export class HasStore<T> {
    store: Store<T> = null;
    state?: T = null;
}

export class HasSignalStore<T> {
    store: Store<T> = null;
    state: Signal<T> = null;
    statePath: StatePath = null;
}

export interface CreateStoreOptions {
    statePath?: StatePath,
    newPath?: string[] | string | ((currentPath: StatePath, stateIndex: StateIndex) => string[] | string),
    initialState?: Object | any,
    stateIndex?: StateIndex,
    options?: { isSignalStore?: boolean, debug?: boolean },
}

export type StateIndex = (string | number) | (string | number)[];
export type StatePath = string | string[];