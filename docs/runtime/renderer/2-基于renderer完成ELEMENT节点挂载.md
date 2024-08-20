## 基于 renderer 完成 ELEMENT 节点挂载

根据源码我们知道 Element 的挂载主要依赖于 processElement 方法，所以我们可以直接构建该方法。

1. 在 `packages/runtime-core/src/renderer.ts` 中，创建 `processElement` 方法:

```typescript
/**
 * Element 的打补丁操作
 */
const processElement = (oldVNode, newVNode, container, anchor) => {
  if (oldVNode == null) {
    // 挂载操作
    mountElement(newVNode, container, anchor);
  } else {
    // TODO: 更新操作
  }
};

/**
 * element 的挂载操作
 */
const mountElement = (vnode, container, anchor) => {
  const { type, props, shapeFlag } = vnode;

  // 创建 element
  const el = (vnode.el = hostCreateElement(type));

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 设置 文本子节点
    hostSetElementText(el, vnode.children as string);
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // TODO: 设置 Array 子节点
  }

  // 处理 props
  if (props) {
    // 遍历 props 对象
    for (const key in props) {
      hostPatchProp(el, key, null, props[key]);
    }
  }

  // 插入 el 到指定的位置
  hostInsert(el, container, anchor);
};

const patch = (oldVNode, newVNode, container, anchor = null) => {
  if (oldVNode === newVNode) {
    return;
  }

  const { type, shapeFlag } = newVNode;
  switch (type) {
    case Text:
      // TODO: Text
      break;
    case Comment:
      // TODO: Comment
      break;
    case Fragment:
      // TODO: Fragment
      break;
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(oldVNode, newVNode, container, anchor);
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        // TODO: 组件
      }
  }
};
```

根据源码的逻辑，我们在这里主要做了五件事情:

1. 区分挂载、更新
2. 创建 Element
3. 设置 text
4. 设置 class
5. 插入 DOM 树
