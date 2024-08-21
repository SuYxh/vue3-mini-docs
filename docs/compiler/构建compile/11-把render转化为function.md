## 新建 compat 模块，把 render 转化为 function

此时，我们的 `render` 函数构建，已经可以完成了。但是我们当前的 `render` 本质上还是一个 **字符串** ，所以我们需要通过 `new Function` 来把它变为函数。

那么这样的一个 `new Function` 的过程，我们其实可以在 `vue` 中完成。

1. 创建 `packages/vue-compat/src/index.ts` 模块

2. 新增 `compileToFunction` 方法：

   ```ts
   import { compile } from "@vue/compiler-dom";

   function compileToFunction(template, options?) {
     const { code } = compile(template, options);

     const render = new Function(code)();

     return render;
   }

   export { compileToFunction as compile };
   ```

3. 在 `packages/vue/src/index.ts` 中修改 `compile` 的导出：

   ```ts
   // export { compile } from '@vue/compiler-dom'
   export { compile } from "@vue/vue-compat";
   ```

4. 修改测试实例：

   ```html
   <script>
     const { compile, h, render } = Vue;
     // 创建 template
     const template = `<div> hello world </div>`;

     // 生成 render 函数
     const renderFn = compile(template);

     // 创建组件
     const component = {
       render: renderFn,
     };

     // 通过 h 函数，生成 vnode
     const vnode = h(component);

     // 通过 render 函数渲染组件
     render(vnode, document.querySelector("#app"));
   </script>
   ```

至此，`compile` 处理完成。
