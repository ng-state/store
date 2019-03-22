import { Map, fromJS } from 'immutable';
import { tap, take } from 'rxjs/operators';
import { Store } from '../store';
import { Observable, isObservable, from, of } from 'rxjs';

export class PersistStateManager {
    protected static customStorageConfig: PersistStateParams = {};

    protected defaults: PersistStateParams = {
        key: '',
        storageConfig: null,
        deserialize: JSON.parse,
        serialize: JSON.stringify
    };

    private prefix = 'state::';

    constructor(private store: Store<any>) {
    }

    static configureStorage(storage: PersistStateStorage, getKeys: () => Promise<string[]> | Observable<string[]> | string[]) {
        PersistStateManager.customStorageConfig.storageConfig = { storage: storage, getKeys: getKeys };
    }

    static configureSerializer(serialize: Function, deserialize: Function) {
        PersistStateManager.customStorageConfig.serialize = serialize;
        PersistStateManager.customStorageConfig.deserialize = deserialize;
    }

    save(params?: PersistStateParams) {

        params = this.getParams(params, this.store);

        this.store.pipe(
            tap((state: Map<any, any>) => {
                this.resolve(params.storageConfig.storage.setItem(params.key, params.serialize(state.toJS())))
                    .pipe(take(1))
                    .subscribe();
            }),
            take(1)
        ).subscribe();
    }

    load(params?: PersistStateParams, keepEntry = false) {
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.storage.getItem(params.key))
            .pipe(take(1))
            .subscribe(loadedState => {
                this.store.update((state: Map<any, any>) => {
                    state.merge(fromJS(params.deserialize(loadedState)));
                });

                if (!keepEntry) {
                    this.removeAction(params);
                }
            });
    }

    remove(params?: PersistStateParams) {
        params = this.getParams(params, this.store);
        this.removeAction(params);
    }

    clear(params?: PersistStateParams) {
        params = this.getParams(params, this.store);

        this.resolve(params.storageConfig.getKeys())
            .pipe(take(1))
            .subscribe(keys => {
                keys.filter((e: string) => e.startsWith(this.prefix))
                    .map((key: string) => {
                        const localParams = { ...params };
                        localParams.key = key;

                        this.removeAction(localParams);
                    });
            });

    }

    private removeAction(params: PersistStateParams) {
        this.resolve(params.storageConfig.storage.removeItem(params.key)).pipe(take(1)).subscribe(_ => { });
    }

    private getParams(params: PersistStateParams, store: Store<any>) {
        this.setDefaultStorage();

        params = { ...this.defaults, ...PersistStateManager.customStorageConfig, ...params };

        if (!params.key) {
            params.key = store.statePath.join('.');
        }

        params.key = `${this.prefix}${params.key}`;

        return params;
    }

    private setDefaultStorage() {
        if (!this.defaults.storageConfig) {
            this.defaults.storageConfig = {
                storage: localStorage,
                getKeys: () => Object.keys(localStorage)
            };
        }
    }

    private isPromise(v: any) {
        return v && typeof v.then === 'function';
    }

    private resolve(asyncOrValue: any) {
        if (this.isPromise(asyncOrValue) || isObservable(asyncOrValue)) {
            return from(asyncOrValue);
        }

        return of(asyncOrValue);
    }
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