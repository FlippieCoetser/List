export interface IList<T> extends Array<T> {
    where<T>(predicate:(T, ...arg) => boolean, ...a): Array<T>
}

export class List<T> extends Array<T> implements IList<T> {
    public where(predicate: any, ...arg): Array<any> { 
        return this.filter(item => predicate(item, ...arg));
    }
}