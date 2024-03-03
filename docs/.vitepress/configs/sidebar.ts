import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/framework-design/": [
    // {
    //   text: "JavaScript 基础知识",
    //   collapsed: false,
    //   items: [
    //     { text: "数据类型", link: "/fe/javascript/types" },
    //   ],
    // },
    {
      text: "Test",
      link: "/fe/es6/",
    },
  ],
};
