<template><div><blockquote>
<p>在大数据渲染中，我们往往会考虑<code v-pre>缓存、分页、虚拟列表</code>方式优化大数据量渲染，通常我们会用已有的现成<code v-pre>插件</code>比如<code v-pre>umy-ui</code>(ux-table)虚拟列表 table 组件，<code v-pre>vue-virtual-scroller</code>以及<code v-pre>react-virtualized </code>这些优秀的插件快速满足业务需要。</p>
</blockquote>
<p>为了理解插件背后的原理机制，我们实现一个自己简易版的虚拟列表，希望在实际业务项目中能带来一些思考和帮助。</p>
<p>正文开始...</p>
<h3 id="虚拟列表是什么" tabindex="-1"><a class="header-anchor" href="#虚拟列表是什么" aria-hidden="true">#</a> 虚拟列表是什么</h3>
<p>在大数据渲染中，选择一段可视区域显示对应数据。</p>
<p>我们先初步看一个图
<img src="https://files.mdnice.com/user/24614/5186c72b-8efc-4c39-b349-8be7857cb1f9.png" alt=""></p>
<p>在这张展示图中，我们可以看到我们展示的始终是<code v-pre>红色线虚线</code>展示的部分，每一个元素固定高度，被一个<code v-pre>很大高度的元素</code>包裹着，并且<code v-pre>最外层</code>有一个固定的高度容器，并且设置可以滚动。</p>
<p>新建一个<code v-pre>index.html</code>对应结构如下</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>...
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vitual-list-wrap<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>listWrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>contentStyle<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in list<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.style<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item.content}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的<code v-pre>css</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#app</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #e5e5e5<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*外部容器给一个固定的可视高度，并且设置可以滚动*/</span>
<span class="token selector">.vitual-list-wrap</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span>
  <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*真实容器的区域*/</span>
