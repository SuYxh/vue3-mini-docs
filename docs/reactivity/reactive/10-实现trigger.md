## 10-实现 trigger

之前，我们已经成功保存依赖到 `WeakMap` 中了，那么接下来我们就可以在 `setter` 的时候触发保存的依赖，以此来达到 **响应性** 数据的效果了。

在 `packages/reactivity/src/effect.ts` 中

```js
/**
 * 触发依赖的方法
 * @param target WeakMap 的 key
 * @param key 代理对象的 key，当依赖被触发时，需要根据该 key 获取
 */
export function trigger(
	target: object,
	key?: unknown
) {
	// 依据 target 获取存储的 map 实例
	const depsMap = targetMap.get(target)
	// 如果 map 不存在，则直接 return
	if (!depsMap) {
		return
	}
	// 依据 key，从 depsMap 中取出 value，该 value 是一个 ReactiveEffect 类型的数据
	const effect = depsMap.get(key) as ReactiveEffect
	// 如果 effect 不存在，则直接 return
	if (!effect) {
		return
	}
	// 执行 effect 中保存的 fn 函数
	effect.fn()
}
```

此时，我们就可以在触发 `setter` 时，执行保存的 `fn` 函数了。

那么接下来我们实现对应的测试实例，在 `packages/vue/examples/reactivity/reactive.html` 中：

```js
const { reactive, effect } = Vue;

const obj = reactive({
  name: "张三",
});

// 调用 effect 方法
effect(() => {
  document.querySelector("#app").innerText = obj.name;
});

setTimeout(() => {
  obj.name = "李四";
}, 2000);
```

运行测试实例，等待两秒，发现 **视图发生变化**

那么，至此我们就已经完成了一个简单的 **响应式依赖数据处理**
