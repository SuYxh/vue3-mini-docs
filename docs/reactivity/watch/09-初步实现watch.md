## 09-初步实现 watch

来看一下 `watch` 函数应该如何进行实现。

1. 创建 `packages/runtime-core/src/apiWatch.ts` 模块，创建 `watch` 与 `doWatch` 函数：

   ```ts
   /**
    * watch 配置项属性
    */
   export interface WatchOptions<Immediate = boolean> {
     immediate?: Immediate;
     deep?: boolean;
   }

   /**
    * 指定的 watch 函数
    * @param source 监听的响应性数据
    * @param cb 回调函数
    * @param options 配置对象
    * @returns
    */
   export function watch(source, cb: Function, options?: WatchOptions) {
     return doWatch(source as any, cb, options);
   }

   function doWatch(
     source,
     cb: Function,
     { immediate, deep }: WatchOptions = EMPTY_OBJ
   ) {
     // 触发 getter 的指定函数
     let getter: () => any;

     // 判断 source 的数据类型
     if (isReactive(source)) {
       // 指定 getter
       getter = () => source;
       // 深度
       deep = true;
     } else {
       getter = () => {};
     }

     // 存在回调函数和deep
     if (cb && deep) {
       // TODO
       const baseGetter = getter;
       getter = () => baseGetter();
     }

     // 旧值
     let oldValue = {};
     // job 执行方法
     const job = () => {
       if (cb) {
         // watch(source, cb)
         const newValue = effect.run();
         if (deep || hasChanged(newValue, oldValue)) {
           cb(newValue, oldValue);
           oldValue = newValue;
         }
       }
     };

     // 调度器
     let scheduler = () => queuePreFlushCb(job);

     const effect = new ReactiveEffect(getter, scheduler);

     if (cb) {
       if (immediate) {
         job();
       } else {
         oldValue = effect.run();
       }
     } else {
       effect.run();
     }

     return () => {
       effect.stop();
     };
   }
   ```

2. 在 `packages/reactivity/src/reactive.ts` 为 `reactive` 类型的数据，创建 **标记**：

   ```ts
   export const enum ReactiveFlags {
   	IS_REACTIVE = '__v_isReactive'
   }

   function createReactiveObject(
   	...
   ) {
   	...
   	// 未被代理则生成 proxy 实例
   	const proxy = new Proxy(target, baseHandlers)
   	// 为 Reactive 增加标记
   	proxy[ReactiveFlags.IS_REACTIVE] = true
   ...
   }
   ```

   ```js
   /**
    * 判断一个数据是否为 Reactive
    */
   export function isReactive(value): boolean {
     return !!(value && value[ReactiveFlags.IS_REACTIVE]);
   }
   ```

3. 在 `packages/shared/src/index.ts` 中创建 `EMPTY_OBJ`：

   ```js
   /**
    * 只读的空对象
    */
   export const EMPTY_OBJ: { readonly [key: string]: any } = {}
   ```

4. 在 `packages/runtime-core/src/index.ts` 和 `packages/vue/src/index.ts` 中导出 `watch` 函数

5. 创建测试实例 `packages/vue/examples/reactivity/watch.html`：

   ```js
   const { reactive, watch } = Vue;

   const obj = reactive({
     name: "张三",
   });

   watch(obj, (value, oldValue) => {
     console.log("watch 监听被触发");
     console.log("value", value);
   });

   setTimeout(() => {
     obj.name = "李四";
   }, 2000);
   ```

此时运行项目，却发现，当前存在一个问题，那就是 **`watch` 监听不到 `reactive` 的变化**

那么这是因为什么呢？大家可以先思考下这个问题
