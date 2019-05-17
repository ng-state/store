import { Helpers } from '../helpers/helpers';
import { tap, take } from 'rxjs/operators';
import { Store } from './store';
import { ActionType } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';

export class Initialize {
    newStore: Store<any>;

    constructor(statePath: any[], initialState: any = null) {
        const initialized = '__initialized';

        let actionWrapper = function (state: any) {
            const dataStrategy = ServiceLocator.injector.get(DataStrategy);

            if (dataStrategy.getIn(state, [...statePath, initialized])) {
                return;
            }

            dataStrategy.overrideContructor(initialState);
            initialState.constructor = Object;
            initialState = dataStrategy.fromJS(initialState);
            initialState = dataStrategy.set(initialState, initialized, true);

            let newState;

            try {
                newState = dataStrategy.setIn(state, statePath, initialState);
                this.newStore = (<any>this).select(statePath);
                this.newStore.initialState = initialState;
                this.newStore.rootPath = statePath;
            } catch (exception) {
                console.error(exception);
            }

            (<any>this).source.next(newState);
        }.bind(this);

        const defaultDebugInfo = { actionType: ActionType.Initialize, statePath: statePath };
        DebugInfo.instance.add(defaultDebugInfo);

        (<any>this).pipe(
            tap(actionWrapper),
            take(1)
        ).subscribe();

        return this.newStore as any;
    }
}

export interface InitializeSignature<T> {
    <R>(statePath, initialState?: T, addToHistory?: boolean): Store<R>;
}