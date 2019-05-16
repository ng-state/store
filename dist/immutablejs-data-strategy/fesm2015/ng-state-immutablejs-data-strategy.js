import { Map, fromJS, Iterable } from 'immutable';
import { from } from 'immutable/contrib/cursor';
import { NgModule } from '@angular/core';
import { DataStrategy } from '@ng-state/data-strategy';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImmutableJsDataStrategy extends DataStrategy {
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
        const cursor = from(this.currentState, path, (/**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImmutableJsDataStrategyModule {
}
ImmutableJsDataStrategyModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    { provide: DataStrategy, useClass: ImmutableJsDataStrategy }
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

export { ImmutableJsDataStrategy, ImmutableJsDataStrategyModule };

//# sourceMappingURL=ng-state-immutablejs-data-strategy.js.map