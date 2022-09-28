<template><div><blockquote>
<p><code v-pre>this</code>是一个比较迷惑的人是东西，尽管你对<code v-pre>this</code>有很多的了解，但是面试题里面考察<code v-pre>this</code>指向总会让你有种猜谜的感觉，知道一些，但是还是会出错，或许你猜对了，但是又好像解释不太清楚。</p>
</blockquote>
<p>嗯，不是你一个人这样，很多人都这样，包括我自己，本质上就是面试埋下的坑，让你跳进去，你想跳过去，那还是不太容易，真正对知识的理解与应用，绝不只是停留在概念与理念，也不是为了完成一道面试题，答不对也没关系，如果面试官给你耐心解释了这道题，那也是一次不错的学习机会。</p>
<p>正文开始...</p>
<p>在阅读本文之前，主要会从以下几点对<code v-pre>this</code>的思考</p>
<ul>
<li><code v-pre>this</code> 是什么时候产生的</li>
<li>迷惑的<code v-pre>this</code>在函数中的指向问题</li>
<li><code v-pre>箭头函数</code>中<code v-pre>this</code></li>
<li>常用改变<code v-pre>this</code>的指向方案</li>
</ul>
<h3 id="this这个是什么" tabindex="-1"><a class="header-anchor" href="#this这个是什么" aria-hidden="true">#</a> this这个是什么</h3>
<ul>
<li>全局this</li>
</ul>
<p>为了了解<code v-pre>this</code>,我们先看下<code v-pre>this</code>,新建一个<code v-pre>index.html</code>与<code v-pre>1.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>index.html</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>this<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./1.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们在浏览器打开时，我们会发现<code v-pre>this</code>是一个<code v-pre>window</code>对象
<img src="https://files.mdnice.com/user/24614/558ffd52-7b44-424f-bf7b-7c5d3143fc95.png" alt=""></p>
<p>如果我们在<code v-pre>终端</code>直接运行<code v-pre>1.js</code>呢
<img src="https://files.mdnice.com/user/24614/128b43b2-1a25-4a6d-9400-7796d4f42003.png" alt=""></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">[</span>Object<span class="token operator">:</span> <span class="token keyword">null</span> prototype<span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code v-pre>node</code>环境下，全局的<code v-pre>this</code>居然是一个<code v-pre>{}</code>对象</p>
<ul>
<li>严格模式下函数内部的<code v-pre>this</code></li>
</ul>
<p>现在我们在<code v-pre>js</code>的最顶部使用<code v-pre>use strict</code>采用严格模式。</p>
<p>我们在函数内部写一个<code v-pre>this</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"use strict"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">"Maic"</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// undefined</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
<span class="token punctuation">}</span>
<span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>严格模式</code>下函数内部会是<code v-pre>undefined</code>,并且访问<code v-pre>publicName</code>会直接报错
<img src="https://files.mdnice.com/user/24614/2ca96a23-c428-4d5e-88b1-ce418cb6e11b.png" alt=""></p>
<p>为啥<code v-pre>use strict</code>严格模式下全局<code v-pre>this</code>无法访问</p>
<p>于是查找资料寻得，严格模式主要有以下特征</p>
<ul>
<li>
<p>未提前申明的变量不能使用，会报错</p>
</li>
<li>
<p>不能用<code v-pre>delete</code>删除对象的属性</p>
</li>
<li>
<p>定义的变量名不能重复申明</p>
</li>
<li>
<p>函数内部的<code v-pre>this</code>不再指向全局对象</p>
</li>
</ul>
<p>还有其他的更多的参考<a href="https://www.runoob.com/js/js-strict.html" title="js-script" target="_blank" rel="noopener noreferrer">js-script<ExternalLinkIcon/></a></p>
<h3 id="this的指向" tabindex="-1"><a class="header-anchor" href="#this的指向" aria-hidden="true">#</a> this的指向</h3>
<p>在这之前我们很基础的了解到在非严格模式下<code v-pre>this</code>指向的是<code v-pre>window</code>或者<code v-pre>{}</code>对象,在普通函数中<code v-pre>this</code>的指向是<code v-pre>window</code>全局对象</p>
<p>而你通常会看到<code v-pre>this</code>的指向并不都是指向全局对象，而是动态变化的，正因为它会变化，所以令人十分费脑壳</p>
<ul>
<li>非严格模式普通函数<code v-pre>this</code>指向</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// window</span>
    <span class="token comment">// console.log(this.publicName);</span>
