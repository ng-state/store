import { Injectable } from '@angular/core';

@Injectable()
export class StateHistory {
    static initialState = {};

    private options: StateHistoryOptions = {
        collectHistory: true,
        storeHistoryItems: 100
    };

    get currentState(): any {
        return StateKeeper.CURRENT_STATE;
    }

    get history(): any[] {
        return StateKeeper.HISTORY;
    }

    init(initialState: any) {
        StateHistory.initialState = initialState;
    }

    changeDefaults(options: StateHistoryOptions) {
        this.options = { ...this.options, ...options };
    }

    add(state: any) {
        StateKeeper.CURRENT_STATE = state;

        if (!this.options.collectHistory) {
            return;
        }

        if (StateKeeper.HISTORY.length >= this.options.storeHistoryItems) {
            StateKeeper.HISTORY.shift();
        }

        StateKeeper.HISTORY.push(state.toJS());
    }
}

export class StateKeeper {
    static CURRENT_STATE: any = null;
    static HISTORY = [];
}

export interface StateHistoryOptions {
    collectHistory?: boolean;
    storeHistoryItems?: number | null;
}