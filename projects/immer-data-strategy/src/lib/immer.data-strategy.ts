import { DataStrategy, AdditionalData } from '@ng-state/data-strategy';
import { produce, setAutoFreeze } from 'immer';
import fastEqual from 'fast-deep-equal';
import deepEqual from 'deep-equal';

export class ImmerDataStrategy extends DataStrategy {
    init(store: any, isProd: boolean) {
        super.init(store, isProd);
        setAutoFreeze(false);
    }

    getIn(state: any, path: any[]): any {
        return this.getCursor(state, path);
    }

    fromJS(data: any): any {
        return data;
    }

    toJS(data: any) {
        return data;
    }

    set(state: any, property: string, data: any) {
        return produce(state, (draftState: any) => {
            draftState[property] = data;
        });
    }

    setIn(state: any, path: any[], data: any, additionalData: AdditionalData = {}) {
        const action = (s: any, p: any, d: any, k: any) => {
            if (!this.setValue(s, p, d, k)) {
                throw new Error(`State was not set in ${path}`);
            }
        };

        if (additionalData.fromUpdate) {
            action(state, path, data, additionalData);
        } else {
            return produce(state, (draftState: any) => {
                action(draftState, path, data, additionalData);
            });
        }
    }

    merge(state: any, newState: any) {
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

    update(path: any[], action: (state: any) => void) {
        const nextState = produce(this.currentState, (draftState: any) => {
            const cursor = this.getCursor(draftState, path);
            action(cursor);
        });

        this.rootStore.next(nextState);
    }

    overrideConstructor(obj: any) {
    }

    isObject(obj: any) {
        return obj !== null && typeof (obj) === 'object';
    }

    resetRoot(initialState: any, startingRoute: string = null) {
        const state = this.currentState;
        const router = { ...state['router'] };

        const nextState = produce(initialState, (draftState: any) => {
            if (startingRoute !== null) {
                draftState['router'] = router;
                this.setIn(draftState, ['router', 'url'], startingRoute, { fromUpdate: true, fromReset: true });
            }
        });

        this.rootStore.next(nextState);
    }

    reset(path: any[], stateToMerge: any): void {
        const state = this.currentState;

        const nextState = produce(state, (draftState: any) => {
            this.setIn(draftState, path, stateToMerge, { fromUpdate: true, fromReset: true });
        });

        this.rootStore.next(nextState);
    }

    equals(objOne: any, objTwo: any): boolean {
        if (this.hasMapOrSet(objOne) || this.hasMapOrSet(objTwo)) {
            return deepEqual(objOne, objTwo);
        }
        return fastEqual(objOne, objTwo);
    }

    private hasMapOrSet(x: any): boolean {
        if (x instanceof Map || x instanceof Set) {
            return true;
        }

        if (typeof x !== 'object' || x === null) {
            return false;
        }

        return Object.values(x).some(v => this.hasMapOrSet(v));
    }

    private getCursor(state: any, propertyPath: string | any[]): any {
        return this.cursorBase(state, propertyPath, (state: any, properties: any) => {
            return properties.length > 0
                ? state[properties[0]]
                : state;
        });
    }

    private setValue(state: any, propertyPath: string | any[], value: any, additionalData: AdditionalData = {}): boolean {
        if (propertyPath.length === 0) {
            this.merge(state, value);
            return true;
        }

        return this.cursorBase(state, propertyPath, (state: any, properties: any) => {
            if (!additionalData.fromReset && state[properties[0]] && this.isConstructorObject(state[properties[0]])) {
                this.merge(state[properties[0]], value);
            } else {
                state[properties[0]] = value;
            }
            return true;
        });
    }

    private cursorBase(state: any, propertyPath: string | any[], action: (state: any, properties: any) => any) {
        let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split('.');

        if (properties.length > 1) {
            const currentKey = properties[0];
            if (!state.hasOwnProperty(currentKey) || typeof state[currentKey] !== 'object') {
                state[currentKey] = {};
            }

            return this.cursorBase(state[currentKey], properties.slice(1), action);
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

    private isPropertyDefined(obj: any) {
        return obj !== null && obj !== undefined;
    }

    private extend(source: any, target: any, deep: boolean = true) {
        if (!source) {
            source = {};
        }

        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                if (this.isPropertyDefined(target[prop]) && this.isConstructorArray(target[prop])) {
                    source[prop] = [...target[prop]];
                } else if (this.isPropertyDefined(target[prop]) && deep && this.isConstructorObject(target[prop])) {
                    source[prop] = this.extend(source[prop], target[prop], deep);
                } else {
                    source[prop] = target[prop];
                }
            }
        }
        return source;
    }
}
