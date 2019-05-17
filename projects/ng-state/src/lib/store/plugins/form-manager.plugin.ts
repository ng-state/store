import { distinctUntilChanged, debounceTime, takeUntil, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Store } from '../store';
import { DataStrategy } from '@ng-state/data-strategy';
import { ServiceLocator } from '../../helpers/service-locator';

export class NgFormStateManager {

    private unsubscribe = new Subject();
    private form: FormGroupLike;
    private params: NgFormStateManagerParams;
    private store: Store<any>;
    private dataStrategy: DataStrategy;

    private onChangeFn: (state: any) => void;
    private shouldUpdateStateFn: (params: ShoulUpdateStateParams) => boolean;

    constructor(store: Store<any>) {
        this.store = store;
    }

    bind(form: FormGroupLike, params: NgFormStateManagerParams = {}): NgFormStateManager {
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.form = form;
        this.params = { ... { debounceTime: 100, emitEvent: false }, ...params };
        this.setInitialValue();
        this.subscribeToFormChange();

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

    private setInitialValue() {
        this.store
            .pipe(
                distinctUntilChanged(),
                takeUntil(this.unsubscribe)
            )
            .subscribe((state: any) => {
                this.form.patchValue(this.dataStrategy.toJS(state), { emitEvent: this.params.emitEvent });
            });
    }

    private subscribeToFormChange() {

        this.form.valueChanges
            .pipe(
                debounceTime(this.params.debounceTime),
                distinctUntilChanged(),
                takeUntil(this.unsubscribe)
            )
            .subscribe(value => {
                let stateUpdated = false;

                this.store.update((state: any) => {
                    stateUpdated = this.executeUpdate(value, state);
                });

                if (stateUpdated) {
                    this.onChangeCall();
                }
            });
    }

    private executeUpdate(value: any, state: any): boolean {
        if (this.shouldUpdateStateFn) {
            if (this.shouldUpdateStateFn({
                form: this.form,
                state: state,
                value: value
            })) {
                this.dataStrategy.merge(state, this.dataStrategy.fromJS(value));
                return true;
            }
        } else {
            this.dataStrategy.merge(state, this.dataStrategy.fromJS(value));
            return true;
        }

        return false;
    }

    private onChangeCall() {
        if (this.onChangeFn) {
            this.store
                .pipe(take(1))
                .subscribe(state => {
                    this.onChangeFn(this.dataStrategy.toJS(state));
                });
        }
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