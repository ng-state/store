import { ServiceLocator } from './helpers/service-locator';
import { stateFactory, storeFactory } from './ng-state.module';
import { StateHistory } from './state/history';
import { Store } from './store/store';
import { HistoryController } from './state/history-controller';
import { DebugInfo } from './debug/debug-info';
import { DataStrategy } from '@ng-state/data-strategy';
import { IS_TEST, IS_PROD } from './inject-constants';
import { Dispatcher } from './services/dispatcher';
import { TestBed } from '@angular/core/testing';

export class NgStateTestBed {

    private static dataStrategy: DataStrategy = null;
    private static dependencyInjection = <{ key: any, value: any }[]>[];

    public static strictActionsCheck = true;

    public static setTestEnvironment(dataStrategy: DataStrategy) {
        this.dependencyInjection = [];
        this.dependencyInjection.push({ key: this.getMockName(IS_TEST), value: true });
        this.dependencyInjection.push({ key: this.getMockName(IS_PROD), value: false });
        this.dependencyInjection.push({ key: this.getMockName(DataStrategy), value: dataStrategy });
        this.dependencyInjection.push({ key: this.getMockName(Dispatcher), value: new Dispatcher() });

        ServiceLocator.injector = {
            get: (key: any) => {
                const name = this.getMockName(key);
                const service = this.dependencyInjection.find(k => k.key === name);
                if (!service) {
                    throw new Error(`Mock is not found for: ${key}`);
                }

                return service.value;
            }
        };

        this.dataStrategy = dataStrategy;
    }

    public static registerDependency(type: any, value: any) {
        const mockName = this.getMockName(type);
        const index = this.dependencyInjection.findIndex(d => d.key === mockName);
        if (index !== -1) {
            this.dependencyInjection.splice(index, 1);
        }

        this.dependencyInjection.push({ key: mockName, value: value });
    }

    public static createStore(initialState: any, path?: any[] | string): Store<any> {
        const state = stateFactory(initialState, this.dataStrategy);
        let store = storeFactory(state, false);

        if (path) {
            store = store.select(NgStateTestBed.getPath(path));
        }

        this.dataStrategy.init(store, false);

        const stateHistory = new StateHistory();
        stateHistory.init(initialState);
        const debugInfo = new DebugInfo(stateHistory, { run: () => { } } as any, this.dataStrategy);
        DebugInfo.instance = debugInfo;
        const historyController = new HistoryController(
            store,
            stateHistory,
            debugInfo,
            { navigateByUrl: () => new Promise(() => { }) } as any,
            this.dataStrategy);
        historyController.init();

        this.registerDependency(Store, store);
        this.registerDependency(StateHistory, stateHistory);
        this.registerDependency(HistoryController, historyController);

        return store;
    }

    public static createSignalActions<T>(actionsType: any, initialState: any = {}, path: string | any[] = []): T {
        return this.createActions(actionsType, initialState, path, { isSignalStore: true });
    }

    public static createActions<T>(actionsType: any, initialState: any = {}, path: string | any[] = [], options?: { isSignalStore: boolean }): T {
        this.createStore(initialState);
        const actions = TestBed.inject(actionsType, new (actionsType as any)(), { optional: true }) as any;
        actions.createTestStore(NgStateTestBed.getPath(path), options);

        return actions as T;
    }

    private static getMockName(obj: any) {
        if (obj === IS_TEST) {
            return 'IS_TEST';
        }

        if (obj.constructor.name.toLowerCase() !== 'function') {
            return obj.constructor.name;
        }

        return obj.prototype.constructor.name;
    }

    private static getPath(path: string | string[]) {
        if (path instanceof Array) {
            return path;
        }

        path = path.split('/');
        return path;
    }
}

export interface TestComponentActions {
    actionsType: any;
    instance: any;
    statePath: string | any[];
}