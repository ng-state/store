/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Observable } from 'rxjs';
import { ServiceLocator } from '../helpers/service-locator';
import { Store } from '../store/store';
import { Helpers } from '../helpers/helpers';
import { Dispatcher } from '../services/dispatcher';
import { DataStrategy } from '@ng-state/data-strategy';
/**
 * @param {?} newPath
 * @param {?=} intialState
 * @param {?=} debug
 * @return {?}
 */
export function InjectStore(newPath, intialState, debug) {
    if (intialState === void 0) { intialState = null; }
    if (debug === void 0) { debug = false; }
    /** @type {?} */
    var getStatePath = (/**
     * @param {?} currentPath
     * @param {?} stateIndex
     * @param {?} extractedPath
     * @return {?}
     */
    function (currentPath, stateIndex, extractedPath) {
        /** @type {?} */
        var transformedPath = ((/** @type {?} */ (extractedPath))).map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return item === '${stateIndex}'
                ? stateIndex
                : item;
        }));
        return tslib_1.__spread(currentPath, transformedPath);
    });
    /** @type {?} */
    var getAbsoluteStatePath = (/**
     * @param {?} stateIndex
     * @param {?} extractedPath
     * @return {?}
     */
    function (stateIndex, extractedPath) {
        /** @type {?} */
        var transformedPath = ((/** @type {?} */ (extractedPath))).split('/');
        if (typeof stateIndex === 'string' || typeof stateIndex === 'number') {
            stateIndex = [stateIndex];
        }
        /** @type {?} */
        var nthStatePathIndex = 0;
        transformedPath.forEach((/**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */
        function (value, index) {
            if (value === '${stateIndex}') {
                if (((/** @type {?} */ (stateIndex))).length <= nthStatePathIndex) {
                    throw new Error("State path " + newPath + " has not enough stateIndexes set. Please provide stateIndexes as array in the same order as set in statePath.");
                }
                transformedPath[index] = stateIndex[nthStatePathIndex];
                nthStatePathIndex++;
            }
        }));
        return transformedPath;
    });
    /** @type {?} */
    var getAllGetters = (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var targetMethods = Reflect.getPrototypeOf(target);
        /** @type {?} */
        var methods = Object.entries(Object.getOwnPropertyDescriptors(targetMethods))
            .map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), key = _b[0], descriptor = _b[1];
            return {
                name: key,
                isGetter: typeof descriptor.get === 'function'
            };
        }))
            .filter((/**
         * @param {?} method
         * @return {?}
         */
        function (method) { return method.isGetter; }))
            .map((/**
         * @param {?} method
         * @return {?}
         */
        function (method) { return method.name; }));
        return methods;
    });
    /** @type {?} */
    var convertGettersToProperties = (/**
     * @param {?} instance
     * @return {?}
     */
    function (instance) {
        /** @type {?} */
        var getters = getAllGetters(instance);
        getters.forEach((/**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            /** @type {?} */
            var tempGetter = instance[name];
            if (tempGetter instanceof Observable) {
                delete instance[name];
                Object.defineProperty(instance, name, {
                    value: tempGetter
                });
            }
        }));
    });
    return (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        target.prototype.createStore = (/**
         * @param {?} currentPath
         * @param {?} stateIndex
         * @return {?}
         */
        function (currentPath, stateIndex) {
            var _this = this;
            this.aId = Helpers.guid();
            /** @type {?} */
            var extractedPath = typeof newPath === 'function' && ((/** @type {?} */ (newPath))).name === ''
                ? ((/** @type {?} */ (newPath)))(currentPath, stateIndex)
                : newPath;
            /** @type {?} */
            var statePath = typeof extractedPath === 'string'
                ? getAbsoluteStatePath(stateIndex, extractedPath)
                : getStatePath(currentPath, stateIndex, extractedPath);
            /** @type {?} */
            var store = (/** @type {?} */ (ServiceLocator.injector.get(Store)));
            /** @type {?} */
            var dispatcher = ServiceLocator.injector.get(Dispatcher);
            this.store = intialState
                ? store.initialize(statePath, intialState)
                : store.select(statePath);
            this.stateChangeSubscription = this.store.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                _this.state = state;
                dispatcher.publish(_this.aId);
                if (debug && state.toJS) {
                    /** @type {?} */
                    var dataStrategy = ServiceLocator.injector.get(DataStrategy);
                    console.info(dataStrategy.toJS(state));
                }
            }));
            convertGettersToProperties(this);
            return statePath;
        });
        target.prototype.createTestStore = (/**
         * @param {?} statePath
         * @return {?}
         */
        function (statePath) {
            /** @type {?} */
            var store = ServiceLocator.injector.get(Store);
            this.store = store.select(statePath);
            /** @type {?} */
            var that = this;
            this.stateChangeSubscription = this.store.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                that.state = state;
            }));
        });
        target.prototype.onDestroy = (/**
         * @return {?}
         */
        function () {
            this.stateChangeSubscription.unsubscribe();
        });
    });
}
/**
 * @template T
 */
