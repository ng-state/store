import { __extends } from 'tslib';
import { Map, fromJS, Iterable } from 'immutable';
import { from } from 'immutable/contrib/cursor';
import { NgModule } from '@angular/core';
import { DataStrategy } from '@ng-state/data-strategy';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImmutableJsDataStrategy = /** @class */ (function (_super) {
    __extends(ImmutableJsDataStrategy, _super);
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
        var cursor = from(this.currentState, path, (/**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImmutableJsDataStrategyModule = /** @class */ (function () {
    function ImmutableJsDataStrategyModule() {
    }
    ImmutableJsDataStrategyModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        { provide: DataStrategy, useClass: ImmutableJsDataStrategy }
                    ]
                },] }
    ];
    return ImmutableJsDataStrategyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ImmutableJsDataStrategy, ImmutableJsDataStrategyModule };

//# sourceMappingURL=ng-state-immutablejs-data-strategy.js.map