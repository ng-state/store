/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { map, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
var Select = /** @class */ (function () {
    function Select(path) {
        /** @type {?} */
        var mapped$;
        /** @type {?} */
        var dataStrategy = ServiceLocator.injector.get(DataStrategy);
        if (typeof path === 'object') {
            mapped$ = ((/** @type {?} */ (this))).pipe(map((/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return dataStrategy.getIn(state, path); })), takeWhile((/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state !== undefined; })), distinctUntilChanged());
        }
        else {
            throw new TypeError("Unexpected type " + typeof path + " in select operator,"
                + " expected 'object' or 'function'");
        }
        return mapped$;
    }
    return Select;
}());
export { Select };
/**
 * @record
 */
export function SelectSignature() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXN0YXRlL3N0b3JlLyIsInNvdXJjZXMiOlsibGliL3N0b3JlL3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZEO0lBQ0ksZ0JBQVksSUFBUzs7WUFDYixPQUFPOztZQUVMLFlBQVksR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFFOUQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDMUIsT0FBTyxHQUFHLENBQUMsbUJBQUssSUFBSSxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQ3RCLEdBQUc7Ozs7WUFBQyxVQUFDLEtBQVUsSUFBSyxPQUFBLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUEvQixDQUErQixFQUFDLEVBQ3BELFNBQVM7Ozs7WUFBQyxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUssS0FBSyxTQUFTLEVBQW5CLENBQW1CLEVBQUMsRUFDOUMsb0JBQW9CLEVBQUUsQ0FDekIsQ0FBQztTQUNMO2FBQ0k7WUFDRCxNQUFNLElBQUksU0FBUyxDQUFDLHFCQUFtQixPQUFPLElBQUkseUJBQXNCO2tCQUNsRSxrQ0FBa0MsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDOzs7OztBQUVELHFDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgbWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVdoaWxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTG9jYXRvciB9IGZyb20gJy4uL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoOiBhbnkpIHtcclxuICAgICAgICBsZXQgbWFwcGVkJDtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YVN0cmF0ZWd5ID0gU2VydmljZUxvY2F0b3IuaW5qZWN0b3IuZ2V0KERhdGFTdHJhdGVneSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbWFwcGVkJCA9ICg8YW55PnRoaXMpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAoKHN0YXRlOiBhbnkpID0+IGRhdGFTdHJhdGVneS5nZXRJbihzdGF0ZSwgcGF0aCkpLFxyXG4gICAgICAgICAgICAgICAgdGFrZVdoaWxlKChzdGF0ZTogYW55KSA9PiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSxcclxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuZXhwZWN0ZWQgdHlwZSAke3R5cGVvZiBwYXRofSBpbiBzZWxlY3Qgb3BlcmF0b3IsYFxyXG4gICAgICAgICAgICAgICAgKyBgIGV4cGVjdGVkICdvYmplY3QnIG9yICdmdW5jdGlvbidgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBwZWQkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdFNpZ25hdHVyZSB7XHJcbiAgKHBhdGg6IGFueVtdKTogU3RvcmU8YW55PjtcclxufSJdfQ==