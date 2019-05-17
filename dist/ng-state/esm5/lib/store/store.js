/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Select } from './select';
import { Update } from './update';
import { Initialize } from './initialize';
import { Observable } from 'rxjs';
import { Map } from './map';
import { Reset } from './reset';
import { NgFormStateManager } from './plugins/form-manager.plugin';
import { PersistStateManager } from './plugins/persist-state.plugin';
/**
 * @template T
 */
var /**
 * @template T
 */
Store = /** @class */ (function (_super) {
    tslib_1.__extends(Store, _super);
    function Store(state) {
        var _this = _super.call(this) || this;
        _this.statePath = [];
        _this.rootPath = [];
        _this.select = (/**
         * @param {?} statePath
         * @return {?}
         */
        function (statePath) {
            /** @type {?} */
            var selectStore = Select.bind(_this).call(_this, statePath);
            selectStore.statePath = tslib_1.__spread(_this.statePath, statePath);
            selectStore.rootPath = _this.rootPath;
            selectStore.initialState = _this.initialState;
            _this.initializeOperators(selectStore);
            return selectStore;
        });
        _this.source = state;
        _this.initializeOperators(_this);
        return _this;
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    Store.prototype.lift = /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    function (operator) {
        /** @type {?} */
        var store = new Store(this);
        store.operator = operator;
        return store;
    };
    /**
     * @param {?} err
     * @return {?}
     */
    Store.prototype.error = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        console.log(err);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    Store.prototype.next = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        ((/** @type {?} */ (this.source))).next(state);
    };
    /**
     * @return {?}
     */
    Store.prototype.complete = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} storeContext
     * @return {?}
     */
    Store.prototype.initializeOperators = /**
     * @param {?} storeContext
     * @return {?}
     */
    function (storeContext) {
        storeContext.update = Update.bind(storeContext);
        storeContext.initialize = Initialize.bind(storeContext);
        storeContext.reset = Reset.bind(storeContext);
        storeContext.map = Map.bind(storeContext);
        storeContext.form = new NgFormStateManager(storeContext);
        storeContext.storage = new PersistStateManager(storeContext);
    };
    return Store;
}(Observable));
/**
 * @template T
 */
