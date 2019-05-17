/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { tap, take } from 'rxjs/operators';
import { isObservable, from, of, ReplaySubject, forkJoin } from 'rxjs';
import { ServiceLocator } from '../../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
var PersistStateManager = /** @class */ (function () {
    function PersistStateManager(store) {
        this.store = store;
        this.prefix = 'state::';
        this.defaults = {
            key: '',
            storageConfig: null,
            deserialize: JSON.parse,
            serialize: JSON.stringify
        };
    }
    /**
     * @param {?} storage
     * @param {?} getKeys
     * @return {?}
     */
    PersistStateManager.configureStorage = /**
     * @param {?} storage
     * @param {?} getKeys
     * @return {?}
     */
    function (storage, getKeys) {
        PersistStateManager.customStorageConfig.storageConfig = { storage: storage, getKeys: getKeys };
    };
    /**
     * @param {?} serialize
     * @param {?} deserialize
     * @return {?}
     */
    PersistStateManager.configureSerializer = /**
     * @param {?} serialize
     * @param {?} deserialize
     * @return {?}
     */
    function (serialize, deserialize) {
        PersistStateManager.customStorageConfig.serialize = serialize;
        PersistStateManager.customStorageConfig.deserialize = deserialize;
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    PersistStateManager.prototype.save = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        var _this = this;
        /** @type {?} */
        var dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        /** @type {?} */
        var onSaveComplete = new ReplaySubject(1);
        params = this.getParams(params, this.store);
        this.store.pipe(tap((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.resolve(params.storageConfig.storage.setItem(params.key, params.serialize(dataStrategy.toJS(state))))
                .pipe(take(1))
                .subscribe((/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
                onSaveComplete.next({
                    key: params.key,
                    data: dataStrategy.toJS(state)
                });
            }));
        })), take(1)).subscribe();
        return onSaveComplete
            .asObservable()
            .pipe(take(1));
    };
    /**
     * @param {?=} params
     * @param {?=} keepEntry
     * @return {?}
     */
    PersistStateManager.prototype.load = /**
     * @param {?=} params
     * @param {?=} keepEntry
     * @return {?}
     */
    function (params, keepEntry) {
        var _this = this;
        if (keepEntry === void 0) { keepEntry = false; }
        /** @type {?} */
        var dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        /** @type {?} */
        var onLoadComplete = new ReplaySubject(1);
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.storage.getItem(params.key))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} loadedState
         * @return {?}
         */
        function (loadedState) {
            _this.store.update((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                dataStrategy.merge(state, dataStrategy.fromJS(params.deserialize(loadedState)));
            }));
            if (!keepEntry) {
                _this.removeAction(params);
            }
            onLoadComplete.next({
                key: params.key,
                data: loadedState
            });
        }));
        return onLoadComplete
            .asObservable()
            .pipe(take(1));
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    PersistStateManager.prototype.remove = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        params = this.getParams(params, this.store);
        return this.removeAction(params);
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    PersistStateManager.prototype.clear = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        var _this = this;
        /** @type {?} */
        var onClearComplete = new ReplaySubject(1);
        /** @type {?} */
        var clearKeys = [];
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.getKeys())
            .pipe(take(1))
            .subscribe((/**
         * @param {?} keys
         * @return {?}
         */
        function (keys) {
            keys.filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.startsWith(_this.prefix); }))
                .map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var localParams = tslib_1.__assign({}, params);
                localParams.key = key;
                clearKeys.push(_this.removeAction(localParams));
            }));
            forkJoin(clearKeys)
                .pipe(take(1))
                .subscribe((/**
             * @param {?} keys
             * @return {?}
             */
            function (keys) {
                onClearComplete.next(keys);
            }));
        }));
        return onClearComplete
            .asObservable()
            .pipe(take(1));
    };
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    PersistStateManager.prototype.removeAction = /**
     * @private
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var onRemoveComplete = new ReplaySubject(1);
        this.resolve(params.storageConfig.storage.removeItem(params.key))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} _
         * @return {?}
         */
        function (_) {
            onRemoveComplete.next(params.key);
        }));
        return onRemoveComplete
            .asObservable()
            .pipe(take(1));
    };
    /**
     * @private
     * @param {?} params
     * @param {?} store
     * @return {?}
     */
    PersistStateManager.prototype.getParams = /**
     * @private
     * @param {?} params
     * @param {?} store
     * @return {?}
     */
    function (params, store) {
        this.setDefaultStorage();
        params = tslib_1.__assign({}, this.defaults, PersistStateManager.customStorageConfig, params);
        if (!params.key) {
            params.key = store.statePath.join('.');
        }
        params.key = "" + this.prefix + params.key;
        return params;
    };
    /**
     * @private
     * @return {?}
     */
    PersistStateManager.prototype.setDefaultStorage = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.defaults.storageConfig) {
            this.defaults.storageConfig = {
                storage: localStorage,
                getKeys: (/**
                 * @return {?}
                 */
                function () { return Object.keys(localStorage); })
            };
        }
    };
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    PersistStateManager.prototype.isPromise = /**
     * @private
     * @param {?} v
     * @return {?}
     */
    function (v) {
        return v && typeof v.then === 'function';
    };
    /**
     * @private
     * @param {?} asyncOrValue
     * @return {?}
     */
    PersistStateManager.prototype.resolve = /**
     * @private
     * @param {?} asyncOrValue
     * @return {?}
     */
    function (asyncOrValue) {
        if (this.isPromise(asyncOrValue) || isObservable(asyncOrValue)) {
            return from(asyncOrValue);
        }
        return of(asyncOrValue);
    };
    PersistStateManager.customStorageConfig = {};
    return PersistStateManager;
}());
export { PersistStateManager };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    PersistStateManager.customStorageConfig;
    /**
     * @type {?}
     * @private
     */
    PersistStateManager.prototype.prefix;
    /**
     * @type {?}
     * @protected
     */
    PersistStateManager.prototype.defaults;
    /**
     * @type {?}
     * @private
     */
    PersistStateManager.prototype.store;
}
/**
 * @record
 */
