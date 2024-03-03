## 06-ref 函数-构建简单数据类型的响应性

1. 在 `packages/reactivity/src/ref.ts` 中，完善 `set value` 函数：

   ```ts
   class RefImpl<T> {
   	private _value: T
   	private _rawValue: T
     ...

   	constructor(value: T, public readonly __v_isShallow: boolean) {
   		...

   		// 原始数据
   		this._rawValue = value
   	}

   	...

   	set value(newVal) {
   		/**
   		 * newVal 为新数据
   		 * this._rawValue 为旧数据（原始数据）
   		 * 对比两个数据是否发生了变化
   		 */
   		if (hasChanged(newVal, this._rawValue)) {
   			// 更新原始数据
   			this._rawValue = newVal
   			// 更新 .value 的值
   			this._value = toReactive(newVal)
   			// 触发依赖
   			triggerRefValue(this)
   		}
   	}
   }

   /**
    * 为 ref 的 value 进行触发依赖工作
    */
   export function triggerRefValue(ref) {
   	if (ref.dep) {
   		triggerEffects(ref.dep)
   	}
   }
   ```

2. 在 `packages/shared/src/index.ts` 中，新增 `hasChanged` 方法

   ```ts
   /**
    * 对比两个数据是否发生了改变
    */
   export const hasChanged = (value: any, oldValue: any): boolean =>
     !Object.is(value, oldValue);
   ```

至此，简单数据类型的响应性处理完成。

我们可以创建对应测试实例：`packages/vue/examples/reactivity/ref-shallow.html`

```js
const { ref, effect } = Vue;

const obj = ref("张三");

// 调用 effect 方法
effect(() => {
  document.querySelector("#app").innerText = obj.value;
});

setTimeout(() => {
  obj.value = "李四";
}, 2000);
```

测试成功，表示代码完成。
