import { ActionType, DebugInfoData } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '../data-strategies/data-strategy';

export class Update {
    constructor(action: (state: any) => void, debugInfo: DebugInfoData = {}) {

        const defaultDebugInfo = { actionType: ActionType.Update, statePath: (<any>this).statePath };
        DebugInfo.instance.add({ ...defaultDebugInfo, ...debugInfo });

        const dataStrategy = ServiceLocator.injector.get(DataStrategy) as DataStrategy;

        try {
            dataStrategy.update((this as any).statePath, action);
        } catch (exception) {
            console.error(exception);
        }
    }
}

export interface UpdateSignature<T> {
    (action: (state: T) => void, debugInfo?: DebugInfoData): void;
}