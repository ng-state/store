import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'book-collection-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="container">
        <nav class="nav">
            <li class="nav-item"><a class="nav-link" routerLink="/immutable">ImmutableJs App</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/immer">Immer App</a></li>
        </nav>
        <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}