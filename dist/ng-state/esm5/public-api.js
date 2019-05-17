/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export { stateFactory, storeFactory, historyControllerFactory, routerStateFactory, debugInfoFactory, RESTORE_FROM_SERVER, TRANSFER_STATE_KEY, INITIAL_STATE, NG_STATE_OPTIONS, IS_PROD, IS_TEST, StoreModule } from './lib/ng-state.module';
export { NgStateTestBed } from './lib/ng-state.test-bed';
export { State } from './lib/state/state';
export { StateHistory, StateKeeper } from './lib/state/history';
export { HistoryController } from './lib/state/history-controller';
export { Store } from './lib/store/store';
export { Initialize } from './lib/store/initialize';
export { Select } from './lib/store/select';
export { Update } from './lib/store/update';
export { Reset } from './lib/store/reset';
export { NgFormStateManager } from './lib/store/plugins/form-manager.plugin';
export { PersistStateManager } from './lib/store/plugins/persist-state.plugin';
export { Helpers } from './lib/helpers/helpers';
export { ServiceLocator } from './lib/helpers/service-locator';
export { Message, Dispatcher } from './lib/services/dispatcher';
export { ComponentState, HasStateActions } from './lib/decorators/component-state.decorator';
export { InjectStore, HasStore } from './lib/decorators/inject-store.decorator';
export { RouterState } from './lib/state/router-state';
export {} from './lib/debug/debug-info-data';
export { DebugInfo } from './lib/debug/debug-info';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbInB1YmxpYy1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG9OQUFjLHVCQUF1QixDQUFDO0FBQ3RDLCtCQUFjLHlCQUF5QixDQUFDO0FBQ3hDLHNCQUFjLG1CQUFtQixDQUFDO0FBQ2xDLDBDQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGtDQUFjLGdDQUFnQyxDQUFDO0FBQy9DLHNCQUFjLG1CQUFtQixDQUFDO0FBQ2xDLDJCQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLHVCQUFjLG9CQUFvQixDQUFDO0FBQ25DLHVCQUFjLG9CQUFvQixDQUFDO0FBQ25DLHNCQUFjLG1CQUFtQixDQUFDO0FBQ2xDLG1DQUFjLHlDQUF5QyxDQUFDO0FBQ3hELG9DQUFjLDBDQUEwQyxDQUFDO0FBQ3pELHdCQUFjLHVCQUF1QixDQUFDO0FBQ3RDLCtCQUFjLCtCQUErQixDQUFDO0FBQzlDLG9DQUFjLDJCQUEyQixDQUFDO0FBQzFDLGdEQUFjLDRDQUE0QyxDQUFDO0FBQzNELHNDQUFjLHlDQUF5QyxDQUFDO0FBQ3hELDRCQUFjLDBCQUEwQixDQUFDO0FBQ3pDLGVBQWMsNkJBQTZCLENBQUM7QUFDNUMsMEJBQWMsd0JBQXdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tICcuL2xpYi9uZy1zdGF0ZS5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9uZy1zdGF0ZS50ZXN0LWJlZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N0YXRlL3N0YXRlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvc3RhdGUvaGlzdG9yeSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N0YXRlL2hpc3RvcnktY29udHJvbGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N0b3JlL3N0b3JlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvc3RvcmUvaW5pdGlhbGl6ZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N0b3JlL3NlbGVjdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N0b3JlL3VwZGF0ZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N0b3JlL3Jlc2V0JztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvc3RvcmUvcGx1Z2lucy9mb3JtLW1hbmFnZXIucGx1Z2luJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvc3RvcmUvcGx1Z2lucy9wZXJzaXN0LXN0YXRlLnBsdWdpbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2hlbHBlcnMvaGVscGVycyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2hlbHBlcnMvc2VydmljZS1sb2NhdG9yJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvZGlzcGF0Y2hlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY29yYXRvcnMvY29tcG9uZW50LXN0YXRlLmRlY29yYXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY29yYXRvcnMvaW5qZWN0LXN0b3JlLmRlY29yYXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N0YXRlL3JvdXRlci1zdGF0ZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlYnVnL2RlYnVnLWluZm8tZGF0YSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlYnVnL2RlYnVnLWluZm8nOyJdfQ==