import { Router, NavigationCancel, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Store } from '../store/store';

export class RouterState {

    constructor(private store: Store<any>, private router: Router) {
    }

    init() {
        this.initRouter();
        this.bindRouter();
    }

    private initRouter() {
        const initialRouteSubscription = this.router.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
                this.store.initialize(['router'], { url: event.url }, false);
                initialRouteSubscription.unsubscribe();
            }
        });
    }

    private bindRouter() {
        if (!this.router.events) {
            return;
        }

        let cancelledId = -1;
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationCancel) {
                cancelledId = (<NavigationCancel>event).id;
            }
            if (event instanceof NavigationEnd && (<NavigationEnd>event).id !== cancelledId) {
                (<Store<any>>this.store.select(['router'])).update(state => {
                    state.set('url', event.url);
                });
            }
        });
    }
}