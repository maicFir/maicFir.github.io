<template><div><p>移动端适配，在移动端里经常有遇到，在不同分辨率移动端设备精确还原UI设计稿，这是一个令人抓狂的问题，好在有<code v-pre>flex</code>，<code v-pre>box</code>布局解决了自适应很大一部分问题。</p>
<p>在开始本文之前主要介绍几种笔者常用的适配方案</p>
<p>1、设置<code v-pre>meta</code>标签的<code v-pre>initial-scale</code>,<code v-pre>mininum-scale</code>,<code v-pre>maxinum-scale</code>缩放比</p>
<p>2、<code v-pre>rem</code>适配，利用根设置基础单位</p>
<p>3、<code v-pre>vw</code>+calc,结合<code v-pre>rem</code>适配</p>
<p>正文开始...</p>
<h3 id="meta缩放比" tabindex="-1"><a class="header-anchor" href="#meta缩放比" aria-hidden="true">#</a> meta缩放比</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">flexable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> deviceWidth <span class="token operator">=</span> window<span class="token punctuation">.</span>screen<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
      <span class="token comment">// 根据当前设计稿，如果是设计稿640，那么targetWidth就是320,设计稿实际1px,页面也是1px</span>
      <span class="token comment">// 如果设计稿是750，那么targetWidth就是375</span>
      <span class="token keyword">const</span> targetWidth <span class="token operator">=</span> <span class="token number">320</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> scale <span class="token operator">=</span> deviceWidth <span class="token operator">/</span> targetWidth<span class="token punctuation">;</span>
      <span class="token keyword">let</span> meta <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'meta[name="viewport"]'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>meta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> meta <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"meta"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        meta<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"viewport"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        meta<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>
          <span class="token string">"content"</span><span class="token punctuation">,</span>
          <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">width=device-width,initial-scale=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>scale<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,minimum-scale=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>scale<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,maximum-scale=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>scale<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,user-scalable=no</span><span class="token template-punctuation string">`</span></span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
        document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"head"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>meta<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>meta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        meta<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>
          <span class="token string">"content"</span><span class="token punctuation">,</span>
          <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">width=device-width,initial-scale=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>scale<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,minimum-scale=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>scale<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,maximum-scale=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>scale<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,user-scalable=no</span><span class="token template-punctuation string">`</span></span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
      <span class="token string">"resize"</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">flexable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token boolean">false</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">flexable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要是设置根据<code v-pre>window.screen.width</code>与设计稿实际尺寸<code v-pre>targetWidth</code>计算出<code v-pre>scale</code>,将这个<code v-pre>scale</code>动态设置<code v-pre>meta</code>的<code v-pre>content</code>,<code v-pre>width=device-width</code>,<code v-pre>initial-scale=scale,minimum-scale=scale,maximun-scale=scale</code></p>
