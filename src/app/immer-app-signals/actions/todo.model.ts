import { Message } from '@ng-state/store';

export class TodoModel {
    id: any;
    name: string;
    description: string;

    nested: {
        value: string;
    }

    constructor() {
        this.id = generateUUID();
    }
}

function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export class ClearTodoMessage extends Message {
    constructor(payload?: any) {
        super('ClearTodoMessages', payload);
    }
}