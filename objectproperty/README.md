# 如何获得对象非原型链上的属性?

-   `Object.getOwnPropertyNames`和`Object.keys`都可以获取*非原型链*上的属性
-   `Object.getOwnPropertyNames`和`Object.keys`这两个方法的区别，在于`Object.getOwnPropertyNames`可以获取对象*不可枚举*的属性

## 举个例子

比如如下这个`obj`对象，其本身包含`prop1`和`prop2`属性，同时，从`Object`上继承了`prop3`

```js
Object.prototype.prop3 = 'value3'; // 这会添加到所有对象的原型链上

let obj = {
    prop1: 'value1',
    prop2: 'value2',
};

console.log(obj);
// {prop1: 'value1', prop2: 'value2'}
// prop1: "value1"
// prop2: "value2"
// [[Prototype]]: Object
//  prop3: "value3"
```

## 使用 Object.keys

```js
console.log('使用Object.keys过滤prop3');
Object.keys(obj).forEach((key) => {
    console.log(key + ' -> ' + obj[key]);
});
// prop1 -> value1
// prop2 -> value2
```

## 使用 getOwnPropertyNames

```js
console.log('使用getOwnPropertyNames过滤prop3');
Object.getOwnPropertyNames(obj).forEach((prop) => {
    console.log(prop);
});
// prop1
// prop2
```

## 使用 hasOwnProperty

```js
console.log('使用hasOwnProperty过滤prop3');
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key + ' -> ' + obj[key]);
    }
}
// prop1 -> value1
// prop2 -> value2
```

## 输出所有属性

```js
for (let key in obj) {
    console.log(key + ' -> ' + obj[key]);
}
// prop1 -> value1
// prop2 -> value2
// prop3 -> value3
```
