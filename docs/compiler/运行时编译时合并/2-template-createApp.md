## 基于 template 渲染的 createApp 的构建逻辑

对于组件而言，我们不光要支持 `render` 还需要支持 `template` 的模板渲染：

```html
<script>
  const { createApp, h } = Vue;
  const APP = {
    template: `<div>hello world</div>`,
  };

  const app = createApp(APP);
  app.mount("#app");
</script>
```

但是如果现在我们尝试运行这个测试实例的话，那么将会得到一个对应的错误：

![634fc5020928146816200910](https://qn.huat.xyz/mac/202408242133910.jpg)

查看我们当前的代码，我们可以发现：

1. 在 `createAppAPI` 中的 `mount` 函数中，我们直接触发了 `createVNode`，传递了当前的组件实例，从而得到 `vnode`。
2. 但是我们知道，我们当初是先实现了 `render`，后实现了 `compiler`，这也就意味着在 `renderer` 渲染器中，是**不存在** 模板解析器的。
3. 所以也就意味着，`createVNode` 将无法解析 `template` 模板。

那么这样应该怎么做呢？

`template` 模板的解析，必然需要依赖于 `compiler`，所以这就意味着，我们需要在 `renderer` 中导入 `compiler` 才可以。

1. 在 `packages/runtime-core/src/component.ts` 中，创建 `registerRuntimeCompiler` 方法，获取 `compile` 实例

   ```ts
   /**
    * 编辑器实例
    */
   let compile;

   /**
    * 用来注册编译器的运行时
    */
   export function registerRuntimeCompiler(_compile: any) {
     compile = _compile;
   }
   ```

2. 接下来我们需要在 `finishComponentSetup`，判断当前组件是 `template` 还是 `render`，从而通过不同的方式进行渲染：

   ```diff
   export function finishComponentSetup(instance) {
   	const Component = instance.type

   	// 组件不存在 render 时，才需要重新赋值
   	if (!instance.render) {
   		// 存在编辑器，并且组件中不包含 render 函数，同时包含 template 模板，则直接使用编辑器进行编辑，得到 render 函数
   		if (compile && !Component.render) {
   			if (Component.template) {
   				// 这里就是 runtime 模块和 compile 模块结合点
   				const template = Component.template
   				Component.render = compile(template)
   			}
   		}
   		// 为 render 赋值
   		instance.render = Component.render
   	}

   	// 改变 options 中的 this 指向
   	applyOptions(instance)
   }
   ```

3. 最后我们只需要在 `packages/vue-compat/src/index.ts` 中注册 `compile` 即可：

   ```ts
   /**
    * 注册 compiler
    */
   registerRuntimeCompiler(compileToFunction);
   ```

此时，再次运行测试实例，实例可正常运行。
