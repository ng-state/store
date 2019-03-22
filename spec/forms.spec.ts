import { StateHistory } from '../src/state/history';
import { Store } from '../src/store/store';
import { stateFactory, storeFactory } from '../src/ng-state.module';
import { Subject } from 'rxjs';
import { HistoryController } from '../src/state/history-controller';
import { FormGroupLike } from '../src/store/plugins/form-manager.plugin';

describe('Forms manager', () => {
    let store: Store<any>;
    let form: FormGroupLike = {
        patchValue: (state: any, params: any) => { },
        valueChanges: new Subject<any>(),
        setValue: () => { },
        get: () => { },
        value: '',
        controls: ''
    };

    describe('', () => {
        beforeEach(() => {
            const initialState = { layout: { test: 'test' } };
            const state = stateFactory(initialState);
            store = storeFactory(state);
            const history = new StateHistory();
            history.init(initialState);
            const historyController = new HistoryController(store, history);
            historyController.init();
        });

        it('should apply state on form bind', () => {
            spyOn(form, 'patchValue');
            store.select(['layout']).form.bind(form);

            expect(form.patchValue).toHaveBeenCalledWith({ test: 'test' }, { 'emitEvent': false });
        });

        it('should update state on form value change', (done) => {
            store.select(['layout']).form.bind(form, { debounceTime: 0 });
            (<Subject<any>>form.valueChanges).next({ test: 'test2' });
            setTimeout(() => {
                expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test2');
                done();
            });
        });

        it('should reset form', () => {
            spyOn(form, 'patchValue');
            const layoutStore = store.select(['layout']);
            layoutStore.update(state => state.set('test', 'test3'));
            expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test3');

            const layoutForm = layoutStore.form.bind(form, { debounceTime: 0 });

            layoutForm.reset();

            expect(StateHistory.CURRENT_STATE.getIn(['layout', 'test'])).toEqual('test');
            expect(form.patchValue).toHaveBeenCalledWith({ test: 'test' }, { 'emitEvent': false });
        });
    });
});

class InitialState {
    testProp = 'test';
}