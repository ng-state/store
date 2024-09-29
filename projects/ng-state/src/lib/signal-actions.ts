import { DestroyRef, inject } from '@angular/core';
import { ServiceLocator } from './helpers/service-locator';
import { IS_TEST } from './inject-constants';
import { TestBed } from '@angular/core/testing';

export function signalActions<T>(stateActions: Provider<T>): T;
export function signalActions<T>(stateActions: Provider<T>, args: { late: true }): T & { init: (args: { statePath?: string | string[], stateIndex?: (string | number) | (string | number)[] }) => void };
export function signalActions<T>(stateActions: Provider<T>, args?: { late?: boolean }): T | T & { init: (args: { statePath?: string | string[], stateIndex?: (string | number) | (string | number)[] }) => void } {

    let actions;
    if(ServiceLocator.injector.get(IS_TEST)) {
        actions = TestBed.inject(stateActions, null, { optional: true });
        TestBed.inject(DestroyRef).onDestroy(() => {
            actions.onDestroy();
        });
    } else {
        actions = inject(stateActions, { optional: true });
        inject(DestroyRef).onDestroy(() => {
            actions.onDestroy();
        });
    }

    if (!actions) {
        actions = new (stateActions as any)();
    }

    if (!args?.late) {
        actions.statePath = actions.createStore([], null, { isSignalStore: true }) as any[];
        return actions;
    }

    actions.init = ({ statePath, stateIndex }: { statePath: string | string[], stateIndex: (string | number) | (string | number)[] }) => {
        actions.statePath = actions.createStore(statePath, stateIndex, { isSignalStore: true }) as any[];
    }

    return actions;
}

declare type Provider<T> = Type<T> | AbstractType<T>;

interface Type<T> extends Function {
    new(...args: any[]): T;
}

interface AbstractType<T> extends Function {
    prototype: T;
}

export const destroyActions = (actions: any) => {
    inject(DestroyRef).onDestroy(() => {
        actions.onDestroy();
    });
};
