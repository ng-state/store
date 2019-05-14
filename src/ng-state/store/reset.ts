import { Store } from './store';
import { StateKeeper } from '../state/history';
import { ActionType } from '../debug/debug-info-data';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '../data-strategies/data-strategy';
import { DebugInfo } from '../debug/debug-info';

export class Reset {
    constructor(debugMessage: string = null) {

        const dataStrategy = ServiceLocator.injector.get(DataStrategy);

        const restoreState = function (store: Store<any>) {
            let path = store.statePath.filter(item => !store.rootPath.includes(item));
            const isRootPath = Array.isArray(path) && path.length === 0;
            if (isRootPath) {
                dataStrategy.resetRoot();
            } else {
                dataStrategy.reset(path);
            }

            const defaultDebugInfo = { actionType: ActionType.Reset, statePath: path, debugMessage: debugMessage };
            DebugInfo.instance.add(defaultDebugInfo);
        };

        if (!dataStrategy.isObject(dataStrategy.getIn(StateKeeper.CURRENT_STATE, ((this as any).statePath)))) {
            throw new Error(`Cannot resotre state at path: ${(this as any).statePath}. Maybe you are trying to restore value rather then state.`);
        }

        restoreState((this as any));
    }
}

export interface ResetSignature {
    <R>(debugMessage?: string): void;
}