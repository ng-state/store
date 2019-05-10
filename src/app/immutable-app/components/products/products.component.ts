import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
    constructor() {
    }
}
