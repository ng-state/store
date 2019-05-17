import { DebugInfoData } from '../debug/debug-info-data';
export declare class Update {
    constructor(action: (state: any) => void, debugInfo?: DebugInfoData);
}
export interface UpdateSignature<T> {
    (action: (state: T) => void, debugInfo?: DebugInfoData): void;
}
