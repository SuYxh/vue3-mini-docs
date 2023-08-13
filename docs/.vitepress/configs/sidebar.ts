import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/fe/": [
    {
      text: "JavaScript 基础知识",
      collapsed: false,
      items: [
        { text: "数据类型", link: "/fe/javascript/types" },
      ],
    },
    {
      text: "ES6 常用知识点",
      link: "/fe/es6/",
    },
  ],
  "/pit/": [
    {
      text: "踩坑记录",
      // collapsed: false,
      items: [
        { text: "npm 踩坑记录", link: "/pit/npm" },
        { text: "PC 踩坑记录", link: "/pit/pc" },
        { text: "H5 踩坑记录", link: "/pit/h5" },
      ],
    },
  ],
};
