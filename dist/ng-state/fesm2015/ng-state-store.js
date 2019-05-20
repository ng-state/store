import { makeStateKey, TransferState } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationEnd, RoutesRecognized, Router } from '@angular/router';
import { filter, share, map, take, distinctUntilChanged, takeWhile, tap, debounceTime, takeUntil } from 'rxjs/operators';
import { Injectable, NgZone, Inject, Injector, NgModule, InjectionToken, ChangeDetectorRef, Input } from '@angular/core';
import { Subject, BehaviorSubject, isObservable, from, of, ReplaySubject, forkJoin, Observable } from 'rxjs';
import { DataStrategy } from '@ng-state/data-strategy';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Message {
    /**
     * @param {?=} type
     * @param {?=} payload
     */
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
class Dispatcher {
    constructor() {
        this.subject = new Subject();
    }
    /**
     * @return {?}
     */
    get observable() {
        return this.subject.asObservable();
    }
    /**
     * @param {?} messageType
     * @return {?}
     */
    getMessagesOfType(messageType) {
        return this.subject.pipe(filter((/**
         * @param {?} msg
         * @return {?}
         */
        msg => msg.type === messageType)), share());
    }
    /**
     * @param {?} message
     * @param {?=} payload
     * @return {?}
     */
    publish(message, payload) {
        message = ((/** @type {?} */ (message))).type !== undefined
            ? message
            : new Message((/** @type {?} */ (message)), payload);
        this.subject.next(message);
    }
    /**
     * @param {?} messageType
     * @param {?} observerOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    subscribe(messageType, observerOrNext, error, complete) {
        messageType = ((/** @type {?} */ (messageType))).prototype instanceof Message
            ? ((/** @type {?} */ (new ((/** @type {?} */ (messageType)))()))).type
            : messageType;
        return this.getMessagesOfType((/** @type {?} */ (messageType)))
            .pipe(map((/**
         * @param {?} msg
         * @return {?}
         */
        msg => msg.payload)))
            .subscribe(observerOrNext, error, complete);
    }
}
Dispatcher.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ServiceLocator {
}
ServiceLocator.injector = null;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RouterState {
    /**
     * @param {?} store
     * @param {?} router
     * @param {?} debugInfo
     */
    constructor(store, router, debugInfo) {
        this.store = store;
        this.router = router;
        this.debugInfo = debugInfo;
    }
    /**
     * @return {?}
     */
    init() {
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.initRouter();
        this.bindRouter();
    }
    /**
     * @private
     * @return {?}
     */
    initRouter() {
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof RoutesRecognized)), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.store.initialize(['router'], { url: event.url }, false);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    bindRouter() {
        if (!this.router.events) {
            return;
        }
        /** @type {?} */
        let cancelledId = -1;
        this.router.events
            .pipe(filter((/**
         * @return {?}
         */
        () => this.debugInfo && !this.debugInfo.isTimeTravel)))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event instanceof NavigationCancel) {
                cancelledId = ((/** @type {?} */ (event))).id;
            }
            if (event instanceof NavigationEnd && ((/** @type {?} */ (event))).id !== cancelledId) {
                ((/** @type {?} */ (this.store.select(['router'])))).update((/**
                 * @param {?} state
                 * @return {?}
                 */
                state => {
                    this.dataStrategy.set(state, 'url', event.url);
                }));
            }
        }));
    }
}
RouterState.startingRoute = '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class State extends BehaviorSubject {
    /**
     * @param {?} initialState
     * @param {?} dataStrategy
     */
    constructor(initialState, dataStrategy) {
        dataStrategy.overrideContructor(initialState);
        super(dataStrategy.fromJS(initialState));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StateHistory {
    constructor() {
        this.options = {
            collectHistory: true,
            storeHistoryItems: 100
        };
    }
    /**
     * @return {?}
     */
    get currentState() {
        return StateKeeper.CURRENT_STATE;
    }
    /**
     * @return {?}
     */
    get history() {
        return StateKeeper.HISTORY;
    }
    /**
     * @return {?}
     */
    get storeHistoryItems() {
        return this.options.storeHistoryItems;
    }
    /**
     * @param {?} initialState
     * @return {?}
     */
    init(initialState) {
        StateHistory.initialState = initialState;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    changeDefaults(options) {
        this.options = Object.assign({}, this.options, options);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setCurrentState(state) {
        StateKeeper.CURRENT_STATE = state;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    add(item) {
        if (!this.options.collectHistory) {
            return;
        }
        if (StateKeeper.HISTORY.length >= this.options.storeHistoryItems) {
            StateKeeper.HISTORY.shift();
        }
        StateKeeper.HISTORY.push(item);
    }
}
StateHistory.initialState = {};
StateHistory.decorators = [
    { type: Injectable }
];
class StateKeeper {
}
StateKeeper.CURRENT_STATE = null;
StateKeeper.HISTORY = [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Select {
    /**
     * @param {?} path
     */
    constructor(path) {
        /** @type {?} */
        let mapped$;
        /** @type {?} */
        const dataStrategy = ServiceLocator.injector.get(DataStrategy);
        if (typeof path === 'object') {
            mapped$ = ((/** @type {?} */ (this))).pipe(map((/**
             * @param {?} state
             * @return {?}
             */
            (state) => dataStrategy.getIn(state, path))), takeWhile((/**
             * @param {?} state
             * @return {?}
             */
            (state) => state !== undefined)), distinctUntilChanged());
        }
        else {
            throw new TypeError(`Unexpected type ${typeof path} in select operator,`
                + ` expected 'object' or 'function'`);
        }
        return mapped$;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DebugInfo {
    /**
     * @param {?} stateHistory
     * @param {?} zone
     * @param {?} dataStrategy
     */
    constructor(stateHistory, zone, dataStrategy) {
        this.stateHistory = stateHistory;
        this.zone = zone;
        this.dataStrategy = dataStrategy;
        this.debugInfo = null;
        this.debugStatePath = null;
        this.devTools = null;
        this.devToolsSubscription = null;
        this.options = {
            enableConsoleOutput: true,
            enableDevToolsOutput: true
        };
        this.isTimeTravel = false;
        this.onApplyHistory = new Subject();
        this.start = (/**
         * @param {?=} statePath
         * @return {?}
         */
        (statePath = []) => {
            this.debugStatePath = statePath;
            this.debugMode = true;
            this.stopTrackingWithDevTools();
            this.setWithDevTools();
            this.trackWithDevTools(statePath);
            this.onStateChange(this.stateHistory.currentState, true);
        });
        this.stop = (/**
         * @return {?}
         */
        () => {
            this.debugMode = false;
            this.stopTrackingWithDevTools();
        });
    }
    /**
     * @return {?}
     */
    get publicApi() {
        return {
            start: this.start,
            stop: this.stop
        };
    }
    /**
     * @return {?}
     */
    get isDebugMode() {
        return this.debugMode;
    }
    /**
     * @param {?} debugMode
     * @return {?}
     */
    init(debugMode) {
        this.debugMode = debugMode;
        this.setWithDevTools();
        if (!this.withDevTools || !debugMode) {
            return;
        }
        this.trackWithDevTools([]);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    changeDefaults(options) {
        this.options = Object.assign({}, this.options, options);
    }
    /**
     * @param {?} info
     * @return {?}
     */
    add(info) {
        if (this.debugMode) {
            this.debugInfo = Object.assign({}, info);
        }
    }
    /**
     * @param {?} state
     * @param {?} isIntialState
     * @return {?}
     */
    onStateChange(state, isIntialState) {
        if (this.debugMode && !this.isTimeTravel) {
            this.logDebugInfo(state, isIntialState);
        }
    }
    /**
     * @return {?}
     */
    turnOnTimeTravel() {
        this.isTimeTravel = true;
    }
    /**
     * @return {?}
     */
    turnOffTimeTravel() {
        this.isTimeTravel = false;
    }
    /**
     * @private
     * @param {?} state
     * @param {?} isIntialState
     * @return {?}
     */
    logDebugInfo(state, isIntialState) {
        /** @type {?} */
        let debugState = this.debugStatePath && this.dataStrategy.getIn(state, this.debugStatePath) || state;
        if (this.dataStrategy.isObject(debugState)) {
            debugState = this.dataStrategy.toJS(debugState);
        }
        /** @type {?} */
        const debugMessage = this.getDebugMessage();
        this.consoleLog(debugMessage, debugState);
        if (!this.withDevTools) {
            return;
        }
        if (isIntialState) {
            this.devTools.init(debugState);
        }
        else {
            this.devTools.send(debugMessage, debugState);
        }
        this.stateHistory.add({ message: debugMessage, state: debugState });
        this.debugInfo = null;
    }
    /**
     * @private
     * @param {?} message
     * @param {?} state
     * @return {?}
     */
    consoleLog(message, state) {
        if (this.options.enableConsoleOutput) {
            console.info(message, state);
        }
    }
    /**
     * @private
     * @return {?}
     */
    getDebugMessage() {
        /** @type {?} */
        let message = '@state/';
        if (!this.debugInfo) {
            return `${message}${this.getDebugStatePath()}`;
        }
        message += `${this.debugInfo.statePath.join('/')} - `;
        message += `${(this.debugInfo.message ? this.debugInfo.message.toUpperCase() : (this.debugInfo.actionType || ''))}`;
        return message;
    }
    /**
     * @private
     * @return {?}
     */
    getDebugStatePath() {
        return this.debugStatePath && this.debugStatePath.length > 0
            ? this.debugStatePath.join('->')
            : 'root';
    }
    /**
     * @private
     * @param {?} statePath
     * @return {?}
     */
    trackWithDevTools(statePath) {
        if (!this.withDevTools || this.devTools) {
            return;
        }
        this.zone.run((/**
         * @return {?}
         */
        () => {
            this.devTools = window['__REDUX_DEVTOOLS_EXTENSION__'].connect({ maxAge: this.stateHistory.storeHistoryItems });
        }));
        this.devToolsSubscription = this.devTools.subscribe((/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
            if (message.type === 'DISPATCH' && (message.payload.type === 'JUMP_TO_ACTION' || message.payload.type === 'JUMP_TO_STATE')) {
                this.onApplyHistory.next({
                    state: this.dataStrategy.fromJS(JSON.parse(message.state)),
                    statePath: statePath
                });
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    stopTrackingWithDevTools() {
        if (this.withDevTools) {
            this.withDevTools = false;
            window['__REDUX_DEVTOOLS_EXTENSION__'].disconnect();
            this.devToolsSubscription();
            this.devTools = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    setWithDevTools() {
        this.withDevTools = this.options.enableDevToolsOutput && typeof window !== 'undefined' && !!window['__REDUX_DEVTOOLS_EXTENSION__'];
    }
}
DebugInfo.instance = null;
DebugInfo.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DebugInfo.ctorParameters = () => [
    { type: StateHistory },
    { type: NgZone },
    { type: DataStrategy }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Update {
    /**
     * @param {?} action
     * @param {?=} debugInfo
     */
    constructor(action, debugInfo = {}) {
        /** @type {?} */
        const defaultDebugInfo = { actionType: "UPDATE" /* Update */, statePath: ((/** @type {?} */ (this))).statePath };
        DebugInfo.instance.add(Object.assign({}, defaultDebugInfo, debugInfo));
        /** @type {?} */
        const dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        try {
            dataStrategy.update(((/** @type {?} */ (this))).statePath, action);
        }
        catch (exception) {
            console.error(exception);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Initialize {
    /**
     * @param {?} statePath
     * @param {?=} initialState
     */
    constructor(statePath, initialState = null) {
        /** @type {?} */
        const initialized = '__initialized';
        /** @type {?} */
        let actionWrapper = (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            const dataStrategy = ServiceLocator.injector.get(DataStrategy);
            if (dataStrategy.getIn(state, [...statePath, initialized])) {
                return;
            }
            dataStrategy.overrideContructor(initialState);
            initialState.constructor = Object;
            initialState = dataStrategy.fromJS(initialState);
            initialState = dataStrategy.set(initialState, initialized, true);
            /** @type {?} */
            let newState;
            try {
                newState = dataStrategy.setIn(state, statePath, initialState);
                this.newStore = ((/** @type {?} */ (this))).select(statePath);
                this.newStore.initialState = initialState;
                this.newStore.rootPath = statePath;
            }
            catch (exception) {
                console.error(exception);
            }
            ((/** @type {?} */ (this))).source.next(newState);
        }).bind(this);
        /** @type {?} */
        const defaultDebugInfo = { actionType: "INITIALIZE" /* Initialize */, statePath: statePath };
        DebugInfo.instance.add(defaultDebugInfo);
        ((/** @type {?} */ (this))).pipe(tap(actionWrapper), take(1)).subscribe();
        return (/** @type {?} */ (this.newStore));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, R
 */
class Map {
    /**
     * @param {?} action
     */
    constructor(action) {
        return ((/** @type {?} */ (this))).pipe(map((/**
         * @param {?} state
         * @return {?}
         */
        (state) => action(state))));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Reset {
    /**
     * @param {?=} debugMessage
     */
    constructor(debugMessage = null) {
        /** @type {?} */
        const dataStrategy = ServiceLocator.injector.get(DataStrategy);
        /** @type {?} */
        const restoreState = (/**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            /** @type {?} */
            let path = store.statePath.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !store.rootPath.includes(item)));
            /** @type {?} */
            const isRootPath = Array.isArray(path) && path.length === 0;
            if (isRootPath) {
                dataStrategy.resetRoot(StateHistory.initialState, RouterState.startingRoute);
            }
            else {
                /** @type {?} */
                let initialState = !!store.initialState
                    ? store.initialState
                    : dataStrategy.fromJS(StateHistory.initialState);
                initialState = dataStrategy.getIn(initialState, (path));
                dataStrategy.reset(store.statePath, initialState);
            }
            /** @type {?} */
            const defaultDebugInfo = { actionType: "RESET" /* Reset */, statePath: path, debugMessage: debugMessage };
            DebugInfo.instance.add(defaultDebugInfo);
        });
        if (!dataStrategy.isObject(dataStrategy.getIn(StateKeeper.CURRENT_STATE, (((/** @type {?} */ (this))).statePath)))) {
            throw new Error(`Cannot resotre state at path: ${((/** @type {?} */ (this))).statePath}. Maybe you are trying to restore value rather then state.`);
        }
        restoreState(((/** @type {?} */ (this))));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgFormStateManager {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.unsubscribe = new Subject();
        this.store = store;
    }
    /**
     * @param {?} form
     * @param {?=} params
     * @return {?}
     */
    bind(form, params = {}) {
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.form = form;
        this.params = Object.assign({ debounceTime: 100, emitEvent: false }, params);
        this.setInitialValue();
        this.subscribeToFormChange();
        return this;
    }
    /**
     * @return {?}
     */
    reset() {
        this.store.reset();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
        this.form = null;
        this.store = null;
        this.onChangeFn = null;
        this.shouldUpdateStateFn = null;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} onChangeFn
     * @return {THIS}
     */
    onChange(onChangeFn) {
        (/** @type {?} */ (this)).onChangeFn = onChangeFn;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} shouldUpdateStateFn
     * @return {THIS}
     */
    shouldUpdateState(shouldUpdateStateFn) {
        (/** @type {?} */ (this)).shouldUpdateStateFn = shouldUpdateStateFn;
        return (/** @type {?} */ (this));
    }
    /**
     * @private
     * @return {?}
     */
    setInitialValue() {
        this.store
            .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            this.form.patchValue(this.dataStrategy.toJS(state), { emitEvent: this.params.emitEvent });
        }));
    }
    /**
     * @private
     * @return {?}
     */
    subscribeToFormChange() {
        this.form.valueChanges
            .pipe(debounceTime(this.params.debounceTime), distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            /** @type {?} */
            let stateUpdated = false;
            this.store.update((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                stateUpdated = this.executeUpdate(value, state);
            }));
            if (stateUpdated) {
                this.onChangeCall();
            }
        }));
    }
    /**
     * @private
     * @param {?} value
     * @param {?} state
     * @return {?}
     */
    executeUpdate(value, state) {
        if (this.shouldUpdateStateFn) {
            if (this.shouldUpdateStateFn({
                form: this.form,
                state: state,
                value: value
            })) {
                this.dataStrategy.merge(state, this.dataStrategy.fromJS(value));
                return true;
            }
        }
        else {
            this.dataStrategy.merge(state, this.dataStrategy.fromJS(value));
            return true;
        }
        return false;
    }
    /**
     * @private
     * @return {?}
     */
    onChangeCall() {
        if (this.onChangeFn) {
            this.store
                .pipe(take(1))
                .subscribe((/**
             * @param {?} state
             * @return {?}
             */
            state => {
                this.onChangeFn(this.dataStrategy.toJS(state));
            }));
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PersistStateManager {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.store = store;
        this.prefix = 'state::';
        this.defaults = {
            key: '',
            storageConfig: null,
            deserialize: JSON.parse,
            serialize: JSON.stringify
        };
    }
    /**
     * @param {?} storage
     * @param {?} getKeys
     * @return {?}
     */
    static configureStorage(storage, getKeys) {
        PersistStateManager.customStorageConfig.storageConfig = { storage: storage, getKeys: getKeys };
    }
    /**
     * @param {?} serialize
     * @param {?} deserialize
     * @return {?}
     */
    static configureSerializer(serialize, deserialize) {
        PersistStateManager.customStorageConfig.serialize = serialize;
        PersistStateManager.customStorageConfig.deserialize = deserialize;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    save(params) {
        /** @type {?} */
        const dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        /** @type {?} */
        const onSaveComplete = new ReplaySubject(1);
        params = this.getParams(params, this.store);
        this.store.pipe(tap((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            this.resolve(params.storageConfig.storage.setItem(params.key, params.serialize(dataStrategy.toJS(state))))
                .pipe(take(1))
                .subscribe((/**
             * @param {?} _
             * @return {?}
             */
            _ => {
                onSaveComplete.next({
                    key: params.key,
                    data: dataStrategy.toJS(state)
                });
            }));
        })), take(1)).subscribe();
        return onSaveComplete
            .asObservable()
            .pipe(take(1));
    }
    /**
     * @param {?=} params
     * @param {?=} keepEntry
     * @return {?}
     */
    load(params, keepEntry = false) {
        /** @type {?} */
        const dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        /** @type {?} */
        const onLoadComplete = new ReplaySubject(1);
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.storage.getItem(params.key))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} loadedState
         * @return {?}
         */
        loadedState => {
            this.store.update((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                dataStrategy.merge(state, dataStrategy.fromJS(params.deserialize(loadedState)));
            }));
            if (!keepEntry) {
                this.removeAction(params);
            }
            onLoadComplete.next({
                key: params.key,
                data: loadedState
            });
        }));
        return onLoadComplete
            .asObservable()
            .pipe(take(1));
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    remove(params) {
        params = this.getParams(params, this.store);
        return this.removeAction(params);
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    clear(params) {
        /** @type {?} */
        const onClearComplete = new ReplaySubject(1);
        /** @type {?} */
        const clearKeys = [];
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.getKeys())
            .pipe(take(1))
            .subscribe((/**
         * @param {?} keys
         * @return {?}
         */
        keys => {
            keys.filter((/**
             * @param {?} e
             * @return {?}
             */
            (e) => e.startsWith(this.prefix)))
                .map((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                /** @type {?} */
                const localParams = Object.assign({}, params);
                localParams.key = key;
                clearKeys.push(this.removeAction(localParams));
            }));
            forkJoin(clearKeys)
                .pipe(take(1))
                .subscribe((/**
             * @param {?} keys
             * @return {?}
             */
            keys => {
                onClearComplete.next(keys);
            }));
        }));
        return onClearComplete
            .asObservable()
            .pipe(take(1));
    }
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    removeAction(params) {
        /** @type {?} */
        const onRemoveComplete = new ReplaySubject(1);
        this.resolve(params.storageConfig.storage.removeItem(params.key))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => {
            onRemoveComplete.next(params.key);
        }));
        return onRemoveComplete
            .asObservable()
            .pipe(take(1));
    }
    /**
     * @private
     * @param {?} params
     * @param {?} store
     * @return {?}
     */
    getParams(params, store) {
        this.setDefaultStorage();
        params = Object.assign({}, this.defaults, PersistStateManager.customStorageConfig, params);
        if (!params.key) {
            params.key = store.statePath.join('.');
        }
        params.key = `${this.prefix}${params.key}`;
        return params;
    }
    /**
     * @private
     * @return {?}
     */
    setDefaultStorage() {
        if (!this.defaults.storageConfig) {
            this.defaults.storageConfig = {
                storage: localStorage,
                getKeys: (/**
                 * @return {?}
                 */
                () => Object.keys(localStorage))
            };
        }
    }
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    isPromise(v) {
        return v && typeof v.then === 'function';
    }
    /**
     * @private
     * @param {?} asyncOrValue
     * @return {?}
     */
    resolve(asyncOrValue) {
        if (this.isPromise(asyncOrValue) || isObservable(asyncOrValue)) {
            return from(asyncOrValue);
        }
        return of(asyncOrValue);
    }
}
PersistStateManager.customStorageConfig = {};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class Store extends Observable {
    /**
     * @param {?} state
     */
    constructor(state) {
        super();
        this.statePath = [];
        this.rootPath = [];
        this.select = (/**
         * @param {?} statePath
         * @return {?}
         */
        (statePath) => {
            /** @type {?} */
            let selectStore = Select.bind(this).call(this, statePath);
            selectStore.statePath = [...this.statePath, ...statePath];
            selectStore.rootPath = this.rootPath;
            selectStore.initialState = this.initialState;
            this.initializeOperators(selectStore);
            return selectStore;
        });
        this.source = state;
        this.initializeOperators(this);
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        /** @type {?} */
        const store = new Store(this);
        store.operator = operator;
        return store;
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        console.log(err);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    next(state) {
        ((/** @type {?} */ (this.source))).next(state);
    }
    /**
     * @return {?}
     */
    complete() {
    }
    /**
     * @param {?} storeContext
     * @return {?}
     */
    initializeOperators(storeContext) {
        storeContext.update = Update.bind(storeContext);
        storeContext.initialize = Initialize.bind(storeContext);
        storeContext.reset = Reset.bind(storeContext);
        storeContext.map = Map.bind(storeContext);
        storeContext.form = new NgFormStateManager(storeContext);
        storeContext.storage = new PersistStateManager(storeContext);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HistoryController {
    /**
     * @param {?} store
     * @param {?} history
     * @param {?} debugerInfo
     * @param {?} router
     * @param {?} dataStrategy
     */
    constructor(store, history, debugerInfo, router, dataStrategy) {
        this.store = store;
        this.history = history;
        this.debugerInfo = debugerInfo;
        this.router = router;
        this.dataStrategy = dataStrategy;
        this.onHistoryChange = new Subject();
        this.applyHistory = (/**
         * @param {?} debugHistoryItem
         * @return {?}
         */
        (debugHistoryItem) => {
            this.debugerInfo.turnOnTimeTravel();
            /** @type {?} */
            const targetRoute = this.dataStrategy.getIn(debugHistoryItem.state, ['router', 'url']);
            if (targetRoute && this.router.url !== targetRoute) {
                this.router.navigateByUrl(targetRoute).then((/**
                 * @param {?} _
                 * @return {?}
                 */
                _ => {
                    this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
                }));
            }
            else {
                this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
            }
            this.onHistoryChange
                .pipe(take(1))
                .subscribe((/**
             * @param {?} _
             * @return {?}
             */
            _ => {
                this.debugerInfo.turnOffTimeTravel();
            }));
        });
    }
    /**
     * @return {?}
     */
    init() {
        this.store.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            /** @type {?} */
            const isIntialState = !this.history.currentState;
            this.history.setCurrentState(state);
            this.debugerInfo.onStateChange(state, isIntialState);
            this.onHistoryChange.next(true);
        }));
        this.debugerInfo.onApplyHistory.subscribe(this.applyHistory);
    }
    /**
     * @private
     * @param {?} targetState
     * @param {?} statePath
     * @return {?}
     */
    applyState(targetState, statePath) {
        if (statePath.length === 0) {
            this.store.next(targetState);
        }
        else {
            this.store
                .update((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                this.dataStrategy.setIn(state, statePath, targetState, { fromUpdate: true });
            }));
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const RESTORE_FROM_SERVER = new InjectionToken('RESTORE_FROM_SERVER');
/** @type {?} */
const TRANSFER_STATE_KEY = 'state';
/** @type {?} */
const INITIAL_STATE = new InjectionToken('INITIAL_STATE');
/** @type {?} */
const NG_STATE_OPTIONS = new InjectionToken('NG_STATE_OPTIONS');
/** @type {?} */
const IS_PROD = new InjectionToken('IS_PROD');
/** @type {?} */
const IS_TEST = new InjectionToken('IS_TEST');
/**
 * @param {?} initialState
 * @param {?} dataStrategy
 * @param {?=} transferState
 * @param {?=} restoreFromServer
 * @return {?}
 */
function stateFactory(initialState, dataStrategy, transferState, restoreFromServer) {
    if (transferState && restoreFromServer) {
        /** @type {?} */
        const stateKey = makeStateKey(TRANSFER_STATE_KEY);
        if (transferState.hasKey(stateKey)) {
            initialState = transferState.get(stateKey, initialState);
        }
    }
    return new State(initialState, dataStrategy);
}
/**
 * @param {?} state
 * @return {?}
 */
function storeFactory(state) {
    return new Store(state);
}
/**
 * @param {?} store
 * @param {?} history
 * @param {?} debugerInfo
 * @param {?} router
 * @param {?} dataStrategy
 * @return {?}
 */
function historyControllerFactory(store, history, debugerInfo, router, dataStrategy) {
    return new HistoryController(store, history, debugerInfo, router, dataStrategy);
}
/**
 * @param {?} store
 * @param {?} router
 * @param {?} debugerInfo
 * @return {?}
 */
function routerStateFactory(store, router, debugerInfo) {
    return new RouterState(store, router, debugerInfo);
}
/**
 * @param {?} history
 * @param {?} zone
 * @param {?} dataStrategy
 * @return {?}
 */
function debugInfoFactory(history, zone, dataStrategy) {
    return new DebugInfo(history, zone, dataStrategy);
}
class StoreModule {
    /**
     * @param {?} stateHistory
     * @param {?} debugInfo
     * @param {?} injector
     * @param {?} historyController
     * @param {?} routerState
     * @param {?} dataStrategy
     * @param {?} store
     * @param {?} initialState
     * @param {?} ngStateOptions
     * @param {?} isProd
     */
    constructor(stateHistory, debugInfo, injector, historyController, routerState, dataStrategy, store, initialState, ngStateOptions, isProd) {
        this.stateHistory = stateHistory;
        this.debugInfo = debugInfo;
        ServiceLocator.injector = injector;
        this.initStateHistory(initialState, ngStateOptions);
        this.initDebugger(ngStateOptions);
        historyController.init();
        routerState.init();
        // if (!isProd) {
        ((/** @type {?} */ (window))).state = {
            history: StateKeeper,
            debug: debugInfo.publicApi
        };
        // }
        dataStrategy.init(store, isProd);
    }
    /**
     * @param {?} initialState
     * @param {?=} isProd
     * @param {?=} options
     * @param {?=} restoreStateFromServer
     * @return {?}
     */
    static provideStore(initialState, isProd, options = {}, restoreStateFromServer) {
        return {
            ngModule: StoreModule,
            providers: [
                { provide: NG_STATE_OPTIONS, useValue: options },
                { provide: INITIAL_STATE, useValue: initialState },
                { provide: IS_PROD, useValue: isProd },
                { provide: IS_TEST, useValue: false },
                { provide: RESTORE_FROM_SERVER, useValue: restoreStateFromServer },
                { provide: State, useFactory: stateFactory, deps: [INITIAL_STATE, DataStrategy, TransferState, RESTORE_FROM_SERVER] },
                { provide: Store, useFactory: storeFactory, deps: [State] },
                { provide: StateHistory, useClass: StateHistory },
                { provide: DebugInfo, useFactory: debugInfoFactory, deps: [StateHistory, NgZone, DataStrategy] },
                { provide: HistoryController, useFactory: historyControllerFactory, deps: [Store, StateHistory, DebugInfo, Router, DataStrategy] },
                { provide: RouterState, useFactory: routerStateFactory, deps: [Store, Router, DebugInfo] },
                Dispatcher
            ]
        };
    }
    /**
     * @private
     * @param {?} initialState
     * @param {?} ngStateOptions
     * @return {?}
     */
    initStateHistory(initialState, ngStateOptions) {
        if (ngStateOptions && ngStateOptions.history) {
            this.stateHistory.changeDefaults(ngStateOptions.history);
        }
        this.stateHistory.init(initialState);
    }
    /**
     * @private
     * @param {?} ngStateOptions
     * @return {?}
     */
    initDebugger(ngStateOptions) {
        DebugInfo.instance = this.debugInfo;
        if (!ngStateOptions || !ngStateOptions.debugger) {
            return;
        }
        if (ngStateOptions.debugger.options) {
            this.debugInfo.changeDefaults(ngStateOptions.debugger.options);
        }
        if (ngStateOptions.debugger.enableInitialDebugging) {
            this.debugInfo.init(true);
        }
    }
}
StoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule]
            },] }
];
/** @nocollapse */
StoreModule.ctorParameters = () => [
    { type: StateHistory },
    { type: DebugInfo },
    { type: Injector },
    { type: HistoryController },
    { type: RouterState },
    { type: DataStrategy },
    { type: Store },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [NG_STATE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [IS_PROD,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgStateTestBed {
    /**
     * @param {?} dataStrategy
     * @return {?}
     */
    static setTestEnvironment(dataStrategy) {
        this.dependencyInjection = [];
        this.dependencyInjection.push({ key: this.getMockName(IS_TEST), value: true });
        this.dependencyInjection.push({ key: this.getMockName(DataStrategy), value: dataStrategy });
        ServiceLocator.injector = {
            get: (/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                /** @type {?} */
                const name = this.getMockName(key);
                /** @type {?} */
                const service = this.dependencyInjection.find((/**
                 * @param {?} k
                 * @return {?}
                 */
                k => k.key === name));
                if (!service) {
                    throw new Error(`Mock is not found for: ${key}`);
                }
                return service.value;
            })
        };
        this.dataStrategy = dataStrategy;
    }
    /**
     * @param {?} initialState
     * @return {?}
     */
    static createStore(initialState) {
        /** @type {?} */
        const state = stateFactory(initialState, this.dataStrategy);
        /** @type {?} */
        const store = storeFactory(state);
        this.dataStrategy.init(store, false);
        /** @type {?} */
        const stateHistory = new StateHistory();
        stateHistory.init(initialState);
        /** @type {?} */
        const debugInfo = new DebugInfo(stateHistory, (/** @type {?} */ ({ run: (/**
             * @return {?}
             */
            () => { }) })), this.dataStrategy);
        DebugInfo.instance = debugInfo;
        /** @type {?} */
        const historyController = new HistoryController(store, stateHistory, debugInfo, (/** @type {?} */ ({ navigateByUrl: (/**
             * @return {?}
             */
            () => new Promise((/**
             * @return {?}
             */
            () => { }))) })), this.dataStrategy);
        historyController.init();
        this.dependencyInjection.push({ key: this.getMockName(Store), value: store });
        return store;
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    static getMockName(obj) {
        if (obj === IS_TEST) {
            return 'IS_TEST';
        }
        if (obj.constructor.name.toLowerCase() !== 'function') {
            return obj.constructor.name;
        }
        return obj.prototype.constructor.name;
    }
    /**
     * @template T
     * @param {?} actionsType
     * @param {?=} initialState
     * @param {?=} path
     * @return {?}
     */
    static createActions(actionsType, initialState = {}, path = []) {
        this.createStore(initialState);
        /** @type {?} */
        const actions = new ((/** @type {?} */ (actionsType)))();
        actions.createTestStore(NgStateTestBed.getPath(path));
        return actions;
    }
    /**
     * @param {?} actions
     * @param {?} component
     * @return {?}
     */
    static setActionsToComponent(actions, component) {
        ((/** @type {?} */ (component))).actions = actions;
    }
    /**
     * @private
     * @param {?} path
     * @return {?}
     */
    static getPath(path) {
        if (path instanceof Array) {
            return path;
        }
        path = path.split('/');
        return path;
    }
}
NgStateTestBed.dataStrategy = null;
NgStateTestBed.dependencyInjection = (/** @type {?} */ ([]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Helpers {
    /**
     * @return {?}
     */
    static guid() {
        /** @type {?} */
        const s4 = (/**
         * @return {?}
         */
        () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        });
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} stateActions
 * @param {?=} disableOnChangesBeforeActionsCreated
 * @return {?}
 */
function ComponentState(stateActions, disableOnChangesBeforeActionsCreated = true) {
    return (/**
     * @param {?} target
     * @return {?}
     */
    (target) => {
        /** @type {?} */
        let origInit = target.prototype.ngOnInit || ((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        let origDestroy = target.prototype.ngOnDestroy || ((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        let origOnChanges = target.prototype.ngOnChanges || ((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        const ensureMarkForCheck = (/**
         * @return {?}
         */
        function () {
            if (!this.cd) {
                this.cd = ServiceLocator.injector.get(ChangeDetectorRef);
            }
        });
        target.prototype.ngOnChanges = (/**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (disableOnChangesBeforeActionsCreated && !this.actions) {
                return;
            }
            origOnChanges.apply(this, arguments);
        });
        target.prototype.ngOnInit = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const isTest = ServiceLocator.injector.get(IS_TEST);
            if (isTest) {
                origInit.apply(this, arguments);
                return;
            }
            if (!this.statePath) {
                this.statePath = [];
            }
            if (stateActions) {
                ensureMarkForCheck.apply(this);
                // DOC - CONVETION: only annonymous function allwed for choosing state; Actions can be only named functions;
                /** @type {?} */
                const extractedStateAction = stateActions.name === ''
                    ? stateActions(this)
                    : stateActions;
                /** @type {?} */
                const actions = new extractedStateAction();
                this.statePath = actions.createStore(this.statePath, this.stateIndex);
                this.stateChangeSubscription = ServiceLocator.injector.get(Dispatcher)
                    .subscribe(actions.aId, (/**
                 * @return {?}
                 */
                () => {
                    this.cd.markForCheck();
                }));
                this.actions = actions;
            }
            origInit.apply(this, arguments);
        });
        target.prototype.ngOnDestroy = (/**
         * @return {?}
         */
        function () {
            if (this.actions) {
                this.actions.onDestroy();
            }
            if (this.stateChangeSubscription) {
                this.stateChangeSubscription.unsubscribe();
            }
            origDestroy.apply(this, arguments);
        });
    });
}
/**
 * @template T
 */
class HasStateActions {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.stateIndex = null;
        this.cd = cd;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { }
    /**
     * @return {?}
     */
    ngOnDestroy() { }
}
HasStateActions.propDecorators = {
    statePath: [{ type: Input }],
    stateIndex: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} newPath
 * @param {?=} intialState
 * @param {?=} debug
 * @return {?}
 */
function InjectStore(newPath, intialState = null, debug = false) {
    /** @type {?} */
    let getStatePath = (/**
     * @param {?} currentPath
     * @param {?} stateIndex
     * @param {?} extractedPath
     * @return {?}
     */
    (currentPath, stateIndex, extractedPath) => {
        /** @type {?} */
        let transformedPath = ((/** @type {?} */ (extractedPath))).map((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            return item === '${stateIndex}'
                ? stateIndex
                : item;
        }));
        return [...currentPath, ...transformedPath];
    });
    /** @type {?} */
    let getAbsoluteStatePath = (/**
     * @param {?} stateIndex
     * @param {?} extractedPath
     * @return {?}
     */
    (stateIndex, extractedPath) => {
        /** @type {?} */
        const transformedPath = ((/** @type {?} */ (extractedPath))).split('/');
        if (typeof stateIndex === 'string' || typeof stateIndex === 'number') {
            stateIndex = [stateIndex];
        }
        /** @type {?} */
        let nthStatePathIndex = 0;
        transformedPath.forEach((/**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */
        (value, index) => {
            if (value === '${stateIndex}') {
                if (((/** @type {?} */ (stateIndex))).length <= nthStatePathIndex) {
                    throw new Error(`State path ${newPath} has not enough stateIndexes set. Please provide stateIndexes as array in the same order as set in statePath.`);
                }
                transformedPath[index] = stateIndex[nthStatePathIndex];
                nthStatePathIndex++;
            }
        }));
        return transformedPath;
    });
    /** @type {?} */
    let getAllGetters = (/**
     * @param {?} target
     * @return {?}
     */
    (target) => {
        /** @type {?} */
        const targetMethods = Reflect.getPrototypeOf(target);
        /** @type {?} */
        let methods = Object.entries(Object.getOwnPropertyDescriptors(targetMethods))
            .map((/**
         * @param {?} __0
         * @return {?}
         */
        ([key, descriptor]) => {
            return {
                name: key,
                isGetter: typeof descriptor.get === 'function'
            };
        }))
            .filter((/**
         * @param {?} method
         * @return {?}
         */
        method => method.isGetter))
            .map((/**
         * @param {?} method
         * @return {?}
         */
        method => method.name));
        return methods;
    });
    /** @type {?} */
    let convertGettersToProperties = (/**
     * @param {?} instance
     * @return {?}
     */
    (instance) => {
        /** @type {?} */
        const getters = getAllGetters(instance);
        getters.forEach((/**
         * @param {?} name
         * @return {?}
         */
        name => {
            /** @type {?} */
            const tempGetter = instance[name];
            if (tempGetter instanceof Observable) {
                delete instance[name];
                Object.defineProperty(instance, name, {
                    value: tempGetter
                });
            }
        }));
    });
    return (/**
     * @param {?} target
     * @return {?}
     */
    (target) => {
        target.prototype.createStore = (/**
         * @param {?} currentPath
         * @param {?} stateIndex
         * @return {?}
         */
        function (currentPath, stateIndex) {
            this.aId = Helpers.guid();
            /** @type {?} */
            let extractedPath = typeof newPath === 'function' && ((/** @type {?} */ (newPath))).name === ''
                ? ((/** @type {?} */ (newPath)))(currentPath, stateIndex)
                : newPath;
            /** @type {?} */
            const statePath = typeof extractedPath === 'string'
                ? getAbsoluteStatePath(stateIndex, extractedPath)
                : getStatePath(currentPath, stateIndex, extractedPath);
            /** @type {?} */
            const store = (/** @type {?} */ (ServiceLocator.injector.get(Store)));
            /** @type {?} */
            const dispatcher = ServiceLocator.injector.get(Dispatcher);
            this.store = intialState
                ? store.initialize(statePath, intialState)
                : store.select(statePath);
            this.stateChangeSubscription = this.store.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                this.state = state;
                dispatcher.publish(this.aId);
                if (debug && state.toJS) {
                    /** @type {?} */
                    const dataStrategy = ServiceLocator.injector.get(DataStrategy);
                    console.info(dataStrategy.toJS(state));
                }
            }));
            convertGettersToProperties(this);
            return statePath;
        });
        target.prototype.createTestStore = (/**
         * @param {?} statePath
         * @return {?}
         */
        function (statePath) {
            /** @type {?} */
            let store = ServiceLocator.injector.get(Store);
            this.store = store.select(statePath);
            /** @type {?} */
            const that = this;
            this.stateChangeSubscription = this.store.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            (state) => {
                that.state = state;
            }));
        });
        target.prototype.onDestroy = (/**
         * @return {?}
         */
        function () {
            this.stateChangeSubscription.unsubscribe();
        });
    });
}
/**
 * @template T
 */
class HasStore {
    constructor() {
        this.store = null;
        this.state = null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { stateFactory, storeFactory, historyControllerFactory, routerStateFactory, debugInfoFactory, RESTORE_FROM_SERVER, TRANSFER_STATE_KEY, INITIAL_STATE, NG_STATE_OPTIONS, IS_PROD, IS_TEST, StoreModule, NgStateTestBed, State, StateHistory, StateKeeper, HistoryController, Store, Initialize, Select, Update, Reset, NgFormStateManager, PersistStateManager, Helpers, ServiceLocator, Message, Dispatcher, ComponentState, HasStateActions, InjectStore, HasStore, RouterState, DebugInfo };

//# sourceMappingURL=ng-state-store.js.map