<span class="token punctuation">}</span>
<span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在普通函数内部<code v-pre>this</code>指向的是<code v-pre>window</code>对象</p>
<ul>
<li>构造函数的<code v-pre>this</code>指向</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Web技术学苑'</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">'111'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">,</span> <span class="token string">'222'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Person { age: 10, name: 'Web技术学苑' }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/a6f1ff2e-478d-4754-8a9d-dd7a63c735e9.png" alt=""></p>
<p>至此你会发现，构造函数内部的<code v-pre>this</code>居然就是实例化的那个对象<code v-pre>person</code></p>
<ul>
<li>对象定义的内部函数</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">'--useInfo'</span><span class="token punctuation">)</span> <span class="token comment">// Jack</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
userInfo<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不出意外打印都知道肯定<code v-pre>publicName</code>肯定是<code v-pre>Jack</code>,内部的<code v-pre>this</code>也是指向<code v-pre>userInfo</code></p>
<h3 id="箭头函数的this" tabindex="-1"><a class="header-anchor" href="#箭头函数的this" aria-hidden="true">#</a> 箭头函数的this</h3>
<p>但是如果改成下面这种呢</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">"Maic"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">,</span> <span class="token string">'---useInfo'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
userInfo<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个很迷惑的问题，箭头函数不是没有自己的<code v-pre>this</code>吗，而且这里是<code v-pre>userInfo.getName()</code>这不是一个隐式调用吗？应也是<code v-pre>userInfo</code>这个对象才对，但是并不是，当改成箭头函数后，内部的<code v-pre>this</code>居然变成了全局的<code v-pre>window</code>对象了</p>
<p>我们看下<code v-pre>babel</code>对上面一段代码编译成<code v-pre>es5</code>的代码
<img src="https://files.mdnice.com/user/24614/79c0a778-f062-4ca6-9965-b7264b74fcd1.png" alt=""></p>
<p>es6代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">,</span> <span class="token string">'---useInfo'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
userInfo<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的代码，大概就是下面这样的了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> _this <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">"Maic"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">"Jack"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_this<span class="token punctuation">.</span>publicName<span class="token punctuation">,</span> <span class="token string">"---useInfo"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
userInfo<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实箭头函数是非常迷惑人的，而且外面是一个被调用的是一个对象，所以时常会给人一种幻觉，我们常听到一句<code v-pre>this</code>指向的是被调用的那个对象，那么这里<code v-pre>箭头函数</code>的<code v-pre>this</code>指向的是<code v-pre>window</code>，而<code v-pre>const</code>定义的变量会被转换成<code v-pre>var</code></p>
<p>那怎么能让<code v-pre>getName</code>指向的是本身自己的<code v-pre>useInfo</code>呢</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">,</span> <span class="token string">'---useInfo'</span><span class="token punctuation">)</span> <span class="token comment">// Jack</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
userInfo<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你看当我把箭头函数改成普通函数，这个普通函数内部的<code v-pre>this</code>就指向<code v-pre>userInfo</code>了</p>
<p><code v-pre>this</code>指向被调用的那个对象貌似这句话后又在此时好像又是正确的</p>
<p>我们接下来看下下面一种情况</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">,</span> <span class="token string">'---useInfo'</span><span class="token punctuation">)</span> <span class="token comment">// Jack</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> user <span class="token operator">=</span> userInfo<span class="token punctuation">.</span>getName<span class="token punctuation">;</span>
<span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么此时<code v-pre>getName</code>内部的<code v-pre>this</code>又是谁呢？
<img src="https://files.mdnice.com/user/24614/745a5e7e-e19a-4901-91f4-2cc94d16e152.png" alt="">
此时你会发现打印的是<code v-pre>Maic</code></p>
<p>此时会发现<code v-pre>this</code>指向的是<code v-pre>window</code>,也就是说指向的那个被<code v-pre>调用者</code>，那<code v-pre>被调用者</code>是谁？</p>
<p>上面那段代码同等于下面，你仔细看</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span> <span class="token comment">// var 定义，实际上等同于window.publicName = publicName</span>
<span class="token keyword">function</span> <span class="token function">getName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">,</span> <span class="token string">'---useInfo'</span><span class="token punctuation">)</span> <span class="token comment">// Jack</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
    getName
