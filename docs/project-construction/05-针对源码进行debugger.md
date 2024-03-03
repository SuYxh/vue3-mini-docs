## 05-针对源码进行 debugger

此时我们已经成功的开启了 `SourceMap` ，那么开启了 `sourceMap` 之后有什么改变呢？

此时我们在来看刚才启动的项目。

在刚才启动的项目中，按 `F12` 打开控制台，进入 `Sources` 模块，此时可以看到如下内容：

![图片描述](https://qn.huat.xyz/mac/202403021813816.jpg)

其中左侧所展示的，就是当前使用到的 `vue` 源代码。

那么我们知道此时我们是使用了 `reactive` 方法声明的响应式数据，`reactive` 方法对应的代码位置在 `packages/reactivity/src/reactive.ts` 中第 `90` 行：

![图片描述](https://qn.huat.xyz/mac/202403021813908.jpg)

那么此时我们就可以在这里打上一个断点，来跟踪整个 `reactive` 的代码执行逻辑。

刷新页面，可以看到，此时代码已经进入了 `debugger`

![图片描述](https://qn.huat.xyz/mac/202403021813378.jpg)

那么这样我们就已经成功的为 `vue` 的测试实例开启了 `debugger` 功能，后续我们的开发之中，就可以利用这样的方式，来跟踪并查看 `vue` 源码的执行逻辑。

想要对 `vue` 代码执行 `debugger` 那么共分为以下步骤：

1. 下载 `vue` 源代码（注意：**直接下载 `ZIP` 文件会导致 `build` 出错**）
2. 为源代码开启 `sourcemap`，以方便后续进行 `debugger`
3. 在 `packages/vue/examples` 中，创建文件，导入 `../../dist/vue.global.js` ，书写测试实例
4. 通过 `Live Server` 启动服务
5. 在浏览器控制台的 `Sources` 中查看运行代码，并进行 `debugger`
