import { ModuleWithProviders, NgModule } from '@angular/core';
import { DataStrategy } from './data-strategy';
import { ImmerDataStrategy } from './immer.data-strategy';

@NgModule()
export class ImmerDataStrategyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ImmerDataStrategyModule,
            providers: [
                { provide: DataStrategy, useClass: ImmerDataStrategy },
            ]
        };
    }
}
