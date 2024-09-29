import { Observable } from 'rxjs';
import { ServiceLocator } from '../helpers/service-locator';
import { Store } from '../store/store';
import { helpers } from '../helpers/helpers';
import { Dispatcher } from '../services/dispatcher';
import { DataStrategy } from '@ng-state/data-strategy';
import { IS_PROD, IS_TEST } from '../inject-constants';
import { StateHistory } from '../state/history';
import { Signal } from '@angular/core';

export const InjectStore = (
    newPath: string[] | string | ((currentPath, stateIndex) => string[] | string),
    initialState: Object | any = null,
    debug: boolean = false,
) => {
    let getStatePath = (currentPath, stateIndex, extractedPath) => {

        let transformedPath = (<string[]>extractedPath).map(item => {
            return item === '${stateIndex}'
                ? stateIndex
                : item;
        });

        return [...currentPath, ...transformedPath];
    };

    let getAbsoluteStatePath = (stateIndex: (string | number) | (string | number)[], extractedPath) => {
        const transformedPath = (<string>extractedPath).split('/');
        if (typeof stateIndex === 'string' || typeof stateIndex === 'number') {
            stateIndex = [stateIndex];
        }

        let nthStatePathIndex = 0;
        transformedPath.forEach((value, index) => {
            if (value === '${stateIndex}') {
                if ((<any[]>stateIndex).length <= nthStatePathIndex) {
                    throw new Error(`State path ${newPath} has not enough stateIndexes set. Please provide stateIndexes as array in the same order as set in statePath.`);
                }

                transformedPath[index.toString()] = stateIndex[nthStatePathIndex];
                nthStatePathIndex++;
            }
        });

        return transformedPath;
    };

    let getAllGetters = (target: any): any[] => {
        const targetMethods = Reflect.getPrototypeOf(target);
        let methods = Object.entries(Object.getOwnPropertyDescriptors(targetMethods))
            .map(([key, descriptor]: [string, any]) => {
                return {
                    name: key,
                    isGetter: typeof descriptor.get === 'function'
                };
            })
            .filter(method => method.isGetter)
            .map(method => method.name);

        return methods;
    };

    let convertGettersToProperties = (instance: any) => {
        const getters = getAllGetters(instance);
        getters.forEach(name => {

            const tempGetter = instance[name];
            if (tempGetter instanceof Observable) {
                delete instance[name];
                Object.defineProperty(instance, name, {
                    value: tempGetter
                });
            }
        });
    };

    const checkPath = (): boolean => {
        const isProd = ServiceLocator.injector.get(IS_PROD) as boolean;
        if (isProd) {
            return false;
        }

        const isTest = ServiceLocator.injector.get(IS_TEST) as boolean;

        if (isTest && debug) {
            return true;
        }

        if (isTest) {
            return false;
        }

        return true;
    };

    return (target: any) => {

        target.prototype.createStore = function (currentPath: any[] = [], stateIndex: (string | number) | (string | number)[], options?: { isSignalStore: boolean }): any[] {
            this.aId = helpers.guid();

            let extractedPath = typeof newPath === 'function' && (<any>newPath).name === ''
                ? (<any>newPath)(currentPath, stateIndex)
                : newPath;

            const statePath = typeof extractedPath === 'string'
                ? getAbsoluteStatePath(stateIndex, extractedPath)
                : getStatePath(currentPath, stateIndex, extractedPath);

            const store = ServiceLocator.injector.get(Store) as Store<any>;
            const dispatcher = ServiceLocator.injector.get(Dispatcher);
            const dataStrategy = ServiceLocator.injector.get(DataStrategy);
            const stateHistory = ServiceLocator.injector.get(StateHistory);

            this.store = store.initialize(statePath, initialState);

            if (checkPath() && !dataStrategy.getIn(stateHistory.currentState, statePath)) {
                console.error(`No such state in path ${statePath}. Define initial state for this path in global initial state or component actions.`);
            }

            if (options?.isSignalStore) {
                this.state = this.store.toSignal();
            } else {
                this.stateChangeSubscription = this.store.subscribe((state: any) => {
                    this.state = state;
                    dispatcher.publish(this.aId);


                    if (debug) {
                        console.info(dataStrategy.toJS(state));
                    }
                });
            }

            convertGettersToProperties(this);

            return statePath;
        };

        target.prototype.createTestStore = function (statePath: any[], options?: { isSignalStore: boolean }) {
            let store = ServiceLocator.injector.get(Store);
            this.store = store.select(statePath);
            const that = this;
            if (options?.isSignalStore) {
                this.state = this.store.toSignal();
            } else {
                this.stateChangeSubscription = this.store.subscribe((state: any) => {
                    that.state = state;
                });
            }
        };

        target.prototype.onDestroy = function () {
            if (this.stateChangeSubscription) {
                this.stateChangeSubscription.unsubscribe();
            }
            this.store.complete();
        };
    };
}

export class HasStore<T> {
    store: Store<T> = null;
    state?: T = null;
}

export class HasSignalStore<T> {
    store: Store<T> = null;
    state: Signal<T> = null;
    statePath: string | string[] = null;
}
