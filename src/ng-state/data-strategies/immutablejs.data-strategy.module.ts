import { ModuleWithProviders, NgModule } from '@angular/core';
import { DataStrategy } from './data-strategy';
import { ImmutableJsDataStrategy } from './immutablejs.data-strategy';

@NgModule()
export class ImmutableJsDataStrategyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ImmutableJsDataStrategyModule,
            providers: [
                { provide: DataStrategy, useClass: ImmutableJsDataStrategy },
            ]
        };
    }
}
