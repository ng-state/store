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
            if (!this.statePath) {
                this.statePath = [];
            }

            if (stateActions) {
                // DOC - CONVETION: only annonymous function allwed for choosing state; Actions can be only named functions;
                const extractedStateAction = stateActions.name === ''
                    ? stateActions(this)
                    : stateActions;

                const initState = new extractedStateAction();
                this.statePath = initState.createStore(this.statePath, this.stateIndex);
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
    actions: T;
    statePath: any;
    readonly stateIndex?: string | number = null;
}