import { Subject } from 'rxjs';
import { fromJS } from 'immutable';
import { NgStateTestBed } from '../projects/ng-state/src/lib/ng-state.test-bed';
import { Store } from '../projects/ng-state/src/lib/store/store';
import { ImmerDataStrategy } from '../projects/immer-data-strategy/src/lib/immer.data-strategy';
import { IS_TEST, IS_PROD } from '../projects/ng-state/src/lib/inject-constants';
import { InjectStore } from '../projects/ng-state/src/lib/decorators/inject-store.decorator';
import { StateKeeper, StateHistory } from '../projects/ng-state/src/lib/state/history';
import { Dispatcher } from '../projects/ng-state/src/lib/services/dispatcher';

class TestStateActions {
    store: any;
    createStore(statePath: string[], stateIndex: number | null) {
        return ['newStatePath'];
    }
    get isOpened() {
        return true;
    }
}

const store = {
    initialize: (statePath, intialState) => new Subject<any>(),
    select: (statePath: string[]) => new Subject()
};


describe('InjectStore decorator', () => {
    let target;
    let componentInstance = {};

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
    });

    let setup = (newPath: string[] | string | ((currentPath, stateIndex) => string[] | string), intialState?: Object | any, debug: boolean = false) => {
        jest.clearAllMocks();
        NgStateTestBed.registerDependency(Store, store);
        NgStateTestBed.registerDependency(Dispatcher, new Dispatcher());
        NgStateTestBed.registerDependency(StateHistory, new StateHistory());
        const decorator = InjectStore(newPath, intialState, debug);
        decorator(TestStateActions);
        target = new TestStateActions();
        StateKeeper.CURRENT_STATE = fromJS({});
        jest.spyOn(StateKeeper.CURRENT_STATE, 'getIn').mockReturnValue(() => true);
    };

    it('should resolve state path from anonymous function', () => {
        setup((currentPath, stateIndex) => 'new path');
        const newPath = target.createStore();

        expect(newPath.length).toEqual(1);
        expect(newPath[0]).toBe('new path');
    });

    it('should extract absolute path', () => {
        setup('new/${stateIndex}/path/${stateIndex}');
        const newPath = target.createStore(null, [1, 2]);

        expect(newPath.length).toEqual(4);
        expect(newPath[0]).toBe('new');
        expect(newPath[1]).toBe(1);
        expect(newPath[2]).toBe('path');
        expect(newPath[3]).toBe(2);
    });

    it('should extract relative path', () => {
        setup(['test', '${stateIndex}', 'path']);
        const newPath = target.createStore(['parent'], 1);

        expect(newPath.length).toEqual(4);
        expect(newPath[0]).toBe('parent');
        expect(newPath[1]).toBe('test');
        expect(newPath[2]).toBe(1);
        expect(newPath[3]).toBe('path');
    });

    it('should create store', () => {
        setup(['test', '${stateIndex}', 'path']);
        target.createStore(['parent'], 1);

        expect(target.store).toBeDefined();
    });

    it('should initialize store with initial values if provided', () => {
        setup(['test', '${stateIndex}', 'path'], { test: 'test' });
        target.store = store;
        jest.spyOn(store, 'initialize').mockReturnValueOnce(new Subject<any>());

        target.createStore(['parent'], 1);

        expect(store.initialize).toHaveBeenCalled();
    });

    it('should convert getters to properties', () => {
        setup((currentPath, stateIndex) => 'new path');
        componentInstance = target;

        expect(typeof (<any>componentInstance).isOpened).toEqual('boolean');
    });

    it('should check path', () => {
        NgStateTestBed.registerDependency(IS_TEST, false);
        jest.spyOn(console, 'error');
        setup(['test']);
        target.createStore(['parent']);
        expect(console.error).toHaveBeenCalled();
    });

    it('should check path if debug is set', () => {
        jest.spyOn(console, 'error');
        setup(['test'], null, true);
        target.createStore(['parent']);
        expect(console.error).toHaveBeenCalled();
    });

    it('should not check path for prod', () => {
        NgStateTestBed.registerDependency(IS_PROD, true);
        jest.spyOn(console, 'error');
        setup(['test'], null, true);
        target.createStore(['parent']);
        expect(console.error).not.toHaveBeenCalled();
    });
});