# TypeScript List&lt;T>

## Problem List&lt;T> solves
Using the **filter** method of an **Array** , in **TypeScript**, don't allow for additional parameters to be passed in and used as part of the filter condition.
**List&lt;T>** solves this problem by extending the **Array<T>** datatype with a **Where** method.
This **Where** method do allow for additional parameters to be passed in and used as part of the filter.

## Example 
1) Define interface for **&lt;T>**
```typescript
interface Item { name: string };
```

2) Create **List&lt;T>**
```typescript
let list = new List<Item>();
```

3) Create and Add data to **List&lt;T>** 
```typescript
let itemOne: Item = { name: "Name1" };
let itemTwo: Item = { name: "Name2" };
list.push(itemOne);
list.push(itemTwo);
```

4) Define filter
```typescript
let filter = (item: Item, name: string) => item.name === name;
```

5) Filter **List&lt;T>** using **Where(filter, value)**
```typescript
let newList = list.where(filter, "Name1");
```


## Development
### Install Dependencies
```
npm install
npm run setup
```

### Unit Tests
```
gulp test
```

### Static Code Analysis
```
gulp analyse
```
