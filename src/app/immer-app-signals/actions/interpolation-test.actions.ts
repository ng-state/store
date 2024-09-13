import { HasSignalStore, HasStore, InjectStore } from '@ng-state/store';
import { InitialState } from '../../initial-state';

@InjectStore([])
export class InterpolationTestStateActions extends HasSignalStore<InitialState> {
    get interpolationValue() {
        return this.state().interpolationTest;
    }

    update(randValue: any) {
        this.store.update(state => {
            state.interpolationTest = randValue;
        });
    }
}