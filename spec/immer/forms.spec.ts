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
        if (layoutForm) {
            layoutForm.destroy();
        }
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

    it('should notify property changes - immer', (done) => {
        const onPropertyChange = jest.fn();

        layoutForm = store.select(['layout']).form
            .bind(form, { debounceTime: 0 })
            .onPropertyChange('test', onPropertyChange);

        (<Subject<any>>form.valueChanges).next({ test: 'test2' });
        setTimeout(() => {
            (<Subject<any>>form.valueChanges).next({ test: 'test3' });

            setTimeout(() => {
                expect(onPropertyChange.mock.calls.length).toBe(2);
                expect(onPropertyChange.mock.calls[0]).toEqual(['test2', 'test']);
                expect(onPropertyChange.mock.calls[1]).toEqual(['test3', 'test2']);
                done();
            });
        });
    });

    it('should unsubscribe properly and not leak after rebinding', (done) => {
        const equalsSpy = jest.fn().mockReturnValue(false);
        dataStrategy.equals = equalsSpy;

        let formManager = store.select(['layout']).form;
        let layoutForm = formManager.bind(form, { debounceTime: 0 });

        store.update(state => state['layout']['test'] = 'first');
        layoutForm.destroy();

        equalsSpy.mockClear();

        layoutForm = formManager.bind(form, { debounceTime: 0 });

        store.update(state => state['layout']['test'] = 'second');
        layoutForm.destroy();

        store.update(state => state['layout']['test'] = 'third');

        setTimeout(() => {
            expect(equalsSpy).toHaveBeenCalledTimes(2);
            done();
        });
    });

    /* const UPDATES = 1000;
    it('should measure equality performance on rapid updates', (done) => {
        const layoutForm = store.select(['layout']).form.bind(form, { debounceTime: 0 });

        // Spy on dataStrategy.equals
        const equalsSpy = jest.spyOn(dataStrategy, 'equals');

        const start = performance.now();

        for (let i = 0; i < UPDATES; i++) {
            store.update(state => state.layout.test = 'value' + i);
        }

        // Wait for the form subscription to finish processing
        setTimeout(() => {
            const end = performance.now();
            console.log(`Elapsed time for ${UPDATES} rapid updates: ${(end - start).toFixed(2)} ms`);
            console.log(`Total equality checks: ${equalsSpy.mock.calls.length}`);

            layoutForm.destroy();
            done();
        }, 50);
    }); */
});

class InitialState {
    testProp = 'test';
}