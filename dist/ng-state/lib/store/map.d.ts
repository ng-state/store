import { Observable } from 'rxjs';
export declare class Map<T, R> {
    constructor(action: (state: any) => Observable<R>);
}
export interface MapSgnature<T> {
    <R>(action: (state: T) => R): Observable<R>;
}
