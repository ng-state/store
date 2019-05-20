import { produce, setAutoFreeze } from 'immer';
import { NgModule } from '@angular/core';
import { DataStrategy } from '@ng-state/data-strategy';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImmerDataStrategy extends DataStrategy {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImmerDataStrategyModule {
}
ImmerDataStrategyModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    { provide: DataStrategy, useClass: ImmerDataStrategy }
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ImmerDataStrategy, ImmerDataStrategyModule };

//# sourceMappingURL=ng-state-immer-data-strategy.js.map