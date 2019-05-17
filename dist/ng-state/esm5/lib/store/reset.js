/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { StateKeeper, StateHistory } from '../state/history';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { DebugInfo } from '../debug/debug-info';
import { RouterState } from '../state/router-state';
var Reset = /** @class */ (function () {
    function Reset(debugMessage) {
        if (debugMessage === void 0) { debugMessage = null; }
        /** @type {?} */
        var dataStrategy = ServiceLocator.injector.get(DataStrategy);
        /** @type {?} */
        var restoreState = (/**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            /** @type {?} */
            var path = store.statePath.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return !store.rootPath.includes(item); }));
            /** @type {?} */
            var isRootPath = Array.isArray(path) && path.length === 0;
            if (isRootPath) {
                dataStrategy.resetRoot(StateHistory.initialState, RouterState.startingRoute);
            }
            else {
                /** @type {?} */
                var initialState = !!store.initialState
                    ? store.initialState
                    : dataStrategy.fromJS(StateHistory.initialState);
                initialState = dataStrategy.getIn(initialState, (path));
                dataStrategy.reset(store.statePath, initialState);
            }
            /** @type {?} */
            var defaultDebugInfo = { actionType: "RESET" /* Reset */, statePath: path, debugMessage: debugMessage };
            DebugInfo.instance.add(defaultDebugInfo);
        });
        if (!dataStrategy.isObject(dataStrategy.getIn(StateKeeper.CURRENT_STATE, (((/** @type {?} */ (this))).statePath)))) {
            throw new Error("Cannot resotre state at path: " + ((/** @type {?} */ (this))).statePath + ". Maybe you are trying to restore value rather then state.");
        }
        restoreState(((/** @type {?} */ (this))));
    }
    return Reset;
}());
export { Reset };
/**
 * @record
 */
export function ResetSignature() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBEO0lBQ0ksZUFBWSxZQUEyQjtRQUEzQiw2QkFBQSxFQUFBLG1CQUEyQjs7WUFFN0IsWUFBWSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQzs7WUFFeEQsWUFBWTs7OztRQUFHLFVBQVUsS0FBaUI7O2dCQUN4QyxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUE5QixDQUE4QixFQUFDOztnQkFDbkUsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQzNELElBQUksVUFBVSxFQUFFO2dCQUNaLFlBQVksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDaEY7aUJBQU07O29CQUNDLFlBQVksR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVk7b0JBQ3hDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTtvQkFDcEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFFcEQsWUFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFeEQsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ3JEOztnQkFFSyxnQkFBZ0IsR0FBRyxFQUFFLFVBQVUscUJBQWtCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFO1lBQ3RHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsRyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFpQyxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsU0FBUywrREFBNEQsQ0FBQyxDQUFDO1NBQ3pJO1FBRUQsWUFBWSxDQUFDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQzs7Ozs7QUFFRCxvQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IFN0YXRlS2VlcGVyLCBTdGF0ZUhpc3RvcnkgfSBmcm9tICcuLi9zdGF0ZS9oaXN0b3J5JztcclxuaW1wb3J0IHsgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2RlYnVnL2RlYnVnLWluZm8tZGF0YSc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcbmltcG9ydCB7IERlYnVnSW5mbyB9IGZyb20gJy4uL2RlYnVnL2RlYnVnLWluZm8nO1xyXG5pbXBvcnQgeyBSb3V0ZXJTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL3JvdXRlci1zdGF0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzZXQge1xyXG4gICAgY29uc3RydWN0b3IoZGVidWdNZXNzYWdlOiBzdHJpbmcgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGFTdHJhdGVneSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChEYXRhU3RyYXRlZ3kpO1xyXG5cclxuICAgICAgICBjb25zdCByZXN0b3JlU3RhdGUgPSBmdW5jdGlvbiAoc3RvcmU6IFN0b3JlPGFueT4pIHtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSBzdG9yZS5zdGF0ZVBhdGguZmlsdGVyKGl0ZW0gPT4gIXN0b3JlLnJvb3RQYXRoLmluY2x1ZGVzKGl0ZW0pKTtcclxuICAgICAgICAgICAgY29uc3QgaXNSb290UGF0aCA9IEFycmF5LmlzQXJyYXkocGF0aCkgJiYgcGF0aC5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgIGlmIChpc1Jvb3RQYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhU3RyYXRlZ3kucmVzZXRSb290KFN0YXRlSGlzdG9yeS5pbml0aWFsU3RhdGUsIFJvdXRlclN0YXRlLnN0YXJ0aW5nUm91dGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxTdGF0ZTogYW55ID0gISFzdG9yZS5pbml0aWFsU3RhdGVcclxuICAgICAgICAgICAgICAgICAgICA/IHN0b3JlLmluaXRpYWxTdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIDogZGF0YVN0cmF0ZWd5LmZyb21KUyhTdGF0ZUhpc3RvcnkuaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsU3RhdGUgPSBkYXRhU3RyYXRlZ3kuZ2V0SW4oaW5pdGlhbFN0YXRlLCAocGF0aCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGFTdHJhdGVneS5yZXNldChzdG9yZS5zdGF0ZVBhdGgsIGluaXRpYWxTdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHREZWJ1Z0luZm8gPSB7IGFjdGlvblR5cGU6IEFjdGlvblR5cGUuUmVzZXQsIHN0YXRlUGF0aDogcGF0aCwgZGVidWdNZXNzYWdlOiBkZWJ1Z01lc3NhZ2UgfTtcclxuICAgICAgICAgICAgRGVidWdJbmZvLmluc3RhbmNlLmFkZChkZWZhdWx0RGVidWdJbmZvKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIWRhdGFTdHJhdGVneS5pc09iamVjdChkYXRhU3RyYXRlZ3kuZ2V0SW4oU3RhdGVLZWVwZXIuQ1VSUkVOVF9TVEFURSwgKCh0aGlzIGFzIGFueSkuc3RhdGVQYXRoKSkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlc290cmUgc3RhdGUgYXQgcGF0aDogJHsodGhpcyBhcyBhbnkpLnN0YXRlUGF0aH0uIE1heWJlIHlvdSBhcmUgdHJ5aW5nIHRvIHJlc3RvcmUgdmFsdWUgcmF0aGVyIHRoZW4gc3RhdGUuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0b3JlU3RhdGUoKHRoaXMgYXMgYW55KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVzZXRTaWduYXR1cmUge1xyXG4gICAgPFI+KGRlYnVnTWVzc2FnZT86IHN0cmluZyk6IHZvaWQ7XHJcbn0iXX0=