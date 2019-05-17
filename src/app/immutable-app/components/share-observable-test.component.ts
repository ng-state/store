import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ng-state/store';
import { tap, map, publishReplay, refCount } from 'rxjs/operators';

@Component({
    selector: 'share-observable-test',
    template: `
    {{getSharteTest() | async}}
    {{getSharteTest() | async}}
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareObservableTestComponent {
    shareTest;

    constructor(private store: Store<any>) {
        let t = this.store.select(['shareTest']).subscribe(s => {
            let tt = s;
        });
        this.shareTest = this.store.select(['shareTest'])
            .pipe(
                tap(state => {
                    console.log('test');
                }),
                publishReplay(1),
                refCount()
            );
    }

    getSharteTest() {
        return this.shareTest
            .map(state => {
                console.log('labas2');
                return state.get('testValue');
            });
    }
}