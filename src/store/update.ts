import { Cursor } from './cursor';
import { tap, take } from 'rxjs/operators';
import { ActionType, DebugInfoData } from '../debug/debug-info-data';
import { DebugInfo } from '../debug/debug-info';

export class Update {
    constructor(action: (state: any) => void, wrapToWithMutations: boolean = true, debugInfo: DebugInfoData = {}) {
        let updated = false;
        let actionWrapper = function () {
            if (updated) {
                return;
            }

            const cursor = Cursor.bind(this).call(this);

            updated = true;
            try {
                if (wrapToWithMutations) {
                    cursor.withMutations((state: any) => {
                        action(state);
                    });
                } else {
                    action(cursor);
                }
            } catch (exception) {
                console.error(exception);
            }

        }.bind(this);

        const defaultDebugInfo = { actionType: ActionType.Update, statePath: (<any>this).statePath };
        DebugInfo.instance.add({ ...defaultDebugInfo, ...debugInfo });

        (<any>this).pipe(
            tap(actionWrapper),
            take(1)
        ).subscribe();
    }
}

export interface UpdateSignature<T> {
    (action: (state: T) => void, wrapToWithMutations?: boolean, debugInfo?: DebugInfoData): void;
}