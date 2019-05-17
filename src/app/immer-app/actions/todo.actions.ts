import { HasStore, InjectStore } from '@ng-state/store';
import { TodoModel } from './todo.model';

@InjectStore(['${stateIndex}'])
export class TodoStateActions extends HasStore<TodoModel> {
    get todoDescription() {
        return this.state.description;
    }
}