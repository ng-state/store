import { Store } from '@ng-state/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersistStateManager } from '@ng-state/store';
import { timer } from 'rxjs';
import { tap, map } from 'rxjs/operators';


@Component({
    selector: 'storage-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <div>
    <button class="btn btn-primary" style="margin-left: 5px;" (click)="add()">add</button>
    <button class="btn btn-primary" style="margin-left: 5px;" (click)="remove()">remove</button>
    <button class="btn btn-primary" style="margin-left: 5px;" (click)="clear()">clear</button>
    <button class="btn btn-primary" style="margin-left: 5px;" (click)="load()">load</button>
    <button class="btn btn-primary" style="margin-left: 5px;" (click)="change()">change</button>
  </div>
  `
})
export class StorageTestComponent {

    constructor(private store: Store<any>) {
        PersistStateManager.configureStorage({
            clear: () => timer(2000).pipe(tap(_ => localStorage.clear())),
            getItem: (key: string) => timer(2000).pipe(map(_ => localStorage.getItem(key))),
            removeItem: (key: string) => timer(2000).pipe(tap(_ => localStorage.removeItem(key))),
            setItem: (key: string, value: any) => timer(2000).pipe(tap(_ => localStorage.setItem(key, value))),
        }, () => timer(2000).pipe(map(_ => Object.keys(localStorage))));
    }

    add() {
        this.store.select(['shareTest']).storage.save().subscribe(state => {
            console.log('2000ms delay save: ', state);
        });

        this.store.select(['shareTest', 'testuu']).storage.save({ storageConfig: { storage: sessionStorage, getKeys: () => Object.keys(sessionStorage) } });
    }

    remove() {
        this.store.select(['shareTest']).storage.remove();
    }

    clear() {
        this.store.select(['shareTest']).storage.clear();
    }

    load() {
        this.store.select(['shareTest']).storage.load();
    }

    change() {
        this.store.select(['shareTest']).update(state => {
            state['testValue'] = 'aaaaaa';
        });
    }
}