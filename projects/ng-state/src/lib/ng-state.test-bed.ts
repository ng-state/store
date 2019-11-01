import { ServiceLocator } from './helpers/service-locator';
import { stateFactory, storeFactory } from './ng-state.module';
import { StateHistory } from './state/history';
import { Store } from './store/store';
import { HistoryController } from './state/history-controller';
import { DebugInfo } from './debug/debug-info';
import { DataStrategy } from '@ng-state/data-strategy';
import { IS_TEST, IS_PROD } from './inject-constants';

export class NgStateTestBed {

    private static dataStrategy: DataStrategy = null;
    private static dependencyInjection = <{ key: any, value: any }[]>[];

    private static actions: TestComponentActions[] = [];

    public static strictActionsCheck = true;

    public static getActionsInstance(actionsType: any, strictActionsCheck: boolean = true) {
        const componentActions = NgStateTestBed.actions.find(c => c.actionsType === actionsType);
        if (componentActions) {
            return componentActions.instance;
        } else if (strictActionsCheck) {
            throw new Error(`No actions were found for ${actionsType}`);
        } else {
            return null;
        }
    }

    public static setTestEnvironment(dataStrategy: DataStrategy) {
        this.dependencyInjection = [];
        this.dependencyInjection.push({ key: this.getMockName(IS_TEST), value: true });
        this.dependencyInjection.push({ key: this.getMockName(IS_PROD), value: false });
        this.dependencyInjection.push({ key: this.getMockName(DataStrategy), value: dataStrategy });
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

    public static createStore(initialState: any): Store<any> {
        const state = stateFactory(initialState, this.dataStrategy);
        const store = storeFactory(state);
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

        this.dependencyInjection.push({ key: this.getMockName(Store), value: store });
        this.dependencyInjection.push({ key: this.getMockName(StateHistory), value: stateHistory });
        this.dependencyInjection.push({ key: this.getMockName(HistoryController), value: historyController });

        return store;
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

    public static createActions<T>(actionsType: any, initialState: any = {}, path: string | any[] = []): T {
        this.createStore(initialState);
        const actions = new (actionsType as any)();
        actions.createTestStore(NgStateTestBed.getPath(path));

        if (!NgStateTestBed.getActionsInstance(actionsType, false)) {
            NgStateTestBed.actions.push({ actionsType, instance: actions });
        }

        return actions;
    }

    public static setActionsToComponent(actions: any, component: any) {
        (<any>component).actions = actions;
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
}