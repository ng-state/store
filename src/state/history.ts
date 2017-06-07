import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { Subject } from 'rxjs';

@Injectable()
export class StateHistory {
    static CURRENT_STATE: any = {};
    static HISTORY = [];
    static collectHistory = true;
    static storeHistoryItems: number | null = 100;
    static viewHistory = new Subject<boolean>();

    constructor(private store: Store<any>) {
    }

    init() {
        this.store.subscribe(state => {
            this.add(state);
        });
    }

    private add(state) {
        StateHistory.CURRENT_STATE = state;

        if (!StateHistory.collectHistory || StateHistory.HISTORY.indexOf(state) >= 0) {
            return;
        }

        if (StateHistory.HISTORY.length >= StateHistory.storeHistoryItems) {
            StateHistory.HISTORY.shift();
        };

        StateHistory.HISTORY.push(state);
    }

    static showHistory() {
        StateHistory.collectHistory = false;
        StateHistory.viewHistory.next(true);
    }

    static hideHistory() {
        StateHistory.collectHistory = true;
        StateHistory.viewHistory.next(false);
    }
}