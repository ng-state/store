import { signalActions, Store } from '@ng-state/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubSelectTestStateActions } from '../actions/subselect-test.actions';

@Component({
    selector: 'subselect-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <div>
    <button (click)="updateSharedValue()">Update Shared Value</button>
  </div>
  `
})
export class SubSelectTestComponent {
    actions = signalActions(SubSelectTestStateActions)();

    constructor(private store: Store<any>) {
    }

    test() {
        return Math.random();
    }

    updateSharedValue() {
        this.store.select(['form']).update(state => {
            state['condition']['notSpecified'] = true;
        });
        this.actions.updateTest();
    }
}