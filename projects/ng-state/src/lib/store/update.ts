import { ActionType, DebugInfoData } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { Store } from './store';

export class Update {
    static execute<T>(store: Store<T>) {
        const update = function (action: (state: any) => void, debugInfo: DebugInfoData = {}) {
            const defaultDebugInfo = { actionType: ActionType.Update, statePath: store.statePath };
            DebugInfo.instance.add({ ...defaultDebugInfo, ...debugInfo });

            const dataStrategy = ServiceLocator.injector.get(DataStrategy) as DataStrategy;

            try {
                dataStrategy.update(store.statePath, action);
            } catch (exception) {
                console.error(exception);
            }
        };

        return update;
    }
}

export interface UpdateSignature<T> {
    (action: (state: T) => void, debugInfo?: DebugInfoData): void;
}