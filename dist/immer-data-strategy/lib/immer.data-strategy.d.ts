import { DataStrategy } from '@ng-state/data-strategy';
export declare class ImmerDataStrategy extends DataStrategy {
    getIn(state: any, path: any[]): any;
    fromJS(data: any): any;
    toJS(data: any): any;
    set(state: any, property: string, data: any): any;
    setIn(state: any, path: any[], data: any, additionalData?: any): <Base extends (draftState: any) => void>(base?: Base, ...rest: unknown[]) => any;
    merge(state: any, newState: any): void;
    update(path: any[], action: (state: any) => void): void;
    overrideContructor(obj: any): void;
    isObject(obj: any): boolean;
    resetRoot(initialState: any, startingRoute: string): void;
    reset(path: any[], stateToMerge: any): void;
    equals(objOne: any, objTwo: any): boolean;
    private getCursor;
    private setValue;
    private cursorBase;
    private isConstructorObject;
    private isConstructorArray;
    private extend;
}
