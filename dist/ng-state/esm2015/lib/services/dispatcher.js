/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { filter, share, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
export class Message {
    /**
     * @param {?=} type
     * @param {?=} payload
     */
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
if (false) {
    /** @type {?} */
    Message.prototype.type;
    /** @type {?} */
    Message.prototype.payload;
}
export class Dispatcher {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    Dispatcher.prototype.subject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zdGF0ZS9zdG9yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWEsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsTUFBTSxPQUFPLE9BQU87Ozs7O0lBQ2hCLFlBQW1CLElBQWEsRUFBUyxPQUFhO1FBQW5DLFNBQUksR0FBSixJQUFJLENBQVM7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFNO0lBQ3RELENBQUM7Q0FDSjs7O0lBRmUsdUJBQW9COztJQUFFLDBCQUFvQjs7QUFLMUQsTUFBTSxPQUFPLFVBQVU7SUFEdkI7UUFFWSxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQStCekMsQ0FBQzs7OztJQTdCRyxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxXQUFtQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDOzs7Ozs7SUFJRCxPQUFPLENBQUMsT0FBeUIsRUFBRSxPQUFhO1FBQzVDLE9BQU8sR0FBRyxDQUFDLG1CQUFTLE9BQU8sRUFBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDM0MsQ0FBQyxDQUFDLE9BQU87WUFDVCxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsbUJBQUEsT0FBTyxFQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7SUFJRCxTQUFTLENBQUMsV0FBNkIsRUFBRSxjQUFzQyxFQUFFLEtBQTRCLEVBQUUsUUFBcUI7UUFDaEksV0FBVyxHQUFHLENBQUMsbUJBQVUsV0FBVyxFQUFBLENBQUMsQ0FBQyxTQUFTLFlBQVksT0FBTztZQUM5RCxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsbUJBQUssV0FBVyxFQUFBLENBQUMsRUFBRSxFQUFXLENBQUMsQ0FBQyxJQUFJO1lBQzVDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFFbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQUEsV0FBVyxFQUFVLENBQUM7YUFDL0MsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7WUFoQ0osVUFBVTs7Ozs7OztJQUVQLDZCQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCBzaGFyZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGU/OiBzdHJpbmcsIHB1YmxpYyBwYXlsb2FkPzogYW55KSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERpc3BhdGNoZXIge1xyXG4gICAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICAgIGdldCBvYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8TWVzc2FnZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVzc2FnZXNPZlR5cGUobWVzc2FnZVR5cGU6IHN0cmluZyk6IE9ic2VydmFibGU8TWVzc2FnZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YmplY3QucGlwZShmaWx0ZXIobXNnID0+IG1zZy50eXBlID09PSBtZXNzYWdlVHlwZSksIHNoYXJlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1Ymxpc2gobWVzc2FnZTogTWVzc2FnZSk6IHZvaWQ7XHJcbiAgICBwdWJsaXNoKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHBheWxvYWQ/OiBhbnkpOiB2b2lkO1xyXG4gICAgcHVibGlzaChtZXNzYWdlOiBzdHJpbmcgfCBNZXNzYWdlLCBwYXlsb2FkPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbWVzc2FnZSA9ICg8TWVzc2FnZT5tZXNzYWdlKS50eXBlICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyBtZXNzYWdlXHJcbiAgICAgICAgICAgIDogbmV3IE1lc3NhZ2UobWVzc2FnZSBhcyBzdHJpbmcsIHBheWxvYWQpO1xyXG5cclxuICAgICAgICB0aGlzLnN1YmplY3QubmV4dChtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJzY3JpYmUobWVzc2FnZTogTWVzc2FnZSwgb2JzZXJ2ZXJPck5leHQ6IChwYXlsb2FkOiBhbnkpID0+IHZvaWQsIGVycm9yPzogKGVycm9yOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlPzogKCkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvbjtcclxuICAgIHN1YnNjcmliZShtZXNzYWdlVHlwZTogc3RyaW5nLCBvYnNlcnZlck9yTmV4dDogKHBheWxvYWQ6IGFueSkgPT4gdm9pZCwgZXJyb3I/OiAoZXJyb3I6IGFueSkgPT4gdm9pZCwgY29tcGxldGU/OiAoKSA9PiB2b2lkKTogU3Vic2NyaXB0aW9uO1xyXG4gICAgc3Vic2NyaWJlKG1lc3NhZ2VUeXBlOiBzdHJpbmcgfCBNZXNzYWdlLCBvYnNlcnZlck9yTmV4dDogKHBheWxvYWQ6IGFueSkgPT4gdm9pZCwgZXJyb3I/OiAoZXJyb3I6IGFueSkgPT4gdm9pZCwgY29tcGxldGU/OiAoKSA9PiB2b2lkKTogU3Vic2NyaXB0aW9uIHtcclxuICAgICAgICBtZXNzYWdlVHlwZSA9ICg8RnVuY3Rpb24+bWVzc2FnZVR5cGUpLnByb3RvdHlwZSBpbnN0YW5jZW9mIE1lc3NhZ2VcclxuICAgICAgICAgICAgPyAobmV3ICg8YW55Pm1lc3NhZ2VUeXBlKSgpIGFzIE1lc3NhZ2UpLnR5cGVcclxuICAgICAgICAgICAgOiBtZXNzYWdlVHlwZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZXNPZlR5cGUobWVzc2FnZVR5cGUgYXMgc3RyaW5nKVxyXG4gICAgICAgICAgICAucGlwZShtYXAobXNnID0+ICBtc2cucGF5bG9hZCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XHJcbiAgICB9XHJcbn0iXX0=