<span class="token punctuation">}</span>
<span class="token comment">// var user = userInfo.getName;</span>
<span class="token comment">// or 等价于</span>
<span class="token comment">// window.user = userInfo.getName;</span>
<span class="token comment">// or 进一步等价</span>
window<span class="token punctuation">.</span><span class="token function-variable function">user</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">getName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">,</span> <span class="token string">'---useInfo'</span><span class="token punctuation">)</span> <span class="token comment">// Jack</span>
<span class="token punctuation">}</span>
<span class="token comment">// user();</span>
<span class="token comment">// or 等价于</span>
window<span class="token punctuation">.</span><span class="token function">user</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以你现在是不是很清晰明白<code v-pre>this</code>指向的也是被调用的那个对象<code v-pre>window</code>了</p>
<p>但是有一点必须申明，必须在非严格模式下,此时的<code v-pre>this</code>才会指向<code v-pre>window</code>。</p>
<h3 id="迷失中的this指向" tabindex="-1"><a class="header-anchor" href="#迷失中的this指向" aria-hidden="true">#</a> 迷失中的this指向</h3>
<p>在这之前我们了解到非严格模式下</p>
<ul>
<li>普通函数内部的<code v-pre>this</code>指向的是<code v-pre>window</code>对象</li>
<li>构造函数内的<code v-pre>this</code>指向的是实例化的那个对象</li>
<li>普通申明的对象，如果调用的方法是箭头函数，那么内部<code v-pre>this</code>指向的是全局对象，如果不是那么指向的是被调用本身的那个对象</li>
</ul>
<p>我们再来看下那些面试题中很迷惑的<code v-pre>this</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span>
        <span class="token function-variable function">b</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>a<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Tom</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没错，你看到的这个打印是<code v-pre>Tom</code>,这里直接调用的是<code v-pre>b</code>这个方法，被调用的是<code v-pre>user.a</code>这个对象，所以在<code v-pre>b</code>这个方法内部的<code v-pre>this</code>指向了<code v-pre>a</code>对象</p>
<p>如果是箭头函数呢</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">"Maic"</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
<span class="token keyword">var</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span>
        <span class="token function-variable function">b</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>a<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Maic</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们会发现通过<code v-pre>babel</code>转换后会是这样的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> _this <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Jack"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Tom"</span><span class="token punctuation">,</span>
    <span class="token function-variable function">b</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_this<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以依然箭头函数内部依然是个全局对象<code v-pre>window</code></p>
