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
        var router = state['router'];
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
     * @param {?} objOne
     * @param {?} objTwo
     * @return {?}
     */
    ImmerDataStrategy.prototype.equals = /**
     * @param {?} objOne
     * @param {?} objTwo
     * @return {?}
     */
    function (objOne, objTwo) {
        throw new Error('Method not implemented.');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tZXIuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW1lci1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbWVyLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCO0lBQXVDLDZDQUFZO0lBQW5EOztJQXFKQSxDQUFDOzs7Ozs7SUFuSkcsaUNBQUs7Ozs7O0lBQUwsVUFBTSxLQUFVLEVBQUUsSUFBVztRQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsa0NBQU07Ozs7SUFBTixVQUFPLElBQVM7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELGdDQUFJOzs7O0lBQUosVUFBSyxJQUFTO1FBQ1YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVELCtCQUFHOzs7Ozs7SUFBSCxVQUFJLEtBQVUsRUFBRSxRQUFnQixFQUFFLElBQVM7UUFDdkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN2QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7OztJQUVELGlDQUFLOzs7Ozs7O0lBQUwsVUFBTSxLQUFVLEVBQUUsSUFBVyxFQUFFLElBQVMsRUFBRSxjQUF3QjtRQUFsRSxpQkFjQztRQWR5QywrQkFBQSxFQUFBLG1CQUF3Qjs7WUFDeEQsTUFBTTs7Ozs7O1FBQUcsVUFBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLENBQU07WUFDbEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBd0IsSUFBTSxDQUFDLENBQUM7YUFDbkQ7UUFDTCxDQUFDLENBQUE7UUFFRCxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDM0IsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDN0I7YUFBTTtZQUNILE9BQU8sT0FBTyxDQUFDLEtBQUs7Ozs7WUFBRSxVQUFDLFVBQWU7Z0JBQ2xDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7Ozs7SUFFRCxpQ0FBSzs7Ozs7SUFBTCxVQUFNLEtBQVUsRUFBRSxRQUFhO1FBQzNCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRTdCLE9BQU87U0FDVjtRQUVELE1BQU0sSUFBSSxLQUFLLENBQUksS0FBSyxvREFBaUQsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Ozs7OztJQUVELGtDQUFNOzs7OztJQUFOLFVBQU8sSUFBVyxFQUFFLE1BQTRCO1FBQWhELGlCQU9DOztZQU5TLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVk7Ozs7UUFBRSxVQUFDLFVBQWU7O2dCQUNuRCxNQUFNLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQixDQUFDLEVBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELDhDQUFrQjs7OztJQUFsQixVQUFtQixHQUFRO0lBQzNCLENBQUM7Ozs7O0lBRUQsb0NBQVE7Ozs7SUFBUixVQUFTLEdBQVE7UUFDYixPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsQ0FBQztJQUNyRCxDQUFDOzs7Ozs7SUFFRCxxQ0FBUzs7Ozs7SUFBVCxVQUFVLFlBQWlCLEVBQUUsYUFBcUI7UUFBbEQsaUJBVUM7O1lBVFMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZOztZQUN6QixNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7WUFFeEIsU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZOzs7O1FBQUUsVUFBQyxVQUFlO1lBQ3BELEtBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxhQUFhLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNuRixDQUFDLEVBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7SUFFRCxpQ0FBSzs7Ozs7SUFBTCxVQUFNLElBQVcsRUFBRSxZQUFpQjtRQUFwQyxpQkFRQzs7WUFQUyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVk7O1lBRXpCLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSzs7OztRQUFFLFVBQUMsVUFBZTtZQUM3QyxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckUsQ0FBQyxFQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7O0lBRUQsa0NBQU07Ozs7O0lBQU4sVUFBTyxNQUFXLEVBQUUsTUFBVztRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7OztJQUVPLHFDQUFTOzs7Ozs7SUFBakIsVUFBa0IsS0FBVSxFQUFFLFlBQTRCO1FBQ3RELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsWUFBWTs7Ozs7UUFBRSxVQUFDLEtBQVUsRUFBRSxVQUFlO1lBQ3BFLE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUN4QixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7O0lBRU8sb0NBQVE7Ozs7Ozs7SUFBaEIsVUFBaUIsS0FBVSxFQUFFLFlBQTRCLEVBQUUsS0FBVTtRQUNqRSxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFlBQVk7Ozs7O1FBQUUsVUFBQyxLQUFVLEVBQUUsVUFBZTtZQUNwRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7Ozs7SUFFTyxzQ0FBVTs7Ozs7OztJQUFsQixVQUFtQixLQUFVLEVBQUUsWUFBNEIsRUFBRSxNQUE0Qzs7WUFDakcsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFFckYsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ2xGLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDN0U7YUFBTTtZQUNILE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7Ozs7OztJQUVPLCtDQUFtQjs7Ozs7SUFBM0IsVUFBNEIsR0FBUTtRQUNoQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDO0lBQ3RDLENBQUM7Ozs7OztJQUVPLDhDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsR0FBUTtRQUMvQixPQUFPLEdBQUcsQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7O0lBRU8sa0NBQU07Ozs7Ozs7SUFBZCxVQUFlLE1BQVcsRUFBRSxNQUFXLEVBQUUsSUFBb0I7UUFBcEIscUJBQUEsRUFBQSxXQUFvQjtRQUN6RCxLQUFLLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUNyQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNwQztxQkFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hFO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQy9CO2FBQ0o7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFySkQsQ0FBdUMsWUFBWSxHQXFKbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcbmltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbW1lckRhdGFTdHJhdGVneSBleHRlbmRzIERhdGFTdHJhdGVneSB7XHJcblxyXG4gICAgZ2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1cnNvcihzdGF0ZSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnJvbUpTKGRhdGE6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdG9KUyhkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgc3RhdGVbcHJvcGVydHldID0gZGF0YTtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10sIGRhdGE6IGFueSwgYWRkaXRpb25hbERhdGE6IGFueSA9IHt9KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gKHM6IGFueSwgcDogYW55LCBkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldFZhbHVlKHMsIHAsIGQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YXRlIHdhcyBub3Qgc2V0IGluICR7cGF0aH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChhZGRpdGlvbmFsRGF0YS5mcm9tVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbihzdGF0ZSwgcGF0aCwgZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2R1Y2Uoc3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihkcmFmdFN0YXRlLCBwYXRoLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKHN0YXRlOiBhbnksIG5ld1N0YXRlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0NvbnN0cnVjdG9yQXJyYXkoc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLnB1c2guYXBwbHkobmV3U3RhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0NvbnN0cnVjdG9yT2JqZWN0KHN0YXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmV4dGVuZChzdGF0ZSwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3N0YXRlfSBjYW5ub3QgYmUgbWVyZ2VkIGJlY2F1c2UgdHlwZSBpcyBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhdGg6IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcHJvZHVjZSh0aGlzLmN1cnJlbnRTdGF0ZSwgKGRyYWZ0U3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLmdldEN1cnNvcihkcmFmdFN0YXRlLCBwYXRoKTtcclxuICAgICAgICAgICAgYWN0aW9uKGN1cnNvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV4dFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVycmlkZUNvbnRydWN0b3Iob2JqOiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICBpc09iamVjdChvYmo6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIChvYmopID09PSAnb2JqZWN0JztcclxuICAgIH1cclxuXHJcbiAgICByZXNldFJvb3QoaW5pdGlhbFN0YXRlOiBhbnksIHN0YXJ0aW5nUm91dGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XHJcbiAgICAgICAgY29uc3Qgcm91dGVyID0gc3RhdGVbJ3JvdXRlciddO1xyXG5cclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSBwcm9kdWNlKGluaXRpYWxTdGF0ZSwgKGRyYWZ0U3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldChkcmFmdFN0YXRlLCAncm91dGVyJywgcm91dGVyKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbihkcmFmdFN0YXRlLCBbJ3JvdXRlcicsICd1cmwnXSwgc3RhcnRpbmdSb3V0ZSwgeyBmcm9tVXBkYXRlOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJvb3RTdG9yZS5uZXh0KG5leHRTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQocGF0aDogYW55W10sIHN0YXRlVG9NZXJnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZTtcclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcHJvZHVjZShzdGF0ZSwgKGRyYWZ0U3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEluKGRyYWZ0U3RhdGUsIHBhdGgsIHN0YXRlVG9NZXJnZSwgeyBmcm9tVXBkYXRlOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJvb3RTdG9yZS5uZXh0KG5leHRTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXF1YWxzKG9iak9uZTogYW55LCBvYmpUd286IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEN1cnNvcihzdGF0ZTogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyB8IGFueVtdKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JCYXNlKHN0YXRlLCBwcm9wZXJ0eVBhdGgsIChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgPyBzdGF0ZVtwcm9wZXJ0aWVzWzBdXVxyXG4gICAgICAgICAgICAgICAgOiBzdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFZhbHVlKHN0YXRlOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nIHwgYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocHJvcGVydHlQYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lcmdlKHN0YXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yQmFzZShzdGF0ZSwgcHJvcGVydHlQYXRoLCAoc3RhdGU6IGFueSwgcHJvcGVydGllczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlW3Byb3BlcnRpZXNbMF1dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3Vyc29yQmFzZShzdGF0ZTogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyB8IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0eVBhdGgpID8gcHJvcGVydHlQYXRoIDogcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0aWVzWzBdKSB8fCB0eXBlb2Ygc3RhdGVbcHJvcGVydGllc1swXV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yQmFzZShzdGF0ZVtwcm9wZXJ0aWVzWzBdXSwgcHJvcGVydGllcy5zbGljZSgxKSwgYWN0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKHN0YXRlLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvbnN0cnVjdG9yT2JqZWN0KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb25zdHJ1Y3RvckFycmF5KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleHRlbmQoc291cmNlOiBhbnksIHRhcmdldDogYW55LCBkZWVwOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29uc3RydWN0b3JBcnJheSh0YXJnZXRbcHJvcF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW3Byb3BdID0gWy4uLnRhcmdldFtwcm9wXV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZXAgJiYgdGhpcy5pc0NvbnN0cnVjdG9yT2JqZWN0KHRhcmdldFtwcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VbcHJvcF0gPSB0aGlzLmV4dGVuZChzb3VyY2VbcHJvcF0sIHRhcmdldFtwcm9wXSwgZGVlcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVtwcm9wXSA9IHRhcmdldFtwcm9wXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuICAgIH1cclxufSJdfQ==