import { makeStateKey, TransferState } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationEnd, RoutesRecognized, Router } from '@angular/router';
import { filter, share, map, take, distinctUntilChanged, takeWhile, tap, debounceTime, takeUntil } from 'rxjs/operators';
import { Injectable, NgZone, Inject, Injector, NgModule, InjectionToken, ChangeDetectorRef, Input } from '@angular/core';
import { __extends, __assign, __spread, __read } from 'tslib';
import { Subject, BehaviorSubject, isObservable, from, of, ReplaySubject, forkJoin, Observable } from 'rxjs';
import { DataStrategy } from '@ng-state/data-strategy';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Message = /** @class */ (function () {
    function Message(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    return Message;
}());
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.subject = new Subject();
    }
    Object.defineProperty(Dispatcher.prototype, "observable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.subject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} messageType
     * @return {?}
     */
    Dispatcher.prototype.getMessagesOfType = /**
     * @param {?} messageType
     * @return {?}
     */
    function (messageType) {
        return this.subject.pipe(filter((/**
         * @param {?} msg
         * @return {?}
         */
        function (msg) { return msg.type === messageType; })), share());
    };
    /**
     * @param {?} message
     * @param {?=} payload
     * @return {?}
     */
    Dispatcher.prototype.publish = /**
     * @param {?} message
     * @param {?=} payload
     * @return {?}
     */
    function (message, payload) {
        message = ((/** @type {?} */ (message))).type !== undefined
            ? message
            : new Message((/** @type {?} */ (message)), payload);
        this.subject.next(message);
    };
    /**
     * @param {?} messageType
     * @param {?} observerOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    Dispatcher.prototype.subscribe = /**
     * @param {?} messageType
     * @param {?} observerOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    function (messageType, observerOrNext, error, complete) {
        messageType = ((/** @type {?} */ (messageType))).prototype instanceof Message
            ? ((/** @type {?} */ (new ((/** @type {?} */ (messageType)))()))).type
            : messageType;
        return this.getMessagesOfType((/** @type {?} */ (messageType)))
            .pipe(map((/**
         * @param {?} msg
         * @return {?}
         */
        function (msg) { return msg.payload; })))
            .subscribe(observerOrNext, error, complete);
    };
    Dispatcher.decorators = [
        { type: Injectable }
    ];
    return Dispatcher;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ServiceLocator = /** @class */ (function () {
    function ServiceLocator() {
    }
    ServiceLocator.injector = null;
    return ServiceLocator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RouterState = /** @class */ (function () {
    function RouterState(store, router, debugInfo) {
        this.store = store;
        this.router = router;
        this.debugInfo = debugInfo;
    }
    /**
     * @return {?}
     */
    RouterState.prototype.init = /**
     * @return {?}
     */
    function () {
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.initRouter();
        this.bindRouter();
    };
    /**
     * @private
     * @return {?}
     */
    RouterState.prototype.initRouter = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof RoutesRecognized; })), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.store.initialize(['router'], { url: event.url }, false);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    RouterState.prototype.bindRouter = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.router.events) {
            return;
        }
        /** @type {?} */
        var cancelledId = -1;
        this.router.events
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.debugInfo && !_this.debugInfo.isTimeTravel; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event instanceof NavigationCancel) {
                cancelledId = ((/** @type {?} */ (event))).id;
            }
            if (event instanceof NavigationEnd && ((/** @type {?} */ (event))).id !== cancelledId) {
                ((/** @type {?} */ (_this.store.select(['router'])))).update((/**
                 * @param {?} state
                 * @return {?}
                 */
                function (state) {
                    _this.dataStrategy.set(state, 'url', event.url);
                }));
            }
        }));
    };
    RouterState.startingRoute = '';
    return RouterState;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
