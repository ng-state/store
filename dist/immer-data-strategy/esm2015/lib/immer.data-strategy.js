/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DataStrategy } from '@ng-state/data-strategy';
import { produce, setAutoFreeze } from 'immer';
export class ImmerDataStrategy extends DataStrategy {
    /**
     * @param {?} store
     * @param {?} isProd
     * @return {?}
     */
    init(store, isProd) {
        super.init(store, isProd);
        setAutoFreeze(!isProd);
    }
    /**
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    getIn(state, path) {
        return this.getCursor(state, path);
    }
    /**
     * @param {?} state
     * @param {?} property
     * @return {?}
     */
    get(state, property) {
        return state[property];
    }
    /**
     * @param {?} data
     * @return {?}
     */
    fromJS(data) {
        return data;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    toJS(data) {
        return data;
    }
    /**
     * @param {?} state
     * @param {?} property
     * @param {?} data
     * @return {?}
     */
    set(state, property, data) {
        state[property] = data;
        return state;
    }
    /**
     * @param {?} state
     * @param {?} path
     * @param {?} data
     * @param {?=} additionalData
     * @return {?}
     */
    setIn(state, path, data, additionalData = {}) {
        /** @type {?} */
        const action = (/**
         * @param {?} s
         * @param {?} p
         * @param {?} d
         * @return {?}
         */
        (s, p, d) => {
            if (!this.setValue(s, p, d)) {
                throw new Error(`State was not set in ${path}`);
            }
        });
        if (additionalData.fromUpdate) {
            action(state, path, data);
        }
        else {
            return produce(state, (/**
             * @param {?} draftState
             * @return {?}
             */
            (draftState) => {
                action(draftState, path, data);
            }));
        }
    }
    /**
     * @param {?} state
     * @param {?} newState
     * @return {?}
     */
    merge(state, newState) {
        if (this.isConstructorArray(state)) {
            state.push.apply(newState);
            return;
        }
        if (this.isConstructorObject(state)) {
            this.extend(state, newState);
            return;
        }
        throw new Error(`${state} cannot be merged because type is not supported`);
    }
    /**
     * @param {?} path
     * @param {?} action
     * @return {?}
     */
    update(path, action) {
        /** @type {?} */
        const nextState = produce(this.currentState, (/**
         * @param {?} draftState
         * @return {?}
         */
        (draftState) => {
            /** @type {?} */
            const cursor = this.getCursor(draftState, path);
            action(cursor);
        }));
        this.rootStore.next(nextState);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    overrideContructor(obj) {
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isObject(obj) {
        return obj !== null && typeof (obj) === 'object';
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
        /** @type {?} */
        const nextState = produce(initialState, (/**
         * @param {?} draftState
         * @return {?}
         */
        (draftState) => {
            this.set(draftState, 'router', router);
            this.setIn(draftState, ['router', 'url'], startingRoute, { fromUpdate: true });
        }));
        this.rootStore.next(nextState);
    }
    /**
     * @param {?} path
     * @param {?} stateToMerge
     * @return {?}
     */
    reset(path, stateToMerge) {
        /** @type {?} */
        const state = this.currentState;
        /** @type {?} */
        const nextState = produce(state, (/**
         * @param {?} draftState
         * @return {?}
         */
        (draftState) => {
            this.setIn(draftState, path, stateToMerge, { fromUpdate: true });
        }));
        this.rootStore.next(nextState);
    }
    /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @return {?}
     */
    getCursor(state, propertyPath) {
        return this.cursorBase(state, propertyPath, (/**
         * @param {?} state
         * @param {?} properties
         * @return {?}
         */
        (state, properties) => {
            return properties.length > 0
                ? state[properties[0]]
                : state;
        }));
    }
    /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @param {?} value
     * @return {?}
     */
    setValue(state, propertyPath, value) {
        if (propertyPath.length === 0) {
            this.merge(state, value);
            return true;
        }
        return this.cursorBase(state, propertyPath, (/**
         * @param {?} state
         * @param {?} properties
         * @return {?}
         */
        (state, properties) => {
            state[properties[0]] = value;
            return true;
        }));
    }
    /**
     * @private
     * @param {?} state
     * @param {?} propertyPath
     * @param {?} action
     * @return {?}
     */
    cursorBase(state, propertyPath, action) {
        /** @type {?} */
        let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split('.');
        if (properties.length > 1) {
            if (!state.hasOwnProperty(properties[0]) || typeof state[properties[0]] !== 'object') {
                return null;
            }
            return this.cursorBase(state[properties[0]], properties.slice(1), action);
        }
        else {
            return action(state, properties);
        }
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    isConstructorObject(obj) {
        return obj.constructor === Object;
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    isConstructorArray(obj) {
        return obj.constructor === Array;
    }
    /**
     * @private
     * @param {?} source
     * @param {?} target
     * @param {?=} deep
     * @return {?}
     */
    extend(source, target, deep = true) {
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                if (this.isConstructorArray(target[prop])) {
                    source[prop] = [...target[prop]];
                }
                else if (deep && this.isConstructorObject(target[prop])) {
                    source[prop] = this.extend(source[prop], target[prop], deep);
                }
                else {
                    source[prop] = target[prop];
                }
            }
        }
        return source;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tZXIuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW1lci1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbWVyLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQyxNQUFNLE9BQU8saUJBQWtCLFNBQVEsWUFBWTs7Ozs7O0lBRS9DLElBQUksQ0FBQyxLQUFVLEVBQUUsTUFBZTtRQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7Ozs7SUFFRCxLQUFLLENBQUMsS0FBVSxFQUFFLElBQVc7UUFDekIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFFRCxHQUFHLENBQUMsS0FBVSxFQUFFLFFBQWdCO1FBQzVCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVM7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELElBQUksQ0FBQyxJQUFTO1FBQ1YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVELEdBQUcsQ0FBQyxLQUFVLEVBQUUsUUFBZ0IsRUFBRSxJQUFTO1FBQ3ZDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7Ozs7SUFFRCxLQUFLLENBQUMsS0FBVSxFQUFFLElBQVcsRUFBRSxJQUFTLEVBQUUsaUJBQXNCLEVB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Q0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hFO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQy9CO2FBQ0o7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuaW1wb3J0IHsgcHJvZHVjZSwgc2V0QXV0b0ZyZWV6ZSB9IGZyb20gJ2ltbWVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbW1lckRhdGFTdHJhdGVneSBleHRlbmRzIERhdGFTdHJhdGVneSB7XHJcblxyXG4gICAgaW5pdChzdG9yZTogYW55LCBpc1Byb2Q6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlci5pbml0KHN0b3JlLCBpc1Byb2QpO1xyXG4gICAgICAgIHNldEF1dG9GcmVlemUoIWlzUHJvZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1cnNvcihzdGF0ZSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KHN0YXRlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGVbcHJvcGVydHldO1xyXG4gICAgfVxyXG5cclxuICAgIGZyb21KUyhkYXRhOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHRvSlMoZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0KHN0YXRlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHN0YXRlW3Byb3BlcnR5XSA9IGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluKHN0YXRlOiBhbnksIHBhdGg6IGFueVtdLCBkYXRhOiBhbnksIGFkZGl0aW9uYWxEYXRhOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IChzOiBhbnksIHA6IGFueSwgZDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXRWYWx1ZShzLCBwLCBkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdGF0ZSB3YXMgbm90IHNldCBpbiAke3BhdGh9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoYWRkaXRpb25hbERhdGEuZnJvbVVwZGF0ZSkge1xyXG4gICAgICAgICAgICBhY3Rpb24oc3RhdGUsIHBhdGgsIGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWNlKHN0YXRlLCAoZHJhZnRTdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oZHJhZnRTdGF0ZSwgcGF0aCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXJnZShzdGF0ZTogYW55LCBuZXdTdGF0ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDb25zdHJ1Y3RvckFycmF5KHN0YXRlKSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5wdXNoLmFwcGx5KG5ld1N0YXRlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNDb25zdHJ1Y3Rvck9iamVjdChzdGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5leHRlbmQoc3RhdGUsIG5ld1N0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtzdGF0ZX0gY2Fubm90IGJlIG1lcmdlZCBiZWNhdXNlIHR5cGUgaXMgbm90IHN1cHBvcnRlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShwYXRoOiBhbnlbXSwgYWN0aW9uOiAoc3RhdGU6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHByb2R1Y2UodGhpcy5jdXJyZW50U3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5nZXRDdXJzb3IoZHJhZnRTdGF0ZSwgcGF0aCk7XHJcbiAgICAgICAgICAgIGFjdGlvbihjdXJzb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJvb3RTdG9yZS5uZXh0KG5leHRTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGVDb250cnVjdG9yKG9iajogYW55KSB7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPYmplY3Qob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiAob2JqKSA9PT0gJ29iamVjdCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRSb290KGluaXRpYWxTdGF0ZTogYW55LCBzdGFydGluZ1JvdXRlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHJvdXRlciA9IHRoaXMuZ2V0KHN0YXRlLCAncm91dGVyJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHByb2R1Y2UoaW5pdGlhbFN0YXRlLCAoZHJhZnRTdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KGRyYWZ0U3RhdGUsICdyb3V0ZXInLCByb3V0ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEluKGRyYWZ0U3RhdGUsIFsncm91dGVyJywgJ3VybCddLCBzdGFydGluZ1JvdXRlLCB7IGZyb21VcGRhdGU6IHRydWUgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV4dFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldChwYXRoOiBhbnlbXSwgc3RhdGVUb01lcmdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xyXG5cclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSBwcm9kdWNlKHN0YXRlLCAoZHJhZnRTdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW4oZHJhZnRTdGF0ZSwgcGF0aCwgc3RhdGVUb01lcmdlLCB7IGZyb21VcGRhdGU6IHRydWUgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV4dFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEN1cnNvcihzdGF0ZTogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyB8IGFueVtdKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JCYXNlKHN0YXRlLCBwcm9wZXJ0eVBhdGgsIChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgPyBzdGF0ZVtwcm9wZXJ0aWVzWzBdXVxyXG4gICAgICAgICAgICAgICAgOiBzdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFZhbHVlKHN0YXRlOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nIHwgYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocHJvcGVydHlQYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lcmdlKHN0YXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yQmFzZShzdGF0ZSwgcHJvcGVydHlQYXRoLCAoc3RhdGU6IGFueSwgcHJvcGVydGllczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlW3Byb3BlcnRpZXNbMF1dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3Vyc29yQmFzZShzdGF0ZTogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyB8IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0eVBhdGgpID8gcHJvcGVydHlQYXRoIDogcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0aWVzWzBdKSB8fCB0eXBlb2Ygc3RhdGVbcHJvcGVydGllc1swXV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yQmFzZShzdGF0ZVtwcm9wZXJ0aWVzWzBdXSwgcHJvcGVydGllcy5zbGljZSgxKSwgYWN0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKHN0YXRlLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvbnN0cnVjdG9yT2JqZWN0KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb25zdHJ1Y3RvckFycmF5KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleHRlbmQoc291cmNlOiBhbnksIHRhcmdldDogYW55LCBkZWVwOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29uc3RydWN0b3JBcnJheSh0YXJnZXRbcHJvcF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW3Byb3BdID0gWy4uLnRhcmdldFtwcm9wXV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZXAgJiYgdGhpcy5pc0NvbnN0cnVjdG9yT2JqZWN0KHRhcmdldFtwcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VbcHJvcF0gPSB0aGlzLmV4dGVuZChzb3VyY2VbcHJvcF0sIHRhcmdldFtwcm9wXSwgZGVlcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVtwcm9wXSA9IHRhcmdldFtwcm9wXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuICAgIH1cclxufSJdfQ==