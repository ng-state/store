import * as Immutable from 'immutable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class State<T> extends BehaviorSubject<T> {
  constructor(initialState: T) {
    super(Immutable.fromJS(initialState));
  }
}