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
        const router = state.get('router');
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
     * @param {?} objOne
     * @param {?} objTwo
     * @return {?}
     */
    equals(objOne, objTwo) {
        throw new Error('Method not implemented.');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmxlanMuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW11dGFibGVqcy1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbXV0YWJsZWpzLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBYyxRQUFRLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDOUQsT0FBTyxLQUFLLE9BQU8sTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTs7Ozs7O0lBRXJELEtBQUssQ0FBQyxLQUFvQixFQUFFLElBQVc7UUFDbkMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVM7UUFDWixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELElBQUksQ0FBQyxJQUEwQjtRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7O0lBRUQsR0FBRyxDQUFDLEtBQW9CLEVBQUUsUUFBZ0IsRUFBRSxJQUFTO1FBQ2pELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7OztJQUVELEtBQUssQ0FBQyxLQUFvQixFQUFFLElBQVcsRUFBRSxJQUFTO1FBQzlDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBVTtRQUNmLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7OztJQUVELEtBQUssQ0FBQyxLQUFVLEVBQUUsUUFBYTtRQUMzQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVcsRUFBRSxNQUE0Qjs7Y0FDdEMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJOzs7O1FBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUM7UUFFRixNQUFNLENBQUMsYUFBYTs7OztRQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxHQUFRO1FBQ3ZCLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsZ0VBQWdFO1lBQ2xHLElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25DO2FBQ0o7aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2dCQUNuQyxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyQzthQUNKO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQUMsWUFBaUIsRUFBRSxhQUFxQjs7Y0FDeEMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZOztjQUV6QixNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFFbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzs7O1FBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUMzQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTFCLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsYUFBYSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFRCxLQUFLLENBQUMsSUFBVyxFQUFFLFlBQWlCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztRQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDN0IsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxNQUFXLEVBQUUsTUFBVztRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBRU8sb0JBQW9CLENBQUMsR0FBUTtRQUNqQyxPQUFPLEdBQUcsS0FBSyxJQUFJO2VBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7ZUFDekIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztlQUNmLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcbmltcG9ydCB7IE1hcCwgZnJvbUpTLCBDb2xsZWN0aW9uLCBJdGVyYWJsZSB9IGZyb20gJ2ltbXV0YWJsZSc7XHJcbmltcG9ydCAqIGFzIF9DdXJzb3IgZnJvbSAnaW1tdXRhYmxlL2NvbnRyaWIvY3Vyc29yJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbW11dGFibGVKc0RhdGFTdHJhdGVneSBleHRlbmRzIERhdGFTdHJhdGVneSB7XHJcblxyXG4gICAgZ2V0SW4oc3RhdGU6IE1hcDxhbnksIGFueT4sIHBhdGg6IGFueVtdKTogQ29sbGVjdGlvbjxhbnksIGFueT4ge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5nZXRJbihwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBmcm9tSlMoZGF0YTogYW55KTogQ29sbGVjdGlvbjxhbnksIGFueT4ge1xyXG4gICAgICAgIHJldHVybiBmcm9tSlMoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9KUyhkYXRhOiBDb2xsZWN0aW9uPGFueSwgYW55Pikge1xyXG4gICAgICAgIHJldHVybiBkYXRhLnRvSlMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQoc3RhdGU6IE1hcDxhbnksIGFueT4sIHByb3BlcnR5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5zZXQocHJvcGVydHksIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluKHN0YXRlOiBNYXA8YW55LCBhbnk+LCBwYXRoOiBhbnlbXSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLnNldEluKHBhdGgsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzT2JqZWN0KHN0YXRlOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gTWFwLmlzTWFwKHN0YXRlKSB8fCBJdGVyYWJsZS5pc0l0ZXJhYmxlKHN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShzdGF0ZTogYW55LCBuZXdTdGF0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLm1lcmdlKG5ld1N0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUocGF0aDogYW55W10sIGFjdGlvbjogKHN0YXRlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICBjb25zdCBjdXJzb3IgPSBfQ3Vyc29yLmZyb20odGhpcy5jdXJyZW50U3RhdGUsIHBhdGgsIChuZXdEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV3RGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGN1cnNvci53aXRoTXV0YXRpb25zKChzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGFjdGlvbihzdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGVDb250cnVjdG9yKG9iajogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNOb3RJbW11dGFibGVPYmplY3Qob2JqKSkgeyAvLyBmcm9tIEltbXV0YWJsZUpzIDQgYnJlYWtpbmcgY2hhbmdlIGlzSXRlcmFibGUgPT4gaXNDb2xsZWN0aW9uXHJcbiAgICAgICAgICAgIGlmIChvYmouY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcnJpZGVDb250cnVjdG9yKG9ialtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX19wcm90b19fLmNvbnN0cnVjdG9yID0gT2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcnJpZGVDb250cnVjdG9yKG9ialtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNldFJvb3QoaW5pdGlhbFN0YXRlOiBhbnksIHN0YXJ0aW5nUm91dGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvdXRlciA9IHN0YXRlLmdldCgncm91dGVyJyk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKFtdLCAoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBzdGF0ZS5tZXJnZShpbml0aWFsU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgc3RhdGUuc2V0KCdyb3V0ZXInLCByb3V0ZXIpO1xyXG4gICAgICAgICAgICBzdGF0ZS5zZXRJbihbJ3JvdXRlcicsICd1cmwnXSwgc3RhcnRpbmdSb3V0ZSwgeyBmcm9tVXBkYXRlOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KHBhdGg6IGFueVtdLCBzdGF0ZVRvTWVyZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHBhdGgsIChzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLm1lcmdlKHN0YXRlVG9NZXJnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXF1YWxzKG9iak9uZTogYW55LCBvYmpUd286IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTm90SW1tdXRhYmxlT2JqZWN0KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAhPT0gbnVsbFxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgKG9iaikgPT09ICdvYmplY3QnXHJcbiAgICAgICAgICAgICYmICFNYXAuaXNNYXAob2JqKVxyXG4gICAgICAgICAgICAmJiAhSXRlcmFibGUuaXNJdGVyYWJsZShvYmopO1xyXG4gICAgfVxyXG59Il19