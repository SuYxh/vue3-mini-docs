### 框架实现: 实现剩余场景 Text、Comment、Fragment

根据上一小节的描述，我们可以直接在 `packages/runtime-core/src/vnode.ts` 中创建三个 Symbol：

```js
export const Fragment = Symbol("Fragment");
export const Text = Symbol("Text");
export const Comment = Symbol("Comment");
```

然后导出即可。

创建测试实例 `packages/vue/examples/runtime/h-other.html`：

```html
<script>
  const { h, render, Text, Comment, Fragment } = Vue;

  const vnodeText = h(Text, "这是一个 Text");
  console.log(vnodeText);

  const vnodeComment = h(Comment, "这是一个 Comment");
  console.log(vnodeComment);

  const vnodeFragment = h(Fragment, "这是一个 Fragment");
  console.log(vnodeFragment);
</script>
```

测试打印即可。
