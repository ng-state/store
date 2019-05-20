(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ng-state/data-strategy', ['exports', 'rxjs/operators'], factory) :
    (factory((global['ng-state'] = global['ng-state'] || {}, global['ng-state']['data-strategy'] = {}),global.rxjs.operators));
}(this, (function (exports,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ DataStrategy = /** @class */ (function () {
        function DataStrategy() {
        }
        Object.defineProperty(DataStrategy.prototype, "currentState", {
            get: /**
             * @protected
             * @return {?}
             */ function () {
                /** @type {?} */
                var currentState;
                this.rootStore.pipe(operators.take(1))
                    .subscribe(( /**
             * @param {?} state
             * @return {?}
             */function (state) {
                    currentState = state;
                }));
                return currentState;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} store
         * @param {?} isProd
         * @return {?}
         */
        DataStrategy.prototype.init = /**
         * @param {?} store
         * @param {?} isProd
         * @return {?}
         */
            function (store, isProd) {
                this.rootStore = store;
            };
        return DataStrategy;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DataStrategy = DataStrategy;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ng-state-data-strategy.umd.js.map