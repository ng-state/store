import { ComponentState } from '../src/ng-state/decorators/component-state.decorator';
import { ServiceLocator } from '../src/ng-state/helpers/service-locator';
import { IS_PROD } from '../src/ng-state/ng-state.module';
import { Message, Dispatcher } from '../src/ng-state/services/dispatcher';

const actionId = 'actionId';
class TestStateActions {
    aId = actionId;
    createStore(statePath: string[], stateIndex: number | null) {
        return ['newStatePath'];
    }
}

class TargetComponent {
    statePath: string[];
    stateIndex: number | null;
    actions: any;
    cd: { markForCheck: () => void };

    ngOnInit() { }
}

const dispatcher = new Dispatcher();

ServiceLocator.injector = <any>{
    get: (key) => {
        if (key === IS_PROD) {
            return false;
        }

        if (key.name === 'Dispatcher') {
            return dispatcher;
        }

        if (key.name === 'ChangeDetectorRef') {
            return {
                markForCheck: () => { }
            };
        }
    }
};

describe('ComponentState decorator', () => {
    let target: TargetComponent;

    let beforeEach = function (actions?) {
        const decorator = ComponentState(actions);
        decorator(TargetComponent);
        target = new TargetComponent();
    };

    it('should resolve stateActions', () => {
        beforeEach(TestStateActions);
        target.ngOnInit();
        expect(target.statePath[0]).toBe('newStatePath');
        expect(target.actions instanceof TestStateActions).toBeTruthy();
    });

    it('should resolve stateActions from anonymous function', () => {
        beforeEach(() => TestStateActions);
        target.ngOnInit();
        expect(target.statePath[0]).toBe('newStatePath');
        expect(target.actions instanceof TestStateActions).toBeTruthy();
    });

    it('should call markForCheck after state change', () => {
        beforeEach(TestStateActions);
        target.ngOnInit();
        jest.spyOn(target.cd, 'markForCheck');

        dispatcher.publish(new Message(actionId, ''));

        expect(target.cd.markForCheck).toHaveBeenCalled();
    });

    it('should ensure change detector ref is injected', () => {
        beforeEach(TestStateActions);
        target.ngOnInit();
        expect(target.cd.markForCheck).toBeDefined();
    });
});