export function PersistStateStorage() { }
if (false) {
    /**
     * @param {?} key
     * @return {?}
     */
    PersistStateStorage.prototype.getItem = function (key) { };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    PersistStateStorage.prototype.setItem = function (key, value) { };
    /**
     * @param {?} key
     * @return {?}
     */
    PersistStateStorage.prototype.removeItem = function (key) { };
    /**
     * @return {?}
     */
    PersistStateStorage.prototype.clear = function () { };
}
/**
 * @record
 */
export function PersistStateParams() { }
if (false) {
    /** @type {?|undefined} */
    PersistStateParams.prototype.key;
    /** @type {?|undefined} */
    PersistStateParams.prototype.storageConfig;
    /** @type {?|undefined} */
    PersistStateParams.prototype.deserialize;
    /** @type {?|undefined} */
    PersistStateParams.prototype.serialize;
}
/**
 * @record
 */
export function StorageConfiguartion() { }
if (false) {
    /** @type {?} */
    StorageConfiguartion.prototype.storage;
    /** @type {?} */
    StorageConfiguartion.prototype.getKeys;
}
/**
 * @record
 */
export function PersistStateItem() { }
if (false) {
    /** @type {?} */
    PersistStateItem.prototype.key;
    /** @type {?} */
    PersistStateItem.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdC1zdGF0ZS5wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvcGx1Z2lucy9wZXJzaXN0LXN0YXRlLnBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFjLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RDtJQVlJLDZCQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBWDdCLFdBQU0sR0FBRyxTQUFTLENBQUM7UUFJakIsYUFBUSxHQUF1QjtZQUNyQyxHQUFHLEVBQUUsRUFBRTtZQUNQLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSztZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDNUIsQ0FBQztJQUdGLENBQUM7Ozs7OztJQUVNLG9DQUFnQjs7Ozs7SUFBdkIsVUFBd0IsT0FBNEIsRUFBRSxPQUFrRTtRQUNwSCxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNuRyxDQUFDOzs7Ozs7SUFFTSx1Q0FBbUI7Ozs7O0lBQTFCLFVBQTJCLFNBQW1CLEVBQUUsV0FBcUI7UUFDakUsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM5RCxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEdBQUcsV0FBVyxD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QUc7Z0JBQzFCLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixPQUFPOzs7Z0JBQUUsY0FBTSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQXpCLENBQXlCLENBQUE7YUFDM0MsQ0FBQztTQUNMO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sdUNBQVM7Ozs7O0lBQWpCLFVBQWtCLENBQU07UUFDcEIsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFFTyxxQ0FBTzs7Ozs7SUFBZixVQUFnQixZQUFpQjtRQUM3QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdCO1FBRUQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQTFKZ0IsdUNBQW1CLEdBQXVCLEVBQUUsQ0FBQztJQTJKbEUsMEJBQUM7Q0FBQSxBQTlKRCxJQThKQztTQTlKWSxtQkFBbUI7Ozs7OztJQUc1Qix3Q0FBOEQ7Ozs7O0lBRjlELHFDQUEyQjs7Ozs7SUFJM0IsdUNBS0U7Ozs7O0lBRVUsb0NBQXlCOzs7OztBQW9KekMseUNBS0M7Ozs7OztJQUpHLDJEQUEyRDs7Ozs7O0lBQzNELGtFQUF1RTs7Ozs7SUFDdkUsOERBQThEOzs7O0lBQzlELHNEQUFjOzs7OztBQUdsQix3Q0FLQzs7O0lBSkcsaUNBQWE7O0lBQ2IsMkNBQXFDOztJQUNyQyx5Q0FBdUI7O0lBQ3ZCLHVDQUFxQjs7Ozs7QUFHekIsMENBR0M7OztJQUZHLHVDQUE2Qjs7SUFDN0IsdUNBQW1FOzs7OztBQUd2RSxzQ0FHQzs7O0lBRkcsK0JBQVk7O0lBQ1osZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUsIGZyb20sIG9mLCBSZXBsYXlTdWJqZWN0LCBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBlcnNpc3RTdGF0ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBwcmVmaXggPSAnc3RhdGU6Oic7XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBjdXN0b21TdG9yYWdlQ29uZmlnOiBQZXJzaXN0U3RhdGVQYXJhbXMgPSB7fTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZGVmYXVsdHM6IFBlcnNpc3RTdGF0ZVBhcmFtcyA9IHtcclxuICAgICAgICBrZXk6ICcnLFxyXG4gICAgICAgIHN0b3JhZ2VDb25maWc6IG51bGwsXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IEpTT04ucGFyc2UsXHJcbiAgICAgICAgc2VyaWFsaXplOiBKU09OLnN0cmluZ2lmeVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+KSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbmZpZ3VyZVN0b3JhZ2Uoc3RvcmFnZTogUGVyc2lzdFN0YXRlU3RvcmFnZSwgZ2V0S2V5czogKCkgPT4gUHJvbWlzZTxzdHJpbmdbXT4gfCBPYnNlcnZhYmxlPHN0cmluZ1tdPiB8IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgUGVyc2lzdFN0YXRlTWFuYWdlci5jdXN0b21TdG9yYWdlQ29uZmlnLnN0b3JhZ2VDb25maWcgPSB7IHN0b3JhZ2U6IHN0b3JhZ2UsIGdldEtleXM6IGdldEtleXMgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29uZmlndXJlU2VyaWFsaXplcihzZXJpYWxpemU6IEZ1bmN0aW9uLCBkZXNlcmlhbGl6ZTogRnVuY3Rpb24pIHtcclxuICAgICAgICBQZXJzaXN0U3RhdGVNYW5hZ2VyLmN1c3RvbVN0b3JhZ2VDb25maWcuc2VyaWFsaXplID0gc2VyaWFsaXplO1xyXG4gICAgICAgIFBlcnNpc3RTdGF0ZU1hbmFnZXIuY3VzdG9tU3RvcmFnZUNvbmZpZy5kZXNlcmlhbGl6ZSA9IGRlc2VyaWFsaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmUocGFyYW1zPzogUGVyc2lzdFN0YXRlUGFyYW1zKTogT2JzZXJ2YWJsZTxQZXJzaXN0U3RhdGVJdGVtPiB7XHJcbiAgICAgICAgY29uc3QgZGF0YVN0cmF0ZWd5ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERhdGFTdHJhdGVneSkgYXMgRGF0YVN0cmF0ZWd5O1xyXG4gICAgICAgIGNvbnN0IG9uU2F2ZUNvbXBsZXRlID0gbmV3IFJlcGxheVN1YmplY3Q8UGVyc2lzdFN0YXRlSXRlbT4oMSk7XHJcblxyXG4gICAgICAgIHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHBhcmFtcywgdGhpcy5zdG9yZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcmUucGlwZShcclxuICAgICAgICAgICAgdGFwKChzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmUocGFyYW1zLnN0b3JhZ2VDb25maWcuc3RvcmFnZS5zZXRJdGVtKHBhcmFtcy5rZXksIHBhcmFtcy5zZXJpYWxpemUoZGF0YVN0cmF0ZWd5LnRvSlMoc3RhdGUpKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKF8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNhdmVDb21wbGV0ZS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogcGFyYW1zLmtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFTdHJhdGVneS50b0pTKHN0YXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRha2UoMSlcclxuICAgICAgICApLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gb25TYXZlQ29tcGxldGVcclxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWQocGFyYW1zPzogUGVyc2lzdFN0YXRlUGFyYW1zLCBrZWVwRW50cnkgPSBmYWxzZSk6IE9ic2VydmFibGU8UGVyc2lzdFN0YXRlSXRlbT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFTdHJhdGVneSA9IFNlcnZpY2VMb2NhdG9yLmluamVjdG9yLmdldChEYXRhU3RyYXRlZ3kpIGFzIERhdGFTdHJhdGVneTtcclxuICAgICAgICBjb25zdCBvbkxvYWRDb21wbGV0ZSA9IG5ldyBSZXBsYXlTdWJqZWN0PFBlcnNpc3RTdGF0ZUl0ZW0+KDEpO1xyXG5cclxuICAgICAgICBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhwYXJhbXMsIHRoaXMuc3RvcmUpO1xyXG4gICAgICAgIHRoaXMucmVzb2x2ZShwYXJhbXMuc3RvcmFnZUNvbmZpZy5zdG9yYWdlLmdldEl0ZW0ocGFyYW1zLmtleSkpXHJcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUobG9hZGVkU3RhdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUoKHN0YXRlOiBNYXA8YW55LCBhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVN0cmF0ZWd5Lm1lcmdlKHN0YXRlLCBkYXRhU3RyYXRlZ3kuZnJvbUpTKHBhcmFtcy5kZXNlcmlhbGl6ZShsb2FkZWRTdGF0ZSkpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgha2VlcEVudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBY3Rpb24ocGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvbkxvYWRDb21wbGV0ZS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IHBhcmFtcy5rZXksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbG9hZGVkU3RhdGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9uTG9hZENvbXBsZXRlXHJcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUocGFyYW1zPzogUGVyc2lzdFN0YXRlUGFyYW1zKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgICAgICBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhwYXJhbXMsIHRoaXMuc3RvcmUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUFjdGlvbihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKHBhcmFtcz86IFBlcnNpc3RTdGF0ZVBhcmFtcyk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcclxuICAgICAgICBjb25zdCBvbkNsZWFyQ29tcGxldGUgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmdbXT4oMSk7XHJcbiAgICAgICAgY29uc3QgY2xlYXJLZXlzOiBPYnNlcnZhYmxlPHN0cmluZz5bXSA9IFtdO1xyXG5cclxuICAgICAgICBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhwYXJhbXMsIHRoaXMuc3RvcmUpO1xyXG5cclxuICAgICAgICB0aGlzLnJlc29sdmUocGFyYW1zLnN0b3JhZ2VDb25maWcuZ2V0S2V5cygpKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGtleXMgPT4ge1xyXG4gICAgICAgICAgICAgICAga2V5cy5maWx0ZXIoKGU6IHN0cmluZykgPT4gZS5zdGFydHNXaXRoKHRoaXMucHJlZml4KSlcclxuICAgICAgICAgICAgICAgICAgICAubWFwKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFBhcmFtcyA9IHsgLi4ucGFyYW1zIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsUGFyYW1zLmtleSA9IGtleTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyS2V5cy5wdXNoKHRoaXMucmVtb3ZlQWN0aW9uKGxvY2FsUGFyYW1zKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9ya0pvaW4oY2xlYXJLZXlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShrZXlzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGVhckNvbXBsZXRlLm5leHQoa2V5cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gb25DbGVhckNvbXBsZXRlXHJcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUFjdGlvbihwYXJhbXM6IFBlcnNpc3RTdGF0ZVBhcmFtcyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc3Qgb25SZW1vdmVDb21wbGV0ZSA9IG5ldyBSZXBsYXlTdWJqZWN0PHN0cmluZz4oMSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzb2x2ZShwYXJhbXMuc3RvcmFnZUNvbmZpZy5zdG9yYWdlLnJlbW92ZUl0ZW0ocGFyYW1zLmtleSkpXHJcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXyA9PiB7XHJcbiAgICAgICAgICAgICAgICBvblJlbW92ZUNvbXBsZXRlLm5leHQocGFyYW1zLmtleSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gb25SZW1vdmVDb21wbGV0ZVxyXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcclxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQYXJhbXMocGFyYW1zOiBQZXJzaXN0U3RhdGVQYXJhbXMsIHN0b3JlOiBTdG9yZTxhbnk+KSB7XHJcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0U3RvcmFnZSgpO1xyXG5cclxuICAgICAgICBwYXJhbXMgPSB7IC4uLnRoaXMuZGVmYXVsdHMsIC4uLlBlcnNpc3RTdGF0ZU1hbmFnZXIuY3VzdG9tU3RvcmFnZUNvbmZpZywgLi4ucGFyYW1zIH07XHJcblxyXG4gICAgICAgIGlmICghcGFyYW1zLmtleSkge1xyXG4gICAgICAgICAgICBwYXJhbXMua2V5ID0gc3RvcmUuc3RhdGVQYXRoLmpvaW4oJy4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcmFtcy5rZXkgPSBgJHt0aGlzLnByZWZpeH0ke3BhcmFtcy5rZXl9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERlZmF1bHRTdG9yYWdlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kZWZhdWx0cy5zdG9yYWdlQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdHMuc3RvcmFnZUNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2U6IGxvY2FsU3RvcmFnZSxcclxuICAgICAgICAgICAgICAgIGdldEtleXM6ICgpID0+IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1Byb21pc2UodjogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHYgJiYgdHlwZW9mIHYudGhlbiA9PT0gJ2Z1bmN0aW9uJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc29sdmUoYXN5bmNPclZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Byb21pc2UoYXN5bmNPclZhbHVlKSB8fCBpc09ic2VydmFibGUoYXN5bmNPclZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnJvbShhc3luY09yVmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9mKGFzeW5jT3JWYWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGVyc2lzdFN0YXRlU3RvcmFnZSB7XHJcbiAgICBnZXRJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHwgT2JzZXJ2YWJsZTxhbnk+IHwgYW55O1xyXG4gICAgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB8IE9ic2VydmFibGU8YW55PiB8IGFueTtcclxuICAgIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4gfCBPYnNlcnZhYmxlPGFueT4gfCBhbnk7XHJcbiAgICBjbGVhcigpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNpc3RTdGF0ZVBhcmFtcyB7XHJcbiAgICBrZXk/OiBzdHJpbmc7XHJcbiAgICBzdG9yYWdlQ29uZmlnPzogU3RvcmFnZUNvbmZpZ3VhcnRpb247XHJcbiAgICBkZXNlcmlhbGl6ZT86IEZ1bmN0aW9uO1xyXG4gICAgc2VyaWFsaXplPzogRnVuY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmFnZUNvbmZpZ3VhcnRpb24ge1xyXG4gICAgc3RvcmFnZTogUGVyc2lzdFN0YXRlU3RvcmFnZTtcclxuICAgIGdldEtleXM6ICgpID0+IFByb21pc2U8c3RyaW5nW10+IHwgT2JzZXJ2YWJsZTxzdHJpbmdbXT4gfCBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQZXJzaXN0U3RhdGVJdGVtIHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgZGF0YTogYW55O1xyXG59Il19