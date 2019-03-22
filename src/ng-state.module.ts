import { Inject, Injector, ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Dispatcher } from './services/dispatcher';
import { Router } from '@angular/router';
import { RouterState } from './state/router-state';
import { ServiceLocator } from './helpers/service-locator';
import { State } from './state/state';
import { StateHistory } from './state/history';
import { StateHistoryComponent } from './state/state-history';
import { Store } from './store/store';
import { HistoryController } from './state/history-controller';

export const RESTORE_FROM_SERVER = new InjectionToken('RESTORE_FROM_SERVER');
export const TRANSFER_STATE_KEY = 'state';
export const INITIAL_STATE = new InjectionToken('INITIAL_STATE');
export const COLLECT_HISTORY = new InjectionToken('COLLECT_HISTORY');
export const STORE_HISTORY_ITEMS = new InjectionToken('STORE_HISTORY_ITEMS');
export const IS_PROD = new InjectionToken('IS_PROD');
export const IS_TEST = new InjectionToken('IS_TEST');

export function stateFactory(initialState, transferState?: TransferState, restoreFromServer?: boolean) {
    if (transferState && restoreFromServer) {
        const stateKey = makeStateKey<any>(TRANSFER_STATE_KEY);
        if (transferState.hasKey(stateKey)) {
            initialState = transferState.get(stateKey, initialState);
        }
    }

    return new State(initialState);
}

export function storeFactory(state: State<any>) {
    return new Store(state);
}

export function historyControllerFactory(store: Store<any>, history: StateHistory) {
    return new HistoryController(store, history);
}

export function routerStateFactory(store: Store<any>, router: Router) {
    return new RouterState(store, router);
}

@NgModule({
    imports: [CommonModule],
    declarations: [StateHistoryComponent],
    exports: [StateHistoryComponent]
})
export class StoreModule {
    static provideStore(initialState: any, isProd?: boolean, restoreStateFromServer?: boolean, collectHistory?: boolean, storeHistoryItems?: number): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [
                { provide: STORE_HISTORY_ITEMS, useValue: storeHistoryItems },
                { provide: COLLECT_HISTORY, useValue: collectHistory },
                { provide: INITIAL_STATE, useValue: initialState },
                { provide: IS_PROD, useValue: isProd },
                { provide: IS_TEST, useValue: false },
                { provide: RESTORE_FROM_SERVER, useValue: restoreStateFromServer },
                { provide: State, useFactory: stateFactory, deps: [INITIAL_STATE, TransferState, RESTORE_FROM_SERVER] },
                { provide: Store, useFactory: storeFactory, deps: [State] },
                { provide: StateHistory, useClass: StateHistory },
                { provide: HistoryController, useFactory: historyControllerFactory, deps: [Store, StateHistory] },
                { provide: RouterState, useFactory: routerStateFactory, deps: [Store, Router] },
                Dispatcher
            ]
        };
    }

    constructor(
        injector: Injector,
        stateHistory: StateHistory,
        historyController: HistoryController,
        routerState: RouterState,
        @Inject(INITIAL_STATE) initialState: any,
        @Inject(STORE_HISTORY_ITEMS) storeHistoryItems: any,
        @Inject(COLLECT_HISTORY) collectHistory: any,
        @Inject(IS_PROD) isProd: any
    ) {
        if (storeHistoryItems !== undefined) {
            StateHistory.collectHistory = collectHistory;
        }

        if (collectHistory !== undefined) {
            StateHistory.storeHistoryItems = storeHistoryItems;
        }

        ServiceLocator.injector = injector;
        stateHistory.init(initialState);
        historyController.init();
        routerState.init();

        if (!isProd) {
            (<any>window).state = StateHistory;
        }
    }
}