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
export function ComponentState(stateActions, disableOnChangesBeforeActionsCreated) {
    if (disableOnChangesBeforeActionsCreated === void 0) { disableOnChangesBeforeActionsCreated = true; }
    return (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var origInit = target.prototype.ngOnInit || ((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var origDestroy = target.prototype.ngOnDestroy || ((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var origOnChanges = target.prototype.ngOnChanges || ((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var ensureMarkForCheck = (/**
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
            var _this = this;
            /** @type {?} */
            var isTest = ServiceLocator.injector.get(IS_TEST);
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
                var extractedStateAction = stateActions.name === ''
                    ? stateActions(this)
                    : stateActions;
                /** @type {?} */
                var actions = new extractedStateAction();
                this.statePath = actions.createStore(this.statePath, this.stateIndex);
                this.stateChangeSubscription = ServiceLocator.injector.get(Dispatcher)
                    .subscribe(actions.aId, (/**
                 * @return {?}
                 */
                function () {
                    _this.cd.markForCheck();
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
var HasStateActions = /** @class */ (function () {
    function HasStateActions(cd) {
        this.stateIndex = null;
        this.cd = cd;
    }
    /**
     * @return {?}
     */
    HasStateActions.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} changes
     * @return {?}
     */
    HasStateActions.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { };
    /**
     * @return {?}
     */
    HasStateActions.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { };
    HasStateActions.propDecorators = {
        statePath: [{ type: Input }],
        stateIndex: [{ type: Input }]
    };
    return HasStateActions;
}());
export { HasStateActions };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXN0YXRlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNvcmF0b3JzL2NvbXBvbmVudC1zdGF0ZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQVcsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7QUFFcEQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxZQUFnQyxFQUFFLG9DQUEyQztJQUEzQyxxREFBQSxFQUFBLDJDQUEyQztJQUN4Rzs7OztJQUFPLFVBQUMsTUFBVzs7WUFFWCxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUk7OztRQUFDLGNBQVEsQ0FBQyxFQUFDOztZQUNuRCxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUk7OztRQUFDLGNBQVEsQ0FBQyxFQUFDOztZQUN6RCxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUk7OztRQUFDLGNBQVEsQ0FBQyxFQUFDOztZQUV6RCxrQkFBa0I7OztRQUFHO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNWLElBQUksQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUM1RDtRQUNMLENBQUMsQ0FBQTtRQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVzs7OztRQUFHLFVBQVUsT0FBTztZQUM1QyxJQUFJLG9DQUFvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDdkQsT0FBTzthQUNWO1lBRUQsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFBLENBQUM7UUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVE7OztRQUFHO1lBQUEsaUJBK0IzQjs7Z0JBOUJTLE1BQU0sR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDbkQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzthQUN2QjtZQUVELElBQUksWUFBWSxFQUFFO2dCQUNkLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O29CQUd6QixvQkFBb0IsR0FBRyxZQUFZLENBQUMsSUFBSSxLQUFLLEVBQUU7b0JBQ2pELENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO29CQUNwQixDQUFDLENBQUMsWUFBWTs7b0JBRVosT0FBTyxHQUFHLElBQUksb0JBQW9CLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFdEUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztxQkFDakUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7Z0JBQUU7b0JBQ3BCLEtBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzNCLENBQUMsRUFBQyxDQUFDO2dCQUVQLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQzFCO1lBRUQsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFBLENBQUM7UUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVc7OztRQUFHO1lBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQzVCO1lBRUQsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM5QztZQUVELFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQSxDQUFDO0lBQ04sQ0FBQyxFQUFDO0FBQ04sQ0FBQzs7OztBQUVEO0lBUUkseUJBQVksRUFBcUI7UUFMeEIsZUFBVSxHQUFxQixJQUFJLENBQUM7UUFNekMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7OztJQUVELGtDQUFROzs7SUFBUixjQUFtQixDQUFDOzs7OztJQUNwQixxQ0FBVzs7OztJQUFYLFVBQVksT0FBc0IsSUFBVSxDQUFDOzs7O0lBQzdDLHFDQUFXOzs7SUFBWCxjQUFzQixDQUFDOzs0QkFadEIsS0FBSzs2QkFDTCxLQUFLOztJQVlWLHNCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZlksZUFBZTs7O0lBRXhCLG9DQUF3Qjs7SUFDeEIscUNBQTZDOztJQUU3QyxrQ0FBb0I7O0lBQ3BCLDZCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVNfUFJPRCwgSVNfVEVTVCB9IGZyb20gJy4uL25nLXN0YXRlLm1vZHVsZSc7XHJcbmltcG9ydCB7IERpc3BhdGNoZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9kaXNwYXRjaGVyJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnRTdGF0ZShzdGF0ZUFjdGlvbnM6IGFueSB8ICgoVCkgPT4gYW55KSwgZGlzYWJsZU9uQ2hhbmdlc0JlZm9yZUFjdGlvbnNDcmVhdGVkID0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuICh0YXJnZXQ6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgb3JpZ0luaXQgPSB0YXJnZXQucHJvdG90eXBlLm5nT25Jbml0IHx8ICgoKSA9PiB7IH0pO1xyXG4gICAgICAgIGxldCBvcmlnRGVzdHJveSA9IHRhcmdldC5wcm90b3R5cGUubmdPbkRlc3Ryb3kgfHwgKCgpID0+IHsgfSk7XHJcbiAgICAgICAgbGV0IG9yaWdPbkNoYW5nZXMgPSB0YXJnZXQucHJvdG90eXBlLm5nT25DaGFuZ2VzIHx8ICgoKSA9PiB7IH0pO1xyXG5cclxuICAgICAgICBjb25zdCBlbnN1cmVNYXJrRm9yQ2hlY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNkID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KENoYW5nZURldGVjdG9yUmVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xyXG4gICAgICAgICAgICBpZiAoZGlzYWJsZU9uQ2hhbmdlc0JlZm9yZUFjdGlvbnNDcmVhdGVkICYmICF0aGlzLmFjdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3JpZ09uQ2hhbmdlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUubmdPbkluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVGVzdCA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChJU19URVNUKTtcclxuICAgICAgICAgICAgaWYgKGlzVGVzdCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ0luaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlUGF0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZVBhdGggPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlQWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgZW5zdXJlTWFya0ZvckNoZWNrLmFwcGx5KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERPQyAtIENPTlZFVElPTjogb25seSBhbm5vbnltb3VzIGZ1bmN0aW9uIGFsbHdlZCBmb3IgY2hvb3Npbmcgc3RhdGU7IEFjdGlvbnMgY2FuIGJlIG9ubHkgbmFtZWQgZnVuY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXh0cmFjdGVkU3RhdGVBY3Rpb24gPSBzdGF0ZUFjdGlvbnMubmFtZSA9PT0gJydcclxuICAgICAgICAgICAgICAgICAgICA/IHN0YXRlQWN0aW9ucyh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIDogc3RhdGVBY3Rpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSBuZXcgZXh0cmFjdGVkU3RhdGVBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVQYXRoID0gYWN0aW9ucy5jcmVhdGVTdG9yZSh0aGlzLnN0YXRlUGF0aCwgdGhpcy5zdGF0ZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlU3Vic2NyaXB0aW9uID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERpc3BhdGNoZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShhY3Rpb25zLmFJZCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9yaWdJbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLm9uRGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZUNoYW5nZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvcmlnRGVzdHJveS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFzU3RhdGVBY3Rpb25zPFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgQElucHV0KCkgc3RhdGVQYXRoOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzdGF0ZUluZGV4Pzogc3RyaW5nIHwgbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgICByZWFkb25seSBhY3Rpb25zOiBUO1xyXG4gICAgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgICAgIHRoaXMuY2QgPSBjZDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHsgfVxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQgeyB9XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgfVxyXG59Il19