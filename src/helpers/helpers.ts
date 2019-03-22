import { Map, Iterable} from 'immutable';

export class Helpers {
    static overrideContructor(obj) {
        if (Helpers.isObject(obj) && !Helpers.isImmutable(obj)) { // from ImmutableJs 4 breaking change isIterable => isCollection
            if (obj.constructor === Array) {
                for (let i = 0; i < obj.length; i++) {
                    this.overrideContructor(obj[i]);
                }
            } else {
                obj.__proto__.constructor = Object;
                for (let key in obj) {
                    this.overrideContructor(obj[key]);
                }
            }
        }
    }

    static isImmutable(obj: any) {
        return Map.isMap(obj) || Iterable.isIterable(obj);
    }

    static isObject(obj: any) {
        return obj !== null
            && typeof (obj) === 'object'
            && !Map.isMap(obj)
            && !Iterable.isIterable(obj);
    }
}