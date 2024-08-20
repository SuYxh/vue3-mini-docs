## 区分处理 ELEMENT 节点的各种属性挂载

那么下面我们就可以着手实现对应的逻辑了。

1. 在 `packages/runtime-dom/src/patchProp.ts` 中，增加新的判断条件：

```typescript
export const patchProp = (el, key, prevValue, nextValue) => {
  ...
  else if (shouldSetAsProp(el, key)) {
    // 通过 DOM Properties 指定
    patchDOMProp(el, key, nextValue);
  } else {
    // 其他属性
    patchAttr(el, key, nextValue);
  }
};
```

2. 在 `packages/runtime-dom/src/patchProp.ts` 中，创建 `shouldSetAsProp` 方法：

```typescript
/**
 * 判断指定元素的指定属性是否可以通过 DOM Properties 指定
 */
function shouldSetAsProp(el: Element, key: string) {
  // #1787, #2840 表单元素的表单属性是只读的，必须设置为属性 attribute
  if (key === "form") {
    return false;
  }
  // #1526 <input list> 必须设置为属性 attribute
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  // #2766 <textarea type> 必须设置为属性 attribute
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  return key in el;
}
```

3. 在 `packages/runtime-dom/src/modules/props.ts` 中，增加 `patchDOMProp` 方法：

```typescript
/**
 * 通过 DOM Properties 指定属性
 */
export function patchDOMProp(el: any, key: string, value: any) {
  try {
    el[key] = value;
  } catch (e: any) {}
}
```

4. 在 `packages/runtime-dom/src/modules/attrs.ts` 中，增加 `patchAttr` 方法：

```typescript
/**
 * 通过 setAttribute 设置属性
 */
export function patchAttr(el: Element, key: string, value: any) {
  if (value == null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, value);
  }
}
```

至此，代码完成。

创建测试实例 `packages/vue/examples/runtime/render-element-props.html`：

```html
<script>
  const { h, render } = Vue;
  const vnode = h("textarea", {
    class: "test-class",
    value: "textarea value",
    type: "text",
  });

  // 挂载
  render(vnode, document.querySelector("#app"));
</script>
```

测试渲染成功。
