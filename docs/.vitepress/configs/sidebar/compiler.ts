export default [
  {
    text: "设计原则",
    items: [
      { text: "简介", link: "/compiler/设计原则/index.md" },
      {
        text: "模板编译的核心流程",
        link: "/compiler/设计原则/1-模板编译的核心流程.md",
      },

      {
        text: "抽象语法树-AST",
        link: "/compiler/设计原则/2-抽象语法树-AST.md",
      },
      {
        text: "AST转化",
        link: "/compiler/设计原则/3-AST转化.md",
      },
      {
        text: "生成render函数",
        link: "/compiler/设计原则/4-生成render函数.md",
      },
      {
        text: "小结",
        link: "/compiler/设计原则/5-小结.md",
      },
    ],
  },

  {
    text: "构建compile",
    items: [
      { text: "简介", link: "/compiler/构建compile/index.md" },
      {
        text: "构建parse方法",
        link: "/compiler/构建compile/1-构建parse方法.md",
      },

      {
        text: "构建有限自动状态机",
        link: "/compiler/构建compile/2-构建有限自动状态机-AST.md",
      },
      {
        text: "生成AST",
        link: "/compiler/构建compile/3-生成AST.md",
      },
      {
        text: "转化策略和注意事项",
        link: "/compiler/构建compile/4-转化策略和注意事项.md",
      },
      {
        text: "转化JavaScript-AST",
        link: "/compiler/构建compile/5-转化JavaScript-AST.md",
      },
      {
        text: "构建transformXXX方法",
        link: "/compiler/构建compile/6-构建transformXXX方法.md",
      },

      {
        text: "处理根节点的转化",
        link: "/compiler/构建compile/7-处理根节点的转化-AST.md",
      },
      {
        text: "render函数的生成方案",
        link: "/compiler/构建compile/8-render函数的生成方案.md",
      },
      {
        text: "构建CodegenContext上下文对象",
        link: "/compiler/构建compile/9-构建CodegenContext上下文对象.md",
      },
      {
        text: "解析JavaScript-AST-拼接render函数",
        link: "/compiler/构建compile/10-解析JavaScript-AST-拼接render函数.md",
      },
      {
        text: "把render转化为function",
        link: "/compiler/构建compile/11-把render转化为function.md",
      },
      {
        text: "总结",
        link: "/compiler/构建compile/12-总结.md",
      },
    ],
  },
];
