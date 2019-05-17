import { Store } from './store';
export declare class Select {
    constructor(path: any);
}
export interface SelectSignature {
    (path: any[]): Store<any>;
}
