import { take } from 'rxjs/operators';
import { Store } from './store';

export class Snapshot {
    static execute<T>(store: Store<T>): T {
        let value: T;
        store.pipe(take(1)).subscribe((v: T) => value = v);

        return value;
    }
}