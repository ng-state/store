import { Select, SelectSignature } from './select';
import { Update, UpdateSignature } from './update';
import { Initialize, InitializeSignature } from './initialize';
import { Operator, Observable, Observer } from 'rxjs';
import { MapSgnature, Map } from './map';
import { ResetSignature, Reset } from './reset';
import { NgFormStateManager } from './plugins/form-manager.plugin';
import { PersistStateManager } from './plugins/persist-state.plugin';
import { OptimistaicUpdatesManager } from './plugins/optimistic-updates.plugin';

export class Store<T> extends Observable<T> implements Observer<any> {
    statePath: any[] = [];
    rootPath: any[] = [];
    initialState: any;

    update: UpdateSignature<T>;
    initialize: InitializeSignature<T>;
    map: MapSgnature<T>;
    reset: ResetSignature;

    form: NgFormStateManager;
    storage: PersistStateManager;
    optimisticUpdates: OptimistaicUpdatesManager;

    constructor(state: Observable<any>) {
        super();

        this.source = state;
        this.initializeOperators(this);
    }

    select: SelectSignature = <T>(statePath: string[]): Store<T> => {
        let selectStore = Select.execute(this, statePath);
        selectStore.statePath = [...this.statePath, ...statePath];
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
        storeContext.update = Update.execute<T>(storeContext);
        storeContext.initialize = Initialize.execute<T>(storeContext);
        storeContext.reset = Reset.execute(storeContext);
        storeContext.map = Map.execute<T>(storeContext);
        storeContext.form = new NgFormStateManager(storeContext);
        storeContext.storage = new PersistStateManager(storeContext);
        storeContext.optimisticUpdates = new OptimistaicUpdatesManager(storeContext);
    }
}