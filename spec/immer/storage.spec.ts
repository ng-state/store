import { Observable, throwError, timer } from 'rxjs';
import { tap, map, take, catchError } from 'rxjs/operators';
import { ImmerDataStrategy } from '../../projects/immer-data-strategy/src/lib/immer.data-strategy';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { Store } from '../../projects/ng-state/src/lib/store/store';
import { PersistStateManager, PersistStateStorage } from '../../projects/ng-state/src/lib/store/plugins/persist-state.plugin';
import { StateKeeper } from '../../projects/ng-state/src/lib/state/history';
import { LocalStorageMock } from '../localstorage.mock';

jest.useFakeTimers();

describe('Storage - Immer', () => {
    let store: Store<any>;
    let keyValueStorage;
    const dataStrategy = new ImmerDataStrategy();

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(dataStrategy);
        const initialState = { layout: { test: 'test' } };
        store = NgStateTestBed.createStore(initialState);
        keyValueStorage = window['customStorage'];
        keyValueStorage.clear();
        PersistStateManager.configureStorage(keyValueStorage, () => Object.keys((keyValueStorage as unknown as LocalStorageMock).store));
    });

    it('should save state', () => {
        store.select(['layout']).storage.save('testKey');
        jest.runAllTimers();

        expect(<any>keyValueStorage.getItem('state::testKey')).toBe('{"test":"test"}');
    });

    it('should load state', () => {
        const layoutStore = store.select(['layout']);

        layoutStore.storage.save();
        jest.runAllTimers();

        layoutStore.update(state => state['test'] = 'test-updated');
        expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test-updated');

        layoutStore.storage.load();
        jest.runAllTimers();

        expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test');
    });

    it('should return null on state load which is not persisted in storage', (done) => {
        const layoutStore = store.select(['test3']);

        layoutStore.storage.load().pipe(take(1)).subscribe((data) => {
            expect(data.data).toBeNull();
            done();
        });

        jest.runAllTimers();
    });

    it('should clear state', () => {
        keyValueStorage.setItem('should-stay-item', 'a');
        store.select(['layout']).storage.save('testKey');
        jest.runAllTimers();

        store.select(['layout']).storage.clear();
        jest.runAllTimers();

        expect(<any>keyValueStorage.getItem('should-stay-item')).toEqual('a');
    });

    it('should remove item', () => {
        store.select(['layout']).storage.save('remove-item');
        jest.runAllTimers();

        store.select(['layout']).storage.remove('remove-item');
        jest.runAllTimers();

        expect(<any>keyValueStorage.getItem('state::remove-item')).toBeNull();
    });

    it('should remove multiple items', () => {
        store.select(['layout']).storage.save('remove-item-1');
        store.select(['layout']).storage.save('remove-item-2');
        store.select(['layout']).storage.save('remove-item-3');
        jest.runAllTimers();

        store.select(['layout']).storage.remove(['remove-item-1', 'remove-item-2']);
        jest.runAllTimers();

        expect(<any>keyValueStorage.getItem('state::remove-item-1')).toBeNull();
        expect(<any>keyValueStorage.getItem('state::remove-item-2')).toBeNull();
        expect(<any>keyValueStorage.getItem('state::remove-item-3')).toBe('{"test":"test"}');
    });

    it('should correctly extend parameters', (done) => {
        store.storage
            .save({
                key: 'testKey',
                serialize: () => JSON.stringify({ selectedTabIndex: 1 }),
            })
            .pipe(take(1))
            .subscribe((data) => {
                expect(data.key).toEqual('state::testKey');
                expect(<any>keyValueStorage.getItem('state::testKey')).toBe('{"selectedTabIndex":1}');
                expect(data.data).toBe('{"selectedTabIndex":1}');
                done();
            });

        jest.runAllTimers();
    });

    describe('when delayed', () => {
        const delay = 2000;
        let storage = {
            clear: () => timer(delay).pipe(tap(_ => keyValueStorage.clear())),
            getItem: (key: string) => timer(delay).pipe(map(_ => keyValueStorage.getItem(key))),
            removeItem: (key: string) => timer(delay).pipe(tap(_ => keyValueStorage.removeItem(key))),
            setItem: (key: string, value: any) => timer(delay).pipe(tap(_ => keyValueStorage.setItem(key, value))),
        } as PersistStateStorage;

        beforeEach(() => {
            PersistStateManager.configureStorage(storage,
                () => Object.keys((keyValueStorage as unknown as LocalStorageMock).store));
        });

        it('should notify observer after state is saved', (done) => {
            store.select(['layout'])
                .storage.save('testKey').subscribe(data => {
                    expect(data.key).toEqual('state::testKey');
                    expect(JSON.parse(data.data)).toMatchObject({ 'test': 'test' });
                    done();
                });

            jest.runAllTimers();
            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after state is loaded', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save('testKey');
            jest.runAllTimers();

            layoutStore
                .storage.load('testKey').subscribe(data => {
                    expect(data.key).toEqual('state::testKey');
                    expect(JSON.parse(data.data)).toMatchObject({ 'test': 'test' });
                    done();
                });

            jest.runAllTimers();
            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after item is removed from storage', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save('testKey');
            jest.runAllTimers();

            layoutStore
                .storage.remove('testKey').subscribe(key => {
                    expect(key).toEqual('state::testKey');
                    done();
                });

            jest.runAllTimers();
            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after storage is cleared', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save('testKey');
            layoutStore.storage.save('testKey2');
            jest.runAllTimers();

            layoutStore
                .storage.clear().subscribe(keys => {
                    expect(keys.length).toBe(2);
                    expect(keys[0]).toEqual('state::testKey');
                    expect(keys[1]).toEqual('state::testKey2');
                    done();
                });

            jest.runAllTimers();
            jest.advanceTimersByTime(delay);
        });
    });

    describe('with custom storage per item', () => {
        const delay = 2000;
        let storage = {
            clear: () => timer(delay).pipe(tap(_ => keyValueStorage.clear())),
            getItem: (key: string) => timer(delay).pipe(map(_ => keyValueStorage.getItem(key))),
            removeItem: (key: string) => timer(delay).pipe(tap(_ => keyValueStorage.removeItem(key))),
            setItem: (key: string, value: any) => timer(delay).pipe(tap(_ => keyValueStorage.setItem(key, value))),
        } as PersistStateStorage;

        it('should notify observer after state is saved', (done) => {
            store.select(['layout'])
                .storage.save({
                    key: 'testKey',
                    storageConfig: {
                        storage: storage,
                        getKeys: () => Object.keys((keyValueStorage as unknown as LocalStorageMock).store)
                    }
                }).subscribe(data => {
                    expect(data.key).toEqual('state::testKey');
                    expect(JSON.parse(data.data)).toMatchObject({ 'test': 'test' });
                    done();
                });

            jest.runAllTimers();
            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after state is loaded', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save({ key: 'testKey' });
            jest.runAllTimers();

            layoutStore
                .storage.load({
                    key: 'testKey',
                    storageConfig: {
                        storage: storage,
                        getKeys: () => Object.keys((keyValueStorage as unknown as LocalStorageMock).store)
                    }
                }).subscribe(data => {
                    expect(data.key).toEqual('state::testKey');
                    expect(JSON.parse(data.data)).toMatchObject({ 'test': 'test' });
                    done();
                });

            jest.runAllTimers();
            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after item is removed from storage', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save({ key: 'testKey' });
            jest.runAllTimers();

            layoutStore
                .storage.remove({
                    key: 'testKey',
                    storageConfig: {
                        storage: storage,
                        getKeys: () => Object.keys((keyValueStorage as unknown as LocalStorageMock).store)
                    }
                }).subscribe(key => {
                    expect(key).toEqual('state::testKey');
                    done();
                });

            jest.runAllTimers();
            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after storage is cleared', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save({ key: 'testKey' });
            layoutStore.storage.save({ key: 'testKey2' });
            jest.runAllTimers();

            layoutStore
                .storage.clear({
                    storageConfig: {
                        storage: storage,
                        getKeys: () => Object.keys((keyValueStorage as unknown as LocalStorageMock).store)
                    }
                }).subscribe(keys => {
                    expect(keys.length).toBe(2);
                    expect(keys[0]).toEqual('state::testKey');
                    expect(keys[1]).toEqual('state::testKey2');
                    done();
                });

            jest.runAllTimers();
            jest.advanceTimersByTime(delay);
        });
    });
});

class InitialState {
    testProp = 'test';
}