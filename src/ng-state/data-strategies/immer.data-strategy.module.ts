import { NgModule } from '@angular/core';
import { DataStrategy } from './data-strategy';
import { ImmerDataStrategy } from './immer.data-strategy';

@NgModule({
    providers: [
        { provide: DataStrategy, useClass: ImmerDataStrategy }
    ]
})
export class ImmerDataStrategyModule {
}
