
import 'zone.js/dist/zone-testing';
import * as ngState from '@ng-state/store';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { ImmerDataStrategy } from '@ng-state/immer-data-strategy';
import { initialState } from '../src/app/initial-state';
import { TodoModel } from '../src/app/immutable-app/actions/todo.model';
import { By } from '@angular/platform-browser';

const { ComponentState, InjectStore, HasStateActions, NgStateTestBed } = ngState;
const HasStore = ngState.HasStore;

@InjectStore(['${stateIndex}'])
export class TodoDescriptionStateActions extends HasStore<TodoModel> {
    get todoDescription() {
        return this.state.description;
    }
}


@InjectStore('todos')
export class TodosStateActions extends HasStore<TodoModel> {
    get todoDescription() {
        return this.state[0].description;
    }

    changeTodoDescription() {
        this.store.update(state => {
            state[1].description = 'changed description';
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
    private constructor(cd: ChangeDetectorRef) {
        super(cd);
    }
}

@ComponentState(TodosStateActions)
@Component({
    selector: 'todo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="todos">
        <div class="parent-description">{{actions.todoDescription}}</div>
        <todo-description [statePath]="statePath" [stateIndex]="1"></todo-description>
        <button class="button" (click)="changeTodoDescription()"></button>
    </div>`
})
class TodosComponent extends HasStateActions<TodosStateActions> {
    private constructor(cd: ChangeDetectorRef) {
        super(cd);
    }

    changeTodoDescription() {
        this.actions.changeTodoDescription();
    }
}


describe('Angular DOM compatibility test', () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let copyIntitialState: typeof initialState;

    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
        NgStateTestBed.strictActionsCheck = false;
        copyIntitialState = JSON.parse(JSON.stringify(initialState));
        copyIntitialState.todos.push(<TodoModel>{ description: 'test description' });
        NgStateTestBed.createActions(TodosStateActions, copyIntitialState, ['todos']) as TodosStateActions;

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
});

