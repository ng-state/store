import { StateHistory } from '../state/history';
import { Helpers } from '../helpers/helpers';
import { _do } from 'rxjs/operator/do';
import * as Immutable from 'immutable';

export class Initialize {
    constructor(statePath, initialState: any = null, addToHistory = true) {
        let actionWrapper = function (state: any) {
            if (state.getIn([...statePath, '__initialized'])) {
                return;
            }

            Helpers.overrideContructor(initialState);
            initialState.constructor = Object;
            initialState = Immutable.fromJS(initialState);
            initialState = initialState.set('__initialized', true);

            const newState = state.setIn(statePath, initialState);

            if (addToHistory) {
                StateHistory.add(newState);
            }

            (<any>this).source.next(newState);
        }.bind(this);

        let done = _do.call(this, actionWrapper);
        done
            .take(1)
            .subscribe();

        return this;
    }
}

export interface InitializeSignature<T> {
    <R>(statePath, initialState?: T, addToHistory?: boolean): R;
}