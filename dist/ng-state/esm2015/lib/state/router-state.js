/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NavigationCancel, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
export class RouterState {
    /**
     * @param {?} store
     * @param {?} router
     * @param {?} debugInfo
     */
    constructor(store, router, debugInfo) {
        this.store = store;
        this.router = router;
        this.debugInfo = debugInfo;
    }
    /**
     * @return {?}
     */
    init() {
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.initRouter();
        this.bindRouter();
    }
    /**
     * @private
     * @return {?}
     */
    initRouter() {
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof RoutesRecognized)), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.store.initialize(['router'], { url: event.url }, false);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    bindRouter() {
        if (!this.router.events) {
            return;
        }
        /** @type {?} */
        let cancelledId = -1;
        this.router.events
            .pipe(filter((/**
         * @return {?}
         */
        () => this.debugInfo && !this.debugInfo.isTimeTravel)))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event instanceof NavigationCancel) {
                cancelledId = ((/** @type {?} */ (event))).id;
            }
            if (event instanceof NavigationEnd && ((/** @type {?} */ (event))).id !== cancelledId) {
                ((/** @type {?} */ (this.store.select(['router'])))).update((/**
                 * @param {?} state
                 * @return {?}
                 */
                state => {
                    this.dataStrategy.set(state, 'url', event.url);
                }));
            }
        }));
    }
}
RouterState.startingRoute = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLXN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL3N0YXRlL3JvdXRlci1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFVLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzVGLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxNQUFNLE9BQU8sV0FBVzs7Ozs7O0lBSXBCLFlBQW9CLEtBQWlCLEVBQVUsTUFBYyxFQUFVLFNBQW9CO1FBQXZFLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUMzRixDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDYixJQUFJLENBQ0QsTUFBTTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLGdCQUFnQixFQUFDLEVBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVjthQUNBLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQXVCLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRSxDQUFDLEVBQUMsQ0FBQztJQUNYLENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNyQixPQUFPO1NBQ1Y7O1lBRUcsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDYixJQUFJLENBQUMsTUFBTTs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFDLENBQUM7YUFDbEUsU0FBUzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakIsSUFBSSxLQUFLLFlBQVksZ0JBQWdCLEVBQUU7Z0JBQ25DLFdBQVcsR0FBRyxDQUFDLG1CQUFrQixLQUFLLEVBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUM5QztZQUNELElBQUksS0FBSyxZQUFZLGFBQWEsSUFBSSxDQUFDLG1CQUFlLEtBQUssRUFBQSxDQUFDLENBQUMsRUFBRSxLQUFLLFdBQVcsRUFBRTtnQkFDN0UsQ0FBQyxtQkFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUEsQ0FBQyxDQUFDLE1BQU07Ozs7Z0JBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDWCxDQUFDOztBQXpDTSx5QkFBYSxHQUFHLEVBQUUsQ0FBQzs7O0lBQTFCLDBCQUEwQjs7Ozs7SUFDMUIsbUNBQW1DOzs7OztJQUV2Qiw0QkFBeUI7Ozs7O0lBQUUsNkJBQXNCOzs7OztJQUFFLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkNhbmNlbCwgTmF2aWdhdGlvbkVuZCwgUm91dGVzUmVjb2duaXplZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vc3RvcmUvc3RvcmUnO1xyXG5pbXBvcnQgeyBEZWJ1Z0luZm8gfSBmcm9tICcuLi9kZWJ1Zy9kZWJ1Zy1pbmZvJztcclxuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4uL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvdXRlclN0YXRlIHtcclxuICAgIHN0YXRpYyBzdGFydGluZ1JvdXRlID0gJyc7XHJcbiAgICBwcml2YXRlIGRhdGFTdHJhdGVneTogRGF0YVN0cmF0ZWd5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4sIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGVidWdJbmZvOiBEZWJ1Z0luZm8pIHtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuZGF0YVN0cmF0ZWd5ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERhdGFTdHJhdGVneSk7XHJcbiAgICAgICAgdGhpcy5pbml0Um91dGVyKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kUm91dGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um91dGVyKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIFJvdXRlc1JlY29nbml6ZWQpLFxyXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBSb3V0ZXNSZWNvZ25pemVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLmluaXRpYWxpemUoWydyb3V0ZXInXSwgeyB1cmw6IGV2ZW50LnVybCB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmluZFJvdXRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucm91dGVyLmV2ZW50cykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2FuY2VsbGVkSWQgPSAtMTtcclxuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHNcclxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuZGVidWdJbmZvICYmICF0aGlzLmRlYnVnSW5mby5pc1RpbWVUcmF2ZWwpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZElkID0gKDxOYXZpZ2F0aW9uQ2FuY2VsPmV2ZW50KS5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgJiYgKDxOYXZpZ2F0aW9uRW5kPmV2ZW50KS5pZCAhPT0gY2FuY2VsbGVkSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAoPFN0b3JlPGFueT4+dGhpcy5zdG9yZS5zZWxlY3QoWydyb3V0ZXInXSkpLnVwZGF0ZShzdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVN0cmF0ZWd5LnNldChzdGF0ZSwgJ3VybCcsIGV2ZW50LnVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19