import { map, take, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subscription, Subject } from 'rxjs';
import { Store } from '../store';
import { Map, fromJS } from 'immutable';

export class NgFormStateManager {

    private unsubscribe = new Subject();
    private form: FormGroupLike;
    private params: NgFormStateManagerParams;
    private store: Store<any>;


    constructor(store: Store<any>) {
        this.store = store;
    }

    bind(form: FormGroupLike, params: NgFormStateManagerParams = {}) {
        this.form = form;
        this.params = { ... { debounceTime: 100, emitEvent: false }, ...params };
        this.setInitialValue(this.store);
        this.subscribeToFormChange(this.store);
    }

    reset() {
        this.store.reset();
    }

    destroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();

        this.form = null;
        this.store = null;
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
                    state.merge(fromJS(value));
                });
            });
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