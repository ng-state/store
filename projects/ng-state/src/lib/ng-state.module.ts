import {
    Inject,
    Injector,
    ModuleWithProviders,
    NgModule,
    NgZone,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Dispatcher } from "./services/dispatcher";
import { Router } from "@angular/router";
import { RouterState } from "./state/router-state";
import { ServiceLocator } from "./helpers/service-locator";
import { State } from "./state/state";
import {
    StateHistory,
    StateHistoryOptions,
    StateKeeper,
} from "./state/history";
import { Store } from "./store/store";
import { HistoryController } from "./state/history-controller";
import { DebugInfo, DebugOptions } from "./debug/debug-info";
import { DataStrategy } from "@ng-state/data-strategy";
import {
    NG_STATE_OPTIONS,
    INITIAL_STATE,
    IS_PROD,
    IS_TEST,
} from "./inject-constants";

export function stateFactory(initialState: any, dataStrategy: DataStrategy) {
    return new State(initialState, dataStrategy);
}

export function storeFactory(state: State<any>) {
    return new Store(state);
}

export function historyControllerFactory(
    store: Store<any>,
    history: StateHistory,
    debugerInfo: DebugInfo,
    router: Router,
    dataStrategy: DataStrategy
) {
    return new HistoryController(
        store,
        history,
        debugerInfo,
        router,
        dataStrategy
    );
}

export function routerStateFactory(
    store: Store<any>,
    router: Router,
    debugerInfo: DebugInfo
) {
    return new RouterState(store, router, debugerInfo);
}

export function debugInfoFactory(
    history: StateHistory,
    zone: NgZone,
    dataStrategy: DataStrategy
) {
    return new DebugInfo(history, zone, dataStrategy);
}

@NgModule({
    imports: [CommonModule],
})
export class StoreModule {
    static provideStore(
        initialState: any,
        isProd?: boolean,
        options: NgStateOptions = {},
    ): ModuleWithProviders<StoreModule> {
        return {
            ngModule: StoreModule,
            providers: [
                { provide: NG_STATE_OPTIONS, useValue: options },
                { provide: INITIAL_STATE, useValue: initialState },
                { provide: IS_PROD, useValue: isProd },
                { provide: IS_TEST, useValue: false },
                {
                    provide: State,
                    useFactory: stateFactory,
                    deps: [INITIAL_STATE, DataStrategy],
                },
                { provide: Store, useFactory: storeFactory, deps: [State] },
                { provide: StateHistory, useClass: StateHistory },
                {
                    provide: DebugInfo,
                    useFactory: debugInfoFactory,
                    deps: [StateHistory, NgZone, DataStrategy],
                },
                {
                    provide: HistoryController,
                    useFactory: historyControllerFactory,
                    deps: [Store, StateHistory, DebugInfo, Router, DataStrategy],
                },
                {
                    provide: RouterState,
                    useFactory: routerStateFactory,
                    deps: [Store, Router, DebugInfo],
                },

                Dispatcher,
            ],
        };
    }

    constructor(
        private stateHistory: StateHistory,
        private debugInfo: DebugInfo,
        injector: Injector,
        historyController: HistoryController,
        routerState: RouterState,
        dataStrategy: DataStrategy,
        store: Store<any>,
        @Inject(INITIAL_STATE) initialState: any,
        @Inject(NG_STATE_OPTIONS) ngStateOptions: any,
        @Inject(IS_PROD) isProd: any
    ) {
        ServiceLocator.injector = injector;
        this.initStateHistory(initialState, ngStateOptions);
        this.initDebugger(ngStateOptions);
        historyController.init();

        routerState.init();

        if (!isProd) {
            this.ensureWindowObject();
            (<any>window).state = {
                history: StateKeeper,
                debug: debugInfo.publicApi,
            };
        }

        dataStrategy.init(store, isProd);
    }

    private ensureWindowObject() {
        var global = global || globalThis.global || (globalThis as any);
        if (global["window"] === undefined) {
            global["window"] = global;
        }
    }

    private initStateHistory(initialState: any, ngStateOptions: NgStateOptions) {
        if (ngStateOptions && ngStateOptions.history) {
            this.stateHistory.changeDefaults(ngStateOptions.history);
        }

        this.stateHistory.init(initialState);
    }

    private initDebugger(ngStateOptions: NgStateOptions) {
        DebugInfo.instance = this.debugInfo;

        if (!ngStateOptions || !ngStateOptions.debugger) {
            return;
        }

        if (ngStateOptions.debugger.options) {
            this.debugInfo.changeDefaults(ngStateOptions.debugger.options);
        }

        if (ngStateOptions.debugger.enableInitialDebugging) {
            this.debugInfo.init(true);
        }
    }
}

export interface NgStateOptions {
    history?: StateHistoryOptions;
    debugger?: {
        enableInitialDebugging?: boolean;
        options?: DebugOptions;
    };
}
