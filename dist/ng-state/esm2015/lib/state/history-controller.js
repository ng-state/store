/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
export class HistoryController {
    /**
     * @param {?} store
     * @param {?} history
     * @param {?} debugerInfo
     * @param {?} router
     * @param {?} dataStrategy
     */
    constructor(store, history, debugerInfo, router, dataStrategy) {
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
        (debugHistoryItem) => {
            this.debugerInfo.turnOnTimeTravel();
            /** @type {?} */
            const targetRoute = this.dataStrategy.getIn(debugHistoryItem.state, ['router', 'url']);
            if (targetRoute && this.router.url !== targetRoute) {
                this.router.navigateByUrl(targetRoute).then((/**
                 * @param {?} _
                 * @return {?}
                 */
                _ => {
                    this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
                }));
            }
            else {
                this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
            }
            this.onHistoryChange
                .pipe(take(1))
                .subscribe((/**
             * @param {?} _
             * @return {?}
             */
            _ => {
                this.debugerInfo.turnOffTimeTravel();
            }));
        });
    }
    /**
     * @return {?}
     */
    init() {
        this.store.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            /** @type {?} */
            const isIntialState = !this.history.currentState;
            this.history.setCurrentState(state);
            this.debugerInfo.onStateChange(state, isIntialState);
            this.onHistoryChange.next(true);
        }));
        this.debugerInfo.onApplyHistory.subscribe(this.applyHistory);
    }
    /**
     * @private
     * @param {?} targetState
     * @param {?} statePath
     * @return {?}
     */
    applyState(targetState, statePath) {
        if (statePath.length === 0) {
            this.store.next(targetState);
        }
        else {
            this.store
                .update((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                this.dataStrategy.setIn(state, statePath, targetState, { fromUpdate: true });
            }));
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL3N0YXRlL2hpc3RvcnktY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEMsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7SUFHMUIsWUFBb0IsS0FBaUIsRUFBVSxPQUFxQixFQUFVLFdBQXNCLEVBQVUsTUFBYyxFQUFVLFlBQTBCO1FBQTVJLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVc7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGeEosb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBaUJoQyxpQkFBWTs7OztRQUFHLENBQUMsZ0JBQWtDLEVBQUUsRUFBRTtZQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7O2tCQUU5QixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RGLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLFdBQVcsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRTtvQkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hFLENBQUMsRUFBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDdkU7WUFFRCxJQUFJLENBQUMsZUFBZTtpQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVM7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRTtnQkFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekMsQ0FBQyxFQUFDLENBQUM7UUFDWCxDQUFDLEVBQUE7SUEvQkQsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTs7a0JBQ25CLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTtZQUVoRCxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7Ozs7SUFxQk8sVUFBVSxDQUFDLFdBQWdCLEVBQUUsU0FBbUI7UUFDcEQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUs7aUJBQ0wsTUFBTTs7OztZQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDakYsQ0FBQyxFQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7Q0FDSjs7Ozs7O0lBOUNHLDRDQUF3Qzs7Ozs7SUFpQnhDLHlDQWlCQzs7Ozs7SUFoQ1csa0NBQXlCOzs7OztJQUFFLG9DQUE2Qjs7Ozs7SUFBRSx3Q0FBOEI7Ozs7O0lBQUUsbUNBQXNCOzs7OztJQUFFLHlDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vc3RvcmUvc3RvcmUnO1xyXG5pbXBvcnQgeyBTdGF0ZUhpc3RvcnkgfSBmcm9tICcuL2hpc3RvcnknO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERlYnVnSW5mbywgRGVidWdIaXN0b3J5SXRlbSB9IGZyb20gJy4uL2RlYnVnL2RlYnVnLWluZm8nO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSGlzdG9yeUNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBvbkhpc3RvcnlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4sIHByaXZhdGUgaGlzdG9yeTogU3RhdGVIaXN0b3J5LCBwcml2YXRlIGRlYnVnZXJJbmZvOiBEZWJ1Z0luZm8sIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3kpIHtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmUuc3Vic2NyaWJlKHN0YXRlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNJbnRpYWxTdGF0ZSA9ICF0aGlzLmhpc3RvcnkuY3VycmVudFN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldEN1cnJlbnRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVidWdlckluZm8ub25TdGF0ZUNoYW5nZShzdGF0ZSwgaXNJbnRpYWxTdGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25IaXN0b3J5Q2hhbmdlLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVidWdlckluZm8ub25BcHBseUhpc3Rvcnkuc3Vic2NyaWJlKHRoaXMuYXBwbHlIaXN0b3J5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFwcGx5SGlzdG9yeSA9IChkZWJ1Z0hpc3RvcnlJdGVtOiBEZWJ1Z0hpc3RvcnlJdGVtKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kZWJ1Z2VySW5mby50dXJuT25UaW1lVHJhdmVsKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldFJvdXRlID0gdGhpcy5kYXRhU3RyYXRlZ3kuZ2V0SW4oZGVidWdIaXN0b3J5SXRlbS5zdGF0ZSwgWydyb3V0ZXInLCAndXJsJ10pO1xyXG4gICAgICAgIGlmICh0YXJnZXRSb3V0ZSAmJiB0aGlzLnJvdXRlci51cmwgIT09IHRhcmdldFJvdXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGFyZ2V0Um91dGUpLnRoZW4oXyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5U3RhdGUoZGVidWdIaXN0b3J5SXRlbS5zdGF0ZSwgZGVidWdIaXN0b3J5SXRlbS5zdGF0ZVBhdGgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3RhdGUoZGVidWdIaXN0b3J5SXRlbS5zdGF0ZSwgZGVidWdIaXN0b3J5SXRlbS5zdGF0ZVBhdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbkhpc3RvcnlDaGFuZ2VcclxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShfID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVidWdlckluZm8udHVybk9mZlRpbWVUcmF2ZWwoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhcHBseVN0YXRlKHRhcmdldFN0YXRlOiBhbnksIHN0YXRlUGF0aDogc3RyaW5nW10pIHtcclxuICAgICAgICBpZiAoc3RhdGVQYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3JlLm5leHQodGFyZ2V0U3RhdGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVcclxuICAgICAgICAgICAgICAgIC51cGRhdGUoKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTdHJhdGVneS5zZXRJbihzdGF0ZSwgc3RhdGVQYXRoLCB0YXJnZXRTdGF0ZSwgeyBmcm9tVXBkYXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19