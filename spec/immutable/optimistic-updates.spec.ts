import { Store } from '../../projects/ng-state/src/lib/store/store';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { StateHistory } from '../../projects/ng-state/src/lib/state/history';
import { ServiceLocator } from '../../projects/ng-state/src/public-api';
import { OptimisticUpdatesManager } from '../../projects/ng-state/src/lib/store/plugins/optimistic-updates.plugin';
import { ImmutableJsDataStrategy, ImmutableUpdateActionAdditionalSettings } from '../../projects/immutablejs-data-strategy/src/public-api';

describe('Optimistic updates - Immutable', () => {
    let store: Store<any>;
    let stateHistory: StateHistory;

    const dataStrategy = new ImmutableJsDataStrategy();

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(dataStrategy);
        const initialState = {
            layout: { test: 'test' },
            counter: 1
        };
        store = NgStateTestBed.createStore(initialState);
        stateHistory = ServiceLocator.injector.get(StateHistory);
        stateHistory.history = [];
        store.select<Map<any, any>>(['layout']).update(state => state.set('test', 'test2'));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should add tag on history', () => {
        store.optimisticUpdates.tagCurrentState('testTag');
        expect(stateHistory.history[0].tag).toEqual('testTag');
    });

    it('should revert to tag on root level', () => {
        store.select<Map<any, any>>(['layout']).update(state => state.set('test', 'test5'));
        store.optimisticUpdates.tagCurrentState('testTag');

        store.select<Map<any, any>>(['layout']).update(state => state.set('test', 'test3'));
        expect(stateHistory.currentState.getIn(['layout', 'test'])).toEqual('test3');

        store.optimisticUpdates.revertToTag('testTag');

        expect(stateHistory.currentState.getIn(['layout', 'test'])).toEqual('test5');
        expect(stateHistory.history.length).toBe(2);
        expect(stateHistory.history[1].state.getIn(['layout', 'test'])).toEqual('test5');
    });

    it('should revert to tag on nested level', () => {
        store.optimisticUpdates.tagCurrentState('testTag');
        store.update(state => {
            state.setIn(['layout', 'test'], 'test3');
            state.set('counter', 2);
        }, {}, { withMutations: true } as ImmutableUpdateActionAdditionalSettings);

        expect(stateHistory.currentState.getIn(['layout', 'test'])).toEqual('test3');
        expect(stateHistory.currentState.get('counter')).toEqual(2);

        store.select(['layout']).optimisticUpdates.revertToTag('testTag');
        expect(stateHistory.currentState.getIn(['layout', 'test'])).toEqual('test2');
        expect(stateHistory.currentState.get('counter')).toEqual(2);

    });

    it('should revert to last tag', () => {
        store.optimisticUpdates.tagCurrentState('testTag');
        store.select<Map<any, any>>(['layout']).update(state => state.set('test', 'test3'));
        store.optimisticUpdates.tagCurrentState('testTag2');
        store.select<Map<any, any>>(['layout']).update(state => state.set('test', 'test4'));

        expect(stateHistory.currentState.getIn(['layout', 'test'])).toEqual('test4');

        store.optimisticUpdates.revertToLastTag();
        expect(stateHistory.currentState.getIn(['layout', 'test'])).toEqual('test3');
    });

    it('should reset locally initialized nested state', () => {
        const initStore = store.initialize(['locallyInitialized'], { value: 'test value' }, false);
        initStore.optimisticUpdates.tagCurrentState('testTag');

        initStore.update((state: Map<any, any>) => state.set('value', 'test value 2'));
        expect(stateHistory.currentState.getIn(['locallyInitialized', 'value'])).toEqual('test value 2');

        initStore.optimisticUpdates.revertToTag('testTag');
        expect(stateHistory.currentState.getIn(['locallyInitialized', 'value'])).toEqual('test value');
    });

    it('should reset locally initialized nested state child path', () => {
        const initStore = store.initialize(['locallyInitialized'], { value: 'test value', nestedValue: { value: 'v1'} }, false);
        initStore.optimisticUpdates.tagCurrentState('testTag');

        initStore.update((state: Map<any, any>) => state.set('value', 'test value 2'));
        initStore.select(['nestedValue']).update((state: Map<any, any>) => state.set('value', 'v2'));
        expect(stateHistory.currentState.getIn(['locallyInitialized', 'value'])).toEqual('test value 2');
        expect(stateHistory.currentState.getIn(['locallyInitialized', 'nestedValue', 'value'])).toEqual('v2');

        initStore.select(['nestedValue']).optimisticUpdates.revertToTag('testTag');
        expect(stateHistory.currentState.getIn(['locallyInitialized', 'value'])).toEqual('test value 2');
        expect(stateHistory.currentState.getIn(['locallyInitialized', 'nestedValue', 'value'])).toEqual('v1');
    });

    it('should revert last N actions', () => {
        store.select<Map<any, any>>(['layout']).update(state => state.set('test', 'test3'));
        store.select<Map<any, any>>(['layout']).update(state => state.set('test', 'test4'));
        store.select<Map<any, any>>(['layout']).update(state => state.set('test', 'test5'));

        store.optimisticUpdates.revertLastChanges(2);
        expect(stateHistory.currentState.getIn(['layout', 'test'])).toEqual('test3');
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
