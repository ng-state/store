import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { filter, share, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

export class Message {
    constructor(public type?: string, public payload?: any) {
    }
}

@Injectable()
export class Dispatcher {
    private subject = new Subject<any>();
    private memorized = new ReplaySubject<any>(1);

    get observable(): Observable<Message> {
        return this.subject.asObservable();
    }

    getMessagesOfType(messageType: string, isMemorized: boolean): Observable<Message> {
        return isMemorized
            ? this.memorized.pipe(filter(msg => msg.type === messageType), share())
            : this.subject.pipe(filter(msg => msg.type === messageType), share());
    }

    publish(message: Message): void;
    publish(messageType: string, payload?: any): void;
    publish(message: string | Message, payload?: any): void {
        message = (<Message>message).type !== undefined
            ? message
            : new Message(message as string, payload);

        this.subject.next(message);
    }

    publishMemorized(message: Message): void;
    publishMemorized(messageType: string, payload?: any): void;
    publishMemorized(message: string | Message, payload?: any): void {
        message = (<Message>message).type !== undefined
            ? message
            : new Message(message as string, payload);

        this.memorized.next(message);
    }

    subscribe(messageType: Message, observerOrNext: (payload: any) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    subscribe(messageType: string, observerOrNext: (payload: any) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    subscribe(messageType: string | Message, observerOrNext: (payload: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.getFilteredObservable(messageType)
            .subscribe(observerOrNext, error, complete);
    }

    listenTo<T = any>(messageType: Message): Observable<T>;
    listenTo<T = any>(messageType: string): Observable<T>;
    listenTo<T = any>(messageType: string | Message): Observable<T> {
        return this.getFilteredObservable(messageType);
    }

    listenToMemorized<T = any>(messageType: Message): Observable<T>;
    listenToMemorized<T = any>(messageType: string): Observable<T>;
    listenToMemorized<T = any>(messageType: string | Message): Observable<T> {
        return this.getFilteredObservable(messageType, true);
    }

    private getFilteredObservable(messageType: string | Message, isMemorized: boolean = false) {
        messageType = (<Function>messageType).prototype instanceof Message
            ? (new (<any>messageType)() as Message).type
            : messageType;

        return this.getMessagesOfType(messageType as string, isMemorized)
            .pipe(map(msg => msg.payload));
    }
}