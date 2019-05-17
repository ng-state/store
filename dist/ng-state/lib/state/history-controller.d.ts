import { Store } from '../store/store';
import { StateHistory } from './history';
import { DebugInfo } from '../debug/debug-info';
import { Router } from '@angular/router';
import { DataStrategy } from '@ng-state/data-strategy';
export declare class HistoryController {
    private store;
    private history;
    private debugerInfo;
    private router;
    private dataStrategy;
    private onHistoryChange;
    constructor(store: Store<any>, history: StateHistory, debugerInfo: DebugInfo, router: Router, dataStrategy: DataStrategy);
    init(): void;
    private applyHistory;
    private applyState;
}
