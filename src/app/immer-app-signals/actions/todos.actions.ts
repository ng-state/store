import { HasSignalStore, InjectStore } from '@ng-state/store';
import { TodoModel } from './todo.model';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({ providedIn: 'root' })
@InjectStore('todos')
export class TodosStateActions extends HasSignalStore<TodoModel[]> {

    constructor(private dataService: DataService) {
        super();
    }

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
        this.dataService.getData();

        this.store.update(state => {
            state[0].description = 'updated';
            state[0].nested.value = 'updated nested value';
        });
    }
}