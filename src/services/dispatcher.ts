import {Observable, Subject, Subscription} from 'rxjs';

import { Injectable } from '@angular/core';

type ObserverOrNext = ((payload: any) => void);

export class Message {
    constructor(public type?: string, public payload?: any) {
    }
}

@Injectable()
export class Dispatcher {
    private subject = new Subject<Message>();

    get observable(): Observable<Message> {
        return this.subject.asObservable();
    }

    getMessagesOfType(messageType: string): Observable<Message> {
        return this.subject.filter(msg => msg.type === messageType).share();
    }

    publish(message: Message): void;
    publish(messageType: string, payload?: any): void;
    publish(message: string | Message, payload?: any): void {
        message = (<Message>message).type !== undefined
            ? message
            : new Message(message as string, payload);

        this.subject.next(message);
    }

    subscribe(message: Message, observerOrNext: ObserverOrNext, error?: (error: any) => void, complete?: () => void): Subscription;
    subscribe(messageType: string, observerOrNext: ObserverOrNext, error?: (error: any) => void, complete?: () => void): Subscription;
    subscribe(messageType: string | Message, observerOrNext: ObserverOrNext, error?: (error: any) => void, complete?: () => void): Subscription {
         messageType = (<Function>messageType).prototype instanceof Message
            ? (new (<any>messageType)() as Message).type
            : messageType;

        return this.getMessagesOfType(messageType as string)
            .map(msg =>  msg.payload)
            .subscribe(observerOrNext, error, complete);
    }
}