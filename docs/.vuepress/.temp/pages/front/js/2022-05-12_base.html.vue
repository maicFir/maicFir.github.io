<template><div><blockquote>
<p>闭包在程序中无处不在，通俗来讲<code v-pre>闭包就是一个函数对其周围状态的引用并捆绑在一起的一种组合</code>，你也可以理解成<code v-pre>一个函数被引用包围</code>或者是<code v-pre>一个内部函数能够访问外部函数的作用域</code></p>
</blockquote>
<p><code v-pre>闭包</code>是面试经常考的，也是了解一个程序员基础知识一个重要点，本篇是笔着对于<code v-pre>闭包</code>的理解，希望在实际项目中有所思考和帮助。</p>
<p>正文开始...</p>
<h3 id="闭包是什么" tabindex="-1"><a class="header-anchor" href="#闭包是什么" aria-hidden="true">#</a> 闭包是什么</h3>
<p>我们可以从以下几点来理解</p>
<ol>
<li>闭包是<code v-pre>一个函数</code>对其<code v-pre>周围状态</code>的<code v-pre>引用</code>并捆绑在一起的一种<code v-pre>组合</code></li>
<li><code v-pre>一个函数</code>被<code v-pre>引用</code>包围</li>
<li><code v-pre>一个内部函数</code>能访问<code v-pre>外部函数</code>的<code v-pre>作用域</code></li>
</ol>
<p>我们来看一张图理解下上面三句话
<img src="https://files.mdnice.com/user/24614/3bbe1caf-d3da-45a4-80b4-1c1353daf074.png" alt=""></p>
<p>对应代码如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
    age <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// console.log(name) name is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们注意到在<code v-pre>A</code>函数中，我们创建了两个内部的私有变量<code v-pre>name</code>
、<code v-pre>age</code>,并且我们在<code v-pre>A</code>函数中创建一个内部函数<code v-pre>B</code>，此时在<code v-pre>B</code>函数中，我们会发现在<code v-pre>B</code>内部可以访问它<code v-pre>周围状态(变量)</code>,也就意味着在<code v-pre>B</code>函数内部可以访问<code v-pre>外部函数</code>的作用域。</p>
<p>至此你会发现，<code v-pre>闭包</code>就是在<code v-pre>B</code>函数一创建，并且有对<code v-pre>周围的状态</code>有引用，那么此时<code v-pre>闭包</code>就出现了，也就是说，闭包就是一座桥梁，能让<code v-pre>B</code>函数内部能突破<code v-pre>自身作用域</code>访问<code v-pre>外部</code>的变量。</p>
<p>不知道你有没有发现，我在<code v-pre>A</code>内部定义的变量，我在外部并不能访问，也就是说相对<code v-pre>A</code>的外部，<code v-pre>A</code>内部所有的变量都是<code v-pre>私有的</code>，在<code v-pre>A</code>定义的变量，相对于<code v-pre>B</code>中，又可以访问。因为<code v-pre>B</code>函数能访问<code v-pre>A</code>中的变量，也正是依靠<code v-pre>闭包</code>这座桥梁。</p>
<h3 id="闭包的特性" tabindex="-1"><a class="header-anchor" href="#闭包的特性" aria-hidden="true">#</a> 闭包的特性</h3>
<p>1.<code v-pre>创建私有变量</code></p>
<p>2.<code v-pre>延长变量的生命周期</code></p>
<p>我们知道<code v-pre>闭包</code>会造成内存泄露，本质上就是创建的变量一直在引用内存中，当一个普通函数被调用结束时，函数内部创建的变量就会被销毁。</p>
<p>但是闭包会保存其变量的引用，即便外部执行上下文被销毁，但是闭包内创建的词法环境依然还在，我们看下面代码具体理解下。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
    age <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    age<span class="token operator">++</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token constant">B</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> b1 <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">b1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token function">b1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token function">b1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>A</code>中返回了函数<code v-pre>B</code>,实际上就是返回了一个函数，当我们我们用<code v-pre>var b1 = A()</code>申明一个变量时,实际上，这里内部<code v-pre>B</code>还没有执行，但是在执行<code v-pre>A()</code>方法时，返回的是一个函数，所以我们继续执行<code v-pre>b1()</code>,我们尝试调用三次，我们会发现打印出来的值是<code v-pre>1,2,3</code>，这就说明，<code v-pre>闭包</code>延长了变量的生命周期，因为第三次与第二次打印出来的值就是同一个值的引用。
具体一张图可以可以理解下
<img src="https://files.mdnice.com/user/24614/7a7571d3-b172-4df3-8ccf-1874dd819251.png" alt=""></p>
<p>当我们用<code v-pre>var b1 = A()</code>时，实际上，我用蓝色的方框已经标注起来了，在<code v-pre>b1</code>内部我们可以看到，每执行<code v-pre>b1</code>，实际就是执行的<code v-pre>红色</code>区域的函数，也就是<code v-pre>A</code>内部定义的函数<code v-pre>B</code>，但是每次调用<code v-pre>b1</code>,我们看到都有保留<code v-pre>age</code>的引用，所以你看到<code v-pre>age</code>依次就是<code v-pre>1,2,3</code>，所以也就证实了<code v-pre>闭包能延长变量的生命周期</code>,并且闭包创建的<code v-pre>私有变量</code>可以减少全局变量的使用。</p>
<p>通常我们知道尽量少创建全局变量，因为我们不知道这个全局变量什么时候使用，只有在被使用的时候才会被释放。<code v-pre>闭包也是解决了全局变量命名冲突的问题</code>，因为创建的私有变量，没法在外部访问，这样也就减少了<code v-pre>变量名</code>污染的问题。</p>
<p>等等，还有一个问题，如果我把上面的代码改成下面呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
    age <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    age<span class="token operator">++</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token constant">B</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token comment">// var b1 = A();</span>
