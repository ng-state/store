/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
var HistoryController = /** @class */ (function () {
    function HistoryController(store, history, debugerInfo, router, dataStrategy) {
        var _this = this;
        this.store = store;
        this.history = history;
        this.debugerInfo = debugerInfo;
        this.router = router;
        this.dataStrategy = dataStrategy;
        this.onHistoryChange = new Subject();
        this.applyHistory = (/**
         * @param {?} debugHistoryItem
         * @return {?}
         */
        function (debugHistoryItem) {
            _this.debugerInfo.turnOnTimeTravel();
            /** @type {?} */
            var targetRoute = _this.dataStrategy.getIn(debugHistoryItem.state, ['router', 'url']);
            if (targetRoute && _this.router.url !== targetRoute) {
                _this.router.navigateByUrl(targetRoute).then((/**
                 * @param {?} _
                 * @return {?}
                 */
                function (_) {
                    _this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
                }));
            }
            else {
                _this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
            }
            _this.onHistoryChange
                .pipe(take(1))
                .subscribe((/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
                _this.debugerInfo.turnOffTimeTravel();
            }));
        });
    }
    /**
     * @return {?}
     */
    HistoryController.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.store.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            var isIntialState = !_this.history.currentState;
            _this.history.setCurrentState(state);
            _this.debugerInfo.onStateChange(state, isIntialState);
            _this.onHistoryChange.next(true);
        }));
        this.debugerInfo.onApplyHistory.subscribe(this.applyHistory);
    };
    /**
     * @private
     * @param {?} targetState
     * @param {?} statePath
     * @return {?}
     */
    HistoryController.prototype.applyState = /**
     * @private
     * @param {?} targetState
     * @param {?} statePath
     * @return {?}
     */
    function (targetState, statePath) {
        var _this = this;
        if (statePath.length === 0) {
            this.store.next(targetState);
        }
        else {
            this.store
                .update((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                _this.dataStrategy.setIn(state, statePath, targetState, { fromUpdate: true });
            }));
        }
    };
    return HistoryController;
}());
export { HistoryController };
if (false) {
    /**
     * @type {?}
     * @private
     */
    HistoryController.prototype.onHistoryChange;
    /**
     * @type {?}
     * @private
     */
    HistoryController.prototype.applyHistory;
    /**
     * @type {?}
     * @private
     */
    HistoryController.prototype.store;
    /**
     * @type {?}
     * @private
     */
    HistoryController.prototype.history;
    /**
     * @type {?}
     * @private
     */
    HistoryController.prototype.debugerInfo;
    /**
     * @type {?}
     * @private
     */
    HistoryController.prototype.router;
    /**
     * @type {?}
     * @private
     */
    HistoryController.prototype.dataStrategy;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL3N0YXRlL2hpc3RvcnktY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEM7SUFHSSwyQkFBb0IsS0FBaUIsRUFBVSxPQUFxQixFQUFVLFdBQXNCLEVBQVUsTUFBYyxFQUFVLFlBQTBCO1FBQWhLLGlCQUNDO1FBRG1CLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVc7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGeEosb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBaUJoQyxpQkFBWTs7OztRQUFHLFVBQUMsZ0JBQWtDO1lBQ3RELEtBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7Z0JBRTlCLFdBQVcsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEYsSUFBSSxXQUFXLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssV0FBVyxFQUFFO2dCQUNoRCxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJOzs7O2dCQUFDLFVBQUEsQ0FBQztvQkFDekMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hFLENBQUMsRUFBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDdkU7WUFFRCxLQUFJLENBQUMsZUFBZTtpQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVM7Ozs7WUFBQyxVQUFBLENBQUM7Z0JBQ1IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pDLENBQUMsRUFBQyxDQUFDO1FBQ1gsQ0FBQyxFQUFBO0lBL0JELENBQUM7Ozs7SUFFRCxnQ0FBSTs7O0lBQUo7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsS0FBSzs7Z0JBQ2hCLGFBQWEsR0FBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTtZQUVoRCxLQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDckQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7Ozs7SUFxQk8sc0NBQVU7Ozs7OztJQUFsQixVQUFtQixXQUFnQixFQUFFLFNBQW1CO1FBQXhELGlCQVNDO1FBUkcsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUs7aUJBQ0wsTUFBTTs7OztZQUFDLFVBQUMsS0FBVTtnQkFDZixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2pGLENBQUMsRUFBQyxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDOzs7Ozs7O0lBOUNHLDRDQUF3Qzs7Ozs7SUFpQnhDLHlDQWlCQzs7Ozs7SUFoQ1csa0NBQXlCOzs7OztJQUFFLG9DQUE2Qjs7Ozs7SUFBRSx3Q0FBOEI7Ozs7O0lBQUUsbUNBQXNCOzs7OztJQUFFLHlDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vc3RvcmUvc3RvcmUnO1xyXG5pbXBvcnQgeyBTdGF0ZUhpc3RvcnkgfSBmcm9tICcuL2hpc3RvcnknO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERlYnVnSW5mbywgRGVidWdIaXN0b3J5SXRlbSB9IGZyb20gJy4uL2RlYnVnL2RlYnVnLWluZm8nO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSGlzdG9yeUNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBvbkhpc3RvcnlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4sIHByaXZhdGUgaGlzdG9yeTogU3RhdGVIaXN0b3J5LCBwcml2YXRlIGRlYnVnZXJJbmZvOiBEZWJ1Z0luZm8sIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3kpIHtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmUuc3Vic2NyaWJlKHN0YXRlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNJbnRpYWxTdGF0ZSA9ICF0aGlzLmhpc3RvcnkuY3VycmVudFN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldEN1cnJlbnRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVidWdlckluZm8ub25TdGF0ZUNoYW5nZShzdGF0ZSwgaXNJbnRpYWxTdGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25IaXN0b3J5Q2hhbmdlLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVidWdlckluZm8ub25BcHBseUhpc3Rvcnkuc3Vic2NyaWJlKHRoaXMuYXBwbHlIaXN0b3J5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFwcGx5SGlzdG9yeSA9IChkZWJ1Z0hpc3RvcnlJdGVtOiBEZWJ1Z0hpc3RvcnlJdGVtKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kZWJ1Z2VySW5mby50dXJuT25UaW1lVHJhdmVsKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldFJvdXRlID0gdGhpcy5kYXRhU3RyYXRlZ3kuZ2V0SW4oZGVidWdIaXN0b3J5SXRlbS5zdGF0ZSwgWydyb3V0ZXInLCAndXJsJ10pO1xyXG4gICAgICAgIGlmICh0YXJnZXRSb3V0ZSAmJiB0aGlzLnJvdXRlci51cmwgIT09IHRhcmdldFJvdXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGFyZ2V0Um91dGUpLnRoZW4oXyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5U3RhdGUoZGVidWdIaXN0b3J5SXRlbS5zdGF0ZSwgZGVidWdIaXN0b3J5SXRlbS5zdGF0ZVBhdGgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3RhdGUoZGVidWdIaXN0b3J5SXRlbS5zdGF0ZSwgZGVidWdIaXN0b3J5SXRlbS5zdGF0ZVBhdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbkhpc3RvcnlDaGFuZ2VcclxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShfID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVidWdlckluZm8udHVybk9mZlRpbWVUcmF2ZWwoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhcHBseVN0YXRlKHRhcmdldFN0YXRlOiBhbnksIHN0YXRlUGF0aDogc3RyaW5nW10pIHtcclxuICAgICAgICBpZiAoc3RhdGVQYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JlLm5leHQodGFyZ2V0U3RhdGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVcclxuICAgICAgICAgICAgICAgIC51cGRhdGUoKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTdHJhdGVneS5zZXRJbihzdGF0ZSwgc3RhdGVQYXRoLCB0YXJnZXRTdGF0ZSwgeyBmcm9tVXBkYXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19