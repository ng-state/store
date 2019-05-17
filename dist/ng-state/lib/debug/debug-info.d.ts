import { DebugInfoData } from './debug-info-data';
import { StateHistory } from '../state/history';
import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStrategy } from '@ng-state/data-strategy';
export declare class DebugInfo {
    private stateHistory;
    private zone;
    private dataStrategy;
    private debugInfo;
    private debugMode;
    private withDevTools;
    private debugStatePath;
    private devTools;
    private devToolsSubscription;
    private options;
    static instance: DebugInfo;
    isTimeTravel: boolean;
    onApplyHistory: Subject<DebugHistoryItem>;
    constructor(stateHistory: StateHistory, zone: NgZone, dataStrategy: DataStrategy);
    readonly publicApi: {
        start: (statePath?: any[]) => void;
        stop: () => void;
    };
    readonly isDebugMode: boolean;
    init(debugMode: boolean): void;
    changeDefaults(options: DebugOptions): void;
    add(info: DebugInfoData): void;
    onStateChange(state: any, isIntialState: boolean): void;
    turnOnTimeTravel(): void;
    turnOffTimeTravel(): void;
    private logDebugInfo;
    private consoleLog;
    private getDebugMessage;
    private getDebugStatePath;
    private trackWithDevTools;
    private stopTrackingWithDevTools;
    private setWithDevTools;
    private start;
    private stop;
}
export interface DebugOptions {
    enableConsoleOutput?: boolean;
    enableDevToolsOutput?: boolean;
}
export interface DebugHistoryItem {
    state: any;
    statePath: any[];
}
