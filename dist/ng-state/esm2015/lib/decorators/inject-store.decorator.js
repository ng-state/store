/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export function InjectStore(newPath, intialState = null, debug = false) {
    /** @type {?} */
    let getStatePath = (/**
     * @param {?} currentPath
     * @param {?} stateIndex
     * @param {?} extractedPath
     * @return {?}
     */
    (currentPath, stateIndex, extractedPath) => {
        /** @type {?} */
        let transformedPath = ((/** @type {?} */ (extractedPath))).map((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            return item === '${stateIndex}'
                ? stateIndex
                : item;
        }));
        return [...currentPath, ...transformedPath];
    });
    /** @type {?} */
    let getAbsoluteStatePath = (/**
     * @param {?} stateIndex
     * @param {?} extractedPath
     * @return {?}
     */
    (stateIndex, extractedPath) => {
        /** @type {?} */
        const transformedPath = ((/** @type {?} */ (extractedPath))).split('/');
        if (typeof stateIndex === 'string' || typeof stateIndex === 'number') {
            stateIndex = [stateIndex];
        }
        /** @type {?} */
        let nthStatePathIndex = 0;
        transformedPath.forEach((/**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */
        (value, index) => {
            if (value === '${stateIndex}') {
                if (((/** @type {?} */ (stateIndex))).length <= nthStatePathIndex) {
                    throw new Error(`State path ${newPath} has not enough stateIndexes set. Please provide stateIndexes as array in the same order as set in statePath.`);
                }
                transformedPath[index] = stateIndex[nthStatePathIndex];
                nthStatePathIndex++;
            }
        }));
        return transformedPath;
    });
    /** @type {?} */
    let getAllGetters = (/**
     * @param {?} target
     * @return {?}
     */
    (target) => {
        /** @type {?} */
        const targetMethods = Reflect.getPrototypeOf(target);
        /** @type {?} */
        let methods = Object.entries(Object.getOwnPropertyDescriptors(targetMethods))
            .map((/**
         * @param {?} __0
         * @return {?}
         */
        ([key, descriptor]) => {
            return {
                name: key,
                isGetter: typeof descriptor.get === 'function'
            };
        }))
            .filter((/**
         * @param {?} method
         * @return {?}
         */
        method => method.isGetter))
            .map((/**
         * @param {?} method
         * @return {?}
         */
        method => method.name));
        return methods;
    });
    /** @type {?} */
    let convertGettersToProperties = (/**
     * @param {?} instance
     * @return {?}
     */
    (instance) => {
        /** @type {?} */
        const getters = getAllGetters(instance);
        getters.forEach((/**
         * @param {?} name
         * @return {?}
         */
        name => {
            /** @type {?} */
            const tempGetter = instance[name];
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
    (target) => {
        target.prototype.createStore = (/**
         * @param {?} currentPath
         * @param {?} stateIndex
         * @return {?}
         */
        function (currentPath, stateIndex) {
            this.aId = Helpers.guid();
            /** @type {?} */
            let extractedPath = typeof newPath === 'function' && ((/** @type {?} */ (newPath))).name === ''
                ? ((/** @type {?} */ (newPath)))(currentPath, stateIndex)
                : newPath;
            /** @type {?} */
            const statePath = typeof extractedPath === 'string'
                ? getAbsoluteStatePath(stateIndex, extractedPath)
                : getStatePath(currentPath, stateIndex, extractedPath);
            /** @type {?} */
            const store = (/** @type {?} */ (ServiceLocator.injector.get(Store)));
            /** @type {?} */
            const dispatcher = ServiceLocator.injector.get(Dispatcher);
            this.store = intialState
                ? store.initialize(statePath, intialState)
                : store.select(statePath);
            this.stateChangeSubscription = this.store.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                this.state = state;
                dispatcher.publish(this.aId);
                if (debug && state.toJS) {
                    /** @type {?} */
                    const dataStrategy = ServiceLocator.injector.get(DataStrategy);
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
            let store = ServiceLocator.injector.get(Store);
            this.store = store.select(statePath);
            /** @type {?} */
            const that = this;
            this.stateChangeSubscription = this.store.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
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
export class HasStore {
    constructor() {
        this.store = null;
        this.state = null;
    }
}
if (false) {
    /** @type {?} */
    HasStore.prototype.store;
    /** @type {?} */
    HasStore.prototype.state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LXN0b3JlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNvcmF0b3JzL2luamVjdC1zdG9yZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQUV2RCxNQUFNLFVBQVUsV0FBVyxDQUFDLE9BQTZFLEVBQUUsY0FBNEIsSUFBSSxFQUFFLFFBQWlCLEtBQUs7O1FBQzNKLFlBQVk7Ozs7OztJQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsRUFBRTs7WUFFdEQsZUFBZSxHQUFHLENBQUMsbUJBQVUsYUFBYSxFQUFBLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkQsT0FBTyxJQUFJLEtBQUssZUFBZTtnQkFDM0IsQ0FBQyxDQUFDLFVBQVU7Z0JBQ1osQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNmLENBQUMsRUFBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLFdBQVcsRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQTs7UUFFRyxvQkFBb0I7Ozs7O0lBQUcsQ0FBQyxVQUFtRCxFQUFFLGFBQWEsRUFBRSxFQUFFOztjQUN4RixlQUFlLEdBQUcsQ0FBQyxtQkFBUSxhQUFhLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFH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QUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTOzs7O1lBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLENBQUEsQ0FBQztRQUVGLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUzs7O1FBQUc7WUFDekIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLENBQUMsQ0FBQSxDQUFDO0lBQ04sQ0FBQyxFQUFDO0FBQ04sQ0FBQzs7OztBQUVELE1BQU0sT0FBTyxRQUFRO0lBQXJCO1FBQ0ksVUFBSyxHQUFhLElBQUksQ0FBQztRQUN2QixVQUFLLEdBQU8sSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FBQTs7O0lBRkcseUJBQXVCOztJQUN2Qix5QkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4uL3N0b3JlL3N0b3JlJztcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XHJcbmltcG9ydCB7IERpc3BhdGNoZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9kaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEluamVjdFN0b3JlKG5ld1BhdGg6IHN0cmluZ1tdIHwgc3RyaW5nIHwgKChjdXJyZW50UGF0aCwgc3RhdGVJbmRleCkgPT4gc3RyaW5nW10gfCBzdHJpbmcpLCBpbnRpYWxTdGF0ZTogT2JqZWN0IHwgYW55ID0gbnVsbCwgZGVidWc6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgbGV0IGdldFN0YXRlUGF0aCA9IChjdXJyZW50UGF0aCwgc3RhdGVJbmRleCwgZXh0cmFjdGVkUGF0aCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgdHJhbnNmb3JtZWRQYXRoID0gKDxzdHJpbmdbXT5leHRyYWN0ZWRQYXRoKS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtID09PSAnJHtzdGF0ZUluZGV4fSdcclxuICAgICAgICAgICAgICAgID8gc3RhdGVJbmRleFxyXG4gICAgICAgICAgICAgICAgOiBpdGVtO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gWy4uLmN1cnJlbnRQYXRoLCAuLi50cmFuc2Zvcm1lZFBhdGhdO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZ2V0QWJzb2x1dGVTdGF0ZVBhdGggPSAoc3RhdGVJbmRleDogKHN0cmluZyB8IG51bWJlcikgfCAoc3RyaW5nIHwgbnVtYmVyKVtdLCBleHRyYWN0ZWRQYXRoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRQYXRoID0gKDxzdHJpbmc+ZXh0cmFjdGVkUGF0aCkuc3BsaXQoJy8nKTtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlSW5kZXggPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzdGF0ZUluZGV4ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBzdGF0ZUluZGV4ID0gW3N0YXRlSW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG50aFN0YXRlUGF0aEluZGV4ID0gMDtcclxuICAgICAgICB0cmFuc2Zvcm1lZFBhdGguZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJyR7c3RhdGVJbmRleH0nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKDxhbnlbXT5zdGF0ZUluZGV4KS5sZW5ndGggPD0gbnRoU3RhdGVQYXRoSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YXRlIHBhdGggJHtuZXdQYXRofSBoYXMgbm90IGVub3VnaCBzdGF0ZUluZGV4ZXMgc2V0LiBQbGVhc2UgcHJvdmlkZSBzdGF0ZUluZGV4ZXMgYXMgYXJyYXkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgc2V0IGluIHN0YXRlUGF0aC5gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZFBhdGhbaW5kZXhdID0gc3RhdGVJbmRleFtudGhTdGF0ZVBhdGhJbmRleF07XHJcbiAgICAgICAgICAgICAgICBudGhTdGF0ZVBhdGhJbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFBhdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBnZXRBbGxHZXR0ZXJzID0gKHRhcmdldDogYW55KTogYW55W10gPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldE1ldGhvZHMgPSBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XHJcbiAgICAgICAgbGV0IG1ldGhvZHMgPSBPYmplY3QuZW50cmllcyhPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0YXJnZXRNZXRob2RzKSlcclxuICAgICAgICAgICAgLm1hcCgoW2tleSwgZGVzY3JpcHRvcl06IFtzdHJpbmcsIGFueV0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIGlzR2V0dGVyOiB0eXBlb2YgZGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIobWV0aG9kID0+IG1ldGhvZC5pc0dldHRlcilcclxuICAgICAgICAgICAgLm1hcChtZXRob2QgPT4gbWV0aG9kLm5hbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kcztcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbnZlcnRHZXR0ZXJzVG9Qcm9wZXJ0aWVzID0gKGluc3RhbmNlOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBnZXR0ZXJzID0gZ2V0QWxsR2V0dGVycyhpbnN0YW5jZSk7XHJcbiAgICAgICAgZ2V0dGVycy5mb3JFYWNoKG5hbWUgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGVtcEdldHRlciA9IGluc3RhbmNlW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAodGVtcEdldHRlciBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnN0YW5jZVtuYW1lXTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgbmFtZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW1wR2V0dGVyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKHRhcmdldDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUuY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoY3VycmVudFBhdGg6IGFueVtdLCBzdGF0ZUluZGV4OiAoc3RyaW5nIHwgbnVtYmVyKSB8IChzdHJpbmcgfCBudW1iZXIpW10pIHtcclxuICAgICAgICAgICAgdGhpcy5hSWQgPSBIZWxwZXJzLmd1aWQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBleHRyYWN0ZWRQYXRoID0gdHlwZW9mIG5ld1BhdGggPT09ICdmdW5jdGlvbicgJiYgKDxhbnk+bmV3UGF0aCkubmFtZSA9PT0gJydcclxuICAgICAgICAgICAgICAgID8gKDxhbnk+bmV3UGF0aCkoY3VycmVudFBhdGgsIHN0YXRlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICA6IG5ld1BhdGg7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZVBhdGggPSB0eXBlb2YgZXh0cmFjdGVkUGF0aCA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICAgID8gZ2V0QWJzb2x1dGVTdGF0ZVBhdGgoc3RhdGVJbmRleCwgZXh0cmFjdGVkUGF0aClcclxuICAgICAgICAgICAgICAgIDogZ2V0U3RhdGVQYXRoKGN1cnJlbnRQYXRoLCBzdGF0ZUluZGV4LCBleHRyYWN0ZWRQYXRoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KFN0b3JlKSBhcyBTdG9yZTxhbnk+O1xyXG4gICAgICAgICAgICBjb25zdCBkaXNwYXRjaGVyID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERpc3BhdGNoZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9yZSA9IGludGlhbFN0YXRlXHJcbiAgICAgICAgICAgICAgICAgPyBzdG9yZS5pbml0aWFsaXplKHN0YXRlUGF0aCwgaW50aWFsU3RhdGUpXHJcbiAgICAgICAgICAgICAgICAgOiBzdG9yZS5zZWxlY3Qoc3RhdGVQYXRoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZSgoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hlci5wdWJsaXNoKHRoaXMuYUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVidWcgJiYgc3RhdGUudG9KUykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFTdHJhdGVneSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChEYXRhU3RyYXRlZ3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhkYXRhU3RyYXRlZ3kudG9KUyhzdGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnZlcnRHZXR0ZXJzVG9Qcm9wZXJ0aWVzKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlUGF0aDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0YXJnZXQucHJvdG90eXBlLmNyZWF0ZVRlc3RTdG9yZSA9IGZ1bmN0aW9uIChzdGF0ZVBhdGg6IGFueVtdKSB7XHJcbiAgICAgICAgICAgIGxldCBzdG9yZSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChTdG9yZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZS5zZWxlY3Qoc3RhdGVQYXRoKTtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZSgoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0YXJnZXQucHJvdG90eXBlLm9uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFzU3RvcmU8VD4ge1xyXG4gICAgc3RvcmU6IFN0b3JlPFQ+ID0gbnVsbDtcclxuICAgIHN0YXRlPzogVCA9IG51bGw7XHJcbn0iXX0=