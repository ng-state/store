import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ImmutableJsDataStrategy } from '@ng-state/immutablejs-data-strategy';
import { Store } from '../../projects/ng-state/src/lib/store/store';
import { stateFactory } from '../../projects/ng-state/src/lib/ng-state.module';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { StateKeeper } from '../../projects/ng-state/src/lib/state/history';

describe('Store tests - Immutable', () => {
    let store: Store<any>;
    const dataStrategy = new ImmutableJsDataStrategy();

    describe('', () => {
        it('should convert initial state classes ES6 to ES5 objects', () => {
            const state = stateFactory(new InitialState(), dataStrategy) as BehaviorSubject<InitialState>;
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
            NgStateTestBed.setTestEnvironment(dataStrategy);
            const initialState = { layout: { test: 'test' } };
            store = NgStateTestBed.createStore(initialState);
        });

        it('should initialize state with initial value', () => {
            store.initialize([], { test: 'test' });

            expect(StateKeeper.CURRENT_STATE.get('test')).toEqual('test');
            expect(StateKeeper.CURRENT_STATE.get('__initialized')).toEqual(true);
        });

        it('should update state', () => {
            store.select(['layout']).update(state => state.set('loading', true));

            expect(StateKeeper.CURRENT_STATE.getIn(['layout', 'loading'])).toEqual(true);
        });

        it('should select state', (done) => {
            store.select(['layout'])
                .pipe(take(1))
                .subscribe((state: any) => {
                    expect(state.get('test')).toBeTruthy();
                    done();
                });
        });

        it('should reset root state', () => {
            store.initialize(['router'], { url: 'home' }, false);
            store.select(['layout']).update(state => state.set('loading', true));
            expect(StateKeeper.CURRENT_STATE.getIn(['layout', 'loading'])).toEqual(true);

            store.reset();

            expect(StateKeeper.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test');
            expect(StateKeeper.CURRENT_STATE.getIn(['layout', 'loading'])).not.toBeDefined();
            expect(StateKeeper.CURRENT_STATE.getIn(['router', 'url'])).toBe('');
        });

        it('should reset nested state', () => {
            store.select(['layout']).update(state => state.set('test', 'test2'));
            expect(StateKeeper.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test2');

            store.select(['layout']).reset();
            expect(StateKeeper.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test');
        });

        it('should thorw exception on try to reset state when state path points to value but not an object', () => {
            expect(() => store.select(['layout', 'test']).reset()).toThrowError();
        });

        it('should reset state when store has initial state', () => {
            const intilizedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            intilizedStore.select(['test']).update(state => state.set('url', 'home-updated'));
            expect(StateKeeper.CURRENT_STATE.getIn(['actionStore', 'test', 'url'])).toEqual('home-updated');

            intilizedStore.select(['test']).reset();
            expect(StateKeeper.CURRENT_STATE.getIn(['actionStore', 'test', 'url'])).toEqual('home');
        });

        it('should rootPath and initialState vallues to store after initialization', () => {
            const intilizedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            expect(intilizedStore.rootPath).toContain('actionStore');
            expect(dataStrategy.toJS(intilizedStore.initialState).test.url).toBe('home');
        });
    });
});

class InitialState {
    testProp = 'test';
}