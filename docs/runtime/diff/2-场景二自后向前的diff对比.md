## 场景二: 自后向前的 diff 对比

那么明确好了自后向前的 diff 对比之后，接下来我们就可以直接进行对应的实现了:

1. 在 `patchKeyedChildren` 方法中，处理自后向前的场景:

```typescript
// 2. 自后向前的 diff 对比。经过该循环之后，从后开始的相同 vnode 将被处理
while (i <= oldChildrenEnd && i <= newChildrenEnd) {
  const oldVNode = oldChildren[oldChildrenEnd];
  const newVNode = normalizeVNode(newChildren[newChildrenEnd]);
  if (isSameVNodeType(oldVNode, newVNode)) {
    patch(oldVNode, newVNode, container, null);
  } else {
    break;
  }
  oldChildrenEnd--;
  newChildrenEnd--;
}
```

创建测试实例 `packages/vue/examples/runtime/render-element-diff-2.html` :

```html
<script>
  const { h, render } = Vue;

  const vnode = h("ul", [
    h("li", { key: 1 }, "a"),
    h("li", { key: 2 }, "b"),
    h("li", { key: 3 }, "c"),
  ]);

  // 挂载
  render(vnode, document.querySelector("#app"));

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h("ul", [
      h("li", { key: 4 }, "a"),
      h("li", { key: 2 }, "b"),
      h("li", { key: 3 }, "d"),
    ]);
    render(vnode2, document.querySelector("#app"));
  }, 2000);
</script>
```
