import { AppComponent } from './app';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({ appId: 'example-app' }),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        TransferHttpCacheModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', redirectTo: 'immutable' },
            { path: 'immutable', loadChildren: () => import('./immutable-app/immutable.module').then(m => m.ImmutableAppModule) },
            { path: 'immer', loadChildren: () => import('./immer-app/immer.module').then(m => m.ImmerAppModule) },
            { path: 'immer-signals', loadChildren: () => import('./immer-app-signals/immer-signals.module').then(m => m.ImmerAppSignalsModule) }
        ], { useHash: false })
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}