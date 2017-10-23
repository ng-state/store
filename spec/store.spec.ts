import { StateHistory } from './../src/state/history';
import { Store } from './../src/store/store';
import { stateFactory, storeFactory, historyFactory } from '../src/ng-state.module';

describe('Store tests', () => {
    let store: Store<any>;

    beforeEach(() => {
        const initialState = { layout: { test: 'test' } };
        const state = stateFactory(initialState);
        store = storeFactory(state);
        const history = historyFactory(store, initialState);
        history.init();
    });

    it('should initialize state with initial value', () => {
        store.initialize([], { test: 'test' });

        expect(StateHistory.CURRENT_STATE.get('test')).toEqual('test');
        expect(StateHistory.CURRENT_STATE.get('__initialized')).toEqual(true);
    });

    it('should update state', () => {
        store.select(['layout']).update(state => state.set('loading', true));

        expect(StateHistory.CURRENT_STATE.getIn(['layout', 'loading'])).toEqual(true);
    });

    it('should select state', (done) => {
        store.select(['layout'])
            .take(1)
            .subscribe((state: any) => {
                expect(state.get('test')).toBeTruthy();
                done();
            });
    });

    it('should clear state', () => {
        store.initialize(['router'], { url: 'home' }, false);
        store.select(['layout']).update(state => state.set('loading', true));
        expect(StateHistory.CURRENT_STATE.getIn(['layout', 'loading'])).toEqual(true);

        store.clear();
        expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test');
        expect(StateHistory.CURRENT_STATE.getIn(['layout', 'loading'])).not.toBeDefined();
        expect(StateHistory.CURRENT_STATE.getIn(['router', 'url'])).toBe('');
    });
});