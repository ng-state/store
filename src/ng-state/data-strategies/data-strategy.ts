export abstract class DataStrategy {
    abstract getIn(state: any, path: any[]): any;
    abstract get(state: any, property: string): any;
    abstract merge(state: any, newState: any): any;
    abstract clear(state: any): any;
    abstract update(path: any[], action: (state: any) => void, additionalData: any): void;
    abstract fromJS(data: any): any;
    abstract toJS(data: any): any;
    abstract set(state: any, property: string, data: any): any;
    abstract setIn(state: any, path: any[], data: any): any;
    abstract isObject(state: any): any;
    abstract overrideContructor(obj: any): any;
}