export interface IList<T> extends Array<T> {
    where<T>(predicate: (T, ...arg) => boolean, ...arg): IList<T>;
}

export class List<T>  extends Array<T> implements IList<T> {
    public where(predicate: (T, ...arg) => boolean, ...arg): List<T> {
        let list: List<T> = new List<T>();
        this.filter(item => predicate(item, ...arg)).forEach(item => list.push(item));
        return list;
    }
}
