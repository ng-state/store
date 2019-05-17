/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NavigationCancel, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
var RouterState = /** @class */ (function () {
    function RouterState(store, router, debugInfo) {
        this.store = store;
        this.router = router;
        this.debugInfo = debugInfo;
    }
    /**
     * @return {?}
     */
    RouterState.prototype.init = /**
     * @return {?}
     */
    function () {
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.initRouter();
        this.bindRouter();
    };
    /**
     * @private
     * @return {?}
     */
    RouterState.prototype.initRouter = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof RoutesRecognized; })), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.store.initialize(['router'], { url: event.url }, false);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    RouterState.prototype.bindRouter = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.router.events) {
            return;
        }
        /** @type {?} */
        var cancelledId = -1;
        this.router.events
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.debugInfo && !_this.debugInfo.isTimeTravel; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event instanceof NavigationCancel) {
                cancelledId = ((/** @type {?} */ (event))).id;
            }
            if (event instanceof NavigationEnd && ((/** @type {?} */ (event))).id !== cancelledId) {
                ((/** @type {?} */ (_this.store.select(['router'])))).update((/**
                 * @param {?} state
                 * @return {?}
                 */
                function (state) {
                    _this.dataStrategy.set(state, 'url', event.url);
                }));
            }
        }));
    };
    RouterState.startingRoute = '';
    return RouterState;
}());
export { RouterState };
if (false) {
    /** @type {?} */
    RouterState.startingRoute;
    /**
     * @type {?}
     * @private
     */
    RouterState.prototype.dataStrategy;
    /**
     * @type {?}
     * @private
     */
    RouterState.prototype.store;
    /**
     * @type {?}
     * @private
     */
    RouterState.prototype.router;
    /**
     * @type {?}
     * @private
     */
    RouterState.prototype.debugInfo;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLXN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL3N0YXRlL3JvdXRlci1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFVLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzVGLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RDtJQUlJLHFCQUFvQixLQUFpQixFQUFVLE1BQWMsRUFBVSxTQUFvQjtRQUF2RSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDM0YsQ0FBQzs7OztJQUVELDBCQUFJOzs7SUFBSjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVPLGdDQUFVOzs7O0lBQWxCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDYixJQUFJLENBQ0QsTUFBTTs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLGdCQUFnQixFQUFqQyxDQUFpQyxFQUFDLEVBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVjthQUNBLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQXVCO1lBQy9CLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQzs7Ozs7SUFFTyxnQ0FBVTs7OztJQUFsQjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTztTQUNWOztZQUVHLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ2IsSUFBSSxDQUFDLE1BQU07OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQTlDLENBQThDLEVBQUMsQ0FBQzthQUNsRSxTQUFTOzs7O1FBQUMsVUFBQyxLQUFLO1lBQ2IsSUFBSSxLQUFLLFlBQVksZ0JBQWdCLEVBQUU7Z0JBQ25DLFdBQVcsR0FBRyxDQUFDLG1CQUFrQixLQUFLLEVBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUM5QztZQUNELElBQUksS0FBSyxZQUFZLGFBQWEsSUFBSSxDQUFDLG1CQUFlLEtBQUssRUFBQSxDQUFDLENBQUMsRUFBRSxLQUFLLFdBQVcsRUFBRTtnQkFDN0UsQ0FBQyxtQkFBWSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUEsQ0FBQyxDQUFDLE1BQU07Ozs7Z0JBQUMsVUFBQSxLQUFLO29CQUNwRCxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxFQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQztJQXpDTSx5QkFBYSxHQUFHLEVBQUUsQ0FBQztJQTBDOUIsa0JBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQTNDWSxXQUFXOzs7SUFDcEIsMEJBQTBCOzs7OztJQUMxQixtQ0FBbUM7Ozs7O0lBRXZCLDRCQUF5Qjs7Ozs7SUFBRSw2QkFBc0I7Ozs7O0lBQUUsZ0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uQ2FuY2VsLCBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXNSZWNvZ25pemVkIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9zdG9yZSc7XHJcbmltcG9ydCB7IERlYnVnSW5mbyB9IGZyb20gJy4uL2RlYnVnL2RlYnVnLWluZm8nO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGVyU3RhdGUge1xyXG4gICAgc3RhdGljIHN0YXJ0aW5nUm91dGUgPSAnJztcclxuICAgIHByaXZhdGUgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3k7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8YW55PiwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkZWJ1Z0luZm86IERlYnVnSW5mbykge1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhU3RyYXRlZ3kgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoRGF0YVN0cmF0ZWd5KTtcclxuICAgICAgICB0aGlzLmluaXRSb3V0ZXIoKTtcclxuICAgICAgICB0aGlzLmJpbmRSb3V0ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRSb3V0ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgUm91dGVzUmVjb2duaXplZCksXHJcbiAgICAgICAgICAgICAgICB0YWtlKDEpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IFJvdXRlc1JlY29nbml6ZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuaW5pdGlhbGl6ZShbJ3JvdXRlciddLCB7IHVybDogZXZlbnQudXJsIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiaW5kUm91dGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5yb3V0ZXIuZXZlbnRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjYW5jZWxsZWRJZCA9IC0xO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xyXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5kZWJ1Z0luZm8gJiYgIXRoaXMuZGVidWdJbmZvLmlzVGltZVRyYXZlbCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQ2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGVkSWQgPSAoPE5hdmlnYXRpb25DYW5jZWw+ZXZlbnQpLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCAmJiAoPE5hdmlnYXRpb25FbmQ+ZXZlbnQpLmlkICE9PSBjYW5jZWxsZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICg8U3RvcmU8YW55Pj50aGlzLnN0b3JlLnNlbGVjdChbJ3JvdXRlciddKSkudXBkYXRlKHN0YXRlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU3RyYXRlZ3kuc2V0KHN0YXRlLCAndXJsJywgZXZlbnQudXJsKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=