import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef, Signal, OnInit } from '@angular/core';
import { ClearTodoMessage, TodoModel } from '../actions/todo.model';

import { signalActions } from '@ng-state/store';
import { Dispatcher, Message } from '@ng-state/store';
import { Subscription } from 'rxjs';
import { TodosStateActions } from '../actions/todos.actions';
import produce from 'immer';

@Component({
    selector: 'todos',
    templateUrl: './todos.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnDestroy {

    actions = signalActions(TodosStateActions)();
    model = {
        name: '',
        description: ''
    };

    subscription: Subscription;

    mutateImmerObject = { aa: { kk: 'bu' } };

    constructor(dispatcher: Dispatcher) {
        this.subscription = dispatcher
            .subscribe(ClearTodoMessage as Message, (payload: any) => {
                this.actions.clearTodos();
            });

        this.subscription = dispatcher
            .subscribe('update', (payload: any) => {
                this.actions.updateFirstItem();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    deleteItem(index: number) {
        this.actions.deleteTodo(index);
    }

    addItem() {
        this.actions.addTodo({ name: this.model.name, description: this.model.description } as TodoModel);
        this.model.name = '';
        this.model.description = '';
    }

    interpolationTest() {
        return Math.random();
    }

    trackById(item: TodoModel) {
        return item.id;
    }

    mutateImmer() {
        this.mutateImmerObject = produce(this.mutateImmerObject, (draftState: any) => {
            draftState.aa.kk = 'ttt';
        });
    }
}