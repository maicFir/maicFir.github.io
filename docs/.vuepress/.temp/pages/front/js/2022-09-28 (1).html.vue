<template><div><p><code v-pre>数组</code>在业务中是一个非常高频的API,在业务中基本都有用它，必不可少，本文是笔者一篇关于数组常用<code v-pre>API</code>的总结，希望看完在项目中有所帮助。</p>
<p>正文开始...</p>
<h3 id="前置" tabindex="-1"><a class="header-anchor" href="#前置" aria-hidden="true">#</a> 前置</h3>
<p>首先我们看下数组本身有哪些方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token string">"length"</span><span class="token punctuation">,</span>
  <span class="token string">"constructor"</span><span class="token punctuation">,</span>
  <span class="token string">"at"</span><span class="token punctuation">,</span>
  <span class="token string">"concat"</span><span class="token punctuation">,</span>
  <span class="token string">"copyWithin"</span><span class="token punctuation">,</span>
  <span class="token string">"fill"</span><span class="token punctuation">,</span>
  <span class="token string">"find"</span><span class="token punctuation">,</span>
  <span class="token string">"findIndex"</span><span class="token punctuation">,</span>
  <span class="token string">"lastIndexOf"</span><span class="token punctuation">,</span>
  <span class="token string">"pop"</span><span class="token punctuation">,</span>
  <span class="token string">"push"</span><span class="token punctuation">,</span>
  <span class="token string">"reverse"</span><span class="token punctuation">,</span>
  <span class="token string">"shift"</span><span class="token punctuation">,</span>
  <span class="token string">"unshift"</span><span class="token punctuation">,</span>
  <span class="token string">"slice"</span><span class="token punctuation">,</span>
  <span class="token string">"sort"</span><span class="token punctuation">,</span>
  <span class="token string">"splice"</span><span class="token punctuation">,</span>
  <span class="token string">"includes"</span><span class="token punctuation">,</span>
  <span class="token string">"indexOf"</span><span class="token punctuation">,</span>
  <span class="token string">"join"</span><span class="token punctuation">,</span>
  <span class="token string">"keys"</span><span class="token punctuation">,</span>
  <span class="token string">"entries"</span><span class="token punctuation">,</span>
  <span class="token string">"values"</span><span class="token punctuation">,</span>
  <span class="token string">"forEach"</span><span class="token punctuation">,</span>
  <span class="token string">"filter"</span><span class="token punctuation">,</span>
  <span class="token string">"flat"</span><span class="token punctuation">,</span>
  <span class="token string">"flatMap"</span><span class="token punctuation">,</span>
  <span class="token string">"map"</span><span class="token punctuation">,</span>
  <span class="token string">"every"</span><span class="token punctuation">,</span>
  <span class="token string">"some"</span><span class="token punctuation">,</span>
  <span class="token string">"reduce"</span><span class="token punctuation">,</span>
  <span class="token string">"reduceRight"</span><span class="token punctuation">,</span>
  <span class="token string">"toLocaleString"</span><span class="token punctuation">,</span>
  <span class="token string">"toString"</span><span class="token punctuation">,</span>
  <span class="token string">"findLast"</span><span class="token punctuation">,</span>
  <span class="token string">"findLastIndex"</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reduce" tabindex="-1"><a class="header-anchor" href="#reduce" aria-hidden="true">#</a> reduce</h3>
