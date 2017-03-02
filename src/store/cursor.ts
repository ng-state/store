import { StateHistory } from '../state/history';
import * as _Cursor from 'immutable/contrib/cursor';

export class Cursor {
    constructor(path: string[], store: any) {
        let that = this;
        return _Cursor.from(StateHistory.CURRENT_STATE, (<any>this).statePath, (newData) => {
            (<any>that).source.next(newData);
        });
    }
}