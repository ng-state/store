import { distinctUntilChanged, debounceTime, takeUntil, take, filter, startWith, pairwise } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Store } from '../store';
import { DataStrategy } from '@ng-state/data-strategy';
import { ServiceLocator } from '../../helpers/service-locator';

export class NgFormStateManager {

    private unsubscribe: Subject<boolean> | null;
    private form: FormGroupLike;
    private params: NgFormStateManagerParams;
    private store: Store<any>;
    private dataStrategy: DataStrategy;

    private onChangeFn: (state: any | any[]) => void;
    private shouldUpdateStateFn: (params: ShouldUpdateStateParams) => boolean;

    private propertyChanges: { [key: string]: (currentVal: any, prevVal: any) => void } = {};

    constructor(store: Store<any>) {
        this.store = store;
    }

    bind(form: FormGroupLike, params: NgFormStateManagerParams = {}): NgFormStateManager {
        this.unsubscribe = new Subject<boolean>();
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
        this.onChangeFn = null;
        this.shouldUpdateStateFn = null;
        this.propertyChanges = {};
    }

    onChange(onChangeFn: (state: any | any[]) => void) {
        this.onChangeFn = onChangeFn;
        return this;
    }

    onPropertyChange<
        TState = any,
        K extends Extract<keyof TState, string> = Extract<keyof TState, string>
    >(
        property: K,
        callback: (currentVal: TState extends any ? any : TState[K], prevVal: TState extends any ? any : TState[K]) => void
    ) {
        this.propertyChanges[property] = callback;
        return this;
    }

    shouldUpdateState(shouldUpdateStateFn: (params: ShouldUpdateStateParams) => boolean) {
        this.shouldUpdateStateFn = shouldUpdateStateFn;
        return this;
    }

    private setInitialValue() {
        this.store
            .pipe(
                startWith(undefined),
                pairwise(),
                distinctUntilChanged(),
                takeUntil(this.unsubscribe),
            )
            .subscribe(([previousValue, currentValue]) => {
                const equals = this.dataStrategy.equals(previousValue, currentValue);
                if (!equals) {
                    this.form.patchValue(this.dataStrategy.toJS(currentValue), { emitEvent: this.params.emitEvent });
                }
            });
    }

    private subscribeToFormChange() {
        let lastState: any;

        this.form.valueChanges
            .pipe(
                debounceTime(this.params.debounceTime),
                distinctUntilChanged(),
                this.distinctUntilNotEqual(),
                takeUntil(this.unsubscribe)
            )
            .subscribe(value => {
                let stateUpdated = false;

                if (this.params.onChangePairwise || Object.keys(this.propertyChanges).length > 0) {
                    lastState = this.store.snapshot();
                }

                this.store.update((state: any) => {
                    stateUpdated = this.executeUpdate(value, state);
                });

                if (stateUpdated) {
                    this.onChangeCall(lastState);
                    this.notifyPropertyChanges(lastState);
                }
            });
    }

    private distinctUntilNotEqual() {
        return <T>(source: Observable<T>): Observable<T> => {
            return source.pipe(filter(value => {
                let isEqual = false;
                this.store
                    .pipe(take(1))
                    .subscribe(state => {
                        isEqual = this.dataStrategy.equals(this.dataStrategy.fromJS(value), state);
                    });

                return !isEqual;
            }));
        };
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

    private onChangeCall(oldState: any) {
        if (!this.onChangeFn) {
            return;
        }

        const snapshot = this.dataStrategy.toJS(this.store.snapshot());

        if (this.params.onChangePairwise) {
            this.onChangeFn([this.dataStrategy.toJS(oldState), snapshot]);
            return;
        }

        this.onChangeFn(snapshot);
    }

    private notifyPropertyChanges(oldState: any) {
        if (Object.keys(this.propertyChanges).length === 0) {
            return;
        }

        const currentState = this.store.snapshot();

        for (const property in this.propertyChanges) {
            if (this.propertyChanges.hasOwnProperty(property)) {
                const currentVal = currentState?.[property];
                const prevVal = oldState?.[property];

                if (!this.dataStrategy.equals(currentVal, prevVal)) {
                    this.propertyChanges[property](currentVal, prevVal);
                }
            }
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
    onChangePairwise?: boolean;
};

export interface ShouldUpdateStateParams {
    form: FormGroupLike;
    state: any;
    value: any;
}