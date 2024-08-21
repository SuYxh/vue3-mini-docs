export default [
  {
    text: "h函数",
    items: [
      { text: "简介", link: "/runtime/h/index.md" },
      {
        text: "源码阅读-h函数",
        link: "/runtime/h/1-源码阅读-h函数.md",
      },
      {
        text: "构建h函数-处理ELEMENT+TEXT_CHILDREN",
        link: "/runtime/h/2-构建h函数-处理ELEMENT+TEXT_CHILDREN场景.md",
      },
      {
        text: "源码阅读-ELEMENT+ARRAY_CHILDREN",
        link: "/runtime/h/3-源码阅读-ELEMENT+ARRAY_CHILDREN.md",
      },
      {
        text: "处理ELEMENT+ARRAY_CHILDREN",
        link: "/runtime/h/4-构建h函数-处理ELEMENT+ARRAY_CHILDREN场景.md",
      },
      {
        text: "源码阅读-组件的本质与对应的VNode",
        link: "/runtime/h/5-源码阅读-h函数-组件的本质与对应的VNode.md",
      },
      {
        text: "实现组件的VNode",
        link: "/runtime/h/6-框架实现-处理组件的VNode.md",
      },
      {
        text: "源码阅读-Text-Comment-Fragment",
        link: "/runtime/h/7-源码阅读-h函数-跟踪Text-Comment-Fragment场景.md",
      },
      {
        text: "实现剩Text-Comment-Fragment",
        link: "/runtime/h/8-框架实现-实现剩余场景Text-Comment-Fragment.md",
      },
      {
        text: "源码阅读-class和style的增强处理",
        link: "/runtime/h/9-源码阅读-对class和style的增强处理.md",
      },
      {
        text: "实现class和style的增强",
        link: "/runtime/h/10-框架实现-完成class和style的增强.md",
      },
    ],
  },
  {
    text: "渲染器",
    items: [
      { text: "简介", link: "/runtime/renderer/index.md" },
      {
        text: "构建renderer",
        link: "/runtime/renderer/1-构建renderer基本架构.md",
      },
      {
        text: "完成 ELEMENT 节点挂载",
        link: "/runtime/renderer/2-基于renderer完成ELEMENT节点挂载.md",
      },
      {
        text: "合并渲染架构",
        link: "/runtime/renderer/3-合并渲染架构.md",
      },
      {
        text: "实现ELEMENT节点的更新",
        link: "/runtime/renderer/4-实现ELEMENT节点的更新.md",
      },
      {
        text: "处理不同元素的新旧节点",
        link: "/runtime/renderer/5-处理新旧节点不同元素时ELEMENT节点的更新操作.md",
      },
      {
        text: "ELEMENT节点的卸载操作",
        link: "/runtime/renderer/6-删除元素-ELEMENT节点的卸载操作.md",
      },

      {
        text: "深入属性挂载",
        link: "/runtime/renderer/7-深入属性挂载.md",
      },
      {
        text: "区分属性挂载",
        link: "/runtime/renderer/8-区分处理ELEMENT节点的各种属性挂载.md",
      },
      {
        text: "style属性的挂载和更新",
        link: "/runtime/renderer/9-style属性的挂载和更新.md",
      },
      {
        text: "深入事件更新",
        link: "/runtime/renderer/10-深入事件更新.md",
      },
      {
        text: "事件的挂载和更新",
        link: "/runtime/renderer/11-事件的挂载和更新.md",
      },
      {
        text: "Text节点的挂载更新",
        link: "/runtime/renderer/12-Text节点的挂载-更新行为.md",
      },
      {
        text: "Comment节点的挂载",
        link: "/runtime/renderer/13-Comment节点的挂载行为.md",
      },
      {
        text: "Fragment节点的挂载更新",
        link: "/runtime/renderer/14-Fragment节点的挂载更新行为.md",
      },
    ],
  },
  {
    text: "组件化",
    items: [
      { text: "简介", link: "/runtime/组件/index.md" },
      {
        text: "无状态组件挂载",
        link: "/runtime/组件/1-完成无状态基础组件的挂载逻辑.md",
      },

      {
        text: "有状态组件挂载",
        link: "/runtime/组件/2-有状态的响应性组件挂载逻辑.md",
      },
      {
        text: "组件生命周期",
        link: "/runtime/组件/3-组件生命周期回调处理逻辑.md",
      },
      {
        text: "生命周期访问响应性数据",
        link: "/runtime/组件/4-生命回调钩子中访问响应性数据.md",
      },
      {
        text: "组件响应性变化",
        link: "/runtime/组件/5-响应性数据改变触发组件的响应性变化.md",
      },
      {
        text: "setup函数挂载逻辑",
        link: "/runtime/组件/6-setup函数挂载逻辑.md",
      },
    ],
  },
];
