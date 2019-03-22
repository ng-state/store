import { StateHistory } from '../src/state/history';
import { Store } from '../src/store/store';
import { Subject } from 'rxjs';
import { FormGroupLike } from '../src/store/plugins/form-manager.plugin';
import { NgStateTestBed } from '../src/ng-state.test-bed';

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
            store = NgStateTestBed.createStore(initialState);
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