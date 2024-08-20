## Comment 节点的挂载行为

1. 在 `packages/runtime-core/src/renderer.ts` 中：

```typescript
export interface RendererOptions {
  ...
  /**
   * 设置 text
   */
  createComment(text: string);
}

const {
  ...
  createComment: hostCreateComment,
} = options;

/**
 * Comment 的打补丁操作
 */
const processCommentNode = (oldVNode, newVNode, container, anchor) => {
  if (oldVNode == null) {
    // 生成节点
    newVNode.el = hostCreateComment((newVNode.children as string) || '');
    // 挂载
    hostInsert(newVNode.el, container, anchor);
  } else {
    // 无更新
    newVNode.el = oldVNode.el;
  }
};

// patch 方法中 switch 逻辑
case Comment:
  // Comment
  processCommentNode(oldVNode, newVNode, container, anchor);
  break;
```

2. 在 `packages/runtime-dom/src/nodeOps.ts` 中，增加 `createComment` 方法：

```typescript
/**
 * 创建 Comment 节点
 */
createComment: (text) => doc.createComment(text);
```

代码完成。

创建测试实例 `packages/vue/examples/runtime/render-comment.html`：

```html
<script>
  const { h, render, Comment } = Vue;
  const vnode = h(Comment, "hello world");

  // 挂载
  render(vnode, document.querySelector("#app"));
</script>
```

测试成功。
