import { InjectStoreFactory } from './inject-store.factory';
import { CreateStoreOptions } from './inject-store.model';

export const WithStore = () => {
    return (target: any) => {
        target.prototype.createStore = function (options: CreateStoreOptions): any[] {
            return InjectStoreFactory.createStore(this, options);
        };

        target.prototype.createTestStore = function (statePath: any[], options?: { isSignalStore: boolean }) {
            return InjectStoreFactory.createTestStore(this, statePath, options);
        };

        target.prototype.onDestroy = function () {
            InjectStoreFactory.onDestroy(this);
        };
    };
}


