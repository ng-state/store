import { take } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class DataStrategy {
    /**
     * @protected
     * @return {?}
     */
    get currentState() {
        /** @type {?} */
        let currentState;
        this.rootStore.pipe(take(1))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            currentState = state;
        }));
        return currentState;
    }
    /**
     * @param {?} store
     * @param {?} isProd
     * @return {?}
     */
    init(store, isProd) {
        this.rootStore = store;
    }
}

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