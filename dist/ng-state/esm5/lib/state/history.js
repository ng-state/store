/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var StateHistory = /** @class */ (function () {
    function StateHistory() {
        this.options = {
            collectHistory: true,
            storeHistoryItems: 100
        };
    }
    Object.defineProperty(StateHistory.prototype, "currentState", {
        get: /**
         * @return {?}
         */
        function () {
            return StateKeeper.CURRENT_STATE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateHistory.prototype, "history", {
        get: /**
         * @return {?}
         */
        function () {
            return StateKeeper.HISTORY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateHistory.prototype, "storeHistoryItems", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.storeHistoryItems;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} initialState
     * @return {?}
     */
    StateHistory.prototype.init = /**
     * @param {?} initialState
     * @return {?}
     */
    function (initialState) {
        StateHistory.initialState = initialState;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    StateHistory.prototype.changeDefaults = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.options = tslib_1.__assign({}, this.options, options);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    StateHistory.prototype.setCurrentState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        StateKeeper.CURRENT_STATE = state;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    StateHistory.prototype.add = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!this.options.collectHistory) {
            return;
        }
        if (StateKeeper.HISTORY.length >= this.options.storeHistoryItems) {
            StateKeeper.HISTORY.shift();
        }
        StateKeeper.HISTORY.push(item);
    };
    StateHistory.initialState = {};
    StateHistory.decorators = [
        { type: Injectable }
    ];
    return StateHistory;
}());
export { StateHistory };
if (false) {
    /** @type {?} */
    StateHistory.initialState;
    /**
     * @type {?}
     * @private
     */
    StateHistory.prototype.options;
}
var StateKeeper = /** @class */ (function () {
    function StateKeeper() {
    }
    StateKeeper.CURRENT_STATE = null;
    StateKeeper.HISTORY = [];
    return StateKeeper;
}());
export { StateKeeper };
if (false) {
    /** @type {?} */
    StateKeeper.CURRENT_STATE;
    /** @type {?} */
    StateKeeper.HISTORY;
}
/**
 * @record
 */
export function StateHistoryOptions() { }
if (false) {
    /** @type {?|undefined} */
    StateHistoryOptions.prototype.collectHistory;
    /** @type {?|undefined} */
    StateHistoryOptions.prototype.storeHistoryItems;
}
/**
 * @record
 */
export function HistoryItem() { }
if (false) {
    /** @type {?} */
    HistoryItem.prototype.message;
    /** @type {?} */
    HistoryItem.prototype.state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9zdGF0ZS9oaXN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUFBO1FBSVksWUFBTyxHQUF3QjtZQUNuQyxjQUFjLEVBQUUsSUFBSTtZQUNwQixpQkFBaUIsRUFBRSxHQUFHO1NBQ3pCLENBQUM7SUFxQ04sQ0FBQztJQW5DRyxzQkFBSSxzQ0FBWTs7OztRQUFoQjtZQUNJLE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFPOzs7O1FBQVg7WUFDSSxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQ0FBaUI7Ozs7UUFBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7Ozs7O0lBRUQsMkJBQUk7Ozs7SUFBSixVQUFLLFlBQWlCO1FBQ2xCLFlBQVksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRUQscUNBQWM7Ozs7SUFBZCxVQUFlLE9BQTRCO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLHdCQUFRLElBQUksQ0FBQyxPQUFPLEVBQUssT0FBTyxDQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxzQ0FBZTs7OztJQUFmLFVBQWdCLEtBQVU7UUFDdEIsV0FBVyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCwwQkFBRzs7OztJQUFILFVBQUksSUFBaUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO1lBQzlCLE9BQU87U0FDVjtRQUVELElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtZQUM5RCxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQy9CO1FBRUQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXpDTSx5QkFBWSxHQUFHLEVBQUUsQ0FBQzs7Z0JBRjVCLFVBQVU7O0lBNENYLG1CQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7U0EzQ1ksWUFBWTs7O0lBQ3JCLDBCQUF5Qjs7Ozs7SUFFekIsK0JBR0U7O0FBdUNOO0lBQUE7SUFHQSxDQUFDO0lBRlUseUJBQWEsR0FBUSxJQUFJLENBQUM7SUFDMUIsbUJBQU8sR0FBRyxFQUFFLENBQUM7SUFDeEIsa0JBQUM7Q0FBQSxBQUhELElBR0M7U0FIWSxXQUFXOzs7SUFDcEIsMEJBQWlDOztJQUNqQyxvQkFBb0I7Ozs7O0FBR3hCLHlDQUdDOzs7SUFGRyw2Q0FBeUI7O0lBQ3pCLGdEQUFrQzs7Ozs7QUFHdEMsaUNBR0M7OztJQUZHLDhCQUFnQjs7SUFDaEIsNEJBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZUhpc3Rvcnkge1xyXG4gICAgc3RhdGljIGluaXRpYWxTdGF0ZSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgb3B0aW9uczogU3RhdGVIaXN0b3J5T3B0aW9ucyA9IHtcclxuICAgICAgICBjb2xsZWN0SGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICBzdG9yZUhpc3RvcnlJdGVtczogMTAwXHJcbiAgICB9O1xyXG5cclxuICAgIGdldCBjdXJyZW50U3RhdGUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gU3RhdGVLZWVwZXIuQ1VSUkVOVF9TVEFURTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGlzdG9yeSgpOiBhbnlbXSB7XHJcbiAgICAgICAgcmV0dXJuIFN0YXRlS2VlcGVyLkhJU1RPUlk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0b3JlSGlzdG9yeUl0ZW1zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc3RvcmVIaXN0b3J5SXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChpbml0aWFsU3RhdGU6IGFueSkge1xyXG4gICAgICAgIFN0YXRlSGlzdG9yeS5pbml0aWFsU3RhdGUgPSBpbml0aWFsU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlRGVmYXVsdHMob3B0aW9uczogU3RhdGVIaXN0b3J5T3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5vcHRpb25zIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudFN0YXRlKHN0YXRlOiBhbnkpIHtcclxuICAgICAgICBTdGF0ZUtlZXBlci5DVVJSRU5UX1NUQVRFID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGl0ZW06IEhpc3RvcnlJdGVtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY29sbGVjdEhpc3RvcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFN0YXRlS2VlcGVyLkhJU1RPUlkubGVuZ3RoID49IHRoaXMub3B0aW9ucy5zdG9yZUhpc3RvcnlJdGVtcykge1xyXG4gICAgICAgICAgICBTdGF0ZUtlZXBlci5ISVNUT1JZLnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTdGF0ZUtlZXBlci5ISVNUT1JZLnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZUtlZXBlciB7XHJcbiAgICBzdGF0aWMgQ1VSUkVOVF9TVEFURTogYW55ID0gbnVsbDtcclxuICAgIHN0YXRpYyBISVNUT1JZID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGVIaXN0b3J5T3B0aW9ucyB7XHJcbiAgICBjb2xsZWN0SGlzdG9yeT86IGJvb2xlYW47XHJcbiAgICBzdG9yZUhpc3RvcnlJdGVtcz86IG51bWJlciB8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSGlzdG9yeUl0ZW0ge1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgc3RhdGU6IGFueTtcclxufSJdfQ==