### 源码阅读-h 函数，跟踪 Text、Comment、Fragment 场景

### Text

`Text` 标记为 **文本**。即：纯文本的 `VNode`

创建 `packages/vue/examples/imooc/runtime/h-other.html` 测试实例，查看 `Text` 的打印：

```js
const { h, render, Text, Comment, Fragment } = Vue;
const vnodeText = h(Text, "这是一个 Text");
console.log(vnodeText);

// 可以通过 render 进行渲染
render(vnodeText, document.querySelector("#app"));
```

查看打印：

```js
{
  "__v_isVNode": true,
  "children": "这是一个 Text",
  "type": Symbol(Text),
  "shapeFlag": 8  // TEXT_CHILDREN
}
```

那么由以上代码可知，对于 `Text` ，它存在的唯一一个比较特殊的地方就是：**`Text` 类型是一个 `Symbol(Text)` **，这个类型是在 `Vue` 中被导出的。

### Comment

`Comment` 标记为 **注释**。即：注释节点的 `VNode`。

在 `packages/vue/examples/runtime/h-other.html` 测试实例中，查看 `vnodeComment` 的打印：

```js
const { h, render, Text, Comment, Fragment } = Vue;
const vnodeComment = h(Comment, "这是一个 Comment");
console.log(vnodeComment);

render(vnodeComment, document.querySelector("#app"));
```

查看打印：

```js
{
  "__v_isVNode": true,
  "children": "这是一个 Comment",
  "type": Symbol(Comment),
  "shapeFlag": 8  // TEXT_CHILDREN
}
```

那么由以上代码可知，对于 `Comment` ，它存在的唯一一个比较特殊的地方就是：**`Comment` 类型是一个 `Symbol(Comment)` **，这个类型是在 `Vue` 中被导出的。

### Fragment

`Fragment` 标记为 **片段**。它相对比较特殊，是 `Vue3` 中新提出的一个概念，主要应对与 **包含多个根节点的模板** 。

即：包含多个根节点的模板被表示为一个片段 (`fragment`)。

在 `packages/vue/examples/runtime/h-other.html` 测试实例中，查看 `vnodeComment` 的打印：

```js
const { h, render, Text, Comment, Fragment } = Vue;
const vnodeFragment = h(Fragment, "这是一个 Fragment");
console.log(vnodeFragment);

render(vnodeFragment, document.querySelector("#app"));
```

查看打印（可以看一下 `Element` 比较 **特殊**）：

```js
{
  "__v_isVNode": true,
  "children": "这是一个 Fragment",
  "type": Symbol(Fragment),
  "shapeFlag": 8  // TEXT_CHILDREN
}
```

那么由以上代码可知，对于 `Fragment` ，它存在的唯一一个比较特殊的地方就是：**`Fragment` 类型是一个 `Symbol(Fragment)` **，这个类型是在 `Vue` 中被导出的。

### 总结

由以上代码可知， `Text 、 Comment、Fragment` 三块的处理还是比较简单的，比较重要的是搞明白他们三者的意思即可。
