import { HasStore, InjectStore } from '@ng-state/store';
import * as Immutable from 'immutable';

@InjectStore('shareTest')
export class SubSelectTestStateActions extends HasStore<Immutable.Map<any, any>> {
    updateTest() {
        this.store.update(ss => {
            let t = 0;
        });


        this.store.select(['testuu']).update((state) => {
            state.set('test', Math.random());
        });

        this.store.select(['testuu']).select(['test']).map((state) => {
            return state < 0.5;
        }).subscribe(kk => {
            let t = kk;
        });

        this.store.select(['testuu']).reset();

        this.store.update(ss => {
            let t = 0;
        });
    }
}