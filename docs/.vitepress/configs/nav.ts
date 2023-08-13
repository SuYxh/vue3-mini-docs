import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "前端基础",
    items: [
      { text: "JavaScript 基础知识", link: "/fe/javascript/types" },
      {
        text: "CSS 相关",
        items: [
          { text: "CSS 语法", link: "/fe/css/spec" },
        ],
      },
    ],
    activeMatch: "^/fe",
  },
  { text: "踩坑记录", link: "/pit/npm", activeMatch: "^/pit" },
  {
    text: "Me",
    items: [
      { text: "掘金", link: "https://juejin.cn/user/2084329779636094/posts" },
    ],
  },
];
