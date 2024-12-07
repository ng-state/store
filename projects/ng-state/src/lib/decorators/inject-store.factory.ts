import { Observable } from 'rxjs';
import { IS_PROD, IS_TEST } from '../inject-constants';
import { ServiceLocator } from '../helpers/service-locator';
import { CreateStoreOptions } from './inject-store.model';
import { Store } from '../store/store';
import { Dispatcher } from '../services/dispatcher';
import { DataStrategy } from '@ng-state/data-strategy';
import { helpers } from '../helpers/helpers';
import { StateHistory } from '../state/history';

export class InjectStoreFactory {
    private static getStatePath(currentPath, stateIndex, extractedPath) {
        let transformedPath = (<string[]>extractedPath).map(item => {
            return item === '${stateIndex}'
                ? stateIndex
                : item;
        });

        return [...currentPath, ...transformedPath];
    };

    private static getAbsoluteStatePath(stateIndex: (string | number) | (string | number)[], extractedPath) {
        const transformedPath = (<string>extractedPath).split('/');
        if (typeof stateIndex === 'string' || typeof stateIndex === 'number') {
            stateIndex = [stateIndex];
        }

        let nthStatePathIndex = 0;
        transformedPath.forEach((value, index) => {
            if (value === '${stateIndex}') {
                if ((<any[]>stateIndex).length <= nthStatePathIndex) {
                    throw new Error(`State path ${extractedPath} has not enough stateIndexes set. Please provide stateIndexes as array in the same order as set in statePath.`);
                }

                transformedPath[index.toString()] = stateIndex[nthStatePathIndex];
                nthStatePathIndex++;
            }
        });

        return transformedPath;
    };

    private static getAllGetters(target: any): any[] {
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

    private static convertGettersToProperties(instance: any) {
        const getters = InjectStoreFactory.getAllGetters(instance);
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

    private static checkPath(debug: boolean): boolean {
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

    static createStore(instance: any, options: CreateStoreOptions): any[] {
        if (!options.statePath) {
            options.statePath = [];
        }

        if (!options.options) {
            options.options = { debug: false };
        }

        if (options.options.debug === undefined) {
            options.options.debug = false;
        }

        instance.aId = helpers.guid();

        const np = options.newPath;

        let extractedPath = typeof np === 'function' && (<any>np).name === ''
            ? (<any>np)(options.statePath, options.stateIndex)
            : np;

        const statePath = typeof extractedPath === 'string'
            ? InjectStoreFactory.getAbsoluteStatePath(options.stateIndex, extractedPath)
            : InjectStoreFactory.getStatePath(options.statePath, options.stateIndex, extractedPath);

        const store = ServiceLocator.injector.get(Store) as Store<any>;
        const dispatcher = ServiceLocator.injector.get(Dispatcher);
        const dataStrategy = ServiceLocator.injector.get(DataStrategy);
        const stateHistory = ServiceLocator.injector.get(StateHistory);

        instance.store = store.initialize(statePath, options.initialState);

        if (InjectStoreFactory.checkPath(options.options.debug) && !dataStrategy.getIn(stateHistory.currentState, statePath)) {
            console.error(`No such state in path ${statePath}. Define initial state for this path in global initial state or component actions.`);
        }

        if (options.options.isSignalStore) {
            instance.state = instance.store.toSignal();
        } else {
            instance.stateChangeSubscription = instance.store.subscribe((state: any) => {
                instance.state = state;
                dispatcher.publish(instance.aId);


                if (options.options.debug) {
                    console.info(dataStrategy.toJS(state));
                }
            });
        }

        InjectStoreFactory.convertGettersToProperties(instance);

        return statePath;
    }

    static createTestStore(instance: any, statePath: any[], options?: { isSignalStore: boolean }) {
        let store = ServiceLocator.injector.get(Store);
        instance.store = store.select(statePath);
        const that = instance;
        if (options?.isSignalStore) {
            instance.state = instance.store.toSignal();
        } else {
            instance.stateChangeSubscription = instance.store.subscribe((state: any) => {
                that.state = state;
            });
        }
    };

    static onDestroy(instance: any) {
        if (instance.stateChangeSubscription) {
            instance.stateChangeSubscription.unsubscribe();
        }
        instance.store.complete();
    };
}