import * as Immutable from 'immutable';

export class Helpers {
    static overrideContructor(obj) {
        if (obj !== null
            && typeof (obj) === 'object'
            && !Immutable.Map.isMap(obj)
            && !Immutable.Iterable.isIterable(obj)) {
            if (obj.constructor === Array) {
                for (let i = 0; i < obj.length; i++) {
                    this.overrideContructor(obj[i]);
                }
            } else {
                obj.constructor = Object;
                for (let key in obj) {
                    this.overrideContructor(obj[key]);
                }
            }
        }
    };
}