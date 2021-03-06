/// <reference path="../typings/globals/node/index.d.ts" />
class List<T> extends Array<T> {
    public where(predicate: (T, ...arg) => boolean, ...arg): List<T> {
        return this.filter(item => predicate(item, ...arg)) as List<T>;
    }
}

export = List;
