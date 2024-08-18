### 源码阅读: h 函数，组件的本质与对应的 VNode

组件是 Vue 中非常重要的一个概念。我们将探讨组件生成 VNode 的情况。在 Vue 中，组件本质上是**一个对象或一个函数**（Function Component）。

我们可以直接利用 `h` 函数 + `render` 函数渲染出一个基本的组件：

1、创建 `packages/vue/examples/runtime/h-component.html`

```html
<script>
  const { h, render } = Vue;

  const component = {
    render() {
      const vnode1 = h("div", "这是一个 component");
      console.log(vnode1);
      return vnode1;
    },
  };

  const vnode2 = h(component);
  console.log(vnode2);
  render(vnode2, document.querySelector("#app"));
</script>
```

2、在当前代码中共触发了两次 `h` 函数，我们来查看两次打印的结果：

- **vnode2**:

  ![image-20240818192951362](https://qn.huat.xyz/mac/202408181929391.png)

  - **shapeFlag**: 这个是当前的类型表示，4 表示为一个组件
  - **type: 是一个对象，它的值包含了一个 render 函数，这个就是 component 的真实渲染内容**
  - **\_\_v_isVNode: VNode 标记**

- **vnode1**: 与 ELEMENT + TEXT_CHILDREN 相同

  ```js
  {
    __v_isVNode: true,
    type: "div",
    children: "这是一个 component",
    shapeFlag: 9
  }
  ```

那么由此可知，对于组件而言，它的一个渲染，与之前不同的地方主要有两个：

1. **shapeFlag === 4**
2. **type: 是一个对象（组件实例），并且包含 render 函数**

仅此而已，那么依据这样的概念，我们可以通过如下代码，完成同样的渲染：

```javascript
const component = {
  render() {
    return {
      __v_isVNode: true,
      type: "div",
      children: "这是一个 component",
      shapeFlag: 9,
    };
  },
};

render(
  {
    __v_isVNode: true,
    type: component,
    shapeFlag: 4,
  },
  document.querySelector("#app")
);
```
