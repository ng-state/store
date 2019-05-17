/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { map, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
export class Select {
    /**
     * @param {?} path
     */
    constructor(path) {
        /** @type {?} */
        let mapped$;
        /** @type {?} */
        const dataStrategy = ServiceLocator.injector.get(DataStrategy);
        if (typeof path === 'object') {
            mapped$ = ((/** @type {?} */ (this))).pipe(map((/**
             * @param {?} state
             * @return {?}
             */
            (state) => dataStrategy.getIn(state, path))), takeWhile((/**
             * @param {?} state
             * @return {?}
             */
            (state) => state !== undefined)), distinctUntilChanged());
        }
        else {
            throw new TypeError(`Unexpected type ${typeof path} in select operator,`
                + ` expected 'object' or 'function'`);
        }
        return mapped$;
    }
}
/**
 * @record
 */
export function SelectSignature() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL3N0b3JlL3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE1BQU0sT0FBTyxNQUFNOzs7O0lBQ2YsWUFBWSxJQUFTOztZQUNiLE9BQU87O2NBRUwsWUFBWSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztRQUU5RCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUMxQixPQUFPLEdBQUcsQ0FBQyxtQkFBSyxJQUFJLEVBQUEsQ0FBQyxDQUFDLElBQUksQ0FDdEIsR0FBRzs7OztZQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBQyxFQUNwRCxTQUFTOzs7O1lBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUMsRUFDOUMsb0JBQW9CLEVBQUUsQ0FDekIsQ0FBQztTQUNMO2FBQ0k7WUFDRCxNQUFNLElBQUksU0FBUyxDQUFDLG1CQUFtQixPQUFPLElBQUksc0JBQXNCO2tCQUNsRSxrQ0FBa0MsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKOzs7O0FBRUQscUNBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlV2hpbGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHBhdGg6IGFueSkge1xyXG4gICAgICAgIGxldCBtYXBwZWQkO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhU3RyYXRlZ3kgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoRGF0YVN0cmF0ZWd5KTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBtYXBwZWQkID0gKDxhbnk+dGhpcykucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcCgoc3RhdGU6IGFueSkgPT4gZGF0YVN0cmF0ZWd5LmdldEluKHN0YXRlLCBwYXRoKSksXHJcbiAgICAgICAgICAgICAgICB0YWtlV2hpbGUoKHN0YXRlOiBhbnkpID0+IHN0YXRlICE9PSB1bmRlZmluZWQpLFxyXG4gICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5leHBlY3RlZCB0eXBlICR7dHlwZW9mIHBhdGh9IGluIHNlbGVjdCBvcGVyYXRvcixgXHJcbiAgICAgICAgICAgICAgICArIGAgZXhwZWN0ZWQgJ29iamVjdCcgb3IgJ2Z1bmN0aW9uJ2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcHBlZCQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0U2lnbmF0dXJlIHtcclxuICAocGF0aDogYW55W10pOiBTdG9yZTxhbnk+O1xyXG59Il19