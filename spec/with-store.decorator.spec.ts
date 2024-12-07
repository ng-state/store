import { BehaviorSubject, Subject } from 'rxjs';
import { fromJS } from 'immutable';
import { NgStateTestBed } from '../projects/ng-state/src/lib/ng-state.test-bed';
import { Store } from '../projects/ng-state/src/lib/store/store';
import { ImmerDataStrategy } from '../projects/immer-data-strategy/src/lib/immer.data-strategy';
import { IS_TEST, IS_PROD } from '../projects/ng-state/src/lib/inject-constants';
import { StateKeeper, StateHistory } from '../projects/ng-state/src/lib/state/history';
import { Dispatcher } from '../projects/ng-state/src/lib/services/dispatcher';
import { Signal } from '@angular/core';
import { CreateStoreOptions } from '../projects/ng-state/src/lib/decorators/inject-store.model';
import { WithStore } from '../projects/ng-state/src/lib/decorators/with-store.decorator';

class TestStateActions {
    store: any;
    state: any;

    createStore(options: CreateStoreOptions) {
        return ['newStatePath'];
    }

    get isOpened() {
        return true;
    }
}

const store = new Store<any>(new BehaviorSubject({}), false);

describe('WithStore decorator', () => {
    let target: TestStateActions;
    let componentInstance = {};

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
    });

    let setup = () => {
        jest.clearAllMocks();
        jest.spyOn(store, 'initialize').mockReturnValueOnce(store);
        NgStateTestBed.registerDependency(Store, store);
        NgStateTestBed.registerDependency(Dispatcher, new Dispatcher());
        NgStateTestBed.registerDependency(StateHistory, new StateHistory());
        const decorator = WithStore();
        decorator(TestStateActions);
        target = new TestStateActions();
        StateKeeper.CURRENT_STATE = fromJS({});
        jest.spyOn(StateKeeper.CURRENT_STATE, 'getIn').mockReturnValue(() => true);
    };

    beforeEach(() => {
        setup();
    });

    it('should resolve state path from anonymous function', () => {
        const newPath = target.createStore({ newPath: 'new path' });

        expect(newPath.length).toEqual(1);
        expect(newPath[0]).toBe('new path');
    });

    it('should extract absolute path', () => {
        const newPath = target.createStore({ newPath: 'new/${stateIndex}/path/${stateIndex}', stateIndex: [1, 2] });

        expect(newPath.length).toEqual(4);
        expect(newPath[0]).toBe('new');
        expect(newPath[1]).toBe(1);
        expect(newPath[2]).toBe('path');
        expect(newPath[3]).toBe(2);
    });

    it('should extract relative path', () => {
        const newPath = target.createStore({ newPath: ['test', '${stateIndex}', 'path'], statePath: ['parent'], stateIndex: 1 });

        expect(newPath.length).toEqual(4);
        expect(newPath[0]).toBe('parent');
        expect(newPath[1]).toBe('test');
        expect(newPath[2]).toBe(1);
        expect(newPath[3]).toBe('path');
    });

    it('should create store', () => {
        target.createStore({ newPath: ['test', '${stateIndex}', 'path'], statePath: ['parent'], stateIndex: 1 });

        expect(target.store).toBeDefined();
    });

    it('should initialize store with initial values if provided', () => {
        target.store = store;
        jest.spyOn(store, 'initialize').mockReturnValueOnce(new Subject<any>() as any);

        target.createStore({ newPath: ['test', '${stateIndex}', 'path'], initialState: { test: 'test' }, statePath: ['parent'], stateIndex: 1 });

        expect(store.initialize).toHaveBeenCalled();
    });

    it('should convert getters to properties', () => {
        componentInstance = target;

        expect(typeof (<any>componentInstance).isOpened).toEqual('boolean');
    });

    it('should check path', () => {
        NgStateTestBed.registerDependency(IS_TEST, false);
        jest.spyOn(console, 'error');
        target.createStore({ newPath: ['test'], statePath: ['parent'] });
        expect(console.error).toHaveBeenCalled();
    });

    it('should check path if debug is set', () => {
        jest.spyOn(console, 'error');
        target.createStore({ newPath: ['test'], statePath: ['parent'], options: { debug: true } });
        expect(console.error).toHaveBeenCalled();
    });

    it('should not check path for prod', () => {
        NgStateTestBed.registerDependency(IS_PROD, true);
        jest.spyOn(console, 'error');
        target.createStore({ newPath: ['test'], statePath: ['parent'] });
        expect(console.error).not.toHaveBeenCalled();
    });

    it('should create signal actions', () => {
        target.createStore({ newPath: ['test', '${stateIndex}', 'path'], statePath: ['parent'], stateIndex: 1, options: { isSignalStore: true } });

        expect(target.store).toBeDefined();
        expect(target.state()).toBeDefined();

        const signalState: Signal<any> = target.state as Signal<any>;
        expect(signalState).toBeTruthy();
    });


});