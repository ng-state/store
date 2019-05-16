import { NgModule } from '@angular/core';
import { ImmerDataStrategy } from './immer.data-strategy';
import { DataStrategy } from '@ng-state/data-strategy';

@NgModule({
    providers: [
        { provide: DataStrategy, useClass: ImmerDataStrategy }
    ]
})
export class ImmerDataStrategyModule {
}
