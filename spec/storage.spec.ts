import { StateHistory } from './../src/state/history';
import { Store } from './../src/store/store';
import { NgStateTestBed } from '../src/ng-state.test-bed';

describe('Storages', () => {
    let store: Store<any>;

    beforeEach(() => {
        const initialState = { layout: { test: 'test' } };
        store = NgStateTestBed.createStore(initialState);
    });

    it('should add state', () => {
        store.select(['layout']).storage.save({ key: 'testKey' });
        expect(<any>localStorage.getItem('state::testKey')).toBe('{"test":"test"}');
    });

    it('should load state', () => {
        const layoutStore = store.select(['layout']);

        layoutStore.storage.save();
        layoutStore.update(state => state.set('test', 'test-updated'));
        expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test-updated');

        layoutStore.storage.load();
        expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test');
    });

    it('should clear state', () => {
        localStorage.setItem('should-stay-item', 'a');
        store.select(['layout']).storage.save({ key: 'testKey' });
        store.select(['layout']).storage.clear();

        expect(<any>localStorage.getItem('should-stay-item')).toEqual('a');
    });

    it('should remove item', () => {
        store.select(['layout']).storage.save({ key: 'remove-item' });
        store.select(['layout']).storage.remove({ key: 'remove-item' });

        expect(<any>localStorage.getItem('remove-item')).toBeNull();
    });
});

class InitialState {
    testProp = 'test';
}