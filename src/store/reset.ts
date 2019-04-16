import { Store } from './store';
import { StateHistory } from '../state/history';
import { Map, fromJS } from 'immutable';
import { tap, take } from 'rxjs/operators';
import { Helpers } from '../helpers/helpers';
import { RouterState } from '../state/router-state';

export class Reset {
    constructor() {
        let reseted = false;

        const restoreState = function (store: Store<any>) {
            store
                .update((state: Map<any, any>) => {
                    let path = store.statePath.filter(item => !store.rootPath.includes(item));
                    const isRootPath = Array.isArray(path) && path.length === 0;

                    let router = '';
                    if (isRootPath) {
                        router = state.get('router');
                    }

                    state.clear();

                    let initialState: Map<any, any> = !!store.initialState
                        ? store.initialState
                        : fromJS(StateHistory.initialState);

                    state.merge(initialState.getIn(path));

                    if (isRootPath) {
                        state.set('router', router);
                        state.setIn(['router', 'url'], RouterState.startingRoute);
                    }
                });
        };

        let actionWrapper = function (state: Map<any, any>) {
            if (reseted) {
                return;
            }

            if (!Helpers.isImmutable(state)) {
                console.error(`Cannot resotre state at path: ${this.statePath}. Maybe you are trying to restore value rather then state.`);
                return;
            }

            reseted = true;

            restoreState(this);

        }.bind(this);

        (<any>this).pipe(
            tap(actionWrapper),
            take(1)
        ).subscribe();
    }
}

export interface ResetSignature {
    <R>(): void;
}