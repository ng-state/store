import { Store } from './store';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { map } from 'rxjs/operator/map';
import 'rxjs/add/operator/takeWhile';

export class Select {
    constructor(path: any) {
        let mapped$;

        if (typeof path === 'object') {
            mapped$ = map.call(this, (state: any) => state.getIn(path))
                .takeWhile((state: any) => state !== undefined);
        }
        else {
            throw new TypeError(`Unexpected type ${typeof path} in select operator,`
                + ` expected 'object' or 'function'`);
        }

        return distinctUntilChanged.call(mapped$);
    }
}

export interface SelectSignature {
  (path: string[]): Store<any>;
}