/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { StateKeeper, StateHistory } from '../state/history';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { DebugInfo } from '../debug/debug-info';
import { RouterState } from '../state/router-state';
export class Reset {
    /**
     * @param {?=} debugMessage
     */
    constructor(debugMessage = null) {
        /** @type {?} */
        const dataStrategy = ServiceLocator.injector.get(DataStrategy);
        /** @type {?} */
        const restoreState = (/**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            /** @type {?} */
            let path = store.statePath.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !store.rootPath.includes(item)));
            /** @type {?} */
            const isRootPath = Array.isArray(path) && path.length === 0;
            if (isRootPath) {
                dataStrategy.resetRoot(StateHistory.initialState, RouterState.startingRoute);
            }
            else {
                /** @type {?} */
                let initialState = !!store.initialState
                    ? store.initialState
                    : dataStrategy.fromJS(StateHistory.initialState);
                initialState = dataStrategy.getIn(initialState, (path));
                dataStrategy.reset(store.statePath, initialState);
            }
            /** @type {?} */
            const defaultDebugInfo = { actionType: "RESET" /* Reset */, statePath: path, debugMessage: debugMessage };
            DebugInfo.instance.add(defaultDebugInfo);
        });
        if (!dataStrategy.isObject(dataStrategy.getIn(StateKeeper.CURRENT_STATE, (((/** @type {?} */ (this))).statePath)))) {
            throw new Error(`Cannot resotre state at path: ${((/** @type {?} */ (this))).statePath}. Maybe you are trying to restore value rather then state.`);
        }
        restoreState(((/** @type {?} */ (this))));
    }
}
/**
 * @record
 */
export function ResetSignature() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBELE1BQU0sT0FBTyxLQUFLOzs7O0lBQ2QsWUFBWSxlQUF1QixJQUFJOztjQUU3QixZQUFZLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDOztjQUV4RCxZQUFZOzs7O1FBQUcsVUFBVSxLQUFpQjs7Z0JBQ3hDLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07Ozs7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUM7O2tCQUNuRSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDM0QsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNoRjtpQkFBTTs7b0JBQ0MsWUFBWSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTtvQkFDeEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO29CQUNwQixDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDO2dCQUVwRCxZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUV4RCxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDckQ7O2tCQUVLLGdCQUFnQixHQUFHLEVBQUUsVUFBVSxxQkFBa0IsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUU7WUFDdEcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2xHLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxTQUFTLDREQUE0RCxDQUFDLENBQUM7U0FDekk7UUFFRCxZQUFZLENBQUMsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNKOzs7O0FBRUQsb0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBTdGF0ZUtlZXBlciwgU3RhdGVIaXN0b3J5IH0gZnJvbSAnLi4vc3RhdGUvaGlzdG9yeSc7XHJcbmltcG9ydCB7IEFjdGlvblR5cGUgfSBmcm9tICcuLi9kZWJ1Zy9kZWJ1Zy1pbmZvLWRhdGEnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4uL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBEZWJ1Z0luZm8gfSBmcm9tICcuLi9kZWJ1Zy9kZWJ1Zy1pbmZvJztcclxuaW1wb3J0IHsgUm91dGVyU3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9yb3V0ZXItc3RhdGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc2V0IHtcclxuICAgIGNvbnN0cnVjdG9yKGRlYnVnTWVzc2FnZTogc3RyaW5nID0gbnVsbCkge1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhU3RyYXRlZ3kgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoRGF0YVN0cmF0ZWd5KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdG9yZVN0YXRlID0gZnVuY3Rpb24gKHN0b3JlOiBTdG9yZTxhbnk+KSB7XHJcbiAgICAgICAgICAgIGxldCBwYXRoID0gc3RvcmUuc3RhdGVQYXRoLmZpbHRlcihpdGVtID0+ICFzdG9yZS5yb290UGF0aC5pbmNsdWRlcyhpdGVtKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzUm9vdFBhdGggPSBBcnJheS5pc0FycmF5KHBhdGgpICYmIHBhdGgubGVuZ3RoID09PSAwO1xyXG4gICAgICAgICAgICBpZiAoaXNSb290UGF0aCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVN0cmF0ZWd5LnJlc2V0Um9vdChTdGF0ZUhpc3RvcnkuaW5pdGlhbFN0YXRlLCBSb3V0ZXJTdGF0ZS5zdGFydGluZ1JvdXRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsU3RhdGU6IGFueSA9ICEhc3RvcmUuaW5pdGlhbFN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgPyBzdG9yZS5pbml0aWFsU3RhdGVcclxuICAgICAgICAgICAgICAgICAgICA6IGRhdGFTdHJhdGVneS5mcm9tSlMoU3RhdGVIaXN0b3J5LmluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFN0YXRlID0gZGF0YVN0cmF0ZWd5LmdldEluKGluaXRpYWxTdGF0ZSwgKHBhdGgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhU3RyYXRlZ3kucmVzZXQoc3RvcmUuc3RhdGVQYXRoLCBpbml0aWFsU3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0RGVidWdJbmZvID0geyBhY3Rpb25UeXBlOiBBY3Rpb25UeXBlLlJlc2V0LCBzdGF0ZVBhdGg6IHBhdGgsIGRlYnVnTWVzc2FnZTogZGVidWdNZXNzYWdlIH07XHJcbiAgICAgICAgICAgIERlYnVnSW5mby5pbnN0YW5jZS5hZGQoZGVmYXVsdERlYnVnSW5mbyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCFkYXRhU3RyYXRlZ3kuaXNPYmplY3QoZGF0YVN0cmF0ZWd5LmdldEluKFN0YXRlS2VlcGVyLkNVUlJFTlRfU1RBVEUsICgodGhpcyBhcyBhbnkpLnN0YXRlUGF0aCkpKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZXNvdHJlIHN0YXRlIGF0IHBhdGg6ICR7KHRoaXMgYXMgYW55KS5zdGF0ZVBhdGh9LiBNYXliZSB5b3UgYXJlIHRyeWluZyB0byByZXN0b3JlIHZhbHVlIHJhdGhlciB0aGVuIHN0YXRlLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdG9yZVN0YXRlKCh0aGlzIGFzIGFueSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlc2V0U2lnbmF0dXJlIHtcclxuICAgIDxSPihkZWJ1Z01lc3NhZ2U/OiBzdHJpbmcpOiB2b2lkO1xyXG59Il19