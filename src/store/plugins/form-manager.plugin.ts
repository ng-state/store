import { map, take, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subscription, Subject } from 'rxjs';
import { Store } from '../store';
import { Map, fromJS } from 'immutable';

export class NgFormStateManager {

    private unsubscribe = new Subject();
    private form: FormGroupLike;
    private params: NgFormStateManagerParams;
    private store: Store<any>;

    private onChangeFn: (state: any) => void;
    private shouldUpdateStateFn: (params: ShoulUpdateStateParams) => boolean;

    constructor(store: Store<any>) {
        this.store = store;
    }

    bind(form: FormGroupLike, params: NgFormStateManagerParams = {}): NgFormStateManager {
        this.form = form;
        this.params = { ... { debounceTime: 100, emitEvent: false }, ...params };
        this.setInitialValue(this.store);
        this.subscribeToFormChange(this.store);

        return this;
    }

    reset() {
        this.store.reset();
    }

    destroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();

        this.form = null;
        this.store = null;
        this.onChangeFn = null;
        this.shouldUpdateStateFn = null;
    }

    onChange(onChangeFn: (state: any) => void) {
        this.onChangeFn = onChangeFn;
        return this;
    }

    shouldUpdateState(shouldUpdateStateFn: (params: ShoulUpdateStateParams) => boolean) {
        this.shouldUpdateStateFn = shouldUpdateStateFn;
        return this;
    }

    private setInitialValue(store: Store<any>) {
        store
            .pipe(
                distinctUntilChanged(),
                takeUntil(this.unsubscribe)
            )
            .subscribe((state: Map<any, any>) => {
                this.form.patchValue(state.toJS(), { emitEvent: this.params.emitEvent });
            });
    }

    private subscribeToFormChange(store: Store<any>) {
        this.form.valueChanges
             .pipe(
                debounceTime(this.params.debounceTime),
                distinctUntilChanged(),
                takeUntil(this.unsubscribe)
            )
            .subscribe(value => {
                store.update((state: Map<any, any>) => {
                    this.executeUpdate(value, state);
                });
            });
    }

    private executeUpdate(value: any, state: any) {
        if (this.shouldUpdateStateFn) {
            if (this.shouldUpdateStateFn({
                form: this.form,
                state: state,
                value: value
            })) {
                state.merge(fromJS(value));
                this.onChangeCall(state);
            }
        } else {
            state.merge(fromJS(value));
            this.onChangeCall(state);
        }
    }

    private onChangeCall(state: any) {
        this.onChangeFn && this.onChangeFn(state);
    }
}

export type FormGroupLike = {
    patchValue: Function;
    setValue: Function;
    value: any;
    get: Function;
    valueChanges: Observable<any>;
    controls: any;
};

export type NgFormStateManagerParams = {
    debounceTime?: number;
    emitEvent?: boolean;
};

export interface ShoulUpdateStateParams {
    form: FormGroupLike;
    state: any;
    value: any;
}