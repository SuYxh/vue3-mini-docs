## composition API ，setup 函数挂载逻辑

明确好了 `setup` 函数的渲染逻辑之后，那么下面我们就可以进行对应的实现了。

1. 在 `packages/runtime-core/src/component.ts` 模块的 `setupStatefulComponent` 方法中，增加 `setup` 判定:

```typescript
function setupStatefulComponent(instance) {
  const Component = instance.type;
  const { setup } = Component;
  // 存在 setup ，则直接获取 setup 函数的返回值即可
  if (setup) {
    const setupResult = setup();
    handleSetupResult(instance, setupResult);
  } else {
    // 获取组件实例
    finishComponentSetup(instance);
  }
}
```

2. 创建 `handleSetupResult` 方法:

```typescript
export function handleSetupResult(instance, setupResult) {
  // 存在 setupResult，并且它是一个函数，则 setupResult 就是需要渲染的 render
  if (isFunction(setupResult)) {
    instance.render = setupResult;
  }
  finishComponentSetup(instance);
}
```

3. 在 `finishComponentSetup` 中，如果已经存在 `render`，则不需要重新赋值:

```typescript
export function finishComponentSetup(instance) {
  const Component = instance.type;
  // 组件不存在 render 时，才需要重新赋值
  if (!instance.render) {
    instance.render = Component.render;
  }
  // 改变 options 中的 this 指向
  applyOptions(instance);
}
```

至此，代码完成。

创建对应测试实例 `packages/vue/examples/runtime/render-component-setup.html` :

```html
<script>
  const { reactive, h, render } = Vue;

  const component = {
    setup() {
      const obj = reactive({ name: "张三" });

      setTimeout(() => {
        obj.name = "李四";
      }, 2000);

      return () => h("div", obj.name);
    },
  };

  const vnode = h(component);
  // 挂载
  render(vnode, document.querySelector("#app"));
</script>
```

挂载和更新都可成功。
