import{_ as e,c as o,o as t,Q as c}from"./chunks/framework.5f28ab71.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"reactivity/reactive/14-reactive函数的局限性.md","lastUpdated":1709451841000}'),a={name:"reactivity/reactive/14-reactive函数的局限性.md"},r=c('<h2 id="_14-reactive-函数的局限性" tabindex="-1">14-reactive 函数的局限性 <a class="header-anchor" href="#_14-reactive-函数的局限性" aria-label="Permalink to &quot;14-reactive 函数的局限性&quot;">​</a></h2><p>目前我们已经成功的完成了一个相对完善的 <code>reactive</code> 函数，通过它配合 <code>effect</code> 函数可以实现对应的响应性渲染。</p><p>但是对于 <code>reactive</code> 而言，它其实是具备一些局限性的。那么具体都有哪些局限性呢？</p><p>我们来思考以下两个问题：</p><ol><li><code>reactive</code> 可以对简单数据类型使用吗？比如：<code>reactive(&#39;张三&#39;)</code></li><li>当我们对 <code>reactive</code> 返回的响应性数据进行解构时，解构之后的属性还会具备响应性吗？</li></ol><p>那么下面我们就对这两个问题，一个一个进行解释：</p><h3 id="reactive-可以对简单数据类型使用吗" tabindex="-1"><code>reactive</code> 可以对简单数据类型使用吗？ <a class="header-anchor" href="#reactive-可以对简单数据类型使用吗" aria-label="Permalink to &quot;`reactive` 可以对简单数据类型使用吗？&quot;">​</a></h3><p>我们知道，对于 <code>reactive</code> 函数而言，它会把传入的 <strong>object</strong> 作为 <code>proxy</code> 的 <code>target</code> 参数，而对于 <code>proxy</code> 而言，他只能代理 <strong>对象</strong>，而不能代理简单数据类型，所以说：<strong>我们不可以使用 <code>reactive</code> 函数，构建简单数据类型的响应性</strong>。</p><h3 id="当我们对-reactive-返回的响应性数据进行解构时-解构之后的属性还会具备响应性吗" tabindex="-1">当我们对 <code>reactive</code> 返回的响应性数据进行解构时，解构之后的属性还会具备响应性吗？ <a class="header-anchor" href="#当我们对-reactive-返回的响应性数据进行解构时-解构之后的属性还会具备响应性吗" aria-label="Permalink to &quot;当我们对 `reactive` 返回的响应性数据进行解构时，解构之后的属性还会具备响应性吗？&quot;">​</a></h3><p>一个数据是否具备响应性的关键在于：**是否可以监听它的 <code>getter</code> 和 <code>setter</code> **。而根据我们的代码可知，只有 <code>proxy</code> 类型的 <strong>代理对象</strong> 才可以被监听 <code>getter</code> 和 <code>setter</code> ，而一旦解构，对应的属性将不再是 <code>proxy</code> 类型的对象，所以：<strong>解构之后的属性，将不具备响应性。</strong></p><h3 id="总结与新的问题" tabindex="-1">总结与新的问题 <a class="header-anchor" href="#总结与新的问题" aria-label="Permalink to &quot;总结与新的问题&quot;">​</a></h3><p>那么到现在我们知道了，<code>reactive</code> 不可以对 <strong>简单数据类型使用</strong>，并且 <strong>不可以解构</strong>。那么如果我们期望 <strong>简单数据类型也具备响应性</strong>，那么我们又应该如何做呢？</p><p>熟悉 <code>vue 3</code> 的同学，肯定知道，此时我们可以使用 <code>ref</code> 函数来进行实现。</p><p>那么 <code>ref</code> 函数它又是因为什么可以构建简单数据类型的响应性，又为什么必须要通过 <code>.value</code> 访问数据呢？</p>',14),d=[r];function i(s,n,_,p,l,v){return t(),o("div",null,d)}const f=e(a,[["render",i]]);export{g as __pageData,f as default};
