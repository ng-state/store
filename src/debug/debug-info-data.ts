export interface DebugInfoData {
    actionType?: ActionType | string;
    message?: string;
    statePath?: any[];
}

export const enum ActionType {
    Update = 'UPDATE',
    Reset = 'RESET',
    Insert = 'INSERT',
    Delete = 'DELETE'
}