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
};
