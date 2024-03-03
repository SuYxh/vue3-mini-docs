import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/framework-design/": [
    {
      text: "命令式编程",
      link: "/framework-design/2-编程范式之命令式编程.md",
    },
    {
      text: "声明式编程",
      link: "/framework-design/3-编程范式之声明式编程.md",
    },
    {
      text: "命令式VS声明式",
      link: "/framework-design/4-命令式VS声明式.md",
    },
    {
      text: "企业应用的开发与设计原则",
      link: "/framework-design/5-企业应用的开发与设计原则.md",
    },
    {
      text: "为什么说框架的设计过程其实是一个不断取舍的过程",
      link: "/framework-design/6-为什么说框架的设计过程其实是一个不断取舍的过程.md",
    },
    {
      text: "vue中的html是真实的html吗",
      link: "/framework-design/7-vue中的html是真实的html吗.md",
    },
    {
      text: "什么是运行时",
      link: "/framework-design/8-什么是运行时.md",
    },
    {
      text: "什么是编译时",
      link: "/framework-design/9-什么是编译时.md",
    },
    {
      text: "运行时+编译时",
      link: "/framework-design/10-运行时+编译时.md",
    },
    {
      text: "什么是副作用",
      link: "/framework-design/11-什么是副作用.md",
    },
    {
      text: "Vue3框架设计概述",
      link: "/framework-design/12-Vue3框架设计概述.md",
    },
    {
      text: "良好的TypeScript支持",
      link: "/framework-design/13-良好的TypeScript支持.md",
    },
  ],
  "/project-construction/": [
    {
      text: "Vue3源码设计大解析",
      link: "/project-construction/02-Vue3源码设计大解析.md",
    },
    {
      text: "在Vue源码中运行测试实例",
      link: "/project-construction/03-在Vue源码中运行测试实例.md",
    },
    {
      text: "开启SourceMap",
      link: "/project-construction/04-开启SourceMap.md",
    },
    {
      text: "针对源码进行debugger",
      link: "/project-construction/05-针对源码进行debugger.md",
    },
    {
      text: "如何阅读源码",
      link: "/project-construction/06-如何阅读源码.md",
    },
    {
      text: "搭建自己的框架",
      link: "/project-construction/07-搭建自己的框架.md",
    },
    {
      text: "配置ts",
      link: "/project-construction/08-配置ts.md",
    },
    {
      text: "引入代码格式化工具Prettier",
      link: "/project-construction/09-引入代码格式化工具Prettier.md",
    },
    {
      text: "配置Rollup",
      link: "/project-construction/10-配置Rollup.md",
    },
    {
      text: "配置路径映射",
      link: "/project-construction/11-配置路径映射.md",
    },
  ],
  "/reactivity/": [
    {
      text: "响应式API",
      items: [
        { text: "JS的程序性", link: "/reactivity/响应式API/02-JS的程序性.md" },
        {
          text: "如何让程序变得更加聪明",
          link: "/reactivity/响应式API/03-如何让程序变得更加聪明.md",
        },
        {
          text: "Object.defineProperty",
          link: "/reactivity/响应式API/04-ObjectdefineProperty.md",
        },
        {
          text: "Object.defineProperty缺陷",
          link: "/reactivity/响应式API/05-ObjectdefineProperty在设计层的缺陷.md",
        },
        { text: "Proxy", link: "/reactivity/响应式API/06-Proxy.md" },
        { text: "Reflect", link: "/reactivity/响应式API/07-Reflect.md" },
      ],
    },
    {
      text: "reactive",
      collapsed: true,
      items: [
        {
          text: "源码阅读",
          link: "/reactivity/reactive/02-源码阅读reactive的响应性.md",
        },
        {
          text: "构建reactive函数",
          link: "/reactivity/reactive/03-构建reactive函数.md",
        },
        {
          text: "Map与WeakMap",
          link: "/reactivity/reactive/04-Map与WeakMap.md",
        },
        {
          text: "实现createGetter和createSetter",
          link: "/reactivity/reactive/05-实现createGetter和createSetter.md",
        },
        { text: "配置热更新", link: "/reactivity/reactive/06-配置热更新.md" },
        {
          text: "构建effect函数",
          link: "/reactivity/reactive/07-构建effect函数.md",
        },
        {
          text: "track和trigger分析",
          link: "/reactivity/reactive/08-track和trigger分析.md",
        },
        { text: "实现track", link: "/reactivity/reactive/09-实现track.md" },
        {
          text: "10-实现trigger",
          link: "/reactivity/reactive/10-实现trigger.md",
        },
        {
          text: "单一依赖的reactive",
          link: "/reactivity/reactive/11-单一依赖的reactive.md",
        },
        {
          text: "响应数据对应多个effect",
          link: "/reactivity/reactive/12-响应数据对应多个effect.md",
        },
        { text: "构建Dep模块", link: "/reactivity/reactive/13-构建Dep模块.md" },
        {
          text: "reactive函数的局限性",
          link: "/reactivity/reactive/14-reactive函数的局限性.md",
        },
        { text: "总结", link: "/reactivity/reactive/15-总结.md" },
      ],
    },
    {
      text: "ref",
      collapsed: true,
      items: [
        { text: "源码阅读", link: "/reactivity/ref/02-源码阅读.md" },
        { text: "实现ref函数", link: "/reactivity/ref/03-实现ref函数.md" },
        {
          text: "ref复杂数据类型的响应性",
          link: "/reactivity/ref/04-ref复杂数据类型的响应性.md",
        },
        {
          text: "源码阅读-ref简单数据类型的响应性",
          link: "/reactivity/ref/05-源码阅读-ref简单数据类型的响应性.md",
        },
        {
          text: "ref简单数据类型的响应性",
          link: "/reactivity/ref/06-ref函数-构建简单数据类型的响应性.md",
        },
        {
          text: "ref小结",
          link: "/reactivity/ref/07-总结-ref简单数据类型响应性.md",
        },
        { text: "总结", link: "/reactivity/ref/08-总结.md" },
      ],
    },

    {
      text: "computed",
      collapsed: true,
      items: [
        {
          text: "源码阅读",
          link: "/reactivity/computed/02-computed源码阅读.md",
        },
        {
          text: "构建ComputedRefImpl",
          link: "/reactivity/computed/03-构建ComputedRefImpl.md",
        },
        {
          text: "处理脏的状态",
          link: "/reactivity/computed/04-初见调度器-处理脏的状态.md",
        },
        { text: "实现缓存", link: "/reactivity/computed/05-computed缓存性.md" },
        { text: "总结", link: "/reactivity/computed/06-总结-computed.md" },
      ],
    },

    {
      text: "watch",
      collapsed: true,
      items: [
        { text: "源码阅读", link: "/reactivity/watch/07-源码阅读watch.md" },
        {
          text: "深入scheduler调度系统实现机制",
          link: "/reactivity/watch/08-深入scheduler调度系统实现机制.md",
        },
        {
          text: "初步实现watch",
          link: "/reactivity/watch/09-初步实现watch.md",
        },
        {
          text: "分析watch的依赖收集原则",
          link: "/reactivity/watch/10-分析watch的依赖收集原则.md",
        },
        {
          text: "完成watch数据监听器的依赖收集",
          link: "/reactivity/watch/11-完成watch数据监听器的依赖收集.md",
        },
        { text: "watch小结", link: "/reactivity/watch/12-watch总结.md" },
        { text: "总结", link: "/reactivity/watch/13-总结.md" },
      ],
    },
  ],
};
