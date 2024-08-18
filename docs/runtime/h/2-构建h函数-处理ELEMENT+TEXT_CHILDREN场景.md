### 构建 h 函数-处理 ELEMENT + TEXT_CHILDREN 场景

#### 1. 创建 `packages/shared/src/shapeFlags.ts`

首先，我们需要定义所有的类型标识符。

```typescript
export const enum ShapeFlags {
  /**
   * type = Element
   */
  ELEMENT = 1,
  /**
   * 函数组件
   */
  FUNCTIONAL_COMPONENT = 1 << 1,
  /**
   * 有状态(响应数据)组件
   */
  STATEFUL_COMPONENT = 1 << 2,
  /**
   * children = Text
   */
  TEXT_CHILDREN = 1 << 3,
  /**
   * children = Array
   */
  ARRAY_CHILDREN = 1 << 4,
  /**
   * children = slot
   */
  SLOTS_CHILDREN = 1 << 5,
  /**
   * 组件:有状态(响应数据)组件 | 函数组件
   */
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}
```

#### 2. 创建 `packages/runtime-core/src/h.ts`

接下来，我们构建 `h` 函数。

```typescript
import { isArray, isObject } from "@vue/shared";
import { createVNode, isVNode, VNode } from "./vnode";

export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  // 获取用户传递的参数数量
  const l = arguments.length;

  // 如果用户只传递了两个参数，那么证明第二个参数可能是 props , 也可能是 children
  if (l === 2) {
    // 如果 第二个参数是对象，但不是数组。则第二个参数只有两种可能性:1. VNode 2.普通的 props
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // 如果是 VNode，则 第二个参数代表了 children
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      // 如果不是 VNode， 则第二个参数代表了 props
      return createVNode(type, propsOrChildren);
    }
    // 如果第二个参数不是单纯的 object，则 第二个参数代表了 props
    else {
      return createVNode(type, null, propsOrChildren);
    }
  }
  // 如果用户传递了三个或以上的参数，那么证明第二个参数一定代表了 props
  else {
    // 如果参数在三个以上，则从第二个参数开始，把后续所有参数都作为 children
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    }
    // 如果传递的参数只有三个，则 children 是单纯的 children
    else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    // 触发 createVNode 方法，创建 VNode 实例
    return createVNode(type, propsOrChildren, children);
  }
}
```

#### 3. 创建 `packages/runtime-core/src/vnode.ts`

我们需要处理 `VNode` 类型和 `isVNode` 函数。

```typescript
export interface VNode {
  __v_isVNode: true;
  type: any;
  props: any;
  children: any;
  shapeFlag: number;
}

export function isVNode(value: any): value is VNode {
  return value ? value.__v_isVNode === true : false;
}
```

#### 4. 在 `packages/runtime-core/src/vnode.ts` 中，构建 `createVNode` 函数

```typescript
import { ShapeFlags } from "@vue/shared";

/**
 * 生成一个 VNode 对象，并返回
 * @param type vnode.type
 * @param props 标签属性或自定义属性
 * @param children 子节点
 * @returns vnode 对象
 */
export function createVNode(type, props, children): VNode {
  // 通过 bit 位处理 shapeFlag 类型
  const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;
  return createBaseVNode(type, props, children, shapeFlag);
}

/**
 * 构建基础 vnode
 */
function createBaseVNode(type, props, children, shapeFlag) {
  const vnode = {
    __v_isVNode: true,
    type,
    props,
    shapeFlag,
  } as VNode;

  normalizeChildren(vnode, children);

  return vnode;
}

export function normalizeChildren(vnode: VNode, children: unknown) {
  let type = 0;
  const { shapeFlag } = vnode;

  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    // TODO: array
  } else if (typeof children === "object") {
    // TODO: object
  } else if (isFunction(children)) {
    // TODO: function
  } else {
    // children 为 string
    children = String(children);
    // 为 type 指定 Flags
    type = ShapeFlags.TEXT_CHILDREN;
  }

  // 修改 vnode 的 children
  vnode.children = children;
  // 按位或赋值
  vnode.shapeFlag |= type;
}
```

#### 5. 在 `index` 中导出 `h` 函数

至此，`h` 函数创建完成。

#### 创建测试实例

我们可以创建对应的测试实例 `packages/vue/examples/runtime/h-element.html`。

```html
<script>
  const { h } = Vue;
  const vnode = h("div", { class: "test" }, "hello render");
  console.log(vnode);
</script>
```

最终打印的结果为:

```typescript
{
  __v_isVNode: true,
  type: "div",
  props: { class: 'test' },
  children: "hello render",
  shapeFlag: 9 // 表示为 Element | ShapeFlags.TEXT_CHILDREN 的值
}
```

至此，我们就已经构建好了: `type = Element`，`children = Text` 的 `VNode` 对象。
