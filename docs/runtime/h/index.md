我们知道 h 函数核心是用来:创建 vnode 的。但是对于 vnode 而言，它存在很多种不同的节点类型。
查看 `packages/runtime-core/src/renderer.ts` 中第 354 行 patch 方法的代码可知， Vue 总共处理 了:

1. Text :文本节点

2. Comment :注释节点

3. Static :静态 DOM 节点

4. Fragment :包含多个根节点的模板被表示为一个片段 (fragment) 5. ELEMENT : DOM 节点

5. COMPONENT :组件

6. TELEPORT :新的 内置组件

7. SUSPENSE :新的 内置组件

8. ...

各种不同类型的节点，而每一种类型的处理都对应着不同的 VNode 。所以就需要把各种类型的 VNode 构建出来(不会全部处理所有类型，只会选择比较有代表性的部分)，以便，后面进行 render 渲染。
