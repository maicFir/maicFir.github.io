<template><div><blockquote>
<p><code v-pre>选择排序</code>是一种简单的排序，时间复杂度是 O(n^2)，在<code v-pre>未排序</code>的数组中找到最小的那个数字，然后将其放到<code v-pre>起始位置</code>，从剩下未排序的数据中继续寻找最小的元素，将其放到已排序的末尾，以次类推，直到所有元素排序结束为止。</p>
</blockquote>
<p>我们先看下选择排序的一段代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">selectSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">var</span> minIndex<span class="token punctuation">,</span> temp<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    minIndex <span class="token operator">=</span> i<span class="token punctuation">;</span> <span class="token comment">//假设当前循环索引是最小元素</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>minIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        minIndex <span class="token operator">=</span> j<span class="token punctuation">;</span> <span class="token comment">// 寻找最小的值</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 交换minIndex与i元素的值</span>
    temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>minIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>minIndex<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> arr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">selectSort</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">91</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们画个图还原排序所有过程，具体如下
<img src="https://files.mdnice.com/user/24614/b4a4a35e-c26f-4177-83fd-8f813c4d52e6.png" alt=""></p>
<p>从每次循环中我们可以知道选择排序，实际上就是先确认起始位置的索引，假设第一个是最小位置，从剩余元素中找到比第一个位置小的值，如果剩余的元素有比它小，那么确认当前索引为最小索引值，并交换两个元素的位置。</p>
<p>然后再从第二元素开始，假设第二元素是最小值，然后从剩余元素中找最小的元素，如果剩余元素有比它小就交换位置，如果没有，就正常不交换位置，直到循环到最后一个元素为止。</p>
<p>再言简意赅点，选择排序就是</p>
<p>1、假设第一个元素是最小值</p>
<p>2、从剩余元素中选择与第一个元素比较元素大小，确认最小索引值，然后交换位置</p>
<p>3、从剩余位置依次循环，假设剩余位置为最小值，然后从剩余元素中选择与之进行比较，然后确认是否交换位置</p>
<p>4、直到循环到最后一个索引为止</p>
<p><img src="https://files.mdnice.com/user/24614/daaff07e-d5e1-4f5b-8a30-6a5d12dcc29b.png" alt="">
最后看一张图
<img src="https://files.mdnice.com/user/24614/9b525d2d-1ffb-4dba-bd76-2bfaf7e141ca.gif" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>1、<code v-pre>选择排序</code>时间复制度是 O(n^2)</p>
<p>2、假设首个元素是最小的元素，在剩余未排序的元素中与之进行比较，如果比它小，就确认最小位置索引，与之交换位置</p>
<p>3、在剩余未排序的所有的元素中，假设首个元素是最小值，然后与剩余元素进行依次比较，确认元素当前最小最小索引，交换位置，依次循环，直到最后循环结束为止</p>
</div></template>
