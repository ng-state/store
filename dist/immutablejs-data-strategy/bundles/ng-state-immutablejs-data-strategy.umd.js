(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('immutable'), require('immutable/contrib/cursor'), require('@angular/core'), require('@ng-state/data-strategy')) :
    typeof define === 'function' && define.amd ? define('@ng-state/immutablejs-data-strategy', ['exports', 'immutable', 'immutable/contrib/cursor', '@angular/core', '@ng-state/data-strategy'], factory) :
    (factory((global['ng-state'] = global['ng-state'] || {}, global['ng-state']['immutablejs-data-strategy'] = {}),global.immutable,global._Cursor,global.ng.core,global.dataStrategy));
}(this, (function (exports,immutable,_Cursor,core,dataStrategy) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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
         * @param {?} data
         * @return {?}
         */
        ImmutableJsDataStrategy.prototype.fromJS = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                return immutable.fromJS(data);
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
                return immutable.Map.isMap(state) || immutable.Iterable.isIterable(state);
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
                var cursor = _Cursor.from(this.currentState, path, ( /**
                 * @param {?} newData
                 * @return {?}
                 */function (newData) {
                    _this.rootStore.next(newData);
                }));
                cursor.withMutations(( /**
                 * @param {?} state
                 * @return {?}
                 */function (state) {
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
                this.update([], ( /**
                 * @param {?} state
                 * @return {?}
                 */function (state) {
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
                this.update(path, ( /**
                 * @param {?} state
                 * @return {?}
                 */function (state) {
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
                    && !immutable.Map.isMap(obj)
                    && !immutable.Iterable.isIterable(obj);
            };
        return ImmutableJsDataStrategy;
    }(dataStrategy.DataStrategy));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImmutableJsDataStrategyModule = /** @class */ (function () {
        function ImmutableJsDataStrategyModule() {
        }
        ImmutableJsDataStrategyModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [
                            { provide: dataStrategy.DataStrategy, useClass: ImmutableJsDataStrategy }
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

    exports.ImmutableJsDataStrategy = ImmutableJsDataStrategy;
    exports.ImmutableJsDataStrategyModule = ImmutableJsDataStrategyModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ng-state-immutablejs-data-strategy.umd.js.map