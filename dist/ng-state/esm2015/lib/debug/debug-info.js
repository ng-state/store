/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { StateHistory } from '../state/history';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStrategy } from '@ng-state/data-strategy';
export class DebugInfo {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctaW5mby5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWJ1Zy9kZWJ1Zy1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdkQsTUFBTSxPQUFPLFNBQVM7Ozs7OztJQWlCbEIsWUFBb0IsWUFBMEIsRUFBVSxJQUFZLEVBQVUsWUFBMEI7UUFBcEYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFoQmhHLGNBQVMsR0FBa0IsSUFBSSxDQUFDO1FBR2hDLG1CQUFjLEdBQVUsSUFBSSxDQUFDO1FBQzdCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQzVCLFlBQU8sR0FBaUI7WUFDNUIsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixvQkFBb0IsRUFBRSxJQUFJO1NBQzdCLENBQUM7UUFJRixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO1FBb0l6QyxVQUFLOzs7O1FBQUcsQ0FBQyxZQUFtQixFQUFFLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxD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QyxDQUFDO0lBQ3ZJLENBQUM7O0FBcklNLGtCQUFRLEdBQWMsSUFBSSxDQUFDOztZQWJyQyxVQUFVOzs7O1lBTEYsWUFBWTtZQUNBLE1BQU07WUFFbEIsWUFBWTs7OztJQWVqQixtQkFBa0M7Ozs7O0lBWGxDLDhCQUF3Qzs7Ozs7SUFDeEMsOEJBQTJCOzs7OztJQUMzQixpQ0FBOEI7Ozs7O0lBQzlCLG1DQUFxQzs7Ozs7SUFDckMsNkJBQXdCOzs7OztJQUN4Qix5Q0FBb0M7Ozs7O0lBQ3BDLDRCQUdFOztJQUlGLGlDQUFxQjs7SUFDckIsbUNBQWlEOzs7OztJQW9JakQsMEJBUUM7Ozs7O0lBRUQseUJBR0M7Ozs7O0lBL0lXLGlDQUFrQzs7Ozs7SUFBRSx5QkFBb0I7Ozs7O0lBQUUsaUNBQWtDOzs7OztBQWtKNUcsa0NBR0M7OztJQUZHLDJDQUE4Qjs7SUFDOUIsNENBQStCOzs7OztBQUduQyxzQ0FHQzs7O0lBRkcsaUNBQVc7O0lBQ1gscUNBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVidWdJbmZvRGF0YSB9IGZyb20gJy4vZGVidWctaW5mby1kYXRhJztcclxuaW1wb3J0IHsgU3RhdGVIaXN0b3J5IH0gZnJvbSAnLi4vc3RhdGUvaGlzdG9yeSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERlYnVnSW5mbyB7XHJcbiAgICBwcml2YXRlIGRlYnVnSW5mbzogRGVidWdJbmZvRGF0YSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGRlYnVnTW9kZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgd2l0aERldlRvb2xzOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBkZWJ1Z1N0YXRlUGF0aDogYW55W10gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBkZXZUb29scyA9IG51bGw7XHJcbiAgICBwcml2YXRlIGRldlRvb2xzU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgb3B0aW9uczogRGVidWdPcHRpb25zID0ge1xyXG4gICAgICAgIGVuYWJsZUNvbnNvbGVPdXRwdXQ6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlRGV2VG9vbHNPdXRwdXQ6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlOiBEZWJ1Z0luZm8gPSBudWxsO1xyXG5cclxuICAgIGlzVGltZVRyYXZlbCA9IGZhbHNlO1xyXG4gICAgb25BcHBseUhpc3RvcnkgPSBuZXcgU3ViamVjdDxEZWJ1Z0hpc3RvcnlJdGVtPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGVIaXN0b3J5OiBTdGF0ZUhpc3RvcnksIHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIGRhdGFTdHJhdGVneTogRGF0YVN0cmF0ZWd5KSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHB1YmxpY0FwaSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcclxuICAgICAgICAgICAgc3RvcDogdGhpcy5zdG9wXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNEZWJ1Z01vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVidWdNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZGVidWdNb2RlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGU7XHJcbiAgICAgICAgdGhpcy5zZXRXaXRoRGV2VG9vbHMoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLndpdGhEZXZUb29scyB8fCAhZGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudHJhY2tXaXRoRGV2VG9vbHMoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZURlZmF1bHRzKG9wdGlvbnM6IERlYnVnT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5vcHRpb25zIH07XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGluZm86IERlYnVnSW5mb0RhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Z0luZm8gPSB7IC4uLmluZm8gfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGF0ZUNoYW5nZShzdGF0ZTogYW55LCBpc0ludGlhbFN0YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWdNb2RlICYmICF0aGlzLmlzVGltZVRyYXZlbCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0RlYnVnSW5mbyhzdGF0ZSwgaXNJbnRpYWxTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHR1cm5PblRpbWVUcmF2ZWwoKSB7XHJcbiAgICAgICAgdGhpcy5pc1RpbWVUcmF2ZWwgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHR1cm5PZmZUaW1lVHJhdmVsKCkge1xyXG4gICAgICAgIHRoaXMuaXNUaW1lVHJhdmVsID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dEZWJ1Z0luZm8oc3RhdGU6IGFueSwgaXNJbnRpYWxTdGF0ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBkZWJ1Z1N0YXRlID0gdGhpcy5kZWJ1Z1N0YXRlUGF0aCAmJiB0aGlzLmRhdGFTdHJhdGVneS5nZXRJbihzdGF0ZSwgdGhpcy5kZWJ1Z1N0YXRlUGF0aCkgfHwgc3RhdGU7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YVN0cmF0ZWd5LmlzT2JqZWN0KGRlYnVnU3RhdGUpKSB7XHJcbiAgICAgICAgICAgIGRlYnVnU3RhdGUgPSB0aGlzLmRhdGFTdHJhdGVneS50b0pTKGRlYnVnU3RhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVidWdNZXNzYWdlID0gdGhpcy5nZXREZWJ1Z01lc3NhZ2UoKTtcclxuICAgICAgICB0aGlzLmNvbnNvbGVMb2coZGVidWdNZXNzYWdlLCBkZWJ1Z1N0YXRlKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLndpdGhEZXZUb29scykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNJbnRpYWxTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRldlRvb2xzLmluaXQoZGVidWdTdGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZXZUb29scy5zZW5kKGRlYnVnTWVzc2FnZSwgZGVidWdTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXRlSGlzdG9yeS5hZGQoeyBtZXNzYWdlOiBkZWJ1Z01lc3NhZ2UsIHN0YXRlOiBkZWJ1Z1N0YXRlIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmRlYnVnSW5mbyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zb2xlTG9nKG1lc3NhZ2U6IHN0cmluZywgc3RhdGU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlQ29uc29sZU91dHB1dCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8obWVzc2FnZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERlYnVnTWVzc2FnZSgpIHtcclxuICAgICAgICBsZXQgbWVzc2FnZSA9ICdAc3RhdGUvJztcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmRlYnVnSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7bWVzc2FnZX0ke3RoaXMuZ2V0RGVidWdTdGF0ZVBhdGgoKX1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZSArPSBgJHt0aGlzLmRlYnVnSW5mby5zdGF0ZVBhdGguam9pbignLycpfSAtIGA7XHJcbiAgICAgICAgbWVzc2FnZSArPSBgJHsodGhpcy5kZWJ1Z0luZm8ubWVzc2FnZSA/IHRoaXMuZGVidWdJbmZvLm1lc3NhZ2UudG9VcHBlckNhc2UoKSA6ICh0aGlzLmRlYnVnSW5mby5hY3Rpb25UeXBlIHx8ICcnKSl9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWJ1Z1N0YXRlUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWJ1Z1N0YXRlUGF0aCAmJiB0aGlzLmRlYnVnU3RhdGVQYXRoLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgPyB0aGlzLmRlYnVnU3RhdGVQYXRoLmpvaW4oJy0+JylcclxuICAgICAgICAgICAgOiAncm9vdCc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFja1dpdGhEZXZUb29scyhzdGF0ZVBhdGg6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLndpdGhEZXZUb29scyB8fCB0aGlzLmRldlRvb2xzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRldlRvb2xzID0gd2luZG93WydfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fJ10uY29ubmVjdCh7IG1heEFnZTogdGhpcy5zdGF0ZUhpc3Rvcnkuc3RvcmVIaXN0b3J5SXRlbXMgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGV2VG9vbHNTdWJzY3JpcHRpb24gPSB0aGlzLmRldlRvb2xzLnN1YnNjcmliZSgobWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdESVNQQVRDSCcgJiYgKG1lc3NhZ2UucGF5bG9hZC50eXBlID09PSAnSlVNUF9UT19BQ1RJT04nIHx8IG1lc3NhZ2UucGF5bG9hZC50eXBlID09PSAnSlVNUF9UT19TVEFURScpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXBwbHlIaXN0b3J5Lm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiB0aGlzLmRhdGFTdHJhdGVneS5mcm9tSlMoSlNPTi5wYXJzZShtZXNzYWdlLnN0YXRlKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVQYXRoOiBzdGF0ZVBhdGhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdG9wVHJhY2tpbmdXaXRoRGV2VG9vbHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2l0aERldlRvb2xzKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2l0aERldlRvb2xzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHdpbmRvd1snX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyddLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5kZXZUb29sc1N1YnNjcmlwdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRldlRvb2xzID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRXaXRoRGV2VG9vbHMoKSB7XHJcbiAgICAgICAgdGhpcy53aXRoRGV2VG9vbHMgPSB0aGlzLm9wdGlvbnMuZW5hYmxlRGV2VG9vbHNPdXRwdXQgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgISF3aW5kb3dbJ19fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18nXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0ID0gKHN0YXRlUGF0aDogYW55W10gPSBbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGVidWdTdGF0ZVBhdGggPSBzdGF0ZVBhdGg7XHJcbiAgICAgICAgdGhpcy5kZWJ1Z01vZGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnN0b3BUcmFja2luZ1dpdGhEZXZUb29scygpO1xyXG4gICAgICAgIHRoaXMuc2V0V2l0aERldlRvb2xzKCk7XHJcbiAgICAgICAgdGhpcy50cmFja1dpdGhEZXZUb29scyhzdGF0ZVBhdGgpO1xyXG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZSh0aGlzLnN0YXRlSGlzdG9yeS5jdXJyZW50U3RhdGUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RvcCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLmRlYnVnTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RvcFRyYWNraW5nV2l0aERldlRvb2xzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGVidWdPcHRpb25zIHtcclxuICAgIGVuYWJsZUNvbnNvbGVPdXRwdXQ/OiBib29sZWFuO1xyXG4gICAgZW5hYmxlRGV2VG9vbHNPdXRwdXQ/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERlYnVnSGlzdG9yeUl0ZW0ge1xyXG4gICAgc3RhdGU6IGFueTtcclxuICAgIHN0YXRlUGF0aDogYW55W107XHJcbn0iXX0=