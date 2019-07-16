import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from './store';

export class Map {
    static execute<T>(store: Store<T>): MapSgnature<T> {
        const mapFunc = function <R>(action: (state: T) => R): Observable<R> {
            return store.pipe(map((state: any) => action(state)));
        };

        return mapFunc;
    }
}

export interface MapSgnature<T> {
    <R>(action: (state: T) => R): Observable<R>;
}