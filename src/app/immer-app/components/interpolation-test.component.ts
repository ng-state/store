import { Store } from '../../../ng-state/store/store';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';

import { ComponentState, HasStateActions } from '../../../ng-state/decorators/component-state.decorator';
import { ClearTodoMessage } from './../actions/todo.model';
import { Dispatcher } from '../../../ng-state/services/dispatcher';
import { InterpolationTestStateActions } from '../actions/interpolation-test.actions';


@ComponentState(InterpolationTestStateActions)
@Component({
    selector: 'interpolation-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <div>{{ test() }} - {{ actions.interpolationValue }}
    <button (click)="changeState()">click</button>
    <button (click)="updateDocList()">clear</button>
    <button (click)="updateItem()">update item</button>
    <button (click)="clearHistory()">Clear History</button>
    <button (click)="updateSharedValue()">Update Shared Value</button>
  </div>
  `
})
export class InterpolationTestComponent extends HasStateActions<InterpolationTestStateActions> {

    constructor(private dispatcher: Dispatcher, cd: ChangeDetectorRef, private store: Store<any>) {
        super(cd);
    }

    test() {
        return Math.random();
    }

    changeState() {
        this.actions.update(Math.random());
    }

    updateDocList() {
        this.dispatcher.publish(new ClearTodoMessage());
    }

    updateItem() {
        this.dispatcher.publish('update');
    }

    clearHistory() {
        this.store.reset();
    }

    updateSharedValue() {
        this.store.select(['shareTest']).update((state) => {
            state.set('testValue', Math.random());
        });
    }
}