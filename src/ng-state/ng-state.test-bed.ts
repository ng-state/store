import { ServiceLocator } from './helpers/service-locator';
import { IS_TEST, stateFactory, storeFactory } from './ng-state.module';
import { StateHistory } from './state/history';
import { Store } from './store/store';
import { HistoryController } from './state/history-controller';
import { DebugInfo } from './debug/debug-info';
import { DataStrategy } from './data-strategies/data-strategy';

export class NgStateTestBed {

    private static dataStrategy: DataStrategy = null;
    private static dependencyInjection = <{ key: any, value: any }[]>[];

    public static setTestEnvironment(dataStrategy: DataStrategy) {
        this.dependencyInjection = [];
        this.dependencyInjection.push({ key: this.getMockName(IS_TEST), value: true });
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

    public static createStore(initialState: any): Store<any> {
        const state = stateFactory(initialState, this.dataStrategy);
        const store = storeFactory(state);
        this.dataStrategy.init(store);

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