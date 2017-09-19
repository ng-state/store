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

    private static debugMode = false;
    private static debugStatePath;

    get currentState(): any {
        return StateHistory.CURRENT_STATE;
    }

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

        if (StateHistory.debugMode) {
            console.info((state.getIn(StateHistory.debugStatePath) || state).toJS());
        }
    }

    static showHistory() {
        StateHistory.collectHistory = false;
        StateHistory.viewHistory.next(true);
    }

    static hideHistory() {
        StateHistory.collectHistory = true;
        StateHistory.viewHistory.next(false);
    }

    static startDebugging(statePath?: any[]) {
        StateHistory.debugStatePath = statePath;
        StateHistory.debugMode = true;
    }

    static stopDebugging() {
        StateHistory.debugMode = false;
    }
}