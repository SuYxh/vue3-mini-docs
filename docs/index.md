---
layout: home
layoutClass: "m-home-layout"

hero:
  name: vitepress-template
  text: Lifelong Growth
  tagline: 道阻且长,行则将至
  image:
    src: /logo.png
    alt: vitepress-template
  actions:
    - text: Go -->
      link: /fe/es6/
    - text: 前端导航
      link: /nav
      theme: alt
features:
  - icon: 📖
    title: 前端基础
    details: 整理前端常用知识点<small>（面试八股文）</small><br />如有异议按你的理解为主，不接受反驳
    link: /fe/javascript/types
    linkText: 前端常用知识
  - icon: 🐞
    title: 踩坑记录
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
    link: /pit/npm
    linkText: 踩坑记录
  - icon: 💯
    title: 吾志所向，一往无前。
    details: '<small class="bottom-small">一个想躺平的小开发</small>'
    link: https://www.yuque.com/jarvis-zzzhw/frontend
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>
