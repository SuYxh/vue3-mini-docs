import{_ as e,c,o,Q as t}from"./chunks/framework.5f28ab71.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"reactivity/reactive/11-单一依赖的reactive.md","lastUpdated":1709451841000}'),d={name:"reactivity/reactive/11-单一依赖的reactive.md"},r=t('<h2 id="_11-单一依赖的-reactive" tabindex="-1">11-单一依赖的 reactive <a class="header-anchor" href="#_11-单一依赖的-reactive" aria-label="Permalink to &quot;11-单一依赖的 reactive&quot;">​</a></h2><p>通过以上的努力，我们目前已经构建了一个简单的 <code>reactive</code> 函数，使用 <code>reactive</code> 函数，配合 <code>effect</code> 可以实现出一个 <strong>响应式数据渲染功能</strong>，我们把整个的流程做一个总结：</p><ol><li>首先我们在 <code>packages/reactivity/src/reactive.ts</code> 中，创建了一个 <code>reactive</code> 函数，该函数可以帮助我们生成一个 <code>proxy</code> 实例对象</li><li>通过该 <code>proxy</code> 实例的 <code>handler</code> 可以监听到对应的 <code>getter</code> 和 <code>setter</code></li><li>然后我们在 <code>packages/reactivity/src/effect.ts</code> 中，创建了一个 <code>effect</code> 函数，通过该函数可以创建一个 <code>ReactiveEffect</code> 的实例，该实例的构造函数可以接收传入的回调函数 <code>fn</code>，并且提供了一个 <code>run</code> 方法</li><li>触发 <code>run</code> 可以为 <code>activeEffect</code> 进行赋值，并且执行 <code>fn</code> 函数</li><li>我们需要在 <code>fn</code> 函数中触发 <code>proxy</code> 的 <code>getter</code>，以此来激活 <code>handler</code> 的 <code>get</code> 函数</li><li>在 <code>handler</code> 的 <code>get</code> 函数中，我们通过 <code>WeakMap</code> 收集了 <strong>指定对象，指定属性</strong> 的 <code>fn</code>，这样的一步操作，我们把它叫做 <strong>依赖收集</strong></li><li>最后我们可以在 <strong>任意时刻</strong>，修改 <code>proxy</code> 的数据，这样会触发 <code>handler</code> 的 <code>setter</code></li><li>在 <code>handler</code> 的 <code>setter</code> 中，我们会根据 <strong>指定对象 <code>target</code></strong> 的 <strong>指定属性 <code>key</code></strong> 来获取到保存的 <strong>依赖</strong>，然后我们只需要触发依赖，即可达到修改数据的效果</li></ol>',3),a=[r];function i(s,n,l,_,f,g){return o(),c("div",null,a)}const h=e(d,[["render",i]]);export{v as __pageData,h as default};
