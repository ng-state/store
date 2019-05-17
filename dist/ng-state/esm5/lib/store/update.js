/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
var Update = /** @class */ (function () {
    function Update(action, debugInfo) {
        if (debugInfo === void 0) { debugInfo = {}; }
        /** @type {?} */
        var defaultDebugInfo = { actionType: "UPDATE" /* Update */, statePath: ((/** @type {?} */ (this))).statePath };
        DebugInfo.instance.add(tslib_1.__assign({}, defaultDebugInfo, debugInfo));
        /** @type {?} */
        var dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        try {
            dataStrategy.update(((/** @type {?} */ (this))).statePath, action);
        }
        catch (exception) {
            console.error(exception);
        }
    }
    return Update;
}());
export { Update };
/**
 * @record
 * @template T
 */
export function UpdateSignature() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL3N0b3JlL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZEO0lBQ0ksZ0JBQVksTUFBNEIsRUFBRSxTQUE2QjtRQUE3QiwwQkFBQSxFQUFBLGNBQTZCOztZQUU3RCxnQkFBZ0IsR0FBRyxFQUFFLFVBQVUsdUJBQW1CLEVBQUUsU0FBUyxFQUFFLENBQUMsbUJBQUssSUFBSSxFQUFBLENBQUMsQ0FBQyxTQUFTLEVBQUU7UUFDNUYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLHNCQUFNLGdCQUFnQixFQUFLLFNBQVMsRUFBRyxDQUFDOztZQUV4RCxZQUFZLEdBQUcsbUJBQUEsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQWdCO1FBRTlFLElBQUk7WUFDQSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDeEQ7UUFBQyxPQUFPLFNBQVMsRUFBRTtZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQzs7Ozs7O0FBRUQscUNBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25UeXBlLCBEZWJ1Z0luZm9EYXRhIH0gZnJvbSAnLi4vZGVidWcvZGVidWctaW5mby1kYXRhJztcclxuaW1wb3J0IHsgRGVidWdJbmZvIH0gZnJvbSAnLi4vZGVidWcvZGVidWctaW5mbyc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVXBkYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbjogKHN0YXRlOiBhbnkpID0+IHZvaWQsIGRlYnVnSW5mbzogRGVidWdJbmZvRGF0YSA9IHt9KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZmF1bHREZWJ1Z0luZm8gPSB7IGFjdGlvblR5cGU6IEFjdGlvblR5cGUuVXBkYXRlLCBzdGF0ZVBhdGg6ICg8YW55PnRoaXMpLnN0YXRlUGF0aCB9O1xyXG4gICAgICAgIERlYnVnSW5mby5pbnN0YW5jZS5hZGQoeyAuLi5kZWZhdWx0RGVidWdJbmZvLCAuLi5kZWJ1Z0luZm8gfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGFTdHJhdGVneSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChEYXRhU3RyYXRlZ3kpIGFzIERhdGFTdHJhdGVneTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGF0YVN0cmF0ZWd5LnVwZGF0ZSgodGhpcyBhcyBhbnkpLnN0YXRlUGF0aCwgYWN0aW9uKTtcclxuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVTaWduYXR1cmU8VD4ge1xyXG4gICAgKGFjdGlvbjogKHN0YXRlOiBUKSA9PiB2b2lkLCBkZWJ1Z0luZm8/OiBEZWJ1Z0luZm9EYXRhKTogdm9pZDtcclxufSJdfQ==