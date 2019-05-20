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
        this.dataStrategy.init(store, false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc3RhdGUudGVzdC1iZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvbmctc3RhdGUudGVzdC1iZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZEO0lBQUE7SUE4RUEsQ0FBQzs7Ozs7SUF6RWlCLGlDQUFrQjs7OztJQUFoQyxVQUFpQyxZQUEwQjtRQUEzRCxpQkFrQkM7UUFqQkcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTVGLGNBQWMsQ0FBQyxRQUFRLEdBQUc7WUFDdEIsR0FBRzs7OztZQUFFLFVBQUMsR0FBUTs7b0JBQ0osSUFBSSxHQUFHLEtBQUksQ0FBQyxXQUFX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Ozs7O0lBQXRCLFVBQXVCLElBQXVCO1FBQzFDLElBQUksSUFBSSxZQUFZLEtBQUssRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQTNFYywyQkFBWSxHQUFpQixJQUFJLENBQUM7SUFDbEMsa0NBQW1CLEdBQUcsbUJBQTRCLEVBQUUsRUFBQSxDQUFDO0lBMkV4RSxxQkFBQztDQUFBLEFBOUVELElBOEVDO1NBOUVZLGNBQWM7Ozs7OztJQUV2Qiw0QkFBaUQ7Ozs7O0lBQ2pELG1DQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi9oZWxwZXJzL3NlcnZpY2UtbG9jYXRvcic7XHJcbmltcG9ydCB7IElTX1RFU1QsIHN0YXRlRmFjdG9yeSwgc3RvcmVGYWN0b3J5IH0gZnJvbSAnLi9uZy1zdGF0ZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTdGF0ZUhpc3RvcnkgfSBmcm9tICcuL3N0YXRlL2hpc3RvcnknO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUvc3RvcmUnO1xyXG5pbXBvcnQgeyBIaXN0b3J5Q29udHJvbGxlciB9IGZyb20gJy4vc3RhdGUvaGlzdG9yeS1jb250cm9sbGVyJztcclxuaW1wb3J0IHsgRGVidWdJbmZvIH0gZnJvbSAnLi9kZWJ1Zy9kZWJ1Zy1pbmZvJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5nU3RhdGVUZXN0QmVkIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBkYXRhU3RyYXRlZ3k6IERhdGFTdHJhdGVneSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBkZXBlbmRlbmN5SW5qZWN0aW9uID0gPHsga2V5OiBhbnksIHZhbHVlOiBhbnkgfVtdPltdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0VGVzdEVudmlyb25tZW50KGRhdGFTdHJhdGVneTogRGF0YVN0cmF0ZWd5KSB7XHJcbiAgICAgICAgdGhpcy5kZXBlbmRlbmN5SW5qZWN0aW9uID0gW107XHJcbiAgICAgICAgdGhpcy5kZXBlbmRlbmN5SW5qZWN0aW9uLnB1c2goeyBrZXk6IHRoaXMuZ2V0TW9ja05hbWUoSVNfVEVTVCksIHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuZGVwZW5kZW5jeUluamVjdGlvbi5wdXNoKHsga2V5OiB0aGlzLmdldE1vY2tOYW1lKERhdGFTdHJhdGVneSksIHZhbHVlOiBkYXRhU3RyYXRlZ3kgfSk7XHJcblxyXG4gICAgICAgIFNlcnZpY2VMb2NhdG9yLmluamVjdG9yID0ge1xyXG4gICAgICAgICAgICBnZXQ6IChrZXk6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TW9ja05hbWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2UgPSB0aGlzLmRlcGVuZGVuY3lJbmplY3Rpb24uZmluZChrID0+IGsua2V5ID09PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICghc2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTW9jayBpcyBub3QgZm91bmQgZm9yOiAke2tleX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YVN0cmF0ZWd5ID0gZGF0YVN0cmF0ZWd5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU3RvcmUoaW5pdGlhbFN0YXRlOiBhbnkpOiBTdG9yZTxhbnk+IHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGUsIHRoaXMuZGF0YVN0cmF0ZWd5KTtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IHN0b3JlRmFjdG9yeShzdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5kYXRhU3RyYXRlZ3kuaW5pdChzdG9yZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGF0ZUhpc3RvcnkgPSBuZXcgU3RhdGVIaXN0b3J5KCk7XHJcbiAgICAgICAgc3RhdGVIaXN0b3J5LmluaXQoaW5pdGlhbFN0YXRlKTtcclxuICAgICAgICBjb25zdCBkZWJ1Z0luZm8gPSBuZXcgRGVidWdJbmZvKHN0YXRlSGlzdG9yeSwgeyBydW46ICgpID0+IHsgfSB9IGFzIGFueSwgdGhpcy5kYXRhU3RyYXRlZ3kpO1xyXG4gICAgICAgIERlYnVnSW5mby5pbnN0YW5jZSA9IGRlYnVnSW5mbztcclxuICAgICAgICBjb25zdCBoaXN0b3J5Q29udHJvbGxlciA9IG5ldyBIaXN0b3J5Q29udHJvbGxlcihcclxuICAgICAgICAgICAgc3RvcmUsXHJcbiAgICAgICAgICAgIHN0YXRlSGlzdG9yeSxcclxuICAgICAgICAgICAgZGVidWdJbmZvLFxyXG4gICAgICAgICAgICB7IG5hdmlnYXRlQnlVcmw6ICgpID0+IG5ldyBQcm9taXNlKCgpID0+IHsgfSkgfSBhcyBhbnksXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVN0cmF0ZWd5KTtcclxuICAgICAgICBoaXN0b3J5Q29udHJvbGxlci5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVwZW5kZW5jeUluamVjdGlvbi5wdXNoKHsga2V5OiB0aGlzLmdldE1vY2tOYW1lKFN0b3JlKSwgdmFsdWU6IHN0b3JlIH0pO1xyXG4gICAgICAgIHJldHVybiBzdG9yZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRNb2NrTmFtZShvYmo6IGFueSkge1xyXG4gICAgICAgIGlmIChvYmogPT09IElTX1RFU1QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdJU19URVNUJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvYmouY29uc3RydWN0b3IubmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmouY29uc3RydWN0b3IubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvYmoucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVBY3Rpb25zPFQ+KGFjdGlvbnNUeXBlOiBhbnksIGluaXRpYWxTdGF0ZTogYW55ID0ge30sIHBhdGg6IHN0cmluZyB8IGFueVtdID0gW10pOiBUIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0b3JlKGluaXRpYWxTdGF0ZSk7XHJcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IG5ldyAoYWN0aW9uc1R5cGUgYXMgYW55KSgpO1xyXG4gICAgICAgIGFjdGlvbnMuY3JlYXRlVGVzdFN0b3JlKE5nU3RhdGVUZXN0QmVkLmdldFBhdGgocGF0aCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gYWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldEFjdGlvbnNUb0NvbXBvbmVudChhY3Rpb25zOiBhbnksIGNvbXBvbmVudDogYW55KSB7XHJcbiAgICAgICAgKDxhbnk+Y29tcG9uZW50KS5hY3Rpb25zID0gYWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRQYXRoKHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhdGggPSBwYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcbn0iXX0=