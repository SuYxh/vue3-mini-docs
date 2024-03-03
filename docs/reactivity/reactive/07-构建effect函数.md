## 07-构建 effect 函数

根据之前的测试实例我们知道，在创建好了 `reactive` 实例之后，接下来我们需要触发 `effect`：

```js
// 调用 effect 方法
effect(() => {
  document.querySelector("#app").innerText = obj.name;
});
```

在之前的源码查看中可知，在 `effect` 中，我们生成了 `ReactiveEffect` 实例，并且触发了 `getter（obj.name）`

那么接下来我们就要完成这一系列的操作。

1. 在 `packages/reactivity/src/effect.ts` 中，创建 `effect` 函数：

   ```js
   /**
    * effect 函数
    * @param fn 执行方法
    * @returns 以 ReactiveEffect 实例为 this 的执行函数
    */
   export function effect<T = any>(fn: () => T) {
     // 生成 ReactiveEffect 实例
     const _effect = new ReactiveEffect(fn);
     // 执行 run 函数
     _effect.run();
   }
   ```

2. 那么接下来我们来实现 `ReactiveEffect` 的基础逻辑：

   ```js
   /**
    * 单例的，当前的 effect
    */
   export let activeEffect: ReactiveEffect | undefined

   /**
    * 响应性触发依赖时的执行类
    */
   export class ReactiveEffect<T = any> {
   	constructor(public fn: () => T) {}

   	run() {
   		// 为 activeEffect 赋值
   		activeEffect = this

   		// 执行 fn 函数
   		return this.fn()
   	}

   }
   ```

那么根据以上代码可知，最终 `vue` 会执行 `effect` 传入的 回调函数，即：

```js
document.querySelector("#app").innerText = obj.name;
```

那么此时，`obj.name` 的值，应该可以被渲染到 `html` 中。

在`packages/reactivity/src/index.ts` 中增加

```js
export { effect } from "./effect";
```

在`packages/vue/src/index.ts` 导入 `effect`

```js
export { reactive, effect } from "@vue/reactivity";
```

然后到测试实例中进行测试

```html
<body>
  <div id="app"></div>
</body>

<script>
  const { reactive, effect } = Vue;

  const obj = reactive({
    name: "张三",
  });

  // 调用 effect 方法
  effect(() => {
    document.querySelector("#app").innerText = obj.name;
  });
</script>
```

那么此时，我们成功 **渲染了数据到 `html` 中**，那么接下来我们需要做的就是：**当 `obj.name` 触发 `setter` 时，修改视图**，以此就可实现 **响应性数据变化**。

所以，下面我们就需要分别处理 `getter` 和 `setter` 对应的情况了。
