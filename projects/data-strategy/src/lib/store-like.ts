import { Observable, Observer } from 'rxjs';

export interface StoreLike<T> extends Observable<T>, Observer<any> {
}