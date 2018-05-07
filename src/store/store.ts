import { ClearSignature, Clear } from './clear';
import { Select, SelectSignature } from './select';
import { Update, UpdateSignature } from './update';
import { Initialize, InitializeSignature } from './initialize';
import { Operator, Observable, Observer } from 'rxjs';
import { MapSgnature, Map } from './map';

export class Store<T> extends Observable<T> implements Observer<any> {
    constructor(state: Observable<any>) {
        super();

        this.source = state;
    }

    select: SelectSignature = (statePath: string[]): Store<T> => {
        let selectStore = Select.bind(this).call(this, statePath);
        (<any>selectStore).statePath = statePath;
        return selectStore;
    }

    update: UpdateSignature<T> = Update.bind(this);
    initialize: InitializeSignature<T> = Initialize.bind(this);
    clear: ClearSignature = Clear.bind(this);
    map: MapSgnature<T> = Map.bind(this);

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
}