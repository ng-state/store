import { Component, ChangeDetectorRef, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../store/store';
import { StateHistory } from './history';
import * as Rx from 'rxjs';

@Component({
    selector: 'state-history',
    template: `
    <div class="history-holder" *ngIf="showHistory">
        <div class="history-item" *ngFor="let item of items; let i = index;" (mouseover)="applyState(i)"></div>
    </div>`,
    styles: [`
        .history-holder {
            position: absolute;
            bottom: 0;
            height: 100px;
            left: 0;
            right: 0;
            background-color: #EFEFEF;
            border: 1px solid #CCCCCC;
            display: flex;
        }

        .history-item {
            flex: 1;
            max-width: 40px;
            height: 100px;
            background-color: #333333;
            margin-right: 5px;
        }
    `]
})
export class StateHistoryComponent implements OnInit, OnDestroy {
    items = StateHistory.HISTORY;
    lastIndex;
    showHistory = false;
    viewistorySubscription: Rx.Subscription;

    constructor(private store: Store<any>, private router: Router, private cd: ChangeDetectorRef, private zone: NgZone) {
    }

    ngOnInit() {
        this.viewistorySubscription = (<any>window).state.viewHistory
            .subscribe(value => {
                this.showHistory = value;
                this.cd.detectChanges();
            });
    }

    ngOnDestroy() {
        this.viewistorySubscription.unsubscribe();
    }

    applyState(index) {
        if (!this.lastIndex) {
            this.lastIndex = StateHistory.HISTORY.length - 1;
        }

        const targetRoute = StateHistory.HISTORY[index].getIn(['router', 'url']);

        if (StateHistory.HISTORY[this.lastIndex].getIn(['router', 'url']) !== targetRoute) {
            this.router.navigateByUrl(targetRoute)
                .then(() => {
                    this.changeState(index);
                });
        } else {
            this.changeState(index);
        }

    }

    private changeState(index) {
        this.zone.run(() => {
            this.lastIndex = index;
            (<Store<any>>this.store.select([]))
                .update(state => {
                    state.merge(StateHistory.HISTORY[index]);
                });
        });
    }
}