import { Store } from '../../projects/ng-state/src/lib/store/store';
import { ImmerDataStrategy } from '../../projects/immer-data-strategy/src/lib/immer.data-strategy';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { StateHistory } from '../../projects/ng-state/src/lib/state/history';
import { ServiceLocator } from '../../projects/ng-state/src/public-api';
import { createEffect } from '../../projects/ng-state/src/lib/store/effect';
import { TestBed } from '@angular/core/testing';
import { DestroyRef } from '@angular/core';

interface MyState {
    layout: {
        test: string;
    };
    counter: number;
    user: { id: number, name: string };
    settings: { theme: string };
}

describe('Effects - Immer', () => {
    let store: Store<MyState>;
    let stateHistory: StateHistory;
    const dataStrategy = new ImmerDataStrategy();

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(dataStrategy);

        const initialState1 = {
            layout: { test: 'test' },
            counter: 1,
            user: { id: 1, name: 'Alice' },
            settings: { theme: 'light' }
        } as MyState;

        store = NgStateTestBed.createStore(initialState1);
        stateHistory = ServiceLocator.injector.get(StateHistory);
        stateHistory.history = [];

        store.select(['layout']).update(state => state['test'] = 'test2');
        store.select(['user']).update(state => state['name'] = 'Bob');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should react on single property change', () => {
        createEffect(store, ['layout/test'], (result) => {
            if (!result.layout?.test?.oldValue) {
                expect(result.layout.test.newValue).toBe('test2');
                expect(result.layout.test.hasChanges).toBe(true);
            }

            if (result.layout?.test?.oldValue === 'test2') {
                expect(result.layout.test.newValue).toBe('second');
                expect(result.layout.test.hasChanges).toBe(true);
            }
        }, { destroyRef: TestBed.inject(DestroyRef) });

        store.update(state => state['layout']['test'] = 'second');
    });

    it('should react on multiple property changes', () => {
        TestBed.runInInjectionContext(() => {
            createEffect(store, ['layout/test', 'user/name'], (result) => {
                // Initial emissions
                if (!result.layout?.test?.oldValue) {
                    expect(result.layout.test.newValue).toBe('test2');
                    expect(result.layout.test.hasChanges).toBe(true);
                }
                if (!result.user?.name?.oldValue) {
                    expect(result.user.name.newValue).toBe('Bob');
                    expect(result.user.name.hasChanges).toBe(true);
                }

                // After update
                if (result.layout?.test?.oldValue === 'test2') {
                    expect(result.layout.test.newValue).toBe('second');
                    expect(result.layout.test.hasChanges).toBe(true);
                }
                if (result.user?.name?.oldValue === 'Bob') {
                    expect(result.user.name.newValue).toBe('Charlie');
                    expect(result.user.name.hasChanges).toBe(true);
                }
            });
        });

        store.update(state => {
            state['layout']['test'] = 'second';
            state['user']['name'] = 'Charlie';
        });
    });

    it('should react on multiple paths across multiple stores / observables', () => {
        TestBed.runInInjectionContext(() => {
            createEffect(
                [
                    store.select(['layout/test']),
                    store.select(['user/name']),
                    store.select(['settings/theme'])
                ],
                (result) => {
                    // Initial emissions
                    expect(result.obs0.newValue).toBe('test2');
                    expect(result.obs1.newValue).toBe('Bob');
                    expect(result.obs2.newValue).toBe('light');

                    // After update
                    if (result.obs0.oldValue === 'test2') expect(result.obs0.newValue).toBe('updated');
                    if (result.obs1.oldValue === 'Bob') expect(result.obs1.newValue).toBe('Charlie');
                    if (result.obs2.oldValue === 'light') expect(result.obs2.newValue).toBe('dark');
                }
            );
        });

        store.update(state => {
            state['layout']['test'] = 'updated';
            state['user']['name'] = 'Charlie';
            state['settings']['theme'] = 'dark';
        });
    });
});
