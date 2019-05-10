import * as Immutable from 'immutable';
import { HasStore, InjectStore } from '../../../ng-state/decorators/inject-store.decorator';
import { TodoModel } from './todo.model';

@InjectStore('todos')
export class TodosStateActions extends HasStore<Immutable.List<any>> {

    addTodo(item: TodoModel) {
        this.store.update(state => {
            state.push(Immutable.fromJS(item));
        }, true, { message: 'ITEM ADDED' });
    }

    deleteTodo(index: number) {
        this.store.update((state: Immutable.List<any>) => {
            state.delete(index);
        }, false);
    }

    clearTodos() {
        this.store.reset();
    }

    updateFirstItem() {
        this.store.update(state => {
            state.updateIn([0, 'description'], () => 'updated');
        });
    }

    get todos() {
        return this.store.map(state => {
            return state.map(item => {
                return {
                    name: item.get('name')
                };
            });
        });
    }

    get todosSync() {
        return this.state.toJS();
    }
}