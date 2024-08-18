### 源码阅读: h 函数，跟踪 ELEMENT + ARRAY_CHILDREN 场景下的源码实现

之前处理了 h 函数下比较简单的场景: `Element + Text Children`。现在来看看 `Element + Array Children` 的场景。

#### 测试实例

我们先来看测试实例 `packages/vue/examples/imooc/runtime/h-element-ArrayChildren.html`：

```html
<script>
  const { h } = Vue;
  const vnode = h("div", { class: "test" }, [
    h("p", "p1"),
    h("p", "p2"),
    h("p", "p3"),
  ]);
  console.log(vnode);
</script>
```

最终打印为（剔除无用的）：

```json
{
  "__v_isVNode": true,
  "type": "div",
  "props": { "class": "test" },
  "children": [
    {
      "__v_isVNode": true,
      "type": "p",
      "children": "p1",
      "shapeFlag": 9
    },
    {
      "__v_isVNode": true,
      "type": "p",
      "children": "p2",
      "shapeFlag": 9
    },
    {
      "__v_isVNode": true,
      "type": "p",
      "children": "p3",
      "shapeFlag": 9
    }
  ],
  "shapeFlag": 17
}
```

通过以上的打印其实我们可以看出存在一些不同的地方：

1. `children` 为数组
2. `shapeFlag` 为 17

而这两点，也是 h 函数处理这种场景下，最不同的地方。

#### 跟踪源码

那么我们就跟踪源码，来看一下这次 h 函数的执行逻辑，由测试案例可知，我们一共触发了 4 次 h 函数：

1、第一次触发 h 函数：

```js
h("p", "p1");
```

2、进入 `_createVNode` 方法，此时的参数为：

![image-20240818190950587](https://qn.huat.xyz/mac/202408181909109.png)

3、触发 `createBaseVNode` 时，`shapeFlag = 1`

- 进入 `createBaseVNode`
- 触发 `normalizeChildren(vnode, children)`

  - 进入 `normalizeChildren`
  - 进入 `else`，执行 `type = ShapeFlags.TEXT_CHILDREN`，此时 `type = 8`
  - 最后执行 `vnode.shapeFlag |= type`，得到 `vnode.shapeFlag = 9`

- 以上整体流程

接下来是 **第二次、第三次** 触发 h 函数，这两次触发代码流程与第一次相同，我们可以跳过

1、**第四次触发 h 函数**：

```typescript
const { h } = Vue;
const vnode = h("div", { class: "test" }, [
  h("p", "p1"),
  h("p", "p2"),
  h("p", "p3"),
]);
console.log(vnode);
```

2、此时进入到 `_createVNode` 时的参数为：

![image-20240818191317813](https://qn.huat.xyz/mac/202408181913832.png)

- 展开 `children` 数据为解析完成之后的 vnode：

  ```typescript
  [
    {
      __v_isVNode: true,
      type: "p",
      children: "p1",
      shapeFlag: 9,
    },
    {
      __v_isVNode: true,
      type: "p",
      children: "p2",
      shapeFlag: 9,
    },
    {
      __v_isVNode: true,
      type: "p",
      children: "p3",
      shapeFlag: 9,
    },
  ];
  ```

3、代码继续，计算 `shapeFlag = 1`

- 进入 `createBaseVNode`
- 执行 `normalizeChildren(vnode, children)`：
  - 进入 `normalizeChildren`
  - 因为当前 `children = Array`，所以代码会进入到 `else if (isArray(children))`
  - 执行 `type = ShapeFlags.ARRAY_CHILDREN`，即：`type = 16`
  - 接下来执行 `vnode.shapeFlag |= type`
    - 此时 `vnode.shapeFlag = 1`，转化为二进制：`00000001`
    - 此时 `type = 16`，转化为二进制：`00010000`
    - 所以最终 `|=` 之后的二进制为：`00010001`
    - 转化为 10 进制为 17

代码执行结束。

由以上代码可知，当我们处理 `ELEMENT + ARRAY_CHILDREN` 场景时：

1. 整体的逻辑并没有变得复杂
2. 第一次计算 `shapeFlag`，依然为 `Element`
3. 第二次计算 `shapeFlag`，因为 `children` 为 `Array`，所以会进入 `else if (array)` 判断
