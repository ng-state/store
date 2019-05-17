/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { StateHistory } from '../state/history';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStrategy } from '@ng-state/data-strategy';
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
        this.options = tslib_1.__assign({}, this.options, options);
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
            this.debugInfo = tslib_1.__assign({}, info);
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
export { DebugInfo };
if (false) {
    /** @type {?} */
    DebugInfo.instance;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.debugInfo;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.debugMode;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.withDevTools;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.debugStatePath;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.devTools;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.devToolsSubscription;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.options;
    /** @type {?} */
    DebugInfo.prototype.isTimeTravel;
    /** @type {?} */
    DebugInfo.prototype.onApplyHistory;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.start;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.stop;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.stateHistory;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    DebugInfo.prototype.dataStrategy;
}
/**
 * @record
 */
export function DebugOptions() { }
if (false) {
    /** @type {?|undefined} */
    DebugOptions.prototype.enableConsoleOutput;
    /** @type {?|undefined} */
    DebugOptions.prototype.enableDevToolsOutput;
}
/**
 * @record
 */
export function DebugHistoryItem() { }
if (false) {
    /** @type {?} */
    DebugHistoryItem.prototype.state;
    /** @type {?} */
    DebugHistoryItem.prototype.statePath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctaW5mby5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWJ1Zy9kZWJ1Zy1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZEO0lBa0JJLG1CQUFvQixZQUEwQixFQUFVLElBQVksRUFBVSxZQUEwQjtRQUF4RyxpQkFDQztRQURtQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWhCaEcsY0FBUyxHQUFrQixJQUFJLENBQUM7UUFHaEMsbUJBQWMsR0FBVSxJQUFJLENBQUM7UUFDN0IsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQix5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsWUFBTyxHQUFpQjtZQUM1QixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLG9CQUFvQixFQUFFLElBQUk7U0FDN0IsQ0FBQztRQUlGLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7UUFvSXpDLFVBQUs7Ozs7UUFBRyxVQUFDLFNBQXFCO1lBQXJCLDBCQUFBLEVBQUEsY0FBcUI7WUFDbEMsS0FBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7WUFDaEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFdEIsS0FBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDaEMsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELENBQUMsRUFBQTtRQUVPLFNBQUk7OztRQUFHO1lBQ1gsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsS0FBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDcEMsQ0FBQyxFQUFBO0lBOUlELENBQUM7SUFFRCxzQkFBSSxnQ0FBUzs7OztRQUFiO1lBQ0ksT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNsQixDQUFDO1FBQ04sQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrQ0FBVzs7OztRQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBOzs7OztJQUVELHdCQUFJOzs7O0lBQUosVUFBSyxTQUFrQjtRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEMsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsa0NBQWM7Ozs7SUFBZCxVQUFlLE9BQXFCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLHdCQUFRLElBQUksQ0FBQyxPQUFPLEVBQUssT0FBTyxDQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCx1QkFBRzs7OztJQUFILFVBQUksSUFBbUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLHdCQUFRLElBQUksQ0FBRSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsaUNBQWE7Ozs7O0lBQWIsVUFBYyxLQUFVLEVBQUUsYUFBc0I7UUFDNUMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7Ozs7SUFFRCxvQ0FBZ0I7OztJQUFoQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxxQ0FBaUI7OztJQUFqQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7Ozs7Ozs7SUFFTyxnQ0FBWTs7Ozs7O0lBQXBCLFVBQXFCLEtBQVUsRUFBRSxhQUFzQjs7WUFDL0MsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxLQUFLO1FBQ3BHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDeEMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25EOztZQUVLLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFO1FBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNoRDtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDOzs7Ozs7O0lBRU8sOEJBQVU7Ozs7OztJQUFsQixVQUFtQixPQUFlLEVBQUUsS0FBVTtRQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDaEM7SUFDTCxDQUFDOzs7OztJQUVPLG1DQUFlOzs7O0lBQXZCOztZQUNRLE9BQU8sR0FBRyxTQUFTO1FBRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLE9BQU8sS0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFJLENBQUM7U0FDbEQ7UUFFRCxPQUFPLElBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFLLENBQUM7UUFDdEQsT0FBTyxJQUFJLEtBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUcsQ0FBQztRQUVwSCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDOzs7OztJQUVPLHFDQUFpQjs7OztJQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFTyxxQ0FBaUI7Ozs7O0lBQXpCLFVBQTBCLFNBQWdCO1FBQTFDLGlCQWlCQztRQWhCRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3JDLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7O1FBQUM7WUFDVixLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNwSCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLE9BQVk7WUFDN0QsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxFQUFFO2dCQUN4SCxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztvQkFDckIsS0FBSyxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxRCxTQUFTLEVBQUUsU0FBUztpQkFDdkIsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sNENBQXdCOzs7O0lBQWhDO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3BELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxtQ0FBZTs7OztJQUF2QjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3ZJLENBQUM7SUFySU0sa0JBQVEsR0FBYyxJQUFJLENBQUM7O2dCQWJyQyxVQUFVOzs7O2dCQUxGLFlBQVk7Z0JBQ0EsTUFBTTtnQkFFbEIsWUFBWTs7SUFvS3JCLGdCQUFDO0NBQUEsQUFsS0QsSUFrS0M7U0FqS1ksU0FBUzs7O0lBWWxCLG1CQUFrQzs7Ozs7SUFYbEMsOEJBQXdDOzs7OztJQUN4Qyw4QkFBMkI7Ozs7O0lBQzNCLGlDQUE4Qjs7Ozs7SUFDOUIsbUNBQXFDOzs7OztJQUNyQyw2QkFBd0I7Ozs7O0lBQ3hCLHlDQUFvQzs7Ozs7SUFDcEMsNEJBR0U7O0lBSUYsaUNBQXFCOztJQUNyQixtQ0FBaUQ7Ozs7O0lBb0lqRCwwQkFRQzs7Ozs7SUFFRCx5QkFHQzs7Ozs7SUEvSVcsaUNBQWtDOzs7OztJQUFFLHlCQUFvQjs7Ozs7SUFBRSxpQ0FBa0M7Ozs7O0FBa0o1RyxrQ0FHQzs7O0lBRkcsMkNBQThCOztJQUM5Qiw0Q0FBK0I7Ozs7O0FBR25DLHNDQUdDOzs7SUFGRyxpQ0FBVzs7SUFDWCxxQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWJ1Z0luZm9EYXRhIH0gZnJvbSAnLi9kZWJ1Zy1pbmZvLWRhdGEnO1xyXG5pbXBvcnQgeyBTdGF0ZUhpc3RvcnkgfSBmcm9tICcuLi9zdGF0ZS9oaXN0b3J5JztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGF0YVN0cmF0ZWd5IH0gZnJvbSAnQG5nLXN0YXRlL2RhdGEtc3RyYXRlZ3knO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGVidWdJbmZvIHtcclxuICAgIHByaXZhdGUgZGVidWdJbmZvOiBEZWJ1Z0luZm9EYXRhID0gbnVsbDtcclxuICAgIHByaXZhdGUgZGVidWdNb2RlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSB3aXRoRGV2VG9vbHM6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGRlYnVnU3RhdGVQYXRoOiBhbnlbXSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGRldlRvb2xzID0gbnVsbDtcclxuICAgIHByaXZhdGUgZGV2VG9vbHNTdWJzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBvcHRpb25zOiBEZWJ1Z09wdGlvbnMgPSB7XHJcbiAgICAgICAgZW5hYmxlQ29uc29sZU91dHB1dDogdHJ1ZSxcclxuICAgICAgICBlbmFibGVEZXZUb29sc091dHB1dDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6IERlYnVnSW5mbyA9IG51bGw7XHJcblxyXG4gICAgaXNUaW1lVHJhdmVsID0gZmFsc2U7XHJcbiAgICBvbkFwcGx5SGlzdG9yeSA9IG5ldyBTdWJqZWN0PERlYnVnSGlzdG9yeUl0ZW0+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGF0ZUhpc3Rvcnk6IFN0YXRlSGlzdG9yeSwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgZGF0YVN0cmF0ZWd5OiBEYXRhU3RyYXRlZ3kpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcHVibGljQXBpKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxyXG4gICAgICAgICAgICBzdG9wOiB0aGlzLnN0b3BcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0RlYnVnTW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWJ1Z01vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkZWJ1Z01vZGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRlYnVnTW9kZSA9IGRlYnVnTW9kZTtcclxuICAgICAgICB0aGlzLnNldFdpdGhEZXZUb29scygpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMud2l0aERldlRvb2xzIHx8ICFkZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50cmFja1dpdGhEZXZUb29scyhbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlRGVmYXVsdHMob3B0aW9uczogRGVidWdPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0geyAuLi50aGlzLm9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQoaW5mbzogRGVidWdJbmZvRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlYnVnSW5mbyA9IHsgLi4uaW5mbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblN0YXRlQ2hhbmdlKHN0YXRlOiBhbnksIGlzSW50aWFsU3RhdGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z01vZGUgJiYgIXRoaXMuaXNUaW1lVHJhdmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nRGVidWdJbmZvKHN0YXRlLCBpc0ludGlhbFN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHVybk9uVGltZVRyYXZlbCgpIHtcclxuICAgICAgICB0aGlzLmlzVGltZVRyYXZlbCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdHVybk9mZlRpbWVUcmF2ZWwoKSB7XHJcbiAgICAgICAgdGhpcy5pc1RpbWVUcmF2ZWwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZ0RlYnVnSW5mbyhzdGF0ZTogYW55LCBpc0ludGlhbFN0YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IGRlYnVnU3RhdGUgPSB0aGlzLmRlYnVnU3RhdGVQYXRoICYmIHRoaXMuZGF0YVN0cmF0ZWd5LmdldEluKHN0YXRlLCB0aGlzLmRlYnVnU3RhdGVQYXRoKSB8fCBzdGF0ZTtcclxuICAgICAgICBpZiAodGhpcy5kYXRhU3RyYXRlZ3kuaXNPYmplY3QoZGVidWdTdGF0ZSkpIHtcclxuICAgICAgICAgICAgZGVidWdTdGF0ZSA9IHRoaXMuZGF0YVN0cmF0ZWd5LnRvSlMoZGVidWdTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWJ1Z01lc3NhZ2UgPSB0aGlzLmdldERlYnVnTWVzc2FnZSgpO1xyXG4gICAgICAgIHRoaXMuY29uc29sZUxvZyhkZWJ1Z01lc3NhZ2UsIGRlYnVnU3RhdGUpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMud2l0aERldlRvb2xzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0ludGlhbFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2VG9vbHMuaW5pdChkZWJ1Z1N0YXRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRldlRvb2xzLnNlbmQoZGVidWdNZXNzYWdlLCBkZWJ1Z1N0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGVIaXN0b3J5LmFkZCh7IG1lc3NhZ2U6IGRlYnVnTWVzc2FnZSwgc3RhdGU6IGRlYnVnU3RhdGUgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVidWdJbmZvID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnNvbGVMb2cobWVzc2FnZTogc3RyaW5nLCBzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lbmFibGVDb25zb2xlT3V0cHV0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhtZXNzYWdlLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVidWdNZXNzYWdlKCkge1xyXG4gICAgICAgIGxldCBtZXNzYWdlID0gJ0BzdGF0ZS8nO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZGVidWdJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHttZXNzYWdlfSR7dGhpcy5nZXREZWJ1Z1N0YXRlUGF0aCgpfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXNzYWdlICs9IGAke3RoaXMuZGVidWdJbmZvLnN0YXRlUGF0aC5qb2luKCcvJyl9IC0gYDtcclxuICAgICAgICBtZXNzYWdlICs9IGAkeyh0aGlzLmRlYnVnSW5mby5tZXNzYWdlID8gdGhpcy5kZWJ1Z0luZm8ubWVzc2FnZS50b1VwcGVyQ2FzZSgpIDogKHRoaXMuZGVidWdJbmZvLmFjdGlvblR5cGUgfHwgJycpKX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERlYnVnU3RhdGVQYXRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlYnVnU3RhdGVQYXRoICYmIHRoaXMuZGVidWdTdGF0ZVBhdGgubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICA/IHRoaXMuZGVidWdTdGF0ZVBhdGguam9pbignLT4nKVxyXG4gICAgICAgICAgICA6ICdyb290JztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYWNrV2l0aERldlRvb2xzKHN0YXRlUGF0aDogYW55W10pIHtcclxuICAgICAgICBpZiAoIXRoaXMud2l0aERldlRvb2xzIHx8IHRoaXMuZGV2VG9vbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2VG9vbHMgPSB3aW5kb3dbJ19fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18nXS5jb25uZWN0KHsgbWF4QWdlOiB0aGlzLnN0YXRlSGlzdG9yeS5zdG9yZUhpc3RvcnlJdGVtcyB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kZXZUb29sc1N1YnNjcmlwdGlvbiA9IHRoaXMuZGV2VG9vbHMuc3Vic2NyaWJlKChtZXNzYWdlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ0RJU1BBVENIJyAmJiAobWVzc2FnZS5wYXlsb2FkLnR5cGUgPT09ICdKVU1QX1RPX0FDVElPTicgfHwgbWVzc2FnZS5wYXlsb2FkLnR5cGUgPT09ICdKVU1QX1RPX1NUQVRFJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25BcHBseUhpc3RvcnkubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHRoaXMuZGF0YVN0cmF0ZWd5LmZyb21KUyhKU09OLnBhcnNlKG1lc3NhZ2Uuc3RhdGUpKSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVBhdGg6IHN0YXRlUGF0aFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0b3BUcmFja2luZ1dpdGhEZXZUb29scygpIHtcclxuICAgICAgICBpZiAodGhpcy53aXRoRGV2VG9vbHMpIHtcclxuICAgICAgICAgICAgdGhpcy53aXRoRGV2VG9vbHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgd2luZG93WydfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fJ10uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRldlRvb2xzU3Vic2NyaXB0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2VG9vbHMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFdpdGhEZXZUb29scygpIHtcclxuICAgICAgICB0aGlzLndpdGhEZXZUb29scyA9IHRoaXMub3B0aW9ucy5lbmFibGVEZXZUb29sc091dHB1dCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhIXdpbmRvd1snX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyddO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnQgPSAoc3RhdGVQYXRoOiBhbnlbXSA9IFtdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kZWJ1Z1N0YXRlUGF0aCA9IHN0YXRlUGF0aDtcclxuICAgICAgICB0aGlzLmRlYnVnTW9kZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcFRyYWNraW5nV2l0aERldlRvb2xzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRXaXRoRGV2VG9vbHMoKTtcclxuICAgICAgICB0aGlzLnRyYWNrV2l0aERldlRvb2xzKHN0YXRlUGF0aCk7XHJcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlKHRoaXMuc3RhdGVIaXN0b3J5LmN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdG9wID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGVidWdNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9wVHJhY2tpbmdXaXRoRGV2VG9vbHMoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEZWJ1Z09wdGlvbnMge1xyXG4gICAgZW5hYmxlQ29uc29sZU91dHB1dD86IGJvb2xlYW47XHJcbiAgICBlbmFibGVEZXZUb29sc091dHB1dD86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGVidWdIaXN0b3J5SXRlbSB7XHJcbiAgICBzdGF0ZTogYW55O1xyXG4gICAgc3RhdGVQYXRoOiBhbnlbXTtcclxufSJdfQ==