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
        const router = state['router'];
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
     * @param {?} objOne
     * @param {?} objTwo
     * @return {?}
     */
    equals(objOne, objTwo) {
        throw new Error('Method not implemented.');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tZXIuZGF0YS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9pbW1lci1kYXRhLXN0cmF0ZWd5LyIsInNvdXJjZXMiOlsibGliL2ltbWVyLmRhdGEtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUIsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFlBQVk7Ozs7OztJQUUvQyxLQUFLLENBQUMsS0FBVSxFQUFFLElBQVc7UUFDekIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxJQUFTO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsSUFBUztRQUNWLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7SUFFRCxHQUFHLENBQUMsS0FBVSxFQUFFLFFBQWdCLEVBQUUsSUFBUztRQUN2QyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQVUsRUFBRSxJQUFXLEVBQUUsSUFBUyxFQUFFLGlCQUFzQixFQUFFOztjQUN4RCxNQUFNOzs7Ozs7UUFBRyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNuRDtRQUNMLENBQUMsQ0FBQTtRQUVELElBQUksY0FBYyxDQUFDLFVBQVUs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QyxDQUFDO2lCQUMvQjthQUNKO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhU3RyYXRlZ3kgfSBmcm9tICdAbmctc3RhdGUvZGF0YS1zdHJhdGVneSc7XHJcbmltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbW1lckRhdGFTdHJhdGVneSBleHRlbmRzIERhdGFTdHJhdGVneSB7XHJcblxyXG4gICAgZ2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1cnNvcihzdGF0ZSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnJvbUpTKGRhdGE6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgdG9KUyhkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQoc3RhdGU6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgc3RhdGVbcHJvcGVydHldID0gZGF0YTtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW4oc3RhdGU6IGFueSwgcGF0aDogYW55W10sIGRhdGE6IGFueSwgYWRkaXRpb25hbERhdGE6IGFueSA9IHt9KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gKHM6IGFueSwgcDogYW55LCBkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldFZhbHVlKHMsIHAsIGQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN0YXRlIHdhcyBub3Qgc2V0IGluICR7cGF0aH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChhZGRpdGlvbmFsRGF0YS5mcm9tVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbihzdGF0ZSwgcGF0aCwgZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2R1Y2Uoc3RhdGUsIChkcmFmdFN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihkcmFmdFN0YXRlLCBwYXRoLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKHN0YXRlOiBhbnksIG5ld1N0YXRlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0NvbnN0cnVjdG9yQXJyYXkoc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLnB1c2guYXBwbHkobmV3U3RhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0NvbnN0cnVjdG9yT2JqZWN0KHN0YXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmV4dGVuZChzdGF0ZSwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3N0YXRlfSBjYW5ub3QgYmUgbWVyZ2VkIGJlY2F1c2UgdHlwZSBpcyBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhdGg6IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcHJvZHVjZSh0aGlzLmN1cnJlbnRTdGF0ZSwgKGRyYWZ0U3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLmdldEN1cnNvcihkcmFmdFN0YXRlLCBwYXRoKTtcclxuICAgICAgICAgICAgYWN0aW9uKGN1cnNvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm9vdFN0b3JlLm5leHQobmV4dFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVycmlkZUNvbnRydWN0b3Iob2JqOiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICBpc09iamVjdChvYmo6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIChvYmopID09PSAnb2JqZWN0JztcclxuICAgIH1cclxuXHJcbiAgICByZXNldFJvb3QoaW5pdGlhbFN0YXRlOiBhbnksIHN0YXJ0aW5nUm91dGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XHJcbiAgICAgICAgY29uc3Qgcm91dGVyID0gc3RhdGVbJ3JvdXRlciddO1xyXG5cclxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSBwcm9kdWNlKGluaXRpYWxTdGF0ZSwgKGRyYWZ0U3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldChkcmFmdFN0YXRlLCAncm91dGVyJywgcm91dGVyKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbihkcmFmdFN0YXRlLCBbJ3JvdXRlcicsICd1cmwnXSwgc3RhcnRpbmdSb3V0ZSwgeyBmcm9tVXBkYXRlOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJvb3RTdG9yZS5uZXh0KG5leHRTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQocGF0aDogYW55W10sIHN0YXRlVG9NZXJnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZTtcclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcHJvZHVjZShzdGF0ZSwgKGRyYWZ0U3RhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEluKGRyYWZ0U3RhdGUsIHBhdGgsIHN0YXRlVG9NZXJnZSwgeyBmcm9tVXBkYXRlOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJvb3RTdG9yZS5uZXh0KG5leHRTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXF1YWxzKG9iak9uZTogYW55LCBvYmpUd286IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEN1cnNvcihzdGF0ZTogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyB8IGFueVtdKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJzb3JCYXNlKHN0YXRlLCBwcm9wZXJ0eVBhdGgsIChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgPyBzdGF0ZVtwcm9wZXJ0aWVzWzBdXVxyXG4gICAgICAgICAgICAgICAgOiBzdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFZhbHVlKHN0YXRlOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nIHwgYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocHJvcGVydHlQYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lcmdlKHN0YXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yQmFzZShzdGF0ZSwgcHJvcGVydHlQYXRoLCAoc3RhdGU6IGFueSwgcHJvcGVydGllczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlW3Byb3BlcnRpZXNbMF1dID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3Vyc29yQmFzZShzdGF0ZTogYW55LCBwcm9wZXJ0eVBhdGg6IHN0cmluZyB8IGFueVtdLCBhY3Rpb246IChzdGF0ZTogYW55LCBwcm9wZXJ0aWVzOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0eVBhdGgpID8gcHJvcGVydHlQYXRoIDogcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgaWYgKCFzdGF0ZS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0aWVzWzBdKSB8fCB0eXBlb2Ygc3RhdGVbcHJvcGVydGllc1swXV0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3Vyc29yQmFzZShzdGF0ZVtwcm9wZXJ0aWVzWzBdXSwgcHJvcGVydGllcy5zbGljZSgxKSwgYWN0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uKHN0YXRlLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvbnN0cnVjdG9yT2JqZWN0KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDb25zdHJ1Y3RvckFycmF5KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBleHRlbmQoc291cmNlOiBhbnksIHRhcmdldDogYW55LCBkZWVwOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29uc3RydWN0b3JBcnJheSh0YXJnZXRbcHJvcF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW3Byb3BdID0gWy4uLnRhcmdldFtwcm9wXV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlZXAgJiYgdGhpcy5pc0NvbnN0cnVjdG9yT2JqZWN0KHRhcmdldFtwcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VbcHJvcF0gPSB0aGlzLmV4dGVuZChzb3VyY2VbcHJvcF0sIHRhcmdldFtwcm9wXSwgZGVlcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVtwcm9wXSA9IHRhcmdldFtwcm9wXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuICAgIH1cclxufSJdfQ==