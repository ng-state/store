/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { take } from 'rxjs/operators';
/**
 * @abstract
 */
export class DataStrategy {
    /**
     * @protected
     * @return {?}
     */
    get currentState() {
        /** @type {?} */
        let currentState;
        this.rootStore.pipe(take(1))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            currentState = state;
        }));
        return currentState;
    }
    /**
     * @param {?} store
     * @return {?}
     */
    init(store) {
        this.rootStore = store;
    }
}
if (false) {
    /** @type {?} */
    DataStrategy.prototype.rootStore;
    /**
     * @abstract
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    DataStrategy.prototype.getIn = function (state, path) { };
    /**
     * @abstract
     * @param {?} state
     * @param {?} newState
     * @param {?=} path
     * @param {?=} isRootPath
     * @return {?}
     */
    DataStrategy.prototype.merge = function (state, newState, path, isRootPath) { };
    /**
     * @abstract
     * @param {?} path
     * @param {?} action
     * @return {?}
     */
    DataStrategy.prototype.update = function (path, action) { };
    /**
     * @abstract
     * @param {?} data
     * @return {?}
     */
    DataStrategy.prototype.fromJS = function (data) { };
    /**
     * @abstract
     * @param {?} data
     * @return {?}
     */
    DataStrategy.prototype.toJS = function (data) { };
    /**
     * @abstract
     * @param {?} state
     * @param {?} property
     * @param {?} data
     * @return {?}
     */
    DataStrategy.prototype.set = function (state, property, data) { };
    /**
     * @abstract
     * @param {?} state
     * @param {?} path
     * @param {?} data
     * @param {?=} additionalData
     * @return {?}
     */
    DataStrategy.prototype.setIn = function (state, path, data, additionalData) { };
    /**
     * @abstract
     * @param {?} state
     * @return {?}
     */
    DataStrategy.prototype.isObject = function (state) { };
    /**
     * @abstract
     * @param {?} obj
     * @return {?}
     */
    DataStrategy.prototype.overrideContructor = function (obj) { };
    /**
     * @abstract
     * @param {?} path
     * @param {?} stateToMerge
     * @return {?}
     */
    DataStrategy.prototype.reset = function (path, stateToMerge) { };
    /**
     * @abstract
     * @param {?} initialState
     * @param {?} startingRoute
     * @return {?}
     */
    DataStrategy.prototype.resetRoot = function (initialState, startingRoute) { };
    /**
     * @abstract
     * @param {?} objOne
     * @param {?} objTwo
     * @return {?}
     */
    DataStrategy.prototype.equals = function (objOne, objTwo) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2RhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUd0QyxNQUFNLE9BQWdCLFlBQVk7Ozs7O0lBaUI5QixJQUFjLFlBQVk7O1lBQ2xCLFlBQWlCO1FBRXJCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QixTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO1FBRVAsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBcUI7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztDQUNKOzs7SUE3QkcsaUNBQTBCOzs7Ozs7O0lBRTFCLDBEQUE2Qzs7Ozs7Ozs7O0lBQzdDLGdGQUFtRjs7Ozs7OztJQUNuRiw0REFBaUU7Ozs7OztJQUNqRSxvREFBZ0M7Ozs7OztJQUNoQyxrREFBOEI7Ozs7Ozs7O0lBQzlCLGtFQUEyRDs7Ozs7Ozs7O0lBQzNELGdGQUFrRzs7Ozs7O0lBQ2xHLHVEQUFtQzs7Ozs7O0lBQ25DLCtEQUEyQzs7Ozs7OztJQUMzQyxpRUFBcUQ7Ozs7Ozs7SUFDckQsOEVBQW1FOzs7Ozs7O0lBQ25FLDhEQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN0b3JlTGlrZSB9IGZyb20gJy4vc3RvcmUtbGlrZSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0YVN0cmF0ZWd5IHtcclxuXHJcbiAgICByb290U3RvcmU6IFN0b3JlTGlrZTxhbnk+O1xyXG5cclxuICAgIGFic3RyYWN0IGdldEluKHN0YXRlOiBhbnksIHBhdGg6IGFueVtdKTogYW55O1xyXG4gICAgYWJzdHJhY3QgbWVyZ2Uoc3RhdGU6IGFueSwgbmV3U3RhdGU6IGFueSwgcGF0aD86IGFueVtdLCBpc1Jvb3RQYXRoPzogYm9vbGVhbik6IGFueTtcclxuICAgIGFic3RyYWN0IHVwZGF0ZShwYXRoOiBhbnlbXSwgYWN0aW9uOiAoc3RhdGU6IGFueSkgPT4gdm9pZCk6IHZvaWQ7XHJcbiAgICBhYnN0cmFjdCBmcm9tSlMoZGF0YTogYW55KTogYW55O1xyXG4gICAgYWJzdHJhY3QgdG9KUyhkYXRhOiBhbnkpOiBhbnk7XHJcbiAgICBhYnN0cmFjdCBzZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGF0YTogYW55KTogYW55O1xyXG4gICAgYWJzdHJhY3Qgc2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10sIGRhdGE6IGFueSwgYWRkaXRpb25hbERhdGE/OiB7IGZyb21VcGRhdGU6IGJvb2xlYW4gfSk6IGFueTtcclxuICAgIGFic3RyYWN0IGlzT2JqZWN0KHN0YXRlOiBhbnkpOiBhbnk7XHJcbiAgICBhYnN0cmFjdCBvdmVycmlkZUNvbnRydWN0b3Iob2JqOiBhbnkpOiBhbnk7XHJcbiAgICBhYnN0cmFjdCByZXNldChwYXRoOiBhbnlbXSwgc3RhdGVUb01lcmdlOiBhbnkpOiB2b2lkO1xyXG4gICAgYWJzdHJhY3QgcmVzZXRSb290KGluaXRpYWxTdGF0ZTogYW55LCBzdGFydGluZ1JvdXRlOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgYWJzdHJhY3QgZXF1YWxzKG9iak9uZTogYW55LCBvYmpUd286IGFueSk6IGJvb2xlYW47XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldCBjdXJyZW50U3RhdGUoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZTogYW55O1xyXG5cclxuICAgICAgICB0aGlzLnJvb3RTdG9yZS5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoc3RvcmU6IFN0b3JlTGlrZTxhbnk+KSB7XHJcbiAgICAgICAgdGhpcy5yb290U3RvcmUgPSBzdG9yZTtcclxuICAgIH1cclxufSJdfQ==