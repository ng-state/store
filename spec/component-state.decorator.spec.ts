import { ComponentState } from '../src/decorators/component-state.decorator';

class TestStateActions {
    createStore(statePath: string[], stateIndex: number | null) {
        return ['newStatePath'];
    }
};

class TargetComponent {
    statePath: string[];
    stateIndex: number | null;
    actions: any;
    ngOnInit() { };
}

describe('ComponentState decorator', () => {
    let target: TargetComponent;

    let beforeEach = function (actions?) {
        (<any>Reflect).defineMetadata('annotations', [{}], TargetComponent);
        const decorator = ComponentState(actions);
        decorator(TargetComponent);
        target = new TargetComponent();
    };

    it('should add statePath and stateIndex property Angular annotations', () => {
        beforeEach(TestStateActions);
        const metadata = (<any>Reflect).getOwnMetadata('annotations', TargetComponent)[0];
        expect(metadata.inputs[0]).toEqual('statePath');
        expect(metadata.inputs[1]).toEqual('stateIndex');
    });

    it('should initialize statePath if not set', () => {
        beforeEach();
        target.ngOnInit();
        expect(target.statePath.length).toBe(1);
    });

    it ('should resolve stateActions', () => {
        beforeEach(TestStateActions);
        target.ngOnInit();
        expect(target.statePath[0]).toBe('newStatePath');
        expect(target.actions instanceof TestStateActions).toBeTruthy();
    });

    it ('should resolve stateActions from anonymous function', () => {
        beforeEach(() => TestStateActions);
        target.ngOnInit();
        expect(target.statePath[0]).toBe('newStatePath');
        expect(target.actions instanceof TestStateActions).toBeTruthy();
    });
});