import { HasStore, InjectStore } from '@ng-state/store';
import { TodoModel } from './todo.model';
import { Observable } from 'rxjs';

@InjectStore('todos')
export class TodosStateActions extends HasStore<TodoModel[]> {

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

    get todos(): Observable<any> {
        return this.store.map(state => {
            return state.map(item => {
                return {
                    name: item.name
                };
            });
        });
    }

    get todosSync() {
        return this.state;
    }
}