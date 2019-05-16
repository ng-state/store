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
     * @param {?} property
     * @return {?}
     */
    DataStrategy.prototype.get = function (state, property) { };
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2RhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUd0QyxNQUFNLE9BQWdCLFlBQVk7Ozs7O0lBaUI5QixJQUFjLFlBQVk7O1lBQ2xCLFlBQWlCO1FBRXJCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QixTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO1FBRVAsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBcUI7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztDQUNKOzs7SUE3QkcsaUNBQTBCOzs7Ozs7O0lBRTFCLDBEQUE2Qzs7Ozs7OztJQUM3Qyw0REFBZ0Q7Ozs7Ozs7OztJQUNoRCxnRkFBbUY7Ozs7Ozs7SUFDbkYsNERBQWlFOzs7Ozs7SUFDakUsb0RBQWdDOzs7Ozs7SUFDaEMsa0RBQThCOzs7Ozs7OztJQUM5QixrRUFBMkQ7Ozs7Ozs7OztJQUMzRCxnRkFBa0c7Ozs7OztJQUNsRyx1REFBbUM7Ozs7OztJQUNuQywrREFBMkM7Ozs7Ozs7SUFDM0MsaUVBQXFEOzs7Ozs7O0lBQ3JELDhFQUFtRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN0b3JlTGlrZSB9IGZyb20gJy4vc3RvcmUtbGlrZSc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0YVN0cmF0ZWd5IHtcclxuXHJcbiAgICByb290U3RvcmU6IFN0b3JlTGlrZTxhbnk+O1xyXG5cclxuICAgIGFic3RyYWN0IGdldEluKHN0YXRlOiBhbnksIHBhdGg6IGFueVtdKTogYW55O1xyXG4gICAgYWJzdHJhY3QgZ2V0KHN0YXRlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpOiBhbnk7XHJcbiAgICBhYnN0cmFjdCBtZXJnZShzdGF0ZTogYW55LCBuZXdTdGF0ZTogYW55LCBwYXRoPzogYW55W10sIGlzUm9vdFBhdGg/OiBib29sZWFuKTogYW55O1xyXG4gICAgYWJzdHJhY3QgdXBkYXRlKHBhdGg6IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55KSA9PiB2b2lkKTogdm9pZDtcclxuICAgIGFic3RyYWN0IGZyb21KUyhkYXRhOiBhbnkpOiBhbnk7XHJcbiAgICBhYnN0cmFjdCB0b0pTKGRhdGE6IGFueSk6IGFueTtcclxuICAgIGFic3RyYWN0IHNldChzdGF0ZTogYW55LCBwcm9wZXJ0eTogc3RyaW5nLCBkYXRhOiBhbnkpOiBhbnk7XHJcbiAgICBhYnN0cmFjdCBzZXRJbihzdGF0ZTogYW55LCBwYXRoOiBhbnlbXSwgZGF0YTogYW55LCBhZGRpdGlvbmFsRGF0YT86IHsgZnJvbVVwZGF0ZTogYm9vbGVhbiB9KTogYW55O1xyXG4gICAgYWJzdHJhY3QgaXNPYmplY3Qoc3RhdGU6IGFueSk6IGFueTtcclxuICAgIGFic3RyYWN0IG92ZXJyaWRlQ29udHJ1Y3RvcihvYmo6IGFueSk6IGFueTtcclxuICAgIGFic3RyYWN0IHJlc2V0KHBhdGg6IGFueVtdLCBzdGF0ZVRvTWVyZ2U6IGFueSk6IHZvaWQ7XHJcbiAgICBhYnN0cmFjdCByZXNldFJvb3QoaW5pdGlhbFN0YXRlOiBhbnksIHN0YXJ0aW5nUm91dGU6IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldCBjdXJyZW50U3RhdGUoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZTogYW55O1xyXG5cclxuICAgICAgICB0aGlzLnJvb3RTdG9yZS5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoc3RvcmU6IFN0b3JlTGlrZTxhbnk+KSB7XHJcbiAgICAgICAgdGhpcy5yb290U3RvcmUgPSBzdG9yZTtcclxuICAgIH1cclxufSJdfQ==