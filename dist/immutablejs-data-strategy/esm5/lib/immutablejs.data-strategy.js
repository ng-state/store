/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DataStrategy } from '@ng-state/data-strategy';
import { Map, fromJS, Iterable } from 'immutable';
import * as _Cursor from 'immutable/contrib/cursor';
var ImmutableJsDataStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ImmutableJsDataStrategy, _super);
    function ImmutableJsDataStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.getIn = /**
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    function (state, path) {
        return state.getIn(path);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.fromJS = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return fromJS(data);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.toJS = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return data.toJS();
    };
    /**
     * @param {?} state
     * @param {?} property
     * @param {?} data
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.set = /**
     * @param {?} state
     * @param {?} property
     * @param {?} data
     * @return {?}
     */
    function (state, property, data) {
        return state.set(property, data);
    };
    /**
     * @param {?} state
     * @param {?} path
     * @param {?} data
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.setIn = /**
     * @param {?} state
     * @param {?} path
     * @param {?} data
     * @return {?}
     */
    function (state, path, data) {
        return state.setIn(path, data);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.isObject = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        return Map.isMap(state) || Iterable.isIterable(state);
    };
    /**
     * @param {?} state
     * @param {?} newState
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.merge = /**
     * @param {?} state
     * @param {?} newState
     * @return {?}
     */
    function (state, newState) {
        return state.merge(newState);
    };
    /**
     * @param {?} path
     * @param {?} action
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.update = /**
     * @param {?} path
     * @param {?} action
     * @return {?}
     */
    function (path, action) {
        var _this = this;
        /** @type {?} */
        var cursor = _Cursor.from(this.currentState, path, (/**
         * @param {?} newData
         * @return {?}
         */
        function (newData) {
            _this.rootStore.next(newData);
        }));
        cursor.withMutations((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            action(state);
        }));
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.overrideContructor = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (this.isNotImmutableObject(obj)) { // from ImmutableJs 4 breaking change isIterable => isCollection
            if (obj.constructor === Array) {
                for (var i = 0; i < obj.length; i++) {
                    this.overrideContructor(obj[i]);
                }
            }
            else {
                obj.__proto__.constructor = Object;
                for (var key in obj) {
                    this.overrideContructor(obj[key]);
                }
            }
        }
    };
    /**
     * @param {?} initialState
     * @param {?} startingRoute
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.resetRoot = /**
     * @param {?} initialState
     * @param {?} startingRoute
     * @return {?}
     */
    function (initialState, startingRoute) {
        /** @type {?} */
        var state = this.currentState;
        /** @type {?} */
        var router = state.get('router');
        this.update([], (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            state.clear();
            state.merge(initialState);
            state.set('router', router);
            state.setIn(['router', 'url'], startingRoute, { fromUpdate: true });
        }));
    };
    /**
     * @param {?} path
     * @param {?} stateToMerge
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.reset = /**
     * @param {?} path
     * @param {?} stateToMerge
     * @return {?}
     */
    function (path, stateToMerge) {
        this.update(path, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            state.clear();
            state.merge(stateToMerge);
        }));
    };
    /**
     * @param {?} objOne
     * @param {?} objTwo
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.equals = /**
     * @param {?} objOne
     * @param {?} objTwo
     * @return {?}
     */
    function (objOne, objTwo) {
        throw new Error('Method not implemented.');
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.isNotImmutableObject = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj !== null
            && typeof (obj) === 'object'
            && !Map.isMap(obj)
            && !Iterable.isIterable(obj);
    };
    return ImmutableJsDataStrategy;
}(DataStrategy));
export { ImmutableJsDataStrategy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmxlanMuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW11dGFibGVqcy1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbXV0YWJsZWpzLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQWMsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlELE9BQU8sS0FBSyxPQUFPLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQ7SUFBNkMsbURBQVk7SUFBekQ7O0lBc0ZBLENBQUM7Ozs7OztJQXBGRyx1Q0FBSzs7Ozs7SUFBTCxVQUFNLEtBQW9CLEVBQUUsSUFBVztRQUNuQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCx3Q0FBTTs7OztJQUFOLFVBQU8sSUFBUztRQUNaLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsc0NBQUk7Ozs7SUFBSixVQUFLLElBQTBCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7SUFFRCxxQ0FBRzs7Ozs7O0lBQUgsVUFBSSxLQUFvQixFQUFFLFFBQWdCLEVBQUUsSUFBUztRQUNqRCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFFRCx1Q0FBSzs7Ozs7O0lBQUwsVUFBTSxLQUFvQixFQUFFLElBQVcsRUFBRSxJQUFTO1FBQzlDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCwwQ0FBUTs7OztJQUFSLFVB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Q0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztlQUNmLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLEFBdEZELENBQTZDLFlBQVksR0FzRnhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBNYXAsIGZyb21KUywgQ29sbGVjdGlvbiwgSXRlcmFibGUgfSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgKiBhcyBfQ3Vyc29yIGZyb20gJ2ltbXV0YWJsZS9jb250cmliL2N1cnNvcic7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1tdXRhYmxlSnNEYXRhU3RyYXRlZ3kgZXh0ZW5kcyBEYXRhU3RyYXRlZ3kge1xyXG5cclxuICAgIGdldEluKHN0YXRlOiBNYXA8YW55LCBhbnk+LCBwYXRoOiBhbnlbXSk6IENvbGxlY3Rpb248YW55LCBhbnk+IHtcclxuICAgICAgICByZXR1cm4gc3RhdGUuZ2V0SW4ocGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnJvbUpTKGRhdGE6IGFueSk6IENvbGxlY3Rpb248YW55LCBhbnk+IHtcclxuICAgICAgICByZXR1cm4gZnJvbUpTKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvSlMoZGF0YTogQ29sbGVjdGlvbjxhbnksIGFueT4pIHtcclxuICAgICAgICByZXR1cm4gZGF0YS50b0pTKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0KHN0YXRlOiBNYXA8YW55LCBhbnk+LCBwcm9wZXJ0eTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGUuc2V0KHByb3BlcnR5LCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbihzdGF0ZTogTWFwPGFueSwgYW55PiwgcGF0aDogYW55W10sIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihwYXRoLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBpc09iamVjdChzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hcC5pc01hcChzdGF0ZSkgfHwgSXRlcmFibGUuaXNJdGVyYWJsZShzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2Uoc3RhdGU6IGFueSwgbmV3U3RhdGU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5tZXJnZShuZXdTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhdGg6IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgY3Vyc29yID0gX0N1cnNvci5mcm9tKHRoaXMuY3VycmVudFN0YXRlLCBwYXRoLCAobmV3RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3RTdG9yZS5uZXh0KG5ld0RhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjdXJzb3Iud2l0aE11dGF0aW9ucygoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhY3Rpb24oc3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJyaWRlQ29udHJ1Y3RvcihvYmo6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTm90SW1tdXRhYmxlT2JqZWN0KG9iaikpIHsgLy8gZnJvbSBJbW11dGFibGVKcyA0IGJyZWFraW5nIGNoYW5nZSBpc0l0ZXJhYmxlID0+IGlzQ29sbGVjdGlvblxyXG4gICAgICAgICAgICBpZiAob2JqLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJyaWRlQ29udHJ1Y3RvcihvYmpbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9fcHJvdG9fXy5jb25zdHJ1Y3RvciA9IE9iamVjdDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJyaWRlQ29udHJ1Y3RvcihvYmpba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRSb290KGluaXRpYWxTdGF0ZTogYW55LCBzdGFydGluZ1JvdXRlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xyXG5cclxuICAgICAgICBjb25zdCByb3V0ZXIgPSBzdGF0ZS5nZXQoJ3JvdXRlcicpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZShbXSwgKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc3RhdGUuY2xlYXIoKTtcclxuICAgICAgICAgICAgc3RhdGUubWVyZ2UoaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHN0YXRlLnNldCgncm91dGVyJywgcm91dGVyKTtcclxuICAgICAgICAgICAgc3RhdGUuc2V0SW4oWydyb3V0ZXInLCAndXJsJ10sIHN0YXJ0aW5nUm91dGUsIHsgZnJvbVVwZGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldChwYXRoOiBhbnlbXSwgc3RhdGVUb01lcmdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZShwYXRoLCAoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBzdGF0ZS5tZXJnZShzdGF0ZVRvTWVyZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGVxdWFscyhvYmpPbmU6IGFueSwgb2JqVHdvOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc05vdEltbXV0YWJsZU9iamVjdChvYmo6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBvYmogIT09IG51bGxcclxuICAgICAgICAgICAgJiYgdHlwZW9mIChvYmopID09PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICAmJiAhTWFwLmlzTWFwKG9iailcclxuICAgICAgICAgICAgJiYgIUl0ZXJhYmxlLmlzSXRlcmFibGUob2JqKTtcclxuICAgIH1cclxufSJdfQ==