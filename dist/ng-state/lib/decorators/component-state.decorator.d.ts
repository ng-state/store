import { ChangeDetectorRef, OnDestroy, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare function ComponentState(stateActions: any | ((T: any) => any), disableOnChangesBeforeActionsCreated?: boolean): (target: any) => void;
export declare class HasStateActions<T> implements OnInit, OnDestroy, OnChanges {
    statePath: any;
    stateIndex?: string | number;
    readonly actions: T;
    readonly cd: ChangeDetectorRef;
    constructor(cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
