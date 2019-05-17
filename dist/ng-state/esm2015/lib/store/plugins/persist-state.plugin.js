/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { tap, take } from 'rxjs/operators';
import { isObservable, from, of, ReplaySubject, forkJoin } from 'rxjs';
import { ServiceLocator } from '../../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
export class PersistStateManager {
    /**
     * @param {?} store
     */
    constructor(store) {
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
    static configureStorage(storage, getKeys) {
        PersistStateManager.customStorageConfig.storageConfig = { storage: storage, getKeys: getKeys };
    }
    /**
     * @param {?} serialize
     * @param {?} deserialize
     * @return {?}
     */
    static configureSerializer(serialize, deserialize) {
        PersistStateManager.customStorageConfig.serialize = serialize;
        PersistStateManager.customStorageConfig.deserialize = deserialize;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    save(params) {
        /** @type {?} */
        const dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        /** @type {?} */
        const onSaveComplete = new ReplaySubject(1);
        params = this.getParams(params, this.store);
        this.store.pipe(tap((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            this.resolve(params.storageConfig.storage.setItem(params.key, params.serialize(dataStrategy.toJS(state))))
                .pipe(take(1))
                .subscribe((/**
             * @param {?} _
             * @return {?}
             */
            _ => {
                onSaveComplete.next({
                    key: params.key,
                    data: dataStrategy.toJS(state)
                });
            }));
        })), take(1)).subscribe();
        return onSaveComplete
            .asObservable()
            .pipe(take(1));
    }
    /**
     * @param {?=} params
     * @param {?=} keepEntry
     * @return {?}
     */
    load(params, keepEntry = false) {
        /** @type {?} */
        const dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        /** @type {?} */
        const onLoadComplete = new ReplaySubject(1);
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.storage.getItem(params.key))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} loadedState
         * @return {?}
         */
        loadedState => {
            this.store.update((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                dataStrategy.merge(state, dataStrategy.fromJS(params.deserialize(loadedState)));
            }));
            if (!keepEntry) {
                this.removeAction(params);
            }
            onLoadComplete.next({
                key: params.key,
                data: loadedState
            });
        }));
        return onLoadComplete
            .asObservable()
            .pipe(take(1));
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    remove(params) {
        params = this.getParams(params, this.store);
        return this.removeAction(params);
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    clear(params) {
        /** @type {?} */
        const onClearComplete = new ReplaySubject(1);
        /** @type {?} */
        const clearKeys = [];
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.getKeys())
            .pipe(take(1))
            .subscribe((/**
         * @param {?} keys
         * @return {?}
         */
        keys => {
            keys.filter((/**
             * @param {?} e
             * @return {?}
             */
            (e) => e.startsWith(this.prefix)))
                .map((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                /** @type {?} */
                const localParams = Object.assign({}, params);
                localParams.key = key;
                clearKeys.push(this.removeAction(localParams));
            }));
            forkJoin(clearKeys)
                .pipe(take(1))
                .subscribe((/**
             * @param {?} keys
             * @return {?}
             */
            keys => {
                onClearComplete.next(keys);
            }));
        }));
        return onClearComplete
            .asObservable()
            .pipe(take(1));
    }
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    removeAction(params) {
        /** @type {?} */
        const onRemoveComplete = new ReplaySubject(1);
        this.resolve(params.storageConfig.storage.removeItem(params.key))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => {
            onRemoveComplete.next(params.key);
        }));
        return onRemoveComplete
            .asObservable()
            .pipe(take(1));
    }
    /**
     * @private
     * @param {?} params
     * @param {?} store
     * @return {?}
     */
    getParams(params, store) {
        this.setDefaultStorage();
        params = Object.assign({}, this.defaults, PersistStateManager.customStorageConfig, params);
        if (!params.key) {
            params.key = store.statePath.join('.');
        }
        params.key = `${this.prefix}${params.key}`;
        return params;
    }
    /**
     * @private
     * @return {?}
     */
    setDefaultStorage() {
        if (!this.defaults.storageConfig) {
            this.defaults.storageConfig = {
                storage: localStorage,
                getKeys: (/**
                 * @return {?}
                 */
                () => Object.keys(localStorage))
            };
        }
    }
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    isPromise(v) {
        return v && typeof v.then === 'function';
    }
    /**
     * @private
     * @param {?} asyncOrValue
     * @return {?}
     */
    resolve(asyncOrValue) {
        if (this.isPromise(asyncOrValue) || isObservable(asyncOrValue)) {
            return from(asyncOrValue);
        }
        return of(asyncOrValue);
    }
}
PersistStateManager.customStorageConfig = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdC1zdGF0ZS5wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvcGx1Z2lucy9wZXJzaXN0LXN0YXRlLnBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQWMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFZNUIsWUFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQVg3QixXQUFNLEdBQUcsU0FBUyxDQUFDO1FBSWpCLGFBQVEsR0FBdUI7WUFDckMsR0FBRyxFQUFFLEVBQUU7WUFDUCxhQUFhLEVBQUUsSUFBSTtZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzVCLENBQUM7SUFHRixDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBNEIsRUFBRSxPQUFrRTtRQUNwSCxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNuRyxDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBbUIsRUFBRSxXQUFxQjtRQUNqRSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzlELG1CQUFtQixDQUFDLG1CQUFtQixDQUFD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Q0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO2FBQzNDLENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7OztJQUVPLFNBQVMsQ0FBQyxDQUFNO1FBQ3BCLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRU8sT0FBTyxDQUFDLFlBQWlCO1FBQzdCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDNUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0I7UUFFRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QixDQUFDOztBQTFKZ0IsdUNBQW1CLEdBQXVCLEVBQUUsQ0FBQzs7Ozs7O0lBQTlELHdDQUE4RDs7Ozs7SUFGOUQscUNBQTJCOzs7OztJQUkzQix1Q0FLRTs7Ozs7SUFFVSxvQ0FBeUI7Ozs7O0FBb0p6Qyx5Q0FLQzs7Ozs7O0lBSkcsMkRBQTJEOzs7Ozs7SUFDM0Qsa0VBQXVFOzs7OztJQUN2RSw4REFBOEQ7Ozs7SUFDOUQsc0RBQWM7Ozs7O0FBR2xCLHdDQUtDOzs7SUFKRyxpQ0FBYTs7SUFDYiwyQ0FBcUM7O0lBQ3JDLHlDQUF1Qjs7SUFDdkIsdUNBQXFCOzs7OztBQUd6QiwwQ0FHQzs7O0lBRkcsdUNBQTZCOztJQUM3Qix1Q0FBbUU7Ozs7O0FBR3ZFLHNDQUdDOzs7SUFGRywrQkFBWTs7SUFDWixnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRhcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGlzT2JzZXJ2YWJsZSwgZnJvbSwgb2YsIFJlcGxheVN1YmplY3QsIGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyc2lzdFN0YXRlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHByZWZpeCA9ICdzdGF0ZTo6JztcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGN1c3RvbVN0b3JhZ2VDb25maWc6IFBlcnNpc3RTdGF0ZVBhcmFtcyA9IHt9O1xyXG5cclxuICAgIHByb3RlY3RlZCBkZWZhdWx0czogUGVyc2lzdFN0YXRlUGFyYW1zID0ge1xyXG4gICAgICAgIGtleTogJycsXHJcbiAgICAgICAgc3RvcmFnZUNvbmZpZzogbnVsbCxcclxuICAgICAgICBkZXNlcmlhbGl6ZTogSlNPTi5wYXJzZSxcclxuICAgICAgICBzZXJpYWxpemU6IEpTT04uc3RyaW5naWZ5XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29uZmlndXJlU3RvcmFnZShzdG9yYWdlOiBQZXJzaXN0U3RhdGVTdG9yYWdlLCBnZXRLZXlzOiAoKSA9PiBQcm9taXNlPHN0cmluZ1tdPiB8IE9ic2VydmFibGU8c3RyaW5nW10+IHwgc3RyaW5nW10pIHtcclxuICAgICAgICBQZXJzaXN0U3RhdGVNYW5hZ2VyLmN1c3RvbVN0b3JhZ2VDb25maWcuc3RvcmFnZUNvbmZpZyA9IHsgc3RvcmFnZTogc3RvcmFnZSwgZ2V0S2V5czogZ2V0S2V5cyB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjb25maWd1cmVTZXJpYWxpemVyKHNlcmlhbGl6ZTogRnVuY3Rpb24sIGRlc2VyaWFsaXplOiBGdW5jdGlvbikge1xyXG4gICAgICAgIFBlcnNpc3RTdGF0ZU1hbmFnZXIuY3VzdG9tU3RvcmFnZUNvbmZpZy5zZXJpYWxpemUgPSBzZXJpYWxpemU7XHJcbiAgICAgICAgUGVyc2lzdFN0YXRlTWFuYWdlci5jdXN0b21TdG9yYWdlQ29uZmlnLmRlc2VyaWFsaXplID0gZGVzZXJpYWxpemU7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZShwYXJhbXM/OiBQZXJzaXN0U3RhdGVQYXJhbXMpOiBPYnNlcnZhYmxlPFBlcnNpc3RTdGF0ZUl0ZW0+IHtcclxuICAgICAgICBjb25zdCBkYXRhU3RyYXRlZ3kgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoRGF0YVN0cmF0ZWd5KSBhcyBEYXRhU3RyYXRlZ3k7XHJcbiAgICAgICAgY29uc3Qgb25TYXZlQ29tcGxldGUgPSBuZXcgUmVwbGF5U3ViamVjdDxQZXJzaXN0U3RhdGVJdGVtPigxKTtcclxuXHJcbiAgICAgICAgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMocGFyYW1zLCB0aGlzLnN0b3JlKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9yZS5waXBlKFxyXG4gICAgICAgICAgICB0YXAoKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZShwYXJhbXMuc3RvcmFnZUNvbmZpZy5zdG9yYWdlLnNldEl0ZW0ocGFyYW1zLmtleSwgcGFyYW1zLnNlcmlhbGl6ZShkYXRhU3RyYXRlZ3kudG9KUyhzdGF0ZSkpKSlcclxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2F2ZUNvbXBsZXRlLm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBwYXJhbXMua2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVN0cmF0ZWd5LnRvSlMoc3RhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFrZSgxKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBvblNhdmVDb21wbGV0ZVxyXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcclxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZChwYXJhbXM/OiBQZXJzaXN0U3RhdGVQYXJhbXMsIGtlZXBFbnRyeSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxQZXJzaXN0U3RhdGVJdGVtPiB7XHJcbiAgICAgICAgY29uc3QgZGF0YVN0cmF0ZWd5ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERhdGFTdHJhdGVneSkgYXMgRGF0YVN0cmF0ZWd5O1xyXG4gICAgICAgIGNvbnN0IG9uTG9hZENvbXBsZXRlID0gbmV3IFJlcGxheVN1YmplY3Q8UGVyc2lzdFN0YXRlSXRlbT4oMSk7XHJcblxyXG4gICAgICAgIHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHBhcmFtcywgdGhpcy5zdG9yZSk7XHJcbiAgICAgICAgdGhpcy5yZXNvbHZlKHBhcmFtcy5zdG9yYWdlQ29uZmlnLnN0b3JhZ2UuZ2V0SXRlbShwYXJhbXMua2V5KSlcclxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShsb2FkZWRTdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZSgoc3RhdGU6IE1hcDxhbnksIGFueT4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU3RyYXRlZ3kubWVyZ2Uoc3RhdGUsIGRhdGFTdHJhdGVneS5mcm9tSlMocGFyYW1zLmRlc2VyaWFsaXplKGxvYWRlZFN0YXRlKSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwRW50cnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFjdGlvbihwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9uTG9hZENvbXBsZXRlLm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogcGFyYW1zLmtleSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBsb2FkZWRTdGF0ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gb25Mb2FkQ29tcGxldGVcclxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZShwYXJhbXM/OiBQZXJzaXN0U3RhdGVQYXJhbXMpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgICAgIHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHBhcmFtcywgdGhpcy5zdG9yZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQWN0aW9uKHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIocGFyYW1zPzogUGVyc2lzdFN0YXRlUGFyYW1zKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xyXG4gICAgICAgIGNvbnN0IG9uQ2xlYXJDb21wbGV0ZSA9IG5ldyBSZXBsYXlTdWJqZWN0PHN0cmluZ1tdPigxKTtcclxuICAgICAgICBjb25zdCBjbGVhcktleXM6IE9ic2VydmFibGU8c3RyaW5nPltdID0gW107XHJcblxyXG4gICAgICAgIHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHBhcmFtcywgdGhpcy5zdG9yZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzb2x2ZShwYXJhbXMuc3RvcmFnZUNvbmZpZy5nZXRLZXlzKCkpXHJcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoa2V5cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBrZXlzLmZpbHRlcigoZTogc3RyaW5nKSA9PiBlLnN0YXJ0c1dpdGgodGhpcy5wcmVmaXgpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsUGFyYW1zID0geyAuLi5wYXJhbXMgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxQYXJhbXMua2V5ID0ga2V5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJLZXlzLnB1c2godGhpcy5yZW1vdmVBY3Rpb24obG9jYWxQYXJhbXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JrSm9pbihjbGVhcktleXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGtleXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsZWFyQ29tcGxldGUubmV4dChrZXlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBvbkNsZWFyQ29tcGxldGVcclxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQWN0aW9uKHBhcmFtczogUGVyc2lzdFN0YXRlUGFyYW1zKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCBvblJlbW92ZUNvbXBsZXRlID0gbmV3IFJlcGxheVN1YmplY3Q8c3RyaW5nPigxKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNvbHZlKHBhcmFtcy5zdG9yYWdlQ29uZmlnLnN0b3JhZ2UucmVtb3ZlSXRlbShwYXJhbXMua2V5KSlcclxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShfID0+IHtcclxuICAgICAgICAgICAgICAgIG9uUmVtb3ZlQ29tcGxldGUubmV4dChwYXJhbXMua2V5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBvblJlbW92ZUNvbXBsZXRlXHJcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFBhcmFtcyhwYXJhbXM6IFBlcnNpc3RTdGF0ZVBhcmFtcywgc3RvcmU6IFN0b3JlPGFueT4pIHtcclxuICAgICAgICB0aGlzLnNldERlZmF1bHRTdG9yYWdlKCk7XHJcblxyXG4gICAgICAgIHBhcmFtcyA9IHsgLi4udGhpcy5kZWZhdWx0cywgLi4uUGVyc2lzdFN0YXRlTWFuYWdlci5jdXN0b21TdG9yYWdlQ29uZmlnLCAuLi5wYXJhbXMgfTtcclxuXHJcbiAgICAgICAgaWYgKCFwYXJhbXMua2V5KSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5rZXkgPSBzdG9yZS5zdGF0ZVBhdGguam9pbignLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFyYW1zLmtleSA9IGAke3RoaXMucHJlZml4fSR7cGFyYW1zLmtleX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RGVmYXVsdFN0b3JhZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRzLnN0b3JhZ2VDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0cy5zdG9yYWdlQ29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZTogbG9jYWxTdG9yYWdlLFxyXG4gICAgICAgICAgICAgICAgZ2V0S2V5czogKCkgPT4gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzUHJvbWlzZSh2OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdiAmJiB0eXBlb2Ygdi50aGVuID09PSAnZnVuY3Rpb24nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzb2x2ZShhc3luY09yVmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUHJvbWlzZShhc3luY09yVmFsdWUpIHx8IGlzT2JzZXJ2YWJsZShhc3luY09yVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tKGFzeW5jT3JWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2YoYXN5bmNPclZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQZXJzaXN0U3RhdGVTdG9yYWdlIHtcclxuICAgIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4gfCBPYnNlcnZhYmxlPGFueT4gfCBhbnk7XHJcbiAgICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHwgT2JzZXJ2YWJsZTxhbnk+IHwgYW55O1xyXG4gICAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8YW55PiB8IE9ic2VydmFibGU8YW55PiB8IGFueTtcclxuICAgIGNsZWFyKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGVyc2lzdFN0YXRlUGFyYW1zIHtcclxuICAgIGtleT86IHN0cmluZztcclxuICAgIHN0b3JhZ2VDb25maWc/OiBTdG9yYWdlQ29uZmlndWFydGlvbjtcclxuICAgIGRlc2VyaWFsaXplPzogRnVuY3Rpb247XHJcbiAgICBzZXJpYWxpemU/OiBGdW5jdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdG9yYWdlQ29uZmlndWFydGlvbiB7XHJcbiAgICBzdG9yYWdlOiBQZXJzaXN0U3RhdGVTdG9yYWdlO1xyXG4gICAgZ2V0S2V5czogKCkgPT4gUHJvbWlzZTxzdHJpbmdbXT4gfCBPYnNlcnZhYmxlPHN0cmluZ1tdPiB8IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNpc3RTdGF0ZUl0ZW0ge1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICBkYXRhOiBhbnk7XHJcbn0iXX0=