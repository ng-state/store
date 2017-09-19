import { ChangeDetectorRef } from '@angular/core';
import { ServiceLocator } from '../helpers/service-locator';
import { DISABLE_WARNINGS } from '../ng-state.module';

export function ComponentState(stateActions: any | ((T) => any)) {

        let addStateInputs = function (target) {
            const metadata = (<any>Reflect).getOwnMetadata('annotations', target)[0];
            if (!metadata.inputs) {
                metadata.inputs = [];
            }
            metadata.inputs.push('statePath');
            metadata.inputs.push('stateIndex');
        };

        return (target: any) => {

            let origInit = target.prototype.ngOnInit || (() => { });
            let origDestroy = target.prototype.ngOnDestroy || (() => { });
            addStateInputs(target);

            target.prototype.ngOnInit = function () {
                const disableWarnings = ServiceLocator.injector.get(DISABLE_WARNINGS);

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
        readonly actions: T;
        readonly statePath: any;
        readonly stateIndex?: string | number = null;
        readonly cd: ChangeDetectorRef;

        constructor(cd: ChangeDetectorRef) {
            this.cd = cd;
        }
    }