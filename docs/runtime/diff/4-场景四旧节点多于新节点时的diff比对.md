## 场景四：旧节点多于新节点时的 diff 比对

根据之前分析，我们可以直接在 `packages/runtime-core/src/renderer.ts` 中的 `patchKeyedChildren` 方法下，实现如下代码：

```js
// 4. 旧节点多与新节点时的 diff 比对
else if (i > newChildrenEnd) {
    while (i <= oldChildrenEnd) {
        unmount(oldChildren[i]);
        i++;
    }
}
```

可以创建如下测试实例 `packages/vue/examples/runtime/render-element-diff-4.html`：

```js
<script>
const { h, render } = Vue;

const vnode = h('ul', [
    h('li', { key: 3 }, 'c'),
    h('li', { key: 1 }, 'a'),
    h('li', { key: 2 }, 'b')
]);

// 挂载
render(vnode, document.querySelector('#app'));

// 延迟两秒，生成新的 vnode，进行更新操作
setTimeout(() => {
    const vnode2 = h('ul', [
        h('li', { key: 1 }, 'a'),
        h('li', { key: 2 }, 'b')
    ]);
    render(vnode2, document.querySelector('#app'));
}, 2000);
</script>
```

测试成功
