# Vue3-Mini-Docs

vue3 源码学习， 打造自己的 vue3 [![github](https://qn.huat.xyz/mac/202403031320043)](https://github.com/SuYxh/mini-vue3)

掌握 Vue 源码设计思想，彻底掌握响应系统、运行时、编译器三大模块，由内到外吃透 Vue！

### 项目地址

vue3-mini： https://github.com/SuYxh/vue3-mini

Vue3-mini-docs： https://github.com/SuYxh/vue3-mini-docs

### Vue3 框架设计

- 命令式编程、声明式编程配置
- 运行时、编译时
- Vue3 源码 TypeScript 配置方案
- Vue3 源码调试方案（sourceMap 、 热更新）
- Vue3 源码代码标准处理
- 模块打包器 rollup

### Reactivity 响应性

- Vue2 响应性设计及缺陷 ·
- 响应性 API （reactive 、 ref）
- 计算属性与侦听器（computed 、 watch）
- 依赖处理与代理监听（WeakMap 、 Dep 、 track 、 trigger 、 effect）
- Vue3 全新响应性 API（Proxy、Reflect）
- 调度系统（lazy 、 dirty 、 scheduler）

### Runtime 运行时

- 虚拟节点树（VNode 、 h 函数）
- 渲染器与渲染函数 （Element、Text、comment、Fragment......等 挂载、更新、打补丁）
- 属性处理（class 与 style 的增强处理、vei 事件更新、HTML Attributes 、 DOM Properties）
- 组件构建（状态组件、生命周期钩子、组件的响应性
- composition API
- diff 算法（最长递增子序列 、 五大场景的详细解析）

### Compiler 编辑器

- 编辑器处理流程（编译前端、编译后端）
- 有限自动状态机
- parse（抽象语法树 AST）
- transform （JavaScript AST）
- generate （目标代码生成）
- 深入编辑器（编辑器的响应性、多层级渲染、指令处理）
