import { BehaviorSubject } from 'rxjs';
import { DataStrategy } from '../data-strategies/data-strategy';

export class State<T> extends BehaviorSubject<T> {
  constructor(initialState: T, dataStrategy: DataStrategy) {
    dataStrategy.overrideContructor(initialState);
    super(dataStrategy.fromJS(initialState));
  }
}