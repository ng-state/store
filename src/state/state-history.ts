
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { StateHistory } from './history';
import { Store } from '../store/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'state-history',
    template: `
    <div class="history-holder" *ngIf="showHistory">
        <div class="history-item" *ngFor="let item of items; let i = index; trackBy: trackBy;" (mouseover)="applyState(i)"></div>
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
    lastIndex;
    showHistory = false;
    viewistorySubscription: Subscription;
    items;

    constructor(
        private store: Store<any>,
        private router: Router,
        private cd: ChangeDetectorRef,
        private zone: NgZone) {
    }

    ngOnInit() {
        this.viewistorySubscription = StateHistory.viewHistory
            .subscribe(value => {
                this.showHistory = value;

                if (value) {
                    this.items = StateHistory.HISTORY;
                }

                this.cd.detectChanges();
            });
    }

    ngOnDestroy() {
        this.viewistorySubscription.unsubscribe();
    }

    applyState(index) {
        if (!this.lastIndex) {
            this.lastIndex = this.items.length - 1;
        }

        const targetRoute = this.items[index].getIn(['router', 'url']);

        const lastState = this.items[this.lastIndex];
        if (targetRoute && lastState.get('router') && lastState.getIn(['router', 'url']) !== targetRoute) {
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
                    state.merge(this.items[index]);
                });
        });
    }

    trackBy(item, index) {
        return index;
    }
}