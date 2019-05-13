import { NgModule } from '@angular/core';
import { DataStrategy } from './data-strategy';
import { ImmutableJsDataStrategy } from './immutablejs.data-strategy';

@NgModule({
    providers: [
        { provide: DataStrategy, useClass: ImmutableJsDataStrategy },
    ]
})
export class ImmutableJsDataStrategyModule {
}
