import { Store } from '../store';
import { ServiceLocator } from '../../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { StateHistory, HistoryItem } from '../../state/history';

export class OptimistaicUpdatesManager {

    private _stateHistory: StateHistory;
    private _dataStrategy: DataStrategy;

    public static nonExistingChangeMessage(count: number) { return `There is no state ${count} steps back`; }
    public static nonExistingTagMessage(tag: string) { return `No state with tag: ${tag} has been found`; }
    public static nonTagsMessage = 'No state with tag has been found';

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

    tagCurrentState(tag: string) {
        this.stateHistory.history[this.stateHistory.history.length - 1].tag = tag;
    }

    revertToLastTag() {
        const targetState = this.stateHistory.history.filter(item => !!item.tag);
        if (targetState.length === 0) {
            throw new Error(OptimistaicUpdatesManager.nonTagsMessage);
        }

        const tageRevertTo = targetState[targetState.length - 1];
        this.restoreState(tageRevertTo);
    }

    revertToTag(tag: string): void {
        const targetState = this.stateHistory.history.find(item => item.tag === tag);
        if (!targetState) {
            throw new Error(OptimistaicUpdatesManager.nonExistingTagMessage(tag));
        }
        this.restoreState(targetState);
    }

    revertLastChanges(count: number): void {
        const targetState = this.stateHistory.history[this.stateHistory.history.length - 1 - count];
        if (!targetState) {
            throw new Error(OptimistaicUpdatesManager.nonExistingChangeMessage(count));
        }
        this.restoreState(targetState);
    }

    private restoreState(state: HistoryItem) {
        let path = this.store.statePath.filter(item => !this.store.rootPath.includes(item));
        const isRootPath = Array.isArray(path) && path.length === 0;
        if (isRootPath) {
            this.dataStrategy.resetRoot(state.state);
        } else {
            const previousState = this.dataStrategy.getIn(state.state, (path));
            this.dataStrategy.reset(this.store.statePath, previousState);
        }

        const revertedHistory = this.stateHistory.history.slice(0, this.stateHistory.history.indexOf(state) + 1);
        this.stateHistory.history = [...revertedHistory];
        state.tag = null;
    }
}