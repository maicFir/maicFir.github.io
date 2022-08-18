<template><div><p><code v-pre>css堆叠上下文</code>这个不知道你在业务中有没有遇到过，前段时间搭建<code v-pre>vuepress1.0</code>就遇到这样的一个类似的问题，主要是用了<code v-pre>vuepress-reco</code>这个主题,去官方提了一个<a href="https://github.com/vuepress-reco/vuepress-theme-reco/issues/95" title="issue" target="_blank" rel="noopener noreferrer">issue<ExternalLinkIcon/></a>,自己提的<code v-pre>issue</code>最后自己找到原因了，但是还是有小伙伴遇到同样的类似问题,今天一起探讨一下这个<code v-pre>css堆叠上下文</code>的问题</p>
<p>正文开始...</p>
<h3 id="fixed失效了" tabindex="-1"><a class="header-anchor" href="#fixed失效了" aria-hidden="true">#</a> fixed失效了</h3>
<p>我们直接用具体案例来体会<code v-pre>css堆叠上下文</code>，因为官方<code v-pre>veurpess-reco1.x</code>版本，当你开启右侧子菜单时，右侧的子菜单<code v-pre>fixed</code>就失效了。</p>
<p>我们具体写个例子分析下</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>subContent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我是fixed在最右侧<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的<code v-pre>css</code>如下</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.wrap</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #111<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.subContent</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>js</code>中我生成了<code v-pre>50</code>条数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">function</span> <span class="token function">renderHtml</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> innerContent <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">"inner-content"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> max <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> max<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    str <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;p></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/p></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  innerContent<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> str<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">renderHtml</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/72d1eaef-fcd8-4116-a7c6-7a9bcaa34294.png" alt=""></p>
<p>我们知道我给了<code v-pre>.subContent</code>的样式是<code v-pre>fixed</code>,<code v-pre>fixed</code>是相对整个<code v-pre>body</code>的，所以此时当你滚动内容时，会一直固定在最右侧</p>
<p>但是恰巧，此时遇上了一个问题<code v-pre>fixed</code>失效了,也正是一行<code v-pre>css</code>的原因导致的</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code> <span class="token selector">.wrap</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #111<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于父级<code v-pre>.wrap</code>设置了<code v-pre>transform</code>导致子级<code v-pre>subContent</code>的<code v-pre>fixed</code>失效了
<img src="https://files.mdnice.com/user/24614/460b3e23-fe40-4461-9d60-a3734ce3fe30.png" alt=""></p>
<p><code v-pre>fixed</code>失效了，所以就是这个父级元素设置的<code v-pre>transform: translateY(0)</code>造成的</p>
<p>为了解决这个问题，我们重置了该样式，将其改成了<code v-pre>transform:none</code>,于是<code v-pre>fixed</code>就正常了，这也是在解决<code v-pre>vuepress-reco1.x</code>主题右侧子菜单<code v-pre>fixed</code>失效的原因。</p>
<h3 id="什么样情况会造成fixed失效" tabindex="-1"><a class="header-anchor" href="#什么样情况会造成fixed失效" aria-hidden="true">#</a> 什么样情况会造成<code v-pre>fixed</code>失效</h3>
<p>除了父级设置<code v-pre>transform</code>不为<code v-pre>none</code>,还有<code v-pre>filter</code>不为<code v-pre>none</code>也会造成<code v-pre>fixed</code>失效</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code> <span class="token selector">.wrap</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #111<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/*filter: blur(1px)*/</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="堆叠上下文" tabindex="-1"><a class="header-anchor" href="#堆叠上下文" aria-hidden="true">#</a> 堆叠上下文</h3>
<p>参考张鑫旭老师的一篇博文<a href="https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/" title="深入理解CSS中的层叠上下文和层叠顺序" target="_blank" rel="noopener noreferrer">深入理解CSS中的层叠上下文和层叠顺序<ExternalLinkIcon/></a>，参照张鑫旭老师的一张图，大概就是这样</p>
<p><img src="https://files.mdnice.com/user/24614/4d2cf2ce-fbfb-4a81-9eff-52c471eba15f.png" alt=""></p>
<p>就是我们看到网页上显示是二维的，实际上还有三维，就是一个类似控制<code v-pre>transform:translateZ</code>的一个概念</p>
<p>我们只知道在网页中所有可见元素都是由标签组成，所有标签的排列布局其实是由一个经典的概念构成<code v-pre>块级格式上下文</code>也俗称<code v-pre>BFC</code>，所以整个网页的布局是由<code v-pre>BFC</code>这样的特性而构建我们的网页</p>
<p>看一个例子</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>leavel-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>leavel-1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>leavel-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>leavel-2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap2</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.leavel-2,.leavel-1</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
<span class="token selector">.leavel-1</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.leavel-2</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就会下面这样
<img src="https://files.mdnice.com/user/24614/69883056-8989-4d0d-80dc-27e6ab56abcd.png" alt=""></p>
<p>正常情况参照<code v-pre>BFC</code>特性，两个块级元素就是这样独占一行的排列了，但是如果我给两个元素设置<code v-pre>浮动</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.leavel-1, .leavel-2</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时发现就会像下面这样</p>
<p><img src="https://files.mdnice.com/user/24614/6be0a84d-2e74-4d44-af1d-06d830f90f18.png" alt=""></p>
<p>然后我再设置<code v-pre>.leavel-2</code>的<code v-pre>margin-left: -100px</code>，你就会发现<code v-pre>leavel-1</code>被挡住了
<img src="https://files.mdnice.com/user/24614/a64eda9f-df71-4986-9a4f-ca8caf007a20.png" alt="">
初学者可能会好奇，也很容易想到，这<code v-pre>leavel-1</code>去哪里了，实际上是在<code v-pre>leavel-2</code>的下级，我们把<code v-pre>leavel-2</code>的宽度调整一下</p>
<p><img src="https://files.mdnice.com/user/24614/8452ec82-6993-4409-b1b1-a8c2607049a4.png" alt=""></p>
<p>隐藏出来的<code v-pre>.leavel-1</code>九显示出来了</p>
<p>所以你现在明白了<code v-pre>层叠上下文</code>了吗，简单的说，网页的所有元素可以像盖棉被一样，一层一层的往上盖，最新的叠在最上面</p>
<p>我们思考下，从浏览器默认的<code v-pre>BFC</code>结构到我们想要看到的<code v-pre>堆叠上下文</code>的效果，这中间我们主要做了哪些事情</p>
<p>1、设置了浮动【破坏了文档流】</p>
<p>2、设置<code v-pre>.leavel-2</code>的外边距<code v-pre>margin-left:-100px</code>【改变了元素的默认排列位置】</p>
<p>所以产生<code v-pre>堆叠上下文</code>，必须满足两个条件，一个是原素文档流被破坏，二是元素位置发生变化</p>
<h3 id="定位产生堆叠上下文" tabindex="-1"><a class="header-anchor" href="#定位产生堆叠上下文" aria-hidden="true">#</a> 定位产生堆叠上下文</h3>
<p>其实除了这<code v-pre>浮动+margin</code>方式，其实我们还可以用<code v-pre>定位</code>去产生堆叠上下文，但实际上也是满足这两个基本的条件</p>
<p>但是如果是用定位，那么有个<code v-pre>z-index</code>这个属性是可以影响层叠上下文的顺序的，<code v-pre>z-index</code>越小，排得越下面</p>
<h3 id="transform产生堆叠上下文" tabindex="-1"><a class="header-anchor" href="#transform产生堆叠上下文" aria-hidden="true">#</a> transform产生堆叠上下文</h3>
<p>我们发现<code v-pre>浮动+margin</code>，<code v-pre>position</code>能产生上下文，除了这两个，新增的<code v-pre>css3</code>最新特性中还有<code v-pre>transform</code>也可以产生堆叠上下文</p>
<p>因此我们可以这么做</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.leavel-2,
.leavel-1</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.wrap2</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.leavel-1</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.leavel-2</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-100px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/95dc6139-03d6-4a89-a6bb-553396a5a686.png" alt=""></p>
<p>我们会发现此时<code v-pre>leavel-2</code>就把<code v-pre>leavel-1</code>完全盖住，因此<code v-pre>transform</code>也可以产生堆叠上下文，但实际上这个特性并不是像前面两个一样，并不会破坏文档流，所以这是一个例外，他只是改变自身位置，从而形成了堆叠上下文</p>
<h3 id="堆叠优先级问题" tabindex="-1"><a class="header-anchor" href="#堆叠优先级问题" aria-hidden="true">#</a> 堆叠优先级问题</h3>
<p>我们看到元素，优先级行内元素是不是最高，比如元素的内容文字，永远在最顶层，然后就是背景，然后就是<code v-pre>z-index</code>设置的可见元素</p>
<p>当一个元素同时设置<code v-pre>定位</code>与<code v-pre>transform</code>,影响层叠上下文是怎么样</p>
<p><img src="https://files.mdnice.com/user/24614/aa27ca85-a057-4f02-85cd-b45bad37b43b.png" alt=""></p>
<p>我们看到<code v-pre>fixed</code>会比<code v-pre>transform</code>的优先级更高，如果去掉<code v-pre>transform</code>，就是就是贴着<code v-pre>body</code>排的</p>
<p><img src="https://files.mdnice.com/user/24614/d813fa09-82c9-4e6f-aa72-200901046e3a.png" alt=""></p>
<p>所以这就证明，浏览器在处理<code v-pre>层叠上下文</code>优先级就是先执行<code v-pre>定位</code>，然后再执行<code v-pre>transfrom</code>，这只是作用在同一个元素上</p>
<p>回到我们刚开始的问题上，如果是作用在不同的两个父子级上呢</p>
<p>我们文章开头，就是这样的一个例子</p>
<p>父级元素设置了<code v-pre>transform: translateY(0)</code></p>
<p>然后他的子级上设置了一个<code v-pre>fixed</code>,于是怪异的问题就发生了，<code v-pre>fixed</code>失效了</p>
<p>页面结构大概就是这样</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>subContent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我是fixed在最右侧<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的<code v-pre>css</code>如下</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #111<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
      <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">/*filter: blur(1px)*/</span>
    <span class="token punctuation">}</span>
  <span class="token selector">.subContent</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
    <span class="token property">right</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那为什么会出现这样的情况？我们画个图理解下</p>
