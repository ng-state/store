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

    get storeHistoryItems() {
        return this.options.storeHistoryItems;
    }

    init(initialState: any) {
        StateHistory.initialState = initialState;
    }

    changeDefaults(options: StateHistoryOptions) {
        this.options = { ...this.options, ...options };
    }

    setCurrentState(state: any) {
        StateKeeper.CURRENT_STATE = state;
    }

    add(item: HistoryItem) {
        if (!this.options.collectHistory) {
            return;
        }

        if (StateKeeper.HISTORY.length >= this.options.storeHistoryItems) {
            StateKeeper.HISTORY.shift();
        }

        StateKeeper.HISTORY.push(item);
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

export interface HistoryItem {
    message: string;
    state: any;
}