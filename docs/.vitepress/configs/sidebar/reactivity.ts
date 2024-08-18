export default [
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
];
