import { Store } from './store';
import { map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';

export class Map<T, R> {
    constructor(action: (state: any) => OperatorFunction<T, R>) {
        return (<any>this).pipe(map((state: any) => action(state)));
    }
}

export interface MapSgnature<T> {
    <R>(action: (state: T) => R): OperatorFunction<T, R>;
}