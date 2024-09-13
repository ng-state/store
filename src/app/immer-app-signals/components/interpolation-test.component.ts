import { signalActions, Store } from '@ng-state/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClearTodoMessage } from '../actions/todo.model';
import { Dispatcher } from '@ng-state/store';
import { InterpolationTestStateActions } from '../actions/interpolation-test.actions';


@Component({
    selector: 'interpolation-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <div>
    Interpolation Test
    <br />
    <span>{{ test() }} - {{ actions.interpolationValue }}</span>
    <br />
    @let state = actions.state();
    <span>{{ test() }} - {{ state.interpolationTest }}</span>
    <br />
    <button (click)="changeState()">click</button>
    <button (click)="updateDocList()">clear</button>
    <button (click)="updateItem()">update item</button>
    <button (click)="clearHistory()">Clear History</button>
    <button (click)="updateSharedValue()">Update Shared Value</button>
  </div>
  `
})
export class InterpolationTestComponent {
    actions = signalActions(InterpolationTestStateActions)();

    constructor(private dispatcher: Dispatcher, private store: Store<any>) {
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
        // this.store.select(['shareTest']).reset();
        this.store.reset();
    }

    updateSharedValue() {
        this.store.select(['shareTest']).update((state) => {
            state['testValue'] = Math.random();
        });
    }
}