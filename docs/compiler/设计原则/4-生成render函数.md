## JavaScript AST 生成 render 函数代码

在上一小节我们已经成功了拿到了对应的 `JavaScript AST`，那么接下来我们就根据它生成对应的 `render` 函数。

我们知道利用 `render` 函数可以完成对应的渲染，根据我们之前了解的规则，`render` 必须返回一个 `vnode`。

例如，我们想要渲染这样的一个结构：`<div>hello world</div>`，那么可以构建这样的 `render` 函数：

```js
render() {
  return h('div', 'hello world')
}
```

之前同样的案例，我们来看看：

```js
const template = `<div>hello world</div>
```

这样的一个 `template`，最终生成的 `render` 函数是什么？

还是之前的例子：

```js
<script>
  const { compile, h, render } = Vue;

  // 创建 template
  const template = `<div>hello world</div>`;

  // 生成 render 函数
  const renderFn = compile(template);

  // 打印 renderFn 的代码
  console.log(renderFn.toString());

  // 创建组件
  const component = {
    render: renderFn
  };

  // 通过 h 函数，生成 vnode
  const vnode = h(component);

  // 通过 render 函数渲染组件
  render(vnode, document.querySelector('#app'));
</script>
```

打印其中的 `renderFn` 函数：

```js
function render(_ctx, _cache) {
  with (_ctx) {
    return _openBlock(), _createElementBlock("div", null, "hello world");
  }
}
```

对于以上代码，存在一个 [with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with) 语法，这个语法是一个 **不被推荐** 的语法，我们无需太过于关注它，只需要知道它的作用即可：

> 摘自：《JavaScript 高级程序设计》
>
> `with` 语句的作用是：**将代码的作用域设置到一个特定的对象中**…
>
> 由于大量使用`with`语句会导致性能下降，同时也会给调试代码造成困难，因此在开发大型应用程序时，不建议使用`with`语句。

我们可以把该代码（`render`）略作改造，直接应用到 `render` 的渲染中：

```js
<script>
  const { compile, h, render } = Vue;

  // 创建组件
  const component = {
    render: function (_ctx, _cache) {
      with (_ctx) {
        const { openBlock: _openBlock, createElementBlock: _createElementBlock } = Vue;
        return (
          _openBlock(),
          _createElementBlock("div", null, "hello world")
        );
      }
    }
  };

  // 通过 h 函数，生成 vnode
  const vnode = h(component);

  // 通过 render 函数渲染组件
  render(vnode, document.querySelector('#app'));
</script>
```

发现可以得到与：

```js
render() {
  return h('div', 'hello world')
}
```

观察两个 render 函数可以发现：

compiler 最终生成的 render 函数，与我们自己编写的 render 函数会略有区别。它会直接通过 `createElementBlock` 来渲染块级元素的方法，比 `h` 函数更加“精确”。同时，这也意味着生成的 render 函数会触发更精确的方法，比如：

- `createTextVNode`
- `createCommentVNode`
- `createElementBlock`
- …

虽然生成的 render 函数更加精确，但本质的逻辑并没有改变，依然是一个返回 `vnode` 进行 render 的过程。
