<template><div><p>面向对象对每一个程序员来说，非常熟悉，在 C 语言里，我们说它是面向过程，在<code v-pre>java</code>中我们熟悉的面向对象的三大特征中<code v-pre>封装</code>、<code v-pre>继承</code>、<code v-pre>多态</code>，<code v-pre>java</code>是高级语言，在<code v-pre>BS</code>架构中，后端语言用<code v-pre>java</code>等语言运行在服务器上，而在离用户端最近的<code v-pre>B</code>端，<code v-pre>js</code>中也有面相对象。</p>
<p>今年回家又相亲吗？在过年回家的路上，我们来聊聊我理解中的面相对象，这个对象比较轻松，那个悲伤的话题打住，正文开始...</p>
<p><img src="https://img.soogif.com/FnFUineq18gfz95ZPpsUBixKVE8gsReq.gif?scope=mdnice" alt=""></p>
<p>在<code v-pre>js</code>中申明一个对象我们可以 🈶️ 以下几种方式:</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1:申明一个对象</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 2:构造函数new</span>
<span class="token keyword">function</span> Animal <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> animal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 3:new Object</span>
<span class="token keyword">var</span> cat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 4: class</span>
<span class="token keyword">class</span> <span class="token class-name">Maic</span> <span class="token punctuation">{</span>
   <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">我的名字：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'吃饭了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'说话了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 5.Object.create({})</span>
<span class="token keyword">var</span> jd <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h3>
<p>我们用以上申明对象，其实第一种与第三种是一样的，通常来讲第一种方式用的多，两者构造函数都是<code v-pre>Object</code>,你可以理解第一种方式是第三种方式的简写。</p>
<p>而第二种方式<code v-pre>function Animal</code>这是申明一个构造函数，一般构造函数都是大写字母开头，为了与普通函数的区别，在我没有<code v-pre>new</code>的时候，它就是个普通函数，但是如果我对它进行了<code v-pre>new Animal</code>操作，那么此时，性质就变味了，此时我变成了一个对象。</p>
<p>第四种是<code v-pre>es6</code>的一种新的方式，本质上可以理解为定义构造函数的变体。但是<code v-pre>class</code>这种方式让你组织你的代码更加优雅。</p>
<p><code v-pre>js</code>语言借鉴了<code v-pre>java</code>思想，但又与<code v-pre>java</code>还是有些不同，有人把<code v-pre>js</code>定义为解释性语言，就是不需要编译，直接在浏览器端引入一段脚本就能跑，当然底层的那些是<code v-pre>chrome</code>内核帮我们做了解析。对于<code v-pre>web</code>开发者来说，我只要保证写的<code v-pre>js</code>脚本能跑通就行。</p>
<p>既然借鉴了<code v-pre>java</code>的对象思想，那么又是如何体现？</p>
<p>设计语言的大师把现实中所有物质，一切皆可用对象来描述。我们可以把这个对象理解成一个抽象的空间，而这个空间里有人，人有名字，可以吃饭，可以说话等等。</p>
<p>在代码中，我是如何去描述呢？我们先用用第二种方式构造函数去描述</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义空间</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span> <span class="token comment">// 人的名字</span>
  <span class="token comment">// 可以说话</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">我的名字：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 可以吃饭</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">eat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">今天我要吃黄焖鸡</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'Maic'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> person2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'张三'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>我们可以测试一下脚本，将这段代码 copy 到控制台上可以知道</p>
<details class="custom-container details"><summary>code</summary>
<p><img src="https://files.mdnice.com/user/24614/2902dd05-675d-4926-881e-62d018f3a0bb.png" alt=""></p>
</details>
<p>在控制台上，我们可以验证对象的构造函数是谁？</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 获取person的构造函数</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Person</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person2<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Person</span>
<span class="token comment">// 我们每new一个构造函数，实际上person2和person就是不一样的，但是他们属性和方法却可以是一样的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>从上面例子我们已经知道构造函数有个特点：</p>
<p>1、内部有<code v-pre>this</code>，这个<code v-pre>this</code>其实指向的就 new 操作后的实例对象</p>
<p>2、生成对象时，必须<code v-pre>new</code>构造函数</p>
<p>在我们用<code v-pre>new</code>操作后，这个<code v-pre>person</code>对象就具备了空间属性，有名字，可以说话，可以吃饭，而通常我们把名字比喻成属性，说话和吃饭就是动作，可以比作方法。在面相对象中，描述一个事物的特征有两个特性，对象属性和方法。</p>
<p>而对象属性和方法，在面相对象中有私有属性、公有属性、私有方法，公用方法、以及静态方法、并且还可以继承，有了这些、从而实现了封装、继承、多肽。从而让代码变得更抽象、更模块化、更易于维护。</p>
<p>有人说代码写得好的，就像是在写诗，因为没有一句废话、高度复用，可扩展性强，健壮、抽象，在你读优秀框架作者的源码时，你会就发现，世界就是你，你就是世界。</p>
<h3 id="new" tabindex="-1"><a class="header-anchor" href="#new" aria-hidden="true">#</a> new</h3>
<p>在我们<code v-pre>new</code>构造函数后，我们探究下，这个<code v-pre>new</code>背后做了啥？</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span> <span class="token comment">// 人的名字</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">我的名字：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string">'Maic'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>没有<code v-pre>new</code>时，直接把<code v-pre>Person</code>当方法了,我们看下打印结果
<img src="https://files.mdnice.com/user/24614/ac96324a-a3df-4b87-b58d-6c77337e7998.png" alt="">
不可思议的就是这个方法内部的<code v-pre>this</code>指向的是全局<code v-pre>window</code>对象。</p>
<p>这里扩展一点，我们用<code v-pre>var person = Person('Maic');</code>实际上就是用<code v-pre>var</code>这个关键词在<code v-pre>全局作用域</code>下开辟了一块空间。其实<code v-pre>function fnName()</code>也是开辟了一个局部作用域空间。用不同的关键词定义就形成特殊的空间，因为还有<code v-pre>块级作用域</code>一说。</p>
<p>在这个未使用<code v-pre>new</code>操作符的普通函数，内部的<code v-pre>this</code>指向就是那个被调用者。在你定义函数，定义变量时，我们可以看下那个隐藏的被调用者究竟是谁？</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'这里的this是啷个'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">'this是window唛:'</span> <span class="token operator">+</span> window <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Person <span class="token keyword">in</span> window<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'function 定义Person就是window里面'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> xiaobai <span class="token operator">=</span> <span class="token string">'大佬666'</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>xiaoqi <span class="token operator">=</span> <span class="token string">'大佬777'</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>xiaobai<span class="token punctuation">,</span> <span class="token string">'111'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined  111</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>xiaoqi<span class="token punctuation">,</span> <span class="token string">'222'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 大佬777  222</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person<span class="token punctuation">;</span>
<span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'var person'</span><span class="token punctuation">,</span> person <span class="token keyword">in</span> window<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/*
  打印的结果下面：
  1 '这里的this是啷个[object Window]' false
  3 'var person' true
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><img src="https://files.mdnice.com/user/24614/859c2a83-cffd-4822-806f-f989194e2b03.png" alt="">
我们发现 3 打印的是<code v-pre>true</code>,但是函数内部打印的 this 并不等于<code v-pre>window</code></p>
<p>我们要知道函数内就是一个独立的作用域，在函数内<code v-pre>var</code>定义变量就是一个私有的，如果你想在函数外部访问，对不起，没门，函数内部可以访问外部变量，但是函数内部变量不能在外部访问，举个例子，理解下</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> actions <span class="token operator">=</span> <span class="token string">'完美世界'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>actions<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Uncaught ReferenceError: actions is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>不出意外，<code v-pre>actions</code>提示为未定义，因为函数内作用域的属性，无法直接被外部访问。</p>
<p>但是函数外部变量，却可以在内部访问，因为函数外部的变量能被局部作用域访问。</p>
<p>你可以把定义函数的区域理解成一个独立城堡，而函数外部就是城门外面，只进不出。</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> actionsA <span class="token operator">=</span> <span class="token string">'星辰变'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> actions <span class="token operator">=</span> <span class="token string">'完美世界'</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>actionsA<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 星辰变</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>actions<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Uncaught ReferenceError: actions is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>我们举例这么多就是为了验证函数那句<code v-pre>window === this</code>为<code v-pre>false</code>,其实函数内部的<code v-pre>this</code>不是由函数自己内部而定义，它的指向是函数真正被调用那个对象。</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>等价于</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
window<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>所以函数内部指向的是 window,所以你可以看到,<code v-pre>window.xiaoqi</code>就是函数内部的<code v-pre>this.xiaoqi</code>,而内部定义的局部变量<code v-pre>var xiaobai</code>打印却是<code v-pre>undefined</code>,后续可以写一篇关于作用域的理解。这里发散得有点远。</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'这里的this是啷个'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">'this是window唛:'</span> <span class="token operator">+</span> window <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Person <span class="token keyword">in</span> window<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'function 定义Person就是window里面'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> xiaobai <span class="token operator">=</span> <span class="token string">'大佬666'</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>xiaoqi <span class="token operator">=</span> <span class="token string">'大佬777'</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>xiaobai<span class="token punctuation">,</span> <span class="token string">'111'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined  111</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>xiaoqi<span class="token punctuation">,</span> <span class="token string">'222'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 大佬777  222</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person<span class="token punctuation">;</span>
<span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>如果我想要一个函数可以当成一个正常的对象用，那要怎么办呢？</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> leavel</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果错误把构造函数当成方法使用了，判断当前函数内部的this的构造函数是否是Person</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Person</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> leavel<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>leavel <span class="token operator">=</span> leavel<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> t <span class="token operator">=</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token string">'石昊'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'澜叔'</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 石昊</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>leavel<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>另外有一点要注意，在严格模式下，函数内部<code v-pre>this</code>不能指向全局那个被调用的对象,因为此时<code v-pre>this</code>指向的是<code v-pre>undefined</code>,而<code v-pre>undefined</code>不能动态添加属性。</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token string">'use strict'</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'大佬'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Cannot set properties of undefined (setting 'name')</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>在了解没有<code v-pre>new</code>操作背后，那个<code v-pre>this</code>就是指向函数的被调用者。那么用<code v-pre>new</code>后呢。</p>
<p>我们打印一下<code v-pre>new Person('石昊',1)</code>
<img src="https://files.mdnice.com/user/24614/0b6e8150-be93-473f-91ff-3661a29d1c5d.png" alt=""></p>
<p>我们仔细发现，<code v-pre>t</code>这个实例对象的构造函数就是<code v-pre>Person</code>,我们可以总结以下几点
1、创建一个空间、返回一个对象实例</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>2、将空间对象的原型指向构造函数的<code v-pre>prototype</code></p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// t.__prototype ==== Person.prototype  true</span>
<span class="token comment">// Person.prototype.constructor === t.__proto__.constructor  true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>3、指定内部<code v-pre>this</code>对象，构造函数内部的<code v-pre>this</code>就是<code v-pre>t</code></p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span> <span class="token comment">// this ==== 外面的t</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>4、执行构造函数体内部代码</p>
<p>在构造函数内部，我们没有任何返回值，当实例化后，当前构造函数的 this 就是那个实例对象，如果我返回是其他对象呢？</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">shop</span><span class="token operator">:</span> <span class="token string">'沃尔玛'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">'福田路38号'</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'唐三'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token class-name">__proto__</span><span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Person</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>在<code v-pre>new</code>构造函数，如果构造函数没有返回任何值，那么就是<code v-pre>new</code>实例返回始终是一个对象。如果返回的是非对象，那么会忽略。</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'唐三'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//唐三</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="实现-new" tabindex="-1"><a class="header-anchor" href="#实现-new" aria-hidden="true">#</a> 实现 new</h3>
<p>以上我们已经知晓了<code v-pre>new</code>的操作步骤，现在有个面试题，实现一个<code v-pre>new</code>操作符。</p>
<p>笔者在以前面试题被问了这个问题后，曾经一脸懵，我回答面试官，<code v-pre>new</code>就是一个关键字，怎么实现，这是他语法规定的啊？我心中万马奔腾，但是这肯定不是他想要的答案，直到今日终于可以手写一个了<code v-pre>new</code>操作符了。
我们仔细观察下下面的原生<code v-pre>new</code>的过程</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>下面开始了</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// constructor是构造函数类比Person</span>
<span class="token comment">// params是参数类比name</span>
<span class="token keyword">function</span> <span class="token function">mynew</span><span class="token punctuation">(</span><span class="token parameter">constructor<span class="token punctuation">,</span> params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取参数集合，将参数slice复制操作，转换成数组</span>
  <span class="token keyword">const</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 获取构造函数,第一个参数</span>
  <span class="token keyword">var</span> curentConstrouctor <span class="token operator">=</span> args<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 需要创建一个空间对象，继承构造函数的prototype属性</span>
  <span class="token keyword">var</span> ctx <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>curentConstrouctor<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// todo 等价下面</span>
  <span class="token comment">/*
    const ctx = Object.create({});
    ctx.__prototype__ = curentConstrouctor.prototype;
    // or ctx.__prototype__ = curentConstrouctor.prototype.constructor
  */</span>
  <span class="token comment">// 执行构造函数，改变构造函数内部的this</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token function">curentConstrouctor</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> ret <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> ret <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ctx<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> t <span class="token operator">=</span> <span class="token function">mynew</span><span class="token punctuation">(</span>Person<span class="token punctuation">,</span> <span class="token string">'唐三'</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// console.log(t) Person {name: '唐三', age: 18}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><code v-pre>new</code>操作后，实际上实例对象的<code v-pre>隐式__prototype__</code>指向的就是<code v-pre>构造函数Person的Prototype</code></p>
<h3 id="简式声明对象" tabindex="-1"><a class="header-anchor" href="#简式声明对象" aria-hidden="true">#</a> 简式声明对象</h3>
<p>说完了<code v-pre>new</code>操作符，来了解下项目中高频创建对象</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token string">'18'</span><span class="token punctuation">,</span>
  <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'说话了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'吃饭了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 2</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 3</span>
<span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> test <span class="token operator">=</span> <span class="token string">'TEST'</span><span class="token punctuation">;</span>
  <span class="token keyword">static</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> parent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Parent</span><span class="token punctuation">(</span><span class="token string">'Maic'</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Parent<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>1、面向对象思想，具有一个抽象事物描述事情的特征，属性方法。有<code v-pre>java</code>继承、封装思想。</p>
<p>2、函数作用域概念，在函数作用域内部，可以访问外部函数变量，但是函数外部无法访问函数内部变量。</p>
<p>3、构造函数内部 this 指向，在<code v-pre>new</code>后，对象实例的<code v-pre>__prototype__</code>指向的就是构造函数的<code v-pre>prototype</code>，当前构造函数内部<code v-pre>this</code>指向的就是构造函数的实例对象。</p>
<p>4、<code v-pre>new</code>实现原理，本质上就是返回一个对象，将该对象的隐式原型指向构造函数。</p>
<p>5、常见的几种申明对象。</p>
<p>6、本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/javascript/03-%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1" target="_blank" rel="noopener noreferrer">code-example<ExternalLinkIcon/></a></p>
</div></template>
