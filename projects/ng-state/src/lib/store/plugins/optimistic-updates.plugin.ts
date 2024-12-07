import { Store } from '../store';
import { ServiceLocator } from '../../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';
import { StateHistory, HistoryItem } from '../../state/history';

export class OptimisticUpdatesManager {

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
            throw new Error(OptimisticUpdatesManager.nonTagsMessage);
        }

        const tagRevertTo = targetState[targetState.length - 1];
        this.restoreState(tagRevertTo);
    }

    revertToTag(tag: string): void {
        const targetState = this.stateHistory.history.find(item => item.tag === tag);
        if (!targetState) {
            throw new Error(OptimisticUpdatesManager.nonExistingTagMessage(tag));
        }
        this.restoreState(targetState);
    }

    revertLastChanges(count: number): void {
        const targetState = this.stateHistory.history[this.stateHistory.history.length - 1 - count];
        if (!targetState) {
            throw new Error(OptimisticUpdatesManager.nonExistingChangeMessage(count));
        }
        this.restoreState(targetState);
    }

    getStateByTag(tag: string): any {
        const targetState = this.stateHistory.history.find(item => item.tag === tag);
        if (!targetState) {
            throw new Error(OptimisticUpdatesManager.nonExistingTagMessage(tag));
        }

        return this.dataStrategy.getIn(targetState.state, this.store.statePath);
    }

    private restoreState(state: HistoryItem) {
        const previousState = this.dataStrategy.getIn(state.state, this.store.statePath);
        this.dataStrategy.reset(this.store.statePath, previousState);

        const revertedHistory = this.stateHistory.history.slice(0, this.stateHistory.history.indexOf(state) + 1);
        this.stateHistory.history = [...revertedHistory];
        state.tag = null;
    }
}