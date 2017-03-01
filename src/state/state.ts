import * as Immutable from 'immutable';
import * as Rx from 'rxjs';

export class State<T> extends Rx.BehaviorSubject<T> {
  constructor(initialState: () => T) {
    const initialStateInit = initialState();
    super(Immutable.fromJS(initialStateInit));
  }
}