State = /** @class */ (function (_super) {
    __extends(State, _super);
    function State(initialState, dataStrategy) {
        var _this = this;
        dataStrategy.overrideContructor(initialState);
        _this = _super.call(this, dataStrategy.fromJS(initialState)) || this;
        return _this;
    }
    return State;
}(BehaviorSubject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StateHistory = /** @class */ (function () {
    function StateHistory() {
        this.options = {
            collectHistory: true,
            storeHistoryItems: 100
        };
    }
    Object.defineProperty(StateHistory.prototype, "currentState", {
        get: /**
         * @return {?}
         */
        function () {
            return StateKeeper.CURRENT_STATE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateHistory.prototype, "history", {
        get: /**
         * @return {?}
         */
        function () {
            return StateKeeper.HISTORY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateHistory.prototype, "storeHistoryItems", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options.storeHistoryItems;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} initialState
     * @return {?}
     */
    StateHistory.prototype.init = /**
     * @param {?} initialState
     * @return {?}
     */
    function (initialState) {
        StateHistory.initialState = initialState;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    StateHistory.prototype.changeDefaults = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.options = __assign({}, this.options, options);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    StateHistory.prototype.setCurrentState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        StateKeeper.CURRENT_STATE = state;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    StateHistory.prototype.add = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!this.options.collectHistory) {
            return;
        }
        if (StateKeeper.HISTORY.length >= this.options.storeHistoryItems) {
            StateKeeper.HISTORY.shift();
        }
        StateKeeper.HISTORY.push(item);
    };
    StateHistory.initialState = {};
    StateHistory.decorators = [
        { type: Injectable }
    ];
    return StateHistory;
}());
var StateKeeper = /** @class */ (function () {
    function StateKeeper() {
    }
    StateKeeper.CURRENT_STATE = null;
    StateKeeper.HISTORY = [];
    return StateKeeper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Select = /** @class */ (function () {
    function Select(path) {
        /** @type {?} */
        var mapped$;
        /** @type {?} */
        var dataStrategy = ServiceLocator.injector.get(DataStrategy);
        if (typeof path === 'object') {
            mapped$ = ((/** @type {?} */ (this))).pipe(map((/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return dataStrategy.getIn(state, path); })), takeWhile((/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state !== undefined; })), distinctUntilChanged());
        }
        else {
            throw new TypeError("Unexpected type " + typeof path + " in select operator,"
                + " expected 'object' or 'function'");
        }
        return mapped$;
    }
    return Select;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DebugInfo = /** @class */ (function () {
    function DebugInfo(stateHistory, zone, dataStrategy) {
        var _this = this;
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
        function (statePath) {
            if (statePath === void 0) { statePath = []; }
            _this.debugStatePath = statePath;
            _this.debugMode = true;
            _this.stopTrackingWithDevTools();
            _this.setWithDevTools();
            _this.trackWithDevTools(statePath);
            _this.onStateChange(_this.stateHistory.currentState, true);
        });
        this.stop = (/**
         * @return {?}
         */
        function () {
            _this.debugMode = false;
            _this.stopTrackingWithDevTools();
        });
    }
    Object.defineProperty(DebugInfo.prototype, "publicApi", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                start: this.start,
                stop: this.stop
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugInfo.prototype, "isDebugMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.debugMode;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} debugMode
     * @return {?}
     */
    DebugInfo.prototype.init = /**
     * @param {?} debugMode
     * @return {?}
     */
    function (debugMode) {
        this.debugMode = debugMode;
        this.setWithDevTools();
        if (!this.withDevTools || !debugMode) {
            return;
        }
        this.trackWithDevTools([]);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    DebugInfo.prototype.changeDefaults = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.options = __assign({}, this.options, options);
    };
    /**
     * @param {?} info
     * @return {?}
     */
    DebugInfo.prototype.add = /**
     * @param {?} info
     * @return {?}
     */
    function (info) {
        if (this.debugMode) {
            this.debugInfo = __assign({}, info);
        }
    };
    /**
     * @param {?} state
     * @param {?} isIntialState
     * @return {?}
     */
    DebugInfo.prototype.onStateChange = /**
     * @param {?} state
     * @param {?} isIntialState
     * @return {?}
     */
    function (state, isIntialState) {
        if (this.debugMode && !this.isTimeTravel) {
            this.logDebugInfo(state, isIntialState);
        }
    };
    /**
     * @return {?}
     */
    DebugInfo.prototype.turnOnTimeTravel = /**
     * @return {?}
     */
    function () {
        this.isTimeTravel = true;
    };
    /**
     * @return {?}
     */
    DebugInfo.prototype.turnOffTimeTravel = /**
     * @return {?}
     */
    function () {
        this.isTimeTravel = false;
    };
    /**
     * @private
     * @param {?} state
     * @param {?} isIntialState
     * @return {?}
     */
    DebugInfo.prototype.logDebugInfo = /**
     * @private
     * @param {?} state
     * @param {?} isIntialState
     * @return {?}
     */
    function (state, isIntialState) {
        /** @type {?} */
        var debugState = this.debugStatePath && this.dataStrategy.getIn(state, this.debugStatePath) || state;
        if (this.dataStrategy.isObject(debugState)) {
            debugState = this.dataStrategy.toJS(debugState);
        }
        /** @type {?} */
        var debugMessage = this.getDebugMessage();
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
    };
    /**
     * @private
     * @param {?} message
     * @param {?} state
     * @return {?}
     */
    DebugInfo.prototype.consoleLog = /**
     * @private
     * @param {?} message
     * @param {?} state
     * @return {?}
     */
    function (message, state) {
        if (this.options.enableConsoleOutput) {
            console.info(message, state);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DebugInfo.prototype.getDebugMessage = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var message = '@state/';
        if (!this.debugInfo) {
            return "" + message + this.getDebugStatePath();
        }
        message += this.debugInfo.statePath.join('/') + " - ";
        message += "" + (this.debugInfo.message ? this.debugInfo.message.toUpperCase() : (this.debugInfo.actionType || ''));
        return message;
    };
    /**
     * @private
     * @return {?}
     */
    DebugInfo.prototype.getDebugStatePath = /**
     * @private
     * @return {?}
     */
    function () {
        return this.debugStatePath && this.debugStatePath.length > 0
            ? this.debugStatePath.join('->')
            : 'root';
    };
    /**
     * @private
     * @param {?} statePath
     * @return {?}
     */
    DebugInfo.prototype.trackWithDevTools = /**
     * @private
     * @param {?} statePath
     * @return {?}
     */
    function (statePath) {
        var _this = this;
        if (!this.withDevTools || this.devTools) {
            return;
        }
        this.zone.run((/**
         * @return {?}
         */
        function () {
            _this.devTools = window['__REDUX_DEVTOOLS_EXTENSION__'].connect({ maxAge: _this.stateHistory.storeHistoryItems });
        }));
        this.devToolsSubscription = this.devTools.subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            if (message.type === 'DISPATCH' && (message.payload.type === 'JUMP_TO_ACTION' || message.payload.type === 'JUMP_TO_STATE')) {
                _this.onApplyHistory.next({
                    state: _this.dataStrategy.fromJS(JSON.parse(message.state)),
                    statePath: statePath
                });
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    DebugInfo.prototype.stopTrackingWithDevTools = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.withDevTools) {
            this.withDevTools = false;
            window['__REDUX_DEVTOOLS_EXTENSION__'].disconnect();
            this.devToolsSubscription();
            this.devTools = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    DebugInfo.prototype.setWithDevTools = /**
     * @private
     * @return {?}
     */
    function () {
        this.withDevTools = this.options.enableDevToolsOutput && typeof window !== 'undefined' && !!window['__REDUX_DEVTOOLS_EXTENSION__'];
    };
    DebugInfo.instance = null;
    DebugInfo.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DebugInfo.ctorParameters = function () { return [
        { type: StateHistory },
        { type: NgZone },
        { type: DataStrategy }
    ]; };
    return DebugInfo;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Update = /** @class */ (function () {
    function Update(action, debugInfo) {
        if (debugInfo === void 0) { debugInfo = {}; }
        /** @type {?} */
        var defaultDebugInfo = { actionType: "UPDATE" /* Update */, statePath: ((/** @type {?} */ (this))).statePath };
        DebugInfo.instance.add(__assign({}, defaultDebugInfo, debugInfo));
        /** @type {?} */
        var dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        try {
            dataStrategy.update(((/** @type {?} */ (this))).statePath, action);
        }
        catch (exception) {
            console.error(exception);
        }
    }
    return Update;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Initialize = /** @class */ (function () {
    function Initialize(statePath, initialState) {
        if (initialState === void 0) { initialState = null; }
        /** @type {?} */
        var initialized = '__initialized';
        /** @type {?} */
        var actionWrapper = (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            var dataStrategy = ServiceLocator.injector.get(DataStrategy);
            if (dataStrategy.getIn(state, __spread(statePath, [initialized]))) {
                return;
            }
            dataStrategy.overrideContructor(initialState);
            initialState.constructor = Object;
            initialState = dataStrategy.fromJS(initialState);
            initialState = dataStrategy.set(initialState, initialized, true);
            /** @type {?} */
            var newState;
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
        var defaultDebugInfo = { actionType: "INITIALIZE" /* Initialize */, statePath: statePath };
        DebugInfo.instance.add(defaultDebugInfo);
        ((/** @type {?} */ (this))).pipe(tap(actionWrapper), take(1)).subscribe();
        return (/** @type {?} */ (this.newStore));
    }
    return Initialize;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, R
 */
var /**
 * @template T, R
 */
Map = /** @class */ (function () {
    function Map(action) {
        return ((/** @type {?} */ (this))).pipe(map((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return action(state); })));
    }
    return Map;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Reset = /** @class */ (function () {
    function Reset(debugMessage) {
        if (debugMessage === void 0) { debugMessage = null; }
        /** @type {?} */
        var dataStrategy = ServiceLocator.injector.get(DataStrategy);
        /** @type {?} */
        var restoreState = (/**
         * @param {?} store
         * @return {?}
         */
        function (store) {
            /** @type {?} */
            var path = store.statePath.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return !store.rootPath.includes(item); }));
            /** @type {?} */
            var isRootPath = Array.isArray(path) && path.length === 0;
            if (isRootPath) {
                dataStrategy.resetRoot(StateHistory.initialState, RouterState.startingRoute);
            }
            else {
                /** @type {?} */
                var initialState = !!store.initialState
                    ? store.initialState
                    : dataStrategy.fromJS(StateHistory.initialState);
                initialState = dataStrategy.getIn(initialState, (path));
                dataStrategy.reset(store.statePath, initialState);
            }
            /** @type {?} */
            var defaultDebugInfo = { actionType: "RESET" /* Reset */, statePath: path, debugMessage: debugMessage };
            DebugInfo.instance.add(defaultDebugInfo);
        });
        if (!dataStrategy.isObject(dataStrategy.getIn(StateKeeper.CURRENT_STATE, (((/** @type {?} */ (this))).statePath)))) {
            throw new Error("Cannot resotre state at path: " + ((/** @type {?} */ (this))).statePath + ". Maybe you are trying to restore value rather then state.");
        }
        restoreState(((/** @type {?} */ (this))));
    }
    return Reset;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgFormStateManager = /** @class */ (function () {
    function NgFormStateManager(store) {
        this.unsubscribe = new Subject();
        this.store = store;
    }
    /**
     * @param {?} form
     * @param {?=} params
     * @return {?}
     */
    NgFormStateManager.prototype.bind = /**
     * @param {?} form
     * @param {?=} params
     * @return {?}
     */
    function (form, params) {
        if (params === void 0) { params = {}; }
        this.dataStrategy = ServiceLocator.injector.get(DataStrategy);
        this.form = form;
        this.params = __assign({ debounceTime: 100, emitEvent: false }, params);
        this.setInitialValue();
        this.subscribeToFormChange();
        return this;
    };
    /**
     * @return {?}
     */
    NgFormStateManager.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.store.reset();
    };
    /**
     * @return {?}
     */
    NgFormStateManager.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
        this.form = null;
        this.store = null;
        this.onChangeFn = null;
        this.shouldUpdateStateFn = null;
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} onChangeFn
     * @return {THIS}
     */
    NgFormStateManager.prototype.onChange = /**
     * @template THIS
     * @this {THIS}
     * @param {?} onChangeFn
     * @return {THIS}
     */
    function (onChangeFn) {
        (/** @type {?} */ (this)).onChangeFn = onChangeFn;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} shouldUpdateStateFn
     * @return {THIS}
     */
    NgFormStateManager.prototype.shouldUpdateState = /**
     * @template THIS
     * @this {THIS}
     * @param {?} shouldUpdateStateFn
     * @return {THIS}
     */
    function (shouldUpdateStateFn) {
        (/** @type {?} */ (this)).shouldUpdateStateFn = shouldUpdateStateFn;
        return (/** @type {?} */ (this));
    };
    /**
     * @private
     * @return {?}
     */
    NgFormStateManager.prototype.setInitialValue = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.store
            .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.form.patchValue(_this.dataStrategy.toJS(state), { emitEvent: _this.params.emitEvent });
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NgFormStateManager.prototype.subscribeToFormChange = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.form.valueChanges
            .pipe(debounceTime(this.params.debounceTime), distinctUntilChanged(), takeUntil(this.unsubscribe))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var stateUpdated = false;
            _this.store.update((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                stateUpdated = _this.executeUpdate(value, state);
            }));
            if (stateUpdated) {
                _this.onChangeCall();
            }
        }));
    };
    /**
     * @private
     * @param {?} value
     * @param {?} state
     * @return {?}
     */
    NgFormStateManager.prototype.executeUpdate = /**
     * @private
     * @param {?} value
     * @param {?} state
     * @return {?}
     */
    function (value, state) {
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
    };
    /**
     * @private
     * @return {?}
     */
    NgFormStateManager.prototype.onChangeCall = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.onChangeFn) {
            this.store
                .pipe(take(1))
                .subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                _this.onChangeFn(_this.dataStrategy.toJS(state));
            }));
        }
    };
    return NgFormStateManager;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PersistStateManager = /** @class */ (function () {
    function PersistStateManager(store) {
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
    PersistStateManager.configureStorage = /**
     * @param {?} storage
     * @param {?} getKeys
     * @return {?}
     */
    function (storage, getKeys) {
        PersistStateManager.customStorageConfig.storageConfig = { storage: storage, getKeys: getKeys };
    };
    /**
     * @param {?} serialize
     * @param {?} deserialize
     * @return {?}
     */
    PersistStateManager.configureSerializer = /**
     * @param {?} serialize
     * @param {?} deserialize
     * @return {?}
     */
    function (serialize, deserialize) {
        PersistStateManager.customStorageConfig.serialize = serialize;
        PersistStateManager.customStorageConfig.deserialize = deserialize;
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    PersistStateManager.prototype.save = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        var _this = this;
        /** @type {?} */
        var dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        /** @type {?} */
        var onSaveComplete = new ReplaySubject(1);
        params = this.getParams(params, this.store);
        this.store.pipe(tap((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.resolve(params.storageConfig.storage.setItem(params.key, params.serialize(dataStrategy.toJS(state))))
                .pipe(take(1))
                .subscribe((/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
                onSaveComplete.next({
                    key: params.key,
                    data: dataStrategy.toJS(state)
                });
            }));
        })), take(1)).subscribe();
        return onSaveComplete
            .asObservable()
            .pipe(take(1));
    };
    /**
     * @param {?=} params
     * @param {?=} keepEntry
     * @return {?}
     */
    PersistStateManager.prototype.load = /**
     * @param {?=} params
     * @param {?=} keepEntry
     * @return {?}
     */
    function (params, keepEntry) {
        var _this = this;
        if (keepEntry === void 0) { keepEntry = false; }
        /** @type {?} */
        var dataStrategy = (/** @type {?} */ (ServiceLocator.injector.get(DataStrategy)));
        /** @type {?} */
        var onLoadComplete = new ReplaySubject(1);
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.storage.getItem(params.key))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} loadedState
         * @return {?}
         */
        function (loadedState) {
            _this.store.update((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                dataStrategy.merge(state, dataStrategy.fromJS(params.deserialize(loadedState)));
            }));
            if (!keepEntry) {
                _this.removeAction(params);
            }
            onLoadComplete.next({
                key: params.key,
                data: loadedState
            });
        }));
        return onLoadComplete
            .asObservable()
            .pipe(take(1));
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    PersistStateManager.prototype.remove = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        params = this.getParams(params, this.store);
        return this.removeAction(params);
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    PersistStateManager.prototype.clear = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        var _this = this;
        /** @type {?} */
        var onClearComplete = new ReplaySubject(1);
        /** @type {?} */
        var clearKeys = [];
        params = this.getParams(params, this.store);
        this.resolve(params.storageConfig.getKeys())
            .pipe(take(1))
            .subscribe((/**
         * @param {?} keys
         * @return {?}
         */
        function (keys) {
            keys.filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.startsWith(_this.prefix); }))
                .map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var localParams = __assign({}, params);
                localParams.key = key;
                clearKeys.push(_this.removeAction(localParams));
            }));
            forkJoin(clearKeys)
                .pipe(take(1))
                .subscribe((/**
             * @param {?} keys
             * @return {?}
             */
            function (keys) {
                onClearComplete.next(keys);
            }));
        }));
        return onClearComplete
            .asObservable()
            .pipe(take(1));
    };
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    PersistStateManager.prototype.removeAction = /**
     * @private
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var onRemoveComplete = new ReplaySubject(1);
        this.resolve(params.storageConfig.storage.removeItem(params.key))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} _
         * @return {?}
         */
        function (_) {
            onRemoveComplete.next(params.key);
        }));
        return onRemoveComplete
            .asObservable()
            .pipe(take(1));
    };
    /**
     * @private
     * @param {?} params
     * @param {?} store
     * @return {?}
     */
    PersistStateManager.prototype.getParams = /**
     * @private
     * @param {?} params
     * @param {?} store
     * @return {?}
     */
    function (params, store) {
        this.setDefaultStorage();
        params = __assign({}, this.defaults, PersistStateManager.customStorageConfig, params);
        if (!params.key) {
            params.key = store.statePath.join('.');
        }
        params.key = "" + this.prefix + params.key;
        return params;
    };
    /**
     * @private
     * @return {?}
     */
    PersistStateManager.prototype.setDefaultStorage = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.defaults.storageConfig) {
            this.defaults.storageConfig = {
                storage: localStorage,
                getKeys: (/**
                 * @return {?}
                 */
                function () { return Object.keys(localStorage); })
            };
        }
    };
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    PersistStateManager.prototype.isPromise = /**
     * @private
     * @param {?} v
     * @return {?}
     */
    function (v) {
        return v && typeof v.then === 'function';
    };
    /**
     * @private
     * @param {?} asyncOrValue
     * @return {?}
     */
    PersistStateManager.prototype.resolve = /**
     * @private
     * @param {?} asyncOrValue
     * @return {?}
     */
    function (asyncOrValue) {
        if (this.isPromise(asyncOrValue) || isObservable(asyncOrValue)) {
            return from(asyncOrValue);
        }
        return of(asyncOrValue);
    };
    PersistStateManager.customStorageConfig = {};
    return PersistStateManager;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store(state) {
        var _this = _super.call(this) || this;
        _this.statePath = [];
        _this.rootPath = [];
        _this.select = (/**
         * @param {?} statePath
         * @return {?}
         */
        function (statePath) {
            /** @type {?} */
            var selectStore = Select.bind(_this).call(_this, statePath);
            selectStore.statePath = __spread(_this.statePath, statePath);
            selectStore.rootPath = _this.rootPath;
            selectStore.initialState = _this.initialState;
            _this.initializeOperators(selectStore);
            return selectStore;
        });
        _this.source = state;
        _this.initializeOperators(_this);
        return _this;
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    Store.prototype.lift = /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    function (operator) {
        /** @type {?} */
        var store = new Store(this);
        store.operator = operator;
        return store;
    };
    /**
     * @param {?} err
     * @return {?}
     */
    Store.prototype.error = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        console.log(err);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    Store.prototype.next = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        ((/** @type {?} */ (this.source))).next(state);
    };
    /**
     * @return {?}
     */
    Store.prototype.complete = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} storeContext
     * @return {?}
     */
    Store.prototype.initializeOperators = /**
     * @param {?} storeContext
     * @return {?}
     */
    function (storeContext) {
        storeContext.update = Update.bind(storeContext);
        storeContext.initialize = Initialize.bind(storeContext);
        storeContext.reset = Reset.bind(storeContext);
        storeContext.map = Map.bind(storeContext);
        storeContext.form = new NgFormStateManager(storeContext);
        storeContext.storage = new PersistStateManager(storeContext);
    };
    return Store;
}(Observable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HistoryController = /** @class */ (function () {
    function HistoryController(store, history, debugerInfo, router, dataStrategy) {
        var _this = this;
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
        function (debugHistoryItem) {
            _this.debugerInfo.turnOnTimeTravel();
            /** @type {?} */
            var targetRoute = _this.dataStrategy.getIn(debugHistoryItem.state, ['router', 'url']);
            if (targetRoute && _this.router.url !== targetRoute) {
                _this.router.navigateByUrl(targetRoute).then((/**
                 * @param {?} _
                 * @return {?}
                 */
                function (_) {
                    _this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
                }));
            }
            else {
                _this.applyState(debugHistoryItem.state, debugHistoryItem.statePath);
            }
            _this.onHistoryChange
                .pipe(take(1))
                .subscribe((/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
                _this.debugerInfo.turnOffTimeTravel();
            }));
        });
    }
    /**
     * @return {?}
     */
    HistoryController.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.store.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            /** @type {?} */
            var isIntialState = !_this.history.currentState;
            _this.history.setCurrentState(state);
            _this.debugerInfo.onStateChange(state, isIntialState);
            _this.onHistoryChange.next(true);
        }));
        this.debugerInfo.onApplyHistory.subscribe(this.applyHistory);
    };
    /**
     * @private
     * @param {?} targetState
     * @param {?} statePath
     * @return {?}
     */
    HistoryController.prototype.applyState = /**
     * @private
     * @param {?} targetState
     * @param {?} statePath
     * @return {?}
     */
    function (targetState, statePath) {
        var _this = this;
        if (statePath.length === 0) {
            this.store.next(targetState);
        }
        else {
            this.store
                .update((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                _this.dataStrategy.setIn(state, statePath, targetState, { fromUpdate: true });
            }));
        }
    };
    return HistoryController;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var RESTORE_FROM_SERVER = new InjectionToken('RESTORE_FROM_SERVER');
