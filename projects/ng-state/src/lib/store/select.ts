import { Store } from './store';
import { map, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';

export class Select {
    static execute(store: Store<any>, path: any) {
        let mapped$: any;

        const dataStrategy = ServiceLocator.injector.get(DataStrategy);

        if (typeof path === 'object') {
            mapped$ = store.pipe(
                map((state: any) => dataStrategy.getIn(state, path)),
                takeWhile((state: any) => state !== undefined),
                distinctUntilChanged()
            );
        }
        else {
            throw new TypeError(`Unexpected type ${typeof path} in select operator,`
                + ` expected 'object' or 'function'`);
        }

        return mapped$;
    }
}

export interface SelectSignature {
  <T>(path: any[]): Store<T>;
}