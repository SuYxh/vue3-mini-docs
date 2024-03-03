import{_ as e,c as t,o as _,Q as r}from"./chunks/framework.5f28ab71.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"reactivity/ref/07-总结-ref简单数据类型响应性.md","lastUpdated":1709451841000}'),a={name:"reactivity/ref/07-总结-ref简单数据类型响应性.md"},o=r('<h2 id="_07-总结-ref-简单数据类型响应性" tabindex="-1">07 总结-ref 简单数据类型响应性 <a class="header-anchor" href="#_07-总结-ref-简单数据类型响应性" aria-label="Permalink to &quot;07 总结-ref 简单数据类型响应性&quot;">​</a></h2><p>那么到这里我们实现了 <code>ref</code> 简单数据类型的响应性处理。</p><p>在这样的代码，我们需要知道的最重要的一点是：<strong>简单数据类型，不具备数据件监听的概念</strong>，即本身并不是响应性的。</p><p>只是因为 <code>vue</code> 通过了 <code>set value()</code> 的语法，把 <strong>函数调用变成了属性调用的形式</strong>，让我们通过主动调用该函数，来完成了一个 “类似于” 响应性的结果。</p>',4),c=[o];function s(n,d,i,f,p,l){return _(),t("div",null,c)}const u=e(a,[["render",s]]);export{m as __pageData,u as default};
