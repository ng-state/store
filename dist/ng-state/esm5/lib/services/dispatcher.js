/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { filter, share, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
var Message = /** @class */ (function () {
    function Message(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    return Message;
}());
export { Message };
if (false) {
    /** @type {?} */
    Message.prototype.type;
    /** @type {?} */
    Message.prototype.payload;
}
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
export { Dispatcher };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Dispatcher.prototype.subject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWEsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0M7SUFDSSxpQkFBbUIsSUFBYSxFQUFTLE9BQWE7UUFBbkMsU0FBSSxHQUFKLElBQUksQ0FBUztRQUFTLFlBQU8sR0FBUCxPQUFPLENBQU07SUFDdEQsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZlLHVCQUFvQjs7SUFBRSwwQkFBb0I7O0FBSTFEO0lBQUE7UUFFWSxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQStCekMsQ0FBQztJQTdCRyxzQkFBSSxrQ0FBVTs7OztRQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUM7OztPQUFBOzs7OztJQUVELHNDQUFpQjs7OztJQUFqQixVQUFrQixXQUFtQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUF4QixDQUF3QixFQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDOzs7Ozs7SUFJRCw0QkFBTzs7Ozs7SUFBUCxVQUFRLE9BQXlCLEVBQUUsT0FBYTtRQUM1QyxPQUFPLEdBQUcsQ0FBQyxtQkFBUyxPQUFPLEVBQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTO1lBQzNDLENBQUMsQ0FBQyxPQUFPO1lBQ1QsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLG1CQUFBLE9BQU8sRUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7Ozs7O0lBSUQsOEJBQVM7Ozs7Ozs7SUFBVCxVQUFVLFdBQTZCLEVBQUUsY0FBc0MsRUFBRSxLQUE0QixFQUFFLFFBQXFCO1FBQ2hJLFdBQVcsR0FBRyxDQUFDLG1CQUFVLFdBQVcsRUFBQSxDQUFDLENBQUMsU0FBUyxZQUFZLE9BQU87WUFDOUQsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLG1CQUFLLFdBQVcsRUFBQSxDQUFDLEVBQUUsRUFBVyxDQUFDLENBQUMsSUFBSTtZQUM1QyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBRWxCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFBLFdBQVcsRUFBVSxDQUFDO2FBQy9DLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsT0FBTyxFQUFYLENBQVcsRUFBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7O2dCQWhDSixVQUFVOztJQWlDWCxpQkFBQztDQUFBLEFBakNELElBaUNDO1NBaENZLFVBQVU7Ozs7OztJQUNuQiw2QkFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgc2hhcmUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlPzogc3RyaW5nLCBwdWJsaWMgcGF5bG9hZD86IGFueSkge1xyXG4gICAgfVxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEaXNwYXRjaGVyIHtcclxuICAgIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgICBnZXQgb2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPE1lc3NhZ2U+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1lc3NhZ2VzT2ZUeXBlKG1lc3NhZ2VUeXBlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE1lc3NhZ2U+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LnBpcGUoZmlsdGVyKG1zZyA9PiBtc2cudHlwZSA9PT0gbWVzc2FnZVR5cGUpLCBzaGFyZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaXNoKG1lc3NhZ2U6IE1lc3NhZ2UpOiB2b2lkO1xyXG4gICAgcHVibGlzaChtZXNzYWdlVHlwZTogc3RyaW5nLCBwYXlsb2FkPzogYW55KTogdm9pZDtcclxuICAgIHB1Ymxpc2gobWVzc2FnZTogc3RyaW5nIHwgTWVzc2FnZSwgcGF5bG9hZD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1lc3NhZ2UgPSAoPE1lc3NhZ2U+bWVzc2FnZSkudHlwZSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gbWVzc2FnZVxyXG4gICAgICAgICAgICA6IG5ldyBNZXNzYWdlKG1lc3NhZ2UgYXMgc3RyaW5nLCBwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQobWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3Vic2NyaWJlKG1lc3NhZ2U6IE1lc3NhZ2UsIG9ic2VydmVyT3JOZXh0OiAocGF5bG9hZDogYW55KSA9PiB2b2lkLCBlcnJvcj86IChlcnJvcjogYW55KSA9PiB2b2lkLCBjb21wbGV0ZT86ICgpID0+IHZvaWQpOiBTdWJzY3JpcHRpb247XHJcbiAgICBzdWJzY3JpYmUobWVzc2FnZVR5cGU6IHN0cmluZywgb2JzZXJ2ZXJPck5leHQ6IChwYXlsb2FkOiBhbnkpID0+IHZvaWQsIGVycm9yPzogKGVycm9yOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlPzogKCkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvbjtcclxuICAgIHN1YnNjcmliZShtZXNzYWdlVHlwZTogc3RyaW5nIHwgTWVzc2FnZSwgb2JzZXJ2ZXJPck5leHQ6IChwYXlsb2FkOiBhbnkpID0+IHZvaWQsIGVycm9yPzogKGVycm9yOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlPzogKCkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvbiB7XHJcbiAgICAgICAgbWVzc2FnZVR5cGUgPSAoPEZ1bmN0aW9uPm1lc3NhZ2VUeXBlKS5wcm90b3R5cGUgaW5zdGFuY2VvZiBNZXNzYWdlXHJcbiAgICAgICAgICAgID8gKG5ldyAoPGFueT5tZXNzYWdlVHlwZSkoKSBhcyBNZXNzYWdlKS50eXBlXHJcbiAgICAgICAgICAgIDogbWVzc2FnZVR5cGU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1lc3NhZ2VzT2ZUeXBlKG1lc3NhZ2VUeXBlIGFzIHN0cmluZylcclxuICAgICAgICAgICAgLnBpcGUobWFwKG1zZyA9PiAgbXNnLnBheWxvYWQpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xyXG4gICAgfVxyXG59Il19