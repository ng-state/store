/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { distinctUntilChanged, debounceTime, takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataStrategy } from '@ng-state/data-strategy';
import { ServiceLocator } from '../../helpers/service-locator';
var NgFormStateManager = /** @class */ (function () {
    function NgFormStateManager(store) {
        this.unsubscribe = new Subject();
        this.store = store;
    }
    /**
     * @param {?} form
     * @param {?=} params
     * @return {?}
     */
    NgFormStateManager.prototype.bind = /**
     * @param {?} form
     * @param {?=} params
     * @return {?}
     */
    function (form, params) {
        if (params === void 0) { params = {}; }
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.form = form;
        this.params = tslib_1.__assign({ debounceTime: 100, emitEvent: false }, params);
        this.setInitialValue();
        this.subscribeToFormChange();
        return this;
    };
    /**
     * @return {?}
     */
    NgFormStateManager.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.store.reset();
    };
    /**
     * @return {?}
     */
    NgFormStateManager.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
        this.form = null;
        this.store = null;
        this.onChangeFn = null;
        this.shouldUpdateStateFn = null;
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} onChangeFn
     * @return {THIS}
     */
    NgFormStateManager.prototype.onChange = /**
     * @template THIS
     * @this {THIS}
     * @param {?} onChangeFn
     * @return {THIS}
     */
    function (onChangeFn) {
        (/** @type {?} */ (this)).onChangeFn = onChangeFn;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} shouldUpdateStateFn
     * @return {THIS}
     */
    NgFormStateManager.prototype.shouldUpdateState = /**
     * @template THIS
     * @this {THIS}
     * @param {?} shouldUpdateStateFn
     * @return {THIS}
     */
    function (shouldUpdateStateFn) {
        (/** @type {?} */ (this)).shouldUpdateStateFn = shouldUpdateStateFn;
        return (/** @type {?} */ (this));
    };
    /**
     * @private
     * @return {?}
     */
    NgFormStateManager.prototype.setInitialValue = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.store
            .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.form.patchValue(_this.dataStrategy.toJS(state), { emitEvent: _this.params.emitEvent });
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NgFormStateManager.prototype.subscribeToFormChange = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.form.valueChanges
            .pipe(debounceTime(this.params.debounceTime), distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var stateUpdated = false;
            _this.store.update((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                stateUpdated = _this.executeUpdate(value, state);
            }));
            if (stateUpdated) {
                _this.onChangeCall();
            }
        }));
    };
    /**
     * @private
     * @param {?} value
     * @param {?} state
     * @return {?}
     */
    NgFormStateManager.prototype.executeUpdate = /**
     * @private
     * @param {?} value
     * @param {?} state
     * @return {?}
     */
    function (value, state) {
        if (this.shouldUpdateStateFn) {
            if (this.shouldUpdateStateFn({
                form: this.form,
                state: state,
                value: value
            })) {
                this.dataStrategy.merge(state, this.dataStrategy.fromJS(value));
                return true;
            }
        }
        else {
            this.dataStrategy.merge(state, this.dataStrategy.fromJS(value));
            return true;
        }
        return false;
    };
    /**
     * @private
     * @return {?}
     */
    NgFormStateManager.prototype.onChangeCall = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.onChangeFn) {
            this.store
                .pipe(take(1))
                .subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                _this.onChangeFn(_this.dataStrategy.toJS(state));
            }));
        }
    };
    return NgFormStateManager;
}());
export { NgFormStateManager };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgFormStateManager.prototype.unsubscribe;
    /**
     * @type {?}
     * @private
     */
    NgFormStateManager.prototype.form;
    /**
     * @type {?}
     * @private
     */
    NgFormStateManager.prototype.params;
    /**
     * @type {?}
     * @private
     */
    NgFormStateManager.prototype.store;
    /**
     * @type {?}
     * @private
     */
    NgFormStateManager.prototype.dataStrategy;
    /**
     * @type {?}
     * @private
     */
    NgFormStateManager.prototype.onChangeFn;
    /**
     * @type {?}
     * @private
     */
    NgFormStateManager.prototype.shouldUpdateStateFn;
}
/**
 * @record
 */
