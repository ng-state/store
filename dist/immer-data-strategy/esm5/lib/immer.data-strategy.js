/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DataStrategy } from '@ng-state/data-strategy';
import { produce, setAutoFreeze } from 'immer';
var ImmerDataStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ImmerDataStrategy, _super);
    function ImmerDataStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} store
     * @param {?} isProd
     * @return {?}
     */
    ImmerDataStrategy.prototype.init = /**
     * @param {?} store
     * @param {?} isProd
     * @return {?}
     */
    function (store, isProd) {
        _super.prototype.init.call(this, store, isProd);
        setAutoFreeze(!isProd);
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tZXIuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW1lci1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbWVyLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFL0M7SUFBdUMsNkNBQVk7SUFBbkQ7O0lBMEpBLENBQUM7Ozs7OztJQXhKRyxnQ0FBSTs7Ozs7SUFBSixVQUFLLEtBQVUsRUFBRSxNQUFlO1FBQzVCLGlCQUFNLElBQUksWUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7O0lBRUQsaUNBQUs7Ozs7O0lBQUwsVUFBTSxLQUFVLEVBQUUsSUFBVztRQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVELCtCQUFHOzs7OztJQUFILFVBQUksS0FBVSxFQUFFLFFBQWdCO1FBQzVCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsa0NBQU07Ozs7SUFBTixVQUFPLElBQVM7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELGdDQUFJOzs7O0lBQUosVUFBSyxJQUFTO1FBQ1YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVELCtCQUFHOzs7Ozs7SUFBSCxVQUFJLEtBQVUsRUFBRSxRQUFnQixFQUFFLElBQVM7UUFDdkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN2QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7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a0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEU7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDL0I7YUFDSjtTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQTFKRCxDQUF1QyxZQUFZLEdBMEpsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuaW1wb3J0IHsgcHJvZHVjZSwgc2V0QXV0b0ZyZWV6ZSB9IGZyb20gJ2ltbWVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbW1lckRhdGFTdHJhdGVneSBleHRlbmRzIERhdGFTdHJhdGVneSB7XHJcblxyXG4gICAgaW5pdChzdG9yZTogYW55LCBpc1Byb2Q6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlci5pbml0KHN0b3JlLCBpc1Byb2QpO1xyXG4gICAgICAgIHNldEF1dG9GcmVlemUoIWlzUHJvZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1cnNvcihzdGF0ZSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KHN0YXRlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGVbcHJvcGVydHldO1xyXG4gICAgfVxyXG5cclxuICAgIGZyb21KUyhkYXRhOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHRvSlMoZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0KHN0YXRlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHN0YXRlW3Byb3BlcnR5XSA9IGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluKHN0YXRlOiBhbnksIHBhdGg6IGFueVtdLCBkYXRhOiBhbnksIGFkZGl0aW9uYWxEYXRhOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IChzOiBhbnksIHA6IGFueSwgZDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXRWYWx1ZShzLCBwLCBkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdGF0ZSB3YXMgbm90IHNldCBpbiAke3BhdGh9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoYWRkaXRpb25hbERhdGEuZnJvbVVwZGF0ZSkge1xyXG4gICAgICAgICAgICBhY3Rpb24oc3RhdGUsIHBhdGgsIGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWNlKHN0YXRlLCAoZHJhZnRTdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oZHJhZnRTdGF0ZSwgcGF0aCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShzdGF0ZTogYW55LCBuZXdTdGF0ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDb25zdHJ1Y3RvckFycmF5KHN0YXRlKSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5wdXNoLmFwcGx5KG5ld1N0YXRlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNDb25zdHJ1Y3Rvck9iamVjdChzdGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5leHRlbmQoc3RhdGUsIG5ld1N0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtzdGF0ZX0gY2Fubm90IGJlIG1lcmdlZCBiZWNhdXNlIHR5cGUgaXMgbm90IHN1cHBvcnRlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShwYXRoOiBhbnlbXSwgYWN0aW9uOiAoc3RhdGU6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHByb2R1Y2UodGhpcy5jdXJyZW50U3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5nZXRDdXJzb3IoZHJhZnRTdGF0ZSwgcGF0aCk7XHJcbiAgICAgICAgICAgIGFjdGlvbihjdXJzb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJvb3RTdG9yZS5uZXh0KG5leHRTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGVDb250cnVjdG9yKG9iajogYW55KSB7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPYmplY3Qob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiAob2JqKSA9PT0gJ29iamVjdCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRSb290KGluaXRpYWxTdGF0ZTogYW55LCBzdGFydGluZ1JvdXRlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHJvdXRlciA9IHRoaXMuZ2V0KHN0YXRlLCAncm91dGVyJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHByb2R1Y2UoaW5pdGlhbFN0YXRlLCAoZHJhZnRTdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KGRyYWZ0U3RhdGUsICdyb3V0ZXInLCByb3V0ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEluKGRyYWZ0U3RhdGUsIFsncm91dGVyJywgJ3VybCddLCBzdGFydGluZ1JvdXRlLCB7IGZyb21VcGRhdGU6IHRydWUgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV4dFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldChwYXRoOiBhbnlbXSwgc3RhdGVUb01lcmdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xyXG5cclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSBwcm9kdWNlKHN0YXRlLCAoZHJhZnRTdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW4oZHJhZnRTdGF0ZSwgcGF0aCwgc3RhdGVUb01lcmdlLCB7IGZyb21VcGRhdGU6IHRydWUgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV4dFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEN1cnNvcihzdGF0ZTogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyB8IGFueVtdKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JCYXNlKHN0YXRlLCBwcm9wZXJ0eVBhdGgsIChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgPyBzdGF0ZVtwcm9wZXJ0aWVzWzBdXVxyXG4gICAgICAgICAgICAgICAgOiBzdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFZhbHVlKHN0YXRlOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nIHwgYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocHJvcGVydHlQYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lcmdlKHN0YXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yQmFzZShzdGF0ZSwgcHJvcGVydHlQYXRoLCAoc3RhdGU6IGFueSwgcHJvcGVydGllczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlW3Byb3BlcnRpZXNbMF1dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3Vyc29yQmFzZShzdGF0ZTogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyB8IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0eVBhdGgpID8gcHJvcGVydHlQYXRoIDogcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0aWVzWzBdKSB8fCB0eXBlb2Ygc3RhdGVbcHJvcGVydGllc1swXV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yQmFzZShzdGF0ZVtwcm9wZXJ0aWVzWzBdXSwgcHJvcGVydGllcy5zbGljZSgxKSwgYWN0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKHN0YXRlLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvbnN0cnVjdG9yT2JqZWN0KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb25zdHJ1Y3RvckFycmF5KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleHRlbmQoc291cmNlOiBhbnksIHRhcmdldDogYW55LCBkZWVwOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29uc3RydWN0b3JBcnJheSh0YXJnZXRbcHJvcF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW3Byb3BdID0gWy4uLnRhcmdldFtwcm9wXV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZXAgJiYgdGhpcy5pc0NvbnN0cnVjdG9yT2JqZWN0KHRhcmdldFtwcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VbcHJvcF0gPSB0aGlzLmV4dGVuZChzb3VyY2VbcHJvcF0sIHRhcmdldFtwcm9wXSwgZGVlcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVtwcm9wXSA9IHRhcmdldFtwcm9wXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuICAgIH1cclxufSJdfQ==