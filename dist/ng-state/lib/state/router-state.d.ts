import { Router } from '@angular/router';
import { Store } from '../store/store';
import { DebugInfo } from '../debug/debug-info';
export declare class RouterState {
    private store;
    private router;
    private debugInfo;
    static startingRoute: string;
    private dataStrategy;
    constructor(store: Store<any>, router: Router, debugInfo: DebugInfo);
    init(): void;
    private initRouter;
    private bindRouter;
}