<p>我们接下来看一道真实的面试题</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token function-variable function">b</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">c</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> objb <span class="token operator">=</span> obj<span class="token punctuation">.</span>b<span class="token punctuation">;</span>
<span class="token keyword">var</span> objc <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
objc<span class="token punctuation">.</span>b <span class="token operator">=</span> obj<span class="token punctuation">.</span>b<span class="token punctuation">;</span>
<span class="token keyword">const</span> t <span class="token operator">=</span> objc<span class="token punctuation">.</span>b<span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
obj<span class="token punctuation">.</span><span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token function">objb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
objc<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
obj<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
obj<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>objc<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
<span class="token function">t</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我想信绝大大部分第一个<code v-pre>obj.b()</code>肯定是可以正确答出来，但是后面的貌似有些迷惑人，时常会让你掉进坑里</p>
<p>我们先看结论打印的依次肯定是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>obj.b()</code>的调用实际上在之前例子已经有讲，<code v-pre>b</code>方法是一个普通方法，内部<code v-pre>this</code>指向的就是被调用的<code v-pre>obj</code>对象，所以此时内部访问的<code v-pre>a</code>属性就是对象<code v-pre>obj</code></p>
<p><code v-pre>var objb = obj.b</code>,当我们看到这样的代码时，其实这段代码可以拆分以下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span>objb <span class="token operator">=</span> b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本质上就是将对象<code v-pre>obj</code>的一个方法<code v-pre>b</code>赋值给了<code v-pre>window.objb</code>的一个属性</p>
<p>所以<code v-pre>objb()</code>的调用也是<code v-pre>window.objb()</code>，<code v-pre>objb</code>方法内部<code v-pre>this</code>自然指向的就是<code v-pre>window</code>对象，而我们用<code v-pre>var a = 2</code>这个默认会绑定在<code v-pre>window</code>对象上</p>
<p><code v-pre>obj.c()</code>，因为<code v-pre>c</code>是一个箭头函数，所以内部的<code v-pre>this</code>就是指向的全局对象</p>
<p><code v-pre>obj.b.call(null)</code>这个<code v-pre>null</code>是非常迷惑人，通常来说<code v-pre>call</code>不是改变函数内部<code v-pre>this</code>的指向吗，但是这里,如果<code v-pre>call(null)</code>实际上会默认指向<code v-pre>window</code>对象</p>
<p><code v-pre>objc.b()</code>这打印的是3,其实与<code v-pre>objb</code>的赋值有异曲同工之笔</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">var</span> objc <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
objc<span class="token punctuation">.</span>b <span class="token operator">=</span> obj<span class="token punctuation">.</span>b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本质上就在<code v-pre>objc</code>动态的新增了一个属性<code v-pre>b</code>，而这个属性<code v-pre>b</code>赋值了一个方法，也就是下面这样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>objc<span class="token punctuation">.</span><span class="token function-variable function">b</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
objc<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是<code v-pre>const t = objc.b</code>,至此你会发现，当我们执行<code v-pre>t()</code>时，此时打印的却是<code v-pre>2</code>那是因为<code v-pre>const t</code>定义的变量会编译成<code v-pre>var</code>从而t变量变成一个全局的window对象下的属性，本质上等价下面</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token comment">// const t = objc.b</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token comment">/* 
等价于下面
var t = function() {
  console.log(this.a)
}
*/</span>
<span class="token comment">// 本质上就是</span>
window<span class="token punctuation">.</span><span class="token function-variable function">t</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>多层对象嵌套下的<code v-pre>this</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> nobj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'1'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'2'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'3'</span><span class="token punctuation">,</span>
            <span class="token function-variable function">c</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nobj<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b<span class="token punctuation">.</span><span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上的结果是3，实际上我们从之前案例中明白，非严格模式下<code v-pre>this</code>指向<code v-pre>被调用</code>那个对象</p>
