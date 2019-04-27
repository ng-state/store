import { Store } from './store';
import { StateHistory, StateKeeper } from '../state/history';
import { Map, fromJS } from 'immutable';
import { Helpers } from '../helpers/helpers';
import { RouterState } from '../state/router-state';
import { ActionType } from '../debug/debug-info-data';

export class Reset {
    constructor(debugMessage: string = null) {

        const restoreState = function (store: Store<any>) {
            store
                .update((state: Map<any, any>) => {
                    let path = store.statePath.filter(item => !store.rootPath.includes(item));
                    const isRootPath = Array.isArray(path) && path.length === 0;

                    let router = '';
                    if (isRootPath) {
                        router = state.get('router');
                    }

                    state.clear();

                    let initialState: Map<any, any> = !!store.initialState
                        ? store.initialState
                        : fromJS(StateHistory.initialState);

                    state.merge(initialState.getIn(path));

                    if (isRootPath) {
                        state.set('router', router);
                        state.setIn(['router', 'url'], RouterState.startingRoute);
                    }
                }, true, { message: debugMessage, actionType: ActionType.Reset });
        };

        if (!Helpers.isImmutable(StateKeeper.CURRENT_STATE.getIn((this as any).statePath))) {
            throw new Error(`Cannot resotre state at path: ${(this as any).statePath}. Maybe you are trying to restore value rather then state.`);
        }

        restoreState((this as any));
    }
}

export interface ResetSignature {
    <R>(debugMessage?: string): void;
}