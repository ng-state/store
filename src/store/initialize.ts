import { fromJS } from 'immutable';
import { Helpers } from '../helpers/helpers';
import { tap, take } from 'rxjs/operators';
import { Store } from './store';
import { ActionType } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';

export class Initialize {
    newStore: Store<any>;

    constructor(statePath, initialState: any = null) {
        let actionWrapper = function (state: any) {
            if (state.getIn([...statePath, '__initialized'])) {
                return;
            }

            Helpers.overrideContructor(initialState);
            initialState.constructor = Object;
            initialState = fromJS(initialState);
            initialState = initialState.set('__initialized', true);

            let newState;

            try {
                newState = state.setIn(statePath, initialState);
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