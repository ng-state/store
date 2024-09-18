
// import 'zone.js/dist/zone-testing';
import { ComponentState, InjectStore, HasStateActions, NgStateTestBed, HasStore } from '@ng-state/store';
import { Component, ChangeDetectionStrategy, OnInit, Signal, effect, ChangeDetectorRef, Injector, signal } from '@angular/core';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { ImmerDataStrategy } from '@ng-state/immer-data-strategy';
import { initialState } from '../src/app/initial-state';
import { TodoModel } from '../src/app/immutable-app/actions/todo.model';
import { By } from '@angular/platform-browser';

@InjectStore(['${stateIndex}'])
export class TodoDescriptionStateActions extends HasStore<TodoModel> {
    get todoDescription() {
        return this.state.description;
    }
}

@InjectStore('todos')
export class TodosStateActions extends HasStore<TodoModel[]> {
    get todoDescription() {
        return this.state[0].description;
    }

    changeTodoDescription(value: string) {
        this.store.update(state => {
            state[1].description = value;
        });
    }
}

@ComponentState(TodoDescriptionStateActions)
@Component({
    selector: 'todo-description',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="description">{{ actions.todoDescription }}</div>
        `
})
class TodoDescriptionComponent extends HasStateActions<TodoDescriptionStateActions> {
}

@ComponentState(TodosStateActions)
@Component({
    selector: 'todo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="todos">
        <div class="parent-description">{{actions.todoDescription}}</div>
        <todo-description [statePath]="statePath" [stateIndex]="1"></todo-description>
        <div class="parent-description-signal">{{descriptionSignal()}}</div>
        <button class="button" (click)="changeTodoDescription()"></button>
    </div>`
})
class TodosComponent extends HasStateActions<TodosStateActions> implements OnInit {
    descriptionSignal: Signal<string>;
    changedTimes = -1;

    constructor(cd: ChangeDetectorRef, private injector: Injector) {
        super(cd);
    }

    ngOnInit() {
        this.descriptionSignal = this.actions.store.select([1, 'description']).toSignal();

        effect(() => {
            this.changedTimes++;
            this.descriptionSignal();
        }, { injector: this.injector });
    }

    changeTodoDescription(value: string = 'changed description') {
        this.actions.changeTodoDescription(value);
    }
}

describe('Angular DOM compatibility test', () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let copyInitialState: typeof initialState;

    /* beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    }); */

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
        NgStateTestBed.strictActionsCheck = false;
        copyInitialState = JSON.parse(JSON.stringify(initialState));
        copyInitialState.todos.push(<TodoModel>{ description: 'test description' });
        NgStateTestBed.createStore(copyInitialState);

        TestBed.configureTestingModule({
            declarations: [TodosComponent, TodoDescriptionComponent],
        });

        fixture = TestBed.createComponent(TodosComponent as any);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create todo component', () => {
        expect(component).toBeDefined();
    });

    it('should read description from parent', () => {
        expect(fixture.nativeElement.querySelector('div.parent-description').innerHTML).toEqual('test');
    });

    it('should read description from child', () => {
        expect(fixture.nativeElement.querySelector('div.description').textContent).toEqual('test description');
    });

    it('should change child description on button click', () => {
        expect(fixture.nativeElement.querySelector('div.description').textContent).toEqual('test description');

        const button = fixture.debugElement.query(By.css('.button'));
        button.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.description').textContent).toEqual('changed description');
    });

    it('should read description from signal', () => {
        expect(fixture.nativeElement.querySelector('div.parent-description-signal').innerHTML).toEqual('test description');
    });

    it('should not hit signal recalculation when value is same', () => {
        component.changeTodoDescription();
        fixture.detectChanges();

        component.changeTodoDescription();
        fixture.detectChanges();

        expect(component.changedTimes).toEqual(1);
    });

    it('should hit signal recalculation when value is NOT same', () => {
        component.changeTodoDescription();
        fixture.detectChanges();

        component.changeTodoDescription('changed description 2');
        fixture.detectChanges();

        expect(component.changedTimes).toEqual(2);
    });

    it('should reflect value of changed signal', () => {
        expect(fixture.nativeElement.querySelector('div.parent-description-signal').textContent).toEqual('test description');

        const button = fixture.debugElement.query(By.css('.button'));
        button.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.parent-description-signal').textContent).toEqual('changed description');
    });
});

