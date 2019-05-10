import * as Immutable from 'immutable';

import { HasStore, InjectStore } from '../../../ng-state/decorators/inject-store.decorator';

@InjectStore(['${stateIndex}'])
export class TodoStateActions extends HasStore<Immutable.Map<any, any>> {
    get todoDescription() {
        return this.state.get('description');
    }
}