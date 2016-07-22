# TypeScript List&lt;T>

## Problem List&lt;T> solves
Using the **filter** method of an **Array** , in **TypeScript**, don't allow for additional parameters to be passed in and used as part of the filter condition.
**List&lt;T>** solves this problem by extending the **Array<T>** datatype with a **Where** method.
This **Where** method do allow for additional parameters to be passed in and used as part of the filter.

## General Use 
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

4) Define filter **(T, ...arg) => boolean**
```typescript
let filter = (item: Item, name: string) => item.name === name;
```

5) Filter **List&lt;T>** using **where(filter, value)**
```typescript
let newList = list.where(filter, "Name1");
```


## Development
### Install Dev Dependencies
Below command only required for development.
```
npm install
npm run setup
```

### Unit Tests
After running below gulp task a html codecoverage report is made available in directory **./analysis/coverage/lcov-report**.  
```
gulp test
```

### Static Code Analysis
After running below gulp task two reports are made available in directory **./analysis/complexity**.
The HTML version is located in the **report** subdirectory.

```
gulp analyse
```
Note: complexity analysis is just experimental
