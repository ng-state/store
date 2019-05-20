/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injector, NgModule, InjectionToken, NgZone } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Dispatcher } from './services/dispatcher';
import { Router } from '@angular/router';
import { RouterState } from './state/router-state';
import { ServiceLocator } from './helpers/service-locator';
import { State } from './state/state';
import { StateHistory, StateKeeper } from './state/history';
import { Store } from './store/store';
import { HistoryController } from './state/history-controller';
import { DebugInfo } from './debug/debug-info';
import { DataStrategy } from '@ng-state/data-strategy';
/** @type {?} */
export const RESTORE_FROM_SERVER = new InjectionToken('RESTORE_FROM_SERVER');
/** @type {?} */
export const TRANSFER_STATE_KEY = 'state';
/** @type {?} */
export const INITIAL_STATE = new InjectionToken('INITIAL_STATE');
/** @type {?} */
export const NG_STATE_OPTIONS = new InjectionToken('NG_STATE_OPTIONS');
/** @type {?} */
export const IS_PROD = new InjectionToken('IS_PROD');
/** @type {?} */
export const IS_TEST = new InjectionToken('IS_TEST');
/**
 * @param {?} initialState
 * @param {?} dataStrategy
 * @param {?=} transferState
 * @param {?=} restoreFromServer
 * @return {?}
 */
export function stateFactory(initialState, dataStrategy, transferState, restoreFromServer) {
    if (transferState && restoreFromServer) {
        /** @type {?} */
        const stateKey = makeStateKey(TRANSFER_STATE_KEY);
        if (transferState.hasKey(stateKey)) {
            initialState = transferState.get(stateKey, initialState);
        }
    }
    return new State(initialState, dataStrategy);
}
/**
 * @param {?} state
 * @return {?}
 */
export function storeFactory(state) {
    return new Store(state);
}
/**
 * @param {?} store
 * @param {?} history
 * @param {?} debugerInfo
 * @param {?} router
 * @param {?} dataStrategy
 * @return {?}
 */
export function historyControllerFactory(store, history, debugerInfo, router, dataStrategy) {
    return new HistoryController(store, history, debugerInfo, router, dataStrategy);
}
/**
 * @param {?} store
 * @param {?} router
 * @param {?} debugerInfo
 * @return {?}
 */
export function routerStateFactory(store, router, debugerInfo) {
    return new RouterState(store, router, debugerInfo);
}
/**
 * @param {?} history
 * @param {?} zone
 * @param {?} dataStrategy
 * @return {?}
 */
