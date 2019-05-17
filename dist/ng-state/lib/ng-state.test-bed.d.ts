import { Store } from './store/store';
import { DataStrategy } from '@ng-state/data-strategy';
export declare class NgStateTestBed {
    private static dataStrategy;
    private static dependencyInjection;
    static setTestEnvironment(dataStrategy: DataStrategy): void;
    static createStore(initialState: any): Store<any>;
    private static getMockName;
    static createActions<T>(actionsType: any, initialState?: any, path?: string | any[]): T;
    static setActionsToComponent(actions: any, component: any): void;
    private static getPath;
}
