/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DataStrategy } from '@ng-state/data-strategy';
import produce from 'immer';
export class ImmerDataStrategy extends DataStrategy {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tZXIuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW1lci1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbWVyLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUIsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFlBQVk7Ozs7OztJQUUvQyxLQUFLLENBQUMsS0FBVSxFQUFFLElBQVc7UUFDekIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFFRCxHQUFHLENBQUMsS0FBVSxFQUFFLFFBQWdCO1FBQzVCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVM7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELElBQUksQ0FBQyxJQUFTO1FBQ1YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVELEdBQUcsQ0FBQyxLQUFVLEVBQUUsUUFBZ0IsRUFBRSxJQUFTO1FBQ3ZDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7Ozs7SUFFRCxLQUFLLENBQUMsS0FBVSxFQUFFLElBQVcsRUFBRSxJQUFTLEVBQUUsaUJBQXNCLEVBQUU7O2NBQ3hELE1BQU07Ozs7OztRQUFHLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixNQUFNLElBQUks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LENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQy9CO2FBQ0o7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuaW1wb3J0IHByb2R1Y2UgZnJvbSAnaW1tZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEltbWVyRGF0YVN0cmF0ZWd5IGV4dGVuZHMgRGF0YVN0cmF0ZWd5IHtcclxuXHJcbiAgICBnZXRJbihzdGF0ZTogYW55LCBwYXRoOiBhbnlbXSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3Vyc29yKHN0YXRlLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZVtwcm9wZXJ0eV07XHJcbiAgICB9XHJcblxyXG4gICAgZnJvbUpTKGRhdGE6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdG9KUyhkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgc3RhdGVbcHJvcGVydHldID0gZGF0YTtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10sIGRhdGE6IGFueSwgYWRkaXRpb25hbERhdGE6IGFueSA9IHt9KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gKHM6IGFueSwgcDogYW55LCBkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldFZhbHVlKHMsIHAsIGQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YXRlIHdhcyBub3Qgc2V0IGluICR7cGF0aH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChhZGRpdGlvbmFsRGF0YS5mcm9tVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbihzdGF0ZSwgcGF0aCwgZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2R1Y2Uoc3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihkcmFmdFN0YXRlLCBwYXRoLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKHN0YXRlOiBhbnksIG5ld1N0YXRlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0NvbnN0cnVjdG9yQXJyYXkoc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLnB1c2guYXBwbHkobmV3U3RhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0NvbnN0cnVjdG9yT2JqZWN0KHN0YXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmV4dGVuZChzdGF0ZSwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3N0YXRlfSBjYW5ub3QgYmUgbWVyZ2VkIGJlY2F1c2UgdHlwZSBpcyBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhdGg6IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcHJvZHVjZSh0aGlzLmN1cnJlbnRTdGF0ZSwgKGRyYWZ0U3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLmdldEN1cnNvcihkcmFmdFN0YXRlLCBwYXRoKTtcclxuICAgICAgICAgICAgYWN0aW9uKGN1cnNvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV4dFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVycmlkZUNvbnRydWN0b3Iob2JqOiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICBpc09iamVjdChvYmo6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIChvYmopID09PSAnb2JqZWN0JztcclxuICAgIH1cclxuXHJcbiAgICByZXNldFJvb3QoaW5pdGlhbFN0YXRlOiBhbnksIHN0YXJ0aW5nUm91dGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XHJcbiAgICAgICAgY29uc3Qgcm91dGVyID0gdGhpcy5nZXQoc3RhdGUsICdyb3V0ZXInKTtcclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcHJvZHVjZShpbml0aWFsU3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoZHJhZnRTdGF0ZSwgJ3JvdXRlcicsIHJvdXRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW4oZHJhZnRTdGF0ZSwgWydyb3V0ZXInLCAndXJsJ10sIHN0YXJ0aW5nUm91dGUsIHsgZnJvbVVwZGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb290U3RvcmUubmV4dChuZXh0U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KHBhdGg6IGFueVtdLCBzdGF0ZVRvTWVyZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHByb2R1Y2Uoc3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbihkcmFmdFN0YXRlLCBwYXRoLCBzdGF0ZVRvTWVyZ2UsIHsgZnJvbVVwZGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb290U3RvcmUubmV4dChuZXh0U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yKHN0YXRlOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nIHwgYW55W10pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnNvckJhc2Uoc3RhdGUsIHByb3BlcnR5UGF0aCwgKHN0YXRlOiBhbnksIHByb3BlcnRpZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvcGVydGllcy5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICAgICA/IHN0YXRlW3Byb3BlcnRpZXNbMF1dXHJcbiAgICAgICAgICAgICAgICA6IHN0YXRlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VmFsdWUoc3RhdGU6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcgfCBhbnlbXSwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eVBhdGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVyZ2Uoc3RhdGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JCYXNlKHN0YXRlLCBwcm9wZXJ0eVBhdGgsIChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc3RhdGVbcHJvcGVydGllc1swXV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJzb3JCYXNlKHN0YXRlOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nIHwgYW55W10sIGFjdGlvbjogKHN0YXRlOiBhbnksIHByb3BlcnRpZXM6IGFueSkgPT4gYW55KSB7XHJcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBBcnJheS5pc0FycmF5KHByb3BlcnR5UGF0aCkgPyBwcm9wZXJ0eVBhdGggOiBwcm9wZXJ0eVBhdGguc3BsaXQoJy4nKTtcclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBpZiAoIXN0YXRlLmhhc093blByb3BlcnR5KHByb3BlcnRpZXNbMF0pIHx8IHR5cGVvZiBzdGF0ZVtwcm9wZXJ0aWVzWzBdXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JCYXNlKHN0YXRlW3Byb3BlcnRpZXNbMF1dLCBwcm9wZXJ0aWVzLnNsaWNlKDEpLCBhY3Rpb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24oc3RhdGUsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ29uc3RydWN0b3JPYmplY3Qob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvbnN0cnVjdG9yQXJyYXkob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4dGVuZChzb3VyY2U6IGFueSwgdGFyZ2V0OiBhbnksIGRlZXA6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0YXJnZXQpIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb25zdHJ1Y3RvckFycmF5KHRhcmdldFtwcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VbcHJvcF0gPSBbLi4udGFyZ2V0W3Byb3BdXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVlcCAmJiB0aGlzLmlzQ29uc3RydWN0b3JPYmplY3QodGFyZ2V0W3Byb3BdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVtwcm9wXSA9IHRoaXMuZXh0ZW5kKHNvdXJjZVtwcm9wXSwgdGFyZ2V0W3Byb3BdLCBkZWVwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW3Byb3BdID0gdGFyZ2V0W3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG4gICAgfVxyXG59Il19