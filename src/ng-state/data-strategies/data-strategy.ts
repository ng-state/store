import { Store } from '../store/store';
import { take } from 'rxjs/operators';

export abstract class DataStrategy {

    protected store: Store<any>;

    abstract getIn(state: any, path: any[]): any;
    abstract get(state: any, property: string): any;
    abstract merge(state: any, newState: any, path?: any[], isRootPath?: boolean): any;
    abstract update(path: any[], action: (state: any) => void): void;
    abstract fromJS(data: any): any;
    abstract toJS(data: any): any;
    abstract set(state: any, property: string, data: any): any;
    abstract setIn(state: any, path: any[], data: any, additionalData?: { fromUpdate: boolean }): any;
    abstract isObject(state: any): any;
    abstract overrideContructor(obj: any): any;
    abstract reset(path: any[], isRootPath: boolean): void;
    abstract resetRoot(): void;

    protected get currentState() {
        let currentState: any;

        this.store.pipe(take(1))
            .subscribe(state => {
                currentState = state;
            });

        return currentState;
    }

    init(store: Store<any>) {
        this.store = store;
    }
}