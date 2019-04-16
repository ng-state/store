import { StateKeeper } from '../state/history';
import * as _Cursor from 'immutable/contrib/cursor';

export class Cursor {
    constructor() {
        let that = this;
        return _Cursor.from(StateKeeper.CURRENT_STATE, (<any>this).statePath, (newData) => {
            (<any>that).source.next(newData);
        });
    }
}