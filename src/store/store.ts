import { ClearSignature, Clear } from './clear';
import { Select, SelectSignature } from './select';
import { Update, UpdateSignature } from './update';
import { Initialize, InitializeSignature } from './initialize';
import { Operator, Observable, Observer } from 'rxjs';
import { MapSgnature, Map } from './map';
import { ResetSignature, Reset } from './reset';
import { NgFormStateManager } from './plugins/form-manager.plugin';
import { PersistStateManager } from './plugins/persist-state.plugin';
import { take } from 'rxjs/operators';

export class Store<T> extends Observable<T> implements Observer<any> {
    statePath: any[];
    rootPath: any[];
    initialState: any;

    update: UpdateSignature<T>;
    initialize: InitializeSignature<T>;
    map: MapSgnature<T>;
    reset: ResetSignature;

    clear: ClearSignature = Clear.bind(this);

    form: NgFormStateManager;
    storage: PersistStateManager;

    constructor(state: Observable<any>) {
        super();

        this.source = state;
        this.initializeOperators(this);
    }

    select: SelectSignature = (statePath: string[]): Store<T> => {
        let selectStore = Select.bind(this).call(this, statePath);
        selectStore.statePath = !!this.statePath ? [...this.statePath, ...statePath] : statePath;
        selectStore.rootPath = this.rootPath;
        selectStore.initialState = this.initialState;
        this.initializeOperators(selectStore);
        return selectStore;
    }

    lift<R>(operator: Operator<T, R>): Store<R> {
        const store = new Store<R>(this);
        store.operator = operator;
        return store;
    }

    error(err: any) {
        console.log(err);
    }

    next(state: any) {
        (<any>this.source).next(state);
    }

    complete() {
    }

    initializeOperators(storeContext: Store<T>) {
        storeContext.update = Update.bind(storeContext);
        storeContext.initialize = Initialize.bind(storeContext);
        storeContext.reset = Reset.bind(storeContext);
        storeContext.map = Map.bind(storeContext);
        storeContext.form = new NgFormStateManager(storeContext);
        storeContext.storage = new PersistStateManager(storeContext);
    }
}