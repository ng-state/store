import { map, take, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subscription, Subject } from 'rxjs';
import { Store } from '../store';
import { Map, fromJS } from 'immutable';

export class NgFormStateManager {

    private unsubscribe = new Subject();
    private form: FormGroupLike;
    private params: NgFormStateManagerParams;

    reset: () => void;

    constructor(form: FormGroupLike, params: NgFormStateManagerParams = {}) {
        this.form = form;
        this.params = { ... { debounceTime: 100, emitEvent: false }, ...params };

        this.setInitialValue.bind(this)(this);
        this.subscribeToFormChange.bind(this)(this);
        this.destroy.bind(this);

        return this;
    }

    destroy = () => {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();

        this.form = null;
    }

    private setInitialValue = (store: Store<any>) => {
        store
            .pipe(
                distinctUntilChanged(),
                takeUntil(this.unsubscribe)
                )
            .subscribe((state: Map<any, any>) => {
                this.form.patchValue(state.toJS(), { emitEvent: this.params.emitEvent });
            });
    }

    private subscribeToFormChange = (store: Store<any>) => {
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

export interface NgFormStateManagerSgnature {
    (form: FormGroupLike, params?: NgFormStateManagerParams): NgFormStateManager;
}