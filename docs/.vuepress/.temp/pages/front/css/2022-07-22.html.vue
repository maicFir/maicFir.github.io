<template><div><p><code v-pre>flex</code>在css布局中的是一个经常考察的知识点，虽然垂直居中问题已经问得快烂大街了，<code v-pre>flex</code>你虽然总是在用，但是总会有你不知道的盲点</p>
<p>本文是一篇关于<code v-pre>flex</code>布局相关的总结笔记，遇到比较刁钻的问题，当个知识拓展吧</p>
<p>在阅读本文之前，主要从以下几个方向去探讨<code v-pre>flex</code></p>
<ul>
<li>flex布局又称为弹性布局，有何特征</li>
<li>关于flex的一些属性值</li>
<li><code v-pre>flex</code>如何实现垂直居中，如何实现一个对角排列布局</li>
</ul>
<h3 id="flex特征" tabindex="-1"><a class="header-anchor" href="#flex特征" aria-hidden="true">#</a> flex特征</h3>
<p>当我们对一个元素设置<code v-pre>flex</code>后，其子元素所有的<code v-pre>float</code>，<code v-pre>clean</code>、<code v-pre>vertical-align</code>属性都会失效，并且默认水平排列，并且宽度由自身元素内容决定。</p>
<h3 id="影响主轴与交叉轴的属性——" tabindex="-1"><a class="header-anchor" href="#影响主轴与交叉轴的属性——" aria-hidden="true">#</a> 影响主轴与交叉轴的属性——</h3>
<ul>
<li>flex-direction</li>
</ul>
<p>主要影响水平轴排列还是交叉轴排列</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  // <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span> 默认从左往右
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> row-revers<span class="token punctuation">;</span> 顺序从右往左 
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span> 从上往下 
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column-reverse<span class="token punctuation">;</span> 从下往上 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/9900ade0-b2ea-479f-91ac-33aa8096f398.png" alt=""></p>
<ul>
<li>flex-wrap
主要影响水平轴元素是否换行，默认不换行<code v-pre>flex-wrap:nowrap</code></li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> nowrap // 不换行
  // <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap // 换行
  // <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap-reverse 换行从下往上依次排列
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>flex-flow</li>
</ul>
<p>这个属性主要是<code v-pre>flex-direction</code>与<code v-pre>flex-wrap</code>的结合体</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-flow</span><span class="token punctuation">:</span> row nowrap // 默认
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>justify-content</li>
</ul>
<p>主要影响<code v-pre>水平主轴</code>的排列顺序</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-start // 左对齐排列
  // <span class="token property">justify-content</span><span class="token punctuation">:</span> center // 居中排列
  // <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between // 两端对齐排列
  // <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around // 间隔相等排列
  // <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-end // 居右排列
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>align-items</li>
</ul>
<p>主要影响<code v-pre>交叉轴</code>垂直方向的排列</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> flex-start<span class="token punctuation">;</span> // 垂直方向从上往下排列
  // <span class="token property">align-items</span><span class="token punctuation">:</span> center 垂直方向居中排列
  // <span class="token property">align-items</span><span class="token punctuation">:</span> flex-end 垂直方向从下往上排列
  // <span class="token property">align-items</span><span class="token punctuation">:</span> stretch 会将子元素高度拉伸父元素一致<span class="token punctuation">(</span>子元素未设置高度<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/c6052c90-11ff-43e9-91eb-3832a0a1fbff.png" alt=""></p>
