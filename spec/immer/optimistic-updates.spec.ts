import { Store } from '../../projects/ng-state/src/lib/store/store';
import { ImmerDataStrategy } from '../../projects/immer-data-strategy/src/lib/immer.data-strategy';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { StateHistory } from '../../projects/ng-state/src/lib/state/history';
import { ServiceLocator } from '../../projects/ng-state/src/public-api';
import { OptimisticUpdatesManager } from '../../projects/ng-state/src/lib/store/plugins/optimistic-updates.plugin';

describe('Optimistic updates - Immer', () => {
    let store: Store<any>;
    let stateHistory: StateHistory;

    const dataStrategy = new ImmerDataStrategy();

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(dataStrategy);
        const initialState = {
            layout: { test: 'test' },
            counter: 1
        };
        store = NgStateTestBed.createStore(initialState);
        stateHistory = ServiceLocator.injector.get(StateHistory);
        stateHistory.history = [];
        store.select(['layout']).update(state => state['test'] = 'test2');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should add tag on history', () => {
        store.optimisticUpdates.tagCurrentState('testTag');
        expect(stateHistory.history[0].tag).toEqual('testTag');
    });

    it('should revert to tag on root level', () => {
        store.select(['layout']).update(state => state['test'] = 'test5');
        store.optimisticUpdates.tagCurrentState('testTag');

        store.select(['layout']).update(state => state['test'] = 'test3');
        expect(stateHistory.currentState['layout']['test']).toEqual('test3');

        store.optimisticUpdates.revertToTag('testTag');

        expect(stateHistory.currentState['layout']['test']).toEqual('test5');
        expect(stateHistory.history.length).toBe(2);
        expect(stateHistory.history[1].state['layout']['test']).toEqual('test5');
    });

    it('should revert to tag on nested level', () => {
        store.optimisticUpdates.tagCurrentState('testTag');
        store.update(state => {
            state['layout']['test'] = 'test3';
            state.counter = 2;
        });

        expect(stateHistory.currentState['layout']['test']).toEqual('test3');
        expect(stateHistory.currentState['counter']).toEqual(2);

        store.select(['layout']).optimisticUpdates.revertToTag('testTag');
        expect(stateHistory.currentState['layout']['test']).toEqual('test2');
        expect(stateHistory.currentState['counter']).toEqual(1);

    });

    it('should revert to last tag', () => {
        store.optimisticUpdates.tagCurrentState('testTag');
        store.select(['layout']).update(state => state['test'] = 'test3');
        store.optimisticUpdates.tagCurrentState('testTag2');
        store.select(['layout']).update(state => state['test'] = 'test4');

        expect(stateHistory.currentState['layout']['test']).toEqual('test4');

        store.optimisticUpdates.revertToLastTag();
        expect(stateHistory.currentState['layout']['test']).toEqual('test3');
    });

    it('should revert last N actions', () => {
        store.select(['layout']).update(state => state['test'] = 'test3');
        store.select(['layout']).update(state => state['test'] = 'test4');
        store.select(['layout']).update(state => state['test'] = 'test5');

        store.optimisticUpdates.revertLastChanges(2);
        expect(stateHistory.currentState['layout']['test']).toEqual('test3');
    });

    describe('should throw an error when no history item found', () => {
        it('on reverting to non existing index', () => {
            const stepsBack = 2;
            expect(() => store.optimisticUpdates.revertLastChanges(stepsBack))
            .toThrowError(OptimisticUpdatesManager.nonExistingChangeMessage(stepsBack));
        });

        it('on reverting to non existing tag', () => {
            const tag = 'testTagNonExisting';
            expect(() => store.optimisticUpdates.revertToTag(tag))
            .toThrowError(OptimisticUpdatesManager.nonExistingTagMessage(tag));
        });

        it('on reverting to non existing tag when there are no tags at all', () => {
            expect(() => store.optimisticUpdates.revertToLastTag())
            .toThrowError(OptimisticUpdatesManager.nonTagsMessage);
        });
    });
});