<p>当我们动态设置<code v-pre>meta</code>后，我们不同分辨率下的字体大小就会动态的发生变化</p>
<p>640x960
<img src="https://files.mdnice.com/user/24614/0d5ff9fd-8109-4898-bc13-e865879fd346.png" alt="">
750x1334
<img src="https://files.mdnice.com/user/24614/5e800ccd-b046-4dde-b1a3-26e8f9b58f77.png" alt=""></p>
<p>注意<code v-pre>targetWidth</code>是你设计稿尺寸，如果是<code v-pre>750</code>的设计稿，那么就是<code v-pre>375</code>,在设计稿中量的是多少尺寸，就是多少固定尺寸</p>
<h3 id="rem适配" tabindex="-1"><a class="header-anchor" href="#rem适配" aria-hidden="true">#</a> rem适配</h3>
<p>因为默认浏览器字体的大小就是<code v-pre>16px</code>,所以我们在一些项目中会看到<code v-pre>font-size:62.5%</code></p>
<p>这<code v-pre>62.5%</code>到底怎么计算来的呢，如果我们根html设置<code v-pre>font-size: 16px</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>1rem = 16px<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>换算成百分比就是<code v-pre>1/16</code>就是<code v-pre>6.25%</code>,现在我们扩大10倍就是<code v-pre>62.5%</code>,所以<code v-pre>1rem = 10px</code>,也就<code v-pre>1px=0.1rem</code></p>
<p>在我们根据UI设计稿实际尺寸中，如果量得尺寸是<code v-pre>16px</code>那么就是<code v-pre>1.6rem</code>,只需要在<code v-pre>原单位基础上/10</code>即可</p>
<p>注意我们<code v-pre>meta</code>标签上同样要默认设置<code v-pre>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>rem<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
      <span class="token selector">*</span> <span class="token punctuation">{</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">html</span> <span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 62.5%<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.title</span> <span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 2rem<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.box</span> <span class="token punctuation">{</span>
        <span class="token property">max-width</span><span class="token punctuation">:</span> 64rem<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 10rem<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>rem适配<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/ed133ca8-2a2c-41e5-b623-0061ffd82b1e.png" alt="">
这种方案在早期移动端rem适配用得比较多</p>
<h3 id="vw适配" tabindex="-1"><a class="header-anchor" href="#vw适配" aria-hidden="true">#</a> vw适配</h3>
<p><code v-pre>vw</code>是视口单位，通常来讲会将可视区域分成<code v-pre>100vw</code></p>
<p><img src="https://files.mdnice.com/user/24614/56e6e226-bddd-4b31-af70-23527eff789a.png" alt=""></p>
<p>在利用<code v-pre>vw</code>与<code v-pre>calc</code>来设置根<code v-pre>html</code>的<code v-pre>font-size</code>，然后用<code v-pre>rem</code>单位</p>
<p>然后我们看下代码</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code> <span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">html</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>100vw / 320 * 10<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>100vw</code>瓜分了<code v-pre>320</code>分辨率，然后我们需要扩大10倍</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>1rem <span class="token operator">=</span> 10vw <span class="token operator">=</span> 10px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以当我们实际量得UI上<code v-pre>20px</code>时，我们直接计算得出<code v-pre>2rem</code>即可</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code> <span class="token selector">#app</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token selector">.title</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 2rem<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.box</span> <span class="token punctuation">{</span>
    <span class="token property">max-width</span><span class="token punctuation">:</span> 32rem<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 10rem<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.content</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 2rem<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>255<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.row-present .col</span> <span class="token punctuation">{</span>
    <span class="token comment">/* width: calc(100% / 3); */</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 20%<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">:root</span> <span class="token punctuation">{</span>
    <span class="token property">--background-color</span><span class="token punctuation">:</span> #111<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.row-present .col:nth-of-type(2n + 1)</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--background-color<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">p.title</span> <span class="token punctuation">{</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.row-vw .col</span> <span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 20vw<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 2rem<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.row-vw .col:nth-of-type(2n + 1)</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--background-color<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后的结果就是下面
<img src="https://files.mdnice.com/user/24614/56e6e226-bddd-4b31-af70-23527eff789a.png" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>可以动态设置<code v-pre>meta</code>的<code v-pre>initial-scale</code>的缩放比，主要是根据<code v-pre>screen.width</code>设备宽度与目标设计稿<code v-pre>targetWidth</code>形成像素比scale，假设设计稿是<code v-pre>750</code>的，那么我们的<code v-pre>targetWidth</code>就是375,设计稿量的尺寸就是10px,网页上所写的元素也是10px,因为<code v-pre>scale=1</code>,随着不同分辨率<code v-pre>scale</code>的值也会发生变化</p>
</li>
<li>
<p>rem适配，浏览器默认<code v-pre>font-size:16px</code>，当我们根<code v-pre>font-size:62.5%</code>时，我们利用<code v-pre>rem</code>单位设置元素单位，<code v-pre>1rem=10px</code>,所以当设计稿750像素时，量尺寸<code v-pre>20px</code>,那么你实际单位换成rem时，就是<code v-pre>2rem</code>,原有尺寸缩小10倍即可，这种方案会有一定误差，但也基本满足移动端自适应</p>
</li>
<li>
<p><code v-pre>vw+calc+rem</code>方案，同样是设置根<code v-pre>html</code>的单位，主要是<code v-pre>font-size: calc(100vw / targetWidth * 10)</code>,我们把<code v-pre>vw</code>视口单位，如果你的设计稿是640,<code v-pre>100vw</code>就是<code v-pre>targetWidth=320</code>像素,如果你的设计稿是750，那么<code v-pre>targetWidth=375</code>，<code v-pre>1rem = 10vw = 10px</code>,所以当你750的设计稿20像素时，那么在实际网页的单位只需要缩小10倍即可，也就是2rem，这种方式精确度高，简单，基本不需要第三方什么适配js</p>
</li>
<li>
<p>本文<a href="https://github.com/maicFir/lessonNote/tree/master/html/08-%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%80%82%E9%85%8D%E6%96%B9%E6%B3%95" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
