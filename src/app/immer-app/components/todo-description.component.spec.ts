import { TodoDescription } from './todo-description.component';
import { NgStateTestBed } from '../../../ng-state/ng-state.test-bed';
import { initialState } from '../../initial-state';
import { TodoStateActions } from '../actions/todo.actions';
import { TodoModel } from '../actions/todo.model';
import { ImmerDataStrategy } from '../../..//ng-state/data-strategies/immer.data-strategy';

describe('TodoDescription', () => {

    let component: TodoDescription;
    const cd = { markForCheck: () => { } };

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
        component = new TodoDescription(cd as any);
    });

    it('should get description', () => {
        initialState.todos.push(<TodoModel>{description: 'test description'});

        const actions = NgStateTestBed.createActions(TodoStateActions, initialState, ['todos', 1], ) as TodoStateActions;
        expect(actions.todoDescription).toEqual('test description');
    });

    it('should get description from oveeriden constructor', () => {
        const todo = new TodoModel();
        todo.description = 'test description';
        initialState.todos.push(todo);

        const actions = NgStateTestBed.createActions(TodoStateActions, initialState, ['todos', 1]) as TodoStateActions;
        expect(actions.todoDescription).toEqual('test description');
    });

    it ('should set actions to component - immer', () => {
        initialState.todos.push(<TodoModel>{description: 'test description'});

        const actions = NgStateTestBed.createActions(TodoStateActions, initialState, ['todos', 1]) as TodoStateActions;
        NgStateTestBed.setActionsToComponent(actions, component);

        expect(component.actions.todoDescription).toEqual('test description');
    });
});