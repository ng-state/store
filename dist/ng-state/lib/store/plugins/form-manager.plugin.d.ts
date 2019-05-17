import { Observable } from 'rxjs';
import { Store } from '../store';
export declare class NgFormStateManager {
    private unsubscribe;
    private form;
    private params;
    private store;
    private dataStrategy;
    private onChangeFn;
    private shouldUpdateStateFn;
    constructor(store: Store<any>);
    bind(form: FormGroupLike, params?: NgFormStateManagerParams): NgFormStateManager;
    reset(): void;
    destroy(): void;
    onChange(onChangeFn: (state: any) => void): this;
    shouldUpdateState(shouldUpdateStateFn: (params: ShoulUpdateStateParams) => boolean): this;
    private setInitialValue;
    private subscribeToFormChange;
    private executeUpdate;
    private onChangeCall;
}
export declare type FormGroupLike = {
    patchValue: Function;
    setValue: Function;
    value: any;
    get: Function;
    valueChanges: Observable<any>;
    controls: any;
};
export declare type NgFormStateManagerParams = {
    debounceTime?: number;
    emitEvent?: boolean;
};
export interface ShoulUpdateStateParams {
    form: FormGroupLike;
    state: any;
    value: any;
}
