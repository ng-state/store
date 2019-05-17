/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { distinctUntilChanged, debounceTime, takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataStrategy } from '@ng-state/data-strategy';
import { ServiceLocator } from '../../helpers/service-locator';
export class NgFormStateManager {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.unsubscribe = new Subject();
        this.store = store;
    }
    /**
     * @param {?} form
     * @param {?=} params
     * @return {?}
     */
    bind(form, params = {}) {
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.form = form;
        this.params = Object.assign({ debounceTime: 100, emitEvent: false }, params);
        this.setInitialValue();
        this.subscribeToFormChange();
        return this;
    }
    /**
     * @return {?}
     */
    reset() {
        this.store.reset();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
        this.form = null;
        this.store = null;
        this.onChangeFn = null;
        this.shouldUpdateStateFn = null;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} onChangeFn
     * @return {THIS}
     */
    onChange(onChangeFn) {
        (/** @type {?} */ (this)).onChangeFn = onChangeFn;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} shouldUpdateStateFn
     * @return {THIS}
     */
    shouldUpdateState(shouldUpdateStateFn) {
        (/** @type {?} */ (this)).shouldUpdateStateFn = shouldUpdateStateFn;
        return (/** @type {?} */ (this));
    }
    /**
     * @private
     * @return {?}
     */
    setInitialValue() {
        this.store
            .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            this.form.patchValue(this.dataStrategy.toJS(state), { emitEvent: this.params.emitEvent });
        }));
    }
    /**
     * @private
     * @return {?}
     */
    subscribeToFormChange() {
        this.form.valueChanges
            .pipe(debounceTime(this.params.debounceTime), distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            /** @type {?} */
            let stateUpdated = false;
            this.store.update((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                stateUpdated = this.executeUpdate(value, state);
            }));
            if (stateUpdated) {
                this.onChangeCall();
            }
        }));
    }
    /**
     * @private
     * @param {?} value
     * @param {?} state
     * @return {?}
     */
    executeUpdate(value, state) {
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
    }
    /**
     * @private
     * @return {?}
     */
    onChangeCall() {
        if (this.onChangeFn) {
            this.store
                .pipe(take(1))
                .subscribe((/**
             * @param {?} state
             * @return {?}
             */
            state => {
                this.onChangeFn(this.dataStrategy.toJS(state));
            }));
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1tYW5hZ2VyLnBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9zdG9yZS9wbHVnaW5zL2Zvcm0tbWFuYWdlci5wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUvRCxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBVzNCLFlBQVksS0FBaUI7UUFUckIsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBVWhDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUVELElBQUksQ0FBQyxJQUFtQixFQUFFLFNBQW1DLEVBQUU7UUFDM0QsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxpQkFBUyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFLLE1BQU0sQ0FBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVE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QUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVM7Ozs7WUFBQyxLQUFLLENBQUMsRUFBRTtnQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxFQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7Q0FDSjs7Ozs7O0lBMUdHLHlDQUFvQzs7Ozs7SUFDcEMsa0NBQTRCOzs7OztJQUM1QixvQ0FBeUM7Ozs7O0lBQ3pDLG1DQUEwQjs7Ozs7SUFDMUIsMENBQW1DOzs7OztJQUVuQyx3Q0FBeUM7Ozs7O0lBQ3pDLGlEQUF5RTs7Ozs7QUFtSDdFLDRDQUlDOzs7SUFIRyxzQ0FBb0I7O0lBQ3BCLHVDQUFXOztJQUNYLHVDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGRlYm91bmNlVGltZSwgdGFrZVVudGlsLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5nRm9ybVN0YXRlTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSB1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICBwcml2YXRlIGZvcm06IEZvcm1Hcm91cExpa2U7XHJcbiAgICBwcml2YXRlIHBhcmFtczogTmdGb3JtU3RhdGVNYW5hZ2VyUGFyYW1zO1xyXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8YW55PjtcclxuICAgIHByaXZhdGUgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3k7XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZUZuOiAoc3RhdGU6IGFueSkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgc2hvdWxkVXBkYXRlU3RhdGVGbjogKHBhcmFtczogU2hvdWxVcGRhdGVTdGF0ZVBhcmFtcykgPT4gYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yZTogU3RvcmU8YW55Pikge1xyXG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGZvcm06IEZvcm1Hcm91cExpa2UsIHBhcmFtczogTmdGb3JtU3RhdGVNYW5hZ2VyUGFyYW1zID0ge30pOiBOZ0Zvcm1TdGF0ZU1hbmFnZXIge1xyXG4gICAgICAgIHRoaXMuZGF0YVN0cmF0ZWd5ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERhdGFTdHJhdGVneSk7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gZm9ybTtcclxuICAgICAgICB0aGlzLnBhcmFtcyA9IHsgLi4uIHsgZGVib3VuY2VUaW1lOiAxMDAsIGVtaXRFdmVudDogZmFsc2UgfSwgLi4ucGFyYW1zIH07XHJcbiAgICAgICAgdGhpcy5zZXRJbml0aWFsVmFsdWUoKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRm9ybUNoYW5nZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICB0aGlzLnN0b3JlLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmZvcm0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RvcmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VGbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zaG91bGRVcGRhdGVTdGF0ZUZuID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZShvbkNoYW5nZUZuOiAoc3RhdGU6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VGbiA9IG9uQ2hhbmdlRm47XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdWxkVXBkYXRlU3RhdGUoc2hvdWxkVXBkYXRlU3RhdGVGbjogKHBhcmFtczogU2hvdWxVcGRhdGVTdGF0ZVBhcmFtcykgPT4gYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuc2hvdWxkVXBkYXRlU3RhdGVGbiA9IHNob3VsZFVwZGF0ZVN0YXRlRm47XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRJbml0aWFsVmFsdWUoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0ucGF0Y2hWYWx1ZSh0aGlzLmRhdGFTdHJhdGVneS50b0pTKHN0YXRlKSwgeyBlbWl0RXZlbnQ6IHRoaXMucGFyYW1zLmVtaXRFdmVudCB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb0Zvcm1DaGFuZ2UoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXNcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy5wYXJhbXMuZGVib3VuY2VUaW1lKSxcclxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZVVwZGF0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZSgoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlVXBkYXRlZCA9IHRoaXMuZXhlY3V0ZVVwZGF0ZSh2YWx1ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlVXBkYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXhlY3V0ZVVwZGF0ZSh2YWx1ZTogYW55LCBzdGF0ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkVXBkYXRlU3RhdGVGbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG91bGRVcGRhdGVTdGF0ZUZuKHtcclxuICAgICAgICAgICAgICAgIGZvcm06IHRoaXMuZm9ybSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU3RyYXRlZ3kubWVyZ2Uoc3RhdGUsIHRoaXMuZGF0YVN0cmF0ZWd5LmZyb21KUyh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFTdHJhdGVneS5tZXJnZShzdGF0ZSwgdGhpcy5kYXRhU3RyYXRlZ3kuZnJvbUpTKHZhbHVlKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlRm4pIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yZVxyXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2VGbih0aGlzLmRhdGFTdHJhdGVneS50b0pTKHN0YXRlKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1Hcm91cExpa2UgPSB7XHJcbiAgICBwYXRjaFZhbHVlOiBGdW5jdGlvbjtcclxuICAgIHNldFZhbHVlOiBGdW5jdGlvbjtcclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICBnZXQ6IEZ1bmN0aW9uO1xyXG4gICAgdmFsdWVDaGFuZ2VzOiBPYnNlcnZhYmxlPGFueT47XHJcbiAgICBjb250cm9sczogYW55O1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgTmdGb3JtU3RhdGVNYW5hZ2VyUGFyYW1zID0ge1xyXG4gICAgZGVib3VuY2VUaW1lPzogbnVtYmVyO1xyXG4gICAgZW1pdEV2ZW50PzogYm9vbGVhbjtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2hvdWxVcGRhdGVTdGF0ZVBhcmFtcyB7XHJcbiAgICBmb3JtOiBGb3JtR3JvdXBMaWtlO1xyXG4gICAgc3RhdGU6IGFueTtcclxuICAgIHZhbHVlOiBhbnk7XHJcbn0iXX0=