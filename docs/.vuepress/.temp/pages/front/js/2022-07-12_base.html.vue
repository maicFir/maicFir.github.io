<template><div><p>js 的<code v-pre>浅拷贝</code>与<code v-pre>深拷贝</code>在业务中时常有用到，关于<code v-pre>浅拷贝</code>与<code v-pre>深拷贝</code>的剖析文章层出不穷，本文是笔者对于深拷贝与浅拷贝的理解，一起来夯实 js 语言基础知识的理解吧。</p>
<p>正文开始...</p>
<p>在阅读文章之前，本文主要从以下几个方面去探讨</p>
<ul>
<li>
<p>为什么会有浅拷贝与深拷贝</p>
</li>
<li>
<p>浅拷贝是什么，深拷贝又是什么</p>
</li>
<li>
<p>浅拷贝与深拷贝有何区别</p>
</li>
<li>
<p>写一个例子佐证以上所有的观点</p>
</li>
</ul>
<h3 id="为什么会有浅拷贝与深拷贝" tabindex="-1"><a class="header-anchor" href="#为什么会有浅拷贝与深拷贝" aria-hidden="true">#</a> 为什么会有浅拷贝与深拷贝</h3>
<p>我们知道在<code v-pre>js</code>中基础数据类型是存放在栈内存中的，而引用数据类型是存放在栈地址引用的一个堆内存中。为什么两种数据会存放方式不同？这是一个值的思考的问题？我的猜想，引用数据类型是复杂的数据结构，本质上也是存放栈地址的引用，只是这个地址指向了另外一个堆内存空间，如果他们都是放在一起的话，就不太好区分你是基础数据类型，还是引用数据类型了。</p>
<p>首先它们都是拷贝，一个是浅，一个是深，我们先说结论，浅拷贝是基础数据类型的拷贝，只会拷贝一层，如果遇到拷贝的数据是引用数据，那么浅拷贝的数据与原有数据是同一份引用。</p>
<p>而深拷贝是遇到引用数据类型会创建一个新的对象，遍历原有对象，对新对象进行动态赋值，修改新对象引用不影响原有对象的属性值</p>
<p>我们用一个图来解释上面两段比较长的话
<img src="https://files.mdnice.com/user/24614/836e7907-4d30-4b18-8b7c-3987e681fd17.png" alt=""></p>
<p>基础数据类型直接存放在栈地址内存中，而引用数据类型是存放在栈内存地址的引用中，这个引用实际上指向的区域是一块堆内存空间</p>
<p>在了解<code v-pre>浅拷贝</code>与<code v-pre>深拷贝</code>之前，我们先来了解下<code v-pre>值拷贝</code></p>
<h3 id="值拷贝" tabindex="-1"><a class="header-anchor" href="#值拷贝" aria-hidden="true">#</a> 值拷贝</h3>
<p>当我对原有基础数据类型与引用数据类型进行<code v-pre>赋值</code>时</p>
<p><img src="https://files.mdnice.com/user/24614/41233597-6a8c-4d4a-aa47-1b94d6b79d15.png" alt=""></p>
<p>用下面代码示例上图</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> userName <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'ping pang'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> cacheUserName <span class="token operator">=</span> userName<span class="token punctuation">;</span>
<span class="token keyword">var</span> cacheAge <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token comment">// 对象值拷贝</span>
<span class="token keyword">var</span> cacheUserInfo <span class="token operator">=</span> userInfo<span class="token punctuation">;</span>
cacheUserName <span class="token operator">=</span> <span class="token string">'Tom'</span><span class="token punctuation">;</span>
cacheAge <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
cacheUserInfo<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'jake'</span><span class="token punctuation">;</span>
cacheUserInfo<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
cacheUserInfo<span class="token punctuation">.</span>fav<span class="token punctuation">.</span>play1 <span class="token operator">=</span> <span class="token string">'swim'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>userName<span class="token punctuation">,</span> age<span class="token punctuation">,</span> userInfo<span class="token punctuation">,</span> <span class="token string">'------'</span><span class="token punctuation">,</span> cacheUserName<span class="token punctuation">,</span> cacheAge<span class="token punctuation">,</span> cacheUserInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后运行<code v-pre>node index.js</code>
从执行结果上来看</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Maic <span class="token number">18</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'jake'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'swim'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
Tom <span class="token number">20</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'jake'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'swim'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此可以得出结论</p>
<ul>
<li>
<p>基础数据类型的赋值，是值的拷贝，会重新开辟一个栈空间，新拷贝的值修改不会影响原有数据类型</p>
</li>
<li>
<p>引用数据类型的赋值，原有引用数据与新赋值的数据指向的是同一份地址，修改引用数据的属性会影响原来的</p>
</li>
</ul>
<p>以上是两种数据类型值的拷贝，貌似与浅拷贝还有离得有点远</p>
<h3 id="浅拷贝" tabindex="-1"><a class="header-anchor" href="#浅拷贝" aria-hidden="true">#</a> 浅拷贝</h3>
<p>于是我们看下对象扩展的<code v-pre>浅拷贝</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token comment">// 对象浅拷贝</span>
<span class="token keyword">var</span> cacheUserInfo <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>userInfo <span class="token punctuation">}</span>
<span class="token comment">// 与下面等价</span>
<span class="token comment">// var cacheUserInfo = Object.assign({}, userInfo);</span>
<span class="token comment">// 修改值拷贝后值</span>
cacheUserName <span class="token operator">=</span> <span class="token string">'Tom'</span><span class="token punctuation">;</span>
cacheAge <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
cacheUserInfo<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'jake'</span><span class="token punctuation">;</span>
cacheUserInfo<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
cacheUserInfo<span class="token punctuation">.</span>fav<span class="token punctuation">.</span>play1 <span class="token operator">=</span> <span class="token string">'swim'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>userName<span class="token punctuation">,</span> age<span class="token punctuation">,</span> userInfo<span class="token punctuation">,</span> <span class="token string">'------'</span><span class="token punctuation">,</span> cacheUserName<span class="token punctuation">,</span> cacheAge<span class="token punctuation">,</span> cacheUserInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我使用了<code v-pre>es6</code>对象扩展对原有对象进行拷贝，那么此时结果是怎么样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Maic <span class="token number">18</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'swim'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
Tom <span class="token number">20</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'jake'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'swim'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不知道注意到没有，在引用数据类型的第一级如果这个属性是基础数据类型，那么修改并不会影响原有的值，如果属性是引用数据类型，那么这层结构会是一个值拷贝，修改新赋值属性，会影响到原有的对象属性</p>
<p>我们看下图理解下
<img src="https://files.mdnice.com/user/24614/4bdc924c-dfc3-4d2b-8383-933c69fcfac0.png" alt=""></p>
<p>因此我们可以得出结论，浅拷贝如果遇到基础数据类型，那么修改新值，不会影响原有的值，但是如果数据是引用数据类型，那么新修改的值会影响原有的值，因为新修改的与原修改的是同一份引用。</p>
<p>所以<code v-pre>浅</code>拷贝只会拷贝一层，如果数据是引用数据类型，实际上会直接引用同一份数据。</p>
<h3 id="深拷贝" tabindex="-1"><a class="header-anchor" href="#深拷贝" aria-hidden="true">#</a> 深拷贝</h3>
<p>深拷贝顾名思义，从表现层来看就是，就是为了修改新数据而不影响原有数据而产生的。</p>
<p>我们举个栗子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'ping pang'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我需要修改<code v-pre>userInfo.fav.play1</code>的值，而不想影响原有<code v-pre>userInfo</code>对象的值，那么此时你就会想到深拷贝，那怎么深拷贝呢。</p>
<ul>
<li>方案 1</li>
</ul>
<p>利用<code v-pre>JSON.stringify(data)</code>拷贝对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">const</span> newUseInfo <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
newUseInfo<span class="token punctuation">.</span>fav<span class="token punctuation">.</span>play1 <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">,</span> <span class="token string">'----'</span><span class="token punctuation">,</span> newUseInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'ping pang'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们得考虑到<code v-pre>JSON.stringify</code>这种有种缺陷，必须是<code v-pre>json</code>对象，有其他比如<code v-pre>方法</code>这种会被自动过滤处理。而且如果<code v-pre>json</code>对象格式错误，就会抛出异常，所以我们看下另外一种方案。</p>
<ul>
<li>方案 2</li>
</ul>
<p>使用代理对象思想，将原有对象拷贝一份,然后再赋值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'ping pang'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav2</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">4</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">isType</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[object </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span><span class="token parameter">target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Object'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> cacheObj <span class="token operator">=</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
cacheObj<span class="token punctuation">.</span>fav<span class="token punctuation">.</span>play1 <span class="token operator">=</span> <span class="token string">'111'</span><span class="token punctuation">;</span>
cacheObj<span class="token punctuation">.</span>fav2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">'666'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">,</span> <span class="token string">'-----'</span><span class="token punctuation">,</span> cacheObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终结果是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'ping pang'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav2</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'666'</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'111'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav2</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'666'</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果数据中有数组，貌似数组的这种情况还是同一份值，那是因为直接赋值了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">function</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span><span class="token parameter">target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Object'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 是因为这里直接赋值了操作</span>
        ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>于是需要多加一个条件，需要对数组进行判断</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">isType</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[object </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Object'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Array'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断数组，并再次递归，用数组concat方法添加该数据</span>
        ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">deepMerge</span><span class="token punctuation">(</span>target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        ret<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> cacheObj <span class="token operator">=</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
cacheObj<span class="token punctuation">.</span>fav<span class="token punctuation">.</span>play1 <span class="token operator">=</span> <span class="token string">'111'</span><span class="token punctuation">;</span>
cacheObj<span class="token punctuation">.</span>fav2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">'666'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">,</span> <span class="token string">'----'</span><span class="token punctuation">,</span> cacheObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时结果</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'ping pang'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav2</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav3</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">play1</span><span class="token operator">:</span> <span class="token string">'111'</span><span class="token punctuation">,</span> <span class="token literal-property property">play2</span><span class="token operator">:</span> <span class="token string">'basket ball'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav2</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'666'</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fav3</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上用一个图来进一步理解下
<img src="https://files.mdnice.com/user/24614/029c9d84-414a-41e0-8f0e-4992f4195d25.png" alt=""></p>
<p>真是人才，深拷贝原来是这样的
<img src="https://img.soogif.com/jhGL7oasQxhulDjv5DXekXJGhO4XNwYE.gif?scope=mdnice" alt=""></p>
<h3 id="深拷贝与浅拷贝的区别" tabindex="-1"><a class="header-anchor" href="#深拷贝与浅拷贝的区别" aria-hidden="true">#</a> 深拷贝与浅拷贝的区别</h3>
<p>通过以上例子，我们已经知道</p>
<p><code v-pre>浅拷贝</code>如果拷贝对象内部的数据是基础数据类型，那么直接拷贝，新对象修改值，不会影响原有的值，如果拷贝的对象是一个引用数据类型，那么会是一个值的引用，此时新拷贝对象修改其值会影响原有的值。<code v-pre>浅拷贝</code>只会拷贝一层，拷贝的内部引用数据类型是同一份。</p>
<p><code v-pre>深拷贝</code>本质上就是无论原对象值是基础数据类型，还是引用数据类型，我新拷贝的对象修改对象内部的值，并不会影响原有对象的值</p>
<p>另外还要有一点<code v-pre>值拷贝</code>，也是赋值，基础数据类型赋值，新修改的数据不会影响原有的数据，但是如果是引用数据类型，那么新拷贝的值修改会影响原有数据</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>值拷贝（直接赋值操作），主要区分基础数据类型与引用数据类型，如果是基础数据类型，那么新值修改不会影响原有的值，但是如果引用数据类型，那么新修改的值会影响原有数据类型</p>
</li>
<li>
<p>浅拷贝，如果拷贝的对象内部属性是引用数据类型，那么像<code v-pre>es6</code>中的对象扩展符或者<code v-pre>Object.assign</code>都是浅拷贝操作，新拷贝的基础数据类型修改不会影响原有值，但是如果拷贝的是引用数据类型，那么新拷贝的值与原有值是同一份引用，新值修改会影响原有的值</p>
</li>
<li>
<p>深拷贝，一句话，新拷贝的对象修改值不会影响原有值</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/javascript/15-%E6%B7%B1%E6%8B%B7%E8%B4%9D%E4%B8%8E%E6%B5%85%E6%8B%B7%E8%B4%9D" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