<h3 id="关于item项目设置的属性" tabindex="-1"><a class="header-anchor" href="#关于item项目设置的属性" aria-hidden="true">#</a> 关于item项目设置的属性</h3>
<ul>
<li>order</li>
</ul>
<p>决定子项目的顺序，<code v-pre>order</code>越小，越是排列在最前面</p>
<p>假设现在有个需求，css实现简单的跑马灯</p>
<CodeGroup>
<CodeGroupItem title="html">
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="css">
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>    <span class="token atrule"><span class="token rule">@keyframes</span> ani-1</span> <span class="token punctuation">{</span>
        <span class="token selector">0%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">50%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">100%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token atrule"><span class="token rule">@keyframes</span> ani-2</span> <span class="token punctuation">{</span>
        <span class="token selector">0%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">50%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">100%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token atrule"><span class="token rule">@keyframes</span> ani-3</span> <span class="token punctuation">{</span>
        <span class="token selector">0%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">50%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">100%</span> <span class="token punctuation">{</span>
          <span class="token property">order</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
        <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
        <span class="token property">align-items</span><span class="token punctuation">:</span> stretch<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.wrap-box .item-1,
      .wrap-box .item-2,
      .wrap-box .item-3</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.wrap-box .item-1</span> <span class="token punctuation">{</span>
        <span class="token property">animation</span><span class="token punctuation">:</span> ani-1 5s infinite<span class="token punctuation">;</span>
        <span class="token property">transition</span><span class="token punctuation">:</span> order 1s ease<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.wrap-box .item-2</span> <span class="token punctuation">{</span>
        <span class="token property">animation</span><span class="token punctuation">:</span> ani-2 5s infinite<span class="token punctuation">;</span>
        <span class="token property">transition</span><span class="token punctuation">:</span> order 1s ease<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.wrap-box .item-3</span> <span class="token punctuation">{</span>
        <span class="token property">animation</span><span class="token punctuation">:</span> ani-3 5s infinite<span class="token punctuation">;</span>
        <span class="token property">transition</span><span class="token punctuation">:</span> order 1s ease<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<p>我们利用<code v-pre>css3</code>的动画帧，改变order的顺序，因此一个简易的css跑马灯就实现了，而且并没有改变<code v-pre>dom</code>的结构和顺序
<img src="https://files.mdnice.com/user/24614/7482ab3d-54ca-4cef-9ba0-abaee25830fc.gif" alt=""></p>
<ul>
<li>flex-basis</li>
</ul>
<p>设置当前的item的固定宽度</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box .item-3</span><span class="token punctuation">{</span>
  <span class="token property">flex-basis</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/9eaa519b-0b5e-4d7a-b5fd-78b9bbb0a23a.png" alt=""></p>
<ul>
<li>flex-grow</li>
</ul>
<p>该属性是决定当前item的放大比例，默认是0
<img src="https://files.mdnice.com/user/24614/f5e57e6b-2119-454a-adf3-10d2770a28f5.png" alt=""></p>
<p>比如三个div,左右固定，中间内容自动撑开
<img src="https://files.mdnice.com/user/24614/7fa8ba48-772b-4369-bd04-adc0436e20f6.png" alt=""></p>
<ul>
<li>flex-shrink</li>
</ul>
<p>当前item的缩小比例，默认的是0</p>
<ul>
<li>align-self</li>
</ul>
<p>能控制单个<code v-pre>item</code>的排列，这个属性通常不是很常用，面试曾被这个css的属性布局问题给跪了</p>
<p>面试题大概是这样的，3个子div实现一个对角线布局,用<code v-pre>flex布局</code>,如果没想到这个<code v-pre>align-self</code>大概是实现不了</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 <span class="token selector">.wrap-box .item-1,
  .wrap-box .item-2,
  .wrap-box .item-3</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.wrap-box .item-2</span> <span class="token punctuation">{</span>
  <span class="token property">align-self</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> // 垂直居中
<span class="token punctuation">}</span>
<span class="token selector">.wrap-box .item-3</span> <span class="token punctuation">{</span>
  <span class="token property">align-self</span><span class="token punctuation">:</span> flex-end<span class="token punctuation">;</span> // 靠右
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置对应的<code v-pre>item</code>大概就是下面这样了
<img src="https://files.mdnice.com/user/24614/63a22224-d9ab-4aa7-8a57-3c89cad8fa78.png" alt="">
<img src="https://files.mdnice.com/user/24614/d16961a7-30f0-47e0-960e-4ec3133c9142.png" alt=""></p>
<h3 id="关于flex-1的详解" tabindex="-1"><a class="header-anchor" href="#关于flex-1的详解" aria-hidden="true">#</a> 关于flex:1的详解</h3>
<p>通常我们设置<code v-pre>flex:1</code>，其实本质上是替代了以下几个参数</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.item3</span> <span class="token punctuation">{</span>
  <span class="token property">flex-grow</span><span class="token punctuation">:</span>1<span class="token punctuation">;</span>
  <span class="token property">flex-shrink</span><span class="token punctuation">:</span>1<span class="token punctuation">;</span>
  <span class="token property">flex-basis</span><span class="token punctuation">:</span> 0%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元素垂直居中" tabindex="-1"><a class="header-anchor" href="#元素垂直居中" aria-hidden="true">#</a> 元素垂直居中</h3>
<p>以下是一个基本的页面结构</p>
<CodeGroup>
<CodeGroupItem title="html">
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="css">
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code> <span class="token selector">.wrap</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.wrap .inner-box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<p><img src="https://files.mdnice.com/user/24614/c6d5aa95-3379-4dc2-a08e-694096de97dd.png" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>了解flex基本特征，影响水平轴与交叉轴的的属性主要受<code v-pre>flex-direction</code>这个属性的，默认水平<code v-pre>row</code>排列</p>
</li>
<li>
<p>当一个父级元素设置<code v-pre>flex</code>后，子级的<code v-pre>浮动</code>、<code v-pre>clear</code>,<code v-pre>vertain-align</code>属性都会失效，默认所有子级元素水平排列</p>
</li>
<li>
<p><code v-pre>flex</code>的一些特性，比如放大<code v-pre>flex-glow</code>、缩小<code v-pre>flex-shrink</code>,还有影响水平轴排列<code v-pre>just-content</code>，以及交叉轴排列<code v-pre>align-items</code>属性的设置</p>
</li>
<li>
<p>align-self 这个属性可以单独控制当前元素的位置</p>
</li>
<li>
<p>flex实现一个垂直居中</p>
</li>
<li>
<p>本文<a href="https://github.com/maicFir/lessonNote/tree/master/html/04-flex%E5%B8%83%E5%B1%80" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
