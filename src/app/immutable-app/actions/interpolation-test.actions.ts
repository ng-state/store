import { HasStore, InjectStore } from '../../../ng-state/decorators/inject-store.decorator';
import * as Immutable from 'immutable';

@InjectStore([])
export class InterpolationTestStateActions extends HasStore<Immutable.Map<any, any>> {
    get interpolationValue() {
        // return this.store.map(state => state.get('interpolationTest'));
        return this.state.get('interpolationTest');
    }

    update(randValue: any) {
        this.store.update(state => {
            state.set('interpolationTest', randValue);
        });
    }
}