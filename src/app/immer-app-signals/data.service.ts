import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
    getData() {
        console.log('Data Service');
    }
}