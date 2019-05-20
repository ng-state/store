import { take } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
DataStrategy = /** @class */ (function () {
    function DataStrategy() {
    }
    Object.defineProperty(DataStrategy.prototype, "currentState", {
        get: /**
         * @protected
         * @return {?}
         */
        function () {
            /** @type {?} */
            var currentState;
            this.rootStore.pipe(take(1))
                .subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DataStrategy };

//# sourceMappingURL=ng-state-data-strategy.js.map