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
export var RESTORE_FROM_SERVER = new InjectionToken('RESTORE_FROM_SERVER');
/** @type {?} */
export var TRANSFER_STATE_KEY = 'state';
/** @type {?} */
export var INITIAL_STATE = new InjectionToken('INITIAL_STATE');
/** @type {?} */
export var NG_STATE_OPTIONS = new InjectionToken('NG_STATE_OPTIONS');
/** @type {?} */
export var IS_PROD = new InjectionToken('IS_PROD');
/** @type {?} */
export var IS_TEST = new InjectionToken('IS_TEST');
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
        var stateKey = makeStateKey(TRANSFER_STATE_KEY);
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
var StoreModule = /** @class */ (function () {
    function StoreModule(stateHistory, debugInfo, injector, historyController, routerState, dataStrategy, store, initialState, ngStateOptions, isProd) {
        this.stateHistory = stateHistory;
        this.debugInfo = debugInfo;
        ServiceLocator.injector = injector;
        this.initStateHistory(initialState, ngStateOptions);
        this.initDebugger(ngStateOptions);
        historyController.init();
        routerState.init();
        if (!isProd) {
            ((/** @type {?} */ (window))).state = StateHistory;
        }
        if (!isProd) {
            ((/** @type {?} */ (window))).state = {
                history: StateKeeper,
                debug: debugInfo.publicApi
            };
        }
        dataStrategy.init(store);
    }
    /**
     * @param {?} initialState
     * @param {?=} isProd
     * @param {?=} options
     * @param {?=} restoreStateFromServer
     * @return {?}
     */
    StoreModule.provideStore = /**
     * @param {?} initialState
     * @param {?=} isProd
     * @param {?=} options
     * @param {?=} restoreStateFromServer
     * @return {?}
     */
    function (initialState, isProd, options, restoreStateFromServer) {
        if (options === void 0) { options = {}; }
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
    };
    /**
     * @private
     * @param {?} initialState
     * @param {?} ngStateOptions
     * @return {?}
     */
    StoreModule.prototype.initStateHistory = /**
     * @private
     * @param {?} initialState
     * @param {?} ngStateOptions
     * @return {?}
     */
    function (initialState, ngStateOptions) {
        if (ngStateOptions && ngStateOptions.history) {
            this.stateHistory.changeDefaults(ngStateOptions.history);
        }
        this.stateHistory.init(initialState);
    };
    /**
     * @private
     * @param {?} ngStateOptions
     * @return {?}
     */
    StoreModule.prototype.initDebugger = /**
     * @private
     * @param {?} ngStateOptions
     * @return {?}
     */
    function (ngStateOptions) {
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
    };
    StoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule]
                },] }
    ];
    /** @nocollapse */
    StoreModule.ctorParameters = function () { return [
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
    ]; };
    return StoreModule;
}());
export { StoreModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc3RhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL25nLXN0YXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxZQUFZLEVBQXVCLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRXZELE1BQU0sS0FBTyxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQzs7QUFDNUUsTUFBTSxLQUFPLGtCQUFrQixHQUFHLE9BQU87O0FBQ3pDLE1BQU0sS0FBTyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsZUFBZSxDQUFD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TUM7OztJQUxHLGlDQUE4Qjs7SUFDOUIsa0NBR0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYWtlU3RhdGVLZXksIFRyYW5zZmVyU3RhdGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRGlzcGF0Y2hlciB9IGZyb20gJy4vc2VydmljZXMvZGlzcGF0Y2hlcic7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFJvdXRlclN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9yb3V0ZXItc3RhdGUnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vc3RhdGUvc3RhdGUnO1xyXG5pbXBvcnQgeyBTdGF0ZUhpc3RvcnksIFN0YXRlSGlzdG9yeU9wdGlvbnMsIFN0YXRlS2VlcGVyIH0gZnJvbSAnLi9zdGF0ZS9oaXN0b3J5JztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlL3N0b3JlJztcclxuaW1wb3J0IHsgSGlzdG9yeUNvbnRyb2xsZXIgfSBmcm9tICcuL3N0YXRlL2hpc3RvcnktY29udHJvbGxlcic7XHJcbmltcG9ydCB7IERlYnVnSW5mbywgRGVidWdPcHRpb25zIH0gZnJvbSAnLi9kZWJ1Zy9kZWJ1Zy1pbmZvJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJFU1RPUkVfRlJPTV9TRVJWRVIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1JFU1RPUkVfRlJPTV9TRVJWRVInKTtcclxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1NUQVRFX0tFWSA9ICdzdGF0ZSc7XHJcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVRFID0gbmV3IEluamVjdGlvblRva2VuKCdJTklUSUFMX1NUQVRFJyk7XHJcbmV4cG9ydCBjb25zdCBOR19TVEFURV9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuKCdOR19TVEFURV9PUFRJT05TJyk7XHJcbmV4cG9ydCBjb25zdCBJU19QUk9EID0gbmV3IEluamVjdGlvblRva2VuKCdJU19QUk9EJyk7XHJcbmV4cG9ydCBjb25zdCBJU19URVNUID0gbmV3IEluamVjdGlvblRva2VuKCdJU19URVNUJyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RhdGVGYWN0b3J5KGluaXRpYWxTdGF0ZSwgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3ksIHRyYW5zZmVyU3RhdGU/OiBUcmFuc2ZlclN0YXRlLCByZXN0b3JlRnJvbVNlcnZlcj86IGJvb2xlYW4pIHtcclxuICAgIGlmICh0cmFuc2ZlclN0YXRlICYmIHJlc3RvcmVGcm9tU2VydmVyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGVLZXkgPSBtYWtlU3RhdGVLZXk8YW55PihUUkFOU0ZFUl9TVEFURV9LRVkpO1xyXG4gICAgICAgIGlmICh0cmFuc2ZlclN0YXRlLmhhc0tleShzdGF0ZUtleSkpIHtcclxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlID0gdHJhbnNmZXJTdGF0ZS5nZXQoc3RhdGVLZXksIGluaXRpYWxTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgU3RhdGUoaW5pdGlhbFN0YXRlLCBkYXRhU3RyYXRlZ3kpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RvcmVGYWN0b3J5KHN0YXRlOiBTdGF0ZTxhbnk+KSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JlKHN0YXRlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhpc3RvcnlDb250cm9sbGVyRmFjdG9yeShzdG9yZTogU3RvcmU8YW55PiwgaGlzdG9yeTogU3RhdGVIaXN0b3J5LCBkZWJ1Z2VySW5mbzogRGVidWdJbmZvLCByb3V0ZXI6IFJvdXRlciwgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3kpIHtcclxuICAgIHJldHVybiBuZXcgSGlzdG9yeUNvbnRyb2xsZXIoc3RvcmUsIGhpc3RvcnksIGRlYnVnZXJJbmZvLCByb3V0ZXIsIGRhdGFTdHJhdGVneSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByb3V0ZXJTdGF0ZUZhY3Rvcnkoc3RvcmU6IFN0b3JlPGFueT4sIHJvdXRlcjogUm91dGVyLCBkZWJ1Z2VySW5mbzogRGVidWdJbmZvKSB7XHJcbiAgICByZXR1cm4gbmV3IFJvdXRlclN0YXRlKHN0b3JlLCByb3V0ZXIsIGRlYnVnZXJJbmZvKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnSW5mb0ZhY3RvcnkoaGlzdG9yeTogU3RhdGVIaXN0b3J5LCB6b25lOiBOZ1pvbmUsIGRhdGFTdHJhdGVneTogRGF0YVN0cmF0ZWd5KSB7XHJcbiAgICByZXR1cm4gbmV3IERlYnVnSW5mbyhoaXN0b3J5LCB6b25lLCBkYXRhU3RyYXRlZ3kpO1xyXG59XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yZU1vZHVsZSB7XHJcbiAgICBzdGF0aWMgcHJvdmlkZVN0b3JlKGluaXRpYWxTdGF0ZTogYW55LCBpc1Byb2Q/OiBib29sZWFuLCBvcHRpb25zOiBOZ1N0YXRlT3B0aW9ucyA9IHt9LCByZXN0b3JlU3RhdGVGcm9tU2VydmVyPzogYm9vbGVhbik6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTdG9yZU1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IE5HX1NUQVRFX09QVElPTlMsIHVzZVZhbHVlOiBvcHRpb25zIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiBpbml0aWFsU3RhdGUgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogSVNfUFJPRCwgdXNlVmFsdWU6IGlzUHJvZCB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBJU19URVNULCB1c2VWYWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogUkVTVE9SRV9GUk9NX1NFUlZFUiwgdXNlVmFsdWU6IHJlc3RvcmVTdGF0ZUZyb21TZXJ2ZXIgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogU3RhdGUsIHVzZUZhY3Rvcnk6IHN0YXRlRmFjdG9yeSwgZGVwczogW0lOSVRJQUxfU1RBVEUsIERhdGFTdHJhdGVneSwgVHJhbnNmZXJTdGF0ZSwgUkVTVE9SRV9GUk9NX1NFUlZFUl0gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogU3RvcmUsIHVzZUZhY3Rvcnk6IHN0b3JlRmFjdG9yeSwgZGVwczogW1N0YXRlXSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBTdGF0ZUhpc3RvcnksIHVzZUNsYXNzOiBTdGF0ZUhpc3RvcnkgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogRGVidWdJbmZvLCB1c2VGYWN0b3J5OiBkZWJ1Z0luZm9GYWN0b3J5LCBkZXBzOiBbU3RhdGVIaXN0b3J5LCBOZ1pvbmUsIERhdGFTdHJhdGVneV0gfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogSGlzdG9yeUNvbnRyb2xsZXIsIHVzZUZhY3Rvcnk6IGhpc3RvcnlDb250cm9sbGVyRmFjdG9yeSwgZGVwczogW1N0b3JlLCBTdGF0ZUhpc3RvcnksIERlYnVnSW5mbywgUm91dGVyLCBEYXRhU3RyYXRlZ3ldIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFJvdXRlclN0YXRlLCB1c2VGYWN0b3J5OiByb3V0ZXJTdGF0ZUZhY3RvcnksIGRlcHM6IFtTdG9yZSwgUm91dGVyLCBEZWJ1Z0luZm9dIH0sXHJcbiAgICAgICAgICAgICAgICBEaXNwYXRjaGVyXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgc3RhdGVIaXN0b3J5OiBTdGF0ZUhpc3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSBkZWJ1Z0luZm86IERlYnVnSW5mbyxcclxuICAgICAgICBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICAgICAgaGlzdG9yeUNvbnRyb2xsZXI6IEhpc3RvcnlDb250cm9sbGVyLFxyXG4gICAgICAgIHJvdXRlclN0YXRlOiBSb3V0ZXJTdGF0ZSxcclxuICAgICAgICBkYXRhU3RyYXRlZ3k6IERhdGFTdHJhdGVneSxcclxuICAgICAgICBzdG9yZTogU3RvcmU8YW55PixcclxuICAgICAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIGluaXRpYWxTdGF0ZTogYW55LFxyXG4gICAgICAgIEBJbmplY3QoTkdfU1RBVEVfT1BUSU9OUykgbmdTdGF0ZU9wdGlvbnM6IGFueSxcclxuICAgICAgICBASW5qZWN0KElTX1BST0QpIGlzUHJvZDogYW55XHJcbiAgICApIHtcclxuICAgICAgICBTZXJ2aWNlTG9jYXRvci5pbmplY3RvciA9IGluamVjdG9yO1xyXG4gICAgICAgIHRoaXMuaW5pdFN0YXRlSGlzdG9yeShpbml0aWFsU3RhdGUsIG5nU3RhdGVPcHRpb25zKTtcclxuICAgICAgICB0aGlzLmluaXREZWJ1Z2dlcihuZ1N0YXRlT3B0aW9ucyk7XHJcbiAgICAgICAgaGlzdG9yeUNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgICAgICByb3V0ZXJTdGF0ZS5pbml0KCk7XHJcblxyXG4gICAgICAgIGlmICghaXNQcm9kKSB7XHJcbiAgICAgICAgICAgICg8YW55PndpbmRvdykuc3RhdGUgPSBTdGF0ZUhpc3Rvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzUHJvZCkge1xyXG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeTogU3RhdGVLZWVwZXIsXHJcbiAgICAgICAgICAgICAgICBkZWJ1ZzogZGVidWdJbmZvLnB1YmxpY0FwaVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YVN0cmF0ZWd5LmluaXQoc3RvcmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFN0YXRlSGlzdG9yeShpbml0aWFsU3RhdGU6IGFueSwgbmdTdGF0ZU9wdGlvbnM6IE5nU3RhdGVPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG5nU3RhdGVPcHRpb25zICYmIG5nU3RhdGVPcHRpb25zLmhpc3RvcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUhpc3RvcnkuY2hhbmdlRGVmYXVsdHMobmdTdGF0ZU9wdGlvbnMuaGlzdG9yeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXRlSGlzdG9yeS5pbml0KGluaXRpYWxTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0RGVidWdnZXIobmdTdGF0ZU9wdGlvbnM6IE5nU3RhdGVPcHRpb25zKSB7XHJcbiAgICAgICAgRGVidWdJbmZvLmluc3RhbmNlID0gdGhpcy5kZWJ1Z0luZm87XHJcblxyXG4gICAgICAgIGlmICghbmdTdGF0ZU9wdGlvbnMgfHwgIW5nU3RhdGVPcHRpb25zLmRlYnVnZ2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuZ1N0YXRlT3B0aW9ucy5kZWJ1Z2dlci5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVidWdJbmZvLmNoYW5nZURlZmF1bHRzKG5nU3RhdGVPcHRpb25zLmRlYnVnZ2VyLm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5nU3RhdGVPcHRpb25zLmRlYnVnZ2VyLmVuYWJsZUluaXRpYWxEZWJ1Z2dpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Z0luZm8uaW5pdCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdTdGF0ZU9wdGlvbnMge1xyXG4gICAgaGlzdG9yeT86IFN0YXRlSGlzdG9yeU9wdGlvbnM7XHJcbiAgICBkZWJ1Z2dlcj86IHtcclxuICAgICAgICBlbmFibGVJbml0aWFsRGVidWdnaW5nPzogYm9vbGVhbjtcclxuICAgICAgICBvcHRpb25zPzogRGVidWdPcHRpb25zO1xyXG4gICAgfTtcclxufSJdfQ==