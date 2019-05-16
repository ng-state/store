/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DataStrategy } from '@ng-state/data-strategy';
import { Map, fromJS, Iterable } from 'immutable';
import * as _Cursor from 'immutable/contrib/cursor';
export class ImmutableJsDataStrategy extends DataStrategy {
    /**
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    getIn(state, path) {
        return state.getIn(path);
    }
    /**
     * @param {?} state
     * @param {?} property
     * @return {?}
     */
    get(state, property) {
        return state.get(property);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    fromJS(data) {
        return fromJS(data);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    toJS(data) {
        return data.toJS();
    }
    /**
     * @param {?} state
     * @param {?} property
     * @param {?} data
     * @return {?}
     */
    set(state, property, data) {
        return state.set(property, data);
    }
    /**
     * @param {?} state
     * @param {?} path
     * @param {?} data
     * @return {?}
     */
    setIn(state, path, data) {
        return state.setIn(path, data);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    isObject(state) {
        return Map.isMap(state) || Iterable.isIterable(state);
    }
    /**
     * @param {?} state
     * @param {?} newState
     * @return {?}
     */
    merge(state, newState) {
        return state.merge(newState);
    }
    /**
     * @param {?} path
     * @param {?} action
     * @return {?}
     */
    update(path, action) {
        /** @type {?} */
        const cursor = _Cursor.from(this.currentState, path, (/**
         * @param {?} newData
         * @return {?}
         */
        (newData) => {
            this.rootStore.next(newData);
        }));
        cursor.withMutations((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            action(state);
        }));
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    overrideContructor(obj) {
        if (this.isNotImmutableObject(obj)) { // from ImmutableJs 4 breaking change isIterable => isCollection
            if (obj.constructor === Array) {
                for (let i = 0; i < obj.length; i++) {
                    this.overrideContructor(obj[i]);
                }
            }
            else {
                obj.__proto__.constructor = Object;
                for (let key in obj) {
                    this.overrideContructor(obj[key]);
                }
            }
        }
    }
    /**
     * @param {?} initialState
     * @param {?} startingRoute
     * @return {?}
     */
    resetRoot(initialState, startingRoute) {
        /** @type {?} */
        const state = this.currentState;
        /** @type {?} */
        const router = this.get(state, 'router');
        this.update([], (/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            state.clear();
            state.merge(initialState);
            state.set('router', router);
            state.setIn(['router', 'url'], startingRoute, { fromUpdate: true });
        }));
    }
    /**
     * @param {?} path
     * @param {?} stateToMerge
     * @return {?}
     */
    reset(path, stateToMerge) {
        this.update(path, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            state.clear();
            state.merge(stateToMerge);
        }));
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    isNotImmutableObject(obj) {
        return obj !== null
            && typeof (obj) === 'object'
            && !Map.isMap(obj)
            && !Iterable.isIterable(obj);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmxlanMuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW11dGFibGVqcy1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbXV0YWJsZWpzLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBYyxRQUFRLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDOUQsT0FBTyxLQUFLLE9BQU8sTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTs7Ozs7O0lBRXJELEtBQUssQ0FBQyxLQUFvQixFQUFFLElBQVc7UUFDbkMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUVELEdBQUcsQ0FBQyxLQUFVLEVBQUUsUUFBZ0I7UUFDNUIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVM7UUFDWixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELElBQUksQ0FBQyxJQUEwQjtRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7O0lBRUQsR0FBRyxDQUFDLEtBQW9CLEVBQUUsUUFBZ0IsRUFBRSxJQUFTO1FBQ2pELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7OztJQUVELEtBQUssQ0FBQyxLQUFvQixFQUFFLElBQVcsRUFBRSxJQUFTO1FBQzlDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBVTtRQUNmLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7OztJQUVELEtBQUssQ0FBQyxLQUFVLEVBQUUsUUFBYTtRQUMzQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVcsRUFBRSxNQUE0Qjs7Y0FDdEMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJOzs7O1FBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUM7UUFFRixNQUFNLENBQUMsYUFBYTs7OztRQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxHQUFRO1FBQ3ZCLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsZ0VBQWdFO1lBQ2xHLElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25DO2FBQ0o7aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2dCQUNuQyxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyQzthQUNKO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQUMsWUFBaUIsRUFBRSxhQUFxQjs7Y0FDeEMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZOztjQUV6QixNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTs7OztRQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDM0IsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUxQixLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLGFBQWEsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRUQsS0FBSyxDQUFDLElBQVcsRUFBRSxZQUFpQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7UUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzdCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxHQUFRO1FBQ2pDLE9BQU8sR0FBRyxLQUFLLElBQUk7ZUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTtlQUN6QixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2VBQ2YsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuaW1wb3J0IHsgTWFwLCBmcm9tSlMsIENvbGxlY3Rpb24sIEl0ZXJhYmxlIH0gZnJvbSAnaW1tdXRhYmxlJztcclxuaW1wb3J0ICogYXMgX0N1cnNvciBmcm9tICdpbW11dGFibGUvY29udHJpYi9jdXJzb3InO1xyXG5cclxuZXhwb3J0IGNsYXNzIEltbXV0YWJsZUpzRGF0YVN0cmF0ZWd5IGV4dGVuZHMgRGF0YVN0cmF0ZWd5IHtcclxuXHJcbiAgICBnZXRJbihzdGF0ZTogTWFwPGFueSwgYW55PiwgcGF0aDogYW55W10pOiBDb2xsZWN0aW9uPGFueSwgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLmdldEluKHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldChzdGF0ZTogYW55LCBwcm9wZXJ0eTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLmdldChwcm9wZXJ0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnJvbUpTKGRhdGE6IGFueSk6IENvbGxlY3Rpb248YW55LCBhbnk+IHtcclxuICAgICAgICByZXR1cm4gZnJvbUpTKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvSlMoZGF0YTogQ29sbGVjdGlvbjxhbnksIGFueT4pIHtcclxuICAgICAgICByZXR1cm4gZGF0YS50b0pTKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0KHN0YXRlOiBNYXA8YW55LCBhbnk+LCBwcm9wZXJ0eTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGUuc2V0KHByb3BlcnR5LCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbihzdGF0ZTogTWFwPGFueSwgYW55PiwgcGF0aDogYW55W10sIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihwYXRoLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBpc09iamVjdChzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hcC5pc01hcChzdGF0ZSkgfHwgSXRlcmFibGUuaXNJdGVyYWJsZShzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2Uoc3RhdGU6IGFueSwgbmV3U3RhdGU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5tZXJnZShuZXdTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhdGg6IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgY3Vyc29yID0gX0N1cnNvci5mcm9tKHRoaXMuY3VycmVudFN0YXRlLCBwYXRoLCAobmV3RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3RTdG9yZS5uZXh0KG5ld0RhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjdXJzb3Iud2l0aE11dGF0aW9ucygoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBhY3Rpb24oc3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJyaWRlQ29udHJ1Y3RvcihvYmo6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTm90SW1tdXRhYmxlT2JqZWN0KG9iaikpIHsgLy8gZnJvbSBJbW11dGFibGVKcyA0IGJyZWFraW5nIGNoYW5nZSBpc0l0ZXJhYmxlID0+IGlzQ29sbGVjdGlvblxyXG4gICAgICAgICAgICBpZiAob2JqLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJyaWRlQ29udHJ1Y3RvcihvYmpbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9fcHJvdG9fXy5jb25zdHJ1Y3RvciA9IE9iamVjdDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJyaWRlQ29udHJ1Y3RvcihvYmpba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRSb290KGluaXRpYWxTdGF0ZTogYW55LCBzdGFydGluZ1JvdXRlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xyXG5cclxuICAgICAgICBjb25zdCByb3V0ZXIgPSB0aGlzLmdldChzdGF0ZSwgJ3JvdXRlcicpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZShbXSwgKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc3RhdGUuY2xlYXIoKTtcclxuICAgICAgICAgICAgc3RhdGUubWVyZ2UoaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHN0YXRlLnNldCgncm91dGVyJywgcm91dGVyKTtcclxuICAgICAgICAgICAgc3RhdGUuc2V0SW4oWydyb3V0ZXInLCAndXJsJ10sIHN0YXJ0aW5nUm91dGUsIHsgZnJvbVVwZGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldChwYXRoOiBhbnlbXSwgc3RhdGVUb01lcmdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZShwYXRoLCAoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBzdGF0ZS5tZXJnZShzdGF0ZVRvTWVyZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNOb3RJbW11dGFibGVPYmplY3Qob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gb2JqICE9PSBudWxsXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiAob2JqKSA9PT0gJ29iamVjdCdcclxuICAgICAgICAgICAgJiYgIU1hcC5pc01hcChvYmopXHJcbiAgICAgICAgICAgICYmICFJdGVyYWJsZS5pc0l0ZXJhYmxlKG9iaik7XHJcbiAgICB9XHJcbn0iXX0=