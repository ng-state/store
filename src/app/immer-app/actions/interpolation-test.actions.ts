import { HasStore, InjectStore } from '../../../ng-state/decorators/inject-store.decorator';
import { InitialState } from '../../initial-state';

@InjectStore([])
export class InterpolationTestStateActions extends HasStore<InitialState> {
    get interpolationValue() {
        return this.state.interpolationTest;
    }

    update(randValue: any) {
        this.store.update(state => {
            this.state.interpolationTest = randValue;
        });
    }
}