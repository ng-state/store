
// import 'zone.js/dist/zone-testing';
import { InjectStore, NgStateTestBed, HasStore } from '@ng-state/store';
import { Injectable } from '@angular/core';
import { ImmerDataStrategy } from '@ng-state/immer-data-strategy';
import { initialState } from '../src/app/initial-state';
import { TodoModel } from '../src/app/immer-app/actions/todo.model';

@Injectable({ providedIn: 'root' })
export class DataService {
    getData() {
        return 'test 2';
    }
}

@Injectable({ providedIn: 'root' })
@InjectStore('todos')
export class TodosStateActions extends HasStore<TodoModel[]> {
    constructor(private dataService: DataService) {
        super();
    }

    todoDescription() {
        return this.dataService.getData();
    }
}

describe('Actions testing', () => {
    let copyInitialState: typeof initialState;
    let actions: TodosStateActions;

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
        NgStateTestBed.strictActionsCheck = false;
        copyInitialState = JSON.parse(JSON.stringify(initialState));
        copyInitialState.todos.push(<TodoModel>{ description: 'test description' });
        actions = NgStateTestBed.createSignalActions(TodosStateActions, copyInitialState);
    });

    it('should test action method with injected service', () => {
        expect(actions.todoDescription()).toBe('test 2');
    });
});

