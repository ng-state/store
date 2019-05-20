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
     * @param {?} isProd
     * @return {?}
     */
    init(store, isProd) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2RhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUd0QyxNQUFNLE9BQWdCLFlBQVk7Ozs7O0lBaUI5QixJQUFjLFlBQVk7O1lBQ2xCLFlBQWlCO1FBRXJCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QixTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO1FBRVAsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxDQUFDLEtBQXFCLEVBQUUsTUFBZTtRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0NBQ0o7OztJQTdCRyxpQ0FBMEI7Ozs7Ozs7SUFFMUIsMERBQTZDOzs7Ozs7O0lBQzdDLDREQUFnRDs7Ozs7Ozs7O0lBQ2hELGdGQUFtRjs7Ozs7OztJQUNuRiw0REFBaUU7Ozs7OztJQUNqRSxvREFBZ0M7Ozs7OztJQUNoQyxrREFBOEI7Ozs7Ozs7O0lBQzlCLGtFQUEyRDs7Ozs7Ozs7O0lBQzNELGdGQUFrRzs7Ozs7O0lBQ2xHLHVEQUFtQzs7Ozs7O0lBQ25DLCtEQUEyQzs7Ozs7OztJQUMzQyxpRUFBcUQ7Ozs7Ozs7SUFDckQsOEVBQW1FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3RvcmVMaWtlIH0gZnJvbSAnLi9zdG9yZS1saWtlJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhU3RyYXRlZ3kge1xyXG5cclxuICAgIHJvb3RTdG9yZTogU3RvcmVMaWtlPGFueT47XHJcblxyXG4gICAgYWJzdHJhY3QgZ2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10pOiBhbnk7XHJcbiAgICBhYnN0cmFjdCBnZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZyk6IGFueTtcclxuICAgIGFic3RyYWN0IG1lcmdlKHN0YXRlOiBhbnksIG5ld1N0YXRlOiBhbnksIHBhdGg/OiBhbnlbXSwgaXNSb290UGF0aD86IGJvb2xlYW4pOiBhbnk7XHJcbiAgICBhYnN0cmFjdCB1cGRhdGUocGF0aDogYW55W10sIGFjdGlvbjogKHN0YXRlOiBhbnkpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgYWJzdHJhY3QgZnJvbUpTKGRhdGE6IGFueSk6IGFueTtcclxuICAgIGFic3RyYWN0IHRvSlMoZGF0YTogYW55KTogYW55O1xyXG4gICAgYWJzdHJhY3Qgc2V0KHN0YXRlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIGRhdGE6IGFueSk6IGFueTtcclxuICAgIGFic3RyYWN0IHNldEluKHN0YXRlOiBhbnksIHBhdGg6IGFueVtdLCBkYXRhOiBhbnksIGFkZGl0aW9uYWxEYXRhPzogeyBmcm9tVXBkYXRlOiBib29sZWFuIH0pOiBhbnk7XHJcbiAgICBhYnN0cmFjdCBpc09iamVjdChzdGF0ZTogYW55KTogYW55O1xyXG4gICAgYWJzdHJhY3Qgb3ZlcnJpZGVDb250cnVjdG9yKG9iajogYW55KTogYW55O1xyXG4gICAgYWJzdHJhY3QgcmVzZXQocGF0aDogYW55W10sIHN0YXRlVG9NZXJnZTogYW55KTogdm9pZDtcclxuICAgIGFic3RyYWN0IHJlc2V0Um9vdChpbml0aWFsU3RhdGU6IGFueSwgc3RhcnRpbmdSb3V0ZTogc3RyaW5nKTogdm9pZDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtcclxuICAgICAgICBsZXQgY3VycmVudFN0YXRlOiBhbnk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShzdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChzdG9yZTogU3RvcmVMaWtlPGFueT4sIGlzUHJvZDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlID0gc3RvcmU7XHJcbiAgICB9XHJcbn0iXX0=