import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
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
    filters: UntypedFormGroup;
    ngFormStateManager: NgFormStateManager;

    location: any;

    constructor(private store: Store<any>, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.filters = new UntypedFormGroup({
            condition: new UntypedFormGroup({
                new: new UntypedFormControl(false),
                used: new UntypedFormControl(false),
                notSpecified: new UntypedFormControl(false)
            }),
            location: new UntypedFormControl(),
            cars: new UntypedFormControl()
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