<span class="token comment">// b1();</span>
<span class="token comment">// b1();</span>
<span class="token comment">// b1();</span>
<span class="token comment">// console.log(name)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现，我两次打印的都是同一个<code v-pre>1</code>,这是为什么呢？你有没有发现之前我们是用<code v-pre>var b1 = A()</code>申明的一个变量，实际上这句代码就是<code v-pre>js</code>新开辟暂存了一块空间，因为<code v-pre>A</code>内部返回的是一个函数，当我每次调用<code v-pre>b1</code>时，实际上是调用返回的那个函数，因为函数内部存在闭包的引用，所以一直就<code v-pre>1,2,3</code>,但是我这里我使用的是<code v-pre>A()()</code>，我们发现每次都是<code v-pre>1</code>,说明当我第二次调用时内部的<code v-pre>age</code>已经重新定义了一遍，而并没有引用上一次的值，这就说明，在<code v-pre>A()</code>立即调用时，闭包内部引用的变量已经被释放。由于<code v-pre>闭包</code>也会有缺陷，创建太多的闭包会造成消耗内存严重，影响网页性能。</p>
<h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3>
<ol>
<li>
<p><code v-pre>柯里化函数</code></p>
</li>
<li>
<p><code v-pre>回调函数</code></p>
</li>
<li>
<p><code v-pre>计数器</code>、<code v-pre>延迟调用（防抖与节流）</code></p>
</li>
</ol>
<ul>
<li>柯里化函数</li>
</ul>
<p>实际上就是把一个函数的多个参数拆分成多个函数调用，主要目的是<code v-pre>避免平繁调用具有多个相同参数函数，又可以复用相同函数</code>，具体可以用下面代码理解下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 未柯里化之前</span>
<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数柯里化后</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> c<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 6 or sum(1)(2)(3)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面 🌰 好像还是不太明显，在具体业务中，你可能会写出这样的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 根据正则规则校验某个字段</span>
<span class="token keyword">function</span> <span class="token function">regKey</span><span class="token punctuation">(</span><span class="token parameter">reg<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> isPhone <span class="token operator">=</span> <span class="token function">regKey</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^1[3,5,7,8,9]\d{9}$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token number">13754123124</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> isNumber <span class="token operator">=</span> <span class="token function">regKey</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">'test'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改成函数柯里化后</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">regKey</span><span class="token punctuation">(</span><span class="token parameter">reg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> checkPhone <span class="token operator">=</span> <span class="token function">regKey</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^1[3,5,7,8,9]\d{9}$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> checkNum <span class="token operator">=</span> <span class="token function">regKey</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> isPhone <span class="token operator">=</span> <span class="token function">checkPhone</span><span class="token punctuation">(</span><span class="token number">13754123124</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token keyword">const</span> isNumber <span class="token operator">=</span> <span class="token function">checkNum</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现改完后，貌似柯里化后，代码反而变多了，但是代码的可读性以及拓展性比以前更友好，这点因特殊业务功能而定，也不是非要把用柯里化函数去处理所有的业务，具体因情况而定，这里只是举了个简单的例子。</p>
<ul>
<li>回调函数</li>
</ul>
<p><code v-pre>回调函数</code>在业务中使用的太多了，具体可以看下下面这个简单的例子,写一段为伪代码感受一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">request</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token literal-property property">success</span><span class="token operator">:</span> <span class="token string">'成功'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">callback</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">queryList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> getData <span class="token operator">=</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">pageIndex</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">pageSize</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {code: 0, success: '成功', data: []}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>计数器</li>
</ul>
<p>这个就非常典型了，比如说一个循环里面</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> j <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> i <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数节流</li>
</ul>
<p>频繁触发事件，在指定一段时间内调用函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 模拟数据请求伪代码</span>
<span class="token keyword">const</span> <span class="token function-variable function">fetchList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'scroll'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token function">fetchList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数防抖</li>
</ul>
<p>利用定时器做缓冲器，当第二次调用时，清除上一次的定时器，在指定时间内重新调用函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 模拟数据请求伪代码</span>
<span class="token keyword">const</span> <span class="token function-variable function">fetchList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> inputDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
inputDom<span class="token punctuation">.</span><span class="token function-variable function">oninput</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">fetchList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上案例都有用到<code v-pre>闭包</code>，闭包的身影无处不在，只是我们用的时候，我们并没有发现。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p><a href="https://vue3js.cn/interview/JavaScript/closure.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88" title="`闭包`" target="_blank" rel="noopener noreferrer"><code v-pre>闭包</code><ExternalLinkIcon/></a>的概念，闭包是<code v-pre>一个函数</code>对其<code v-pre>周围状态</code>的<code v-pre>引用</code>并<code v-pre>捆绑</code>在一起的一种组合，或者是<code v-pre>一个函数</code>被<code v-pre>引用</code>包围，或者是<code v-pre>一个内部函数</code>能访问<code v-pre>外部函数</code>的作用域</p>
</li>
<li>
<p>闭包的特性，<code v-pre>创建私有变量</code>和<code v-pre>延长变量的生命周期</code></p>
</li>
<li>
<p>闭包的应用场景，<code v-pre>柯里化函数</code>、<code v-pre>回调函数</code>、<code v-pre>定时器</code>、<code v-pre>节流/防抖</code>等</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/javascript/09-%E9%97%AD%E5%8C%85" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
<p>最后，喜欢的点个赞，在看，转发，收藏等于学会，欢迎关注 Web 技术学苑，好好学习，天天向上！</p>
</div></template>
