import { tap, take, delay } from 'rxjs/operators';
import { Store } from '../store';
import { Observable, isObservable, from, of, ReplaySubject, forkJoin } from 'rxjs';
import { ServiceLocator } from '../../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';

export class PersistStateManager {
    private prefix = 'state::';

    protected static customStorageConfig: PersistStateParams = {};

    protected defaults: PersistStateParams = {
        key: '',
        storageConfig: null,
        deserialize: JSON.parse,
        serialize: JSON.stringify
    };

    constructor(private store: Store<any>, private isProd: boolean) {
    }

    static configureStorage(storage: PersistStateStorage, getKeys: () => Promise<string[]> | Observable<string[]> | string[]) {
        PersistStateManager.customStorageConfig.storageConfig = { storage: storage, getKeys: getKeys };
    }

    static configureSerializer(serialize: Function, deserialize: Function) {
        PersistStateManager.customStorageConfig.serialize = serialize;
        PersistStateManager.customStorageConfig.deserialize = deserialize;
    }

    save(params?: PersistStateParams): Observable<PersistStateItem> {
        const dataStrategy = ServiceLocator.injector.get(DataStrategy) as DataStrategy;
        const onSaveComplete = new ReplaySubject<PersistStateItem>(1);

        params = this.getParams(params, this.store);

        this.store.pipe(
            tap((state: any) => {
                this.resolve(params.storageConfig.storage.setItem(params.key, params.serialize(dataStrategy.toJS(state))))
                    .pipe(
                        delay(0),
                        take(1))
                    .subscribe(_ => {
                        onSaveComplete.next({
                            key: params.key,
                            data: dataStrategy.toJS(state)
                        });
                    });
            }),
            take(1)
        ).subscribe();

        return onSaveComplete
            .asObservable()
            .pipe(take(1));
    }

    load(params?: PersistStateParams, keepEntry = false): Observable<PersistStateItem> {
        const dataStrategy = ServiceLocator.injector.get(DataStrategy) as DataStrategy;
        const onLoadComplete = new ReplaySubject<PersistStateItem>(1);

        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.storage.getItem(params.key))
            .pipe(
                delay(0),
                take(1)
            )
            .subscribe(loadedState => {
                if (loadedState === null) {
                    if (!this.isProd ) {
                        console.log(`State with key '${params.key}' not found in storage`);
                    }

                    onLoadComplete.next({
                        key: params.key,
                        data: null,
                    });
                    return;
                }

                this.store.update((state: Map<any, any>) => {
                    dataStrategy.merge(state, dataStrategy.fromJS(params.deserialize(loadedState)));
                });

                if (!keepEntry) {
                    this.removeAction(params);
                }

                onLoadComplete.next({
                    key: params.key,
                    data: loadedState
                });
            });

        return onLoadComplete
            .asObservable()
            .pipe(take(1));
    }

    remove(params?: PersistStateParams): Observable<string> {
        params = this.getParams(params, this.store);
        return this.removeAction(params);
    }

    clear(params?: PersistStateParams): Observable<string[]> {
        const onClearComplete = new ReplaySubject<string[]>(1);
        const clearKeys: Observable<string>[] = [];

        params = this.getParams(params, this.store);

        this.resolve(params.storageConfig.getKeys())
            .pipe(
                delay(0),
                take(1))
            .subscribe(keys => {
                keys.filter((e: string) => e.startsWith(this.prefix))
                    .map((key: string) => {
                        const localParams = { ...params };
                        localParams.key = key;

                        clearKeys.push(this.removeAction(localParams));
                    });

                forkJoin(clearKeys)
                    .pipe(take(1))
                    .subscribe(keys => {
                        onClearComplete.next(keys);
                    });
            });

        return onClearComplete
            .asObservable()
            .pipe(take(1));
    }

    private removeAction(params: PersistStateParams): Observable<string> {
        const onRemoveComplete = new ReplaySubject<string>(1);

        this.resolve(params.storageConfig.storage.removeItem(params.key))
            .pipe(
                delay(0),
                take(1))
            .subscribe(_ => {
                onRemoveComplete.next(params.key);
            });

        return onRemoveComplete
            .asObservable()
            .pipe(take(1));
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

export interface PersistStateItem {
    key: string;
    data: any;
}