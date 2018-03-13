import { NgStateTestBed } from '../src/ng-state.test-bed';
import { HasStore, InjectStore } from '../src/decorators/inject-store.decorator';

describe('NgStateTestBed', () => {

    let component: any;
    const initialState = { todos: [] };

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment();
        component = {};
    });

    it('should return actions', () => {
        initialState.todos.push({ description: 'test description' });

        const actions = NgStateTestBed.createActions(initialState, ['todos', 0], TestActions) as TestActions;
        expect(actions.todoDescription).toEqual('test description');
    });

    it('should set actions to component', () => {
        initialState.todos.push({ description: 'test description' });

        const actions = NgStateTestBed.createActions(initialState, ['todos', 0], TestActions) as TestActions;
        NgStateTestBed.setActionsToComponent(actions, component);

        expect(component.actions.todoDescription).toEqual('test description');
    });
});

@InjectStore([])
export class TestActions extends HasStore<any> {
    get todoDescription() {
        return this.state.get('description');
    }
}