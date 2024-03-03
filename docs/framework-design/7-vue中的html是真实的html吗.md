## 7-.vue 中的 html 是真实的 html 吗？

我们首先需要先思考一个问题：**在 .vue 文件的 template 中写入的 html 是真实的 html 标签节点吗？**

答案是：不是的！

原因非常简单，如果我们写入的是真实 `html` 节点，对于 `v-if、v-bind、keep-alive` 这些东西，浏览器明显是 **不认识** 的，所以这些东西理应无法解析。

但是现实是这些指令或组件被正确解析了，所以 **vue 一定在中间做了什么**，让 **假的 html 标签节点** 被渲染成了 **真实的 html 标签节点**。

那么 `Vue` 在中间做了什么事情呢？

简单来说可以分成两件事（排序按执行顺序）：

1. 编译时：`compiler`
2. 运行时：`runtime`

这两个东西对于大家而言，可能比较陌生，但是在 [Vue 官网](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#runtime-vs-compile-time-reactivity) 中早就提到了这几个概念。

这些概念一共有三个，如果我们想要学习 `Vue` 的框架设计，那么必须要了解它们，它们分别是：

1. 运行时：`runtime`
2. 编译时：`compiler`
3. 运行时 + 编译时：`runtime + compiler`

这些概念并不是在 `Vue` 中才存在的概念，而是早就存在的。

那么这些东西分别是什么意思呢？
