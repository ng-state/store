import { DataStrategy, UpdateActionAdditionalSettings } from '@ng-state/data-strategy';
import { Map, fromJS, Collection, isMap, isCollection } from 'immutable';
import * as Cursor from 'immutable-cursor';

export class ImmutableJsDataStrategy extends DataStrategy {

    getIn(state: Map<any, any>, path: any[]): Collection<any, any> {
        return state.getIn(path) as Collection<any, any> ;
    }

    fromJS(data: any): Collection<any, any> {
        return fromJS(data);
    }

    toJS<T = any>(data: Collection<any, any>) : T {
        return data.toJS() as T;
    }

    set(state: Map<any, any>, property: string, data: any) {
        return state.set(property, data);
    }

    setIn(state: Map<any, any>, path: any[], data: any) {
        return state.setIn(path, data);
    }

    isObject(state: any) {
        return isMap(state) || isCollection(state);
    }

    merge(state: any, newState: any) {
        return state.merge(fromJS(newState));
    }

    update(path: any[], action: (state: any) => void, additionalSettings: ImmutableUpdateActionAdditionalSettings = { withMutations: false }) {
        const cursor = Cursor.from(this.currentState, path, (newData) => {
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

    overrideConstructor(obj: any) {
        if (this.isNotImmutableObject(obj)) { // from ImmutableJs 4 breaking change isIterable => isCollection
            if (obj.constructor === Array) {
                for (let i = 0; i < obj.length; i++) {
                    this.overrideConstructor(obj[i]);
                }
            } else {
                obj.__proto__.constructor = Object;
                for (let key in obj) {
                    this.overrideConstructor(obj[key]);
                }
            }
        }
    }

    resetRoot(initialState: any, startingRoute: string = null): void {
        const state = this.currentState;

        const router = state.get('router') || this.fromJS({});

        this.update([], (state: any) => {
            state.clear();
            state.merge(fromJS(initialState));

            if (startingRoute !== null) {
                state.set('router', router);
                state.setIn(['router', 'url'], startingRoute, { fromUpdate: true });
            }
        }, { withMutations: true });
    }

    reset(path: any[], stateToMerge: any): void {
        this.update(path, (state: any) => {
            state.clear();
            state.merge(fromJS(stateToMerge));
        }, { withMutations: true });
    }

    equals(objOne: Map<any, any>, objTwo: Map<any, any>): boolean {
        if(!objOne || !objTwo) {
            return false;
        }

        if(this.isObject(objOne) && this.isObject(objTwo)) {
            return objOne.equals(objTwo);
        }

        return objOne === objTwo;
    }

    private isNotImmutableObject(obj: any) {
        return obj !== null
            && typeof (obj) === 'object'
            && !isMap(obj)
            && !isCollection(obj);
    }
}

export interface ImmutableUpdateActionAdditionalSettings extends UpdateActionAdditionalSettings {
    withMutations?: boolean;
}