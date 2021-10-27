import { tap, take } from 'rxjs/operators';
import { Store } from './store';
import { ActionType } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { BehaviorSubject } from 'rxjs';

export class Initialize {
    static statePathsAreEqual(statePathOne: any[], statePathTwo: any[]){
        return statePathOne.length === statePathTwo.length && statePathOne.every((value, index) => value === statePathTwo[index]);
    }

    static execute<T>(store: Store<T>) {
        let newStore: Store<any>;


        const initialize = function (statePath: any[], initialState: any = null) {
            const initialized = '__initialized';

            let actionWrapper = (state: any) => {
                if(!initialState) {
                    newStore = store.select(statePath);
                    return;
                }

                const dataStrategy = ServiceLocator.injector.get(DataStrategy);

                if (dataStrategy.getIn(state, [...statePath, initialized])) {
                    if(!Initialize.statePathsAreEqual(newStore.statePath, statePath)) {
                        newStore = store.select(statePath);
                    }
                    return;
                }

                dataStrategy.overrideConstructor(initialState);

                if (initialState.constructor !== Object) {
                    initialState.constructor = Object;
                }

                let initializedInitialState = dataStrategy.fromJS(initialState);
                initializedInitialState = dataStrategy.set(initializedInitialState, initialized, true);

                let newState: T;

                try {
                    newState = dataStrategy.setIn(state, statePath, initializedInitialState);
                    newStore = store.select(statePath);
                    newStore.initialState = initializedInitialState;
                    newStore.rootPath = statePath;
                } catch (exception) {
                    console.error(exception);
                }

                (store.source as BehaviorSubject<T>).next(newState);
            };

            const defaultDebugInfo = { actionType: ActionType.Initialize, statePath: statePath };
            DebugInfo.instance.add(defaultDebugInfo);

            store.pipe(
                tap(actionWrapper),
                take(1)
            ).subscribe();

            return newStore as any;
        };

        return initialize;
    }
}

export interface InitializeSignature<T> {
    <R>(statePath, initialState?: T, addToHistory?: boolean): Store<R>;
}