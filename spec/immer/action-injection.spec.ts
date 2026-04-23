
// import 'zone.js/dist/zone-testing';
import { InjectStore, NgStateTestBed, HasStore, signalActions } from '@ng-state/store';
import { Component, ChangeDetectionStrategy, Signal, Injectable } from '@angular/core';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
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

describe('signalActions SSR cache isolation', () => {
    const createServerSignalActions = (description: string) => {
        const copyInitialState = JSON.parse(JSON.stringify(initialState));
        copyInitialState.todos = [<TodoModel>{ description }];
        const dataStrategy = new ImmerDataStrategy();

        NgStateTestBed.setTestEnvironment(dataStrategy);
        NgStateTestBed.strictActionsCheck = false;
        NgStateTestBed.createStore(copyInitialState);

        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
        });

        let actions: TodosStateActions & { statePath: string[] };
        TestBed.runInInjectionContext(() => {
            actions = signalActions(TodosStateActions) as TodosStateActions & { statePath: string[] };
        });

        return {
            actions,
            state: copyInitialState,
        };
    };

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create fresh signal actions for each server request', () => {
        const firstRequest = createServerSignalActions('request one');
        const secondRequest = createServerSignalActions('request two');

        expect(firstRequest.actions).not.toBe(secondRequest.actions);
        expect(firstRequest.actions.store.snapshot()[0].description).toEqual('request one');
        expect(secondRequest.actions.store.snapshot()[0].description).toEqual('request two');
        expect(secondRequest.actions.statePath).toEqual(['todos']);
    });

    it('should update current server request state without crashing', () => {
        const serverRequest = createServerSignalActions('request two');

        expect(() => {
            serverRequest.actions.store.update((state) => {
                state[0].description = 'updated on server';
            });
        }).not.toThrow();

        expect(serverRequest.actions.store.snapshot()[0].description).toEqual('updated on server');
        expect(serverRequest.state.todos[0].description).toEqual('request two');
    });
});

