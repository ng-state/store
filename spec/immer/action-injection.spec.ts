
// import 'zone.js/dist/zone-testing';
import { InjectStore, NgStateTestBed, HasStore, signalActions } from '@ng-state/store';
import { Component, ChangeDetectionStrategy, Signal, Injectable } from '@angular/core';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { ImmerDataStrategy } from '@ng-state/immer-data-strategy';
import { TodoModel } from '../../src/app/immer-app-signals/actions/todo.model';
import { initialState } from '../../src/app/initial-state';

@Injectable({providedIn: 'root'})
export class DataService {
    getData() {
        return 'test 2';
    }
}

@Injectable({providedIn: 'root'})
@InjectStore('todos')
export class TodosStateActions extends HasStore<TodoModel[]> {
    constructor(private dataService: DataService) {
        super();
    }

    todoDescription() {
        return this.dataService.getData();
    }
}

@Component({
    selector: 'todo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="todos">
        <div class="parent-description">{{actions.todoDescription()}}</div>
    </div>`
})
class TodosComponent {
    descriptionSignal: Signal<string>;
    changedTimes = -1;

    actions = signalActions(TodosStateActions);
}

describe('Angular DOM compatibility test', () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let copyInitialState: typeof initialState;

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
        NgStateTestBed.strictActionsCheck = false;
        copyInitialState = JSON.parse(JSON.stringify(initialState));
        copyInitialState.todos.push(<TodoModel>{ description: 'test description' });
        NgStateTestBed.createStore(copyInitialState);

        TestBed.configureTestingModule({
            declarations: [TodosComponent],
        });

        fixture = TestBed.createComponent(TodosComponent as any);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create todo component', () => {
        expect(component).toBeDefined();
    });

    it('should read description from parent', () => {
        expect(fixture.nativeElement.querySelector('div.parent-description').innerHTML).toEqual('test 2');
    });
});

