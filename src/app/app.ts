import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'book-collection-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="container">
        <nav class="nav">
            <li class="nav-item"><a class="nav-link" (click)="navigate('/immutable')">ImmutableJs App</a></li>
            <li class="nav-item"><a class="nav-link" (click)="navigate('/immer')">Immer App</a></li>
        </nav>
        <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
    navigate(url: string) {
        if (window) {
            window.location.href = url;
        }
    }
}