import { Observable } from 'rxjs/Observable';
import { ServiceLocator } from '../helpers/service-locator';
import { Store } from '../store/store';

export function InjectStore(newPath: string[] | string | ((currentPath, stateIndex) => string[] | string), intialState?: Object | any) {
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

                transformedPath[index] = stateIndex[nthStatePathIndex];
                nthStatePathIndex++;
            }
        });

        return transformedPath;
    };

    let getAllGetters = (target: any): any[] => {
        const targetMethods = Reflect.getPrototypeOf(target);
        let methods = (<any>Object).entries((<any>Object).getOwnPropertyDescriptors(targetMethods))
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

    return (target: any) => {

        target.prototype.createStore = function (currentPath: any[], stateIndex: (string | number) | (string | number)[]) {
            let extractedPath = typeof newPath === 'function' && (<any>newPath).name === ''
                ? (<any>newPath)(currentPath, stateIndex)
                : newPath;

            const statePath = typeof extractedPath === 'string'
                ? getAbsoluteStatePath(stateIndex, extractedPath)
                : getStatePath(currentPath, stateIndex, extractedPath);

            const store = ServiceLocator.injector.get(Store);

            if (intialState) {
                store.initialize(statePath, intialState);
            }

            this.store = store.select(statePath);
            this.stateChangeSubscription = this.store.subscribe((state: any) => {
                this.state = state;
            });

            convertGettersToProperties(this);

            return statePath;
        };

         target.prototype.onDestroy = function() {
            this.stateChangeSubscription.unsubscribe();
        };
    };
}

export class HasStore<T> {
    store: Store<T> = null;
    state: any = null;
}