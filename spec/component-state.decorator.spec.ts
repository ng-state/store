import { ComponentState, ServiceLocator, IS_PROD, Message, Dispatcher } from '@ng-state/store';

const actionId = 'actionId';
class TestStateActions {
    aId = actionId;
    createStore(statePath: string[], stateIndex: number | null) {
        return ['newStatePath'];
    }
}

@ComponentState(TestStateActions)
class TargetComponent {
    statePath: string[];
    stateIndex: number | null;
    actions: any;
    cd: { markForCheck: () => void };

    constructor() {
    }

    ngOnInit() { }
}

const dispatcher = new Dispatcher();

ServiceLocator.injector = <any>{
    get: (key) => {
        if (key === IS_PROD) {
            return false;
        }

        if (key.name === '_Dispatcher') {
            return dispatcher;
        }

        if (key.name === '_ChangeDetectorRef') {
            return {
                markForCheck: () => { }
            };
        }
    }
};

describe('ComponentState decorator', () => {
    let target: TargetComponent;

    beforeEach(() => {
        target = new TargetComponent();
    });

    it('should resolve stateActions', () => {
        target.ngOnInit();
        expect(target.statePath[0]).toBe('newStatePath');
        expect(target.actions instanceof TestStateActions).toBeTruthy();
    });

    it('should resolve stateActions from anonymous function', () => {
        target.ngOnInit();
        expect(target.statePath[0]).toBe('newStatePath');
        expect(target.actions instanceof TestStateActions).toBeTruthy();
    });

    it('should call markForCheck after state change', () => {
        target.ngOnInit();
        jest.spyOn(target.cd, 'markForCheck');

        dispatcher.publish(new Message(actionId, ''));

        expect(target.cd.markForCheck).toHaveBeenCalled();
    });

    it('should ensure change detector ref is injected', () => {
        target.ngOnInit();
        expect(target.cd.markForCheck).toBeDefined();
    });
});