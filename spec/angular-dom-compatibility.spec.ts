
import { ComponentState, InjectStore, HasStore, HasStateActions } from '@ng-state/store';
import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { NgStateTestBed } from '@ng-state/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    constructor(cd: ChangeDetectorRef) {
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
    constructor(cd: ChangeDetectorRef) {
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

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
        NgStateTestBed.strictActionsCheck = false;
        copyIntitialState = JSON.parse(JSON.stringify(initialState));
        copyIntitialState.todos.push(<TodoModel>{ description: 'test description' });
        NgStateTestBed.createActions(TodosStateActions, copyIntitialState, ['todos']) as TodosStateActions;

        TestBed.configureTestingModule({
            declarations: [TodosComponent, TodoDescriptionComponent]
        });

        fixture = TestBed.createComponent(TodosComponent);
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