import { StateHistory } from './../src/state/history';
import { Store } from './../src/store/store';
import { stateFactory, storeFactory } from '../src/ng-state.module';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { HistoryController } from '../src/state/history-controller';

describe('Store tests', () => {
    let store: Store<any>;

    describe('', () => {
        it('should convert initial state classes ES6 to ES5 objects', () => {
            const state = stateFactory(new InitialState()) as BehaviorSubject<InitialState>;
            state
                .pipe(take(1))
                .subscribe((value: any) => {
                    const obj = value.toJS();
                    expect(obj.testProp).toBeDefined();
                    expect(obj.testProp).toEqual('test');
                    expect(value.testProp).not.toBeDefined();
                });
        });
    });

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
                .pipe(take(1))
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

        it('should reset state', () => {
            store.select(['layout']).update(state => state.set('test', 'test2'));
            expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test2');

            store.select(['layout']).reset();
            expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test');
        });

        it('should reset state when stroe has initial state', () => {
            const intilizedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            intilizedStore.select(['test']).update(state => state.set('url', 'home-updated'));
            expect(StateHistory.CURRENT_STATE.getIn(['actionStore', 'test', 'url'])).toEqual('home-updated');

            intilizedStore.select(['test']).reset();
            expect(StateHistory.CURRENT_STATE.getIn(['actionStore', 'test', 'url'])).toEqual('home');
        });
    });
});

class InitialState {
    testProp = 'test';
}