<p><img src="https://files.mdnice.com/user/24614/b2d30857-cfb0-4ff5-a510-b4ddc00f90f1.png" alt=""></p>
<p>本质上<code v-pre>transform:translate(0，0)</code>与<code v-pre>（10px，-10px）</code>没有差别，图中这么画只是为了更好理解，因此我代码中设置的是<code v-pre>translateY(0)</code>，所以其实是Y轴方向上往上偏移而已，但是这不影响我们理解这其中的本质。</p>
<p>因为外层父元素设置了<code v-pre>transfrom</code>产生了堆叠上下文，而它子元素又想逃脱出去，儿子想造反给自己设置<code v-pre>fixed</code>产生一个堆叠上下文，对不起，你必须听老子的，所以子元素设置的<code v-pre>fixed</code>就失效了，你还是得跟着老子走</p>
<p>如果你不想因为父级元素<code v-pre>transform</code>设置，你想单飞呢，你可以怎么做呢？</p>
<p>唯一的办法，另起炉灶....</p>
<p>因此你可以这么做</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>subContent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我是fixed在最右侧<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/6e091bcc-010f-4a2c-98b3-06af73c9de48.png" alt=""></p>
<p>没错，你看到的就是，子级元素已经挣脱束缚了，所以我不受被包裹元素<code v-pre>tranform</code>的影响了。</p>
<p>不知道你注意到没，其实<code v-pre>filter</code>也是和<code v-pre>transform</code>一样会产生堆叠上下文，如果子元素被包裹，父级元素设置<code v-pre>filter</code>,那么子级元素的<code v-pre>fixed</code>也会失效</p>
<p><img src="https://files.mdnice.com/user/24614/ab69c863-e12b-4dee-9cfd-55ee6e8956a6.png" alt=""></p>
<p>是不是很惊讶，总之，一句话，父级如果产生了堆叠上下文，子级想要挣脱，对不起，必须听老子的。</p>
<p>好了，终于理清这个堆叠上下文的问题了，所以平时遇到那些奇怪的问题，试来试去，原来是一个css属性设置的原因造成的。</p>
<p>另外思考一个问题，当一个块级子级元素设置<code v-pre>width:100%</code>与不设置<code v-pre>width</code>，当我们对该元素设置<code v-pre>margin</code>时，此时会发生什么？元素本身的宽度是怎么样的，这是一个我们经常遇到的一个问题，想清楚了，貌似你会对<code v-pre>margin</code>的作用会有更深的认识。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>fixed失效的原因，主要是由于产生堆叠上下文造成的</li>
<li>理解堆叠上下文，什么条件会形成堆叠上下文</li>
<li>形成堆叠上下文主要由以下几种
<ul>
<li>文档流破坏：<code v-pre>float+margin</code>,定位<code v-pre>postion</code></li>
<li>css新特性：<code v-pre>transform</code>、<code v-pre>filter</code>会产生堆叠上下文</li>
</ul>
</li>
<li>同一个元素同时使用<code v-pre>poistion</code>与<code v-pre>transform</code>哪个优先级更高权重更大，首先是会执行定位，然后再执行transform,因此定位的优先级更高，先执行，但是transform权重更大，会作用在定位之上</li>
<li>不同元素产生的堆叠上下文对子级元素造成的影响，如果一个父级产生堆叠上下文，那么它所有的子级元素都不会脱离父级，子元素设置的<code v-pre>fixed</code>会失效</li>
<li>最后安利张鑫旭老师的博文，文章很多思考来自<code v-pre>深入理解CSS中的层叠上下文和层叠顺序</code>这篇文章</li>
<li>本文示例源码<a href="'https://github.com/maicFir/lessonNote/tree/master/html/05-%E5%A0%86%E5%8F%A0%E4%B8%8A%E4%B8%8B%E6%96%87" title="code example">code example</a></li>
</ul>
</div></template>
