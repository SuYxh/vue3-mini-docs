## ELEMENT 节点下，style 属性的挂载和更新

直接实现对应的 `patchStyle` 函数。

1. 在 `packages/runtime-dom/src/patchProp.ts` 中，处理 `style` 情况：

```typescript
/**
 * 为 prop 进行打补丁操作
 */
export const patchProp = (el, key, prevValue, nextValue) => {
  ......
  else if (key === 'style') {
    // style
    patchStyle(el, prevValue, nextValue);
  }
  ......
};
```

2. 在 `packages/runtime-dom/src/modules/style.ts` 中，新建 `patchStyle` 方法：

```typescript
/**
 * 为 style 属性进行打补丁
 */
export function patchStyle(el: Element, prev, next) {
  // 获取 style 对象
  const style = (el as HTMLElement).style;
  // 判断新的样式是否为纯字符串
  const isCssString = isString(next);

  if (next && !isCssString) {
    // 赋值新样式
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    // 清理旧样式
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  }
}

/**
 * 赋值样式
 */
function setStyle(
  style: CSSStyleDeclaration,
  name: string,
  val: string | string[]
) {
  style[name] = val;
}
```

代码完成。

创建测试实例 `packages/vue/examples/runtime/render-element-style.html`：

```html
<script>
  const { h, render } = Vue;
  const vnode = h("div", { style: { color: "red" } }, "你好，世界");

  // 挂载
  render(vnode, document.querySelector("#app"));

  setTimeout(() => {
    const vnode2 = h("div", { style: { fontSize: "32px" } }, "你好，世界");
    // 挂载
    render(vnode2, document.querySelector("#app"));
  }, 2000);
</script>
```

`style` 挂载和更新处理完成。
