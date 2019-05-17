/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Select } from './select';
import { Update } from './update';
import { Initialize } from './initialize';
import { Observable } from 'rxjs';
import { Map } from './map';
import { Reset } from './reset';
import { NgFormStateManager } from './plugins/form-manager.plugin';
import { PersistStateManager } from './plugins/persist-state.plugin';
/**
 * @template T
 */
export class Store extends Observable {
    /**
     * @param {?} state
     */
    constructor(state) {
        super();
        this.statePath = [];
        this.rootPath = [];
        this.select = (/**
         * @param {?} statePath
         * @return {?}
         */
        (statePath) => {
            /** @type {?} */
            let selectStore = Select.bind(this).call(this, statePath);
            selectStore.statePath = [...this.statePath, ...statePath];
            selectStore.rootPath = this.rootPath;
            selectStore.initialState = this.initialState;
            this.initializeOperators(selectStore);
            return selectStore;
        });
        this.source = state;
        this.initializeOperators(this);
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        /** @type {?} */
        const store = new Store(this);
        store.operator = operator;
        return store;
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        console.log(err);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    next(state) {
        ((/** @type {?} */ (this.source))).next(state);
    }
    /**
     * @return {?}
     */
    complete() {
    }
    /**
     * @param {?} storeContext
     * @return {?}
     */
    initializeOperators(storeContext) {
        storeContext.update = Update.bind(storeContext);
        storeContext.initialize = Initialize.bind(storeContext);
        storeContext.reset = Reset.bind(storeContext);
        storeContext.map = Map.bind(storeContext);
        storeContext.form = new NgFormStateManager(storeContext);
        storeContext.storage = new PersistStateManager(storeContext);
    }
}
if (false) {
    /** @type {?} */
    Store.prototype.statePath;
    /** @type {?} */
    Store.prototype.rootPath;
    /** @type {?} */
    Store.prototype.initialState;
    /** @type {?} */
    Store.prototype.update;
    /** @type {?} */
    Store.prototype.initialize;
    /** @type {?} */
    Store.prototype.map;
    /** @type {?} */
    Store.prototype.reset;
    /** @type {?} */
    Store.prototype.form;
    /** @type {?} */
    Store.prototype.storage;
    /** @type {?} */
    Store.prototype.select;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQW1CLE1BQU0sVUFBVSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQW1CLE1BQU0sVUFBVSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQXVCLE1BQU0sY0FBYyxDQUFDO0FBQy9ELE9BQU8sRUFBWSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFlLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN6QyxPQUFPLEVBQWtCLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQUVyRSxNQUFNLE9BQU8sS0FBUyxTQUFRLFVBQWE7Ozs7SUFhdkMsWUFBWSxLQUFzQjtRQUM5QixLQUFLLEVBQUUsQ0FBQztRQWJaLGNBQVMsR0FBVSxFQUFFLENBQUM7UUFDdEIsYUFBUSxHQUFVLEVBQUUsQ0FBQztRQWtCckIsV0FBTTs7OztRQUFvQixDQUFDLFNBQW1CLEVBQVksRUFBRTs7Z0JBQ3BELFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO1lBQ3pELFdBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUMxRCxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDckMsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzdDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QyxPQUFPLFdBQVcsQ0FBQztRQUN2QixDQUFDLEVBQUE7UUFYRyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7O0lBV0QsSUFBSSxDQUFJLFFBQXdCOztjQUN0QixLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUksSUFBSSxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLEdBQVE7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLEtBQVU7UUFDWCxDQUFDLG1CQUFLLElBQUksQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsUUFBUTtJQUNSLENBQUM7Ozs7O0lBRUQsbUJBQW1CLENBQUMsWUFBc0I7UUFDdEMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELFlBQVksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNKOzs7SUFyREcsMEJBQXNCOztJQUN0Qix5QkFBcUI7O0lBQ3JCLDZCQUFrQjs7SUFFbEIsdUJBQTJCOztJQUMzQiwyQkFBbUM7O0lBQ25DLG9CQUFvQjs7SUFDcEIsc0JBQXNCOztJQUV0QixxQkFBeUI7O0lBQ3pCLHdCQUE2Qjs7SUFTN0IsdUJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3QsIFNlbGVjdFNpZ25hdHVyZSB9IGZyb20gJy4vc2VsZWN0JztcclxuaW1wb3J0IHsgVXBkYXRlLCBVcGRhdGVTaWduYXR1cmUgfSBmcm9tICcuL3VwZGF0ZSc7XHJcbmltcG9ydCB7IEluaXRpYWxpemUsIEluaXRpYWxpemVTaWduYXR1cmUgfSBmcm9tICcuL2luaXRpYWxpemUnO1xyXG5pbXBvcnQgeyBPcGVyYXRvciwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWFwU2duYXR1cmUsIE1hcCB9IGZyb20gJy4vbWFwJztcclxuaW1wb3J0IHsgUmVzZXRTaWduYXR1cmUsIFJlc2V0IH0gZnJvbSAnLi9yZXNldCc7XHJcbmltcG9ydCB7IE5nRm9ybVN0YXRlTWFuYWdlciB9IGZyb20gJy4vcGx1Z2lucy9mb3JtLW1hbmFnZXIucGx1Z2luJztcclxuaW1wb3J0IHsgUGVyc2lzdFN0YXRlTWFuYWdlciB9IGZyb20gJy4vcGx1Z2lucy9wZXJzaXN0LXN0YXRlLnBsdWdpbic7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcmU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IGltcGxlbWVudHMgT2JzZXJ2ZXI8YW55PiB7XHJcbiAgICBzdGF0ZVBhdGg6IGFueVtdID0gW107XHJcbiAgICByb290UGF0aDogYW55W10gPSBbXTtcclxuICAgIGluaXRpYWxTdGF0ZTogYW55O1xyXG5cclxuICAgIHVwZGF0ZTogVXBkYXRlU2lnbmF0dXJlPFQ+O1xyXG4gICAgaW5pdGlhbGl6ZTogSW5pdGlhbGl6ZVNpZ25hdHVyZTxUPjtcclxuICAgIG1hcDogTWFwU2duYXR1cmU8VD47XHJcbiAgICByZXNldDogUmVzZXRTaWduYXR1cmU7XHJcblxyXG4gICAgZm9ybTogTmdGb3JtU3RhdGVNYW5hZ2VyO1xyXG4gICAgc3RvcmFnZTogUGVyc2lzdFN0YXRlTWFuYWdlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZTogT2JzZXJ2YWJsZTxhbnk+KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVPcGVyYXRvcnModGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0OiBTZWxlY3RTaWduYXR1cmUgPSAoc3RhdGVQYXRoOiBzdHJpbmdbXSk6IFN0b3JlPFQ+ID0+IHtcclxuICAgICAgICBsZXQgc2VsZWN0U3RvcmUgPSBTZWxlY3QuYmluZCh0aGlzKS5jYWxsKHRoaXMsIHN0YXRlUGF0aCk7XHJcbiAgICAgICAgc2VsZWN0U3RvcmUuc3RhdGVQYXRoID0gWy4uLnRoaXMuc3RhdGVQYXRoLCAuLi5zdGF0ZVBhdGhdO1xyXG4gICAgICAgIHNlbGVjdFN0b3JlLnJvb3RQYXRoID0gdGhpcy5yb290UGF0aDtcclxuICAgICAgICBzZWxlY3RTdG9yZS5pbml0aWFsU3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVPcGVyYXRvcnMoc2VsZWN0U3RvcmUpO1xyXG4gICAgICAgIHJldHVybiBzZWxlY3RTdG9yZTtcclxuICAgIH1cclxuXHJcbiAgICBsaWZ0PFI+KG9wZXJhdG9yOiBPcGVyYXRvcjxULCBSPik6IFN0b3JlPFI+IHtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IG5ldyBTdG9yZTxSPih0aGlzKTtcclxuICAgICAgICBzdG9yZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xyXG4gICAgICAgIHJldHVybiBzdG9yZTtcclxuICAgIH1cclxuXHJcbiAgICBlcnJvcihlcnI6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dChzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgKDxhbnk+dGhpcy5zb3VyY2UpLm5leHQoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBsZXRlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVPcGVyYXRvcnMoc3RvcmVDb250ZXh0OiBTdG9yZTxUPikge1xyXG4gICAgICAgIHN0b3JlQ29udGV4dC51cGRhdGUgPSBVcGRhdGUuYmluZChzdG9yZUNvbnRleHQpO1xyXG4gICAgICAgIHN0b3JlQ29udGV4dC5pbml0aWFsaXplID0gSW5pdGlhbGl6ZS5iaW5kKHN0b3JlQ29udGV4dCk7XHJcbiAgICAgICAgc3RvcmVDb250ZXh0LnJlc2V0ID0gUmVzZXQuYmluZChzdG9yZUNvbnRleHQpO1xyXG4gICAgICAgIHN0b3JlQ29udGV4dC5tYXAgPSBNYXAuYmluZChzdG9yZUNvbnRleHQpO1xyXG4gICAgICAgIHN0b3JlQ29udGV4dC5mb3JtID0gbmV3IE5nRm9ybVN0YXRlTWFuYWdlcihzdG9yZUNvbnRleHQpO1xyXG4gICAgICAgIHN0b3JlQ29udGV4dC5zdG9yYWdlID0gbmV3IFBlcnNpc3RTdGF0ZU1hbmFnZXIoc3RvcmVDb250ZXh0KTtcclxuICAgIH1cclxufSJdfQ==