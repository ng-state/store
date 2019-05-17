import { Observable, Subscription } from 'rxjs';
export declare class Message {
    type?: string;
    payload?: any;
    constructor(type?: string, payload?: any);
}
export declare class Dispatcher {
    private subject;
    readonly observable: Observable<Message>;
    getMessagesOfType(messageType: string): Observable<Message>;
    publish(message: Message): void;
    publish(messageType: string, payload?: any): void;
    subscribe(message: Message, observerOrNext: (payload: any) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    subscribe(messageType: string, observerOrNext: (payload: any) => void, error?: (error: any) => void, complete?: () => void): Subscription;
}
