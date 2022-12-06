import { Select, SelectSignature } from './select';
import { Update, UpdateSignature } from './update';
import { Initialize, InitializeSignature } from './initialize';
import { Operator, Observable, Observer } from 'rxjs';
import { MapSgnature, Map } from './map';
import { ResetSignature, Reset } from './reset';
import { Snapshot } from './snapshot';
import { NgFormStateManager } from './plugins/form-manager.plugin';
import { PersistStateManager } from './plugins/persist-state.plugin';
import { OptimisticUpdatesManager } from './plugins/optimistic-updates.plugin';

export class Store<T> extends Observable<T> implements Observer<any> {
    statePath: any[] = [];
    rootPath: any[] = [];
    initialState: any;

    update: UpdateSignature<T>;
    initialize: InitializeSignature<T>;
    map: MapSgnature<T>;
    reset: ResetSignature;
    snapshot: any;

    form: NgFormStateManager;
    storage: PersistStateManager;
    optimisticUpdates: OptimisticUpdatesManager;

    constructor(state: Observable<any>, private isProd: any) {
        super();

        this.source = state;
        this.initializeOperators(this);
    }

    select: SelectSignature = <T = any>(statePath: string[]): Store<T> => {
        let selectStore = Select.execute(this, statePath);
        selectStore.statePath = [...this.statePath, ...statePath];
        selectStore.rootPath = this.rootPath;
        selectStore.initialState = this.initialState;
        this.initializeOperators(selectStore);
        return selectStore;
    }

    lift<R>(operator: Operator<T, R>): Store<R> {
        const store = new Store<R>(this, this.isProd);
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
        storeContext.snapshot = (): T => Snapshot.execute<T>(storeContext);
        storeContext.form = new NgFormStateManager(storeContext);
        storeContext.storage = new PersistStateManager(storeContext, this.isProd);
        storeContext.optimisticUpdates = new OptimisticUpdatesManager(storeContext);
    }
}