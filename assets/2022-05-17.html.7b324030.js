import{_ as n,o as s,c as a,e as p}from"./app.13e035d0.js";const t={},e=p(`<blockquote><p><code>\u9009\u62E9\u6392\u5E8F</code>\u662F\u4E00\u79CD\u7B80\u5355\u7684\u6392\u5E8F\uFF0C\u65F6\u95F4\u590D\u6742\u5EA6\u662F O(n^2)\uFF0C\u5728<code>\u672A\u6392\u5E8F</code>\u7684\u6570\u7EC4\u4E2D\u627E\u5230\u6700\u5C0F\u7684\u90A3\u4E2A\u6570\u5B57\uFF0C\u7136\u540E\u5C06\u5176\u653E\u5230<code>\u8D77\u59CB\u4F4D\u7F6E</code>\uFF0C\u4ECE\u5269\u4E0B\u672A\u6392\u5E8F\u7684\u6570\u636E\u4E2D\u7EE7\u7EED\u5BFB\u627E\u6700\u5C0F\u7684\u5143\u7D20\uFF0C\u5C06\u5176\u653E\u5230\u5DF2\u6392\u5E8F\u7684\u672B\u5C3E\uFF0C\u4EE5\u6B21\u7C7B\u63A8\uFF0C\u76F4\u5230\u6240\u6709\u5143\u7D20\u6392\u5E8F\u7ED3\u675F\u4E3A\u6B62\u3002</p></blockquote><p>\u6211\u4EEC\u5148\u770B\u4E0B\u9009\u62E9\u6392\u5E8F\u7684\u4E00\u6BB5\u4EE3\u7801</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">selectSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">var</span> minIndex<span class="token punctuation">,</span> temp<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    minIndex <span class="token operator">=</span> i<span class="token punctuation">;</span> <span class="token comment">//\u5047\u8BBE\u5F53\u524D\u5FAA\u73AF\u7D22\u5F15\u662F\u6700\u5C0F\u5143\u7D20</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>minIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        minIndex <span class="token operator">=</span> j<span class="token punctuation">;</span> <span class="token comment">// \u5BFB\u627E\u6700\u5C0F\u7684\u503C</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// \u4EA4\u6362minIndex\u4E0Ei\u5143\u7D20\u7684\u503C</span>
    temp <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>minIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">[</span>minIndex<span class="token punctuation">]</span> <span class="token operator">=</span> temp<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> arr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">selectSort</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">91</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u753B\u4E2A\u56FE\u8FD8\u539F\u6392\u5E8F\u6240\u6709\u8FC7\u7A0B\uFF0C\u5177\u4F53\u5982\u4E0B <img src="https://files.mdnice.com/user/24614/b4a4a35e-c26f-4177-83fd-8f813c4d52e6.png" alt=""></p><p>\u4ECE\u6BCF\u6B21\u5FAA\u73AF\u4E2D\u6211\u4EEC\u53EF\u4EE5\u77E5\u9053\u9009\u62E9\u6392\u5E8F\uFF0C\u5B9E\u9645\u4E0A\u5C31\u662F\u5148\u786E\u8BA4\u8D77\u59CB\u4F4D\u7F6E\u7684\u7D22\u5F15\uFF0C\u5047\u8BBE\u7B2C\u4E00\u4E2A\u662F\u6700\u5C0F\u4F4D\u7F6E\uFF0C\u4ECE\u5269\u4F59\u5143\u7D20\u4E2D\u627E\u5230\u6BD4\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\u5C0F\u7684\u503C\uFF0C\u5982\u679C\u5269\u4F59\u7684\u5143\u7D20\u6709\u6BD4\u5B83\u5C0F\uFF0C\u90A3\u4E48\u786E\u8BA4\u5F53\u524D\u7D22\u5F15\u4E3A\u6700\u5C0F\u7D22\u5F15\u503C\uFF0C\u5E76\u4EA4\u6362\u4E24\u4E2A\u5143\u7D20\u7684\u4F4D\u7F6E\u3002</p><p>\u7136\u540E\u518D\u4ECE\u7B2C\u4E8C\u5143\u7D20\u5F00\u59CB\uFF0C\u5047\u8BBE\u7B2C\u4E8C\u5143\u7D20\u662F\u6700\u5C0F\u503C\uFF0C\u7136\u540E\u4ECE\u5269\u4F59\u5143\u7D20\u4E2D\u627E\u6700\u5C0F\u7684\u5143\u7D20\uFF0C\u5982\u679C\u5269\u4F59\u5143\u7D20\u6709\u6BD4\u5B83\u5C0F\u5C31\u4EA4\u6362\u4F4D\u7F6E\uFF0C\u5982\u679C\u6CA1\u6709\uFF0C\u5C31\u6B63\u5E38\u4E0D\u4EA4\u6362\u4F4D\u7F6E\uFF0C\u76F4\u5230\u5FAA\u73AF\u5230\u6700\u540E\u4E00\u4E2A\u5143\u7D20\u4E3A\u6B62\u3002</p><p>\u518D\u8A00\u7B80\u610F\u8D45\u70B9\uFF0C\u9009\u62E9\u6392\u5E8F\u5C31\u662F</p><p>1\u3001\u5047\u8BBE\u7B2C\u4E00\u4E2A\u5143\u7D20\u662F\u6700\u5C0F\u503C</p><p>2\u3001\u4ECE\u5269\u4F59\u5143\u7D20\u4E2D\u9009\u62E9\u4E0E\u7B2C\u4E00\u4E2A\u5143\u7D20\u6BD4\u8F83\u5143\u7D20\u5927\u5C0F\uFF0C\u786E\u8BA4\u6700\u5C0F\u7D22\u5F15\u503C\uFF0C\u7136\u540E\u4EA4\u6362\u4F4D\u7F6E</p><p>3\u3001\u4ECE\u5269\u4F59\u4F4D\u7F6E\u4F9D\u6B21\u5FAA\u73AF\uFF0C\u5047\u8BBE\u5269\u4F59\u4F4D\u7F6E\u4E3A\u6700\u5C0F\u503C\uFF0C\u7136\u540E\u4ECE\u5269\u4F59\u5143\u7D20\u4E2D\u9009\u62E9\u4E0E\u4E4B\u8FDB\u884C\u6BD4\u8F83\uFF0C\u7136\u540E\u786E\u8BA4\u662F\u5426\u4EA4\u6362\u4F4D\u7F6E</p><p>4\u3001\u76F4\u5230\u5FAA\u73AF\u5230\u6700\u540E\u4E00\u4E2A\u7D22\u5F15\u4E3A\u6B62</p><p><img src="https://files.mdnice.com/user/24614/daaff07e-d5e1-4f5b-8a30-6a5d12dcc29b.png" alt=""> \u6700\u540E\u770B\u4E00\u5F20\u56FE <img src="https://files.mdnice.com/user/24614/9b525d2d-1ffb-4dba-bd76-2bfaf7e141ca.gif" alt=""></p><h3 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h3><p>1\u3001<code>\u9009\u62E9\u6392\u5E8F</code>\u65F6\u95F4\u590D\u5236\u5EA6\u662F O(n^2)</p><p>2\u3001\u5047\u8BBE\u9996\u4E2A\u5143\u7D20\u662F\u6700\u5C0F\u7684\u5143\u7D20\uFF0C\u5728\u5269\u4F59\u672A\u6392\u5E8F\u7684\u5143\u7D20\u4E2D\u4E0E\u4E4B\u8FDB\u884C\u6BD4\u8F83\uFF0C\u5982\u679C\u6BD4\u5B83\u5C0F\uFF0C\u5C31\u786E\u8BA4\u6700\u5C0F\u4F4D\u7F6E\u7D22\u5F15\uFF0C\u4E0E\u4E4B\u4EA4\u6362\u4F4D\u7F6E</p><p>3\u3001\u5728\u5269\u4F59\u672A\u6392\u5E8F\u7684\u6240\u6709\u7684\u5143\u7D20\u4E2D\uFF0C\u5047\u8BBE\u9996\u4E2A\u5143\u7D20\u662F\u6700\u5C0F\u503C\uFF0C\u7136\u540E\u4E0E\u5269\u4F59\u5143\u7D20\u8FDB\u884C\u4F9D\u6B21\u6BD4\u8F83\uFF0C\u786E\u8BA4\u5143\u7D20\u5F53\u524D\u6700\u5C0F\u6700\u5C0F\u7D22\u5F15\uFF0C\u4EA4\u6362\u4F4D\u7F6E\uFF0C\u4F9D\u6B21\u5FAA\u73AF\uFF0C\u76F4\u5230\u6700\u540E\u5FAA\u73AF\u7ED3\u675F\u4E3A\u6B62</p>`,16),o=[e];function c(l,i){return s(),a("div",null,o)}var r=n(t,[["render",c],["__file","2022-05-17.html.vue"]]);export{r as default};
