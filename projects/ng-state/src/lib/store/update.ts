import { ActionType, DebugInfoData } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy, UpdateActionAdditionalSettings } from '@ng-state/data-strategy';
import { Store } from './store';
import { StateKeeper } from '../state/history';

export class Update {
    static execute<T>(store: Store<T>) {
        const update = function (action: (state: any) => void, debugInfo: DebugInfoData = {}, additionalSettings?: UpdateActionAdditionalSettings) {
            const defaultDebugInfo = { actionType: ActionType.Update, statePath: store.statePath };
            DebugInfo.instance.add({ ...defaultDebugInfo, ...debugInfo });

            const dataStrategy = store.dataStrategy as DataStrategy;
            const currentState = dataStrategy.getIn(StateKeeper.CURRENT_STATE, store.statePath);

            if (store.statePath.length > 0 && !dataStrategy.isObject(currentState)) {
                console.error(`Cannot update missing state at path: ${store.statePath.join('/')}.`);
                return;
            }

            try {
                dataStrategy.update(store.statePath, action, additionalSettings);
            } catch (exception) {
                console.error(exception);
            }
        };

        return update;
    }
}

export interface UpdateSignature<T> {
    (action: (state: T) => void, debugInfo?: DebugInfoData, additionalSettings?: UpdateActionAdditionalSettings): void;
}