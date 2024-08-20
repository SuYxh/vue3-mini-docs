## Fragment 节点的挂载、更新行为

1. 在 `packages/runtime-core/src/renderer.ts` 中，为 `patch` 新增 `Fragment` 的方法触发：

```typescript
case Fragment:
  // Fragment
  processFragment(oldVNode, newVNode, container, anchor);
  break;
```

2. 创建 `processFragment` 方法：

```typescript
/**
 * Fragment 的打补丁操作
 */
const processFragment = (oldVNode, newVNode, container, anchor) => {
  if (oldVNode == null) {
    mountChildren(newVNode.children, container, anchor);
  } else {
    patchChildren(oldVNode, newVNode, container, anchor);
  }
};
```

3. 构建 `mountChildren` 渲染逻辑：

```typescript
/**
 * 挂载子节点
 */
const mountChildren = (children, container, anchor) => {
  // 处理 Cannot assign to read only property '0' of string 'xxx'
  if (isString(children)) {
    children = children.split("");
  }
  for (let i = 0; i < children.length; i++) {
    const child = (children[i] = normalizeVNode(children[i]));
    patch(null, child, container, anchor);
  }
};
```

4. 在 `packages/runtime-core/src/componentRenderUtils.ts` 中，为 `normalizeVNode` 增加处理 `Text` 节点逻辑：

```typescript
/**
 * 标准化 VNode
 */
export function normalizeVNode(child) {
  if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
```

5. 更新逻辑之前已经完成过，不需要额外处理。

至此，Fragment 的渲染处理完成。

我们可以创建对应测试实例 `packages/vue/examples/runtime/render-fragment.html`：

```html
<script>
  const { h, render, Fragment } = Vue;
  const vnode = h(Fragment, "hello world");

  // 挂载
  render(vnode, document.querySelector("#app"));

  setTimeout(() => {
    const vnode2 = h(Fragment, "你好，世界");
    // 挂载
    render(vnode2, document.querySelector("#app"));
  }, 2000);
</script>
```

挂载、更新成功。
