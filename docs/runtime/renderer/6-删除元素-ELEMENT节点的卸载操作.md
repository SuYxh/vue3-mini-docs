## 删除元素，ELEMENT 节点的卸载操作

那么此时我们已经有了 `unmount` 函数，我们知道触发 `unmount` 函数，即可卸载元素。

那么接下来我们就可以基于这样的函数来去实现**卸载**操作了。

创建如下测试实例 `packages/vue/examples/runtime/render-element-remove.html`：

```html
<script>
  const { h, render } = Vue;
  const vnode = h("div", { class: "test" }, "hello render");

  // 挂载
  render(vnode, document.querySelector("#app"));

  // 延迟两秒，执行卸载操作
  setTimeout(() => {
    render(null, document.querySelector("#app"));
  }, 2000);
</script>
```

当我们触发 `render(null, document.querySelector('#app'))` 时，Vue 会删除之前渲染的 `vnode`。即为：卸载操作。

这里查看对应源码逻辑，也非常简单，查看 `packages/runtime-core/src/renderer.ts` 中 `render` 函数：

```typescript
const render: RootRenderFunction = (vnode, container, isSVG) => {
  // 不存在新的 vnode 时
  if (vnode == null) {
    // 但是存在旧的 vnode
    if (container._vnode) {
      // 则直接执行卸载操作
      unmount(container._vnode, null, null, true);
    }
  } else {
    ...
  }
  ...
};
```

这块代码比较简单，我们直接实现即可：

在 `packages/runtime-core/src/renderer.ts` 中为 `render` 函数补充卸载逻辑：

```typescript
/**
 * 渲染函数
 */
const render = (vnode, container) => {
  if (vnode == null) {
    // 卸载
    if (container._vnode) {
      unmount(container._vnode);
    }
  } else {
    // 打补丁(包括了挂载和更新)
    patch(container._vnode || null, vnode, container);
  }
  container._vnode = vnode;
};
```

创建对应测试实例，卸载成功。
