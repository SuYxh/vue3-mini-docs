import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "框架设计",
    link: "/framework-design/index",
    activeMatch: "^/framework-design",
  },
  {
    text: "项目搭建",
    link: "/project-construction/index",
    activeMatch: "^/project-construction",
  },
  { text: "响应式", link: "/reactivity/index", activeMatch: "^/reactivity" },
  { text: "运行时", link: "/runtime/index", activeMatch: "^/runtime" },
  { text: "编译器", link: "/compiler/index", activeMatch: "^/compiler" },
];
