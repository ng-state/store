import { DataStrategy } from './data-strategy';
import { Map, fromJS, Collection, Iterable } from 'immutable';
import * as _Cursor from 'immutable/contrib/cursor';
import { Store } from '../store/store';
import { take } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';

export class ImmutableJsDataStrategy extends DataStrategy {

    getIn(state: Map<any, any>, path: any[]): Collection<any, any> {
        return state.getIn(path);
    }

    get(state: any, property: string) {
        return state.get(property);
    }

    clear(state: Map<any, any>) {
        return state.clear();
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

    update(path: any[], action: (state: any) => void, additionalData: any) {
        let currentState: Collection<any, any>;

        const store = ServiceLocator.injector.get(Store) as Store<any>;

        store.pipe(take(1))
            .subscribe(state => {
                currentState = state;
            });

        const cursor = _Cursor.from(currentState, path, (newData) => {
            store.next(newData);
        });

        if (additionalData.wrapToWithMutations) {
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

    private isNotImmutableObject(obj: any) {
        return obj !== null
            && typeof (obj) === 'object'
            && !Map.isMap(obj)
            && !Iterable.isIterable(obj);
    }
}