/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DataStrategy } from '@ng-state/data-strategy';
import produce from 'immer';
var ImmerDataStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ImmerDataStrategy, _super);
    function ImmerDataStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    ImmerDataStrategy.prototype.getIn = /**
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    function (state, path) {
        return this.getCursor(state, path);
    };
    /**
     * @param {?} state
     * @param {?} property
     * @return {?}
     */
    ImmerDataStrategy.prototype.get = /**
     * @param {?} state
     * @param {?} property
     * @return {?}
     */
    function (state, property) {
        return state[property];
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ImmerDataStrategy.prototype.fromJS = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return data;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ImmerDataStrategy.prototype.toJS = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return data;
    };
    /**
     * @param {?} state
     * @param {?} property
     * @param {?} data
     * @return {?}
     */
    ImmerDataStrategy.prototype.set = /**
     * @param {?} state
     * @param {?} property
     * @param {?} data
     * @return {?}
     */
    function (state, property, data) {
        state[property] = data;
        return state;
    };
    /**
     * @param {?} state
     * @param {?} path
     * @param {?} data
     * @param {?=} additionalData
     * @return {?}
     */
    ImmerDataStrategy.prototype.setIn = /**
     * @param {?} state
     * @param {?} path
     * @param {?} data
     * @param {?=} additionalData
     * @return {?}
     */
    function (state, path, data, additionalData) {
        var _this = this;
        if (additionalData === void 0) { additionalData = {}; }
        /** @type {?} */
        var action = (/**
         * @param {?} s
         * @param {?} p
         * @param {?} d
         * @return {?}
         */
        function (s, p, d) {
            if (!_this.setValue(s, p, d)) {
                throw new Error("State was not set in " + path);
            }
        });
        if (additionalData.fromUpdate) {
            action(state, path, data);
        }
        else {
            return produce(state, (/**
             * @param {?} draftState
             * @return {?}
             */
            function (draftState) {
                action(draftState, path, data);
            }));
        }
    };
    /**
     * @param {?} state
     * @param {?} newState
     * @return {?}
     */
    ImmerDataStrategy.prototype.merge = /**
     * @param {?} state
     * @param {?} newState
     * @return {?}
     */
    function (state, newState) {
        if (this.isConstructorArray(state)) {
            state.push.apply(newState);
            return;
        }
        if (this.isConstructorObject(state)) {
            this.extend(state, newState);
            return;
        }
        throw new Error(state + " cannot be merged because type is not supported");
    };
    /**
     * @param {?} path
     * @param {?} action
     * @return {?}
     */
    ImmerDataStrategy.prototype.update = /**
     * @param {?} path
     * @param {?} action
     * @return {?}
     */
    function (path, action) {
        var _this = this;
        /** @type {?} */
        var nextState = produce(this.currentState, (/**
         * @param {?} draftState
         * @return {?}
         */
        function (draftState) {
            /** @type {?} */
            var cursor = _this.getCursor(draftState, path);
            action(cursor);
        }));
        this.rootStore.next(nextState);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    ImmerDataStrategy.prototype.overrideContructor = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    ImmerDataStrategy.prototype.isObject = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj !== null && typeof (obj) === 'object';
    };
    /**
     * @param {?} initialState
     * @param {?} startingRoute
     * @return {?}
     */
    ImmerDataStrategy.prototype.resetRoot = /**
     * @param {?} initialState
     * @param {?} startingRoute
     * @return {?}
     */
    function (initialState, startingRoute) {
        var _this = this;
        /** @type {?} */
        var state = this.currentState;
        /** @type {?} */
        var router = this.get(state, 'router');
        /** @type {?} */
        var nextState = produce(initialState, (/**
         * @param {?} draftState
         * @return {?}
         */
        function (draftState) {
            _this.set(draftState, 'router', router);
            _this.setIn(draftState, ['router', 'url'], startingRoute, { fromUpdate: true });
        }));
        this.rootStore.next(nextState);
    };
    /**
     * @param {?} path
     * @param {?} stateToMerge
     * @return {?}
     */
    ImmerDataStrategy.prototype.reset = /**
     * @param {?} path
     * @param {?} stateToMerge
     * @return {?}
     */
    function (path, stateToMerge) {
        var _this = this;
        /** @type {?} */
        var state = this.currentState;
        /** @type {?} */
        var nextState = produce(state, (/**
         * @param {?} draftState
         * @return {?}
         */
        function (draftState) {
            _this.setIn(draftState, path, stateToMerge, { fromUpdate: true });
        }));
        this.rootStore.next(nextState);
    };
    /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @return {?}
     */
    ImmerDataStrategy.prototype.getCursor = /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @return {?}
     */
    function (state, propertyPath) {
        return this.cursorBase(state, propertyPath, (/**
         * @param {?} state
         * @param {?} properties
         * @return {?}
         */
        function (state, properties) {
            return properties.length > 0
                ? state[properties[0]]
                : state;
        }));
    };
    /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @param {?} value
     * @return {?}
     */
    ImmerDataStrategy.prototype.setValue = /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @param {?} value
     * @return {?}
     */
    function (state, propertyPath, value) {
        if (propertyPath.length === 0) {
            this.merge(state, value);
            return true;
        }
        return this.cursorBase(state, propertyPath, (/**
         * @param {?} state
         * @param {?} properties
         * @return {?}
         */
        function (state, properties) {
            state[properties[0]] = value;
            return true;
        }));
    };
    /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @param {?} action
     * @return {?}
     */
    ImmerDataStrategy.prototype.cursorBase = /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @param {?} action
     * @return {?}
     */
    function (state, propertyPath, action) {
        /** @type {?} */
        var properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split('.');
        if (properties.length > 1) {
            if (!state.hasOwnProperty(properties[0]) || typeof state[properties[0]] !== 'object') {
                return null;
            }
            return this.cursorBase(state[properties[0]], properties.slice(1), action);
        }
        else {
            return action(state, properties);
        }
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    ImmerDataStrategy.prototype.isConstructorObject = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj.constructor === Object;
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    ImmerDataStrategy.prototype.isConstructorArray = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj.constructor === Array;
    };
    /**
     * @private
     * @param {?} source
     * @param {?} target
     * @param {?=} deep
     * @return {?}
     */
    ImmerDataStrategy.prototype.extend = /**
     * @private
     * @param {?} source
     * @param {?} target
     * @param {?=} deep
     * @return {?}
     */
    function (source, target, deep) {
        if (deep === void 0) { deep = true; }
        for (var prop in target) {
            if (target.hasOwnProperty(prop)) {
                if (this.isConstructorArray(target[prop])) {
                    source[prop] = tslib_1.__spread(target[prop]);
                }
                else if (deep && this.isConstructorObject(target[prop])) {
                    source[prop] = this.extend(source[prop], target[prop], deep);
                }
                else {
                    source[prop] = target[prop];
                }
            }
        }
        return source;
    };
    return ImmerDataStrategy;
}(DataStrategy));
export { ImmerDataStrategy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tZXIuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW1lci1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbWVyLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCO0lBQXVDLDZDQUFZO0lBQW5EOztJQXFKQSxDQUFDOzs7Ozs7SUFuSkcsaUNBQUs7Ozs7O0lBQUwsVUFBTSxLQUFVLEVBQUUsSUFBVztRQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVELCtCQUFHOzs7OztJQUFILFVBQUksS0FBVSxFQUFFLFFBQWdCO1FBQzVCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsa0NBQU07Ozs7SUFBTixVQUFPLElBQVM7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELGdDQUFJOzs7O0lBQUosVUFBSyxJQUFTO1FBQ1YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVELCtCQUFHOzs7Ozs7SUFBSCxVQUFJLEtBQVUsRUFBRSxRQUFnQixFQUFFLElBQVM7UUFDdkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN2QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7OztJQUVELGlDQUFLOzs7Ozs7O0lBQUwsVUFBTSxLQUFVLEVBQUUsSUFBVyxFQUFFLElBQVMsRUFBRSxjQUF3QjtRQUFsRSxpQkFjQztRQWR5QywrQkFBQSxFQUFBLG1CQUF3Qjs7WUFDeEQsTUFBTTs7Ozs7O1FBQUcsVUFBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLENBQU07WUFD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LENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEU7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDL0I7YUFDSjtTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQXJKRCxDQUF1QyxZQUFZLEdBcUpsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuaW1wb3J0IHByb2R1Y2UgZnJvbSAnaW1tZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEltbWVyRGF0YVN0cmF0ZWd5IGV4dGVuZHMgRGF0YVN0cmF0ZWd5IHtcclxuXHJcbiAgICBnZXRJbihzdGF0ZTogYW55LCBwYXRoOiBhbnlbXSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3Vyc29yKHN0YXRlLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZVtwcm9wZXJ0eV07XHJcbiAgICB9XHJcblxyXG4gICAgZnJvbUpTKGRhdGE6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdG9KUyhkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgc3RhdGVbcHJvcGVydHldID0gZGF0YTtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10sIGRhdGE6IGFueSwgYWRkaXRpb25hbERhdGE6IGFueSA9IHt9KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gKHM6IGFueSwgcDogYW55LCBkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldFZhbHVlKHMsIHAsIGQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YXRlIHdhcyBub3Qgc2V0IGluICR7cGF0aH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChhZGRpdGlvbmFsRGF0YS5mcm9tVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbihzdGF0ZSwgcGF0aCwgZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2R1Y2Uoc3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihkcmFmdFN0YXRlLCBwYXRoLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKHN0YXRlOiBhbnksIG5ld1N0YXRlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0NvbnN0cnVjdG9yQXJyYXkoc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLnB1c2guYXBwbHkobmV3U3RhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0NvbnN0cnVjdG9yT2JqZWN0KHN0YXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmV4dGVuZChzdGF0ZSwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3N0YXRlfSBjYW5ub3QgYmUgbWVyZ2VkIGJlY2F1c2UgdHlwZSBpcyBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhdGg6IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcHJvZHVjZSh0aGlzLmN1cnJlbnRTdGF0ZSwgKGRyYWZ0U3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLmdldEN1cnNvcihkcmFmdFN0YXRlLCBwYXRoKTtcclxuICAgICAgICAgICAgYWN0aW9uKGN1cnNvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV4dFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVycmlkZUNvbnRydWN0b3Iob2JqOiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICBpc09iamVjdChvYmo6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIChvYmopID09PSAnb2JqZWN0JztcclxuICAgIH1cclxuXHJcbiAgICByZXNldFJvb3QoaW5pdGlhbFN0YXRlOiBhbnksIHN0YXJ0aW5nUm91dGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XHJcbiAgICAgICAgY29uc3Qgcm91dGVyID0gdGhpcy5nZXQoc3RhdGUsICdyb3V0ZXInKTtcclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcHJvZHVjZShpbml0aWFsU3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoZHJhZnRTdGF0ZSwgJ3JvdXRlcicsIHJvdXRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW4oZHJhZnRTdGF0ZSwgWydyb3V0ZXInLCAndXJsJ10sIHN0YXJ0aW5nUm91dGUsIHsgZnJvbVVwZGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb290U3RvcmUubmV4dChuZXh0U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KHBhdGg6IGFueVtdLCBzdGF0ZVRvTWVyZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHByb2R1Y2Uoc3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbihkcmFmdFN0YXRlLCBwYXRoLCBzdGF0ZVRvTWVyZ2UsIHsgZnJvbVVwZGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb290U3RvcmUubmV4dChuZXh0U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yKHN0YXRlOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nIHwgYW55W10pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnNvckJhc2Uoc3RhdGUsIHByb3BlcnR5UGF0aCwgKHN0YXRlOiBhbnksIHByb3BlcnRpZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvcGVydGllcy5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICAgICA/IHN0YXRlW3Byb3BlcnRpZXNbMF1dXHJcbiAgICAgICAgICAgICAgICA6IHN0YXRlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VmFsdWUoc3RhdGU6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcgfCBhbnlbXSwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eVBhdGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVyZ2Uoc3RhdGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JCYXNlKHN0YXRlLCBwcm9wZXJ0eVBhdGgsIChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc3RhdGVbcHJvcGVydGllc1swXV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJzb3JCYXNlKHN0YXRlOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nIHwgYW55W10sIGFjdGlvbjogKHN0YXRlOiBhbnksIHByb3BlcnRpZXM6IGFueSkgPT4gYW55KSB7XHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBBcnJheS5pc0FycmF5KHByb3BlcnR5UGF0aCkgPyBwcm9wZXJ0eVBhdGggOiBwcm9wZXJ0eVBhdGguc3BsaXQoJy4nKTtcclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBpZiAoIXN0YXRlLmhhc093blByb3BlcnR5KHByb3BlcnRpZXNbMF0pIHx8IHR5cGVvZiBzdGF0ZVtwcm9wZXJ0aWVzWzBdXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JCYXNlKHN0YXRlW3Byb3BlcnRpZXNbMF1dLCBwcm9wZXJ0aWVzLnNsaWNlKDEpLCBhY3Rpb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24oc3RhdGUsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ29uc3RydWN0b3JPYmplY3Qob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvbnN0cnVjdG9yQXJyYXkob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4dGVuZChzb3VyY2U6IGFueSwgdGFyZ2V0OiBhbnksIGRlZXA6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0YXJnZXQpIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb25zdHJ1Y3RvckFycmF5KHRhcmdldFtwcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VbcHJvcF0gPSBbLi4udGFyZ2V0W3Byb3BdXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVlcCAmJiB0aGlzLmlzQ29uc3RydWN0b3JPYmplY3QodGFyZ2V0W3Byb3BdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVtwcm9wXSA9IHRoaXMuZXh0ZW5kKHNvdXJjZVtwcm9wXSwgdGFyZ2V0W3Byb3BdLCBkZWVwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW3Byb3BdID0gdGFyZ2V0W3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG4gICAgfVxyXG59Il19