/** @type {?} */
var TRANSFER_STATE_KEY = 'state';
/** @type {?} */
var INITIAL_STATE = new InjectionToken('INITIAL_STATE');
/** @type {?} */
var NG_STATE_OPTIONS = new InjectionToken('NG_STATE_OPTIONS');
/** @type {?} */
var IS_PROD = new InjectionToken('IS_PROD');
/** @type {?} */
var IS_TEST = new InjectionToken('IS_TEST');
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
        var stateKey = makeStateKey(TRANSFER_STATE_KEY);
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
var StoreModule = /** @class */ (function () {
    function StoreModule(stateHistory, debugInfo, injector, historyController, routerState, dataStrategy, store, initialState, ngStateOptions, isProd) {
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
    StoreModule.provideStore = /**
     * @param {?} initialState
     * @param {?=} isProd
     * @param {?=} options
     * @param {?=} restoreStateFromServer
     * @return {?}
     */
    function (initialState, isProd, options, restoreStateFromServer) {
        if (options === void 0) { options = {}; }
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
    };
    /**
     * @private
     * @param {?} initialState
     * @param {?} ngStateOptions
     * @return {?}
     */
    StoreModule.prototype.initStateHistory = /**
     * @private
     * @param {?} initialState
     * @param {?} ngStateOptions
     * @return {?}
     */
    function (initialState, ngStateOptions) {
        if (ngStateOptions && ngStateOptions.history) {
            this.stateHistory.changeDefaults(ngStateOptions.history);
        }
        this.stateHistory.init(initialState);
    };
    /**
     * @private
     * @param {?} ngStateOptions
     * @return {?}
     */
    StoreModule.prototype.initDebugger = /**
     * @private
     * @param {?} ngStateOptions
     * @return {?}
     */
    function (ngStateOptions) {
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
    };
    StoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule]
                },] }
    ];
    /** @nocollapse */
    StoreModule.ctorParameters = function () { return [
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
    ]; };
    return StoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgStateTestBed = /** @class */ (function () {
    function NgStateTestBed() {
    }
    /**
     * @param {?} dataStrategy
     * @return {?}
     */
    NgStateTestBed.setTestEnvironment = /**
     * @param {?} dataStrategy
     * @return {?}
     */
    function (dataStrategy) {
        var _this = this;
        this.dependencyInjection = [];
        this.dependencyInjection.push({ key: this.getMockName(IS_TEST), value: true });
        this.dependencyInjection.push({ key: this.getMockName(DataStrategy), value: dataStrategy });
        ServiceLocator.injector = {
            get: (/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var name = _this.getMockName(key);
                /** @type {?} */
                var service = _this.dependencyInjection.find((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return k.key === name; }));
                if (!service) {
                    throw new Error("Mock is not found for: " + key);
                }
                return service.value;
            })
        };
        this.dataStrategy = dataStrategy;
    };
    /**
     * @param {?} initialState
     * @return {?}
     */
    NgStateTestBed.createStore = /**
     * @param {?} initialState
     * @return {?}
     */
    function (initialState) {
        /** @type {?} */
        var state = stateFactory(initialState, this.dataStrategy);
        /** @type {?} */
        var store = storeFactory(state);
        this.dataStrategy.init(store, false);
        /** @type {?} */
        var stateHistory = new StateHistory();
        stateHistory.init(initialState);
        /** @type {?} */
        var debugInfo = new DebugInfo(stateHistory, (/** @type {?} */ ({ run: (/**
             * @return {?}
             */
            function () { }) })), this.dataStrategy);
        DebugInfo.instance = debugInfo;
        /** @type {?} */
        var historyController = new HistoryController(store, stateHistory, debugInfo, (/** @type {?} */ ({ navigateByUrl: (/**
             * @return {?}
             */
            function () { return new Promise((/**
             * @return {?}
             */
            function () { })); }) })), this.dataStrategy);
        historyController.init();
        this.dependencyInjection.push({ key: this.getMockName(Store), value: store });
        return store;
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    NgStateTestBed.getMockName = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (obj === IS_TEST) {
            return 'IS_TEST';
        }
        if (obj.constructor.name.toLowerCase() !== 'function') {
            return obj.constructor.name;
        }
        return obj.prototype.constructor.name;
    };
    /**
     * @template T
     * @param {?} actionsType
     * @param {?=} initialState
     * @param {?=} path
     * @return {?}
     */
    NgStateTestBed.createActions = /**
     * @template T
     * @param {?} actionsType
     * @param {?=} initialState
     * @param {?=} path
     * @return {?}
     */
    function (actionsType, initialState, path) {
        if (initialState === void 0) { initialState = {}; }
        if (path === void 0) { path = []; }
        this.createStore(initialState);
        /** @type {?} */
        var actions = new ((/** @type {?} */ (actionsType)))();
        actions.createTestStore(NgStateTestBed.getPath(path));
        return actions;
    };
    /**
     * @param {?} actions
     * @param {?} component
     * @return {?}
     */
    NgStateTestBed.setActionsToComponent = /**
     * @param {?} actions
     * @param {?} component
     * @return {?}
     */
    function (actions, component) {
        ((/** @type {?} */ (component))).actions = actions;
    };
    /**
     * @private
     * @param {?} path
     * @return {?}
     */
    NgStateTestBed.getPath = /**
     * @private
     * @param {?} path
     * @return {?}
     */
    function (path) {
        if (path instanceof Array) {
            return path;
        }
        path = path.split('/');
        return path;
    };
    NgStateTestBed.dataStrategy = null;
    NgStateTestBed.dependencyInjection = (/** @type {?} */ ([]));
    return NgStateTestBed;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    /**
     * @return {?}
     */
    Helpers.guid = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var s4 = (/**
         * @return {?}
         */
        function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        });
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    };
    return Helpers;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} stateActions
 * @param {?=} disableOnChangesBeforeActionsCreated
 * @return {?}
 */
