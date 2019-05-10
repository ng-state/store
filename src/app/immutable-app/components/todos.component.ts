import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ClearTodoMessage, TodoModel } from './../actions/todo.model';

import { ComponentState, HasStateActions } from '../../../ng-state/decorators/component-state.decorator';
import { Dispatcher, Message } from './../../../ng-state/services/dispatcher';
import { Subscription } from 'rxjs';
import { TodosStateActions } from './../actions/todos.actions';
import { Store } from '../../../ng-state/store/store';

@ComponentState(TodosStateActions)
@Component({
    selector: 'todos',
    templateUrl: './todos.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent extends HasStateActions<TodosStateActions> implements OnDestroy {

    actions: TodosStateActions;
    model = {
        name: '',
        description: ''
    };

    subscription: Subscription;

    constructor(dispatcher: Dispatcher, cd: ChangeDetectorRef) {
        super(cd);

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
}