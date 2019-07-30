import { DataStrategy, UpdateActionAdditionalSettings } from '@ng-state/data-strategy';
import { Map, fromJS, Collection, Iterable } from 'immutable';
import * as _Cursor from 'immutable/contrib/cursor';

export class ImmutableJsDataStrategy extends DataStrategy {

    getIn(state: Map<any, any>, path: any[]): Collection<any, any> {
        return state.getIn(path);
    }

    fromJS(data: any): Collection<any, any> {
        return fromJS(data);
    }

    toJS(data: Collection<any, any>) {
        return data.toJS();
    }

    set(state: Map<any, any>, property: string, data: any) {
        return state.set(property, data);
    }

    setIn(state: Map<any, any>, path: any[], data: any) {
        return state.setIn(path, data);
    }

    isObject(state: any) {
        return Map.isMap(state) || Iterable.isIterable(state);
    }

    merge(state: any, newState: any) {
        return state.merge(newState);
    }

    update(path: any[], action: (state: any) => void, additionalSettings: ImmutableUpdateActionAdditionalSettings = { withMutations: false }) {
        const cursor = _Cursor.from(this.currentState, path, (newData) => {
            this.rootStore.next(newData);
        });

        if (additionalSettings.withMutations) {
            cursor.withMutations((state: any) => {
                action(state);
            });
        } else {
            action(cursor);
        }
    }

    overrideContructor(obj: any) {
        if (this.isNotImmutableObject(obj)) { // from ImmutableJs 4 breaking change isIterable => isCollection
            if (obj.constructor === Array) {
                for (let i = 0; i < obj.length; i++) {
                    this.overrideContructor(obj[i]);
                }
            } else {
                obj.__proto__.constructor = Object;
                for (let key in obj) {
                    this.overrideContructor(obj[key]);
                }
            }
        }
    }

    resetRoot(initialState: any, startingRoute: string = null): void {
        const state = this.currentState;

        const router = state.get('router');

        this.update([], (state: any) => {
            state.clear();
            state.merge(initialState);

            if (startingRoute !== null) {
                state.set('router', router);
                state.setIn(['router', 'url'], startingRoute, { fromUpdate: true });
            }
        }, { withMutations: true });
    }

    reset(path: any[], stateToMerge: any): void {
        this.update(path, (state: any) => {
            state.clear();
            state.merge(stateToMerge);
        }, { withMutations: true });
    }

    equals(objOne: any, objTwo: any): boolean {
        throw new Error('Method not implemented.');
    }

    private isNotImmutableObject(obj: any) {
        return obj !== null
            && typeof (obj) === 'object'
            && !Map.isMap(obj)
            && !Iterable.isIterable(obj);
    }
}

export interface ImmutableUpdateActionAdditionalSettings extends UpdateActionAdditionalSettings {
    withMutations?: boolean;
}