function ComponentState(stateActions, disableOnChangesBeforeActionsCreated) {
    if (disableOnChangesBeforeActionsCreated === void 0) { disableOnChangesBeforeActionsCreated = true; }
    return (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var origInit = target.prototype.ngOnInit || ((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var origDestroy = target.prototype.ngOnDestroy || ((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var origOnChanges = target.prototype.ngOnChanges || ((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var ensureMarkForCheck = (/**
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
            var _this = this;
            /** @type {?} */
            var isTest = ServiceLocator.injector.get(IS_TEST);
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
                var extractedStateAction = stateActions.name === ''
                    ? stateActions(this)
                    : stateActions;
                /** @type {?} */
                var actions = new extractedStateAction();
                this.statePath = actions.createStore(this.statePath, this.stateIndex);
                this.stateChangeSubscription = ServiceLocator.injector.get(Dispatcher)
                    .subscribe(actions.aId, (/**
                 * @return {?}
                 */
                function () {
                    _this.cd.markForCheck();
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
var HasStateActions = /** @class */ (function () {
    function HasStateActions(cd) {
        this.stateIndex = null;
        this.cd = cd;
    }
    /**
     * @return {?}
     */
    HasStateActions.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} changes
     * @return {?}
     */
    HasStateActions.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { };
    /**
     * @return {?}
     */
    HasStateActions.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { };
    HasStateActions.propDecorators = {
        statePath: [{ type: Input }],
        stateIndex: [{ type: Input }]
    };
    return HasStateActions;
}());

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
function InjectStore(newPath, intialState, debug) {
    if (intialState === void 0) { intialState = null; }
    if (debug === void 0) { debug = false; }
    /** @type {?} */
    var getStatePath = (/**
     * @param {?} currentPath
     * @param {?} stateIndex
     * @param {?} extractedPath
     * @return {?}
     */
    function (currentPath, stateIndex, extractedPath) {
        /** @type {?} */
        var transformedPath = ((/** @type {?} */ (extractedPath))).map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return item === '${stateIndex}'
                ? stateIndex
                : item;
        }));
        return __spread(currentPath, transformedPath);
    });
    /** @type {?} */
    var getAbsoluteStatePath = (/**
     * @param {?} stateIndex
     * @param {?} extractedPath
     * @return {?}
     */
    function (stateIndex, extractedPath) {
        /** @type {?} */
        var transformedPath = ((/** @type {?} */ (extractedPath))).split('/');
        if (typeof stateIndex === 'string' || typeof stateIndex === 'number') {
            stateIndex = [stateIndex];
        }
        /** @type {?} */
        var nthStatePathIndex = 0;
        transformedPath.forEach((/**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */
        function (value, index) {
            if (value === '${stateIndex}') {
                if (((/** @type {?} */ (stateIndex))).length <= nthStatePathIndex) {
                    throw new Error("State path " + newPath + " has not enough stateIndexes set. Please provide stateIndexes as array in the same order as set in statePath.");
                }
                transformedPath[index] = stateIndex[nthStatePathIndex];
                nthStatePathIndex++;
            }
        }));
        return transformedPath;
    });
    /** @type {?} */
    var getAllGetters = (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var targetMethods = Reflect.getPrototypeOf(target);
        /** @type {?} */
        var methods = Object.entries(Object.getOwnPropertyDescriptors(targetMethods))
            .map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), key = _b[0], descriptor = _b[1];
            return {
                name: key,
                isGetter: typeof descriptor.get === 'function'
            };
        }))
            .filter((/**
         * @param {?} method
         * @return {?}
         */
        function (method) { return method.isGetter; }))
            .map((/**
         * @param {?} method
         * @return {?}
         */
        function (method) { return method.name; }));
        return methods;
    });
    /** @type {?} */
    var convertGettersToProperties = (/**
     * @param {?} instance
     * @return {?}
     */
    function (instance) {
        /** @type {?} */
        var getters = getAllGetters(instance);
        getters.forEach((/**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            /** @type {?} */
            var tempGetter = instance[name];
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
    function (target) {
        target.prototype.createStore = (/**
         * @param {?} currentPath
         * @param {?} stateIndex
         * @return {?}
         */
        function (currentPath, stateIndex) {
            var _this = this;
            this.aId = Helpers.guid();
            /** @type {?} */
            var extractedPath = typeof newPath === 'function' && ((/** @type {?} */ (newPath))).name === ''
                ? ((/** @type {?} */ (newPath)))(currentPath, stateIndex)
                : newPath;
            /** @type {?} */
            var statePath = typeof extractedPath === 'string'
                ? getAbsoluteStatePath(stateIndex, extractedPath)
                : getStatePath(currentPath, stateIndex, extractedPath);
            /** @type {?} */
            var store = (/** @type {?} */ (ServiceLocator.injector.get(Store)));
            /** @type {?} */
            var dispatcher = ServiceLocator.injector.get(Dispatcher);
            this.store = intialState
                ? store.initialize(statePath, intialState)
                : store.select(statePath);
            this.stateChangeSubscription = this.store.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                _this.state = state;
                dispatcher.publish(_this.aId);
                if (debug) {
                    /** @type {?} */
                    var dataStrategy = ServiceLocator.injector.get(DataStrategy);
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
            var store = ServiceLocator.injector.get(Store);
            this.store = store.select(statePath);
            /** @type {?} */
            var that = this;
            this.stateChangeSubscription = this.store.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
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
var  /**
 * @template T
 */
HasStore = /** @class */ (function () {
    function HasStore() {
        this.store = null;
        this.state = null;
    }
    return HasStore;
}());

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