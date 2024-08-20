## Text 节点的挂载、更新行为

实现一下对应的代码：

1. 在 `packages/runtime-core/src/renderer.ts` 中，增加 `processText` 方法：

```typescript
/**
 * Text 的打补丁操作
 */
const processText = (oldVNode, newVNode, container, anchor) => {
  // 不存在旧的节点，则为 挂载 操作
  if (oldVNode == null) {
    // 生成节点
    newVNode.el = hostCreateText(newVNode.children as string);
    // 挂载
    hostInsert(newVNode.el, container, anchor);
  }
  // 存在旧的节点，则为 更新 操作
  else {
    const el = (newVNode.el = oldVNode.el!);
    if (newVNode.children !== oldVNode.children) {
      hostSetText(el, newVNode.children as string);
    }
  }
};
```

2. 为 `RendererOptions` 增加 `createText` 与 `setText` 方法：

```typescript
/**
 * 渲染器配置对象
 */
export interface RendererOptions {
  ...
  /**
   * 创建 Text 节点
   */
  createText(text: string);
  /**
   * 设置 text
   */
  setText(node, text): void;
}
```

3. 为 `options` 增加解析：

```typescript
/**
 * 解构 options，获取所有的兼容性方法
 */
const { ...createText, setText: hostSetText } = options;
```

4. 在 `patch` 方法中，处理 Text 节点：

```typescript
case Text:
  // Text
  processText(oldVNode, newVNode, container, anchor);
  break;
```

5. 在 `packages/runtime-dom/src/nodeOps.ts` 增加 `createText` 和 `setText` 方法：

```typescript
/**
 * 创建 Text 节点
 */
createText: (text) => doc.createTextNode(text),

/**
 * 设置 text
 */
setText: (node, text) => {
  node.nodeValue = text;
}
```

代码完成。

创建测试实例 `packages/vue/examples/runtime/render-text.html`：

```html
<script>
  const { h, render, Text } = Vue;
  const vnode = h(Text, "hello world");

  // 挂载
  render(vnode, document.querySelector("#app"));

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h(Text, "你好，世界");
    render(vnode2, document.querySelector("#app"));
  }, 2000);
</script>
```

测试挂载和更新成功。
