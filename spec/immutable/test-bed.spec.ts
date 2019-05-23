import { ImmerDataStrategy } from '../../projects/immer-data-strategy/src/lib/immer.data-strategy';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { InjectStore, HasStore } from '../../projects/ng-state/src/lib/decorators/inject-store.decorator';
import { ImmutableJsDataStrategy } from '../../projects/immutablejs-data-strategy/src/lib/immutablejs.data-strategy';

describe('NgStateTestBed - Immutable', () => {

    let component: any;
    const initialState = { todos: [] };

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmutableJsDataStrategy());
        component = {};
    });

    it('should return actions', () => {
        initialState.todos.push({ description: 'test description' });

        const actions = NgStateTestBed.createActions<TestActions>(TestActions, initialState, ['todos', 0]);
        expect(actions.todoDescription).toEqual('test description');
    });

    it('should set actions to component', () => {
        initialState.todos.push({ description: 'test description' });

        const actions = NgStateTestBed.createActions(TestActions, initialState, ['todos', 0]) as TestActions;
        NgStateTestBed.setActionsToComponent(actions, component);

        expect(component.actions.todoDescription).toEqual('test description');
    });
});

describe('NgStateTestBed', () => {
    let component: any;

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmutableJsDataStrategy());
        component = {};
    });

    it('should create actions with default state and path', () => {
        const actions = NgStateTestBed.createActions(TestActions) as TestActions;
        NgStateTestBed.setActionsToComponent(actions, component);

        (<TestActions>component.actions).todoDescription = 'test';
        expect((<TestActions>component.actions).todoDescription).toEqual('test');
    });
});

@InjectStore([])
export class TestActions extends HasStore<any> {
    get todoDescription() {
        return this.state.get('description');
    }

    set todoDescription(value) {
        this.store.update(state => {
            state.set('description', value);
        });
    }
}