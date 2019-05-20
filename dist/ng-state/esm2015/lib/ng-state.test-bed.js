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
        this.dataStrategy.init(store, false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc3RhdGUudGVzdC1iZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvbmctc3RhdGUudGVzdC1iZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE1BQU0sT0FBTyxjQUFjOzs7OztJQUtoQixNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBMEI7UUFDdkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTVGLGNBQWMsQ0FBQyxRQUFRLEdBQUc7WUFDdEIsR0FBRzs7OztZQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7O3NCQUNSLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQzs7c0JBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFDO2dCQUNsRSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDLENBQUM7aUJBQ3BEO2dCQUVELE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN6QixDQUFDLENBQUE7U0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQWlCOztjQUNqQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztjQUNyRCxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7O2NBRS9CLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRTtRQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztjQUMxQixTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsWUFBWSxFQUFFLG1CQUFBLEVBQUUsR0FBRzs7O1lBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBLEVBQUUsRUFBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0YsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7O2NBQ3pCLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLENBQzNDLEtBQUssRUFDTCxZQUFZLEVBQ1osU0FBUyxFQUNULG1CQUFBLEVBQUUsYUFBYTs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxPQUFPOzs7WUFBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUMsQ0FBQSxFQUFFLEVBQU8sRUFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN0QixpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDOUUsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFRO1FBQy9CLElBQUksR0FBRyxLQUFLLE9BQU8sRUFBRTtZQUNqQixPQUFPLFNBQVMsQ0FBQztTQUNwQjtRQUVELElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVSxFQUFFO1lBQ25ELE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7U0FDL0I7UUFFRCxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUMxQyxDQUFDOzs7Ozs7OztJQUVNLE1BQU0sQ0FBQyxhQUFhLENBQUksV0FBZ0IsRUFBRSxlQUFvQixFQUFFLEVBQUUsT0FBdUIsRUFBRTtRQUM5RixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDOztjQUN6QixPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFBLFdBQVcsRUFBTyxDQUFDLEVBQUU7UUFDMUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFdEQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQzs7Ozs7O0lBRU0sTUFBTSxDQUFDLHFCQUFxQixDQUFDLE9BQVksRUFBRSxTQUFjO1FBQzVELENBQUMsbUJBQUssU0FBUyxFQUFBLENBQUMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBdUI7UUFDMUMsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztBQTNFYywyQkFBWSxHQUFpQixJQUFJLENBQUM7QUFDbEMsa0NBQW1CLEdBQUcsbUJBQTRCLEVBQUUsRUFBQSxDQUFDOzs7Ozs7SUFEcEUsNEJBQWlEOzs7OztJQUNqRCxtQ0FBb0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBJU19URVNULCBzdGF0ZUZhY3RvcnksIHN0b3JlRmFjdG9yeSB9IGZyb20gJy4vbmctc3RhdGUubW9kdWxlJztcclxuaW1wb3J0IHsgU3RhdGVIaXN0b3J5IH0gZnJvbSAnLi9zdGF0ZS9oaXN0b3J5JztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlL3N0b3JlJztcclxuaW1wb3J0IHsgSGlzdG9yeUNvbnRyb2xsZXIgfSBmcm9tICcuL3N0YXRlL2hpc3RvcnktY29udHJvbGxlcic7XHJcbmltcG9ydCB7IERlYnVnSW5mbyB9IGZyb20gJy4vZGVidWcvZGVidWctaW5mbyc7XHJcbmltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBOZ1N0YXRlVGVzdEJlZCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3kgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGVwZW5kZW5jeUluamVjdGlvbiA9IDx7IGtleTogYW55LCB2YWx1ZTogYW55IH1bXT5bXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFRlc3RFbnZpcm9ubWVudChkYXRhU3RyYXRlZ3k6IERhdGFTdHJhdGVneSkge1xyXG4gICAgICAgIHRoaXMuZGVwZW5kZW5jeUluamVjdGlvbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGVwZW5kZW5jeUluamVjdGlvbi5wdXNoKHsga2V5OiB0aGlzLmdldE1vY2tOYW1lKElTX1RFU1QpLCB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgICAgICB0aGlzLmRlcGVuZGVuY3lJbmplY3Rpb24ucHVzaCh7IGtleTogdGhpcy5nZXRNb2NrTmFtZShEYXRhU3RyYXRlZ3kpLCB2YWx1ZTogZGF0YVN0cmF0ZWd5IH0pO1xyXG5cclxuICAgICAgICBTZXJ2aWNlTG9jYXRvci5pbmplY3RvciA9IHtcclxuICAgICAgICAgICAgZ2V0OiAoa2V5OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE1vY2tOYW1lKGtleSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gdGhpcy5kZXBlbmRlbmN5SW5qZWN0aW9uLmZpbmQoayA9PiBrLmtleSA9PT0gbmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1vY2sgaXMgbm90IGZvdW5kIGZvcjogJHtrZXl9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFTdHJhdGVneSA9IGRhdGFTdHJhdGVneTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVN0b3JlKGluaXRpYWxTdGF0ZTogYW55KTogU3RvcmU8YW55PiB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBzdGF0ZUZhY3RvcnkoaW5pdGlhbFN0YXRlLCB0aGlzLmRhdGFTdHJhdGVneSk7XHJcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBzdG9yZUZhY3Rvcnkoc3RhdGUpO1xyXG4gICAgICAgIHRoaXMuZGF0YVN0cmF0ZWd5LmluaXQoc3RvcmUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdGVIaXN0b3J5ID0gbmV3IFN0YXRlSGlzdG9yeSgpO1xyXG4gICAgICAgIHN0YXRlSGlzdG9yeS5pbml0KGluaXRpYWxTdGF0ZSk7XHJcbiAgICAgICAgY29uc3QgZGVidWdJbmZvID0gbmV3IERlYnVnSW5mbyhzdGF0ZUhpc3RvcnksIHsgcnVuOiAoKSA9PiB7IH0gfSBhcyBhbnksIHRoaXMuZGF0YVN0cmF0ZWd5KTtcclxuICAgICAgICBEZWJ1Z0luZm8uaW5zdGFuY2UgPSBkZWJ1Z0luZm87XHJcbiAgICAgICAgY29uc3QgaGlzdG9yeUNvbnRyb2xsZXIgPSBuZXcgSGlzdG9yeUNvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgIHN0b3JlLFxyXG4gICAgICAgICAgICBzdGF0ZUhpc3RvcnksXHJcbiAgICAgICAgICAgIGRlYnVnSW5mbyxcclxuICAgICAgICAgICAgeyBuYXZpZ2F0ZUJ5VXJsOiAoKSA9PiBuZXcgUHJvbWlzZSgoKSA9PiB7IH0pIH0gYXMgYW55LFxyXG4gICAgICAgICAgICB0aGlzLmRhdGFTdHJhdGVneSk7XHJcbiAgICAgICAgaGlzdG9yeUNvbnRyb2xsZXIuaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmRlcGVuZGVuY3lJbmplY3Rpb24ucHVzaCh7IGtleTogdGhpcy5nZXRNb2NrTmFtZShTdG9yZSksIHZhbHVlOiBzdG9yZSB9KTtcclxuICAgICAgICByZXR1cm4gc3RvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TW9ja05hbWUob2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqID09PSBJU19URVNUKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnSVNfVEVTVCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2JqLmNvbnN0cnVjdG9yLm5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2JqLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQWN0aW9uczxUPihhY3Rpb25zVHlwZTogYW55LCBpbml0aWFsU3RhdGU6IGFueSA9IHt9LCBwYXRoOiBzdHJpbmcgfCBhbnlbXSA9IFtdKTogVCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTdG9yZShpbml0aWFsU3RhdGUpO1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSBuZXcgKGFjdGlvbnNUeXBlIGFzIGFueSkoKTtcclxuICAgICAgICBhY3Rpb25zLmNyZWF0ZVRlc3RTdG9yZShOZ1N0YXRlVGVzdEJlZC5nZXRQYXRoKHBhdGgpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRBY3Rpb25zVG9Db21wb25lbnQoYWN0aW9uczogYW55LCBjb21wb25lbnQ6IGFueSkge1xyXG4gICAgICAgICg8YW55PmNvbXBvbmVudCkuYWN0aW9ucyA9IGFjdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UGF0aChwYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgICAgIGlmIChwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXRoID0gcGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgfVxyXG59Il19