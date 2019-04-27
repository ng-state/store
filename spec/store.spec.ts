import { StateKeeper } from '../src/state/history';
import { Store } from './../src/store/store';
import { stateFactory } from '../src/ng-state.module';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgStateTestBed } from '../src/ng-state.test-bed';

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

        it('should update state n times in a row with no muttations', (done) => {
            for (let index = 1; index <= 3; index++) {
                store.select(['layout']).update(state => state.set('test', index), false);
            }

            store.subscribe(state => {
                expect(state.getIn(['layout', 'test'])).toEqual(3);
                done();
            });
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

        it('should reset state when stroe has initial state', () => {
            const intilizedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            intilizedStore.select(['test']).update(state => state.set('url', 'home-updated'));
            expect(StateKeeper.CURRENT_STATE.getIn(['actionStore', 'test', 'url'])).toEqual('home-updated');

            intilizedStore.select(['test']).reset();
            expect(StateKeeper.CURRENT_STATE.getIn(['actionStore', 'test', 'url'])).toEqual('home');
        });

        it('should rootPath and initialState vallues to store after initialization', () => {
            const intilizedStore = store.initialize(['actionStore'], { test: { url: 'home' } });
            expect(intilizedStore.rootPath).toContain('actionStore');
            expect(intilizedStore.initialState.toJS().test.url).toBe('home');
        });
    });
});

class InitialState {
    testProp = 'test';
}