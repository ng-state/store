import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ComponentState, HasStateActions } from '../../../ng-state/decorators/component-state.decorator';

import { TodoStateActions } from './../actions/todo.actions';

@ComponentState(TodoStateActions)
@Component({
    selector: 'todo-description',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div>{{ actions.todoDescription }} {{ interpolationTest() }}</div>`
})
export class TodoDescription extends HasStateActions<TodoStateActions> implements OnChanges, OnInit {

    constructor(cd: ChangeDetectorRef) {
        super(cd);
    }

    ngOnInit(): void {
        console.log('on init');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('on changes', this.actions);
    }

    interpolationTest() {
        return Math.random();
    }
}