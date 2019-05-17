import { AppComponent } from './components/app';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterpolationTestComponent } from './components/interpolation-test.component';
import { NgModule } from '@angular/core';
import { RouterHistoryTestComponent } from './components/router-history-test.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ng-state/store';
import { TodoDescription } from './components/todo-description.component';
import { TodosComponent } from './components/todos.component';
import { routes } from './routes';
import { ShareObservableTestComponent } from './components/share-observable-test.component';
import { SubSelectTestComponent } from './components/sub-select.component';
import { ProductsComponent } from './components/products/products.component';
import { FiltersComponent } from './components/products/filters/filters.component';
import { StorageTestComponent } from './components/storage-test.component';
import { initialState } from '../initial-state';
import { ImmerDataStrategyModule } from '@ng-state/immer-data-strategy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore(initialState, false, {
            debugger: {
                enableInitialDebugging: true,
                options: {
                    enableConsoleOutput: false
                }
            },
            history: {
                storeHistoryItems: 50
            }
        }),
        ImmerDataStrategyModule
    ],
    declarations: [
        AppComponent,
        TodosComponent,
        TodoDescription,
        InterpolationTestComponent,
        RouterHistoryTestComponent,
        ShareObservableTestComponent,
        SubSelectTestComponent,
        ProductsComponent,
        FiltersComponent,
        StorageTestComponent
    ]
})
export class ImmerAppModule {
}