<p>所以你可以把上面那段代码看成下面这样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">(</span>nobj<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//3</span>
<span class="token comment">//or 相当于</span>
<span class="token comment">/*
*
  var n = nobj.a.b;
  n.c()
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="改变this对象的指向" tabindex="-1"><a class="header-anchor" href="#改变this对象的指向" aria-hidden="true">#</a> 改变this对象的指向</h3>
<p>这个相信很多小伙伴已经耳熟能祥了，<code v-pre>call</code>,<code v-pre>apply</code>,<code v-pre>bind</code>，能手撕<code v-pre>call</code>,<code v-pre>apply</code>,<code v-pre>bind</code>的文章已经不计其数</p>
<p>这里就只讲解如何使用，以及他们在业务中的一些具体使用场景</p>
<ul>
<li>call</li>
</ul>
<p>用一段伪代码举证以下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// index.vue</span>
<span class="token keyword">import</span> configOption <span class="token keyword">from</span> <span class="token string">'./config'</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'index'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token function">optionsBtnGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">return</span> <span class="token function">configOption</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleEdit</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">handleDelete</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的<code v-pre>template</code>可能就是下面这样几个按钮</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript:void(0)<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in optionsBtnGroup<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.handle(item.id)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item.text}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再来看下<code v-pre>config.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'编辑'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
      <span class="token function-variable function">handle</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleEdit</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'删除'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">234</span><span class="token punctuation">,</span>
      <span class="token function-variable function">handle</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleDelete</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正因为在计算属性中用了<code v-pre>call</code>所以在<code v-pre>config.js</code>中才能访问外部<code v-pre>methods</code>的方法，有些人看到这样的代码肯定会说，两个按钮这么搞配置，代码反而多了这么多，还不如模版上放两个按钮完事</p>
<p>是的，确实是，当我们为了使用<code v-pre>call</code>而使用反而增加了业务代码的维护成本，正常情况还是建议不要写出上面那段<code v-pre>坏代码的味道</code>，我们只要明白在什么时候可以用，什么可以不用就行，不要为了使用而使用，反而本末倒置。</p>
<p>但是有时候如果业务复杂，你想隔离业务的耦合，达到通用，<code v-pre>call</code>能帮你减少不少代码量</p>
<ul>
<li>apply</li>
</ul>
<p><code v-pre>apply</code>也是可以改变<code v-pre>this</code>对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">getName</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">,</span> <span class="token string">'---useInfo'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['hello', 'world']</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>userInfo<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token string">'world'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>apply</code>会立即执行该函数，如果传入的首个参数是<code v-pre>null</code>或者<code v-pre>undefined</code>，那么此时内部<code v-pre>this</code>指向的是<code v-pre>window</code></p>
<p>另外还有一个方法可以让函数立即执行，也能改变当前函数<code v-pre>this</code>指向</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">var</span> publicName <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>publicName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">Reflect</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>test<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">publicName</span><span class="token operator">:</span> <span class="token string">'aaa'</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// aaa [1,2,3]</span>
<span class="token function">Reflect</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>test<span class="token punctuation">,</span> window<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// Maic ['a', 'b', 'c']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>bind</li>
</ul>
<p>这也是可以改变<code v-pre>this</code>指向，不过会返回一个新函数，我们常常在<code v-pre>react</code>中发现这样用<code v-pre>bind</code>显示绑定方案。</p>
<p>我们写个简单的例子，尝试改变页面背景，切换肤色</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// body</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">===</span> <span class="token string">'red'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'green'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/2a25cf7b-b896-453a-a920-e1438109166b.png" alt="">
<img src="https://files.mdnice.com/user/24614/fbf66ac5-5800-47a3-88c1-bd0faee76957.png" alt=""></p>
<p>可以切换背景肤色</p>
<p>以上貌似没有问题,但是你可能会写这样的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span>  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">===</span> <span class="token string">'red'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'green'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时内部的<code v-pre>this</code>一定指向的<code v-pre>window</code>,而且<code v-pre>内部访问style</code>报错</p>
<p>于是你会改成这样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">===</span> <span class="token string">'red'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'green'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> fn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是的，这样是可以的，本质上就是一个<code v-pre>fn</code>的形参，内部<code v-pre>this</code>指向仍然是<code v-pre>document.body</code></p>
<p>于是为了借助<code v-pre>bind</code>，你可以这么做</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> body <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">===</span> <span class="token string">'red'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'green'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span>
body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> fn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这么做也是ok的</p>
<p>不知道你有没有疑问，为什不像下面这么做呢?</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> body <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">===</span> <span class="token string">'red'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'green'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你仔细看下，其实<code v-pre>fn</code>内部<code v-pre>this</code>指向是<code v-pre>window</code>，所以这是一个常会犯的错误。</p>
<p>还有为啥不是像下面这样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> body <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">===</span> <span class="token string">'red'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'green'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上功能没有任何问题，但是我们每次点击都会调用bind,从而返回一个新的函数，所以这种方式虽然效果一样，但是性能远不如第一种，为了更好理解，你可以写成下面这样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> body <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">===</span> <span class="token string">'red'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'green'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> callback <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span>
body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> callback<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>了解<code v-pre>this</code>怎么产生的，通常情况<code v-pre>this</code>在非严格模式下，指向的是全局<code v-pre>window</code>对象，在严格模式下，普通函数内的<code v-pre>this</code>不是全局对象</p>
</li>
<li>
<p>迷惑的<code v-pre>this</code>指向问题，正常情况<code v-pre>this</code>指向的是被调用的那个对象，但是如果是箭头函数，那么指向的是全局对象<code v-pre>window</code></p>
</li>
<li>
<p><code v-pre>bind</code>,<code v-pre>call</code>, <code v-pre>apply</code>改变<code v-pre>this</code>指向</p>
</li>
<li>
<p><a href="https://github.com/maicFir/lessonNote/tree/master/javascript/05-this" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
<li>
<p>推举一篇关于阮一峰老师<a href="https://wangdoc.com/javascript/oop/this.html" title="this" target="_blank" rel="noopener noreferrer">this<ExternalLinkIcon/></a>的博文</p>
</li>
</ul>
</div></template>
