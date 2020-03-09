import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ng-state/store';
import { NgFormStateManager, ShouldUpdateStateParams } from '@ng-state/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
    filters: FormGroup;
    ngFormStateManager: NgFormStateManager;

    location: any;

    constructor(private store: Store<any>, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.filters = new FormGroup({
            condition: new FormGroup({
                new: new FormControl(false),
                used: new FormControl(false),
                notSpecified: new FormControl(false)
            }),
            location: new FormControl(),
            cars: new FormControl()
        });

        this.store.select(['form', 'location']).subscribe(state => this.location = state);

        this.ngFormStateManager = this.store.select(['form'])
            .form.bind(this.filters)
            .shouldUpdateState((params: ShouldUpdateStateParams) => true)
            .onChange(state => this.cd.markForCheck());
    }

    reset() {
        this.ngFormStateManager.reset();
    }

    resetRoot() {
        this.store.reset();
    }

    ngOnDestroy() {
        this.ngFormStateManager.destroy();
    }

}