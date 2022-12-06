import { Subject } from 'rxjs';
import { Store } from '../../projects/ng-state/src/lib/store/store';
import { FormGroupLike, NgFormStateManager } from '../../projects/ng-state/src/lib/store/plugins/form-manager.plugin';
import { ImmerDataStrategy } from '../../projects/immer-data-strategy/src/lib/immer.data-strategy';
import { NgStateTestBed } from '../../projects/ng-state/src/lib/ng-state.test-bed';
import { StateKeeper } from '../../projects/ng-state/src/lib/state/history';

describe('Forms manager - Immer', () => {
    let store: Store<any>;
    let form: FormGroupLike = {
        patchValue: (state: any, params: any) => { },
        valueChanges: new Subject<any>(),
        setValue: () => { },
        get: () => { },
        value: '',
        controls: ''
    };

    let layoutForm: NgFormStateManager;
    const dataStrategy = new ImmerDataStrategy();

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment(dataStrategy);
        const initialState = { layout: { test: 'test' } };
        store = NgStateTestBed.createStore(initialState);
    });

    afterEach(() => {
        jest.resetAllMocks();
        layoutForm.destroy();
    });

    it('should apply state on form bind', () => {
        jest.spyOn(form, 'patchValue' as any);
        layoutForm = store.select(['layout']).form.bind(form);

        expect(form.patchValue).toHaveBeenCalledWith({ test: 'test' }, { 'emitEvent': false });
    });

    it('should update state on form value change', (done) => {
        layoutForm = store.select(['layout']).form.bind(form, { debounceTime: 0 });
        (<Subject<any>>form.valueChanges).next({ test: 'test2' });
        setTimeout(() => {
            expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test2');
            done();
        });
    });

    it('should reset form', () => {
        jest.spyOn(form, 'patchValue' as any);
        const layoutStore = store.select(['layout']);
        layoutStore.update(state => state['test'] = 'test3');
        expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test3');

        layoutForm = layoutStore.form.bind(form, { debounceTime: 0 });

        layoutForm.reset();

        expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test');
        expect(form.patchValue).toHaveBeenCalledWith({ test: 'test' }, { 'emitEvent': false });
    });

    it('should not update state if shouldUpdateState returns true', (done) => {
        const shoulUpdate = jest.fn().mockReturnValue(true);

        layoutForm = store.select(['layout']).form
            .bind(form, { debounceTime: 0 })
            .shouldUpdateState(shoulUpdate);

        (<Subject<any>>form.valueChanges).next({ test: 'test2' });

        setTimeout(() => {
            expect(shoulUpdate.mock.calls.length).toBe(1);
            expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test2');
            done();
        });

    });

    it('should not update state if shouldUpdateState returns false', (done) => {
        const shoulUpdate = jest.fn().mockReturnValue(false);

        layoutForm = store.select(['layout']).form
            .bind(form, { debounceTime: 0 })
            .shouldUpdateState(shoulUpdate);

        (<Subject<any>>form.valueChanges).next({ test: 'test2' });

        setTimeout(() => {
            expect(shoulUpdate.mock.calls.length).toBe(1);
            expect(StateKeeper.CURRENT_STATE['layout']['test']).toEqual('test');
            done();
        });
    });

    it('should call onChange hook after state change - immer', (done) => {
        const onChange = jest.fn();

        layoutForm = store.select(['layout']).form
            .bind(form, { debounceTime: 0 })
            .onChange(onChange);

        (<Subject<any>>form.valueChanges).next({ test: 'test2' });

        setTimeout(() => {
            expect(onChange.mock.calls.length).toBe(1);
            expect(onChange.mock.calls[0][0]).toMatchObject({ test: 'test2' });
            done();
        });
    });

    it('should call onChange hook after state change pairwise - immer', (done) => {
        const onChange = jest.fn();

        layoutForm = store.select(['layout']).form
            .bind(form, { debounceTime: 0, onChangePairwise: true })
            .onChange(onChange);

        (<Subject<any>>form.valueChanges).next({ test: 'test2' });

        setTimeout(() => {
            (<Subject<any>>form.valueChanges).next({ test: 'test3' });

            setTimeout(() => {
                expect(onChange.mock.calls.length).toBe(2);
                expect(onChange.mock.calls[0][0]).toMatchObject([{ test: 'test' }, { test: 'test2' }]);
                expect(onChange.mock.calls[1][0]).toMatchObject([{ test: 'test2' }, { test: 'test3' }]);
                done();
            });
        });
    });
});

class InitialState {
    testProp = 'test';
}