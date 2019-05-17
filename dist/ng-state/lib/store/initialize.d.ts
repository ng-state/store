import { Store } from './store';
export declare class Initialize {
    newStore: Store<any>;
    constructor(statePath: any[], initialState?: any);
}
export interface InitializeSignature<T> {
    <R>(statePath: any, initialState?: T, addToHistory?: boolean): Store<R>;
}
