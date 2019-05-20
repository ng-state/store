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
                if (debug) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LXN0b3JlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNvcmF0b3JzL2luamVjdC1zdG9yZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7QUFFdkQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxPQUE2RSxFQUFFLFdBQWdDLEVBQUUsS0FBc0I7SUFBeEQsNEJBQUEsRUFBQSxrQkFBZ0M7SUFBRSxzQkFBQSxFQUFBLGFBQXNCOztRQUMzSixZQUFZOzs7Ozs7SUFBRyxVQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsYUFBYTs7WUFFbEQsZUFBZSxHQUFHLENBQUMsbUJBQVUsYUFBYSxFQUFBLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxJQUFJO1lBQ3BELE9BQU8sSUFBSSxLQUFLLGVBQWU7Z0JBQzNCLENBQUMsQ0FBQyxVQUFVO2dCQUNaLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDZixDQUFDLEVBQUM7UUFFRix3QkFBVyxXQUFXLEVBQUssZUFBZSxFQUFFO0lBQ2hELENBQUMsQ0FBQTs7UUFFRyxvQkFBb0I7Ozs7O0lBQUcsVUFBQyxVQUFtRCxFQUFFLGFBQWE7O1lBQ3BGLGVBQWUsR0FBRyxDQUFDLG1CQUFRLGFBQWEsRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztR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O1lBQUMsVUFBQyxLQUFVO2dCQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQSxDQUFDO1FBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7UUFBRztZQUN6QixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsQ0FBQyxDQUFBLENBQUM7SUFDTixDQUFDLEVBQUM7QUFDTixDQUFDOzs7O0FBRUQ7Ozs7SUFBQTtRQUNJLFVBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsVUFBSyxHQUFPLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQUQsZUFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7Ozs7O0lBRkcseUJBQXVCOztJQUN2Qix5QkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4uL3N0b3JlL3N0b3JlJztcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XHJcbmltcG9ydCB7IERpc3BhdGNoZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9kaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEluamVjdFN0b3JlKG5ld1BhdGg6IHN0cmluZ1tdIHwgc3RyaW5nIHwgKChjdXJyZW50UGF0aCwgc3RhdGVJbmRleCkgPT4gc3RyaW5nW10gfCBzdHJpbmcpLCBpbnRpYWxTdGF0ZTogT2JqZWN0IHwgYW55ID0gbnVsbCwgZGVidWc6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgbGV0IGdldFN0YXRlUGF0aCA9IChjdXJyZW50UGF0aCwgc3RhdGVJbmRleCwgZXh0cmFjdGVkUGF0aCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgdHJhbnNmb3JtZWRQYXRoID0gKDxzdHJpbmdbXT5leHRyYWN0ZWRQYXRoKS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtID09PSAnJHtzdGF0ZUluZGV4fSdcclxuICAgICAgICAgICAgICAgID8gc3RhdGVJbmRleFxyXG4gICAgICAgICAgICAgICAgOiBpdGVtO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gWy4uLmN1cnJlbnRQYXRoLCAuLi50cmFuc2Zvcm1lZFBhdGhdO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZ2V0QWJzb2x1dGVTdGF0ZVBhdGggPSAoc3RhdGVJbmRleDogKHN0cmluZyB8IG51bWJlcikgfCAoc3RyaW5nIHwgbnVtYmVyKVtdLCBleHRyYWN0ZWRQYXRoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRQYXRoID0gKDxzdHJpbmc+ZXh0cmFjdGVkUGF0aCkuc3BsaXQoJy8nKTtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlSW5kZXggPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzdGF0ZUluZGV4ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBzdGF0ZUluZGV4ID0gW3N0YXRlSW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG50aFN0YXRlUGF0aEluZGV4ID0gMDtcclxuICAgICAgICB0cmFuc2Zvcm1lZFBhdGguZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJyR7c3RhdGVJbmRleH0nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKDxhbnlbXT5zdGF0ZUluZGV4KS5sZW5ndGggPD0gbnRoU3RhdGVQYXRoSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YXRlIHBhdGggJHtuZXdQYXRofSBoYXMgbm90IGVub3VnaCBzdGF0ZUluZGV4ZXMgc2V0LiBQbGVhc2UgcHJvdmlkZSBzdGF0ZUluZGV4ZXMgYXMgYXJyYXkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgc2V0IGluIHN0YXRlUGF0aC5gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZFBhdGhbaW5kZXhdID0gc3RhdGVJbmRleFtudGhTdGF0ZVBhdGhJbmRleF07XHJcbiAgICAgICAgICAgICAgICBudGhTdGF0ZVBhdGhJbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFBhdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBnZXRBbGxHZXR0ZXJzID0gKHRhcmdldDogYW55KTogYW55W10gPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldE1ldGhvZHMgPSBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XHJcbiAgICAgICAgbGV0IG1ldGhvZHMgPSBPYmplY3QuZW50cmllcyhPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0YXJnZXRNZXRob2RzKSlcclxuICAgICAgICAgICAgLm1hcCgoW2tleSwgZGVzY3JpcHRvcl06IFtzdHJpbmcsIGFueV0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIGlzR2V0dGVyOiB0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5pc0dldHRlcilcclxuICAgICAgICAgICAgLm1hcChtZXRob2QgPT4gbWV0aG9kLm5hbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kcztcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbnZlcnRHZXR0ZXJzVG9Qcm9wZXJ0aWVzID0gKGluc3RhbmNlOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBnZXR0ZXJzID0gZ2V0QWxsR2V0dGVycyhpbnN0YW5jZSk7XHJcbiAgICAgICAgZ2V0dGVycy5mb3JFYWNoKG5hbWUgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGVtcEdldHRlciA9IGluc3RhbmNlW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAodGVtcEdldHRlciBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnN0YW5jZVtuYW1lXTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgbmFtZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW1wR2V0dGVyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKHRhcmdldDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUuY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoY3VycmVudFBhdGg6IGFueVtdLCBzdGF0ZUluZGV4OiAoc3RyaW5nIHwgbnVtYmVyKSB8IChzdHJpbmcgfCBudW1iZXIpW10pIHtcclxuICAgICAgICAgICAgdGhpcy5hSWQgPSBIZWxwZXJzLmd1aWQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBleHRyYWN0ZWRQYXRoID0gdHlwZW9mIG5ld1BhdGggPT09ICdmdW5jdGlvbicgJiYgKDxhbnk+bmV3UGF0aCkubmFtZSA9PT0gJydcclxuICAgICAgICAgICAgICAgID8gKDxhbnk+bmV3UGF0aCkoY3VycmVudFBhdGgsIHN0YXRlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICA6IG5ld1BhdGg7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZVBhdGggPSB0eXBlb2YgZXh0cmFjdGVkUGF0aCA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICAgID8gZ2V0QWJzb2x1dGVTdGF0ZVBhdGgoc3RhdGVJbmRleCwgZXh0cmFjdGVkUGF0aClcclxuICAgICAgICAgICAgICAgIDogZ2V0U3RhdGVQYXRoKGN1cnJlbnRQYXRoLCBzdGF0ZUluZGV4LCBleHRyYWN0ZWRQYXRoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KFN0b3JlKSBhcyBTdG9yZTxhbnk+O1xyXG4gICAgICAgICAgICBjb25zdCBkaXNwYXRjaGVyID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERpc3BhdGNoZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yZSA9IGludGlhbFN0YXRlXHJcbiAgICAgICAgICAgICAgICAgPyBzdG9yZS5pbml0aWFsaXplKHN0YXRlUGF0aCwgaW50aWFsU3RhdGUpXHJcbiAgICAgICAgICAgICAgICAgOiBzdG9yZS5zZWxlY3Qoc3RhdGVQYXRoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZSgoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hlci5wdWJsaXNoKHRoaXMuYUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhU3RyYXRlZ3kgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoRGF0YVN0cmF0ZWd5KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oZGF0YVN0cmF0ZWd5LnRvSlMoc3RhdGUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb252ZXJ0R2V0dGVyc1RvUHJvcGVydGllcyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVBhdGg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZS5jcmVhdGVUZXN0U3RvcmUgPSBmdW5jdGlvbiAoc3RhdGVQYXRoOiBhbnlbXSkge1xyXG4gICAgICAgICAgICBsZXQgc3RvcmUgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoU3RvcmUpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmUuc2VsZWN0KHN0YXRlUGF0aCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9yZS5zdWJzY3JpYmUoKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZS5vbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhhc1N0b3JlPFQ+IHtcclxuICAgIHN0b3JlOiBTdG9yZTxUPiA9IG51bGw7XHJcbiAgICBzdGF0ZT86IFQgPSBudWxsO1xyXG59Il19