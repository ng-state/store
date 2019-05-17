/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
export class Update {
    /**
     * @param {?} action
     * @param {?=} debugInfo
     */
    constructor(action, debugInfo = {}) {
        /** @type {?} */
        const defaultDebugInfo = { actionType: "UPDATE" /* Update */, statePath: ((/** @type {?} */ (this))).statePath };
        DebugInfo.instance.add(Object.assign({}, defaultDebugInfo, debugInfo));
        /** @type {?} */
        const dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        try {
            dataStrategy.update(((/** @type {?} */ (this))).statePath, action);
        }
        catch (exception) {
            console.error(exception);
        }
    }
}
/**
 * @record
 * @template T
 */
export function UpdateSignature() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL3N0b3JlL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsTUFBTSxPQUFPLE1BQU07Ozs7O0lBQ2YsWUFBWSxNQUE0QixFQUFFLFlBQTJCLEVBQUU7O2NBRTdELGdCQUFnQixHQUFHLEVBQUUsVUFBVSx1QkFBbUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyxtQkFBSyxJQUFJLEVBQUEsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUM1RixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsbUJBQU0sZ0JBQWdCLEVBQUssU0FBUyxFQUFHLENBQUM7O2NBRXhELFlBQVksR0FBRyxtQkFBQSxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBZ0I7UUFFOUUsSUFBSTtZQUNBLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4RDtRQUFDLE9BQU8sU0FBUyxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0NBQ0o7Ozs7O0FBRUQscUNBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25UeXBlLCBEZWJ1Z0luZm9EYXRhIH0gZnJvbSAnLi4vZGVidWcvZGVidWctaW5mby1kYXRhJztcclxuaW1wb3J0IHsgRGVidWdJbmZvIH0gZnJvbSAnLi4vZGVidWcvZGVidWctaW5mbyc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVXBkYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGFjdGlvbjogKHN0YXRlOiBhbnkpID0+IHZvaWQsIGRlYnVnSW5mbzogRGVidWdJbmZvRGF0YSA9IHt9KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZmF1bHREZWJ1Z0luZm8gPSB7IGFjdGlvblR5cGU6IEFjdGlvblR5cGUuVXBkYXRlLCBzdGF0ZVBhdGg6ICg8YW55PnRoaXMpLnN0YXRlUGF0aCB9O1xyXG4gICAgICAgIERlYnVnSW5mby5pbnN0YW5jZS5hZGQoeyAuLi5kZWZhdWx0RGVidWdJbmZvLCAuLi5kZWJ1Z0luZm8gfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGFTdHJhdGVneSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChEYXRhU3RyYXRlZ3kpIGFzIERhdGFTdHJhdGVneTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGF0YVN0cmF0ZWd5LnVwZGF0ZSgodGhpcyBhcyBhbnkpLnN0YXRlUGF0aCwgYWN0aW9uKTtcclxuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVTaWduYXR1cmU8VD4ge1xyXG4gICAgKGFjdGlvbjogKHN0YXRlOiBUKSA9PiB2b2lkLCBkZWJ1Z0luZm8/OiBEZWJ1Z0luZm9EYXRhKTogdm9pZDtcclxufSJdfQ==