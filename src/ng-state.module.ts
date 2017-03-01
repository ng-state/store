import { Router, NavigationCancel, NavigationEnd, RoutesRecognized } from '@angular/router';
import { NgModule, ModuleWithProviders, Injector, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from './store/store';
import { State } from './state/state';
import { ServiceLocator } from './helpers/service-locator';
import { StateHistory } from './state/history';
import { StateHistoryComponent } from './state/state-history';


export const INITIAL_STATE = new OpaqueToken('INITIAL_STATE');
export const COLLECT_HISTORY = new OpaqueToken('COLLECT_HISTORY');
export const STORE_HISTORY_ITEMS = new OpaqueToken('STORE_HISTORY_ITEMS');

export function stateFactory(initialState) {
    return new State(initialState);
}

export function storeFactory(state: State<any>) {
    return new Store(state);
}

export function historyFactory(state: State<any>, collectHistory, storeHistoryItems) {
    return new StateHistory(state, collectHistory, storeHistoryItems);
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
                { provide: StateHistory, useFactory: historyFactory, deps: [State, COLLECT_HISTORY, STORE_HISTORY_ITEMS] },
            ]
        };
    }

    constructor(injector: Injector, stateHistory: StateHistory, private store: Store<any>, private router: Router) {
        ServiceLocator.injector = injector;
        this.initRouter();
        this.bindRouter();
        stateHistory.init();
        (<any>window).state = StateHistory;
    }

    private initRouter() {
        const initialRouteSubscription = this.router.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
                this.store.initialize(['router'], { url: event.url }, false);
                initialRouteSubscription.unsubscribe();
            }
        });
    }

    bindRouter() {
        if (!this.router.events) {
            return;
        }

        let cancelledId = -1;
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationCancel) {
                cancelledId = (<NavigationCancel>event).id;
            }
            if (event instanceof NavigationEnd && (<NavigationEnd>event).id !== cancelledId) {
                (<Store<any>>this.store.select(['router'])).update(state => {
                    state.set('url', event.url);
                });
            }
        });
    }
}