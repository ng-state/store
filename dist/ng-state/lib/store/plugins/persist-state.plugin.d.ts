import { Store } from '../store';
import { Observable } from 'rxjs';
export declare class PersistStateManager {
    private store;
    private prefix;
    protected static customStorageConfig: PersistStateParams;
    protected defaults: PersistStateParams;
    constructor(store: Store<any>);
    static configureStorage(storage: PersistStateStorage, getKeys: () => Promise<string[]> | Observable<string[]> | string[]): void;
    static configureSerializer(serialize: Function, deserialize: Function): void;
    save(params?: PersistStateParams): Observable<PersistStateItem>;
    load(params?: PersistStateParams, keepEntry?: boolean): Observable<PersistStateItem>;
    remove(params?: PersistStateParams): Observable<string>;
    clear(params?: PersistStateParams): Observable<string[]>;
    private removeAction;
    private getParams;
    private setDefaultStorage;
    private isPromise;
    private resolve;
}
export interface PersistStateStorage {
    getItem(key: string): Promise<any> | Observable<any> | any;
    setItem(key: string, value: any): Promise<any> | Observable<any> | any;
    removeItem(key: string): Promise<any> | Observable<any> | any;
    clear(): void;
}
export interface PersistStateParams {
    key?: string;
    storageConfig?: StorageConfiguartion;
    deserialize?: Function;
    serialize?: Function;
}
export interface StorageConfiguartion {
    storage: PersistStateStorage;
    getKeys: () => Promise<string[]> | Observable<string[]> | string[];
}
export interface PersistStateItem {
    key: string;
    data: any;
}
