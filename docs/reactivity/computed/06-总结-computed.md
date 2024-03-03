## 06-总结-computed

那么到这里已经完成了 `computed` 计算属性的构建。

接下来我们来总结一下计算属性实现的重点：

1. 计算属性的实例，本质上是一个 `ComputedRefImpl` 的实例
2. `ComputedRefImpl` 中通过 `dirty` 变量来控制 `run` 的执行和 `triggerRefValue` 的触发
3. 想要访问计算属性的值，必须通过 `.value` ，因为它内部和 `ref` 一样是通过 `get value` 来进行实现的
4. 每次 `.value` 时都会触发 `trackRefValue` 即：收集依赖
5. 在依赖触发时，需要谨记，先触发 `computed` 的 `effect`，再触发非 `computed` 的 `effect`
