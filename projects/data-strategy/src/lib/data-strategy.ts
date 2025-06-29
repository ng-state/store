import { take } from 'rxjs/operators';
import { StoreLike } from './store-like';

export abstract class DataStrategy {

    rootStore: StoreLike<any>;

    abstract getIn(state: any, path: any[]): any;
    abstract merge(state: any, newState: any, path?: any[], isRootPath?: boolean): any;
    abstract update(path: any[], action: (state: any) => void, additionalSettings: UpdateActionAdditionalSettings): void;
    abstract fromJS(data: any): any;
    abstract toJS<T = any>(data: any): T;
    abstract set(state: any, property: string, data: any): any;
    abstract setIn(state: any, path: any[], data: any, additionalData?: AdditionalData): any;
    abstract isObject(state: any): any;
    abstract overrideConstructor(obj: any): any;
    abstract reset(path: any[], stateToMerge: any): void;
    abstract resetRoot(initialState: any, startingRoute?: string): void;
    abstract equals(objOne: any, objTwo: any): boolean;

    get currentState() {
        let currentState: any;

        this.rootStore.pipe(take(1))
            .subscribe(state => {
                currentState = state;
            });

        return currentState;
    }

    init(store: StoreLike<any>, isProd: boolean) {
        this.rootStore = store;
    }
}

export interface UpdateActionAdditionalSettings { }
export interface AdditionalData { fromUpdate?: boolean, fromReset?: boolean }