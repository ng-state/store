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
export class NgStateTestBed {
    /**
     * @param {?} dataStrategy
     * @return {?}
     */
    static setTestEnvironment(dataStrategy) {
        this.dependencyInjection = [];
        this.dependencyInjection.push({ key: this.getMockName(IS_TEST), value: true });
        this.dependencyInjection.push({ key: this.getMockName(DataStrategy), value: dataStrategy });
        ServiceLocator.injector = {
            get: (/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                /** @type {?} */
                const name = this.getMockName(key);
                /** @type {?} */
                const service = this.dependencyInjection.find((/**
                 * @param {?} k
                 * @return {?}
                 */
                k => k.key === name));
                if (!service) {
                    throw new Error(`Mock is not found for: ${key}`);
                }
                return service.value;
            })
        };
        this.dataStrategy = dataStrategy;
    }
    /**
     * @param {?} initialState
     * @return {?}
     */
    static createStore(initialState) {
        /** @type {?} */
        const state = stateFactory(initialState, this.dataStrategy);
        /** @type {?} */
        const store = storeFactory(state);
        this.dataStrategy.init(store);
        /** @type {?} */
        const stateHistory = new StateHistory();
        stateHistory.init(initialState);
        /** @type {?} */
        const debugInfo = new DebugInfo(stateHistory, (/** @type {?} */ ({ run: (/**
             * @return {?}
             */
            () => { }) })), this.dataStrategy);
        DebugInfo.instance = debugInfo;
        /** @type {?} */
        const historyController = new HistoryController(store, stateHistory, debugInfo, (/** @type {?} */ ({ navigateByUrl: (/**
             * @return {?}
             */
            () => new Promise((/**
             * @return {?}
             */
            () => { }))) })), this.dataStrategy);
        historyController.init();
        this.dependencyInjection.push({ key: this.getMockName(Store), value: store });
        return store;
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    static getMockName(obj) {
        if (obj === IS_TEST) {
            return 'IS_TEST';
        }
        if (obj.constructor.name.toLowerCase() !== 'function') {
            return obj.constructor.name;
        }
        return obj.prototype.constructor.name;
    }
    /**
     * @template T
     * @param {?} actionsType
     * @param {?=} initialState
     * @param {?=} path
     * @return {?}
     */
    static createActions(actionsType, initialState = {}, path = []) {
        this.createStore(initialState);
        /** @type {?} */
        const actions = new ((/** @type {?} */ (actionsType)))();
        actions.createTestStore(NgStateTestBed.getPath(path));
        return actions;
    }
    /**
     * @param {?} actions
     * @param {?} component
     * @return {?}
     */
    static setActionsToComponent(actions, component) {
        ((/** @type {?} */ (component))).actions = actions;
    }
    /**
     * @private
     * @param {?} path
     * @return {?}
     */
    static getPath(path) {
        if (path instanceof Array) {
            return path;
        }
        path = path.split('/');
        return path;
    }
}
NgStateTestBed.dataStrategy = null;
NgStateTestBed.dependencyInjection = (/** @type {?} */ ([]));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc3RhdGUudGVzdC1iZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvbmctc3RhdGUudGVzdC1iZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE1BQU0sT0FBTyxjQUFjOzs7OztJQUtoQixNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBMEI7UUFDdkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTVGLGNBQWMsQ0FBQyxRQUFRLEdBQUc7WUFDdEIsR0FBRzs7OztZQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7O3NCQUNSLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFD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WUFDdkIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O0FBM0VjLDJCQUFZLEdBQWlCLElBQUksQ0FBQztBQUNsQyxrQ0FBbUIsR0FBRyxtQkFBNEIsRUFBRSxFQUFBLENBQUM7Ozs7OztJQURwRSw0QkFBaUQ7Ozs7O0lBQ2pELG1DQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi9oZWxwZXJzL3NlcnZpY2UtbG9jYXRvcic7XHJcbmltcG9ydCB7IElTX1RFU1QsIHN0YXRlRmFjdG9yeSwgc3RvcmVGYWN0b3J5IH0gZnJvbSAnLi9uZy1zdGF0ZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTdGF0ZUhpc3RvcnkgfSBmcm9tICcuL3N0YXRlL2hpc3RvcnknO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUvc3RvcmUnO1xyXG5pbXBvcnQgeyBIaXN0b3J5Q29udHJvbGxlciB9IGZyb20gJy4vc3RhdGUvaGlzdG9yeS1jb250cm9sbGVyJztcclxuaW1wb3J0IHsgRGVidWdJbmZvIH0gZnJvbSAnLi9kZWJ1Zy9kZWJ1Zy1pbmZvJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5nU3RhdGVUZXN0QmVkIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBkYXRhU3RyYXRlZ3k6IERhdGFTdHJhdGVneSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBkZXBlbmRlbmN5SW5qZWN0aW9uID0gPHsga2V5OiBhbnksIHZhbHVlOiBhbnkgfVtdPltdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0VGVzdEVudmlyb25tZW50KGRhdGFTdHJhdGVneTogRGF0YVN0cmF0ZWd5KSB7XHJcbiAgICAgICAgdGhpcy5kZXBlbmRlbmN5SW5qZWN0aW9uID0gW107XHJcbiAgICAgICAgdGhpcy5kZXBlbmRlbmN5SW5qZWN0aW9uLnB1c2goeyBrZXk6IHRoaXMuZ2V0TW9ja05hbWUoSVNfVEVTVCksIHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuZGVwZW5kZW5jeUluamVjdGlvbi5wdXNoKHsga2V5OiB0aGlzLmdldE1vY2tOYW1lKERhdGFTdHJhdGVneSksIHZhbHVlOiBkYXRhU3RyYXRlZ3kgfSk7XHJcblxyXG4gICAgICAgIFNlcnZpY2VMb2NhdG9yLmluamVjdG9yID0ge1xyXG4gICAgICAgICAgICBnZXQ6IChrZXk6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TW9ja05hbWUoa2V5KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2UgPSB0aGlzLmRlcGVuZGVuY3lJbmplY3Rpb24uZmluZChrID0+IGsua2V5ID09PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICghc2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTW9jayBpcyBub3QgZm91bmQgZm9yOiAke2tleX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YVN0cmF0ZWd5ID0gZGF0YVN0cmF0ZWd5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU3RvcmUoaW5pdGlhbFN0YXRlOiBhbnkpOiBTdG9yZTxhbnk+IHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGUsIHRoaXMuZGF0YVN0cmF0ZWd5KTtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IHN0b3JlRmFjdG9yeShzdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5kYXRhU3RyYXRlZ3kuaW5pdChzdG9yZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXRlSGlzdG9yeSA9IG5ldyBTdGF0ZUhpc3RvcnkoKTtcclxuICAgICAgICBzdGF0ZUhpc3RvcnkuaW5pdChpbml0aWFsU3RhdGUpO1xyXG4gICAgICAgIGNvbnN0IGRlYnVnSW5mbyA9IG5ldyBEZWJ1Z0luZm8oc3RhdGVIaXN0b3J5LCB7IHJ1bjogKCkgPT4geyB9IH0gYXMgYW55LCB0aGlzLmRhdGFTdHJhdGVneSk7XHJcbiAgICAgICAgRGVidWdJbmZvLmluc3RhbmNlID0gZGVidWdJbmZvO1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnlDb250cm9sbGVyID0gbmV3IEhpc3RvcnlDb250cm9sbGVyKFxyXG4gICAgICAgICAgICBzdG9yZSxcclxuICAgICAgICAgICAgc3RhdGVIaXN0b3J5LFxyXG4gICAgICAgICAgICBkZWJ1Z0luZm8sXHJcbiAgICAgICAgICAgIHsgbmF2aWdhdGVCeVVybDogKCkgPT4gbmV3IFByb21pc2UoKCkgPT4geyB9KSB9IGFzIGFueSxcclxuICAgICAgICAgICAgdGhpcy5kYXRhU3RyYXRlZ3kpO1xyXG4gICAgICAgIGhpc3RvcnlDb250cm9sbGVyLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZXBlbmRlbmN5SW5qZWN0aW9uLnB1c2goeyBrZXk6IHRoaXMuZ2V0TW9ja05hbWUoU3RvcmUpLCB2YWx1ZTogc3RvcmUgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE1vY2tOYW1lKG9iajogYW55KSB7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gSVNfVEVTVCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0lTX1RFU1QnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9iai5jb25zdHJ1Y3Rvci5uYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9iai5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUFjdGlvbnM8VD4oYWN0aW9uc1R5cGU6IGFueSwgaW5pdGlhbFN0YXRlOiBhbnkgPSB7fSwgcGF0aDogc3RyaW5nIHwgYW55W10gPSBbXSk6IFQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RvcmUoaW5pdGlhbFN0YXRlKTtcclxuICAgICAgICBjb25zdCBhY3Rpb25zID0gbmV3IChhY3Rpb25zVHlwZSBhcyBhbnkpKCk7XHJcbiAgICAgICAgYWN0aW9ucy5jcmVhdGVUZXN0U3RvcmUoTmdTdGF0ZVRlc3RCZWQuZ2V0UGF0aChwYXRoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0QWN0aW9uc1RvQ29tcG9uZW50KGFjdGlvbnM6IGFueSwgY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICAoPGFueT5jb21wb25lbnQpLmFjdGlvbnMgPSBhY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFBhdGgocGF0aDogc3RyaW5nIHwgc3RyaW5nW10pIHtcclxuICAgICAgICBpZiAocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoJy8nKTtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxufSJdfQ==