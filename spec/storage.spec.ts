import { StateHistory } from './../src/state/history';
import { Store } from './../src/store/store';
import { stateFactory, storeFactory } from '../src/ng-state.module';
import { HistoryController } from '../src/state/history-controller';

describe('Store tests', () => {
    let store: Store<any>;

    describe('', () => {
        beforeEach(() => {
            const initialState = { layout: { test: 'test' } };
            const state = stateFactory(initialState);
            store = storeFactory(state);
            const history = new StateHistory();
            history.init(initialState);
            const historyController = new HistoryController(store, history);
            historyController.init();
        });

        it('should add to external storage', () => {
            store.select(['layout']).storage.save({ key: 'testKey' });
            expect(<any>localStorage.getItem('state::testKey')).toBe('{"test":"test"}');
        });

        it('should load from external storage', () => {
            const layoutStore = store.select(['layout']);

            layoutStore.storage.save();
            layoutStore.update(state => state.set('test', 'test-updated'));
            expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test-updated');

            layoutStore.storage.load();
            expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test');
        });

        it('should clear only state items', () => {
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
});

class InitialState {
    testProp = 'test';
}