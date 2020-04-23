export class Helpers {
    guid() {
        const s4 = function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    }

    getChildPath(statePath: string[], rootPath: string[]) {
        return statePath.filter(function (item) {
            return !rootPath.includes(item);
        });
    }

    isRootPath(childPath: string[], path: string[]) {
        return Array.isArray(childPath) && childPath.length === 0 && path.length === 0;
    }
}

const helpers = new Helpers();
export { helpers };