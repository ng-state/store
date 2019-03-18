import { Store } from '../store/store';
import { StateHistory } from './history';

export class HistoryController {
    constructor(private store: Store<any>, private history: StateHistory) {
    }

    init() {
        this.store.subscribe(state => {
            this.history.add(state);
        });
    }
}