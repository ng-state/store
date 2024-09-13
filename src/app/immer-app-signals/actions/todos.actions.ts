import { HasSignalStore, InjectStore } from '@ng-state/store';
import { TodoModel } from './todo.model';

@InjectStore('todos')
export class TodosStateActions extends HasSignalStore<TodoModel[]> {

    addTodo(item: TodoModel) {
        this.store.update(state => {
            state.push(item);
        }, { message: 'ITEM ADDED' });
    }

    deleteTodo(index: number) {
        this.store.update(state => {
            if (index > -1) {
                state.splice(index, 1);
            }

            // delete state[index];
        });
    }

    clearTodos() {
        this.store.reset();
    }

    updateFirstItem() {
        this.store.update(state => {
            state[0].description = 'updated';
            state[0].nested.value = 'updated nested value';
        });
    }
}