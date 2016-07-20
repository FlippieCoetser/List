# List&lt;T>

## Example 
Define interface for &lt;T>
```typescript
interface Item { name: string };
```

Create List&lt;T>
```typescript
let list = new List<Item>();
```

Create and Add data to List&lt;T> 
```typescript
let itemOne: Item = { name: "Name1" };
let itemTwo: Item = { name: "Name2" };
list.push(itemOne);
list.push(itemTwo);
```

Define filter
```typescript
let filter = (item: Item, name: string) => item.name === name;
```

Filter List&lt;T> using Where(filter, value)
```typescript
let newList = list.where(filter, "Name1");
```


## Complexity Analysis

```
Command: plato -r -d ./analysis/complexity/report lib
Command: cr --config .complexrc ./src/*.js
```
