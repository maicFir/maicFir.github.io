import{_ as i,o as u,c as r,a,w as e,b as n,e as p,d as s,r as c}from"./app.13e035d0.js";const d={},k=p(`<p><code>flex</code>\u5728css\u5E03\u5C40\u4E2D\u7684\u662F\u4E00\u4E2A\u7ECF\u5E38\u8003\u5BDF\u7684\u77E5\u8BC6\u70B9\uFF0C\u867D\u7136\u5782\u76F4\u5C45\u4E2D\u95EE\u9898\u5DF2\u7ECF\u95EE\u5F97\u5FEB\u70C2\u5927\u8857\u4E86\uFF0C<code>flex</code>\u4F60\u867D\u7136\u603B\u662F\u5728\u7528\uFF0C\u4F46\u662F\u603B\u4F1A\u6709\u4F60\u4E0D\u77E5\u9053\u7684\u76F2\u70B9</p><p>\u672C\u6587\u662F\u4E00\u7BC7\u5173\u4E8E<code>flex</code>\u5E03\u5C40\u76F8\u5173\u7684\u603B\u7ED3\u7B14\u8BB0\uFF0C\u9047\u5230\u6BD4\u8F83\u5201\u94BB\u7684\u95EE\u9898\uFF0C\u5F53\u4E2A\u77E5\u8BC6\u62D3\u5C55\u5427</p><p>\u5728\u9605\u8BFB\u672C\u6587\u4E4B\u524D\uFF0C\u4E3B\u8981\u4ECE\u4EE5\u4E0B\u51E0\u4E2A\u65B9\u5411\u53BB\u63A2\u8BA8<code>flex</code></p><ul><li>flex\u5E03\u5C40\u53C8\u79F0\u4E3A\u5F39\u6027\u5E03\u5C40\uFF0C\u6709\u4F55\u7279\u5F81</li><li>\u5173\u4E8Eflex\u7684\u4E00\u4E9B\u5C5E\u6027\u503C</li><li><code>flex</code>\u5982\u4F55\u5B9E\u73B0\u5782\u76F4\u5C45\u4E2D\uFF0C\u5982\u4F55\u5B9E\u73B0\u4E00\u4E2A\u5BF9\u89D2\u6392\u5217\u5E03\u5C40</li></ul><h3 id="flex\u7279\u5F81" tabindex="-1"><a class="header-anchor" href="#flex\u7279\u5F81" aria-hidden="true">#</a> flex\u7279\u5F81</h3><p>\u5F53\u6211\u4EEC\u5BF9\u4E00\u4E2A\u5143\u7D20\u8BBE\u7F6E<code>flex</code>\u540E\uFF0C\u5176\u5B50\u5143\u7D20\u6240\u6709\u7684<code>float</code>\uFF0C<code>clean</code>\u3001<code>vertical-align</code>\u5C5E\u6027\u90FD\u4F1A\u5931\u6548\uFF0C\u5E76\u4E14\u9ED8\u8BA4\u6C34\u5E73\u6392\u5217\uFF0C\u5E76\u4E14\u5BBD\u5EA6\u7531\u81EA\u8EAB\u5143\u7D20\u5185\u5BB9\u51B3\u5B9A\u3002</p><h3 id="\u5F71\u54CD\u4E3B\u8F74\u4E0E\u4EA4\u53C9\u8F74\u7684\u5C5E\u6027\u2014\u2014" tabindex="-1"><a class="header-anchor" href="#\u5F71\u54CD\u4E3B\u8F74\u4E0E\u4EA4\u53C9\u8F74\u7684\u5C5E\u6027\u2014\u2014" aria-hidden="true">#</a> \u5F71\u54CD\u4E3B\u8F74\u4E0E\u4EA4\u53C9\u8F74\u7684\u5C5E\u6027\u2014\u2014</h3><ul><li>flex-direction</li></ul><p>\u4E3B\u8981\u5F71\u54CD\u6C34\u5E73\u8F74\u6392\u5217\u8FD8\u662F\u4EA4\u53C9\u8F74\u6392\u5217</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  // <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span> \u9ED8\u8BA4\u4ECE\u5DE6\u5F80\u53F3
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> row-revers<span class="token punctuation">;</span> \u987A\u5E8F\u4ECE\u53F3\u5F80\u5DE6 
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span> \u4ECE\u4E0A\u5F80\u4E0B 
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column-reverse<span class="token punctuation">;</span> \u4ECE\u4E0B\u5F80\u4E0A 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/9900ade0-b2ea-479f-91ac-33aa8096f398.png" alt=""></p><ul><li>flex-wrap \u4E3B\u8981\u5F71\u54CD\u6C34\u5E73\u8F74\u5143\u7D20\u662F\u5426\u6362\u884C\uFF0C\u9ED8\u8BA4\u4E0D\u6362\u884C<code>flex-wrap:nowrap</code></li></ul><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> nowrap // \u4E0D\u6362\u884C
  // <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap // \u6362\u884C
  // <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap-reverse \u6362\u884C\u4ECE\u4E0B\u5F80\u4E0A\u4F9D\u6B21\u6392\u5217
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>flex-flow</li></ul><p>\u8FD9\u4E2A\u5C5E\u6027\u4E3B\u8981\u662F<code>flex-direction</code>\u4E0E<code>flex-wrap</code>\u7684\u7ED3\u5408\u4F53</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-flow</span><span class="token punctuation">:</span> row nowrap // \u9ED8\u8BA4
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>justify-content</li></ul><p>\u4E3B\u8981\u5F71\u54CD<code>\u6C34\u5E73\u4E3B\u8F74</code>\u7684\u6392\u5217\u987A\u5E8F</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-start // \u5DE6\u5BF9\u9F50\u6392\u5217
  // <span class="token property">justify-content</span><span class="token punctuation">:</span> center // \u5C45\u4E2D\u6392\u5217
  // <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between // \u4E24\u7AEF\u5BF9\u9F50\u6392\u5217
  // <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around // \u95F4\u9694\u76F8\u7B49\u6392\u5217
  // <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-end // \u5C45\u53F3\u6392\u5217
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>align-items</li></ul><p>\u4E3B\u8981\u5F71\u54CD<code>\u4EA4\u53C9\u8F74</code>\u5782\u76F4\u65B9\u5411\u7684\u6392\u5217</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> flex-start<span class="token punctuation">;</span> // \u5782\u76F4\u65B9\u5411\u4ECE\u4E0A\u5F80\u4E0B\u6392\u5217
  // <span class="token property">align-items</span><span class="token punctuation">:</span> center \u5782\u76F4\u65B9\u5411\u5C45\u4E2D\u6392\u5217
  // <span class="token property">align-items</span><span class="token punctuation">:</span> flex-end \u5782\u76F4\u65B9\u5411\u4ECE\u4E0B\u5F80\u4E0A\u6392\u5217
  // <span class="token property">align-items</span><span class="token punctuation">:</span> stretch \u4F1A\u5C06\u5B50\u5143\u7D20\u9AD8\u5EA6\u62C9\u4F38\u7236\u5143\u7D20\u4E00\u81F4<span class="token punctuation">(</span>\u5B50\u5143\u7D20\u672A\u8BBE\u7F6E\u9AD8\u5EA6<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/c6052c90-11ff-43e9-91eb-3832a0a1fbff.png" alt=""></p><h3 id="\u5173\u4E8Eitem\u9879\u76EE\u8BBE\u7F6E\u7684\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8Eitem\u9879\u76EE\u8BBE\u7F6E\u7684\u5C5E\u6027" aria-hidden="true">#</a> \u5173\u4E8Eitem\u9879\u76EE\u8BBE\u7F6E\u7684\u5C5E\u6027</h3><ul><li>order</li></ul><p>\u51B3\u5B9A\u5B50\u9879\u76EE\u7684\u987A\u5E8F\uFF0C<code>order</code>\u8D8A\u5C0F\uFF0C\u8D8A\u662F\u6392\u5217\u5728\u6700\u524D\u9762</p><p>\u5047\u8BBE\u73B0\u5728\u6709\u4E2A\u9700\u6C42\uFF0Ccss\u5B9E\u73B0\u7B80\u5355\u7684\u8DD1\u9A6C\u706F</p>`,27),m=n("div",{class:"language-html ext-html line-numbers-mode"},[n("pre",{class:"language-html"},[n("code",null,[s(),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("wrap-box"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("item-1"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("1"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("item-2"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("2"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("item-3"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("3"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
 `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),v=n("div",{class:"language-css ext-css line-numbers-mode"},[n("pre",{class:"language-css"},[n("code",null,[s("    "),n("span",{class:"token atrule"},[n("span",{class:"token rule"},"@keyframes"),s(" ani-1")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token selector"},"0%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 0"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token selector"},"50%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 1"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token selector"},"100%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 2"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token atrule"},[n("span",{class:"token rule"},"@keyframes"),s(" ani-2")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token selector"},"0%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 1"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token selector"},"50%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 0"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token selector"},"100%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 1"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token atrule"},[n("span",{class:"token rule"},"@keyframes"),s(" ani-3")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token selector"},"0%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 2"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token selector"},"50%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 2"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token selector"},"100%"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token property"},"order"),n("span",{class:"token punctuation"},":"),s(" 0"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token selector"},".wrap-box"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},"width"),n("span",{class:"token punctuation"},":"),s(" 500px"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"height"),n("span",{class:"token punctuation"},":"),s(" 500px"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"overflow"),n("span",{class:"token punctuation"},":"),s(" hidden"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"display"),n("span",{class:"token punctuation"},":"),s(" flex"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"background-color"),n("span",{class:"token punctuation"},":"),s(" green"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"align-items"),n("span",{class:"token punctuation"},":"),s(" stretch"),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token selector"},`.wrap-box .item-1,
      .wrap-box .item-2,
      .wrap-box .item-3`),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},"width"),n("span",{class:"token punctuation"},":"),s(" 100px"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"height"),n("span",{class:"token punctuation"},":"),s(" 100px"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"background-color"),n("span",{class:"token punctuation"},":"),s(" red"),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token selector"},".wrap-box .item-1"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},"animation"),n("span",{class:"token punctuation"},":"),s(" ani-1 5s infinite"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"transition"),n("span",{class:"token punctuation"},":"),s(" order 1s ease"),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token selector"},".wrap-box .item-2"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},"animation"),n("span",{class:"token punctuation"},":"),s(" ani-2 5s infinite"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"transition"),n("span",{class:"token punctuation"},":"),s(" order 1s ease"),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token selector"},".wrap-box .item-3"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},"animation"),n("span",{class:"token punctuation"},":"),s(" ani-3 5s infinite"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"transition"),n("span",{class:"token punctuation"},":"),s(" order 1s ease"),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=p(`<p>\u6211\u4EEC\u5229\u7528<code>css3</code>\u7684\u52A8\u753B\u5E27\uFF0C\u6539\u53D8order\u7684\u987A\u5E8F\uFF0C\u56E0\u6B64\u4E00\u4E2A\u7B80\u6613\u7684css\u8DD1\u9A6C\u706F\u5C31\u5B9E\u73B0\u4E86\uFF0C\u800C\u4E14\u5E76\u6CA1\u6709\u6539\u53D8<code>dom</code>\u7684\u7ED3\u6784\u548C\u987A\u5E8F <img src="https://files.mdnice.com/user/24614/7482ab3d-54ca-4cef-9ba0-abaee25830fc.gif" alt=""></p><ul><li>flex-basis</li></ul><p>\u8BBE\u7F6E\u5F53\u524D\u7684item\u7684\u56FA\u5B9A\u5BBD\u5EA6</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.wrap-box .item-3</span><span class="token punctuation">{</span>
  <span class="token property">flex-basis</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/9eaa519b-0b5e-4d7a-b5fd-78b9bbb0a23a.png" alt=""></p><ul><li>flex-grow</li></ul><p>\u8BE5\u5C5E\u6027\u662F\u51B3\u5B9A\u5F53\u524Ditem\u7684\u653E\u5927\u6BD4\u4F8B\uFF0C\u9ED8\u8BA4\u662F0 <img src="https://files.mdnice.com/user/24614/f5e57e6b-2119-454a-adf3-10d2770a28f5.png" alt=""></p><p>\u6BD4\u5982\u4E09\u4E2Adiv,\u5DE6\u53F3\u56FA\u5B9A\uFF0C\u4E2D\u95F4\u5185\u5BB9\u81EA\u52A8\u6491\u5F00 <img src="https://files.mdnice.com/user/24614/7fa8ba48-772b-4369-bd04-adc0436e20f6.png" alt=""></p><ul><li>flex-shrink</li></ul><p>\u5F53\u524Ditem\u7684\u7F29\u5C0F\u6BD4\u4F8B\uFF0C\u9ED8\u8BA4\u7684\u662F0</p><ul><li>align-self</li></ul><p>\u80FD\u63A7\u5236\u5355\u4E2A<code>item</code>\u7684\u6392\u5217\uFF0C\u8FD9\u4E2A\u5C5E\u6027\u901A\u5E38\u4E0D\u662F\u5F88\u5E38\u7528\uFF0C\u9762\u8BD5\u66FE\u88AB\u8FD9\u4E2Acss\u7684\u5C5E\u6027\u5E03\u5C40\u95EE\u9898\u7ED9\u8DEA\u4E86</p><p>\u9762\u8BD5\u9898\u5927\u6982\u662F\u8FD9\u6837\u7684\uFF0C3\u4E2A\u5B50div\u5B9E\u73B0\u4E00\u4E2A\u5BF9\u89D2\u7EBF\u5E03\u5C40,\u7528<code>flex\u5E03\u5C40</code>,\u5982\u679C\u6CA1\u60F3\u5230\u8FD9\u4E2A<code>align-self</code>\u5927\u6982\u662F\u5B9E\u73B0\u4E0D\u4E86</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 <span class="token selector">.wrap-box .item-1,
  .wrap-box .item-2,
  .wrap-box .item-3</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.wrap-box .item-2</span> <span class="token punctuation">{</span>
  <span class="token property">align-self</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> // \u5782\u76F4\u5C45\u4E2D
<span class="token punctuation">}</span>
<span class="token selector">.wrap-box .item-3</span> <span class="token punctuation">{</span>
  <span class="token property">align-self</span><span class="token punctuation">:</span> flex-end<span class="token punctuation">;</span> // \u9760\u53F3
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBE\u7F6E\u5BF9\u5E94\u7684<code>item</code>\u5927\u6982\u5C31\u662F\u4E0B\u9762\u8FD9\u6837\u4E86 <img src="https://files.mdnice.com/user/24614/63a22224-d9ab-4aa7-8a57-3c89cad8fa78.png" alt=""><img src="https://files.mdnice.com/user/24614/d16961a7-30f0-47e0-960e-4ec3133c9142.png" alt=""></p><h3 id="\u5173\u4E8Eflex-1\u7684\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8Eflex-1\u7684\u8BE6\u89E3" aria-hidden="true">#</a> \u5173\u4E8Eflex:1\u7684\u8BE6\u89E3</h3><p>\u901A\u5E38\u6211\u4EEC\u8BBE\u7F6E<code>flex:1</code>\uFF0C\u5176\u5B9E\u672C\u8D28\u4E0A\u662F\u66FF\u4EE3\u4E86\u4EE5\u4E0B\u51E0\u4E2A\u53C2\u6570</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.item3</span> <span class="token punctuation">{</span>
  <span class="token property">flex-grow</span><span class="token punctuation">:</span>1<span class="token punctuation">;</span>
  <span class="token property">flex-shrink</span><span class="token punctuation">:</span>1<span class="token punctuation">;</span>
  <span class="token property">flex-basis</span><span class="token punctuation">:</span> 0%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5143\u7D20\u5782\u76F4\u5C45\u4E2D" tabindex="-1"><a class="header-anchor" href="#\u5143\u7D20\u5782\u76F4\u5C45\u4E2D" aria-hidden="true">#</a> \u5143\u7D20\u5782\u76F4\u5C45\u4E2D</h3><p>\u4EE5\u4E0B\u662F\u4E00\u4E2A\u57FA\u672C\u7684\u9875\u9762\u7ED3\u6784</p>`,20),f=n("div",{class:"language-html ext-html line-numbers-mode"},[n("pre",{class:"language-html"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("wrap"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("inner-box"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),g=n("div",{class:"language-css ext-css line-numbers-mode"},[n("pre",{class:"language-css"},[n("code",null,[s(),n("span",{class:"token selector"},".wrap"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token property"},"width"),n("span",{class:"token punctuation"},":"),s(" 100px"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"height"),n("span",{class:"token punctuation"},":"),s(" 100px"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"display"),n("span",{class:"token punctuation"},":"),s(" flex"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"justify-content"),n("span",{class:"token punctuation"},":"),s(" center"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"align-items"),n("span",{class:"token punctuation"},":"),s(" center"),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token property"},"background-color"),n("span",{class:"token punctuation"},":"),s(" red"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token selector"},".wrap .inner-box"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"width"),n("span",{class:"token punctuation"},":"),s(" 50px"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token property"},"height"),n("span",{class:"token punctuation"},":"),s(" 50px"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token property"},"background"),n("span",{class:"token punctuation"},":"),s(" green"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("p",null,[n("img",{src:"https://files.mdnice.com/user/24614/c6d5aa95-3379-4dc2-a08e-694096de97dd.png",alt:""})],-1),h=n("h3",{id:"\u603B\u7ED3",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u603B\u7ED3","aria-hidden":"true"},"#"),s(" \u603B\u7ED3")],-1),y=p("<li><p>\u4E86\u89E3flex\u57FA\u672C\u7279\u5F81\uFF0C\u5F71\u54CD\u6C34\u5E73\u8F74\u4E0E\u4EA4\u53C9\u8F74\u7684\u7684\u5C5E\u6027\u4E3B\u8981\u53D7<code>flex-direction</code>\u8FD9\u4E2A\u5C5E\u6027\u7684\uFF0C\u9ED8\u8BA4\u6C34\u5E73<code>row</code>\u6392\u5217</p></li><li><p>\u5F53\u4E00\u4E2A\u7236\u7EA7\u5143\u7D20\u8BBE\u7F6E<code>flex</code>\u540E\uFF0C\u5B50\u7EA7\u7684<code>\u6D6E\u52A8</code>\u3001<code>clear</code>,<code>vertain-align</code>\u5C5E\u6027\u90FD\u4F1A\u5931\u6548\uFF0C\u9ED8\u8BA4\u6240\u6709\u5B50\u7EA7\u5143\u7D20\u6C34\u5E73\u6392\u5217</p></li><li><p><code>flex</code>\u7684\u4E00\u4E9B\u7279\u6027\uFF0C\u6BD4\u5982\u653E\u5927<code>flex-glow</code>\u3001\u7F29\u5C0F<code>flex-shrink</code>,\u8FD8\u6709\u5F71\u54CD\u6C34\u5E73\u8F74\u6392\u5217<code>just-content</code>\uFF0C\u4EE5\u53CA\u4EA4\u53C9\u8F74\u6392\u5217<code>align-items</code>\u5C5E\u6027\u7684\u8BBE\u7F6E</p></li><li><p>align-self \u8FD9\u4E2A\u5C5E\u6027\u53EF\u4EE5\u5355\u72EC\u63A7\u5236\u5F53\u524D\u5143\u7D20\u7684\u4F4D\u7F6E</p></li><li><p>flex\u5B9E\u73B0\u4E00\u4E2A\u5782\u76F4\u5C45\u4E2D</p></li>",5),w=s("\u672C\u6587"),_={href:"https://github.com/maicFir/lessonNote/tree/master/html/04-flex%E5%B8%83%E5%B1%80",target:"_blank",rel:"noopener noreferrer"},j=s("code example");function q(C,B){const t=c("CodeGroupItem"),l=c("CodeGroup"),o=c("ExternalLinkIcon");return u(),r("div",null,[k,a(l,null,{default:e(()=>[a(t,{title:"html"},{default:e(()=>[m]),_:1}),a(t,{title:"css"},{default:e(()=>[v]),_:1})]),_:1}),b,a(l,null,{default:e(()=>[a(t,{title:"html"},{default:e(()=>[f]),_:1}),a(t,{title:"css"},{default:e(()=>[g]),_:1})]),_:1}),x,h,n("ul",null,[y,n("li",null,[n("p",null,[w,n("a",_,[j,a(o)])])])])])}var N=i(d,[["render",q],["__file","2022-07-22.html.vue"]]);export{N as default};
