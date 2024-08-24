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

  {
    text: "深入编辑器",
    items: [
      { text: "简介", link: "/compiler/深入编辑器/index.md" },
      {
        text: "响应性数据的处理逻辑",
        link: "/compiler/深入编辑器/1-响应性数据的处理逻辑.md",
      },

      {
        text: "AST解析逻辑",
        link: "/compiler/深入编辑器/2-AST解析逻辑.md",
      },
      {
        text: "AST转化逻辑",
        link: "/compiler/深入编辑器/3-JavaScript-AST转化逻辑.md",
      },
      {
        text: "render转化逻辑分析",
        link: "/compiler/深入编辑器/4-render转化逻辑分析.md",
      },
      {
        text: "generate生成render函数",
        link: "/compiler/深入编辑器/5-generate生成render函数.md",
      },

      {
        text: "render函数的执行处理",
        link: "/compiler/深入编辑器/6-render函数的执行处理.md",
      },

      {
        text: "多层级的处理逻辑",
        link: "/compiler/深入编辑器/7-多层级的处理逻辑.md",
      },
      {
        text: "指令解析的整体逻辑",
        link: "/compiler/深入编辑器/8-指令解析的整体逻辑.md",
      },
      {
        text: "AST解析逻辑",
        link: "/compiler/深入编辑器/9-AST解析逻辑.md",
      },
      {
        text: "构建vif转化模块",
        link: "/compiler/深入编辑器/10-构建vif转化模块.md",
      },

      {
        text: "transform的转化逻辑",
        link: "/compiler/深入编辑器/11-transform的转化逻辑.md",
      },
      {
        text: "生成render函数",
        link: "/compiler/深入编辑器/12-生成render函数.md",
      },
    ],
  },

  {
    text: "运行时编译时合并",
    items: [
      { text: "简介", link: "/compiler/运行时编译时合并/index.md" },
      {
        text: "render-createApp",
        link: "/compiler/运行时编译时合并/1-render-createApp.md",
      },

      {
        text: "template-createApp",
        link: "/compiler/运行时编译时合并/2-template-createApp.md",
      },
      {
        text: "总结",
        link: "/compiler/运行时编译时合并/3-总结.md",
      },
    ],
  },
];
