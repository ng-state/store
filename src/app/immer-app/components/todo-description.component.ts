import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnChanges, SimpleChanges, OnInit, Input, OnDestroy } from '@angular/core';
import { ComponentState, HasStateActions, Store } from '@ng-state/store';

import { TodoStateActions } from './../actions/todo.actions';
import { Subscription } from 'rxjs';

@ComponentState(TodoStateActions)
@Component({
    selector: 'todo-description',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div>{{ actions.todoDescription }} {{ interpolationTest() }} {{testImmerMutation?.aa?.kk}}</div>`
})
export class TodoDescription extends HasStateActions<TodoStateActions> implements OnChanges, OnInit, OnDestroy {

    @Input() testImmerMutation: any = {aa: { kk: 'bu' }};
    subscription: Subscription;

    constructor(cd: ChangeDetectorRef) {
        super(cd);
    }

    ngOnInit(): void {
        console.log('on init');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('on changes', this.actions);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    interpolationTest() {
        return Math.random();
    }
}