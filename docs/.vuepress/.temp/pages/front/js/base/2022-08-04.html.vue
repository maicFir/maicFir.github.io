<template><div><blockquote>
<p><code v-pre>原型链</code>是一个比较抽象的概念，每当被问起这个问题时，总会回答得不是那么准确，好像懂，但自己好像又不太懂，真是尴尬了</p>
</blockquote>
<p>正文开始...</p>
<p>我们知道每一个函数都有一个自身的<code v-pre>prototype</code>，每一个对象都有<code v-pre>__proto__</code>对象,而这个<code v-pre>__proto__</code>我们常称之为<code v-pre>隐式原型</code>,正因为它连接起了对象与构造函数的关系</p>
<p>当我们访问一个对象时，首先会在自身属性上找，当自身属性找不到时，会到对象的隐士链上去找，如果隐式链上还没有，那么会构造函数的原型上找，当原型上没有时，会到原型的隐式<code v-pre>__proto__</code>上去找，当这个属性还找不到时，就直接返回<code v-pre>undefined</code>了，因此才形成了一条原型链。</p>
<p>针对以上一段常常的话，我们用实际例子来佐证一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们访问</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Maic</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我在原型上找</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1 this.name = 'Maic';</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 3 Person.prototype.name = 'Test';</span>
<span class="token comment">// 4 Person.prototype.__proto__.name = '999'</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 2 person.__proto__.name = '8888'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从结果上来看，会是依次从<code v-pre>1,2,3,4</code>依次查找下去，直到最后找不到<code v-pre>name</code>为止，然后就打印<code v-pre>undefined</code></p>
<p>当我们对构造函数实例化的时候，此时就会返回一个对象<code v-pre>person</code>，然后这个<code v-pre>person</code>对象就可以访问构造函数内部的属性，以及原型上的方法了。</p>
<p>这个<code v-pre>person</code>对象为什么可以访问构造函数的属性？以及构造函数原型上的方法？</p>
<p>那是因为通过<code v-pre>__proto__</code>这个隐式原型指向的构造函数的<code v-pre>prototype</code></p>
<h4 id="new过程" tabindex="-1"><a class="header-anchor" href="#new过程" aria-hidden="true">#</a> new过程</h4>
<p>在面试中常有问题到，<code v-pre>new</code>的过程中发生了啥？</p>
<p>1、创建了一个对象</p>
<p>2、将这个对象的<code v-pre>__proto__</code>指向了构造函数的<code v-pre>prototype</code></p>
<p>3、执行构造函数内部方法，并改变构造函数内部的this指向到新对象中</p>
<p>4、返回该构造函数的结果</p>
<p>我们根据以上几点，实现一个类似<code v-pre>new</code>的操作，从而真正理解<code v-pre>new</code>原生的实现</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mynew</span><span class="token punctuation">(</span><span class="token parameter">Fn<span class="token punctuation">,</span> <span class="token operator">...</span>arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1、创建一个对象</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 2 将这个对象__proto__执行构造函数的prototype</span>
  ret<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">Fn</span><span class="token punctuation">.</span>prototype
  <span class="token comment">// or</span>
  <span class="token comment">// Object.setPrototypeOf(ret, Fn.prototype);</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">Fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> <span class="token operator">...</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> result <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">?</span> result <span class="token operator">:</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对象与构造函数关系" tabindex="-1"><a class="header-anchor" href="#对象与构造函数关系" aria-hidden="true">#</a> 对象与构造函数关系</h4>
<p>我们再重新看下这段代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看下下面的几个判断</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Person<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Person<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> Object<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype <span class="token operator">===</span> Object<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的关系画了一个图， 可能更直观点</p>
<p><img src="https://files.mdnice.com/user/24614/942cc371-6ace-4dca-9ec7-677a4ecb26ce.png" alt=""></p>
<p>这个图看起来貌似还是不太容易记住，多理解几遍，应该会掌握八九不离十</p>
<p>另外还有一篇github上关于伢羽老师的<a href="https://github.com/mqyqingfeng/Blog/issues/2" target="_blank" rel="noopener noreferrer">原型链<ExternalLinkIcon/></a>文章可以一同参考</p>
<h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h4>
<ul>
<li>
<p>理解原型链，每一个函数都有一个原型<code v-pre>prototype</code>,每一个对象都有自己的隐式<code v-pre>__proto__</code>,当我们访问对象属性时，会优先在自己内部属性寻找，然后会找<code v-pre>__proto__</code>上的属性，然后会去构造函数的<code v-pre>prototype</code>上寻找，如果构造函数的<code v-pre>prototype</code>找不到，会到到构造函数<code v-pre>prototype</code>的<code v-pre>__proto__</code>上寻找，最后找不到该属性就返回<code v-pre>undefined</code></p>
</li>
<li>
<p>了解new操作背后的本质</p>
</li>
<li>
<p>了解构造函数与实例对象的关系</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/javascript/17-%E5%8E%9F%E5%9E%8B%E9%93%BE" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
