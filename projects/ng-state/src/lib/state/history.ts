import { Injectable } from '@angular/core';

@Injectable()
export class StateHistory {
    static initialState = {};

    private collectHistroyPaused = false;

    private options: StateHistoryOptions = {
        collectHistory: true,
        storeHistoryItems: 100
    };

    get currentState(): any {
        return StateKeeper.CURRENT_STATE;
    }

    get history(): HistoryItem[] {
        return StateKeeper.HISTORY;
    }

    get storeHistoryItems() {
        return this.options.storeHistoryItems;
    }

    pauseCollectingHistory() {
        this.collectHistroyPaused = true;
    }

    resumeCollectingHistory() {
        this.collectHistroyPaused = false;
    }

    init(initialState: any) {
        StateHistory.initialState = initialState;
    }

    changeDefaults(options: StateHistoryOptions) {
        this.options = { ...this.options, ...options };
    }

    setCurrentState(state: any) {
        StateKeeper.CURRENT_STATE = state;
        this.add({ state: state });
    }

    private add(item: HistoryItem) {
        if (!this.options.collectHistory || this.collectHistroyPaused) {
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
    tag?: string;
    state: any;
}