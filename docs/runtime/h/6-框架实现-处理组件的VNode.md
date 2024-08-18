### 框架实现: 处理组件的 VNode

我们知道组件的 VNode 其实只存在两个不同的地方：

1. **type**
2. **shapeFlag**

对于 `type` 而言，它是 `h` 函数的第一个参数，我们其实不需要单独进行处理，所以我们只需要处理 `shapeFlag` 即可。

在我们的代码中，处理 `shapeFlag` 的地方有两个：

1. **createVNode**: 第一次处理，表示 node 类型（比如: Element）
2. **createBaseVNode**: 第二次处理，表示子节点类型（比如: Text Children）

因为我们这里不涉及到子节点，所以我们只需要在 `createVNode` 中处理即可：

```js
// 通过 bit 位处理 shapeFlag 类型
const shapeFlag = isString(type)
  ? ShapeFlags.ELEMENT
  : isObject(type)
  ? ShapeFlags.STATEFUL_COMPONENT
  : 0;
```

此时创建测试实例 `packages/vue/examples/runtime/h-component.html`：

```html
<script>
  const { h, render } = Vue;

  const component = {
    render() {
      const vnode1 = h("div", "这是一个 component");
      return vnode1;
    },
  };

  const vnode2 = h(component);
  console.log(vnode2);
</script>
```

可以得到相同的打印结果。

![image-20240818193637373](https://qn.huat.xyz/mac/202408181936400.png)
