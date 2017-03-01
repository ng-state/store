import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

export class Select {
    constructor(path: any) {
        let mapped$;

        if (typeof path === 'object') {
            mapped$ = map.call(this, state => state.getIn(path));
        }
        else {
            throw new TypeError(`Unexpected type ${typeof path} in select operator,`
                + ` expected 'object' or 'function'`);
        }

        return distinctUntilChanged.call(mapped$);
    }
}

export interface SelectSignature {
  <R>(path: string[]): Observable<R>;
}