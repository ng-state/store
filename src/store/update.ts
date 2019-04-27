import { Cursor } from './cursor';
import { ActionType, DebugInfoData } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';

export class Update {
    constructor(action: (state: any) => void, wrapToWithMutations: boolean = true, debugInfo: DebugInfoData = {}) {

        const cursor = Cursor.bind(this).call(this);

        try {
            if (wrapToWithMutations) {
                cursor.withMutations((state: any) => {
                    action(state);
                });
            } else {
                action(cursor);
            }

            const defaultDebugInfo = { actionType: ActionType.Update, statePath: (<any>this).statePath };
            DebugInfo.instance.add({ ...defaultDebugInfo, ...debugInfo });
        } catch (exception) {
            console.error(exception);
        }
    }
}

export interface UpdateSignature<T> {
    (action: (state: T) => void, wrapToWithMutations?: boolean, debugInfo?: DebugInfoData): void;
}