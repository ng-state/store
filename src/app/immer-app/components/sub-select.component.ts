import { Store } from '../../../ng-state/store/store';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { ComponentState, HasStateActions } from '../../../ng-state/decorators/component-state.decorator';
import { Dispatcher } from '../../../ng-state/services/dispatcher';
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

    constructor(private dispatcher: Dispatcher, cd: ChangeDetectorRef, private store: Store<any>) {
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