import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class Map<T, R> {
    constructor(action: (state: any) => Observable<R>) {
        return (<any>this).pipe(map((state: any) => action(state)));
    }
}

export interface MapSgnature<T> {
    <R>(action: (state: T) => R): Observable<R>;
}