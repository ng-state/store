import { DataStrategy } from './data-strategy';
import * as _Cursor from 'immutable/contrib/cursor';
import { Store } from '../store/store';
import { take } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import produce from 'immer';

export class ImmerDataStrategy extends DataStrategy {

    getIn(state: any, path: any[]): any {
        return this.getCursor(state, path);
    }

    get(state: any, property: string) {
        return state[property];
    }

    clear(state: any) {
        if (!this.isObject(state)) {
            throw new Error(`${state} is not an object`);
        }

        if (state.constructor === Array) {
            state = [];
            return state;
        }

        if (state.__proto__.constructor = Object) {
            state = {};
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
        state[property] = data; // {...state, [property]: data};
        return state;
    }

    setIn(state: Map<any, any>, path: any[], data: any) {
        const nextState = produce(state, (draftState: any) => {
            if (!this.setValue(draftState, path, data)) {
                throw new Error(`State was not set in ${path}`);
            }
        });

        return nextState;
    }

    isObject(obj: any) {
        return obj !== null && typeof (obj) === 'object';
    }

    merge(state: any, newState: any) {
        const nextState = produce(state, (draftState: any) => {
            return { ...draftState, ...newState };
        });

        return nextState;
    }

    update(path: any[], action: (state: any) => void) {
        let currentState: any;

        const store = ServiceLocator.injector.get(Store) as Store<any>; // TODO: injectinti storus

        store.pipe(take(1))
            .subscribe(state => {
                currentState = state;
            });

        const nextState = produce(currentState, (draftState: any) => {
            const cursor = this.getCursor(draftState, path);
            action(cursor);
        });

        store.next(nextState);
    }

    overrideContructor(obj: any) {
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
}