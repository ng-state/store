import { Store } from '../store/store';
import { ServiceLocator } from '../helpers/service-locator';

export function InjectStore(newPath: string[] | string | ((currentPath, stateIndex) => string[] | string), intialState?: Object | any) {
    let getStatePath = function (currentPath, stateIndex, extractedPath) {

        let transformedPath = (<string[]>extractedPath).map(item => {
            return item === '${stateIndex}'
                ? stateIndex
                : item;
        });

        return [...currentPath, ...transformedPath];
    };

    let getAbsoluteStatePath = function (stateIndex: (string | number) | (string | number)[], extractedPath) {
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

    return (target: any) => {

        target.prototype.createStore = function (currentPath?: any[], stateIndex?: (string | number) | (string | number)[]) {
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

            target.prototype.store = store.select(statePath);

            return statePath;
        };
    };
}

export interface HasStore {
    store: Store<any>;
}