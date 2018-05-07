import { fromJS } from 'immutable';
import { Helpers } from '../helpers/helpers';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class Initialize {
    constructor(statePath, initialState: any = null) {
        let actionWrapper = function (state: any) {
            if (state.getIn([...statePath, '__initialized'])) {
                return;
            }

            Helpers.overrideContructor(initialState);
            initialState.constructor = Object;
            initialState = fromJS(initialState);
            initialState = initialState.set('__initialized', true);

            let newState;

            try {
                newState = state.setIn(statePath, initialState);
            } catch (exception) {
                console.error(exception);
            }

            (<any>this).source.next(newState);
        }.bind(this);

        (<any>this).pipe(
            tap(actionWrapper),
            take(1)
        ).subscribe();

        return this;
    }
}

export interface InitializeSignature<T> {
    <R>(statePath, initialState?: T, addToHistory?: boolean): R;
}