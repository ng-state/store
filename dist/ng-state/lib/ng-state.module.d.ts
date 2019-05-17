import { Injector, ModuleWithProviders, InjectionToken, NgZone } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterState } from './state/router-state';
import { State } from './state/state';
import { StateHistory, StateHistoryOptions } from './state/history';
import { Store } from './store/store';
import { HistoryController } from './state/history-controller';
import { DebugInfo, DebugOptions } from './debug/debug-info';
import { DataStrategy } from '@ng-state/data-strategy';
export declare const RESTORE_FROM_SERVER: InjectionToken<{}>;
export declare const TRANSFER_STATE_KEY = "state";
export declare const INITIAL_STATE: InjectionToken<{}>;
export declare const NG_STATE_OPTIONS: InjectionToken<{}>;
export declare const IS_PROD: InjectionToken<{}>;
export declare const IS_TEST: InjectionToken<{}>;
export declare function stateFactory(initialState: any, dataStrategy: DataStrategy, transferState?: TransferState, restoreFromServer?: boolean): State<any>;
export declare function storeFactory(state: State<any>): Store<{}>;
export declare function historyControllerFactory(store: Store<any>, history: StateHistory, debugerInfo: DebugInfo, router: Router, dataStrategy: DataStrategy): HistoryController;
export declare function routerStateFactory(store: Store<any>, router: Router, debugerInfo: DebugInfo): RouterState;
export declare function debugInfoFactory(history: StateHistory, zone: NgZone, dataStrategy: DataStrategy): DebugInfo;
export declare class StoreModule {
    private stateHistory;
    private debugInfo;
    static provideStore(initialState: any, isProd?: boolean, options?: NgStateOptions, restoreStateFromServer?: boolean): ModuleWithProviders;
    constructor(stateHistory: StateHistory, debugInfo: DebugInfo, injector: Injector, historyController: HistoryController, routerState: RouterState, dataStrategy: DataStrategy, store: Store<any>, initialState: any, ngStateOptions: any, isProd: any);
    private initStateHistory;
    private initDebugger;
}
export interface NgStateOptions {
    history?: StateHistoryOptions;
    debugger?: {
        enableInitialDebugging?: boolean;
        options?: DebugOptions;
    };
}
