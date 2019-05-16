import { __extends, __spread } from 'tslib';
import produce from 'immer';
import { NgModule } from '@angular/core';
import { DataStrategy } from '@ng-state/data-strategy';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImmerDataStrategy = /** @class */ (function (_super) {
    __extends(ImmerDataStrategy, _super);
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
                    source[prop] = __spread(target[prop]);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImmerDataStrategyModule = /** @class */ (function () {
    function ImmerDataStrategyModule() {
    }
    ImmerDataStrategyModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        { provide: DataStrategy, useClass: ImmerDataStrategy }
                    ]
                },] }
    ];
    return ImmerDataStrategyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ImmerDataStrategy, ImmerDataStrategyModule };

//# sourceMappingURL=ng-state-immer-data-strategy.js.map