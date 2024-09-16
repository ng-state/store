import { ServiceLocator } from './helpers/service-locator';
import { IS_TEST } from './inject-constants';
import { NgStateTestBed } from './ng-state.test-bed';

export function signalActions<T>(stateActions: new () => T | ((type: T) => any)): T;
export function signalActions<T>(stateActions: new () => T | ((type: T) => any), args: { statePath?: string | string[], stateIndex?: number }): T;
export function signalActions<T>(stateActions: new () => T | ((type: T) => any), args?: { statePath?: string | string[], stateIndex?: number }): T {
    const isTest = ServiceLocator.injector.get(IS_TEST);
    if (isTest) {
        const actions = NgStateTestBed.getActions(
            stateActions,
            NgStateTestBed.strictActionsCheck
        );

        return actions.instance;
    }

    const extractedStateAction = stateActions.name === '' ? (stateActions as Function)(this) : stateActions;

    const actions = new extractedStateAction();
    actions.statePath = actions.createStore(args?.statePath || [], args?.stateIndex, { isSignalStore: true }) as any[];

    return actions;
}
