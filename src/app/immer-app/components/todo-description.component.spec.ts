import { TodoDescription } from './todo-description.component';
import { NgStateTestBed } from '@ng-state/store';
import { initialState } from '../../initial-state';
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
        NgStateTestBed.createStore(copyInitialState);
        component = new TodoDescription(cd as any);
    });

    it('should get description - immer', () => {
        component.stateIndex = 1;
        component.statePath = ['todos'];
        component.ngOnInit();
        expect(component.actions.todoDescription).toEqual('test description');
    });

    it('should set actions to component - immer', () => {
        copyInitialState.todos.push(<TodoModel>{ description: 'test description 2' });

        component.stateIndex = 2;
        component.statePath = ['todos'];
        NgStateTestBed.createStore(copyInitialState);
        component.ngOnInit();

        expect(component.actions.todoDescription).toEqual('test description 2');
    });
});