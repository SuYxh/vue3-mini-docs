## 场景一: 自前向后的 diff 对比

1、首先我们先让我们的代码支持 `ARRAY_CHILDREN` 的渲染。在 `packages/runtime-core/src/renderer.ts` 中 `mountElement` 中:

```typescript
else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  // 设置 Array 子节点
  mountChildren(vnode.children, el, anchor);
}
```

2、接下来我们来处理 diff。

3、在 `packages/runtime-core/src/renderer.ts` 中，创建 `patchKeyedChildren` 方法:

```typescript
/**
 * diff
 */
const patchKeyedChildren = (
  oldChildren,
  newChildren,
  container,
  parentAnchor
) => {
  /**
   * 索引
   */
  let i = 0;
  /**
   * 新的子节点的长度
   */
  const newChildrenLength = newChildren.length;
  /**
   * 旧的子节点最大(最后一个)下标
   */
  let oldChildrenEnd = oldChildren.length - 1;
  /**
   * 新的子节点最大(最后一个)下标
   */
  let newChildrenEnd = newChildrenLength - 1;

  // 1. 自前向后的 diff 对比。经过该循环之后，从前开始的相同 vnode 将被处理
  while (i <= oldChildrenEnd && i <= newChildrenEnd) {
    const oldVNode = oldChildren[i];
    const newVNode = normalizeVNode(newChildren[i]);
    // 如果 oldVNode 和 newVNode 被认为是同一个 vnode，则直接 patch 即可
    if (isSameVNodeType(oldVNode, newVNode)) {
      patch(oldVNode, newVNode, container, null);
    }
    // 如果不被认为是同一个 vnode，则直接跳出循环
    else {
      break;
    }
    // 下标自增
    i++;
  }
};
```

4、在 `patchChildren` 方法中，触发 `patchKeyedChildren` 方法:

```typescript
if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  // 这里要进行 diff 运算
  patchKeyedChildren(c1, c2, container, anchor);
}
```

创建对应测试实例 `packages/vue/examples/runtime/render-element-diff.html` :

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
      h("li", { key: 1 }, "a"),
      h("li", { key: 2 }, "b"),
      h("li", { key: 3 }, "d"),
    ]);
    render(vnode2, document.querySelector("#app"));
  }, 2000);
</script>
```

###
