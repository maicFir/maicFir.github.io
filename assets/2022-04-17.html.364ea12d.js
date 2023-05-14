import{_ as n,o as s,c as a,e as p}from"./app.13e035d0.js";const t={},e=p(`<blockquote><p>\u867D\u7136\u5E73\u65F6\u4E1A\u52A1\u63A5\u89E6\u7B97\u6CD5\u4E0D\u591A\uFF0C\u4F46\u662F\u516C\u53F8\u5BF9\u4E8E\u7A0B\u5E8F\u5458\u7684\u7B97\u6CD5\u8981\u6C42\u8D8A\u6765\u8D8A\u9AD8\uFF0C\u57FA\u7840\u4E0D\u7262\uFF0C\u5730\u52A8\u5C71\u6447\uFF0C\u4F18\u79C0\u7684\u7A0B\u5E8F\u5458\uFF0C\u7B97\u6CD5\u662F\u6838\u5FC3\u7ADE\u4E89\u529B\uFF0C\u4E5F\u662F\u89E3\u51B3\u590D\u6742\u95EE\u9898\u7684\u4E00\u79CD\u5FC5\u8981\u624B\u6BB5\u3002</p></blockquote><p>\u524D\u6BB5\u65F6\u95F4\u52A0\u4E86\u4E00\u4E2A\u5237\u7B97\u6CD5\u9898\u7684\u7FA4\uFF0C\u4E5F\u5237\u4E86<code>leetcode</code>\u7684\u4E00\u4E9B\u9898\u76EE\uFF0C\u4ECA\u5929\u4E00\u8D77\u5B66\u4E60\u638C\u63E1<code>\u4E8C\u5206\u67E5\u627E</code>\uFF0C\u719F\u8BB0\u4E8E\u5FC3\uFF0C\u89E6\u7C7B\u65C1\u901A\uFF0C\u8FBE\u5230\u771F\u6B63\u638C\u63E1\u6BCF\u79CD\u89E3\u9898\u7684\u65B9\u6CD5\uFF0C\u5E0C\u671B\u4F60\u5728\u5B9E\u9645\u4E1A\u52A1\u4E2D\u6709\u6240\u5E2E\u52A9\u548C\u601D\u8003\u3002</p><p>\u6B63\u6587\u5F00\u59CB...</p><h3 id="\u4E8C\u5206\u67E5\u627E" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u5206\u67E5\u627E" aria-hidden="true">#</a> \u4E8C\u5206\u67E5\u627E</h3><p>\u9898\u76EE\uFF1A\u7ED9\u5B9A\u4E00\u4E2A<code>\u6709\u5E8F</code>\u65E0\u91CD\u590D\u7684\u6570\u7EC4<code>arr</code>\u548C\u76EE\u6807\u5143\u7D20<code>target</code>,\u8FD4\u56DE\u6570\u7EC4<code>arr</code>\u4E2D<code>target</code>\u5143\u7D20\u7684\u4E0B\u6807\u4F4D\u7F6E</p><p>\u601D\u8DEF\uFF1A\u5728<code>[left, right]</code>\u533A\u95F4\u4E2D\u67E5\u627E\uFF0C\u6307\u5B9A\u4E2D\u95F4\u4F4D\u7F6E\u4E0E\u76EE\u6807\u5143\u7D20\u8FDB\u884C\u6BD4\u8F83\uFF0C\u5982\u679C<code>\u76EE\u6807\u5143\u7D20</code>\u5728<code>\u4E2D\u95F4\u5143\u7D20</code>\u7684\u5DE6\u8FB9\uFF0C\u90A3\u4E48\u53F3\u4FA7\u533A\u95F4\u5C31\u662F<code>[left,mid -1]</code>,\u5982\u679C\u76EE\u6807\u5143\u7D20\u5728<code>\u4E2D\u95F4\u5143\u7D20</code>\u7684\u53F3\u8FB9\uFF0C\u90A3\u4E48\u5C31\u4ECE\u5DE6\u4FA7\u533A\u95F4\u5F00\u59CB<code>[mid+1, right]</code>,\u76F4\u81F3\u627E\u5230\u4E0E\u76EE\u6807\u5143\u7D20\u8FD4\u56DE<code>mid</code>\u4E3A\u6B62\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// \u6570\u7EC4\u7B2C\u4E00\u4E2A\u4F4D\u7F6E</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// \u6570\u7EC4\u4E2D\u6700\u540E\u4E00\u4E2A\u4F4D\u7F6E  // [left, right] \u533A\u95F4\u67E5\u627E</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u53D6\u6570\u7EC4\u4E2D\u95F4\u4F4D\u7F6E</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u76EE\u6807\u5143\u7D20\u5728\u4E2D\u95F4\u4F4D\u7F6E\u7684\u5DE6\u8FB9</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// [left, mid-1]</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u76EE\u6807\u5143\u7D20\u5728\u4E2D\u95F4\u5143\u7D20\u7684\u53F3\u8FB9\uFF0C\u90A3\u4E48\u5DE6\u533A\u95F4[mid+1,right]</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> mid<span class="token punctuation">;</span> <span class="token comment">// \u76F4\u5230\u627E\u5230target,\u76F8\u7B49\u5C31\u76F4\u63A5\u8FD4\u56DEmid\u4E2D\u95F4\u4E0B\u6807\u4F4D\u7F6E</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// \u6CA1\u6709\u627E\u5230\u5C31\u8FD4\u56DE-1}binarySearch([1,3,4,5,7,8], 3); // 1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7528\u4E00\u5F20\u6D41\u7A0B\u56FE\u63CF\u8FF0\u4E00\u4E0B\u4E0A\u9762\u7684\u4E00\u6BB5\u4EE3\u7801<img src="https://mmbiz.qpic.cn/mmbiz_png/0jXCeiaibicNx6ib7h4ic2rSp3EdfESHyfgJZVDWSjrIxcrGz437MkoLeJ21ibDu8JQclaX0P2ru5emVCMmqiaTtr4y8Q/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="\u56FE\u7247">\u63A5\u4E0B\u6765\u518D\u770B\u4E0B\u5177\u4F53\u8FC7\u7A0B<img src="https://mmbiz.qpic.cn/mmbiz_png/0jXCeiaibicNx6ib7h4ic2rSp3EdfESHyfgJZiaDQMIvW38vNjrVjEXwFnSk0khatOVSIN6decO4VkOm3y6dTGeDYDYg/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="\u56FE\u7247">\u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u4E8C\u5206\u67E5\u627E\u5B9E\u9645\u4E0A\u662F\u4ECE\u4E2D\u95F4\u4F4D\u7F6E\u5F00\u59CB\u7684\uFF0C\u5982\u679C\u76EE\u6807\u503C\u5728\u4E2D\u95F4\u4F4D\u7F6E\u7684\u5DE6\u8FB9\uFF0C\u4E0D\u65AD\u7684\u51CF\u5C11<code>right</code>\u533A\u95F4\uFF0C\u76F4\u81F3\u627E\u5230<code>mid = right -1</code>,\u5F53\u76EE\u6807\u503C<code>target=3</code>\u65F6\uFF0C\u90A3\u4E48\u5C31\u8FD4\u56DE<code>mid</code>\u7684\u4E0B\u6807\u4F4D\u7F6E\u3002</p><p>\u8FD8\u6709\u4E00\u79CD\u662F\u5DE6\u95ED\u53F3\u5F00<code>[left,right)</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// \u6570\u7EC4\u7B2C\u4E00\u4E2A\u4F4D\u7F6E</span>
  <span class="token keyword">let</span> right <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// \u6570\u7EC4\u4E2D\u6700\u540E\u4E00\u4E2A\u4F4D\u7F6E  // [left,right) \u533A\u95F4\u67E5\u627E</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u53D6\u6570\u7EC4\u4E2D\u95F4\u4F4D\u7F6E</span>
    <span class="token keyword">let</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u76EE\u6807\u5143\u7D20\u5728\u4E2D\u95F4\u4F4D\u7F6E\u7684\u5DE6\u8FB9</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      right <span class="token operator">=</span> mid<span class="token punctuation">;</span> <span class="token comment">// [left, mid]</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u76EE\u6807\u5143\u7D20\u5728\u4E2D\u95F4\u5143\u7D20\u7684\u53F3\u8FB9\uFF0C\u90A3\u4E48\u5DE6\u533A\u95F4[mid+1,right]</span>
      left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> mid<span class="token punctuation">;</span> <span class="token comment">// \u76F4\u5230\u627E\u5230target,\u76F8\u7B49\u5C31\u76F4\u63A5\u8FD4\u56DEmid\u4E2D\u95F4\u4E0B\u6807\u4F4D\u7F6E</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// \u6CA1\u6709\u627E\u5230\u5C31\u8FD4\u56DE-1</span>
<span class="token punctuation">}</span>
<span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="findindex" tabindex="-1"><a class="header-anchor" href="#findindex" aria-hidden="true">#</a> findIndex</h3><p>\u5DE7\u7528\u6570\u7EC4\u63D0\u4F9B\u7684<code>api</code>\u627E\u5230\u5339\u914D\u7684\u7D22\u5F15</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> v <span class="token operator">===</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F60\u4F1A\u53D1\u73B0\u539F\u751F\u63D0\u4F9B\u7684<code>findIndex</code>\u65E0\u8BBA\u6570\u7EC4\u4E2D\u662F\u5426\u6709\u5E8F\uFF0C\u8FD8\u662F\u65E0\u5E8F\u90FD\u53EF\u4EE5\u627E\u5230<code>target</code>\u7684\u7D22\u5F15,\u4F46\u662F<code>findIndex</code>\u4E5F\u6709\u7F3A\u9677\uFF0C\u5982\u679C\u6570\u7EC4\u4E2D\u6709\u91CD\u590D\u7684\u503C\uFF0C\u90A3\u4E48\u53EA\u4F1A\u8FD4\u56DE\u7B2C\u4E00\u4E2A\u5148\u627E\u5230\u7684\u4E0B\u6807\u7D22\u5F15\u3002</p><h3 id="\u66B4\u529B-for-\u5FAA\u73AF\u627E\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#\u66B4\u529B-for-\u5FAA\u73AF\u627E\u7D22\u5F15" aria-hidden="true">#</a> \u66B4\u529B for \u5FAA\u73AF\u627E\u7D22\u5F15</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token parameter">arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> index <span class="token operator">=</span> target <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      index <span class="token operator">=</span> i<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> index<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5DE7\u7528-map-\u79FB\u82B1\u63A5\u6728" tabindex="-1"><a class="header-anchor" href="#\u5DE7\u7528-map-\u79FB\u82B1\u63A5\u6728" aria-hidden="true">#</a> \u5DE7\u7528 map\uFF0C\u79FB\u82B1\u63A5\u6728</h3><p>map \u8FD9\u79CD\u65B9\u5F0F\u7684\u7F3A\u9677\u662F\u6570\u7EC4\u4E2D\u4E0D\u80FD\u6709\u91CD\u590D\u7684\u503C\uFF0C\u53EA\u662F\u9488\u5BF9\u65E0\u91CD\u590D\u7684\u6570\u7EC4</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token parameter">arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u5C06\u503C\u8BBE\u7F6E\u6210map\u7684key</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">?</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u501F\u7528\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#\u501F\u7528\u5BF9\u8C61" aria-hidden="true">#</a> \u501F\u7528\u5BF9\u8C61</h3><p>\u53EA\u9488\u5BF9\u65E0\u91CD\u590D\u6570\u7EC4</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token parameter">arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">[</span>v<span class="token punctuation">]</span> <span class="token operator">=</span> index<span class="token punctuation">;</span> <span class="token comment">// \u5C06\u503C\u8BBE\u7F6E\u6210map\u7684key</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> target<span class="token punctuation">)</span> <span class="token operator">?</span> result<span class="token punctuation">[</span>target<span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h3><p>1\u3001\u4E8C\u5206\u67E5\u627E\uFF0C\u5C06\u6570\u7EC4\u4E00\u5206\u4E3A\u4E8C\uFF0C\u786E\u8BA4\u4E2D\u95F4\u4F4D\u7F6E\uFF0C\u786E\u5B9A\u5143\u7D20\u6240\u5728\u533A\u57DF\u8303\u56F4\uFF0C\u5982\u679C\u662F\u5728\u5DE6\u533A\u95F4\uFF0C\u5219\u53F3\u533A\u95F4\u5219\u662F<code>mid - 1</code>,\u5DE6\u533A\u95F4\u5219\u56FA\u5B9A<code>[left, mid -1]</code>\uFF0C\u5982\u679C\u5143\u7D20\u6240\u5728\u533A\u57DF\u662F\u53F3\u533A\u95F4\uFF0C\u90A3\u4E48\u786E\u5B9A\u662F\u53F3\u533A\u95F4\uFF0C\u53F3\u533A\u95F4\u56FA\u5B9A\uFF0C\u5DE6\u533A\u95F4\u5219\u662F<code>mid+1</code>,<code>[mid+1,right]</code></p><p>2\u3001\u4F7F\u7528\u539F\u751F\u63D0\u4F9B\u7684<code>findIndex</code>\u5FEB\u901F\u5BFB\u627E\u76EE\u6807\u5143\u7D20\u4E0B\u6807\u4F4D\u7F6E\uFF0C\u6700\u7B80\u5355\u7684\u4E00\u79CD\u65B9\u5F0F</p><p>3\u3001\u64C5\u7528<code>map</code>\u79FB\u82B1\u63A5\u6728\uFF0C\u5229\u7528<code>map</code>\u8BBE\u7F6E\u503C\u65B9\u5F0F,\u5C06\u5143\u7D20<code>\u503C\u4E0E\u7D22\u5F15</code>\u5B58\u5728<code>map</code>\u4E2D\uFF0C\u4ECE\u800C\u627E\u5230\u76EE\u6807\u7D22\u5F15</p><p>4\u3001\u5229\u7528\u5BF9\u8C61\u5B58\u53D6\u6570\u636E\uFF0C\u5C06\u5143\u7D20<code>\u503C\u4E0E\u7D22\u5F15</code>\u5B58\u5728<code>result</code>\u4E2D\uFF0C\u6839\u636E<code>target</code>\u4ECE\u800C\u627E\u5230\u76EE\u6807\u7D22\u5F15</p><p>5\u3001\u4E8C\u5206\u67E5\u627E\u90E8\u5206\u4EE3\u7801\u53C2\u8003\u4EE3\u7801\u968F\u60F3\u5F55[1]</p><h3 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h3><p>[1]\u4EE3\u7801\u968F\u60F3\u5F55: <em>https://www.programmercarl.com/0704.%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE.html#_704-%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE</em></p>`,30),o=[e];function c(l,i){return s(),a("div",null,o)}var r=n(t,[["render",c],["__file","2022-04-17.html.vue"]]);export{r as default};