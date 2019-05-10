import { HasStore, InjectStore } from '../../../ng-state/decorators/inject-store.decorator';
import { ShareTest } from '../../initial-state';

@InjectStore('shareTest')
export class SubSelectTestStateActions extends HasStore<ShareTest> {
    updateTest() {
        this.store.update(ss => {
            let t = 0;
        });


        this.store.select(['testuu']).update((state) => {
            state.test = Math.random();
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