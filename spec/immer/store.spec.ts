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

    describe('', () => {
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

    describe('', () => {
        beforeEach(() => {
            NgStateTestBed.setTestEnvironment(dataStrategy);
            const initialState = { layout: { test: 'test' } };
            store = NgStateTestBed.createStore(initialState);
        });

        it('should initialize state with initial value - immer', () => {
            store.initialize([], { test: 'test' });
            expect(StateKeeper.CURRENT_STATE['test']).toEqual('test');
            expect(StateKeeper.CURRENT_STATE['__initialized']).toEqual(true);
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

        it('should thorw exception on try to reset state when state path points to value but not an object', () => {
            expect(() => store.select(['layout', 'test']).reset()).toThrowError();
        });

        it('should reset state when store has initial state', () => {
            const intilizedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            intilizedStore.select(['test']).update(state => state['url'] = 'home-updated');
            expect(StateKeeper.CURRENT_STATE['actionStore']['test']['url']).toEqual('home-updated');

            intilizedStore.select(['test']).reset();
            expect(StateKeeper.CURRENT_STATE['actionStore']['test']['url']).toEqual('home');
        });

        it('should rootPath and initialState vallues to store after initialization', () => {
            const intilizedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            expect(intilizedStore.rootPath).toContain('actionStore');
            expect(intilizedStore.initialState.test.url).toBe('home');
        });
    });
});

class InitialState {
    testProp = 'test';
}