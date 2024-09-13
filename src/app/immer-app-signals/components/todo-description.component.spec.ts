import { TodoDescription } from './todo-description.component';
import { NgStateTestBed } from '@ng-state/store';
import { initialState } from '../../initial-state';
import { TodoStateActions } from '../actions/todo.actions';
import { TodoModel } from '../actions/todo.model';
import { ImmerDataStrategy } from '@ng-state/immer-data-strategy';

describe('TodoDescription', () => {

    let component: TodoDescription;
    let copyInitialState: typeof initialState;
    const cd = { markForCheck: () => { } };

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
        NgStateTestBed.strictActionsCheck = false;

        copyInitialState = JSON.parse(JSON.stringify(initialState));
        copyInitialState.todos.push(<TodoModel>{ description: 'test description' });
        NgStateTestBed.createSignalActions(TodoStateActions, copyInitialState, ['todos', 1]) as TodoStateActions;
        component = new TodoDescription();
        component.ngOnInit();
    });

    it('should get description - immer signals', () => {
        expect(component.actions.todoDescription).toEqual('test description');
    });

    it('should set actions to component - immer signals', () => {
        copyInitialState.todos.push(<TodoModel>{ description: 'test description 2' });

        const actions = NgStateTestBed.createActions(TodoStateActions, copyInitialState, ['todos', 1]) as TodoStateActions;
        NgStateTestBed.setActionsToComponent(actions, component);

        expect(component.actions.todoDescription).toEqual('test description');
    });
});