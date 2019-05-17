/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { tap, take } from 'rxjs/operators';
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
export class Initialize {
    /**
     * @param {?} statePath
     * @param {?=} initialState
     */
    constructor(statePath, initialState = null) {
        /** @type {?} */
        const initialized = '__initialized';
        /** @type {?} */
        let actionWrapper = (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            const dataStrategy = ServiceLocator.injector.get(DataStrategy);
            if (dataStrategy.getIn(state, [...statePath, initialized])) {
                return;
            }
            dataStrategy.overrideContructor(initialState);
            initialState.constructor = Object;
            initialState = dataStrategy.fromJS(initialState);
            initialState = dataStrategy.set(initialState, initialized, true);
            /** @type {?} */
            let newState;
            try {
                newState = dataStrategy.setIn(state, statePath, initialState);
                this.newStore = ((/** @type {?} */ (this))).select(statePath);
                this.newStore.initialState = initialState;
                this.newStore.rootPath = statePath;
            }
            catch (exception) {
                console.error(exception);
            }
            ((/** @type {?} */ (this))).source.next(newState);
        }).bind(this);
        /** @type {?} */
        const defaultDebugInfo = { actionType: "INITIALIZE" /* Initialize */, statePath: statePath };
        DebugInfo.instance.add(defaultDebugInfo);
        ((/** @type {?} */ (this))).pipe(tap(actionWrapper), take(1)).subscribe();
        return (/** @type {?} */ (this.newStore));
    }
}
if (false) {
    /** @type {?} */
    Initialize.prototype.newStore;
}
/**
 * @record
 * @template T
 */
export function InitializeSignature() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbGl6ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9zdG9yZS9pbml0aWFsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE1BQU0sT0FBTyxVQUFVOzs7OztJQUduQixZQUFZLFNBQWdCLEVBQUUsZUFBb0IsSUFBSTs7Y0FDNUMsV0FBVyxHQUFHLGVBQWU7O1lBRS9CLGFBQWEsR0FBRzs7OztRQUFBLFVBQVUsS0FBVTs7a0JBQzlCLFlBQVksR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7WUFFOUQsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hELE9BQU87YUFDVjtZQUVELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5QyxZQUFZLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztZQUNsQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRCxZQUFZLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDOztnQkFFN0QsUUFBUTtZQUVaLElBQUk7Z0JBQ0EsUUFBUSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLG1CQUFLLElBQUksRUFBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQzthQUN0QztZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVCO1lBRUQsQ0FBQyxtQkFBSyxJQUFJLEVBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O2NBRU4sZ0JBQWdCLEdBQUcsRUFBRSxVQUFVLCtCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7UUFDcEYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV6QyxDQUFDLG1CQUFLLElBQUksRUFBQSxDQUFDLENBQUMsSUFBSSxDQUNaLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZCxPQUFPLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQztJQUNoQyxDQUFDO0NBQ0o7OztJQXpDRyw4QkFBcUI7Ozs7OztBQTJDekIseUNBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcclxuaW1wb3J0IHsgdGFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vZGVidWcvZGVidWctaW5mby1kYXRhJztcclxuaW1wb3J0IHsgRGVidWdJbmZvIH0gZnJvbSAnLi4vZGVidWcvZGVidWctaW5mbyc7XHJcbmltcG9ydCB7IFNlcnZpY2VMb2NhdG9yIH0gZnJvbSAnLi4vaGVscGVycy9zZXJ2aWNlLWxvY2F0b3InO1xyXG5pbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5pdGlhbGl6ZSB7XHJcbiAgICBuZXdTdG9yZTogU3RvcmU8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZVBhdGg6IGFueVtdLCBpbml0aWFsU3RhdGU6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBjb25zdCBpbml0aWFsaXplZCA9ICdfX2luaXRpYWxpemVkJztcclxuXHJcbiAgICAgICAgbGV0IGFjdGlvbldyYXBwZXIgPSBmdW5jdGlvbiAoc3RhdGU6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhU3RyYXRlZ3kgPSBTZXJ2aWNlTG9jYXRvci5pbmplY3Rvci5nZXQoRGF0YVN0cmF0ZWd5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhU3RyYXRlZ3kuZ2V0SW4oc3RhdGUsIFsuLi5zdGF0ZVBhdGgsIGluaXRpYWxpemVkXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGF0YVN0cmF0ZWd5Lm92ZXJyaWRlQ29udHJ1Y3Rvcihpbml0aWFsU3RhdGUpO1xyXG4gICAgICAgICAgICBpbml0aWFsU3RhdGUuY29uc3RydWN0b3IgPSBPYmplY3Q7XHJcbiAgICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IGRhdGFTdHJhdGVneS5mcm9tSlMoaW5pdGlhbFN0YXRlKTtcclxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlID0gZGF0YVN0cmF0ZWd5LnNldChpbml0aWFsU3RhdGUsIGluaXRpYWxpemVkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdTdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IGRhdGFTdHJhdGVneS5zZXRJbihzdGF0ZSwgc3RhdGVQYXRoLCBpbml0aWFsU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdTdG9yZSA9ICg8YW55PnRoaXMpLnNlbGVjdChzdGF0ZVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdTdG9yZS5pbml0aWFsU3RhdGUgPSBpbml0aWFsU3RhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1N0b3JlLnJvb3RQYXRoID0gc3RhdGVQYXRoO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXhjZXB0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKDxhbnk+dGhpcykuc291cmNlLm5leHQobmV3U3RhdGUpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVmYXVsdERlYnVnSW5mbyA9IHsgYWN0aW9uVHlwZTogQWN0aW9uVHlwZS5Jbml0aWFsaXplLCBzdGF0ZVBhdGg6IHN0YXRlUGF0aCB9O1xyXG4gICAgICAgIERlYnVnSW5mby5pbnN0YW5jZS5hZGQoZGVmYXVsdERlYnVnSW5mbyk7XHJcblxyXG4gICAgICAgICg8YW55PnRoaXMpLnBpcGUoXHJcbiAgICAgICAgICAgIHRhcChhY3Rpb25XcmFwcGVyKSxcclxuICAgICAgICAgICAgdGFrZSgxKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm5ld1N0b3JlIGFzIGFueTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbml0aWFsaXplU2lnbmF0dXJlPFQ+IHtcclxuICAgIDxSPihzdGF0ZVBhdGgsIGluaXRpYWxTdGF0ZT86IFQsIGFkZFRvSGlzdG9yeT86IGJvb2xlYW4pOiBTdG9yZTxSPjtcclxufSJdfQ==