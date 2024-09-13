import { Store } from '@ng-state/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'optimistic-updates',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <br />
    <h3>Optimistic Updates</h3>
  <div>
    <button (click)="tagState()">Tage State</button>
    <button (click)="revertToTag()">Revert To Tag</button>
    <button (click)="revertLastIndex()">Revert Last Index</button>
  </div>
  `
})
export class OptimisticUpdatesComponent {

    constructor(private store: Store<any>) {
    }

    tagState() {
        this.store.optimisticUpdates.tagCurrentState('testTag');
    }

    revertToTag() {
        this.store.optimisticUpdates.revertToTag('testTag');
    }

    revertLastIndex() {
        this.store.optimisticUpdates.revertLastChanges(2);
    }
}