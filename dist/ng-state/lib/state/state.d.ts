import { BehaviorSubject } from 'rxjs';
import { DataStrategy } from '@ng-state/data-strategy';
export declare class State<T> extends BehaviorSubject<T> {
    constructor(initialState: T, dataStrategy: DataStrategy);
}
