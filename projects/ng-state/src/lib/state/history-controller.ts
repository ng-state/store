import { Store } from '../store/store';
import { StateHistory } from './history';
import { Subject } from 'rxjs';
import { DebugInfo, DebugHistoryItem } from '../debug/debug-info';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataStrategy } from '@ng-state/data-strategy';

export class HistoryController {
    private onHistoryChange = new Subject();

    constructor(private store: Store<any>, private history: StateHistory, private debugerInfo: DebugInfo, private router: Router, private dataStrategy: DataStrategy) {
    }

    init() {
        this.store.subscribe(state => {
            const isIntialState = !this.history.currentState;

            this.history.setCurrentState(state);
            this.debugerInfo.onStateChange(state, isIntialState);
            this.onHistoryChange.next(true);
        });

        this.debugerInfo.onApplyHistory.subscribe(this.applyHistory);
    }

    private applyHistory = (debugHistoryItem: DebugHistoryItem) => {
        this.debugerInfo.turnOnTimeTravel();

        const targetRoute = this.dataStrategy.getIn(debugHistoryItem.state, ['router', 'url']);
        if (targetRoute && this.router.url !== targetRoute) {
            this.router.navigateByUrl(targetRoute).then(_ => {
                this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
            });
        } else {
            this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
        }

        this.onHistoryChange
            .pipe(take(1))
            .subscribe(_ => {
                this.debugerInfo.turnOffTimeTravel();
            });
    }

    private applyState(targetState: any, statePath: string[]) {
        if (statePath.length === 0) {
            this.store.next(targetState);
        } else {
            this.store
                .update((state: any) => {
                    this.dataStrategy.setIn(state, statePath, targetState, { fromUpdate: true });
                });
        }
    }
}