export interface DebugInfoData {
    actionType?: ActionType | string;
    message?: string;
    statePath?: any[];
}
export declare const enum ActionType {
    Update = "UPDATE",
    Reset = "RESET",
    Insert = "INSERT",
    Delete = "DELETE",
    Initialize = "INITIALIZE"
}
