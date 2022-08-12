<template><div><p>迭代器和生成器在前端业务里经常有用到，但是可能感受不太明显。特别是生成器，在<code v-pre>react</code>中如果你有用过<code v-pre>redux</code>中间件<code v-pre>redux-saga</code>那么你一定对生成器很熟悉。</p>
<p>本文是笔者对于迭代器与生成器的理解，希望在项目中有所帮助.</p>
<p>在阅读本文之前，主要会从以下几点去探讨迭代器/生成器</p>
<ul>
<li>
<p>迭代器是什么，想想为什么会有迭代器</p>
</li>
<li>
<p>生成器又是什么，它解决了什么样的问题</p>
</li>
<li>
<p>以实际例子阐述迭代器与生成器</p>
</li>
</ul>
<p>正文开始...</p>
<h3 id="迭代器是什么" tabindex="-1"><a class="header-anchor" href="#迭代器是什么" aria-hidden="true">#</a> 迭代器是什么</h3>
<p>参考<code v-pre>mdn</code>上解释，迭代器是一个对象，每次调用<code v-pre>next</code>方法返回一个<code v-pre>{done: false, value: ''}</code>,每次调用<code v-pre>next</code>返回当前值，直至最后一次调用时返回<code v-pre>{value:undefined,done: true}</code>时结束，无论后面调用<code v-pre>next</code>方法都只会返回<code v-pre>{value: undefined,done:true}</code></p>
<p>在过往的业务中，你一定用过<code v-pre>for ... of</code>循环过<code v-pre>数组</code>或者<code v-pre>Map</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">10</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* {name: 'Maic', age:18},{name: 'Maic', age:18} */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为数组就是可以支持迭代器对象，并且<code v-pre>for...of</code>可以中断循环，关于循环中断可以参考以前写的一篇文章<a href="https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&amp;mid=2247485070&amp;idx=1&amp;sn=8ccd16ec243aada2f04beaaf1477a085&amp;chksm=c3683ffcf41fb6eaf72f210cbbbc79d52485cdc37812dd9d0aa3d74fa14a4734dcfac9a8daf2#rd" target="_blank" rel="noopener noreferrer">你不知道的JS循环中断 <ExternalLinkIcon/></a></p>
<p>因为数组是支持可迭代的对象，如果使用迭代器获取每组数据应该怎么做呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Tom'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">10</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token keyword">const</span> iterator <span class="token operator">=</span> arr<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们执行<code v-pre>node index.js</code>可以看到运行结果
<img src="https://files.mdnice.com/user/24614/05c94965-6ccc-4a0a-9a60-6a2b90a8aa85.png" alt="">
当我们每次调用<code v-pre>iterator.next()</code>值时，都会返回当前的值，并且返回的值是<code v-pre>{value: xxx, done: false}</code>,直至最后，返回的值<code v-pre>{value: undefined, done: true }</code></p>
<p>不知道你发现没有，上面迭代器，我是通过数组访问<code v-pre>Symbol.iterator</code>方法，再调用返回的<code v-pre>next</code>方法，最后得到当前的值</p>
<p>我们可以在控制台看下
<img src="https://files.mdnice.com/user/24614/22f21f45-ae02-44dd-bc3e-3a086b50df9a.png" alt="">
数组是有这个<code v-pre>Symbol.iterator</code>属性的</p>
<p>从以上迭代器特征中，我们可以得知，数组是通过一个<code v-pre>Symbol.iterator</code>方法，返回一个<code v-pre>next</code>方法，并且<code v-pre>next</code>方法返回<code v-pre>{value: xx, done: false}</code>，我们模拟一个迭代器</p>
<h3 id="模拟迭代器" tabindex="-1"><a class="header-anchor" href="#模拟迭代器" aria-hidden="true">#</a> 模拟迭代器</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> iteratorObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    count： <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iteratorObj<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iteratorObj<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iteratorObj<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iteratorObj<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打印的结果依次是:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时你会发现<code v-pre>iteratorObj</code>就基本实现了一个迭代器的基本功能。</p>
<p>我们用一个对象模拟了迭代器，但是我们发现这个对象迭代器貌似没法复用</p>
<p>因此我们创建一个迭代器的工具函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createIteror</span><span class="token punctuation">(</span><span class="token parameter">arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            count<span class="token operator">++</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> arr<span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token literal-property property">done</span><span class="token operator">:</span> count <span class="token operator">>=</span> arr<span class="token punctuation">.</span>length
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> newCreateInteror <span class="token operator">=</span> <span class="token function">createIteror</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newCreateInteror<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newCreateInteror<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newCreateInteror<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newCreateInteror<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此<code v-pre>createIteror</code>这个方法就具备了迭代器的功能</p>
<p>我们在这之前用<code v-pre>iteratorObj</code>模拟了一个具备<code v-pre>迭代器</code>的功能，但是如何让真正的对象支持迭代呢</p>
<h3 id="让对象支持迭代器功能" tabindex="-1"><a class="header-anchor" href="#让对象支持迭代器功能" aria-hidden="true">#</a> 让对象支持迭代器功能</h3>
<p>不知道你发现没有，其实数组原型上是有<code v-pre>Symbol.iterator</code>，所以如果要让一个对象支持迭代器功能，那么只需要遵循<code v-pre>迭代协议</code>即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> coustomerInteror <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 让对象支持迭代器协议，需要增加一个Symbol.iterator可访问的方法，并返回一个迭代器对象，迭代器对象可以调用`next`方法，在next方法中返回一个当前对象的值</span>
    <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                count<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">done</span><span class="token operator">:</span> count <span class="token operator">>=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">.</span>length
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> newInter <span class="token operator">=</span> coustomerInteror<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newInter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newInter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newInter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newInter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> coustomerInteror<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token string">'=result'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到打印的结果
<img src="https://files.mdnice.com/user/24614/9cb6d549-52ec-46ec-801a-0935796d2b1a.png" alt=""></p>
<p>因此让一个对象支持迭代器功能，只需要新增一个<code v-pre>Symbol.iterator</code>方法，遵循<code v-pre>迭代器</code>原则</p>
<h3 id="支持所有对象可迭代" tabindex="-1"><a class="header-anchor" href="#支持所有对象可迭代" aria-hidden="true">#</a> 支持所有对象可迭代</h3>
<p>我们从以上结果得知要想一个对象支持迭代器功能，必须要有<code v-pre>Symbol.iterator</code>这样的<code v-pre>迭代器协议</code></p>
<p>因此我们可以在<code v-pre>Object</code>原型上新增这样的一个<code v-pre>迭代器协议</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 在Object.prototype原型上扩展Symbol.iterator</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">[</span>keys<span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token literal-property property">done</span><span class="token operator">:</span> count <span class="token operator">>=</span> keys<span class="token punctuation">.</span>length
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> cobj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> iteror <span class="token operator">=</span> cobj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iteror<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iteror<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iteror<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> cobj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token string">'=rs'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span> <span class="token operator">=</span> cobj<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行的结果是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
<span class="token number">1</span> <span class="token operator">=</span>rs
<span class="token number">2</span> <span class="token operator">=</span>rs
<span class="token number">1</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现当我们使用数组解构时，居然可以解构对象的值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span> <span class="token operator">=</span> cobj<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>本质上就是我们迭代器会自动调用<code v-pre>iteror.next().value</code>然后一一赋值返回了。</p>
<p>所以支持<code v-pre>迭代器</code>对象不仅可以<code v-pre>for...of</code>也可以被<code v-pre>数组解构</code>，这样所有<code v-pre>var obj = {}</code>这样类似申明的对象都可以支持迭代器了。</p>
<h3 id="构造函数支持可迭代" tabindex="-1"><a class="header-anchor" href="#构造函数支持可迭代" aria-hidden="true">#</a> 构造函数支持可迭代</h3>
<p>我们现在有个需求，需要支持通过构造函数<code v-pre>new</code>出来的对象支持可迭代器功能</p>
<p>具体我们看下代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Maic'</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                count<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token comment">// 获取对象的所有属性key</span>
                <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">[</span>keys<span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">done</span><span class="token operator">:</span> count <span class="token operator">>=</span> keys<span class="token punctuation">.</span>length
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> iter <span class="token operator">=</span> person<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'=='</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'=='</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>iter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'=='</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">===</span> <span class="token string">'Maic'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span> <span class="token comment">// 可以中断循环</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token comment">// 这里并不会打印</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span>name<span class="token punctuation">,</span> age<span class="token punctuation">]</span> <span class="token operator">=</span> person<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本质上也是在构造函数<code v-pre>Person</code>内部新增了<code v-pre>Symbol.iterator</code>方法，并且返回了一个迭代器对象</p>
<p>打印的结果如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span> <span class="token operator">==</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span> <span class="token operator">==</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token operator">==</span>
Maic <span class="token number">18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此你应该非常了解迭代器的对象的特性了哈</p>
<p>能够<code v-pre>for...of</code>循环中断，且能够<code v-pre>数组解构</code>、<code v-pre>扩展</code>,所以你知道为啥会有迭代器了吗？</p>
<h3 id="那些原生api支持迭代器" tabindex="-1"><a class="header-anchor" href="#那些原生api支持迭代器" aria-hidden="true">#</a> 那些原生API支持迭代器</h3>
<p>首先是数组<code v-pre>Array</code>，<code v-pre>Map</code>，<code v-pre>Set</code></p>
<p>只要是有迭代器特性，那么就可以被<code v-pre>for...of</code>，数组解构等</p>
<h3 id="生成器" tabindex="-1"><a class="header-anchor" href="#生成器" aria-hidden="true">#</a> 生成器</h3>
<p>这是es6新增的，参考<a href="https://es6.ruanyifeng.com/#docs/generator" title="generator" target="_blank" rel="noopener noreferrer">generator<ExternalLinkIcon/></a>解释，生成器是一种异步解决的方案,也可以理解一种函数内部的状态机,能中断函数，也就是说能够控制函数的运行</p>
<p>具体我们以一个实际例子看下生成器是什么</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">genter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gen <span class="token operator">=</span> <span class="token function">genter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了一个普通函数，但是这个普通函数比较特殊，前面有<code v-pre>*</code>,这就是定义生成器函数，我们暂定把<code v-pre>gen</code>这个称呼为生成器对象</p>
<p>然后我们打印生成器对象，实际是就像函数调用一样，不过此时返回的是一个<code v-pre>Object Generator</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object <span class="token punctuation">[</span>Generator<span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是我们继续看下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">genter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gen <span class="token operator">=</span> <span class="token function">genter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> gen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时打印的结果是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
<span class="token number">1</span>
<span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看下生成器函数内部是有<code v-pre>yield</code>这样的东西</p>
<p>实际上这就是内部函数的<code v-pre>状态机</code>，当你使用用生成器时，你调用<code v-pre>next</code>就会返回一个对象，并且像迭代器一样返回<code v-pre>{value: xxx, done: false}</code>
因此在使用上，我们必须认清，生成器必须是带有<code v-pre>*</code>定义的函数，内部是<code v-pre>yield</code>执行的状态机</p>
<p>当我们调用函数生成器时，并不会立即执行，返回一个遍历对象并返回一个<code v-pre>next</code>方法，当遍历对象调用<code v-pre>next</code>时，就会返回<code v-pre>yield</code>执行的状态机，并返回一个迭代器对象的值，<code v-pre>yield</code>会在当前状态暂停，只有调用<code v-pre>next</code>时，就会执行<code v-pre>yield</code>，<code v-pre>yield</code></p>
<p><code v-pre>value</code>表示当前<code v-pre>yield</code>的值，<code v-pre>done:false</code>表示当前遍厉没有结束，如果继续执行<code v-pre>gen.next()</code>那么就会返回当前的<code v-pre>yield</code>值，直到<code v-pre>done:true</code>时，表示当前遍历对象已经完全遍历完毕。</p>
<p>我们再来看下这段代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'start'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> genterStart <span class="token operator">=</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时你会发现并不会调用<code v-pre>start</code>方法</p>
<p>但是你执行下面代码时，才会立即调用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'start'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> genterStart <span class="token operator">=</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    genterStart<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们会发现定时定时1s后才执行<code v-pre>start</code>方法，而且是通过<code v-pre>next</code>去执行的。</p>
<p>所以此时这个<code v-pre>start</code>变成了一个<code v-pre>暂缓的执行函数</code>,同时我们要注意<code v-pre>yield</code>只能用在<code v-pre>*</code>定义的生成器内部</p>
<h3 id="生成器-扁平化数组" tabindex="-1"><a class="header-anchor" href="#生成器-扁平化数组" aria-hidden="true">#</a> 生成器-扁平化数组</h3>
<p>我们在以往的业务中多少有写过扁平化数组，通常也是用递归实现多维数组的打平,现在我们尝试用生成器来实现一个扁平化数组</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">flat</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> item <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果是数组，则递归</span>
            <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">flat</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">yield</span> item
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> sourceArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> <span class="token function">flat</span><span class="token punctuation">(</span>sourceArr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token comment">// [1,2,3,4,5,6]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是这个<code v-pre>flat</code>貌似不太通用，因此可不可以像原生<code v-pre>flat</code>方法一样,因此我们向下面这样做，在<code v-pre>Array</code>的原型上新增一个方法，让所有的数组都能访问这个自定义方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Array的prototype中绑定一个公有方法</span>
<span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$myFlat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义一个flat生成器</span>
    <span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">flat</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 递归当前flat</span>
                <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">flat</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">yield</span> item
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> ngen <span class="token operator">=</span> <span class="token function">flat</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">...</span>ngen<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> sourceArr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sourceArr2<span class="token punctuation">.</span><span class="token function">$myFlat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/71b56d2f-fbd8-42f5-9473-cde5570d753a.png" alt=""></p>
<p>因此<code v-pre>$myFlat</code>这个方法就像原生<code v-pre>flat</code>一样了</p>
<h3 id="生成器与迭代器的关系" tabindex="-1"><a class="header-anchor" href="#生成器与迭代器的关系" aria-hidden="true">#</a> 生成器与迭代器的关系</h3>
<p>当我们看到用<code v-pre>*</code>定义的方法，就变成一个生成器，此时我们调用这个生成器方法，那么此时就可以<code v-pre>for...of</code>循环了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gtest <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// gtest.next() { value:1,done: false}</span>
<span class="token comment">// for (let item of gtest) {</span>
<span class="token comment">//     console.log(item) 这里相当于已经调用了gtest.next().value</span>
<span class="token comment">// }</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">]</span> <span class="token operator">=</span> gtest<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'abc'</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打印的结果就是:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>abc <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token keyword">undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们进一步测试一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gtest <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> gtest<span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们就会发现<code v-pre>gtest</code>可以通过<code v-pre>Symbol.iterator</code>这个方法直接调用，居然于它本身相等。</p>
<p><img src="https://files.mdnice.com/user/24614/9cf5abcf-9481-4074-bc6d-cc9826e8b93b.png" alt="">
从控制台中我们可以知道<code v-pre>gtest</code>返回就是一个生成器对象，它的构造函数是<code v-pre>GeneratorFunction</code>,并且原型上有<code v-pre>Symbol.iterator</code>，而且是一个迭代器。</p>
<p>当你使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
gtest<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
gtest<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
gtest<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 以上等价于</span>
<span class="token comment">/*
  gtest.next();
  gtest.next();
  gtest.next();
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看下控制台打印的结果就知道了
<img src="https://files.mdnice.com/user/24614/97a20d01-333f-4027-aeca-ed5f8fedf447.png" alt=""></p>
<p>所以大概了解生成器与迭代器的关系了么？本质上是通过生成器对象的prototype的<code v-pre>Symbol.iterator</code>连接了起来</p>
<h3 id="生成器函数的return" tabindex="-1"><a class="header-anchor" href="#生成器函数的return" aria-hidden="true">#</a> 生成器函数的return</h3>
<p>当我们在生成器函数内部return时，那么当调用<code v-pre>next</code>迭代完所有的值时，继续调用<code v-pre>next</code>，则会返回<code v-pre>return</code>的值</p>
<p>什么意思，我们看下下面这段代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gtest <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// {value: 1,done: false}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {value: 2,done: false}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {value: 3,done: false}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {value: 4,done: true}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {value: undefined,done: true}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>yield</code>后面可以是变量或者具体函数返回值
你可以这么写</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">logNum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token operator">=></span> num
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> b<span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token function">logNum</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gtest <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成器传参数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">logNum</span> <span class="token operator">=</span> <span class="token parameter">num</span> <span class="token operator">=></span> num
    <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// n为下面第二个yield(10)这里n = 10</span>
    <span class="token keyword">yield</span> n <span class="token operator">*</span> b<span class="token punctuation">;</span> <span class="token comment">// 这个n就是第二个next传入的，会把第一个yield当返回值，传给下个yield</span>
    <span class="token keyword">yield</span> <span class="token function">logNum</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gtest <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 20</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gtest<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">/*
{ value: 1, done: false }
{ value: 20, done: false }
{ value: 5, done: false }
{ value: 4, done: true }
{ value: undefined, done: true }
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生成器捕获异常" tabindex="-1"><a class="header-anchor" href="#生成器捕获异常" aria-hidden="true">#</a> 生成器捕获异常</h3>
<p>主要是在<code v-pre>yield</code>捕获异常，具体看下下面这个简单的例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> <span class="token string">'---2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> gen <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
gen<span class="token punctuation">.</span><span class="token function">throw</span><span class="token punctuation">(</span><span class="token string">'错误了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 并不会运行</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们执行<code v-pre>gen.next()</code>时会执行<code v-pre>yield 1</code>此时返回<code v-pre>{value: 1, done: false}</code>
当我们执行<code v-pre>gen.throw</code>时，此时<code v-pre>yield 2</code>会暂停，并且就会中断了。并且后面的<code v-pre>gen.next()</code>就是默认返回<code v-pre>{value: undefined, done: true}</code></p>
<h3 id="yield状态机" tabindex="-1"><a class="header-anchor" href="#yield状态机" aria-hidden="true">#</a> yield状态机</h3>
<p>我们在这之前都见过<code v-pre>yield</code>只能在生成器中使用，那到底有哪些使用,我们写个例子熟悉一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> bGen <span class="token operator">=</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// console.log([...bGen]); [1,2,3]</span>
<span class="token comment">// console.log(bGen.next()) 注意这个与上面不能同时使用，不然这个bGen就是返回{value: undefined, done: true}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>yield</code>后面能是函数返回值，能是变量，也可以是一个生成器函数</p>
<h3 id="让一个对象的方法支持生成器" tabindex="-1"><a class="header-anchor" href="#让一个对象的方法支持生成器" aria-hidden="true">#</a> 让一个对象的方法支持生成器</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">*</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token string">'Maic'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {value: 'Maic', done: false}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等价</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getAge</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token operator">*</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> <span class="token number">18</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> age <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {value: 18, done: false}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生成器不能为new" tabindex="-1"><a class="header-anchor" href="#生成器不能为new" aria-hidden="true">#</a> 生成器不能为new</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// new a() error</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生成器异步操作" tabindex="-1"><a class="header-anchor" href="#生成器异步操作" aria-hidden="true">#</a> 生成器异步操作</h3>
<p>在以往业务中肯定有这种场景，点击页面首先加载<code v-pre>loading</code>,然后请求数据，当数据请求成功后，就结束<code v-pre>loading</code>,我们看一段简单的伪代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义了一个获取数据的生成器方法，setTimeout模拟异步请求</span>
<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Web技术学苑'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们定义一个<code v-pre>loadUI</code>生成器</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">loadUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'正在加载中...,开启loading...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span><span class="token operator">*</span> <span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'加载完成,关闭loading'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> loadStart <span class="token operator">=</span> <span class="token function">loadUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 加载数据,调用next().value 获取yield的值</span>
<span class="token keyword">const</span> currentData <span class="token operator">=</span> loadStart<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
currentData<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    loadStart<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 关闭加载，加载完成，执行yield 后面的代码</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/b346d31b-c382-4a74-a0ec-cbeee4aeae76.png" alt=""></p>
<p>或者你可以这样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">loadUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'正在加载中...,开启loading...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'加载完成,关闭loading'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> loadStart <span class="token operator">=</span> <span class="token function">loadUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> mockData <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maic'</span><span class="token punctuation">,</span>
                <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Web技术学苑'</span><span class="token punctuation">,</span>
                <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        loadStart<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>mockData<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// next传入数据当成yield状态机的返回值</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
<span class="token comment">// 继续执行yield后面的代码</span>
loadStart<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行的结果依旧是一样的，这样我就可以通过<code v-pre>loadStart</code>精准的控制数据请求在哪里执行了。如果我最后一行代码不执行，那么久不会执行后面的打印代码了，从而达到精准的控制函数内部的执行。</p>
<h3 id="控制多个函数按顺序执行" tabindex="-1"><a class="header-anchor" href="#控制多个函数按顺序执行" aria-hidden="true">#</a> 控制多个函数按顺序执行</h3>
<p>假设有一个场景，就是<code v-pre>fn2</code>依赖<code v-pre>fn1</code>的结果而决定是否是否执行，<code v-pre>fn3</code>依赖<code v-pre>fn2</code>的状态是否继续执行，那怎么设计呢？生成器可以帮我们解决这个需求问题</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'我是fn1,你成功了，请进行下一步'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'我是fn2,失败了'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'恭喜你，闯关成功了...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
<span class="token keyword">const</span> source <span class="token operator">=</span> <span class="token punctuation">[</span>fn1<span class="token punctuation">,</span> fn2<span class="token punctuation">,</span> fn3<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token parameter">arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">yield</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span> <span class="token string">"i"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> it <span class="token operator">=</span> <span class="token function">main</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> it<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span>code <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'我是fn1,你成功了，请进行下一步'</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'我是fn2,失败了'</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当<code v-pre>fn2</code>返回<code v-pre>code:0</code>就会终止<code v-pre>break</code>中止，当<code v-pre>fn2</code>中返回的<code v-pre>code</code>是1时，才会进入下一个迭代</p>
<p>当我们<code v-pre>for...of</code>时，内部会依次调用<code v-pre>next</code>方法进行遍历数据。因为是迭代器，每次<code v-pre>next</code>的值返回的就是<code v-pre>yield</code>的值，并且返回<code v-pre>{value: xxx, done: false}</code>,直到最后<code v-pre>{value: undefined, done: true}</code></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>迭代器是一个对象，迭代器对象有一个<code v-pre>next</code>方法，当我们调用<code v-pre>next</code>方法时，会返回一个对象<code v-pre>{value: xx, done: false}</code>,<code v-pre>value</code>就是当前迭代器迭代的具体值，当迭代器对象每调用一次<code v-pre>next</code>方法时，就会获取当前的值，直到迭代完全,最后返回<code v-pre>{done: true, value: undefined}</code></p>
</li>
<li>
<p>每一个迭代器都可以被<code v-pre>for...of</code>、<code v-pre>数组解构</code>以及数组扩展</p>
</li>
<li>
<p>生成器函数，<code v-pre>yield</code>可以中断函数，当我们调用函数生成器时，实际上并不会立即执行生成器函数，这个调用的函数生成器在调用时会返回一个迭代器，每次调用<code v-pre>next</code>方法会返回一个对象，这个对象的值跟迭代器一样，并且返回的<code v-pre>value</code>是<code v-pre>yield</code>的值，每次调用，才会执行yield，后面的代码会中断。只有继续调用<code v-pre>next</code>才会继续往后执行。</p>
</li>
<li>
<p>生成器函数调用返回的是一个迭代器，具备迭代器所有特性，<code v-pre>yield</code>这个状态机只能在生成器函数内部使用</p>
</li>
<li>
<p>以实际例子对<code v-pre>对象</code>扩展支持迭代器特性，如果需要支持迭代器特征，那么必须原型上扩展<code v-pre>Symbol.iterator</code>方法，以<code v-pre>$flat</code>在数组原型上利用函数生成器实现扁平化数组等。</p>
</li>
<li>
<p>本文<a href="'https://github.com/maicFir/lessonNote/tree/master/javascript/19-%E8%BF%AD%E4%BB%A3%E5%99%A8" title="code-example">code-example</a></p>
</li>
</ul>
</div></template>
