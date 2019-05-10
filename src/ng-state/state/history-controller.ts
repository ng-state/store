import { Store } from '../store/store';
import { StateHistory } from './history';
import { Subject } from 'rxjs';
import { DebugInfo, DebugHistoryItem } from '../debug/debug-info';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

export class HistoryController {
    private onHistoryChange = new Subject();

    constructor(private store: Store<any>, private history: StateHistory, private debugerInfo: DebugInfo, private router: Router) {
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

        const targetRoute = debugHistoryItem.state.getIn(['router', 'url']);
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
        this.store.select(statePath)
            .update((state: any) => {
                state.clear();
                state.merge(targetState);
            }, true);
    }
}