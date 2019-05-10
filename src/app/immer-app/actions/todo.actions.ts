import { HasStore, InjectStore } from '../../../ng-state/decorators/inject-store.decorator';
import { TodoModel } from './todo.model';

@InjectStore(['${stateIndex}'])
export class TodoStateActions extends HasStore<TodoModel> {
    get todoDescription() {
        return this.state.description;
    }
}