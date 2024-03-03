## 11-完成 watch 数据监听器的依赖收集

根据前面所说，我们接下来就需要去实现 `traverse` 函数，在 `packages/runtime-core/src/apiWatch.ts` 中，创建 `traverse` 方法：

```js
/**
 * 依次执行 getter，从而触发依赖收集
 */
export function traverse(value: unknown) {
	if (!isObject(value)) {
		return value
	}

	for (const key in value as object) {
		traverse((value as any)[key])
	}
	return value
}
```

在 `doWatch` 中通过 `traverse` 方法，构建 `getter`：

```js
// 存在回调函数和deep
if (cb && deep) {
  // TODO
  const baseGetter = getter;
  getter = () => traverse(baseGetter());
}
```

此时再次运行测试实例， `watch` 成功监听。

同时因为我们已经处理了 `immediate` 的场景：

```js
if (cb) {
  if (immediate) {
    job();
  } else {
    oldValue = effect.run();
  }
} else {
  effect.run();
}
```

所以，目前 `watch` 也支持 `immediate` 的配置选项，`ref` 场景下的处理也可以得到支持，具体可见如下测试案例 `packages/vue/examples/reactivity/watch-2.html`

```js
const { ref, watch } = Vue;

const obj = ref({
  name: "张三",
});

watch(
  obj.value,
  (value, oldValue) => {
    console.log("watch 监听被触发");
    console.log("value", value);
  },
  {
    immediate: true,
  }
);

setTimeout(() => {
  obj.value.name = "李四";
}, 2000);
```
