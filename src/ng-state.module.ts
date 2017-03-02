import { NgModule, ModuleWithProviders, Injector, OpaqueToken } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from './store/store';
import { State } from './state/state';
import { ServiceLocator } from './helpers/service-locator';
import { StateHistory } from './state/history';
import { StateHistoryComponent } from './state/state-history';
import { RouterState } from './state/router-state';

export const INITIAL_STATE = new OpaqueToken('INITIAL_STATE');
export const COLLECT_HISTORY = new OpaqueToken('COLLECT_HISTORY');
export const STORE_HISTORY_ITEMS = new OpaqueToken('STORE_HISTORY_ITEMS');

export function stateFactory(initialState) {
    return new State(initialState);
}

export function storeFactory(state: State<any>) {
    return new Store(state);
}

export function historyFactory(store: Store<any>, collectHistory, storeHistoryItems) {
    return new StateHistory(store, collectHistory, storeHistoryItems);
}

export function routerStateFactory(store: Store<any>, router: Router) {
    return new RouterState(store, router);
}

@NgModule({
    imports: [ CommonModule ],
    declarations: [ StateHistoryComponent ],
    exports: [ StateHistoryComponent ]
})
export class StoreModule {
    static provideStore(initialState: any,
        collectHistory: boolean = true,
        storeHistoryItems: number = 100
    ): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [
                { provide: STORE_HISTORY_ITEMS, useValue: storeHistoryItems },
                { provide: COLLECT_HISTORY, useValue: collectHistory },
                { provide: INITIAL_STATE, useValue: initialState },
                { provide: State, useFactory: stateFactory, deps: [INITIAL_STATE] },
                { provide: Store, useFactory: storeFactory, deps: [State] },
                { provide: StateHistory, useFactory: historyFactory, deps: [Store, COLLECT_HISTORY, STORE_HISTORY_ITEMS] },
                { provide: RouterState, useFactory: routerStateFactory, deps: [Store, Router] },
            ]
        };
    }

    constructor(injector: Injector, stateHistory: StateHistory, routerState: RouterState) {
        ServiceLocator.injector = injector;
        stateHistory.init();
        routerState.init();
        (<any>window).state = StateHistory;
    }
}