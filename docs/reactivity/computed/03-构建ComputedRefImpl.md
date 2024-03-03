## 03-构建 ComputedRefImpl

对于 `computed` 而言，整体比较复杂，所以我们将分步进行实现。

我们的首先的目标是：**构建 `ComputedRefImpl` 类，创建出 `computed` 方法，并且能够读取值**

1. 创建 `packages/reactivity/src/computed.ts` ：

   ```ts
   import { isFunction } from "@vue/shared";
   import { Dep } from "./dep";
   import { ReactiveEffect } from "./effect";
   import { trackRefValue } from "./ref";

   /**
    * 计算属性类
    */
   export class ComputedRefImpl<T> {
     public dep?: Dep = undefined;
     private _value!: T;

     public readonly effect: ReactiveEffect<T>;

     public readonly __v_isRef = true;

     constructor(getter) {
       this.effect = new ReactiveEffect(getter);
       this.effect.computed = this;
     }

     get value() {
       // 触发依赖
       trackRefValue(this);
       // 执行 run 函数
       this._value = this.effect.run()!;
       // 返回计算之后的真实值
       return this._value;
     }
   }

   /**
    * 计算属性
    */
   export function computed(getterOrOptions) {
     let getter;

     // 判断传入的参数是否为一个函数
     const onlyGetter = isFunction(getterOrOptions);
     if (onlyGetter) {
       // 如果是函数，则赋值给 getter
       getter = getterOrOptions;
     }

     const cRef = new ComputedRefImpl(getter);

     return cRef as any;
   }
   ```

2. 在 `packages/shared/src/index.ts` 中，创建工具方法：

   ```ts
   /**
    * 是否为一个 function
    */
   export const isFunction = (val: unknown): val is Function =>
     typeof val === "function";
   ```

3. 在 `packages/reactivity/src/effect.ts` 中，为 `ReactiveEffect` 增加 `computed` 属性：

   ```ts
   export class ReactiveEffect<T = any> {
     /**
      * 存在该属性，则表示当前的 effect 为计算属性的 effect
      */
     computed?: ComputedRefImpl<T>;
   }
   ```

4. 最后不要忘记在 `packages/reactivity/src/index.ts` 和 `packages/vue/src/index.ts` 导出

5. 创建测试实例：`packages/vue/examples/reactivity/computed.html`：

   ```html
   <body>
     <div id="app"></div>
   </body>
   <script>
     const { reactive, computed, effect } = Vue;

     const obj = reactive({
       name: "张三",
     });

     const computedObj = computed(() => {
       return "姓名：" + obj.name;
     });

     effect(() => {
       document.querySelector("#app").innerHTML = computedObj.value;
     });

     setTimeout(() => {
       obj.name = "李四";
     }, 2000);
   </script>
   ```

那么此时，我们可以发现，计算属性，可以正常展示。

**但是：** 当 `obj.name` 发生变化时，我们可以发现浏览器 **并不会** 跟随变化，即：**计算属性并非是响应性的**。那么想要完成这一点，我们还需要进行更多的工作才可以。