<span class="token selector">.content</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*固定高度的每个元素*/</span>
<span class="token selector">.item</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px 5px<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid #111<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从对应页面结构与<code v-pre>css</code>中我们的思路大致是这样</p>
<ul>
<li>确定外层固定的高度，并且设置纵向滚动条</li>
<li>真实容器设置相对定位，并且根据显示总数动态设置一个装载容器的高度</li>
<li>每个元素设置绝对定位，且是固定高度</li>
</ul>
<p>有了对应设置的结构，因为我们每个元素是绝对定位的，所以我们现在的思路就是：</p>
<p>1、确定可视区域<code v-pre>item</code>显示的条数<code v-pre>limit</code></p>
<p>2、向上滑动的当前位置<code v-pre>起始位</code>与<code v-pre>最后位置</code>，确定显示元素范围</p>
<p>3、确定每个元素的<code v-pre>top</code>，当向上滑动时，确定当前的位置与最后元素的位置索引，根据当前位置与最后元素位置，渲染<code v-pre>可视区域</code></p>
<p>具体逻辑代码如下</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>虚拟列表<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vitual-list-wrap<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list-wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>contentStyle<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in list<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.style<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item.content}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--引入vue3组件库--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdn.bootcdn.net/ajax/libs/vue/3.2.33/vue.global.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们具体看下<code v-pre>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> createApp<span class="token punctuation">,</span> reactive<span class="token punctuation">,</span> toRefs<span class="token punctuation">,</span> computed<span class="token punctuation">,</span> onMounted<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token operator">=</span> Vue<span class="token punctuation">;</span>
<span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> listWrap <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> viewData <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">total</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token comment">// 数据总条数</span>
      <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">600</span><span class="token punctuation">,</span> <span class="token comment">// 可视区域的高度</span>
      <span class="token literal-property property">rowHeight</span><span class="token operator">:</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token comment">// 每条item的高度</span>
      <span class="token literal-property property">startIndex</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 初始位置</span>
      <span class="token literal-property property">endIndex</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 结束位置</span>
      <span class="token literal-property property">timer</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token literal-property property">bufferSize</span><span class="token operator">:</span> <span class="token number">5</span> <span class="token comment">// 做一个缓冲</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> contentStyle <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>viewData<span class="token punctuation">.</span>total <span class="token operator">*</span> viewData<span class="token punctuation">.</span>rowHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">'relative'</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// todo 设置数据</span>
    <span class="token keyword">const</span> <span class="token function-variable function">renderData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      viewData<span class="token punctuation">.</span>list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> rowHeight<span class="token punctuation">,</span> height<span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> total<span class="token punctuation">,</span> bufferSize <span class="token punctuation">}</span> <span class="token operator">=</span> viewData<span class="token punctuation">;</span>
      <span class="token comment">// 当前可视区域的row条数</span>
      <span class="token keyword">const</span> limit <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>height <span class="token operator">/</span> rowHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>limit<span class="token punctuation">,</span> <span class="token string">'=limit'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 可视区域的最后一个位置</span>
      viewData<span class="token punctuation">.</span>endIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>startIndex <span class="token operator">+</span> limit <span class="token operator">+</span> bufferSize<span class="token punctuation">,</span> total <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> startIndex<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> viewData<span class="token punctuation">.</span>endIndex<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        viewData<span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">content</span><span class="token operator">:</span> i<span class="token punctuation">,</span>
          <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i <span class="token operator">*</span> rowHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">`</span></span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// todo 监听滚动，设置statIndex与endIndex</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleScroll</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// console.log(listWrap.value)</span>
      listWrap<span class="token punctuation">.</span>value <span class="token operator">&amp;&amp;</span>
        listWrap<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'scroll'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">const</span> <span class="token punctuation">{</span> rowHeight<span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> bufferSize <span class="token punctuation">}</span> <span class="token operator">=</span> viewData<span class="token punctuation">;</span>
          <span class="token keyword">const</span> <span class="token punctuation">{</span> scrollTop <span class="token punctuation">}</span> <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">;</span>
          <span class="token comment">// 计算当前滚动的位置，获取当前开始的起始位置</span>
          <span class="token keyword">const</span> currentIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>scrollTop <span class="token operator">/</span> rowHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
          viewData<span class="token punctuation">.</span>timer <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
          <span class="token comment">// console.log(startIndex, currentIndex);</span>
          <span class="token comment">// 做一个简单的节流处理</span>
          <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            viewData<span class="token punctuation">.</span>timer <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token comment">// 如果滑动的位置不是当前位置</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>currentIndex <span class="token operator">!==</span> startIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              viewData<span class="token punctuation">.</span>startIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>currentIndex <span class="token operator">-</span> bufferSize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">renderData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">handleScroll</span><span class="token punctuation">(</span>renderData<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span><span class="token function">toRefs</span><span class="token punctuation">(</span>viewData<span class="token punctuation">)</span><span class="token punctuation">,</span>
      contentStyle<span class="token punctuation">,</span>
      renderData<span class="token punctuation">,</span>
      listWrap
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
vm<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看下页面，已经 ok 了，每次上滑都只会固定高度加载对应的数据
<img src="https://files.mdnice.com/user/24614/e67a4ce1-cefc-460c-8452-6ae8fbb2c13a.png" alt=""></p>
<p>注意我们在<code v-pre>css</code>中有一段这样的代码</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">#app</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #e5e5e5<span class="token punctuation">;</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">... [data-v-app]</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 1 <span class="token important">!important</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样处理主要是为了插值表达式在未渲染的时候，让用户看不到未渲染前的模版内容。如果不先隐藏，那么会打开页面的时候会有插值表达式，<code v-pre>vue</code>中提供了一个<code v-pre>v-cloak</code>,但是貌似这里不管用，在<code v-pre>vue2</code>中是可以的。</p>
<p>本篇是非常简易的虚拟列表实现，了解虚拟列表背后的实现思想，更多可以参考<a href="https://github.com/Akryum/vue-virtual-scroller" target="_blank" rel="noopener noreferrer">vue-virtual-scroller<ExternalLinkIcon/></a>与<a href="https://github.com/bvaughn/react-virtualized" target="_blank" rel="noopener noreferrer">react-virtualized<ExternalLinkIcon/></a>源码的实现，具体应用示例可以查看之前写的一篇偏应用的文章<a href="https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&amp;mid=2247486014&amp;idx=1&amp;sn=4fb22eb3cc18b08d5d7ec8ffeed63587&amp;chksm=c368334cf41fba5ab89d61af3ae16d7753c3ebb61aa6a7720fb6e78a29c080a7e8841da8db02#rd" target="_blank" rel="noopener noreferrer">测试脚本把页面搞崩了 <ExternalLinkIcon/></a>。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>了解虚拟列表到底是什么，在大数据渲染中，选择一段可视区域显示对应数据</p>
</li>
<li>
<p>实现虚拟列表的背后原理，最外层给定一个固定的高度，然后设置纵向<code v-pre>Y轴</code>滚动，然后每个元素的父级设置相对定位，设置真实展示数据的高度，根据<code v-pre>item</code>固定高度(<code v-pre>rowHeight</code>)，根据可视区域和<code v-pre>rowHeight</code>计算可显示的<code v-pre>limit</code>数目。</p>
</li>
<li>
<p>当滚动条上滑时，计算出滚动的距离<code v-pre>scrollTop</code>，通过<code v-pre>currentIndex = Math.floor(scrollTop/rowHeight)</code>计算出当前起始索引</p>
</li>
<li>
<p>根据<code v-pre>endIndex = Math.min(currentIndex+limit, total-1)</code>计算出最后可显示的索引</p>
</li>
<li>
<p>最后根据<code v-pre>startIndex</code>与结束位置<code v-pre>endIndex</code>，根据<code v-pre>startIndex</code>与<code v-pre>endIndex</code>渲染可视区域</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/javascript/08-%E8%99%9A%E6%8B%9F%E5%88%97%E8%A1%A8" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
<li>
<p>本文参考相关文章<a href="https://juejin.cn/post/6948011958075392036" target="_blank" rel="noopener noreferrer">如何实现一个高度自适应的虚拟列表<ExternalLinkIcon/></a>,这是<code v-pre>react</code>版本的</p>
</li>
</ul>
</div></template>
