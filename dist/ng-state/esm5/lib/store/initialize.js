/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { tap, take } from 'rxjs/operators';
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
var Initialize = /** @class */ (function () {
    function Initialize(statePath, initialState) {
        if (initialState === void 0) { initialState = null; }
        /** @type {?} */
        var initialized = '__initialized';
        /** @type {?} */
        var actionWrapper = (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            var dataStrategy = ServiceLocator.injector.get(DataStrategy);
            if (dataStrategy.getIn(state, tslib_1.__spread(statePath, [initialized]))) {
                return;
            }
            dataStrategy.overrideContructor(initialState);
            initialState.constructor = Object;
            initialState = dataStrategy.fromJS(initialState);
            initialState = dataStrategy.set(initialState, initialized, true);
            /** @type {?} */
            var newState;
            try {
                newState = dataStrategy.setIn(state, statePath, initialState);
                this.newStore = ((/** @type {?} */ (this))).select(statePath);
                this.newStore.initialState = initialState;
                this.newStore.rootPath = statePath;
            }
            catch (exception) {
                console.error(exception);
            }
            ((/** @type {?} */ (this))).source.next(newState);
        }).bind(this);
        /** @type {?} */
        var defaultDebugInfo = { actionType: "INITIALIZE" /* Initialize */, statePath: statePath };
        DebugInfo.instance.add(defaultDebugInfo);
        ((/** @type {?} */ (this))).pipe(tap(actionWrapper), take(1)).subscribe();
        return (/** @type {?} */ (this.newStore));
    }
    return Initialize;
}());
export { Initialize };
if (false) {
    /** @type {?} */
    Initialize.prototype.newStore;
}
/**
 * @record
 * @template T
 */
export function InitializeSignature() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbGl6ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9zdG9yZS9pbml0aWFsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RDtJQUdJLG9CQUFZLFNBQWdCLEVBQUUsWUFBd0I7UUFBeEIsNkJBQUEsRUFBQSxtQkFBd0I7O1lBQzVDLFdBQVcsR0FBRyxlQUFlOztZQUUvQixhQUFhLEdBQUc7Ozs7UUFBQSxVQUFVLEtBQVU7O2dCQUM5QixZQUFZLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1lBRTlELElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLG1CQUFNLFNBQVMsR0FBRSxXQUFXLEdBQUUsRUFBRTtnQkFDeEQsT0FBTzthQUNWO1lBRUQsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlDLFlBQVksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBQ2xDLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pELFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7O2dCQUU3RCxRQUFRO1lBRVosSUFBSTtnQkFDQSxRQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsbUJBQUssSUFBSSxFQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQ3RDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDNUI7WUFFRCxDQUFDLG1CQUFLLElBQUksRUFBQSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7WUFFTixnQkFBZ0IsR0FBRyxFQUFFLFVBQVUsK0JBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRTtRQUNwRixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXpDLENBQUMsbUJBQUssSUFBSSxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQ1osR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1YsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVkLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDO0lBQ2hDLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7Ozs7SUF6Q0csOEJBQXFCOzs7Ozs7QUEyQ3pCLHlDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XHJcbmltcG9ydCB7IHRhcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2RlYnVnL2RlYnVnLWluZm8tZGF0YSc7XHJcbmltcG9ydCB7IERlYnVnSW5mbyB9IGZyb20gJy4uL2RlYnVnL2RlYnVnLWluZm8nO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4uL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluaXRpYWxpemUge1xyXG4gICAgbmV3U3RvcmU6IFN0b3JlPGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVQYXRoOiBhbnlbXSwgaW5pdGlhbFN0YXRlOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbGl6ZWQgPSAnX19pbml0aWFsaXplZCc7XHJcblxyXG4gICAgICAgIGxldCBhY3Rpb25XcmFwcGVyID0gZnVuY3Rpb24gKHN0YXRlOiBhbnkpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YVN0cmF0ZWd5ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERhdGFTdHJhdGVneSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YVN0cmF0ZWd5LmdldEluKHN0YXRlLCBbLi4uc3RhdGVQYXRoLCBpbml0aWFsaXplZF0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGFTdHJhdGVneS5vdmVycmlkZUNvbnRydWN0b3IoaW5pdGlhbFN0YXRlKTtcclxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlLmNvbnN0cnVjdG9yID0gT2JqZWN0O1xyXG4gICAgICAgICAgICBpbml0aWFsU3RhdGUgPSBkYXRhU3RyYXRlZ3kuZnJvbUpTKGluaXRpYWxTdGF0ZSk7XHJcbiAgICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IGRhdGFTdHJhdGVneS5zZXQoaW5pdGlhbFN0YXRlLCBpbml0aWFsaXplZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3U3RhdGU7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUgPSBkYXRhU3RyYXRlZ3kuc2V0SW4oc3RhdGUsIHN0YXRlUGF0aCwgaW5pdGlhbFN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3U3RvcmUgPSAoPGFueT50aGlzKS5zZWxlY3Qoc3RhdGVQYXRoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3U3RvcmUuaW5pdGlhbFN0YXRlID0gaW5pdGlhbFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdTdG9yZS5yb290UGF0aCA9IHN0YXRlUGF0aDtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICg8YW55PnRoaXMpLnNvdXJjZS5uZXh0KG5ld1N0YXRlKTtcclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZmF1bHREZWJ1Z0luZm8gPSB7IGFjdGlvblR5cGU6IEFjdGlvblR5cGUuSW5pdGlhbGl6ZSwgc3RhdGVQYXRoOiBzdGF0ZVBhdGggfTtcclxuICAgICAgICBEZWJ1Z0luZm8uaW5zdGFuY2UuYWRkKGRlZmF1bHREZWJ1Z0luZm8pO1xyXG5cclxuICAgICAgICAoPGFueT50aGlzKS5waXBlKFxyXG4gICAgICAgICAgICB0YXAoYWN0aW9uV3JhcHBlciksXHJcbiAgICAgICAgICAgIHRha2UoMSlcclxuICAgICAgICApLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5uZXdTdG9yZSBhcyBhbnk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5pdGlhbGl6ZVNpZ25hdHVyZTxUPiB7XHJcbiAgICA8Uj4oc3RhdGVQYXRoLCBpbml0aWFsU3RhdGU/OiBULCBhZGRUb0hpc3Rvcnk/OiBib29sZWFuKTogU3RvcmU8Uj47XHJcbn0iXX0=