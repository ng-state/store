import { _do } from 'rxjs/operator/do';
import { Cursor } from './cursor';

export class Update {
    constructor(action: (state: any) => void) {
        let updated = false;
        let actionWrapper = function (state) {
            if (updated) {
                return;
            }

           const cursor = Cursor.bind(this).call(this);

            cursor.withMutations(function (state) {
                action(state);
                updated = true;
            });
        }.bind(this);

       let done = _do.call(this, actionWrapper);
        done
            .take(1)
            .subscribe();

        return this;
    }
}

export interface UpdateSignature<T> {
  <R>(action: (state: T) => void): R;
}