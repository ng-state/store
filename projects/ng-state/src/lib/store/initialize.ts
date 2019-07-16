import { tap, take } from 'rxjs/operators';
import { Store } from './store';
import { ActionType } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { BehaviorSubject } from 'rxjs';

export class Initialize {
    static execute<T>(store: Store<T>) {
        let newStore: Store<any>;

        const intiailize = function (statePath: any[], initialState: any = null) {
            const initialized = '__initialized';

            let actionWrapper = (state: any) => {
                const dataStrategy = ServiceLocator.injector.get(DataStrategy);

                if (dataStrategy.getIn(state, [...statePath, initialized])) {
                    return;
                }

                dataStrategy.overrideContructor(initialState);
                initialState.constructor = Object;
                initialState = dataStrategy.fromJS(initialState);
                initialState = dataStrategy.set(initialState, initialized, true);

                let newState: T;

                try {
                    newState = dataStrategy.setIn(state, statePath, initialState);
                    newStore = store.select(statePath);
                    newStore.initialState = initialState;
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

        return intiailize;
    }
}

export interface InitializeSignature<T> {
    <R>(statePath, initialState?: T, addToHistory?: boolean): Store<R>;
}