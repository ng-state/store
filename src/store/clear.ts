import { Store } from './store';
import { StateHistory } from '../state/history';
import * as Immutable from 'immutable';
import { _do } from 'rxjs/operator/do';

export class Clear {
    constructor() {
        let clered = false;

        const clearMainStore = function (store: Store<any>) {
            store
                .select([])
                .update((state: Immutable.Map<any, any>) => {
                    const router = state.get('router');
                    state.clear();
                    state.merge(Immutable.fromJS(StateHistory.initialState));
                    state.set('router', router);
                    state.setIn(['router', 'url'], '');
                });
        };

        let actionWrapper = function (state: Immutable.Map<any, any>) {
            if (clered) {
                return;
            }

            clered = true;

            StateHistory.HISTORY = [];
            clearMainStore(this);

        }.bind(this);

        let done = _do.call(this, actionWrapper);
        done
            .take(1)
            .subscribe();

        return this;
    }
}

export interface ClearSignature {
    <R>(): R;
}