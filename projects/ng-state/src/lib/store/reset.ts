import { Store } from './store';
import { StateKeeper, StateHistory } from '../state/history';
import { ActionType } from '../debug/debug-info-data';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { DebugInfo } from '../debug/debug-info';
import { RouterState } from '../state/router-state';
import { helpers } from '../helpers/helpers';

export class Reset {
    static execute<T>(store: Store<T>) {
        const reset = function (debugMessage: string = null) {
            if (ServiceLocator.injector['destroyed']) {
                console.error('Cannot reset store because injector is already destroyed.');
                return;
            }

            const dataStrategy = store.dataStrategy as DataStrategy;
            const currentState = dataStrategy.getIn(StateKeeper.CURRENT_STATE, store.statePath);

            const restoreState = () => {
                let path = helpers.getChildPath(store.statePath, store.rootPath);
                if (helpers.isRootPath(path, store.rootPath)) {
                    dataStrategy.resetRoot(StateHistory.initialState, RouterState.startingRoute);
                } else {
                    let initialState: any = !!store.initialState
                        ? store.initialState
                        : dataStrategy.fromJS(StateHistory.initialState);

                    initialState = dataStrategy.getIn(initialState, (path));

                    dataStrategy.reset(store.statePath, initialState);
                }

                const defaultDebugInfo = { actionType: ActionType.Reset, statePath: path, debugMessage: debugMessage };
                DebugInfo.instance.add(defaultDebugInfo);
            };

            if (currentState === undefined || currentState === null) {
                console.error(`Cannot reset missing state at path: ${store.statePath.join('/')}.`);
                return;
            }

            if (!dataStrategy.isObject(currentState)) {
                throw new Error(`Cannot resotre state at path: ${store.statePath}. Maybe you are trying to restore value rather then state.`);
            }

            restoreState();
        };

        return reset;
    }
}

export interface ResetSignature {
    <R>(debugMessage?: string): void;
}