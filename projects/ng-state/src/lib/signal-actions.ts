import { inject } from '@angular/core';
import { ServiceLocator } from './helpers/service-locator';
import { IS_TEST } from './inject-constants';
import { NgStateTestBed } from './ng-state.test-bed';

export function signalActions<T>(stateActions: Provider<T>): T;
export function signalActions<T>(stateActions: Provider<T>, args: { late: true }): ((lateArgs: { statePath?: string | string[], stateIndex?: (string | number) | (string | number)[] }) => T);
export function signalActions<T>(stateActions: Provider<T>, args?: { late?: boolean }): T | ((lateArgs: { statePath?: string | string[], stateIndex?: (string | number) | (string | number)[] }) => T) {
    if (!args?.late) {
        const isTest = ServiceLocator.injector.get(IS_TEST);
        if (isTest) {
            const actions = NgStateTestBed.getActions(
                stateActions,
                NgStateTestBed.strictActionsCheck
            );

            return actions.instance;
        }

        let actions = inject(stateActions, { optional: true });
        return actionsFactory(actions, stateActions, [], null);
    }

    let actions = inject(stateActions, { optional: true });
    return (lateArgs: { statePath?: string | string[], stateIndex?: (string | number) | (string | number)[] }): T => {
        return actionsFactory(actions, stateActions, lateArgs.statePath || [], lateArgs.stateIndex);
    };
}

function actionsFactory<T>(actions: any, stateActions: Provider<T>, statePath: string | string[], stateIndex: (string | number) | (string | number)[]): T {
    if (!actions) {
        actions = new (stateActions as any)();
    }

    actions.statePath = actions.createStore(
        statePath,
        stateIndex,
        { isSignalStore: true }
    ) as any[];

    return actions;
}

declare type Provider<T> = Type<T> | AbstractType<T>;

interface Type<T> extends Function {
    new(...args: any[]): T;
}

interface AbstractType<T> extends Function {
    prototype: T;
}
