import * as Immutable from 'immutable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Helpers } from '../helpers/helpers';

export class State<T> extends BehaviorSubject<T> {
  constructor(initialState: T) {
    Helpers.overrideContructor(initialState);
    super(Immutable.fromJS(initialState));
  }
}