import { InjectStoreFactory } from './inject-store.factory';
import { StateIndex, StatePath } from './inject-store.model';

export const InjectStore = (
    newPath: string[] | string | ((currentPath: StatePath, stateIndex: StateIndex) => string[] | string),
    initialState: Object | any = null,
    debug: boolean = false,
) => {
    return (target: any) => {
        target.prototype.createStore = function (currentPath: StatePath = [], stateIndex: StateIndex, options?: { isSignalStore: boolean }): any[] {
            return InjectStoreFactory.createStore(this, { statePath: currentPath, stateIndex, newPath, initialState, options: { isSignalStore: options?.isSignalStore, debug } });
        }

        target.prototype.createTestStore = function (statePath: any[], options?: { isSignalStore: boolean }) {
            return InjectStoreFactory.createTestStore(this, statePath, options);
        };

        target.prototype.onDestroy = function () {
            InjectStoreFactory.onDestroy(this);
        };
    };
}
