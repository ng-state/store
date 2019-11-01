
import { ComponentState, InjectStore, HasStore } from '@ng-state/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgStateTestBed } from '@ng-state/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImmerDataStrategy } from '@ng-state/immer-data-strategy';
import { initialState } from '../src/app/initial-state';
import { TodoModel } from '../src/app/immutable-app/actions/todo.model';

@InjectStore(['${stateIndex}'])
export class TodoStateActions extends HasStore<TodoModel> {
    get todoDescription() {
        return this.state.description;
    }
}

@ComponentState(TodoStateActions)
@Component({
    selector: 'todo-description',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div class="description">{{ actions.todoDescription }}</div>`
})
class TargetComponent {
    statePath: string[];
    stateIndex: number | null;
    actions: any;
}

describe('Angular DOM compatibility test', () => {
    let component: TargetComponent;
    let fixture: ComponentFixture<TargetComponent>;
    let copyIntitialState: typeof initialState;

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());
        copyIntitialState = JSON.parse(JSON.stringify(initialState));
        copyIntitialState.todos.push(<TodoModel>{ description: 'test description' });
        NgStateTestBed.createActions(TodoStateActions, copyIntitialState, ['todos', 1]) as TodoStateActions;

        TestBed.configureTestingModule({
            declarations: [TargetComponent]
        });

        fixture = TestBed.createComponent(TargetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should read description from actions', () => {
        expect(fixture.nativeElement.querySelector('div.description').textContent).toEqual('test description');
    });
});