import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'book-collection-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="container">
        <nav class="nav">
            <li class="nav-item"><a href="/immutable" class="nav-link">ImmutableJs App</a></li>
            <li class="nav-item"><a href="/immer" class="nav-link">Immer App</a></li>
        </nav>
        <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}