export function ShoulUpdateStateParams() { }
if (false) {
    /** @type {?} */
    ShoulUpdateStateParams.prototype.form;
    /** @type {?} */
    ShoulUpdateStateParams.prototype.state;
    /** @type {?} */
    ShoulUpdateStateParams.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1tYW5hZ2VyLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9zdG9yZS9wbHVnaW5zL2Zvcm0tbWFuYWdlci5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFL0Q7SUFXSSw0QkFBWSxLQUFpQjtRQVRyQixnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFVaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBRUQsaUNBQUk7Ozs7O0lBQUosVUFBSyxJQUFtQixFQUFFLE1BQXFDO1FBQXJDLHVCQUFBLEVBQUEsV0FBcUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxvQkFBUyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFLLE1BQU0sQ0FBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsa0NBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJ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QUFDOzs7OztJQUVPLHlDQUFZOzs7O0lBQXBCO1FBQUEsaUJBUUM7UUFQRyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUs7aUJBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUNaLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQTVHRCxJQTRHQzs7Ozs7OztJQTFHRyx5Q0FBb0M7Ozs7O0lBQ3BDLGtDQUE0Qjs7Ozs7SUFDNUIsb0NBQXlDOzs7OztJQUN6QyxtQ0FBMEI7Ozs7O0lBQzFCLDBDQUFtQzs7Ozs7SUFFbkMsd0NBQXlDOzs7OztJQUN6QyxpREFBeUU7Ozs7O0FBbUg3RSw0Q0FJQzs7O0lBSEcsc0NBQW9COztJQUNwQix1Q0FBVzs7SUFDWCx1Q0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBkZWJvdW5jZVRpbWUsIHRha2VVbnRpbCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOZ0Zvcm1TdGF0ZU1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgdW5zdWJzY3JpYmUgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgcHJpdmF0ZSBmb3JtOiBGb3JtR3JvdXBMaWtlO1xyXG4gICAgcHJpdmF0ZSBwYXJhbXM6IE5nRm9ybVN0YXRlTWFuYWdlclBhcmFtcztcclxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT47XHJcbiAgICBwcml2YXRlIGRhdGFTdHJhdGVneTogRGF0YVN0cmF0ZWd5O1xyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2VGbjogKHN0YXRlOiBhbnkpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIHNob3VsZFVwZGF0ZVN0YXRlRm46IChwYXJhbXM6IFNob3VsVXBkYXRlU3RhdGVQYXJhbXMpID0+IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RvcmU6IFN0b3JlPGFueT4pIHtcclxuICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChmb3JtOiBGb3JtR3JvdXBMaWtlLCBwYXJhbXM6IE5nRm9ybVN0YXRlTWFuYWdlclBhcmFtcyA9IHt9KTogTmdGb3JtU3RhdGVNYW5hZ2VyIHtcclxuICAgICAgICB0aGlzLmRhdGFTdHJhdGVneSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChEYXRhU3RyYXRlZ3kpO1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7IC4uLiB7IGRlYm91bmNlVGltZTogMTAwLCBlbWl0RXZlbnQ6IGZhbHNlIH0sIC4uLnBhcmFtcyB9O1xyXG4gICAgICAgIHRoaXMuc2V0SW5pdGlhbFZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0Zvcm1DaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZS5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZS5uZXh0KHRydWUpO1xyXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUuY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0b3JlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlRm4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2hvdWxkVXBkYXRlU3RhdGVGbiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFuZ2Uob25DaGFuZ2VGbjogKHN0YXRlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlRm4gPSBvbkNoYW5nZUZuO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3VsZFVwZGF0ZVN0YXRlKHNob3VsZFVwZGF0ZVN0YXRlRm46IChwYXJhbXM6IFNob3VsVXBkYXRlU3RhdGVQYXJhbXMpID0+IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNob3VsZFVwZGF0ZVN0YXRlRm4gPSBzaG91bGRVcGRhdGVTdGF0ZUZuO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0SW5pdGlhbFZhbHVlKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmVcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUodGhpcy5kYXRhU3RyYXRlZ3kudG9KUyhzdGF0ZSksIHsgZW1pdEV2ZW50OiB0aGlzLnBhcmFtcy5lbWl0RXZlbnQgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9Gb3JtQ2hhbmdlKCkge1xyXG5cclxuICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMucGFyYW1zLmRlYm91bmNlVGltZSksXHJcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGVVcGRhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVVwZGF0ZWQgPSB0aGlzLmV4ZWN1dGVVcGRhdGUodmFsdWUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZVVwZGF0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4ZWN1dGVVcGRhdGUodmFsdWU6IGFueSwgc3RhdGU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3VsZFVwZGF0ZVN0YXRlRm4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkVXBkYXRlU3RhdGVGbih7XHJcbiAgICAgICAgICAgICAgICBmb3JtOiB0aGlzLmZvcm0sXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGUsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVN0cmF0ZWd5Lm1lcmdlKHN0YXRlLCB0aGlzLmRhdGFTdHJhdGVneS5mcm9tSlModmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhU3RyYXRlZ3kubWVyZ2Uoc3RhdGUsIHRoaXMuZGF0YVN0cmF0ZWd5LmZyb21KUyh2YWx1ZSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlQ2FsbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5vbkNoYW5nZUZuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVcclxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHN0YXRlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlRm4odGhpcy5kYXRhU3RyYXRlZ3kudG9KUyhzdGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtR3JvdXBMaWtlID0ge1xyXG4gICAgcGF0Y2hWYWx1ZTogRnVuY3Rpb247XHJcbiAgICBzZXRWYWx1ZTogRnVuY3Rpb247XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgZ2V0OiBGdW5jdGlvbjtcclxuICAgIHZhbHVlQ2hhbmdlczogT2JzZXJ2YWJsZTxhbnk+O1xyXG4gICAgY29udHJvbHM6IGFueTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIE5nRm9ybVN0YXRlTWFuYWdlclBhcmFtcyA9IHtcclxuICAgIGRlYm91bmNlVGltZT86IG51bWJlcjtcclxuICAgIGVtaXRFdmVudD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNob3VsVXBkYXRlU3RhdGVQYXJhbXMge1xyXG4gICAgZm9ybTogRm9ybUdyb3VwTGlrZTtcclxuICAgIHN0YXRlOiBhbnk7XHJcbiAgICB2YWx1ZTogYW55O1xyXG59Il19