<p>这是一个项目上非常有用，但是代码看起来不是很直白的一个API</p>
<ul>
<li><code v-pre>场景</code> 我需要根据数组中的某个值，用对象与原数组建立映射关系</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sourceArr <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'e'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">,</span> <span class="token string">'f'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我想通过<code v-pre>对象</code>访问数组的某个<code v-pre>name</code>或者<code v-pre>value</code>就能找到当前原数据的<code v-pre>item</code>,前置条件<code v-pre>name</code>和<code v-pre>value</code>不会为相同</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getMap</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        prev<span class="token punctuation">[</span>cur<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> cur<span class="token punctuation">;</span>
        <span class="token keyword">return</span> prev
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
// getMap('name', sourceArr)
/*
{
  Jack: {name: 'Jack', age: 15, arr: Array(3)}
  Maic: {name: 'Maic', age: 18, arr: Array(2)}
  Tom: {name: 'Tom', age: 20, arr: Array(3)}
}
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getMap</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">,</span> sourceArr<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">'Maic'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">/*
   {
        name: 'Maic',
        age: 18,
        arr: ['a', 'b']
    },
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getMap</span><span class="token punctuation">(</span><span class="token string">'age'</span><span class="token punctuation">,</span> sourceArr<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">15</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">/*
  {
    name: 'Jack',
    age: 15,
    arr: ['e', 'd', 'f']
  }
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getMap</span><span class="token punctuation">(</span><span class="token string">'arr'</span><span class="token punctuation">,</span> sourceArr<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">'a,b'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">/*
 {
    name: 'Maic',
    age: 18,
    arr: ['a', 'b']
  },
*/</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以让这个方法<code v-pre>getMap</code>变成更通用，只需要挂载原型上即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$getMap</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        prev<span class="token punctuation">[</span>cur<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> cur<span class="token punctuation">;</span>
        <span class="token keyword">return</span> prev
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
sourceArr<span class="token punctuation">.</span><span class="token function">$getMap</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span>
<span class="token comment">/*
{
  Jack: {name: 'Jack', age: 15, arr: Array(3)}
  Maic: {name: 'Maic', age: 18, arr: Array(2)}
  Tom: {name: 'Tom', age: 20, arr: Array(3)}
}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上例子，我们分析一下<code v-pre>reduce</code>这个在数组中所谓的<code v-pre>累计计算</code>,我们以最简单的方式来深刻理解<code v-pre>reduce</code>这个方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> sourceArr <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'e'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">,</span> <span class="token string">'f'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      prev<span class="token punctuation">[</span>cur<span class="token punctuation">.</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> cur<span class="token punctuation">;</span>
      <span class="token keyword">return</span> prev
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>arr.reduce(callback, init)</code>的第一个参数是回调函数，第二参数prev<code v-pre>init</code>的值，<code v-pre>callback</code>的<code v-pre>prev</code>就是<code v-pre>{}</code>,<code v-pre>cur</code>是当前的数组的<code v-pre>item</code></p>
<p>第一次累计的结果<code v-pre>prev</code>的值是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">'Maic'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个结果会当成第二次累计的<code v-pre>prev</code>值，记住<code v-pre>cur</code>是当前原元素累计次数的<code v-pre>item</code>，比如从下标0次开始累计，那么<code v-pre>cur</code>就是数组的第一个<code v-pre>item</code></p>
<p>第二次累计的结果就是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">'Maic'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">'Tom'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
      <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>依次类推...</p>
<p>所以我通过对象，将数组的值作为对象的<code v-pre>key</code>,建立对象与原数据的对应关系，用<code v-pre>reduce</code>这个方法可以快捷的达到这样的需求效果,关于数组<code v-pre>reduce</code>后续会单独写一篇文章总结更多在实际业务上的一些思考。也可参考官方文档<code v-pre>MDN</code>讲解<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" title="`reduce`" target="_blank" rel="noopener noreferrer"><code v-pre>reduce</code><ExternalLinkIcon/></a>这篇好文章</p>
<p>有人说<code v-pre>reduce</code>实现这功能有点秀了，<code v-pre>for</code>循环不是更好理解吗</p>
<h3 id="foreach" tabindex="-1"><a class="header-anchor" href="#foreach" aria-hidden="true">#</a> forEach</h3>
<p><code v-pre>forEach</code>也是一个循环数组的的方法，循环方法我们知道在<code v-pre>js</code>中<code v-pre>for..of</code>,<code v-pre>for(let i=0;i&lt;len;i++)</code>或者<code v-pre>while</code>条件，这些都是可以条件中断，但是<code v-pre>forEach</code>不能中断【非常规操作除外，比如throw抛出异常是可以中断<code v-pre>forEach</code>的】</p>
<p>我们用同样的一个例子来实现<code v-pre>reduce</code>一样的功能</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">function</span> <span class="token function">getMap2</span> <span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    res<span class="token punctuation">[</span>v<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> v<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">getMap2</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">,</span> sourceArr<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">'Maic'</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然是可以的，条条大路通罗马,<code v-pre>forEach</code>貌似看起来比<code v-pre>reduce</code>写的那段代码阅读负担要小得多,但是同样的效果<code v-pre>forEach</code>执行效率也比<code v-pre>reduce</code>更高点</p>
<p>具体可以看下这张图数据
<img src="https://files.mdnice.com/user/24614/491ffd86-9532-4d98-876d-4169b3c49f69.png" alt=""></p>
<p>所以复杂的事情，尽量简单化，没有好坏高低之分，对于搬砖工来说，哪种熟悉就用哪个了。</p>
<h3 id="push" tabindex="-1"><a class="header-anchor" href="#push" aria-hidden="true">#</a> push</h3>
<p>这是一个比较常用的方法，也是向数组中添加数据</p>
<p><code v-pre>场景</code>：假设现在有一个需求，如何将一个一维数组变成一个树结构，并且还要按照指定分类进行分组</p>
<p>原数据大概就是这样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sourcesData <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
      <span class="token literal-property property">bookType</span><span class="token operator">:</span> <span class="token string">'文学类'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token literal-property property">bookName</span><span class="token operator">:</span> <span class="token string">'基督山伯爵'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'x123'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">bookType</span><span class="token operator">:</span> <span class="token string">'财商类'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">bookName</span><span class="token operator">:</span> <span class="token string">'穷爸爸与富爸爸'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'x45622'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">bookType</span><span class="token operator">:</span> <span class="token string">'经济学'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token literal-property property">bookName</span><span class="token operator">:</span> <span class="token string">'货币战争'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'ssxdede'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">bookType</span><span class="token operator">:</span> <span class="token string">'文学类'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">bookName</span><span class="token operator">:</span> <span class="token string">'百年孤独'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'1234562sx'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后端给的数据是一维的，我们需要变成一个<code v-pre>tree</code>结构进行分类</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">transformTree</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceArr<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、先根据type字段进行分组</span>
    <span class="token keyword">const</span> typeData <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=></span> sourceArr<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">.</span>type <span class="token operator">===</span> type <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 2、分别含有type字段进行分类后</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>data <span class="token keyword">of</span> typeData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// 3、根据bookType进行归组，文件夹分类，同一文件夹的归到一类去</span>
       <span class="token keyword">const</span> target <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">.</span>label <span class="token operator">===</span> item<span class="token punctuation">.</span>bookType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果找到了就原数组数据添加到children里去</span>
            target<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">label</span><span class="token operator">:</span> item<span class="token punctuation">.</span>bookName<span class="token punctuation">,</span>
                <span class="token operator">...</span>item
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">label</span><span class="token operator">:</span> item<span class="token punctuation">.</span>bookType<span class="token punctuation">,</span>
                <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token operator">...</span>item<span class="token punctuation">,</span>
                        <span class="token literal-property property">label</span><span class="token operator">:</span> item<span class="token punctuation">.</span>bookName
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'push:res'</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token function">transformTree</span><span class="token punctuation">(</span>sourcesData<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打印的结果:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token string-property property">"label"</span><span class="token operator">:</span> <span class="token string">"文学类"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"children"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token string-property property">"bookType"</span><span class="token operator">:</span> <span class="token string">"文学类"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token string-property property">"bookName"</span><span class="token operator">:</span> <span class="token string">"基督山伯爵"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"x123"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"label"</span><span class="token operator">:</span> <span class="token string">"基督山伯爵"</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token string-property property">"label"</span><span class="token operator">:</span> <span class="token string">"百年孤独"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"bookType"</span><span class="token operator">:</span> <span class="token string">"文学类"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token string-property property">"bookName"</span><span class="token operator">:</span> <span class="token string">"百年孤独"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"1234562sx"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token string-property property">"label"</span><span class="token operator">:</span> <span class="token string">"财商类"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"children"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token string-property property">"bookType"</span><span class="token operator">:</span> <span class="token string">"财商类"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token string-property property">"bookName"</span><span class="token operator">:</span> <span class="token string">"穷爸爸与富爸爸"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"x45622"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"label"</span><span class="token operator">:</span> <span class="token string">"穷爸爸与富爸爸"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token string-property property">"label"</span><span class="token operator">:</span> <span class="token string">"经济学"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"children"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token string-property property">"bookType"</span><span class="token operator">:</span> <span class="token string">"经济学"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token string-property property">"bookName"</span><span class="token operator">:</span> <span class="token string">"货币战争"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token string">"ssxdede"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"label"</span><span class="token operator">:</span> <span class="token string">"货币战争"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此我们就将一个一围数组变成了一个<code v-pre>tree</code>结构</p>
<p>我们可以将上面一段<code v-pre>forEach</code>改成<code v-pre>reduce</code>，感受下理解的难度,最后的效果是一样，但是<code v-pre>reduce</code>对新手不太友好,这里就是为了使用而使用，好像没太必要</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">transformTree2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceArr<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、先根据type字段进行分组</span>
    <span class="token keyword">const</span> typeData <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=></span> sourceArr<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">.</span>type <span class="token operator">===</span> type <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 2、分别含有type字段进行分类后</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>data <span class="token keyword">of</span> typeData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// 3、根据bookType进行归组，文件夹分类，同一文件夹的归到一类去</span>
            <span class="token keyword">const</span> target <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">.</span>label <span class="token operator">===</span> cur<span class="token punctuation">.</span>bookType<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                target<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">label</span><span class="token operator">:</span> cur<span class="token punctuation">.</span>bookName<span class="token punctuation">,</span>
                    <span class="token operator">...</span>cur
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                    <span class="token literal-property property">label</span><span class="token operator">:</span> cur<span class="token punctuation">.</span>bookType<span class="token punctuation">,</span>
                    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            <span class="token operator">...</span>cur<span class="token punctuation">,</span>
                            <span class="token literal-property property">label</span><span class="token operator">:</span> cur<span class="token punctuation">.</span>bookName
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> sourceArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">transformTree2</span><span class="token punctuation">(</span>sourcesData<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="some" tabindex="-1"><a class="header-anchor" href="#some" aria-hidden="true">#</a> some</h3>
<p>这是一个只要条件有一个满足就返回true,否则就返回false
<code v-pre>场景</code>: 我需要在原数组大于某个值，一旦满足，就返回true</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arraySome</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> num</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v <span class="token operator">></span> num<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'some:'</span><span class="token punctuation">,</span> <span class="token function">arraySome</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">arraySome</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true, false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="every" tabindex="-1"><a class="header-anchor" href="#every" aria-hidden="true">#</a> every</h3>
<p>恰好与<code v-pre>some</code>相反，必须所有条件满足，才会返回true</p>
<p><code v-pre>场景</code>: 在业务中你想一个原数据的每一项都满足一个指定条件，此时会返回true,否则就是false</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayEvery</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> num</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'every:'</span><span class="token punctuation">,</span> <span class="token function">arrayEvery</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'abc'</span><span class="token punctuation">,</span> <span class="token string">'cdabc'</span><span class="token punctuation">,</span> <span class="token string">'efg'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'ab'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">arrayEvery</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'abc'</span><span class="token punctuation">,</span> <span class="token string">'cdabc'</span><span class="token punctuation">,</span> <span class="token string">'aefg'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="at" tabindex="-1"><a class="header-anchor" href="#at" aria-hidden="true">#</a> at</h3>
<p>比较罕见，与通过下标去值等价</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayAt</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">at</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="concat" tabindex="-1"><a class="header-anchor" href="#concat" aria-hidden="true">#</a> concat</h3>
<p>在原有数组浅拷贝一份新的数据，然后在新数据添加对应的内容</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * arr: [1,2,3]
 * concat: 在原数组基础上浅拷贝一份新的数据，然后在新数据上追加对应的内容
 * 示例：ret = arr.concat(4) ----- ret: [1,2,3,4]
 *      ret = arr.concat('a', <span class="token punctuation">{</span>a:'Maic'<span class="token punctuation">}</span>, ['abc',<span class="token punctuation">{</span>a: 'Tom'<span class="token punctuation">}</span>])  ret: [1,2,3,'a',<span class="token punctuation">{</span>a:'Maic'<span class="token punctuation">}</span>,'abc', <span class="token punctuation">{</span>a: 'Tom'<span class="token punctuation">}</span>]
 *      ret = arr.concat(1).concat(2) [1,2,3,1,2]
 * 场景：不太想影响原数据，又想在原数据上添加数据时，但是注意这个方法是一个浅拷贝，如果数组中是引用数据类型，修改新值会影响原有的值
 *                          
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">arrayConcat</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token keyword">const</span> newArr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">'abc'</span><span class="token punctuation">)</span>
    newArr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Tom'</span>
    <span class="token keyword">const</span> arr2 <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'Maic'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'abc'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'Tom'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> arr3 <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> arr4 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        newArr<span class="token punctuation">,</span>
        arr<span class="token punctuation">,</span>
        arr2<span class="token punctuation">,</span>
        arr3<span class="token punctuation">,</span>
        arr4
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'concat:'</span><span class="token punctuation">,</span> <span class="token function">arrayConcat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fill" tabindex="-1"><a class="header-anchor" href="#fill" aria-hidden="true">#</a> fill</h3>
<p>填充一份相同的数据</p>
<p><code v-pre>场景</code>： 你想mock一份测试数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayFill</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">Array</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'fill:'</span><span class="token punctuation">,</span> <span class="token function">arrayFill</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'Maic'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">/*
 [ 'Maic', 'Maic', 'Maic' ]
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="find" tabindex="-1"><a class="header-anchor" href="#find" aria-hidden="true">#</a> find</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * find: 寻找数组的item,并返回其寻找到的结果, 如果没有找到就返回undefined
 * 场景：需要根据某个条件值找到数据中的当前item数据时
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">arrayFind</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceData<span class="token punctuation">,</span> key<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceData<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> target<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'find:'</span><span class="token punctuation">,</span> <span class="token function">arrayFind</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'Maic'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// {name: 'Maic', age: 18}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="findindex" tabindex="-1"><a class="header-anchor" href="#findindex" aria-hidden="true">#</a> findIndex</h3>
<p>寻找原数据匹配的目标值下标</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * findIndex: 寻找目标值的当前索引,如果没找到就返回-1
 * 场景：在你根据某个条件想获取当前条件的索引值，比如进行删除，或者插入，替换等操作
 */</span>

<span class="token keyword">const</span> <span class="token function-variable function">arrayFindIndex</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceData<span class="token punctuation">,</span> key<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceData<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> target<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'findIndex'</span><span class="token punctuation">,</span> <span class="token function">arrayFindIndex</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'Jack'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lastindexof" tabindex="-1"><a class="header-anchor" href="#lastindexof" aria-hidden="true">#</a> lastIndexOf</h3>
<p>找到目标元素的当前索引</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * lastIndexOf: 找到元素的当前下标索引
 * 场景：功能与findIndex类似，根据其值寻找目标值的当前下标索引
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">arrayLastIndexOf</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceData<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceData<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'lastIndexOf'</span><span class="token punctuation">,</span> <span class="token function">arrayLastIndexOf</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pop" tabindex="-1"><a class="header-anchor" href="#pop" aria-hidden="true">#</a> pop</h3>
<p>获取数组元素的最后一只元素的值，会改变原数组的长度，每一次pop操作将会把数组的最后一只值弹出去，原数组长度会减一</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayPop</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">sourceData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceData<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'pop:'</span><span class="token punctuation">,</span> <span class="token function">arrayPop</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// c</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reverse" tabindex="-1"><a class="header-anchor" href="#reverse" aria-hidden="true">#</a> reverse</h3>
<p>将原数据进行倒叙排列</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayReverse</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceData</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceData<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'reverse'</span><span class="token punctuation">,</span> <span class="token function">arrayReverse</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [4,3,2,1]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="shift" tabindex="-1"><a class="header-anchor" href="#shift" aria-hidden="true">#</a> shift</h3>
<p>获取数组的第一个元素，会改变原数组的长度，会改变原数组
<code v-pre>场景</code>：模拟队列</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayShift</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceData</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> sourceData<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        sourceData
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'shift'</span><span class="token punctuation">,</span> <span class="token function">arrayShift</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// {data:1, sourceData: [2,3,4]}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unshift" tabindex="-1"><a class="header-anchor" href="#unshift" aria-hidden="true">#</a> unshift</h3>
<p>向原数据添加数据，每次操作都会往数组的首位添加，会改变原数组的长度，返回值是当前数组的长度</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayUnshift</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceData<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">result</span><span class="token operator">:</span> sourceData<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">,</span>
        sourceData
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'unshift:'</span><span class="token punctuation">,</span> <span class="token function">arrayUnshift</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="slice" tabindex="-1"><a class="header-anchor" href="#slice" aria-hidden="true">#</a> slice</h3>
<p>获取原数据指定索引范围的值，不会影响原有值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * slice: 获取原数据指定索引范围的值，不会影响原有值
 * 场景：应用很多
 * arr: [1,2,3,4]
 * 
 * arr.slice(0) --- [1,2,3,4] 浅拷贝
 * arr.slice(1) ---  [2,3,4]
 * 
 * arr.slice(1,3) --- [2,3]
 * 
 * arr.slice(-1) ---[4]
 * arr.slice(-2)----[3,4]
 * 
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">arraySlice</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arr1 <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> arr2 <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> arr3 <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> arr4 <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> arr5 <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        arr1<span class="token punctuation">,</span>
        arr2<span class="token punctuation">,</span>
        arr3<span class="token punctuation">,</span>
        arr4<span class="token punctuation">,</span>
        arr5
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'slice:'</span><span class="token punctuation">,</span> <span class="token function">arraySlice</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*
slice: {
  arr1: [ 1, 2, 3, 4 ],
  arr2: [ 2, 3, 4 ],
  arr3: [ 2, 3 ],
  arr4: [ 4 ],
  arr5: [ 3, 4 ]
}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sort" tabindex="-1"><a class="header-anchor" href="#sort" aria-hidden="true">#</a> sort</h3>
<p>对数组进行排序</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * sort: 排序
 * arr.sort((a, b) => a - b) // 升序
 * arr.sort((a,b) => b-a) // 降序
 * 场景：对数据的某个字段进行排序
 */</span>

<span class="token keyword">const</span> <span class="token function-variable function">arraySort</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> upSort <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">-</span> b<span class="token punctuation">)</span>
    <span class="token keyword">const</span> downSort <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> b <span class="token operator">-</span> a<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        upSort<span class="token punctuation">,</span>
        downSort
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="splice" tabindex="-1"><a class="header-anchor" href="#splice" aria-hidden="true">#</a> splice</h3>
<p>对原数组进行<code v-pre>删除</code>、<code v-pre>替换</code>、<code v-pre>截取</code>操作，会影响原数组的值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arraySplice</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [2,3,4]</span>
    <span class="token keyword">const</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1,2]</span>
    <span class="token keyword">const</span> arr3 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1,2,4] 删除了索引为2的元素，返回剩下的元素</span>
    <span class="token keyword">const</span> arr4 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [4]</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        arr1<span class="token punctuation">,</span>
        arr2<span class="token punctuation">,</span>
        arr3<span class="token punctuation">,</span>
        arr4
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'splice:'</span><span class="token punctuation">,</span> <span class="token function">arraySplice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="filter" tabindex="-1"><a class="header-anchor" href="#filter" aria-hidden="true">#</a> filter</h3>
<p>过滤数组操作，根据某个条件，返回一个过滤结果的数组</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * filter: 根据条件进行过滤，返回过滤后的结果
 * 场景： 需要过滤原数据中某些值时
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">arrayFilter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceData<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceData<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v <span class="token operator">===</span> val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'filter:'</span><span class="token punctuation">,</span> <span class="token function">arrayFilter</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map</h3>
<p>根据原数组重新返回一个新的数组</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*
 * map: 在原有基础上重新返回一个新数组
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">arrayMap</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceArr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceArr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'map:'</span><span class="token punctuation">,</span> <span class="token function">arrayMap</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// [2,3,4]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="flatmap" tabindex="-1"><a class="header-anchor" href="#flatmap" aria-hidden="true">#</a> flatMap</h3>
<p><code v-pre>场景</code>：可以根据原数组组合成一个你想要的数据结构</p>
<p>比如原数据有不想要的字段</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayFlatMap</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceArr<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">source</span><span class="token operator">:</span> sourceArr<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> <span class="token keyword">typeof</span> v <span class="token operator">===</span> <span class="token string">'number'</span> <span class="token operator">?</span> <span class="token punctuation">[</span>v<span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">narr</span><span class="token operator">:</span> arr<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> v<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> v<span class="token punctuation">.</span>value <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'flatMap:'</span><span class="token punctuation">,</span> <span class="token function">arrayFlatMap</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * flatMap: <span class="token punctuation">{</span>
        source: [ 1, 2 ],
        narr: [ <span class="token punctuation">{</span> name: 'Maic', value: 0 <span class="token punctuation">}</span>, <span class="token punctuation">{</span> name: 'Tom', value: 1 <span class="token punctuation">}</span> ]
    <span class="token punctuation">}</span>
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tostring" tabindex="-1"><a class="header-anchor" href="#tostring" aria-hidden="true">#</a> toString</h3>
<p>将数组转换成字符串</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * toString: 将数组进行转换
 * 场景：想将一个数组变成字符串
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">arrayTostring</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">sourceArr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceArr<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'toString:'</span><span class="token punctuation">,</span> <span class="token function">arrayTostring</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">/*
1,2,3,4
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="includes" tabindex="-1"><a class="header-anchor" href="#includes" aria-hidden="true">#</a> includes</h3>
<p>判断一个数组是否包含某个元素</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * includes: 包含
 * 场景：一个元素是否在数组中存在
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">arrayIncludes</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'arrayIncludes:'</span><span class="token punctuation">,</span> <span class="token function">arrayIncludes</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="indexof" tabindex="-1"><a class="header-anchor" href="#indexof" aria-hidden="true">#</a> indexOf</h3>
<p>获取一个元素的下标，如果没有就返回<code v-pre>-1</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayIndexOf</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">arrayIndexOf</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="join" tabindex="-1"><a class="header-anchor" href="#join" aria-hidden="true">#</a> join</h3>
<p>将一个数组以特殊字符进行拼接，变成一个字符串</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">arrayJoin</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> split</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>split<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">arrayJoin</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'-'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// join: 1-2-3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>利用<code v-pre>reduce</code>如何建立数组与对象的映射关系，还有如何将一个一维数组构建成一个<code v-pre>tree</code>结构</p>
</li>
<li>
<p>分析了<code v-pre>reduce</code>累计计算器这个<code v-pre>API</code>的使用</p>
</li>
<li>
<p>常用的数组方法解析，以及实际应用场景</p>
</li>
<li>
<p>本文示例<a href="'https://github.com/maicFir/lessonNote/tree/master/javascript/20-%E6%95%B0%E7%BB%84" title="code example">code example</a></p>
</li>
</ul>
</div></template>
