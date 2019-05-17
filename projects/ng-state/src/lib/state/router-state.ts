import { Router, NavigationCancel, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Store } from '../store/store';
import { DebugInfo } from '../debug/debug-info';
import { filter, take } from 'rxjs/operators';
import { ServiceLocator } from '../helpers/service-locator';
import { DataStrategy } from '@ng-state/data-strategy';

export class RouterState {
    static startingRoute = '';
    private dataStrategy: DataStrategy;

    constructor(private store: Store<any>, private router: Router, private debugInfo: DebugInfo) {
    }

    init() {
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.initRouter();
        this.bindRouter();
    }

    private initRouter() {
        this.router.events
            .pipe(
                filter(event => event instanceof RoutesRecognized),
                take(1)
            )
            .subscribe((event: RoutesRecognized) => {
                this.store.initialize(['router'], { url: event.url }, false);
            });
    }

    private bindRouter() {
        if (!this.router.events) {
            return;
        }

        let cancelledId = -1;
        this.router.events
            .pipe(filter(() => this.debugInfo && !this.debugInfo.isTimeTravel))
            .subscribe((event) => {
                if (event instanceof NavigationCancel) {
                    cancelledId = (<NavigationCancel>event).id;
                }
                if (event instanceof NavigationEnd && (<NavigationEnd>event).id !== cancelledId) {
                    (<Store<any>>this.store.select(['router'])).update(state => {
                        this.dataStrategy.set(state, 'url', event.url);
                    });
                }
            });
    }
}