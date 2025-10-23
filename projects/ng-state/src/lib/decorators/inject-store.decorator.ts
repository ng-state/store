import { InjectStoreFactory } from './inject-store.factory';
import { StateIndex, StatePath } from './inject-store.model';

export const InjectStore = (
    newPath: string[] | string | ((currentPath: StatePath, stateIndex: StateIndex) => string[] | string),
    initialState: (Object | any) | (() => (Object | any)) = null,
    options: { debug?: boolean, isPersistentStore?: boolean } = { debug: false, isPersistentStore: false },
) => {
    return (target: any) => {
        target.prototype.createStore = function (currentPath: StatePath = [], stateIndex: StateIndex, opt?: { isSignalStore: boolean }): any[] {
            const initialStateValue = typeof initialState === 'function' ? (initialState as Function)() : initialState;
            return InjectStoreFactory.createStore(this, {
                statePath: currentPath, stateIndex, newPath, initialState: initialStateValue, options: {
                    isSignalStore: opt?.isSignalStore,
                    debug: options.debug,
                    createNewStore: !options.isPersistentStore,
                }
            });
        }

        target.prototype.createTestStore = function (statePath: any[], opt?: { isSignalStore: boolean }) {
            return InjectStoreFactory.createTestStore(this, statePath, opt);
        };

        target.prototype.onDestroy = function () {
            InjectStoreFactory.onDestroy(this);
        };
    };
}
