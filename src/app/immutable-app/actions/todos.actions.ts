import * as Immutable from 'immutable';
import { HasStore, InjectStore } from '@ng-state/store';
import { TodoModel } from './todo.model';
import { Observable } from 'rxjs';
import { ImmutableUpdateActionAdditionalSettings } from '../../../../release/immutablejs-data-strategy/public-api';

@InjectStore('todos')
export class TodosStateActions extends HasStore<Immutable.List<any>> {

    addTodo(item: TodoModel) {
        this.store.update(state => {
            state.push(Immutable.fromJS(item));
        }, { message: 'ITEM ADDED' });
    }

    deleteTodo(index: number) {
        this.store.update((state: Immutable.List<any>) => {
            state.delete(index);
        });
    }

    clearTodos() {
        this.store.reset();
    }

    updateFirstItem() {
        this.store.update(state => {
            state.updateIn([0, 'description'], () => 'updated');
        });
    }

    get todos(): Observable<any> {
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