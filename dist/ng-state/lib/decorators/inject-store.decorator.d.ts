import { Store } from '../store/store';
export declare function InjectStore(newPath: string[] | string | ((currentPath: any, stateIndex: any) => string[] | string), intialState?: Object | any, debug?: boolean): (target: any) => void;
export declare class HasStore<T> {
    store: Store<T>;
    state?: T;
}
