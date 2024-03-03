## 12-响应数据对应多个 effect

在我们之前的实现中，还存在一个小的问题，那就是：**每个响应性数据属性只能对应一个 `effect` 回调**

我们来看下面这个例子 `packages/vue/examples/reactivity/reactive-dep.html`：

```html
<body>
  <div id="app">
    <p id="p1"></p>
    <p id="p2"></p>
  </div>
</body>

<script>
  const { reactive, effect } = Vue;

  const obj = reactive({
    name: "张三",
  });

  // 调用 effect 方法
  effect(() => {
    document.querySelector("#p1").innerText = obj.name;
  });
  effect(() => {
    document.querySelector("#p2").innerText = obj.name;
  });

  setTimeout(() => {
    obj.name = "李四";
  }, 2000);
</script>
```

在以上的代码中，我们新增了一个 `effect` 函数，即：**`name` 属性对应两个 `DOM` 的变化**。

但是当我们运行该代码时发现，**`p1` 的更新渲染是无效的！**

那么这是因为什么呢？

查看我们的代码可以发现，我们在构建 `KeyToDepMap` 对象时，它的 `Value` 只能是一个 `ReactiveEffect`，所以这就导致了 **一个 `key` 只能对应一个有效的 `effect` 函数**。

那么假如我们期望：一个 `key` 可以对应 **多个** 有效的 `effect` 函数的话，那么应该怎么做呢？

可能有些同学已经想到了，我们只需要 **让 `KeyToDepMap` 的 `Value` 可以对应一个数组** 不就可以了吗？

![图片描述](https://qn.huat.xyz/mac/202403022051661.jpg)

如上图所示，我们可以构建一个 [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)（`set` 是一个 “数组”，值不会重复） 类型的对象，作为 `Map` 的 `value` 。

我们可以把它叫做 **`Dep`** ，通过 `Dep` 来保存 **指定 `key` 的所有依赖**

那么明确好了这样的概念之后，接下来我们到项目中，进行一个对应的实现。
