import { Store } from '@ng-state/store';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { ComponentState, HasStateActions } from '@ng-state/store';
import { SubSelectTestStateActions } from '../actions/subselect-test.actions';

@ComponentState(SubSelectTestStateActions)
@Component({
    selector: 'subselect-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <div>
    <button (click)="updateSharedValue()">Update Shared Value</button>
  </div>
  `
})
export class SubSelectTestComponent extends HasStateActions<SubSelectTestStateActions> {

    constructor(cd: ChangeDetectorRef, private store: Store<any>) {
        super(cd);
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