import { ServiceLocator } from './helpers/service-locator';
import { IS_TEST } from './inject-constants';
import { NgStateTestBed } from './ng-state.test-bed';

export function signalActions<T>(stateActions: new () => T | ((type: T) => any)): (args?: { statePath?: string | string[], stateIndex?: number }) => T {
    return function (args?: { statePath?: string | string[], stateIndex?: number }): T {
        const isTest = ServiceLocator.injector.get(IS_TEST);
        if (isTest) {
            return NgStateTestBed.getActions(
                stateActions,
                NgStateTestBed.strictActionsCheck
            ) as T;
        }

        const extractedStateAction = stateActions.name === '' ? (stateActions as Function)(this) : stateActions;

        const actions = new extractedStateAction();
        actions.statePath = actions.createStore(args?.statePath || [], args?.stateIndex, { isSignalStore: true });

        return actions as T;
    }
}