var /**
 * @template T
 */
HasStore = /** @class */ (function () {
    function HasStore() {
        this.store = null;
        this.state = null;
    }
    return HasStore;
}());
/**
 * @template T
 */
export { HasStore };
if (false) {
    /** @type {?} */
    HasStore.prototype.store;
    /** @type {?} */
    HasStore.prototype.state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LXN0b3JlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNvcmF0b3JzL2luamVjdC1zdG9yZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7QUFFdkQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxPQUE2RSxFQUFFLFdBQWdDLEVBQUUsS0FBc0I7SUFBeEQsNEJBQUEsRUFBQSxrQkFBZ0M7SUFBRSxzQkFBQSxFQUFBLGFBQXNCOztRQUMzSixZQUFZOzs7Ozs7SUFBRyxVQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsYUFBYTs7WUFFbEQsZUFBZSxHQUFHLENBQUMsbUJBQVUsYUFBYSxFQUFBLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxJQUFJO1lBQ3BELE9BQU8sSUFBSSxLQUFLLGVBQWU7Z0JBQzNCLENBQUMsQ0FBQyxVQUFVO2dCQUNaLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDZixDQUFDLEVBQUM7UUFFRix3QkFBVyxXQUFXLEVBQUssZUFBZSxFQUFFO0lBQ2hELENBQUMsQ0FBQTs7UUFFRyxvQkFBb0I7Ozs7O0lBQUcsVUFBQyxVQUFtRCxFQUFFLGFBQWE7O1lBQ3BGLGVBQWUsR0FBRyxDQUFDLG1CQUFRLGFBQWEsRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztR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QUMsS0FBSyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFDLEtBQVU7Z0JBQzNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUM7UUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVM7OztRQUFHO1lBQ3pCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxDQUFDLENBQUEsQ0FBQztJQUNOLENBQUMsRUFBQztBQUNOLENBQUM7Ozs7QUFFRDs7OztJQUFBO1FBQ0ksVUFBSyxHQUFhLElBQUksQ0FBQztRQUN2QixVQUFLLEdBQU8sSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFBRCxlQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7Ozs7Ozs7SUFGRyx5QkFBdUI7O0lBQ3ZCLHlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2VydmljZUxvY2F0b3IgfSBmcm9tICcuLi9oZWxwZXJzL3NlcnZpY2UtbG9jYXRvcic7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vc3RvcmUvc3RvcmUnO1xyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcclxuaW1wb3J0IHsgRGlzcGF0Y2hlciB9IGZyb20gJy4uL3NlcnZpY2VzL2Rpc3BhdGNoZXInO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSW5qZWN0U3RvcmUobmV3UGF0aDogc3RyaW5nW10gfCBzdHJpbmcgfCAoKGN1cnJlbnRQYXRoLCBzdGF0ZUluZGV4KSA9PiBzdHJpbmdbXSB8IHN0cmluZyksIGludGlhbFN0YXRlOiBPYmplY3QgfCBhbnkgPSBudWxsLCBkZWJ1ZzogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBsZXQgZ2V0U3RhdGVQYXRoID0gKGN1cnJlbnRQYXRoLCBzdGF0ZUluZGV4LCBleHRyYWN0ZWRQYXRoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCB0cmFuc2Zvcm1lZFBhdGggPSAoPHN0cmluZ1tdPmV4dHJhY3RlZFBhdGgpLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09ICcke3N0YXRlSW5kZXh9J1xyXG4gICAgICAgICAgICAgICAgPyBzdGF0ZUluZGV4XHJcbiAgICAgICAgICAgICAgICA6IGl0ZW07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBbLi4uY3VycmVudFBhdGgsIC4uLnRyYW5zZm9ybWVkUGF0aF07XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBnZXRBYnNvbHV0ZVN0YXRlUGF0aCA9IChzdGF0ZUluZGV4OiAoc3RyaW5nIHwgbnVtYmVyKSB8IChzdHJpbmcgfCBudW1iZXIpW10sIGV4dHJhY3RlZFBhdGgpID0+IHtcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZFBhdGggPSAoPHN0cmluZz5leHRyYWN0ZWRQYXRoKS5zcGxpdCgnLycpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGVJbmRleCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHN0YXRlSW5kZXggPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHN0YXRlSW5kZXggPSBbc3RhdGVJbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbnRoU3RhdGVQYXRoSW5kZXggPSAwO1xyXG4gICAgICAgIHRyYW5zZm9ybWVkUGF0aC5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnJHtzdGF0ZUluZGV4fScpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoPGFueVtdPnN0YXRlSW5kZXgpLmxlbmd0aCA8PSBudGhTdGF0ZVBhdGhJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU3RhdGUgcGF0aCAke25ld1BhdGh9IGhhcyBub3QgZW5vdWdoIHN0YXRlSW5kZXhlcyBzZXQuIFBsZWFzZSBwcm92aWRlIHN0YXRlSW5kZXhlcyBhcyBhcnJheSBpbiB0aGUgc2FtZSBvcmRlciBhcyBzZXQgaW4gc3RhdGVQYXRoLmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkUGF0aFtpbmRleF0gPSBzdGF0ZUluZGV4W250aFN0YXRlUGF0aEluZGV4XTtcclxuICAgICAgICAgICAgICAgIG50aFN0YXRlUGF0aEluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkUGF0aDtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGdldEFsbEdldHRlcnMgPSAodGFyZ2V0OiBhbnkpOiBhbnlbXSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0TWV0aG9kcyA9IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcclxuICAgICAgICBsZXQgbWV0aG9kcyA9IE9iamVjdC5lbnRyaWVzKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHRhcmdldE1ldGhvZHMpKVxyXG4gICAgICAgICAgICAubWFwKChba2V5LCBkZXNjcmlwdG9yXTogW3N0cmluZywgYW55XSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgaXNHZXR0ZXI6IHR5cGVvZiBkZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZpbHRlcihtZXRob2QgPT4gbWV0aG9kLmlzR2V0dGVyKVxyXG4gICAgICAgICAgICAubWFwKG1ldGhvZCA9PiBtZXRob2QubmFtZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRob2RzO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29udmVydEdldHRlcnNUb1Byb3BlcnRpZXMgPSAoaW5zdGFuY2U6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdldHRlcnMgPSBnZXRBbGxHZXR0ZXJzKGluc3RhbmNlKTtcclxuICAgICAgICBnZXR0ZXJzLmZvckVhY2gobmFtZSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0ZW1wR2V0dGVyID0gaW5zdGFuY2VbbmFtZV07XHJcbiAgICAgICAgICAgIGlmICh0ZW1wR2V0dGVyIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGluc3RhbmNlW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGluc3RhbmNlLCBuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRlbXBHZXR0ZXJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAodGFyZ2V0OiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZS5jcmVhdGVTdG9yZSA9IGZ1bmN0aW9uIChjdXJyZW50UGF0aDogYW55W10sIHN0YXRlSW5kZXg6IChzdHJpbmcgfCBudW1iZXIpIHwgKHN0cmluZyB8IG51bWJlcilbXSkge1xyXG4gICAgICAgICAgICB0aGlzLmFJZCA9IEhlbHBlcnMuZ3VpZCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGV4dHJhY3RlZFBhdGggPSB0eXBlb2YgbmV3UGF0aCA9PT0gJ2Z1bmN0aW9uJyAmJiAoPGFueT5uZXdQYXRoKS5uYW1lID09PSAnJ1xyXG4gICAgICAgICAgICAgICAgPyAoPGFueT5uZXdQYXRoKShjdXJyZW50UGF0aCwgc3RhdGVJbmRleClcclxuICAgICAgICAgICAgICAgIDogbmV3UGF0aDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlUGF0aCA9IHR5cGVvZiBleHRyYWN0ZWRQYXRoID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgPyBnZXRBYnNvbHV0ZVN0YXRlUGF0aChzdGF0ZUluZGV4LCBleHRyYWN0ZWRQYXRoKVxyXG4gICAgICAgICAgICAgICAgOiBnZXRTdGF0ZVBhdGgoY3VycmVudFBhdGgsIHN0YXRlSW5kZXgsIGV4dHJhY3RlZFBhdGgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoU3RvcmUpIGFzIFN0b3JlPGFueT47XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoRGlzcGF0Y2hlcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3JlID0gaW50aWFsU3RhdGVcclxuICAgICAgICAgICAgICAgICA/IHN0b3JlLmluaXRpYWxpemUoc3RhdGVQYXRoLCBpbnRpYWxTdGF0ZSlcclxuICAgICAgICAgICAgICAgICA6IHN0b3JlLnNlbGVjdChzdGF0ZVBhdGgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaGVyLnB1Ymxpc2godGhpcy5hSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkZWJ1ZyAmJiBzdGF0ZS50b0pTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YVN0cmF0ZWd5ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERhdGFTdHJhdGVneSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGRhdGFTdHJhdGVneS50b0pTKHN0YXRlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udmVydEdldHRlcnNUb1Byb3BlcnRpZXModGhpcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVQYXRoO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUuY3JlYXRlVGVzdFN0b3JlID0gZnVuY3Rpb24gKHN0YXRlUGF0aDogYW55W10pIHtcclxuICAgICAgICAgICAgbGV0IHN0b3JlID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KFN0b3JlKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlLnNlbGVjdChzdGF0ZVBhdGgpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUub25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYXNTdG9yZTxUPiB7XHJcbiAgICBzdG9yZTogU3RvcmU8VD4gPSBudWxsO1xyXG4gICAgc3RhdGU/OiBUID0gbnVsbDtcclxufSJdfQ==