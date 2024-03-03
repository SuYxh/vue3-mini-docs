## 04-Map 与 WeakMap

对比 [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 和 [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 的文档可知，他们两个具备一个核心共同点，那就是：**都是 {key, value} 的结构对象**。

但是对于 `WeakMap` 而言，他却存在两个不同的地方：

1. `key` 必须是对象
2. `key` 是弱引用的

其中第一个不同点比较好理解，但是第二个不同点是什么意思呢？

> 概念
>
> 弱引用：不会影响垃圾回收机制。即：WeakMap 的 key **不再存在任何引用时**，会被直接回收。
>
> 强引用：会影响垃圾回收机制。存在强应用的对象永远 **不会** 被回收。

我们来看下面两个例子：

```js
// target 对象
let obj = {
  name: "张三",
};
// 声明 Map 对象
const map = new Map();
// 保存键值对
map.set(obj, "value");
// 把 obj 置空
obj = null;
```

在当前这段代码中，如果我们在浏览器控制台中，打印 `map` 那么打印结果如下：

![图片描述](https://qn.huat.xyz/mac/202403022000384.jpg)

即：**虽然 `obj` 已经不存在任何引用了，但是它并没有被回收，依然存在于 `Map` 实例中**。这就证明 `Map` 是强应用的，哪怕 `obj` 手动为 `null`，但是它依然存在于 `Map` 实例中。

接下来同样的代码，我们来看 `WeakMap`:

```js
// target 对象
let obj = {
  name: "张三",
};
// 声明 Map 对象
const wm = new WeakMap();
// 保存键值对
wm.set(obj, "value");
// 把 obj 置空
obj = null;
```

在当前这段代码中，如果我们在浏览器控制台中，打印 `wm` 那么打印结果如下：

![图片描述](https://qn.huat.xyz/mac/202403022000593.jpg)

此时 `WeakMap` 中不存在任何值，即：**`obj` 不存在其他引用时，`WeakMap` 不会阻止垃圾回收，基于 `obj` 的引用将会被清除**。这就证明了 `WeakMap` 的 **弱引用特性。**

### 总结

那么由以上可知，对于 `WeakMap` 而言，它存在两个比较重要的特性：

1. `key` 必须是对象
2. `key` 是弱引用的
