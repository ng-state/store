
// import 'zone.js/dist/zone-testing';
import { InjectStore, NgStateTestBed, HasStore } from '@ng-state/store';
import { ImmerDataStrategy } from '@ng-state/immer-data-strategy';
import { initialState } from '../src/app/initial-state';
import { TodoModel } from '../src/app/immer-app/actions/todo.model';

@InjectStore('todos')
export class TodosStateActions extends HasStore<TodoModel[]> {
    todoDescription() {
        return 'test 2';
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
        actions = NgStateTestBed.createActions(TodosStateActions, copyInitialState);
    });

    it('should test action method', () => {
        expect(actions.todoDescription()).toBe('test 2');
    });
});

