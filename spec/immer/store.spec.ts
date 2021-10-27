import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '../../projects/ng-state/src/lib/store/store';
import { ImmerDataStrategy } from '../../projects/immer-data-strategy/src/lib/immer.data-strategy';
import { stateFactory } from '../../projects/ng-state/src/lib/ng-state.module';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { StateKeeper } from '../../projects/ng-state/src/lib/state/history';

describe('Store tests - Immer', () => {
    let store: Store<any>;
    const dataStrategy = new ImmerDataStrategy();

    describe('Initial setup', () => {
        it('should not convert initial state classes to immutable', () => {
            const state = stateFactory(new InitialState(), dataStrategy) as BehaviorSubject<InitialState>;
            state
                .pipe(take(1))
                .subscribe((value: any) => {
                    expect(value.testProp).toBeDefined();
                    expect(value.testProp).toEqual('test');
                });
        });
    });

    describe('Common cases', () => {
        beforeEach(() => {
            NgStateTestBed.setTestEnvironment(dataStrategy);
            const initialState = { layout: { test: 'test' }, locallyInitialized: {} };
            store = NgStateTestBed.createStore(initialState);
        });

        it('should initialize state with initial value - immer', () => {
            store.initialize([], { test: 'test' });
            expect(StateKeeper.CURRENT_STATE['test']).toEqual('test');
            expect(StateKeeper.CURRENT_STATE['__initialized']).toEqual(true);
        });

        it('should return correct store no matter if initialization is made in initial state object or dynamically - immer', (done) => {
            let localStore = store.initialize(['localState'], { test: 'test2' });
            expect(localStore.statePath[0]).toEqual('localState');
            localStore.pipe(take(1))
                .subscribe((state: any) => {
                    expect(state['test']).toEqual('test2');
                });

            localStore = store.initialize(['layout']);
            expect(localStore.statePath[0]).toEqual('layout');
            localStore.pipe(take(1))
                .subscribe((state: any) => {
                    expect(state['test']).toEqual('test');
                });

            localStore = store.initialize(['locallyInitialized'], { value: 'one' });
            expect(localStore.statePath[0]).toEqual('locallyInitialized');
            localStore.pipe(take(1))
                .subscribe((state: any) => {
                    expect(state['value']).toEqual('one');
                });

            localStore = store.initialize(['localState'], { test: 'test2' });
            expect(localStore.statePath[0]).toEqual('localState');
            localStore.pipe(take(1))
                .subscribe((state: any) => {
                    expect(state['test']).toEqual('test2');
                    done();
                });
        });

        it('should update state', () => {
            store.select(['layout']).update(state => state['loading'] = true);

            expect(StateKeeper.CURRENT_STATE['layout']['loading']).toEqual(true);
        });

        it('should select state', (done) => {
            store.select(['layout'])
                .pipe(take(1))
                .subscribe((state: any) => {
                    expect(state['test']).toBeTruthy();
                    done();
                });
        });

        it('should reset root state', () => {
            store.initialize(['router'], { url: 'home' }, false);
            store.select(['layout']).update(state => state['loading'] = true);
            expect(StateKeeper.CURRENT_STATE['layout']['loading']).toEqual(true);

            store.reset();

            expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test');
            expect(StateKeeper.CURRENT_STATE['layout']['loading']).not.toBeDefined();
            expect(StateKeeper.CURRENT_STATE['router']['url']).toBe('');
        });

        it('should reset nested state', () => {
            store.select(['layout']).update(state => state['test'] = 'test2');
            expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test2');

            store.select(['layout']).reset();
            expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test');
        });

        it('should reset locally initialized nested state', () => {
            const initStore = store.initialize(['locallyInitialized'], { value: 'test value' }, false);
            initStore.update(state => state['value'] = 'test value 2');
            expect(StateKeeper.CURRENT_STATE['locallyInitialized']['value']).toEqual('test value 2');

            initStore.reset();
            expect(StateKeeper.CURRENT_STATE['locallyInitialized']['value']).toEqual('test value');
        });

        it('should reset locally initialized nested state child path', () => {
            const initStore = store.initialize(['locallyInitialized'], { value: 'test value', nestedValue: { value: 'v1' } }, false);
            initStore.update(state => state['value'] = 'test value 2');
            initStore.select(['nestedValue']).update(state => state['value'] = 'v2');
            expect(StateKeeper.CURRENT_STATE['locallyInitialized']['value']).toEqual('test value 2');
            expect(StateKeeper.CURRENT_STATE['locallyInitialized']['nestedValue']['value']).toEqual('v2');

            initStore.select(['nestedValue']).reset();
            expect(StateKeeper.CURRENT_STATE['locallyInitialized']['value']).toEqual('test value 2');
            expect(StateKeeper.CURRENT_STATE['locallyInitialized']['nestedValue']['value']).toEqual('v1');
        });

        it('should throw exception on try to reset state when state path points to value but not an object', () => {
            expect(() => store.select(['layout', 'test']).reset()).toThrowError();
        });

        it('should reset state when store has initial state', () => {
            const initializedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            initializedStore.select(['test']).update(state => state['url'] = 'home-updated');
            expect(StateKeeper.CURRENT_STATE['actionStore']['test']['url']).toEqual('home-updated');

            initializedStore.select(['test']).reset();
            expect(StateKeeper.CURRENT_STATE['actionStore']['test']['url']).toEqual('home');
        });

        it('should rootPath and initialState vallues to store after initialization', () => {
            const initializedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            expect(initializedStore.rootPath).toContain('actionStore');
            expect(initializedStore.initialState.test.url).toBe('home');
        });
    });
});

class InitialState {
    testProp = 'test';
}