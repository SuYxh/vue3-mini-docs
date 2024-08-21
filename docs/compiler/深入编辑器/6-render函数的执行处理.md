## render 函数的执行处理

现在我们已经成功得到了 `render` 函数，但是如果我们此时运行测试实例，将得到对应的错误：

![634fc3eb09b4d64916800502](https://qn.huat.xyz/mac/202408212049586.jpg)

该错误指向 `componentRenderUtils.ts` 模块中的 `renderComponentRoot` ：

```js
/**
 * 解析 render 函数的返回值
 */
export function renderComponentRoot(instance) { ... }
```

那么出现该错误的原因是什么呢？

我们知道，当前的 `render` 函数代码为；

```js
const _Vue = Vue;

return function render(_ctx, _cache) {
  with (_ctx) {
    const {
      toDisplayString: _toDisplayString,
      createElementVNode: _createElementVNode,
    } = _Vue;

    return _createElementVNode(
      "div",
      [],
      [" hello " + _toDisplayString(msg) + " "]
    );
  }
};
```

因为我们使用了 `with` 所以改变了 `作用域` 指向，即：`msg` 等同于 `_ctx.msg`。如果此时 `_ctx` 为 `null`，则会抛出对应的错误。

通过下面的实例，我们可以看的更加清楚 `packages/vue/examples/compiler/with.html`：

```html
<script>
  function render(_ctx) {
    with (_ctx) {
      console.log(msg);
    }
  }
  const data = {
    msg: "world",
  };
  render.call(data, data); // 打印 "world"
  render.call(data); // 报错
</script>
```

那么由此我们就明白了，当触发 `call` 方法时，我们需要传递第二个参数为 `data`，以此作为 `_ctx` 的值。

所有，我们需要修改如下代码：

1. 在 `packages/runtime-core/src/componentRenderUtils.ts` 中：

   ```diff
   /**
    * 解析 render 函数的返回值
    */
   export function renderComponentRoot(instance) {
   + // 因为存在 with，所以我们必须保证 data 不能为 undefined
   +	const { vnode, render, data = {} } = instance

   	let result
   	try {
   		// 解析到状态组件
   		if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
   			// 获取到 result 返回值，如果 render 中使用了 this，则需要修改 this 指向
   +			result = normalizeVNode(render!.call(data, data))
   		}
   	} catch (err) {
   		console.error(err)
   	}

   	return result
   }
   ```

2. 创建 `packages/shared/src/toDisplayString.ts`，增加 `toDisplayString` 方法：

   ```ts
   /**
    * 用于将 {{ Interpolation }} 值转换为显示的字符串。
    * @private
    */
   export const toDisplayString = (val: unknown): string => {
     return String(val);
   };
   ```

3. 在 `packages/shared/src/index.ts` 中导入 `toDisplayString.ts` 模块中的所有方法：

   ```js
   export * from "./toDisplayString";
   ```

4. 在 `packages/vue/src/index.ts` 中，导入 `toDisplayString` 方法：

   ```js
   export { toDisplayString } from "@vue/shared";
   ```

此时运行测试实例，`<div> hello world </div>` 被正常渲染。

此时我们也可以增加对应的生命周期钩子，修改数据：

```html
<script>
  const { compile, h, render } = Vue;
  // 创建 template
  const template = `<div> hello {{ msg }} </div>`;

  // 生成 render 函数
  const renderFn = compile(template);

  // 创建组件
  const component = {
    data() {
      return {
        msg: "world",
      };
    },
    render: renderFn,
    created() {
      setTimeout(() => {
        this.msg = "世界";
      }, 2000);
    },
  };

  // 通过 h 函数，生成 vnode
  const vnode = h(component);

  // 通过 render 函数渲染组件
  render(vnode, document.querySelector("#app"));
</script>
```

响应式数据渲染完成。
