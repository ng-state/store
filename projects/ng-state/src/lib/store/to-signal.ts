import { Store } from './store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Signal, computed, type ValueEqualityFn } from '@angular/core';
import { DataStrategy } from '@ng-state/data-strategy';
import { ServiceLocator } from '../helpers/service-locator';

export class ToSignal {
    static execute<T>(store: Store<T>, options?: { equal?: ValueEqualityFn<T>; }): Signal<T> {
        const signal = toSignal(store, { manualCleanup: true, requireSync: true });
        const dataStrategy = ServiceLocator.injector.get(DataStrategy);

        return computed(() => signal(), {
            equal: options?.equal || ((previous, current) => dataStrategy.equals(previous, current)),
        });
    }
}