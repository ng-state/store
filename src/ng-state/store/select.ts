import { Store } from './store';
import { map, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '../data-strategies/data-strategy';

export class Select {
    constructor(path: any) {
        let mapped$;

        const dataStrategy = ServiceLocator.injector.get(DataStrategy);

        if (typeof path === 'object') {
            mapped$ = (<any>this).pipe(
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
  (path: any[]): Store<any>;
}