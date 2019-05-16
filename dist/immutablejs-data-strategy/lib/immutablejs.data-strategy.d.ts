import { DataStrategy } from '@ng-state/data-strategy';
import { Map, Collection } from 'immutable';
export declare class ImmutableJsDataStrategy extends DataStrategy {
    getIn(state: Map<any, any>, path: any[]): Collection<any, any>;
    get(state: any, property: string): any;
    fromJS(data: any): Collection<any, any>;
    toJS(data: Collection<any, any>): any;
    set(state: Map<any, any>, property: string, data: any): Map<any, any>;
    setIn(state: Map<any, any>, path: any[], data: any): Map<any, any>;
    isObject(state: any): boolean;
    merge(state: any, newState: any): any;
    update(path: any[], action: (state: any) => void): void;
    overrideContructor(obj: any): void;
    resetRoot(initialState: any, startingRoute: string): void;
    reset(path: any[], stateToMerge: any): void;
    private isNotImmutableObject;
}
