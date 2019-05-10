import { DataStrategy } from './data-strategy';
import * as _Cursor from 'immutable/contrib/cursor';
import { Store } from '../store/store';
import { take } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import produce from 'immer';

export class ImmerJsDataStrategy extends DataStrategy {

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
        return state[property] = data; // {...state, [property]: data};
    }

    setIn(state: Map<any, any>, path: any[], data: any) {
        return this.setValue(state, path, data);
    }

    isObject(obj: any) {
        return obj !== null && typeof (obj) === 'object';
    }

    merge(state: any, newState: any) {
        return { ...state, ...newState };
    }

    update(path: any[], action: (state: any) => void) {
        let currentState: any;

        const store = ServiceLocator.injector.get(Store) as Store<any>;

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

    private getCursor(state: any, propertyPath: string | any[]) {
        this.cursorBase(state, propertyPath, (state: any, properties: any) => {
            return state[properties[0]];
        });
    }

    private setValue(state: any, propertyPath: string | any[], value: any) {
        this.cursorBase(state, propertyPath, (state: any, properties: any) => {
            state[properties[0]] = value;
            return true;
        });
    }

    private cursorBase(state: any, propertyPath: string | any[], action: (state: any, properties: any) => any) {
        let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split('.');

        if (properties.length > 1) {
            if (!state.hasOwnProperty(properties[0]) || typeof state[properties[0]] !== 'object') {
                throw new Error(`No such path exists: ${propertyPath}`);
            }

            return this.setValue(state[properties[0]], properties.slice(1), action);
        } else {
            return action(state, properties);
        }
    }
}