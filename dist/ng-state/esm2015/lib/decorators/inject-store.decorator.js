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
                if (debug) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LXN0b3JlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNvcmF0b3JzL2luamVjdC1zdG9yZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQUV2RCxNQUFNLFVBQVUsV0FBVyxDQUFDLE9BQTZFLEVBQUUsY0FBNEIsSUFBSSxFQUFFLFFBQWlCLEtBQUs7O1FBQzNKLFlBQVk7Ozs7OztJQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsRUFBRTs7WUFFdEQsZUFBZSxHQUFHLENBQUMsbUJBQVUsYUFBYSxFQUFBLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkQsT0FBTyxJQUFJLEtBQUssZUFBZTtnQkFDM0IsQ0FBQyxDQUFDLFVBQVU7Z0JBQ1osQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNmLENBQUMsRUFBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLFdBQVcsRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQTs7UUFFRyxvQkFBb0I7Ozs7O0lBQUcsQ0FBQyxVQUFtRCxFQUFFLGFBQWEsRUFBRSxFQUFFOztjQUN4RixlQUFlLEdBQUcsQ0FBQyxtQkFBUSxhQUFhLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFH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Q0FBQyxLQUFLLENBQUMsU0FBUzs7OztZQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUM7UUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVM7OztRQUFHO1lBQ3pCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxDQUFDLENBQUEsQ0FBQztJQUNOLENBQUMsRUFBQztBQUNOLENBQUM7Ozs7QUFFRCxNQUFNLE9BQU8sUUFBUTtJQUFyQjtRQUNJLFVBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsVUFBSyxHQUFPLElBQUksQ0FBQztJQUNyQixDQUFDO0NBQUE7OztJQUZHLHlCQUF1Qjs7SUFDdkIseUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4uL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9zdG9yZSc7XHJcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xyXG5pbXBvcnQgeyBEaXNwYXRjaGVyIH0gZnJvbSAnLi4vc2VydmljZXMvZGlzcGF0Y2hlcic7XHJcbmltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbmplY3RTdG9yZShuZXdQYXRoOiBzdHJpbmdbXSB8IHN0cmluZyB8ICgoY3VycmVudFBhdGgsIHN0YXRlSW5kZXgpID0+IHN0cmluZ1tdIHwgc3RyaW5nKSwgaW50aWFsU3RhdGU6IE9iamVjdCB8IGFueSA9IG51bGwsIGRlYnVnOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGxldCBnZXRTdGF0ZVBhdGggPSAoY3VycmVudFBhdGgsIHN0YXRlSW5kZXgsIGV4dHJhY3RlZFBhdGgpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkUGF0aCA9ICg8c3RyaW5nW10+ZXh0cmFjdGVkUGF0aCkubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gJyR7c3RhdGVJbmRleH0nXHJcbiAgICAgICAgICAgICAgICA/IHN0YXRlSW5kZXhcclxuICAgICAgICAgICAgICAgIDogaXRlbTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFsuLi5jdXJyZW50UGF0aCwgLi4udHJhbnNmb3JtZWRQYXRoXTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGdldEFic29sdXRlU3RhdGVQYXRoID0gKHN0YXRlSW5kZXg6IChzdHJpbmcgfCBudW1iZXIpIHwgKHN0cmluZyB8IG51bWJlcilbXSwgZXh0cmFjdGVkUGF0aCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkUGF0aCA9ICg8c3RyaW5nPmV4dHJhY3RlZFBhdGgpLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZUluZGV4ID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygc3RhdGVJbmRleCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgc3RhdGVJbmRleCA9IFtzdGF0ZUluZGV4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBudGhTdGF0ZVBhdGhJbmRleCA9IDA7XHJcbiAgICAgICAgdHJhbnNmb3JtZWRQYXRoLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICcke3N0YXRlSW5kZXh9Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCg8YW55W10+c3RhdGVJbmRleCkubGVuZ3RoIDw9IG50aFN0YXRlUGF0aEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdGF0ZSBwYXRoICR7bmV3UGF0aH0gaGFzIG5vdCBlbm91Z2ggc3RhdGVJbmRleGVzIHNldC4gUGxlYXNlIHByb3ZpZGUgc3RhdGVJbmRleGVzIGFzIGFycmF5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHNldCBpbiBzdGF0ZVBhdGguYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWRQYXRoW2luZGV4XSA9IHN0YXRlSW5kZXhbbnRoU3RhdGVQYXRoSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgbnRoU3RhdGVQYXRoSW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWRQYXRoO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZ2V0QWxsR2V0dGVycyA9ICh0YXJnZXQ6IGFueSk6IGFueVtdID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXRNZXRob2RzID0gUmVmbGVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xyXG4gICAgICAgIGxldCBtZXRob2RzID0gT2JqZWN0LmVudHJpZXMoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModGFyZ2V0TWV0aG9kcykpXHJcbiAgICAgICAgICAgIC5tYXAoKFtrZXksIGRlc2NyaXB0b3JdOiBbc3RyaW5nLCBhbnldKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICBpc0dldHRlcjogdHlwZW9mIGRlc2NyaXB0b3IuZ2V0ID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZmlsdGVyKG1ldGhvZCA9PiBtZXRob2QuaXNHZXR0ZXIpXHJcbiAgICAgICAgICAgIC5tYXAobWV0aG9kID0+IG1ldGhvZC5uYW1lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZHM7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjb252ZXJ0R2V0dGVyc1RvUHJvcGVydGllcyA9IChpbnN0YW5jZTogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2V0dGVycyA9IGdldEFsbEdldHRlcnMoaW5zdGFuY2UpO1xyXG4gICAgICAgIGdldHRlcnMuZm9yRWFjaChuYW1lID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBHZXR0ZXIgPSBpbnN0YW5jZVtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKHRlbXBHZXR0ZXIgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgaW5zdGFuY2VbbmFtZV07XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaW5zdGFuY2UsIG5hbWUsIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGVtcEdldHRlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuICh0YXJnZXQ6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICB0YXJnZXQucHJvdG90eXBlLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKGN1cnJlbnRQYXRoOiBhbnlbXSwgc3RhdGVJbmRleDogKHN0cmluZyB8IG51bWJlcikgfCAoc3RyaW5nIHwgbnVtYmVyKVtdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYUlkID0gSGVscGVycy5ndWlkKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZXh0cmFjdGVkUGF0aCA9IHR5cGVvZiBuZXdQYXRoID09PSAnZnVuY3Rpb24nICYmICg8YW55Pm5ld1BhdGgpLm5hbWUgPT09ICcnXHJcbiAgICAgICAgICAgICAgICA/ICg8YW55Pm5ld1BhdGgpKGN1cnJlbnRQYXRoLCBzdGF0ZUluZGV4KVxyXG4gICAgICAgICAgICAgICAgOiBuZXdQYXRoO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhdGVQYXRoID0gdHlwZW9mIGV4dHJhY3RlZFBhdGggPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICA/IGdldEFic29sdXRlU3RhdGVQYXRoKHN0YXRlSW5kZXgsIGV4dHJhY3RlZFBhdGgpXHJcbiAgICAgICAgICAgICAgICA6IGdldFN0YXRlUGF0aChjdXJyZW50UGF0aCwgc3RhdGVJbmRleCwgZXh0cmFjdGVkUGF0aCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdG9yZSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChTdG9yZSkgYXMgU3RvcmU8YW55PjtcclxuICAgICAgICAgICAgY29uc3QgZGlzcGF0Y2hlciA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChEaXNwYXRjaGVyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmUgPSBpbnRpYWxTdGF0ZVxyXG4gICAgICAgICAgICAgICAgID8gc3RvcmUuaW5pdGlhbGl6ZShzdGF0ZVBhdGgsIGludGlhbFN0YXRlKVxyXG4gICAgICAgICAgICAgICAgIDogc3RvcmUuc2VsZWN0KHN0YXRlUGF0aCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9yZS5zdWJzY3JpYmUoKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoZXIucHVibGlzaCh0aGlzLmFJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YVN0cmF0ZWd5ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERhdGFTdHJhdGVneSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGRhdGFTdHJhdGVneS50b0pTKHN0YXRlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udmVydEdldHRlcnNUb1Byb3BlcnRpZXModGhpcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVQYXRoO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUuY3JlYXRlVGVzdFN0b3JlID0gZnVuY3Rpb24gKHN0YXRlUGF0aDogYW55W10pIHtcclxuICAgICAgICAgICAgbGV0IHN0b3JlID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KFN0b3JlKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlLnNlbGVjdChzdGF0ZVBhdGgpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvcmUuc3Vic2NyaWJlKChzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUub25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYXNTdG9yZTxUPiB7XHJcbiAgICBzdG9yZTogU3RvcmU8VD4gPSBudWxsO1xyXG4gICAgc3RhdGU/OiBUID0gbnVsbDtcclxufSJdfQ==