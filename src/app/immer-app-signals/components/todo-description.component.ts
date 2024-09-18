import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { signalActions } from '@ng-state/store';

import { TodoStateActions } from '../actions/todo.actions';

@Component({
    selector: 'todo-description',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div>{{ actions.todoDescription }} {{ interpolationTest() }} {{testImmerMutation?.aa?.kk}}</div>`
})
export class TodoDescription implements OnChanges, OnInit, OnChanges {

    @Input() testImmerMutation: any = { aa: { kk: 'bu' } };
    @Input() statePath;
    @Input() stateIndex;

    actions = signalActions(TodoStateActions, { late: true });

    ngOnInit(): void {
        this.actions.init({ statePath: this.statePath, stateIndex: this.stateIndex });

        console.log('on init');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('on changes', this.actions);
    }

    interpolationTest() {
        return Math.random();
    }
}