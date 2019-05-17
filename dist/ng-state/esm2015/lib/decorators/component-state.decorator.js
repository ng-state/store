/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ServiceLocator } from '../helpers/service-locator';
import { ChangeDetectorRef, Input } from '@angular/core';
import { IS_TEST } from '../ng-state.module';
import { Dispatcher } from '../services/dispatcher';
/**
 * @param {?} stateActions
 * @param {?=} disableOnChangesBeforeActionsCreated
 * @return {?}
 */
export function ComponentState(stateActions, disableOnChangesBeforeActionsCreated = true) {
    return (/**
     * @param {?} target
     * @return {?}
     */
    (target) => {
        /** @type {?} */
        let origInit = target.prototype.ngOnInit || ((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        let origDestroy = target.prototype.ngOnDestroy || ((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        let origOnChanges = target.prototype.ngOnChanges || ((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        const ensureMarkForCheck = (/**
         * @return {?}
         */
        function () {
            if (!this.cd) {
                this.cd = ServiceLocator.injector.get(ChangeDetectorRef);
            }
        });
        target.prototype.ngOnChanges = (/**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (disableOnChangesBeforeActionsCreated && !this.actions) {
                return;
            }
            origOnChanges.apply(this, arguments);
        });
        target.prototype.ngOnInit = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const isTest = ServiceLocator.injector.get(IS_TEST);
            if (isTest) {
                origInit.apply(this, arguments);
                return;
            }
            if (!this.statePath) {
                this.statePath = [];
            }
            if (stateActions) {
                ensureMarkForCheck.apply(this);
                // DOC - CONVETION: only annonymous function allwed for choosing state; Actions can be only named functions;
                /** @type {?} */
                const extractedStateAction = stateActions.name === ''
                    ? stateActions(this)
                    : stateActions;
                /** @type {?} */
                const actions = new extractedStateAction();
                this.statePath = actions.createStore(this.statePath, this.stateIndex);
                this.stateChangeSubscription = ServiceLocator.injector.get(Dispatcher)
                    .subscribe(actions.aId, (/**
                 * @return {?}
                 */
                () => {
                    this.cd.markForCheck();
                }));
                this.actions = actions;
            }
            origInit.apply(this, arguments);
        });
        target.prototype.ngOnDestroy = (/**
         * @return {?}
         */
        function () {
            if (this.actions) {
                this.actions.onDestroy();
            }
            if (this.stateChangeSubscription) {
                this.stateChangeSubscription.unsubscribe();
            }
            origDestroy.apply(this, arguments);
        });
    });
}
/**
 * @template T
 */
export class HasStateActions {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.stateIndex = null;
        this.cd = cd;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { }
    /**
     * @return {?}
     */
    ngOnDestroy() { }
}
HasStateActions.propDecorators = {
    statePath: [{ type: Input }],
    stateIndex: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    HasStateActions.prototype.statePath;
    /** @type {?} */
    HasStateActions.prototype.stateIndex;
    /** @type {?} */
    HasStateActions.prototype.actions;
    /** @type {?} */
    HasStateActions.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXN0YXRlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNvcmF0b3JzL2NvbXBvbmVudC1zdGF0ZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQVcsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7QUFFcEQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxZQUFnQyxFQUFFLG9DQUFvQyxHQUFHLElBQUk7SUFDeEc7Ozs7SUFBTyxDQUFDLE1BQVcsRUFBRSxFQUFFOztZQUVmLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSTs7O1FBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFDOztZQUNuRCxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUk7OztRQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQzs7WUFDekQsYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUFJOzs7UUFBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUM7O2NBRXpELGtCQUFrQjs7O1FBQUc7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQzVEO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXOzs7O1FBQUcsVUFBVSxPQUFPO1lBQzVDLElBQUksb0NBQW9DLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN2RCxPQUFPO2FBQ1Y7WUFFRCxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUEsQ0FBQztRQUVGLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUTs7O1FBQUc7O2tCQUNsQixNQUFNLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ25ELElBQUksTUFBTSxFQUFFO2dCQUNSLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7YUFDdkI7WUFFRCxJQUFJLFlBQVksRUFBRTtnQkFDZCxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7OztzQkFHekIsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLElBQUksS0FBSyxFQUFFO29CQUNqRCxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLFlBQVk7O3NCQUVaLE9BQU8sR0FBRyxJQUFJLG9CQUFvQixFQUFFO2dCQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXRFLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7cUJBQ2pFLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRzs7O2dCQUFFLEdBQUcsRUFBRTtvQkFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQyxFQUFDLENBQUM7Z0JBRVAsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7YUFDMUI7WUFFRCxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUEsQ0FBQztRQUVGLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVzs7O1FBQUc7WUFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDNUI7WUFFRCxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzlDO1lBRUQsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFBLENBQUM7SUFDTixDQUFDLEVBQUM7QUFDTixDQUFDOzs7O0FBRUQsTUFBTSxPQUFPLGVBQWU7Ozs7SUFReEIsWUFBWSxFQUFxQjtRQUx4QixlQUFVLEdBQXFCLElBQUksQ0FBQztRQU16QyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs7O0lBRUQsUUFBUSxLQUFXLENBQUM7Ozs7O0lBQ3BCLFdBQVcsQ0FBQyxPQUFzQixJQUFVLENBQUM7Ozs7SUFDN0MsV0FBVyxLQUFXLENBQUM7Ozt3QkFadEIsS0FBSzt5QkFDTCxLQUFLOzs7O0lBRE4sb0NBQXdCOztJQUN4QixxQ0FBNkM7O0lBRTdDLGtDQUFvQjs7SUFDcEIsNkJBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZUxvY2F0b3IgfSBmcm9tICcuLi9oZWxwZXJzL3NlcnZpY2UtbG9jYXRvcic7XHJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJU19QUk9ELCBJU19URVNUIH0gZnJvbSAnLi4vbmctc3RhdGUubW9kdWxlJztcclxuaW1wb3J0IHsgRGlzcGF0Y2hlciB9IGZyb20gJy4uL3NlcnZpY2VzL2Rpc3BhdGNoZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudFN0YXRlKHN0YXRlQWN0aW9uczogYW55IHwgKChUKSA9PiBhbnkpLCBkaXNhYmxlT25DaGFuZ2VzQmVmb3JlQWN0aW9uc0NyZWF0ZWQgPSB0cnVlKSB7XHJcbiAgICByZXR1cm4gKHRhcmdldDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBvcmlnSW5pdCA9IHRhcmdldC5wcm90b3R5cGUubmdPbkluaXQgfHwgKCgpID0+IHsgfSk7XHJcbiAgICAgICAgbGV0IG9yaWdEZXN0cm95ID0gdGFyZ2V0LnByb3RvdHlwZS5uZ09uRGVzdHJveSB8fCAoKCkgPT4geyB9KTtcclxuICAgICAgICBsZXQgb3JpZ09uQ2hhbmdlcyA9IHRhcmdldC5wcm90b3R5cGUubmdPbkNoYW5nZXMgfHwgKCgpID0+IHsgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVuc3VyZU1hcmtGb3JDaGVjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2QgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXNhYmxlT25DaGFuZ2VzQmVmb3JlQWN0aW9uc0NyZWF0ZWQgJiYgIXRoaXMuYWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvcmlnT25DaGFuZ2VzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaXNUZXN0ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KElTX1RFU1QpO1xyXG4gICAgICAgICAgICBpZiAoaXNUZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnSW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGVQYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlUGF0aCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGVBY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVNYXJrRm9yQ2hlY2suYXBwbHkodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRE9DIC0gQ09OVkVUSU9OOiBvbmx5IGFubm9ueW1vdXMgZnVuY3Rpb24gYWxsd2VkIGZvciBjaG9vc2luZyBzdGF0ZTsgQWN0aW9ucyBjYW4gYmUgb25seSBuYW1lZCBmdW5jdGlvbnM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBleHRyYWN0ZWRTdGF0ZUFjdGlvbiA9IHN0YXRlQWN0aW9ucy5uYW1lID09PSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gc3RhdGVBY3Rpb25zKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBzdGF0ZUFjdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IG5ldyBleHRyYWN0ZWRTdGF0ZUFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZVBhdGggPSBhY3Rpb25zLmNyZWF0ZVN0b3JlKHRoaXMuc3RhdGVQYXRoLCB0aGlzLnN0YXRlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VTdWJzY3JpcHRpb24gPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoRGlzcGF0Y2hlcilcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGFjdGlvbnMuYUlkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3JpZ0luaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0YXJnZXQucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMub25EZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9yaWdEZXN0cm95LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYXNTdGF0ZUFjdGlvbnM8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKSBzdGF0ZVBhdGg6IGFueTtcclxuICAgIEBJbnB1dCgpIHN0YXRlSW5kZXg/OiBzdHJpbmcgfCBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIHJlYWRvbmx5IGFjdGlvbnM6IFQ7XHJcbiAgICByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgdGhpcy5jZCA9IGNkO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQgeyB9XHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7IH1cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQgeyB9XHJcbn0iXX0=