import { ServiceLocator } from './../helpers/service-locator';
import { ChangeDetectorRef, Input } from '@angular/core';
import { IS_PROD, IS_TEST } from '../ng-state.module';
export function ComponentState(stateActions: any | ((T) => any), disableOnChangesBeforeActionsCreated = true) {
    return (target: any) => {

        let origInit = target.prototype.ngOnInit || (() => { });
        let origDestroy = target.prototype.ngOnDestroy || (() => { });
        let origOnChanges = target.prototype.ngOnChanges || (() => { });

        target.prototype.ngOnChanges = function (changes) {
            if (disableOnChangesBeforeActionsCreated && !this.actions) {
                return;
            }

            origOnChanges.apply(this, arguments);
        };

        target.prototype.ngOnInit = function () {
            const isTest = ServiceLocator.injector.get(IS_TEST);
            if (isTest) {
                origInit.apply(this, arguments);
                return;
            }

            const disableWarnings = ServiceLocator.injector.get(IS_PROD);

            if (!this.statePath) {
                this.statePath = [];
            }

            if (stateActions) {
                // DOC - CONVETION: only annonymous function allwed for choosing state; Actions can be only named functions;
                const extractedStateAction = stateActions.name === ''
                    ? stateActions(this)
                    : stateActions;

                const initState = new extractedStateAction();
                this.statePath = initState.createStore(this.statePath, this.stateIndex, () => {
                    if (this.cd) {
                        this.cd.markForCheck();
                    } else if (!disableWarnings) {
                        console.warn(`The component ${target.name} did not pass ChangeDetectionRef to HasStateActions. It might might lead to not getting latest state when using state without store. e.g: get value = () => thi.state.get('value');`);
                    }
                });
                this.actions = initState;
            }

            origInit.apply(this, arguments);
        };

        target.prototype.ngOnDestroy = function () {
            this.actions.onDestroy();
            origDestroy.apply(this, arguments);
        };
    };
}

export class HasStateActions<T> {
    @Input() statePath: any;
    @Input() stateIndex?: string | number = null;

    readonly actions: T;
    readonly cd: ChangeDetectorRef;

    constructor(cd: ChangeDetectorRef) {
        this.cd = cd;
    }
}