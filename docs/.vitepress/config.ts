import { defineConfig } from "vitepress";
import { head, nav, sidebar, algolia } from "./configs";

export default defineConfig({
  outDir: "../dist",
  base: process.env.APP_BASE_PATH || "/",

  lang: "zh-CN",
  title: "vue3-mini-docs",
  description: "手写 vue3",
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: "/logo.png",

    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: "deep",
      label: "本页目录",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/SuYxh/vue3-mini-docs" },
    ],

    footer: {
      message: "你相信光吗",
      copyright: "Copyright © 2024-present",
    },

    darkModeSwitchLabel: "外观",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新",

    /* Algolia DocSearch 配置 */
    algolia,

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
  },
});
