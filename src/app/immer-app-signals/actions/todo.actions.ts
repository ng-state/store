import { HasSignalStore, InjectStore } from '@ng-state/store';
import { TodoModel } from './todo.model';
import { Injectable } from '@angular/core';

@Injectable()
@InjectStore(['${stateIndex}'])
export class TodoStateActions extends HasSignalStore<TodoModel> {
    get todoDescription() {
        return this.state().description;
    }
}