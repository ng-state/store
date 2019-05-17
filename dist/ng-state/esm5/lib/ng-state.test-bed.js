/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ServiceLocator } from './helpers/service-locator';
import { IS_TEST, stateFactory, storeFactory } from './ng-state.module';
import { StateHistory } from './state/history';
import { Store } from './store/store';
import { HistoryController } from './state/history-controller';
import { DebugInfo } from './debug/debug-info';
import { DataStrategy } from '@ng-state/data-strategy';
var NgStateTestBed = /** @class */ (function () {
    function NgStateTestBed() {
    }
    /**
     * @param {?} dataStrategy
     * @return {?}
     */
    NgStateTestBed.setTestEnvironment = /**
     * @param {?} dataStrategy
     * @return {?}
     */
    function (dataStrategy) {
        var _this = this;
        this.dependencyInjection = [];
        this.dependencyInjection.push({ key: this.getMockName(IS_TEST), value: true });
        this.dependencyInjection.push({ key: this.getMockName(DataStrategy), value: dataStrategy });
        ServiceLocator.injector = {
            get: (/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var name = _this.getMockName(key);
                /** @type {?} */
                var service = _this.dependencyInjection.find((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return k.key === name; }));
                if (!service) {
                    throw new Error("Mock is not found for: " + key);
                }
                return service.value;
            })
        };
        this.dataStrategy = dataStrategy;
    };
    /**
     * @param {?} initialState
     * @return {?}
     */
    NgStateTestBed.createStore = /**
     * @param {?} initialState
     * @return {?}
     */
    function (initialState) {
        /** @type {?} */
        var state = stateFactory(initialState, this.dataStrategy);
        /** @type {?} */
        var store = storeFactory(state);
        this.dataStrategy.init(store);
        /** @type {?} */
        var stateHistory = new StateHistory();
        stateHistory.init(initialState);
        /** @type {?} */
        var debugInfo = new DebugInfo(stateHistory, (/** @type {?} */ ({ run: (/**
             * @return {?}
             */
            function () { }) })), this.dataStrategy);
        DebugInfo.instance = debugInfo;
        /** @type {?} */
        var historyController = new HistoryController(store, stateHistory, debugInfo, (/** @type {?} */ ({ navigateByUrl: (/**
             * @return {?}
             */
            function () { return new Promise((/**
             * @return {?}
             */
            function () { })); }) })), this.dataStrategy);
        historyController.init();
        this.dependencyInjection.push({ key: this.getMockName(Store), value: store });
        return store;
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    NgStateTestBed.getMockName = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (obj === IS_TEST) {
            return 'IS_TEST';
        }
        if (obj.constructor.name.toLowerCase() !== 'function') {
            return obj.constructor.name;
        }
        return obj.prototype.constructor.name;
    };
    /**
     * @template T
     * @param {?} actionsType
     * @param {?=} initialState
     * @param {?=} path
     * @return {?}
     */
    NgStateTestBed.createActions = /**
     * @template T
     * @param {?} actionsType
     * @param {?=} initialState
     * @param {?=} path
     * @return {?}
     */
    function (actionsType, initialState, path) {
        if (initialState === void 0) { initialState = {}; }
        if (path === void 0) { path = []; }
        this.createStore(initialState);
        /** @type {?} */
        var actions = new ((/** @type {?} */ (actionsType)))();
        actions.createTestStore(NgStateTestBed.getPath(path));
        return actions;
    };
    /**
     * @param {?} actions
     * @param {?} component
     * @return {?}
     */
    NgStateTestBed.setActionsToComponent = /**
     * @param {?} actions
     * @param {?} component
     * @return {?}
     */
    function (actions, component) {
        ((/** @type {?} */ (component))).actions = actions;
    };
    /**
     * @private
     * @param {?} path
     * @return {?}
     */
    NgStateTestBed.getPath = /**
     * @private
     * @param {?} path
     * @return {?}
     */
    function (path) {
        if (path instanceof Array) {
            return path;
        }
        path = path.split('/');
        return path;
    };
    NgStateTestBed.dataStrategy = null;
    NgStateTestBed.dependencyInjection = (/** @type {?} */ ([]));
    return NgStateTestBed;
}());
export { NgStateTestBed };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgStateTestBed.dataStrategy;
    /**
     * @type {?}
     * @private
     */
    NgStateTestBed.dependencyInjection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc3RhdGUudGVzdC1iZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvbmctc3RhdGUudGVzdC1iZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZEO0lBQUE7SUE4RUEsQ0FBQzs7Ozs7SUF6RWlCLGlDQUFrQjs7OztJQUFoQyxVQUFpQyxZQUEwQjtRQUEzRCxpQkFrQkM7UUFqQkcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTVGLGNBQWMsQ0FBQyxRQUFRLEdBQUc7WUFDdEIsR0FBRzs7OztZQUFFLFVBQUMsR0FBUTs7b0JBQ0osSUFBSSxHQUFHLEtBQUksQ0FBQyxXQUFX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VUFBdUIsSUFBdUI7UUFDMUMsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBM0VjLDJCQUFZLEdBQWlCLElBQUksQ0FBQztJQUNsQyxrQ0FBbUIsR0FBRyxtQkFBNEIsRUFBRSxFQUFBLENBQUM7SUEyRXhFLHFCQUFDO0NBQUEsQUE5RUQsSUE4RUM7U0E5RVksY0FBYzs7Ozs7O0lBRXZCLDRCQUFpRDs7Ozs7SUFDakQsbUNBQW9FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZUxvY2F0b3IgfSBmcm9tICcuL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuaW1wb3J0IHsgSVNfVEVTVCwgc3RhdGVGYWN0b3J5LCBzdG9yZUZhY3RvcnkgfSBmcm9tICcuL25nLXN0YXRlLm1vZHVsZSc7XHJcbmltcG9ydCB7IFN0YXRlSGlzdG9yeSB9IGZyb20gJy4vc3RhdGUvaGlzdG9yeSc7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZS9zdG9yZSc7XHJcbmltcG9ydCB7IEhpc3RvcnlDb250cm9sbGVyIH0gZnJvbSAnLi9zdGF0ZS9oaXN0b3J5LWNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBEZWJ1Z0luZm8gfSBmcm9tICcuL2RlYnVnL2RlYnVnLWluZm8nO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmdTdGF0ZVRlc3RCZWQge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGRhdGFTdHJhdGVneTogRGF0YVN0cmF0ZWd5ID0gbnVsbDtcclxuICAgIHByaXZhdGUgc3RhdGljIGRlcGVuZGVuY3lJbmplY3Rpb24gPSA8eyBrZXk6IGFueSwgdmFsdWU6IGFueSB9W10+W107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRUZXN0RW52aXJvbm1lbnQoZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3kpIHtcclxuICAgICAgICB0aGlzLmRlcGVuZGVuY3lJbmplY3Rpb24gPSBbXTtcclxuICAgICAgICB0aGlzLmRlcGVuZGVuY3lJbmplY3Rpb24ucHVzaCh7IGtleTogdGhpcy5nZXRNb2NrTmFtZShJU19URVNUKSwgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgdGhpcy5kZXBlbmRlbmN5SW5qZWN0aW9uLnB1c2goeyBrZXk6IHRoaXMuZ2V0TW9ja05hbWUoRGF0YVN0cmF0ZWd5KSwgdmFsdWU6IGRhdGFTdHJhdGVneSB9KTtcclxuXHJcbiAgICAgICAgU2VydmljZUxvY2F0b3IuaW5qZWN0b3IgPSB7XHJcbiAgICAgICAgICAgIGdldDogKGtleTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRNb2NrTmFtZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZSA9IHRoaXMuZGVwZW5kZW5jeUluamVjdGlvbi5maW5kKGsgPT4gay5rZXkgPT09IG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNb2NrIGlzIG5vdCBmb3VuZCBmb3I6ICR7a2V5fWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhU3RyYXRlZ3kgPSBkYXRhU3RyYXRlZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVTdG9yZShpbml0aWFsU3RhdGU6IGFueSk6IFN0b3JlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVGYWN0b3J5KGluaXRpYWxTdGF0ZSwgdGhpcy5kYXRhU3RyYXRlZ3kpO1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gc3RvcmVGYWN0b3J5KHN0YXRlKTtcclxuICAgICAgICB0aGlzLmRhdGFTdHJhdGVneS5pbml0KHN0b3JlKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdGVIaXN0b3J5ID0gbmV3IFN0YXRlSGlzdG9yeSgpO1xyXG4gICAgICAgIHN0YXRlSGlzdG9yeS5pbml0KGluaXRpYWxTdGF0ZSk7XHJcbiAgICAgICAgY29uc3QgZGVidWdJbmZvID0gbmV3IERlYnVnSW5mbyhzdGF0ZUhpc3RvcnksIHsgcnVuOiAoKSA9PiB7IH0gfSBhcyBhbnksIHRoaXMuZGF0YVN0cmF0ZWd5KTtcclxuICAgICAgICBEZWJ1Z0luZm8uaW5zdGFuY2UgPSBkZWJ1Z0luZm87XHJcbiAgICAgICAgY29uc3QgaGlzdG9yeUNvbnRyb2xsZXIgPSBuZXcgSGlzdG9yeUNvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgIHN0b3JlLFxyXG4gICAgICAgICAgICBzdGF0ZUhpc3RvcnksXHJcbiAgICAgICAgICAgIGRlYnVnSW5mbyxcclxuICAgICAgICAgICAgeyBuYXZpZ2F0ZUJ5VXJsOiAoKSA9PiBuZXcgUHJvbWlzZSgoKSA9PiB7IH0pIH0gYXMgYW55LFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFTdHJhdGVneSk7XHJcbiAgICAgICAgaGlzdG9yeUNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmRlcGVuZGVuY3lJbmplY3Rpb24ucHVzaCh7IGtleTogdGhpcy5nZXRNb2NrTmFtZShTdG9yZSksIHZhbHVlOiBzdG9yZSB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TW9ja05hbWUob2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqID09PSBJU19URVNUKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnSVNfVEVTVCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2JqLmNvbnN0cnVjdG9yLm5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2JqLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQWN0aW9uczxUPihhY3Rpb25zVHlwZTogYW55LCBpbml0aWFsU3RhdGU6IGFueSA9IHt9LCBwYXRoOiBzdHJpbmcgfCBhbnlbXSA9IFtdKTogVCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTdG9yZShpbml0aWFsU3RhdGUpO1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSBuZXcgKGFjdGlvbnNUeXBlIGFzIGFueSkoKTtcclxuICAgICAgICBhY3Rpb25zLmNyZWF0ZVRlc3RTdG9yZShOZ1N0YXRlVGVzdEJlZC5nZXRQYXRoKHBhdGgpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRBY3Rpb25zVG9Db21wb25lbnQoYWN0aW9uczogYW55LCBjb21wb25lbnQ6IGFueSkge1xyXG4gICAgICAgICg8YW55PmNvbXBvbmVudCkuYWN0aW9ucyA9IGFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UGF0aChwYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgICAgIGlmIChwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXRoID0gcGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgfVxyXG59Il19