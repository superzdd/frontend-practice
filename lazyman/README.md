# 第 56 题：要求设计 LazyMan 类，实现以下功能。
```js
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

关于lazyman，首先肯定得构造对象并返回自身啦，那么就是es5,es6各自都要实现一遍。其中最麻烦的是`sleepFirst`方法，因为这个方法需要优先执行，所以我们需要额外构造一个队列，储存所有的方法再依次输出。不着急，一点一点来