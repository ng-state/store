import { timer } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { Store } from '../../projects/ng-state/src/lib/store/store';
import { PersistStateManager, PersistStateStorage } from '../../projects/ng-state/src/lib/store/plugins/persist-state.plugin';
import { StateKeeper } from '../../projects/ng-state/src/lib/state/history';
import { ImmutableJsDataStrategy } from '../../projects/immutablejs-data-strategy/src/lib/immutablejs.data-strategy';

jest.useFakeTimers();

describe('Storage - Immutable', () => {
    let store: Store<any>;
    let keyValueStorage;
    const dataStrategy = new ImmutableJsDataStrategy();

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(dataStrategy);
        const initialState = { layout: { test: 'test' } };
        store = NgStateTestBed.createStore(initialState);
        keyValueStorage = window['customStorage'];
        PersistStateManager.configureStorage(keyValueStorage, () => Object.keys((keyValueStorage as unknown as LocalStorageMock).store));
    });

    it('should save state', () => {
        store.select(['layout']).storage.save({ key: 'testKey' });
        expect(<any>keyValueStorage.getItem('state::testKey')).toBe('{"test":"test"}');
    });

    it('should load state', () => {
        const layoutStore = store.select(['layout']);

        layoutStore.storage.save();
        layoutStore.update(state => state.set('test', 'test-updated'));
        expect(StateKeeper.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test-updated');

        layoutStore.storage.load();
        expect(StateKeeper.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test');
    });

    it('should clear state', () => {
        keyValueStorage.setItem('should-stay-item', 'a');
        store.select(['layout']).storage.save({ key: 'testKey' });
        store.select(['layout']).storage.clear();

        expect(<any>keyValueStorage.getItem('should-stay-item')).toEqual('a');
    });

    it('should remove item', () => {
        store.select(['layout']).storage.save({ key: 'remove-item' });
        store.select(['layout']).storage.remove({ key: 'remove-item' });

        expect(<any>keyValueStorage.getItem('remove-item')).toBeNull();
    });

    describe('when delayed', () => {
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
                    expect(data.data).toMatchObject({ 'test': 'test' });
                    done();
                });

            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after state is loaded', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save({ key: 'testKey' });

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

            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after item is removed from storage', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save({ key: 'testKey' });

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

            jest.advanceTimersByTime(delay);
        });

        it('should notify observer after storage is cleared', (done) => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save({ key: 'testKey' });
            layoutStore.storage.save({ key: 'testKey2' });

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

            jest.advanceTimersByTime(delay);
        });
    });
});

class InitialState {
    testProp = 'test';
}