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
     * @param {?} state
     * @param {?} property
     * @return {?}
     */
    ImmutableJsDataStrategy.prototype.get = /**
     * @param {?} state
     * @param {?} property
     * @return {?}
     */
    function (state, property) {
        return state.get(property);
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
        var router = this.get(state, 'router');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmxlanMuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW11dGFibGVqcy1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbXV0YWJsZWpzLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQWMsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlELE9BQU8sS0FBSyxPQUFPLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQ7SUFBNkMsbURBQVk7SUFBekQ7O0lBc0ZBLENBQUM7Ozs7OztJQXBGRyx1Q0FBSzs7Ozs7SUFBTCxVQUFNLEtBQW9CLEVBQUUsSUFBVztRQUNuQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBRUQscUNBQUc7Ozs7O0lBQUgsVUFBSSxLQUFVLEVBQUUsUUFBZ0I7UUFDNUIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsd0NBQU07Ozs7SUFBTixVQUFPLElBQVM7UUFDWixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELHNDQUFJOzs7O0lBQUosVUFBSyxJQUEwQjtRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7O0lBRUQscUNBQUc7Ozs7OztJQUFILFVBQUksS0FBb0IsRUFBRSxRQUFnQixFQUFFLElBQVM7UUFDakQsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7O0lBRUQsdUNBQUs7Ozs7OztJQUFMLFVBQU0sS0FBb0IsRUFBRSxJQUFX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QUssUUFBUTtlQUN6QixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2VBQ2YsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQUF0RkQsQ0FBNkMsWUFBWSxHQXNGeEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcbmltcG9ydCB7IE1hcCwgZnJvbUpTLCBDb2xsZWN0aW9uLCBJdGVyYWJsZSB9IGZyb20gJ2ltbXV0YWJsZSc7XHJcbmltcG9ydCAqIGFzIF9DdXJzb3IgZnJvbSAnaW1tdXRhYmxlL2NvbnRyaWIvY3Vyc29yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbW11dGFibGVKc0RhdGFTdHJhdGVneSBleHRlbmRzIERhdGFTdHJhdGVneSB7XHJcblxyXG4gICAgZ2V0SW4oc3RhdGU6IE1hcDxhbnksIGFueT4sIHBhdGg6IGFueVtdKTogQ29sbGVjdGlvbjxhbnksIGFueT4ge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5nZXRJbihwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5nZXQocHJvcGVydHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZyb21KUyhkYXRhOiBhbnkpOiBDb2xsZWN0aW9uPGFueSwgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGZyb21KUyhkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICB0b0pTKGRhdGE6IENvbGxlY3Rpb248YW55LCBhbnk+KSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEudG9KUygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldChzdGF0ZTogTWFwPGFueSwgYW55PiwgcHJvcGVydHk6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLnNldChwcm9wZXJ0eSwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW4oc3RhdGU6IE1hcDxhbnksIGFueT4sIHBhdGg6IGFueVtdLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGUuc2V0SW4ocGF0aCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPYmplY3Qoc3RhdGU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBNYXAuaXNNYXAoc3RhdGUpIHx8IEl0ZXJhYmxlLmlzSXRlcmFibGUoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKHN0YXRlOiBhbnksIG5ld1N0YXRlOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGUubWVyZ2UobmV3U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShwYXRoOiBhbnlbXSwgYWN0aW9uOiAoc3RhdGU6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnNvciA9IF9DdXJzb3IuZnJvbSh0aGlzLmN1cnJlbnRTdGF0ZSwgcGF0aCwgKG5ld0RhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb290U3RvcmUubmV4dChuZXdEYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY3Vyc29yLndpdGhNdXRhdGlvbnMoKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWN0aW9uKHN0YXRlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVycmlkZUNvbnRydWN0b3Iob2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc05vdEltbXV0YWJsZU9iamVjdChvYmopKSB7IC8vIGZyb20gSW1tdXRhYmxlSnMgNCBicmVha2luZyBjaGFuZ2UgaXNJdGVyYWJsZSA9PiBpc0NvbGxlY3Rpb25cclxuICAgICAgICAgICAgaWYgKG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVycmlkZUNvbnRydWN0b3Iob2JqW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5fX3Byb3RvX18uY29uc3RydWN0b3IgPSBPYmplY3Q7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVycmlkZUNvbnRydWN0b3Iob2JqW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0Um9vdChpbml0aWFsU3RhdGU6IGFueSwgc3RhcnRpbmdSb3V0ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm91dGVyID0gdGhpcy5nZXQoc3RhdGUsICdyb3V0ZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoW10sIChzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLm1lcmdlKGluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBzdGF0ZS5zZXQoJ3JvdXRlcicsIHJvdXRlcik7XHJcbiAgICAgICAgICAgIHN0YXRlLnNldEluKFsncm91dGVyJywgJ3VybCddLCBzdGFydGluZ1JvdXRlLCB7IGZyb21VcGRhdGU6IHRydWUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQocGF0aDogYW55W10sIHN0YXRlVG9NZXJnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUocGF0aCwgKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc3RhdGUuY2xlYXIoKTtcclxuICAgICAgICAgICAgc3RhdGUubWVyZ2Uoc3RhdGVUb01lcmdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTm90SW1tdXRhYmxlT2JqZWN0KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAhPT0gbnVsbFxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgKG9iaikgPT09ICdvYmplY3QnXHJcbiAgICAgICAgICAgICYmICFNYXAuaXNNYXAob2JqKVxyXG4gICAgICAgICAgICAmJiAhSXRlcmFibGUuaXNJdGVyYWJsZShvYmopO1xyXG4gICAgfVxyXG59Il19