export function debugInfoFactory(history, zone, dataStrategy) {
    return new DebugInfo(history, zone, dataStrategy);
}
export class StoreModule {
    /**
     * @param {?} stateHistory
     * @param {?} debugInfo
     * @param {?} injector
     * @param {?} historyController
     * @param {?} routerState
     * @param {?} dataStrategy
     * @param {?} store
     * @param {?} initialState
     * @param {?} ngStateOptions
     * @param {?} isProd
     */
    constructor(stateHistory, debugInfo, injector, historyController, routerState, dataStrategy, store, initialState, ngStateOptions, isProd) {
        this.stateHistory = stateHistory;
        this.debugInfo = debugInfo;
        ServiceLocator.injector = injector;
        this.initStateHistory(initialState, ngStateOptions);
        this.initDebugger(ngStateOptions);
        historyController.init();
        routerState.init();
        // if (!isProd) {
        ((/** @type {?} */ (window))).state = {
            history: StateKeeper,
            debug: debugInfo.publicApi
        };
        // }
        dataStrategy.init(store, isProd);
    }
    /**
     * @param {?} initialState
     * @param {?=} isProd
     * @param {?=} options
     * @param {?=} restoreStateFromServer
     * @return {?}
     */
    static provideStore(initialState, isProd, options = {}, restoreStateFromServer) {
        return {
            ngModule: StoreModule,
            providers: [
                { provide: NG_STATE_OPTIONS, useValue: options },
                { provide: INITIAL_STATE, useValue: initialState },
                { provide: IS_PROD, useValue: isProd },
                { provide: IS_TEST, useValue: false },
                { provide: RESTORE_FROM_SERVER, useValue: restoreStateFromServer },
                { provide: State, useFactory: stateFactory, deps: [INITIAL_STATE, DataStrategy, TransferState, RESTORE_FROM_SERVER] },
                { provide: Store, useFactory: storeFactory, deps: [State] },
                { provide: StateHistory, useClass: StateHistory },
                { provide: DebugInfo, useFactory: debugInfoFactory, deps: [StateHistory, NgZone, DataStrategy] },
                { provide: HistoryController, useFactory: historyControllerFactory, deps: [Store, StateHistory, DebugInfo, Router, DataStrategy] },
                { provide: RouterState, useFactory: routerStateFactory, deps: [Store, Router, DebugInfo] },
                Dispatcher
            ]
        };
    }
    /**
     * @private
     * @param {?} initialState
     * @param {?} ngStateOptions
     * @return {?}
     */
    initStateHistory(initialState, ngStateOptions) {
        if (ngStateOptions && ngStateOptions.history) {
            this.stateHistory.changeDefaults(ngStateOptions.history);
        }
        this.stateHistory.init(initialState);
    }
    /**
     * @private
     * @param {?} ngStateOptions
     * @return {?}
     */
    initDebugger(ngStateOptions) {
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
StoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule]
            },] }
];
/** @nocollapse */
StoreModule.ctorParameters = () => [
    { type: StateHistory },
    { type: DebugInfo },
    { type: Injector },
    { type: HistoryController },
    { type: RouterState },
    { type: DataStrategy },
    { type: Store },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [NG_STATE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [IS_PROD,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    StoreModule.prototype.stateHistory;
    /**
     * @type {?}
     * @private
     */
    StoreModule.prototype.debugInfo;
}
/**
 * @record
 */
export function NgStateOptions() { }
if (false) {
    /** @type {?|undefined} */
    NgStateOptions.prototype.history;
    /** @type {?|undefined} */
    NgStateOptions.prototype.debugger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc3RhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL25nLXN0YXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxZQUFZLEVBQXVCLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRXZELE1BQU0sT0FBTyxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQzs7QUFDNUUsTUFBTSxPQUFPLGtCQUFrQixHQUFHLE9BQU87O0FBQ3pDLE1BQU0sT0FBTyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsZUFBZSxDQUFD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WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVEO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLGNBQThCO1FBQy9DLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVwQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRTtZQUM3QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbEU7UUFFRCxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDOzs7WUEzRUosUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUMxQjs7OztZQTNDUSxZQUFZO1lBR1osU0FBUztZQVhELFFBQVE7WUFVaEIsaUJBQWlCO1lBTGpCLFdBQVc7WUFPWCxZQUFZO1lBSFosS0FBSzs0Q0F3RUwsTUFBTSxTQUFDLGFBQWE7NENBQ3BCLE1BQU0sU0FBQyxnQkFBZ0I7NENBQ3ZCLE1BQU0sU0FBQyxPQUFPOzs7Ozs7O0lBVGYsbUNBQWtDOzs7OztJQUNsQyxnQ0FBNEI7Ozs7O0FBb0RwQyxvQ0FNQzs7O0lBTEcsaUNBQThCOztJQUM5QixrQ0FHRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0b3IsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG1ha2VTdGF0ZUtleSwgVHJhbnNmZXJTdGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEaXNwYXRjaGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9kaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUm91dGVyU3RhdGUgfSBmcm9tICcuL3N0YXRlL3JvdXRlci1zdGF0ZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi9oZWxwZXJzL3NlcnZpY2UtbG9jYXRvcic7XHJcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9zdGF0ZSc7XHJcbmltcG9ydCB7IFN0YXRlSGlzdG9yeSwgU3RhdGVIaXN0b3J5T3B0aW9ucywgU3RhdGVLZWVwZXIgfSBmcm9tICcuL3N0YXRlL2hpc3RvcnknO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUvc3RvcmUnO1xyXG5pbXBvcnQgeyBIaXN0b3J5Q29udHJvbGxlciB9IGZyb20gJy4vc3RhdGUvaGlzdG9yeS1jb250cm9sbGVyJztcclxuaW1wb3J0IHsgRGVidWdJbmZvLCBEZWJ1Z09wdGlvbnMgfSBmcm9tICcuL2RlYnVnL2RlYnVnLWluZm8nO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY29uc3QgUkVTVE9SRV9GUk9NX1NFUlZFUiA9IG5ldyBJbmplY3Rpb25Ub2tlbignUkVTVE9SRV9GUk9NX1NFUlZFUicpO1xyXG5leHBvcnQgY29uc3QgVFJBTlNGRVJfU1RBVEVfS0VZID0gJ3N0YXRlJztcclxuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBVEUgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0lOSVRJQUxfU1RBVEUnKTtcclxuZXhwb3J0IGNvbnN0IE5HX1NUQVRFX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ05HX1NUQVRFX09QVElPTlMnKTtcclxuZXhwb3J0IGNvbnN0IElTX1BST0QgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0lTX1BST0QnKTtcclxuZXhwb3J0IGNvbnN0IElTX1RFU1QgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0lTX1RFU1QnKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGF0ZUZhY3RvcnkoaW5pdGlhbFN0YXRlLCBkYXRhU3RyYXRlZ3k6IERhdGFTdHJhdGVneSwgdHJhbnNmZXJTdGF0ZT86IFRyYW5zZmVyU3RhdGUsIHJlc3RvcmVGcm9tU2VydmVyPzogYm9vbGVhbikge1xyXG4gICAgaWYgKHRyYW5zZmVyU3RhdGUgJiYgcmVzdG9yZUZyb21TZXJ2ZXIpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZUtleSA9IG1ha2VTdGF0ZUtleTxhbnk+KFRSQU5TRkVSX1NUQVRFX0tFWSk7XHJcbiAgICAgICAgaWYgKHRyYW5zZmVyU3RhdGUuaGFzS2V5KHN0YXRlS2V5KSkge1xyXG4gICAgICAgICAgICBpbml0aWFsU3RhdGUgPSB0cmFuc2ZlclN0YXRlLmdldChzdGF0ZUtleSwgaW5pdGlhbFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBTdGF0ZShpbml0aWFsU3RhdGUsIGRhdGFTdHJhdGVneSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdG9yZUZhY3Rvcnkoc3RhdGU6IFN0YXRlPGFueT4pIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmUoc3RhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGlzdG9yeUNvbnRyb2xsZXJGYWN0b3J5KHN0b3JlOiBTdG9yZTxhbnk+LCBoaXN0b3J5OiBTdGF0ZUhpc3RvcnksIGRlYnVnZXJJbmZvOiBEZWJ1Z0luZm8sIHJvdXRlcjogUm91dGVyLCBkYXRhU3RyYXRlZ3k6IERhdGFTdHJhdGVneSkge1xyXG4gICAgcmV0dXJuIG5ldyBIaXN0b3J5Q29udHJvbGxlcihzdG9yZSwgaGlzdG9yeSwgZGVidWdlckluZm8sIHJvdXRlciwgZGF0YVN0cmF0ZWd5KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRlclN0YXRlRmFjdG9yeShzdG9yZTogU3RvcmU8YW55Piwgcm91dGVyOiBSb3V0ZXIsIGRlYnVnZXJJbmZvOiBEZWJ1Z0luZm8pIHtcclxuICAgIHJldHVybiBuZXcgUm91dGVyU3RhdGUoc3RvcmUsIHJvdXRlciwgZGVidWdlckluZm8pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVidWdJbmZvRmFjdG9yeShoaXN0b3J5OiBTdGF0ZUhpc3RvcnksIHpvbmU6IE5nWm9uZSwgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3kpIHtcclxuICAgIHJldHVybiBuZXcgRGVidWdJbmZvKGhpc3RvcnksIHpvbmUsIGRhdGFTdHJhdGVneSk7XHJcbn1cclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JlTW9kdWxlIHtcclxuICAgIHN0YXRpYyBwcm92aWRlU3RvcmUoaW5pdGlhbFN0YXRlOiBhbnksIGlzUHJvZD86IGJvb2xlYW4sIG9wdGlvbnM6IE5nU3RhdGVPcHRpb25zID0ge30sIHJlc3RvcmVTdGF0ZUZyb21TZXJ2ZXI/OiBib29sZWFuKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IFN0b3JlTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogTkdfU1RBVEVfT1BUSU9OUywgdXNlVmFsdWU6IG9wdGlvbnMgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IGluaXRpYWxTdGF0ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBJU19QUk9ELCB1c2VWYWx1ZTogaXNQcm9kIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IElTX1RFU1QsIHVzZVZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBSRVNUT1JFX0ZST01fU0VSVkVSLCB1c2VWYWx1ZTogcmVzdG9yZVN0YXRlRnJvbVNlcnZlciB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBTdGF0ZSwgdXNlRmFjdG9yeTogc3RhdGVGYWN0b3J5LCBkZXBzOiBbSU5JVElBTF9TVEFURSwgRGF0YVN0cmF0ZWd5LCBUcmFuc2ZlclN0YXRlLCBSRVNUT1JFX0ZST01fU0VSVkVSXSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBTdG9yZSwgdXNlRmFjdG9yeTogc3RvcmVGYWN0b3J5LCBkZXBzOiBbU3RhdGVdIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFN0YXRlSGlzdG9yeSwgdXNlQ2xhc3M6IFN0YXRlSGlzdG9yeSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBEZWJ1Z0luZm8sIHVzZUZhY3Rvcnk6IGRlYnVnSW5mb0ZhY3RvcnksIGRlcHM6IFtTdGF0ZUhpc3RvcnksIE5nWm9uZSwgRGF0YVN0cmF0ZWd5XSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBIaXN0b3J5Q29udHJvbGxlciwgdXNlRmFjdG9yeTogaGlzdG9yeUNvbnRyb2xsZXJGYWN0b3J5LCBkZXBzOiBbU3RvcmUsIFN0YXRlSGlzdG9yeSwgRGVidWdJbmZvLCBSb3V0ZXIsIERhdGFTdHJhdGVneV0gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogUm91dGVyU3RhdGUsIHVzZUZhY3Rvcnk6IHJvdXRlclN0YXRlRmFjdG9yeSwgZGVwczogW1N0b3JlLCBSb3V0ZXIsIERlYnVnSW5mb10gfSxcclxuICAgICAgICAgICAgICAgIERpc3BhdGNoZXJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZUhpc3Rvcnk6IFN0YXRlSGlzdG9yeSxcclxuICAgICAgICBwcml2YXRlIGRlYnVnSW5mbzogRGVidWdJbmZvLFxyXG4gICAgICAgIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgICAgICBoaXN0b3J5Q29udHJvbGxlcjogSGlzdG9yeUNvbnRyb2xsZXIsXHJcbiAgICAgICAgcm91dGVyU3RhdGU6IFJvdXRlclN0YXRlLFxyXG4gICAgICAgIGRhdGFTdHJhdGVneTogRGF0YVN0cmF0ZWd5LFxyXG4gICAgICAgIHN0b3JlOiBTdG9yZTxhbnk+LFxyXG4gICAgICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgaW5pdGlhbFN0YXRlOiBhbnksXHJcbiAgICAgICAgQEluamVjdChOR19TVEFURV9PUFRJT05TKSBuZ1N0YXRlT3B0aW9uczogYW55LFxyXG4gICAgICAgIEBJbmplY3QoSVNfUFJPRCkgaXNQcm9kOiBhbnlcclxuICAgICkge1xyXG4gICAgICAgIFNlcnZpY2VMb2NhdG9yLmluamVjdG9yID0gaW5qZWN0b3I7XHJcbiAgICAgICAgdGhpcy5pbml0U3RhdGVIaXN0b3J5KGluaXRpYWxTdGF0ZSwgbmdTdGF0ZU9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuaW5pdERlYnVnZ2VyKG5nU3RhdGVPcHRpb25zKTtcclxuICAgICAgICBoaXN0b3J5Q29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gICAgICAgIHJvdXRlclN0YXRlLmluaXQoKTtcclxuXHJcbiAgICAgICAgLy8gaWYgKCFpc1Byb2QpIHtcclxuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIGhpc3Rvcnk6IFN0YXRlS2VlcGVyLFxyXG4gICAgICAgICAgICAgICAgZGVidWc6IGRlYnVnSW5mby5wdWJsaWNBcGlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGRhdGFTdHJhdGVneS5pbml0KHN0b3JlLCBpc1Byb2QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFN0YXRlSGlzdG9yeShpbml0aWFsU3RhdGU6IGFueSwgbmdTdGF0ZU9wdGlvbnM6IE5nU3RhdGVPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG5nU3RhdGVPcHRpb25zICYmIG5nU3RhdGVPcHRpb25zLmhpc3RvcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhpc3RvcnkuY2hhbmdlRGVmYXVsdHMobmdTdGF0ZU9wdGlvbnMuaGlzdG9yeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXRlSGlzdG9yeS5pbml0KGluaXRpYWxTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0RGVidWdnZXIobmdTdGF0ZU9wdGlvbnM6IE5nU3RhdGVPcHRpb25zKSB7XHJcbiAgICAgICAgRGVidWdJbmZvLmluc3RhbmNlID0gdGhpcy5kZWJ1Z0luZm87XHJcblxyXG4gICAgICAgIGlmICghbmdTdGF0ZU9wdGlvbnMgfHwgIW5nU3RhdGVPcHRpb25zLmRlYnVnZ2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuZ1N0YXRlT3B0aW9ucy5kZWJ1Z2dlci5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVidWdJbmZvLmNoYW5nZURlZmF1bHRzKG5nU3RhdGVPcHRpb25zLmRlYnVnZ2VyLm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5nU3RhdGVPcHRpb25zLmRlYnVnZ2VyLmVuYWJsZUluaXRpYWxEZWJ1Z2dpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Z0luZm8uaW5pdCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdTdGF0ZU9wdGlvbnMge1xyXG4gICAgaGlzdG9yeT86IFN0YXRlSGlzdG9yeU9wdGlvbnM7XHJcbiAgICBkZWJ1Z2dlcj86IHtcclxuICAgICAgICBlbmFibGVJbml0aWFsRGVidWdnaW5nPzogYm9vbGVhbjtcclxuICAgICAgICBvcHRpb25zPzogRGVidWdPcHRpb25zO1xyXG4gICAgfTtcclxufSJdfQ==