export { Store };
if (false) {
    /** @type {?} */
    Store.prototype.statePath;
    /** @type {?} */
    Store.prototype.rootPath;
    /** @type {?} */
    Store.prototype.initialState;
    /** @type {?} */
    Store.prototype.update;
    /** @type {?} */
    Store.prototype.initialize;
    /** @type {?} */
    Store.prototype.map;
    /** @type {?} */
    Store.prototype.reset;
    /** @type {?} */
    Store.prototype.form;
    /** @type {?} */
    Store.prototype.storage;
    /** @type {?} */
    Store.prototype.select;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFtQixNQUFNLFVBQVUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFtQixNQUFNLFVBQVUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUF1QixNQUFNLGNBQWMsQ0FBQztBQUMvRCxPQUFPLEVBQVksVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBZSxHQUFHLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUFrQixLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7QUFFckU7Ozs7SUFBOEIsaUNBQWE7SUFhdkMsZUFBWSxLQUFzQjtRQUFsQyxZQUNJLGlCQUFPLFNBSVY7UUFqQkQsZUFBUyxHQUFVLEVBQUUsQ0FBQztRQUN0QixjQUFRLEdBQVUsRUFBRSxDQUFDO1FBa0JyQixZQUFNOzs7O1FBQW9CLFVBQUMsU0FBbUI7O2dCQUN0QyxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxFQUFFLFNBQVMsQ0FBQztZQUN6RCxXQUFXLENBQUMsU0FBUyxvQkFBTyxLQUFJLENBQUMsU0FBUyxFQUFLLFNBQVMsQ0FBQyxDQUFDO1lBQzFELFdBQVcsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztZQUNyQyxXQUFXLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0MsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUMsRUFBQTtRQVhHLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsQ0FBQzs7SUFDbkMsQ0FBQzs7Ozs7O0lBV0Qsb0JBQUk7Ozs7O0lBQUosVUFBUSxRQUF3Qjs7WUFDdEIsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFJLElBQUksQ0FBQztRQUNoQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMxQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELHFCQUFLOzs7O0lBQUwsVUFBTSxHQUFRO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELG9CQUFJOzs7O0lBQUosVUFBSyxLQUFVO1FBQ1gsQ0FBQyxtQkFBSyxJQUFJLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELHdCQUFROzs7SUFBUjtJQUNBLENBQUM7Ozs7O0lBRUQsbUNBQW1COzs7O0lBQW5CLFVBQW9CLFlBQXNCO1FBQ3RDLFlBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxZQUFZLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEQsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLFlBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQyxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQXRERCxDQUE4QixVQUFVLEdBc0R2Qzs7Ozs7OztJQXJERywwQkFBc0I7O0lBQ3RCLHlCQUFxQjs7SUFDckIsNkJBQWtCOztJQUVsQix1QkFBMkI7O0lBQzNCLDJCQUFtQzs7SUFDbkMsb0JBQW9COztJQUNwQixzQkFBc0I7O0lBRXRCLHFCQUF5Qjs7SUFDekIsd0JBQTZCOztJQVM3Qix1QkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdCwgU2VsZWN0U2lnbmF0dXJlIH0gZnJvbSAnLi9zZWxlY3QnO1xyXG5pbXBvcnQgeyBVcGRhdGUsIFVwZGF0ZVNpZ25hdHVyZSB9IGZyb20gJy4vdXBkYXRlJztcclxuaW1wb3J0IHsgSW5pdGlhbGl6ZSwgSW5pdGlhbGl6ZVNpZ25hdHVyZSB9IGZyb20gJy4vaW5pdGlhbGl6ZSc7XHJcbmltcG9ydCB7IE9wZXJhdG9yLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXBTZ25hdHVyZSwgTWFwIH0gZnJvbSAnLi9tYXAnO1xyXG5pbXBvcnQgeyBSZXNldFNpZ25hdHVyZSwgUmVzZXQgfSBmcm9tICcuL3Jlc2V0JztcclxuaW1wb3J0IHsgTmdGb3JtU3RhdGVNYW5hZ2VyIH0gZnJvbSAnLi9wbHVnaW5zL2Zvcm0tbWFuYWdlci5wbHVnaW4nO1xyXG5pbXBvcnQgeyBQZXJzaXN0U3RhdGVNYW5hZ2VyIH0gZnJvbSAnLi9wbHVnaW5zL3BlcnNpc3Qtc3RhdGUucGx1Z2luJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4gaW1wbGVtZW50cyBPYnNlcnZlcjxhbnk+IHtcclxuICAgIHN0YXRlUGF0aDogYW55W10gPSBbXTtcclxuICAgIHJvb3RQYXRoOiBhbnlbXSA9IFtdO1xyXG4gICAgaW5pdGlhbFN0YXRlOiBhbnk7XHJcblxyXG4gICAgdXBkYXRlOiBVcGRhdGVTaWduYXR1cmU8VD47XHJcbiAgICBpbml0aWFsaXplOiBJbml0aWFsaXplU2lnbmF0dXJlPFQ+O1xyXG4gICAgbWFwOiBNYXBTZ25hdHVyZTxUPjtcclxuICAgIHJlc2V0OiBSZXNldFNpZ25hdHVyZTtcclxuXHJcbiAgICBmb3JtOiBOZ0Zvcm1TdGF0ZU1hbmFnZXI7XHJcbiAgICBzdG9yYWdlOiBQZXJzaXN0U3RhdGVNYW5hZ2VyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlOiBPYnNlcnZhYmxlPGFueT4pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnNvdXJjZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZU9wZXJhdG9ycyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3Q6IFNlbGVjdFNpZ25hdHVyZSA9IChzdGF0ZVBhdGg6IHN0cmluZ1tdKTogU3RvcmU8VD4gPT4ge1xyXG4gICAgICAgIGxldCBzZWxlY3RTdG9yZSA9IFNlbGVjdC5iaW5kKHRoaXMpLmNhbGwodGhpcywgc3RhdGVQYXRoKTtcclxuICAgICAgICBzZWxlY3RTdG9yZS5zdGF0ZVBhdGggPSBbLi4udGhpcy5zdGF0ZVBhdGgsIC4uLnN0YXRlUGF0aF07XHJcbiAgICAgICAgc2VsZWN0U3RvcmUucm9vdFBhdGggPSB0aGlzLnJvb3RQYXRoO1xyXG4gICAgICAgIHNlbGVjdFN0b3JlLmluaXRpYWxTdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZU9wZXJhdG9ycyhzZWxlY3RTdG9yZSk7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdFN0b3JlO1xyXG4gICAgfVxyXG5cclxuICAgIGxpZnQ8Uj4ob3BlcmF0b3I6IE9wZXJhdG9yPFQsIFI+KTogU3RvcmU8Uj4ge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gbmV3IFN0b3JlPFI+KHRoaXMpO1xyXG4gICAgICAgIHN0b3JlLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JlO1xyXG4gICAgfVxyXG5cclxuICAgIGVycm9yKGVycjogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0KHN0YXRlOiBhbnkpIHtcclxuICAgICAgICAoPGFueT50aGlzLnNvdXJjZSkubmV4dChzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcGxldGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZU9wZXJhdG9ycyhzdG9yZUNvbnRleHQ6IFN0b3JlPFQ+KSB7XHJcbiAgICAgICAgc3RvcmVDb250ZXh0LnVwZGF0ZSA9IFVwZGF0ZS5iaW5kKHN0b3JlQ29udGV4dCk7XHJcbiAgICAgICAgc3RvcmVDb250ZXh0LmluaXRpYWxpemUgPSBJbml0aWFsaXplLmJpbmQoc3RvcmVDb250ZXh0KTtcclxuICAgICAgICBzdG9yZUNvbnRleHQucmVzZXQgPSBSZXNldC5iaW5kKHN0b3JlQ29udGV4dCk7XHJcbiAgICAgICAgc3RvcmVDb250ZXh0Lm1hcCA9IE1hcC5iaW5kKHN0b3JlQ29udGV4dCk7XHJcbiAgICAgICAgc3RvcmVDb250ZXh0LmZvcm0gPSBuZXcgTmdGb3JtU3RhdGVNYW5hZ2VyKHN0b3JlQ29udGV4dCk7XHJcbiAgICAgICAgc3RvcmVDb250ZXh0LnN0b3JhZ2UgPSBuZXcgUGVyc2lzdFN0YXRlTWFuYWdlcihzdG9yZUNvbnRleHQpO1xyXG4gICAgfVxyXG59Il19