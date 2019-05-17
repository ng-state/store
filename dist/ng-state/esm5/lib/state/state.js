/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BehaviorSubject } from 'rxjs';
/**
 * @template T
 */
var /**
 * @template T
 */
State = /** @class */ (function (_super) {
    tslib_1.__extends(State, _super);
    function State(initialState, dataStrategy) {
        var _this = this;
        dataStrategy.overrideContructor(initialState);
        _this = _super.call(this, dataStrategy.fromJS(initialState)) || this;
        return _this;
    }
    return State;
}(BehaviorSubject));
/**
 * @template T
 */
export { State };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvc3RhdGUvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBR3ZDOzs7O0lBQThCLGlDQUFrQjtJQUM5QyxlQUFZLFlBQWUsRUFBRSxZQUEwQjtRQUF2RCxpQkFHQztRQUZDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxRQUFBLGtCQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBQzs7SUFDM0MsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBOEIsZUFBZSxHQUs1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGU8VD4gZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8VD4ge1xyXG4gIGNvbnN0cnVjdG9yKGluaXRpYWxTdGF0ZTogVCwgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3kpIHtcclxuICAgIGRhdGFTdHJhdGVneS5vdmVycmlkZUNvbnRydWN0b3IoaW5pdGlhbFN0YXRlKTtcclxuICAgIHN1cGVyKGRhdGFTdHJhdGVneS5mcm9tSlMoaW5pdGlhbFN0YXRlKSk7XHJcbiAgfVxyXG59Il19