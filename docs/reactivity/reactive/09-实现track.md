## 09-实现 track

那么这本小节，我们就来实现 `track` 函数，明确一下最终的目标，我们期望最终 `weakMap` 中可以保存一下结构数据：

那么大家想一想我们可不可以这样：

1. `WeakMap`
   1. `key`：响应性对象
   2. `value`：`Map`对象
      1. `key`：响应性对象的指定属性
      2. `value`：指定对象的指定属性的 执行函数

在 `packages/reactivity/src/effect.ts` 写入如下代码：

```js
type KeyToDepMap = Map<any, ReactiveEffect>
/**
 * 收集所有依赖的 WeakMap 实例：
 * 1. `key`：响应性对象
 * 2. `value`：`Map` 对象
 * 		1. `key`：响应性对象的指定属性
 * 		2. `value`：指定对象的指定属性的 执行函数
 */
const targetMap = new WeakMap<any, KeyToDepMap>()
/**
 * 用于收集依赖的方法
 * @param target WeakMap 的 key
 * @param key 代理对象的 key，当依赖被触发时，需要根据该 key 获取
 */
export function track(target: object, key: unknown) {
	// 如果当前不存在执行函数，则直接 return
	if (!activeEffect) return
	// 尝试从 targetMap 中，根据 target 获取 map
	let depsMap = targetMap.get(target)
	// 如果获取到的 map 不存在，则生成新的 map 对象，并把该对象赋值给对应的 value
	if (!depsMap) {
		targetMap.set(target, (depsMap = new Map()))
	}
	//为指定 map，指定key 设置回调函数
	depsMap.set(key, activeEffect)
  // 临时打印
	console.log(targetMap)
}
```

此时运行测试函数，查看打印的 `depsMap`，可得以下数据：

![图片描述](https://qn.huat.xyz/mac/202403022030884.jpg)

那么此时证明，此时：**指定对象的指定属性对应的 `fn`** 已经被成功的保存到了 `WeakMap` 中了。
