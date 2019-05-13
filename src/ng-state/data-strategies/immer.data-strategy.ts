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

    clear(state: any, path: any[]) {
        const targetValue = this.getIn(state, path);

        if (!this.isObject(targetValue)) {
            throw new Error(`${targetValue} is not an object`);
        }

        if (this.isConstructorArray(targetValue)) {
            this.setValue(state, path, []);
            return;
        }

        if (this.isConstructorObject(targetValue)) {
            this.setValue(state, path, {});
            return state;
        }

        throw new Error(`${state} cannot be cleared because type is not supported`);
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

    merge(state: any, newState: any) {
        const action = (s: any, ns: any) => {
            if (this.isConstructorArray(s)) {
                // s = [...s,];
                s.push.apply(s, ns);
            }

            if (this.isConstructorObject(state)) {
                deap.update(s, ns);
            }
        };

        action(state, newState);
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

    reset(path: any[], isRootPath: boolean): void {
        const state = this.currentState;

        let router = '';
        if (isRootPath) {
            router = this.get(state, 'router');
        }

        let initialState: any = !!this.store.initialState
            ? this.store.initialState
            : StateHistory.initialState;

        const stateToMerge = this.getIn(initialState, path);

        const nextState = produce(state, (draftState: any) => {
            this.clear(draftState, path);
            this.merge(draftState, stateToMerge);

            if (isRootPath) {
                this.set(state, 'router', router);
                this.setIn(state, ['router', 'url'], RouterState.startingRoute, { fromUpdate: true });
            }
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
           /*  if (properties.length > 0) {
                state[properties[0]] = value;
            } else {
                state = value;
            } */
            state[properties[0]] = value;
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
}