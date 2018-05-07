import { fromJS } from 'immutable';
import { BehaviorSubject } from 'rxjs';
import { Helpers } from '../helpers/helpers';

export class State<T> extends BehaviorSubject<T> {
  constructor(initialState: T) {
    Helpers.overrideContructor(initialState);
    super(fromJS(initialState));
  }
}