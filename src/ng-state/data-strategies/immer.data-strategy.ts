import { DataStrategy } from './data-strategy';
import * as _Cursor from 'immutable/contrib/cursor';
import produce from 'immer';
import deap from 'deap';
import { StateHistory } from '../state/history';
import { RouterState } from '../state/router-state';

export class ImmerDataStrategy extends DataStrategy {

    getIn(state: any, path: any[]): any {
        return this.getCursor(state, path);
    }

    get(state: any, property: string) {
        return state[property];
    }

    fromJS(data: any): any {
        return data;
    }

    toJS(data: any) {
        return data;
    }

    set(state: any, property: string, data: any) {
        state[property] = data;
        return state;
    }

    setIn(state: any, path: any[], data: any, additionalData: any = {}) {
        const action = (s: any, p: any, d: any) => {
            if (!this.setValue(s, p, d)) {
                throw new Error(`State was not set in ${path}`);
            }
        };

        if (additionalData.fromUpdate) {
            action(state, path, data);
        } else {
            return produce(state, (draftState: any) => {
                action(draftState, path, data);
            });
        }
    }

    merge(state: any, newState: any, path: any[], isRootPath: boolean) {
        const targetValue = this.getIn(state, path);

        if (this.isConstructorArray(targetValue)) {
            const newArray = [...targetValue, ...newState];
            this.setValue(state, path, newArray);
            return;
        }

        if (this.isConstructorObject(targetValue)) {
            const newObject = { ...targetValue, ...newState };
            if (isRootPath) {
                this.extend(true, state, newObject);
                // deap.update(state, newObject);
            } else {
                this.setValue(state, path, newObject);
            }

            return;
        }

        throw new Error(`${state} cannot be merged because type is not supported`);
    }

    update(path: any[], action: (state: any) => void) {
        const nextState = produce(this.currentState, (draftState: any) => {
            const cursor = this.getCursor(draftState, path);
            action(cursor);
        });

        this.store.next(nextState);
    }

    overrideContructor(obj: any) {
    }

    isObject(obj: any) {
        return obj !== null && typeof (obj) === 'object';
    }

    resetRoot() {
        const state = this.currentState;
        const router = this.get(state, 'router');

        const nextState = produce(StateHistory.initialState, (draftState: any) => {
            this.set(draftState, 'router', router);
            this.setIn(draftState, ['router', 'url'], RouterState.startingRoute, { fromUpdate: true });
        });

        this.store.next(nextState);
    }

    reset(path: any[]): void {
        const state = this.currentState;

        let initialState: any = !!this.store.initialState
            ? this.store.initialState
            : StateHistory.initialState;

        const stateToMerge = this.getIn(initialState, path);

        const nextState = produce(state, (draftState: any) => {
            this.setIn(draftState, path, stateToMerge, {fromUpdate: true});
        });

        this.store.next(nextState);
    }

    private getCursor(state: any, propertyPath: string | any[]): any {
        return this.cursorBase(state, propertyPath, (state: any, properties: any) => {
            return properties.length > 0
                ? state[properties[0]]
                : state;
        });
    }

    private setValue(state: any, propertyPath: string | any[], value: any): boolean {
        return this.cursorBase(state, propertyPath, (state: any, properties: any) => {
            if (properties.length > 0) {
                state[properties[0]] = value;
            } else {
                state = value;
            }
            // state[properties[0]] = value;
            return true;
        });
    }

    private cursorBase(state: any, propertyPath: string | any[], action: (state: any, properties: any) => any) {
        let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split('.');

        if (properties.length > 1) {
            if (!state.hasOwnProperty(properties[0]) || typeof state[properties[0]] !== 'object') {
                return null;
            }

            return this.cursorBase(state[properties[0]], properties.slice(1), action);
        } else {
            return action(state, properties);
        }
    }

    private isConstructorObject(obj: any) {
        return obj.constructor === Object;
    }

    private isConstructorArray(obj: any) {
        return obj.constructor === Array;
    }

    extend(deep: boolean, source: any, target: any) {

        // Merge the object into the extended object
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                if (deep && Object.prototype.toString.call(target[prop]) === '[object Object]') {
                    // If we're doing a deep merge and the property is an object
                    source[prop] = this.extend(deep, source[prop], target[prop]);
                } else {
                    // Otherwise, do a regular merge
                    source[prop] = target[prop];
                }
            }
        }

        return source;

    }
}