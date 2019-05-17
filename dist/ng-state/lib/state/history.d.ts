export declare class StateHistory {
    static initialState: {};
    private options;
    readonly currentState: any;
    readonly history: any[];
    readonly storeHistoryItems: number;
    init(initialState: any): void;
    changeDefaults(options: StateHistoryOptions): void;
    setCurrentState(state: any): void;
    add(item: HistoryItem): void;
}
export declare class StateKeeper {
    static CURRENT_STATE: any;
    static HISTORY: any[];
}
export interface StateHistoryOptions {
    collectHistory?: boolean;
    storeHistoryItems?: number | null;
}
export interface HistoryItem {
    message: string;
    state: any;
}
