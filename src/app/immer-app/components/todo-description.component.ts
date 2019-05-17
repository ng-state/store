import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { ComponentState, HasStateActions } from '@ng-state/store';

import { TodoStateActions } from './../actions/todo.actions';

@ComponentState(TodoStateActions)
@Component({
    selector: 'todo-description',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div>{{ actions.todoDescription }} {{ interpolationTest() }} {{testImmerMutation?.aa?.kk}}</div>`
})
export class TodoDescription extends HasStateActions<TodoStateActions> implements OnChanges, OnInit {

    @Input() testImmerMutation: any = {aa: { kk: 'bu' }};

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