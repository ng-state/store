import { SelectSignature } from './select';
import { UpdateSignature } from './update';
import { InitializeSignature } from './initialize';
import { Operator, Observable, Observer } from 'rxjs';
import { MapSgnature } from './map';
import { ResetSignature } from './reset';
import { NgFormStateManager } from './plugins/form-manager.plugin';
import { PersistStateManager } from './plugins/persist-state.plugin';
export declare class Store<T> extends Observable<T> implements Observer<any> {
    statePath: any[];
    rootPath: any[];
    initialState: any;
    update: UpdateSignature<T>;
    initialize: InitializeSignature<T>;
    map: MapSgnature<T>;
    reset: ResetSignature;
    form: NgFormStateManager;
    storage: PersistStateManager;
    constructor(state: Observable<any>);
    select: SelectSignature;
    lift<R>(operator: Operator<T, R>): Store<R>;
    error(err: any): void;
    next(state: any): void;
    complete(): void;
    initializeOperators(storeContext: Store<T>): void;
}
