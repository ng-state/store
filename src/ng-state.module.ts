import { Inject, Injector, ModuleWithProviders, NgModule, OpaqueToken } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Dispatcher } from './services/dispatcher';
import { Router } from '@angular/router';
import { RouterState } from './state/router-state';
import { ServiceLocator } from './helpers/service-locator';
import { State } from './state/state';
import { StateHistory } from './state/history';
import { StateHistoryComponent } from './state/state-history';
import { Store } from './store/store';

export const INITIAL_STATE = new OpaqueToken('INITIAL_STATE');
export const COLLECT_HISTORY = new OpaqueToken('COLLECT_HISTORY');
export const STORE_HISTORY_ITEMS = new OpaqueToken('STORE_HISTORY_ITEMS');

export function stateFactory(initialState) {
    return new State(initialState);
}

export function storeFactory(state: State<any>) {
    return new Store(state);
}

export function historyFactory(store: Store<any>) {
    return new StateHistory(store);
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
    static provideStore(initialState: any,
        collectHistory?: boolean,
        storeHistoryItems?: number
    ): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [
                { provide: STORE_HISTORY_ITEMS, useValue: storeHistoryItems },
                { provide: COLLECT_HISTORY, useValue: collectHistory },
                { provide: INITIAL_STATE, useValue: initialState },
                { provide: State, useFactory: stateFactory, deps: [INITIAL_STATE] },
                { provide: Store, useFactory: storeFactory, deps: [State] },
                { provide: StateHistory, useFactory: historyFactory, deps: [Store] },
                { provide: RouterState, useFactory: routerStateFactory, deps: [Store, Router] },
                Dispatcher
            ]
        };
    }

    constructor(
        injector: Injector,
        stateHistory: StateHistory,
        routerState: RouterState,
        @Inject(STORE_HISTORY_ITEMS) storeHistoryItems: any,
        @Inject(COLLECT_HISTORY) collectHistory: any
    ) {
        if (storeHistoryItems !== undefined) {
            StateHistory.collectHistory = collectHistory;
        }

        if (collectHistory !== undefined) {
            StateHistory.storeHistoryItems = storeHistoryItems;
        }

        ServiceLocator.injector = injector;
        stateHistory.init();
        routerState.init();
        (<any>window).state = StateHistory;
    }
}