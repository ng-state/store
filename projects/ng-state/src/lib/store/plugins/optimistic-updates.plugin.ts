import { Store } from '../store';
import { ServiceLocator } from '../../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { StateHistory } from '../../state/history';

export class OptimistaicUpdatesManager {

    private _stateHistory: StateHistory;
    private _dataStrategy: DataStrategy;

    constructor(private store: Store<any>) {
    }

    get stateHistory() {
        if (!this._stateHistory) {
            this._stateHistory = ServiceLocator.injector.get(StateHistory);
        }

        return this._stateHistory;
    }

    get dataStrategy() {
        if (!this._dataStrategy) {
            this._dataStrategy = ServiceLocator.injector.get(DataStrategy);
        }

        return this._dataStrategy;
    }

    start(tag: string = null) {
        if (tag) {
            this.stateHistory.history[this.stateHistory.history.length - 1].tag = tag;
        }
    }

    revertTo(tag: string): void {
        this.stateHistory.pauseCollectingHistory();
        const targetState = this.stateHistory.history.find(item => item.tag === tag);
        if (!targetState) {
            throw new Error(`No state with tag: ${tag} has been found`);
        }
        this.restoreState(targetState);
        this.stateHistory.resumeCollectingHistory();
    }

    revertLastChanges(count: number): void {
        this.stateHistory.pauseCollectingHistory();
        const targetState = this.stateHistory.history[this.stateHistory.history.length - 1 - count];
        if (!targetState) {
            throw new Error(`There is no state ${count} steps back`);
        }
        this.restoreState(targetState);
        this.stateHistory.resumeCollectingHistory();
    }

    private restoreState(state: any) {
        let path = this.store.statePath.filter(item => !this.store.rootPath.includes(item));
        const isRootPath = Array.isArray(path) && path.length === 0;
        if (isRootPath) {
            this.dataStrategy.resetRoot(state);
        } else {
            const previousState = this.dataStrategy.getIn(state, (path));
            this.dataStrategy.reset(this.store.statePath, previousState);
        }
    }
}