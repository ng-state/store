import { Store } from './store';
import { StateHistory, StateKeeper } from '../state/history';
import { RouterState } from '../state/router-state';
import { ActionType } from '../debug/debug-info-data';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '../data-strategies/data-strategy';

export class Reset {
    constructor(debugMessage: string = null) {

        const dataStrategy = ServiceLocator.injector.get(DataStrategy);

        const restoreState = function (store: Store<any>) {
            store
                .update((state: any) => {
                    let path = store.statePath.filter(item => !store.rootPath.includes(item));
                    const isRootPath = Array.isArray(path) && path.length === 0;

                    let router = '';
                    if (isRootPath) {
                        router = dataStrategy.get(state, 'router');
                    }

                    dataStrategy.clear(state);

                    let initialState: any = !!store.initialState
                        ? store.initialState
                        : dataStrategy.fromJS(StateHistory.initialState);

                    state.merge(dataStrategy.getIn(initialState, path));

                    if (isRootPath) {
                        dataStrategy.set(state, 'router', router);
                        dataStrategy.setIn(state, ['router', 'url'], RouterState.startingRoute);
                    }
                }, true, { message: debugMessage, actionType: ActionType.Reset });
        };

        if (!dataStrategy.isObject(dataStrategy.getIn(StateKeeper.CURRENT_STATE, ((this as any).statePath)))) {
            throw new Error(`Cannot resotre state at path: ${(this as any).statePath}. Maybe you are trying to restore value rather then state.`);
        }

        restoreState((this as any));
    }
}

export interface ResetSignature {
    <R>(debugMessage?: string): void;
}