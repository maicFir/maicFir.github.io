import{_ as t,o,c,b as n,a as e,d as s,e as p,r as l}from"./app.13e035d0.js";const i={},r=s("\u5728\u524D\u9762\u51E0\u7BC7\u6587\u7AE0\u4E2D\uFF0C\u6211\u4EEC\u5DF2\u7ECF\u57FA\u7840\u7684\u5982\u4F55\u8FD0\u7528\u4E00\u4E2A"),d=n("code",null,"webpack",-1),u=s("\u4E0E"),k=n("code",null,"webpack-cli",-1),v=s("\u4ECE 0 \u5230 1 \u642D\u5EFA\u4E00\u4E2A\u7B80\u5355\u7684"),m={href:"https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&mid=2247488592&idx=1&sn=346db8b9a019552c4e087beda6229849&chksm=c3682d22f41fa4341be31bb874199729b940b05ac57ba968400727c078ef0da1c5fedcca4022#rd",target:"_blank",rel:"noopener noreferrer"},b=s("react"),g=s("\u6216\u8005"),y={href:"https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&mid=2247488788&idx=1&sn=842d58a67e8a46cfecaa7e53fe0fa913&chksm=c3682c66f41fa5702aa86a440f12e31002d0e48d8606dc848218909d2b84ecc7ff01c5a56086#rd",target:"_blank",rel:"noopener noreferrer"},h=s("vue"),_=s("\u5DE5\u7A0B\u5E94\u7528\uFF0C\u5176\u4E2D\u6211\u4EEC\u4F7F\u7528\u4E86\u52A0\u8F7D\u6587\u4EF6\uFF0C\u6211\u4EEC\u5728\u4E4B\u524D\u5904\u7406\u6587\u4EF6\u4F7F\u7528"),f=n("code",null,"file-loader",-1),x=s("\u6216\u8005"),w=n("code",null,"url-loader",-1),j=s("\u5904\u7406\uFF0C"),S=n("code",null,"url-loader",-1),M=s("\u4E3B\u8981\u662F\u53EF\u4EE5\u9488\u5BF9\u56FE\u7247\u6587\u4EF6\u5927\u5C0F\u8FDB\u884C\u6709\u9009\u62E9\u7684"),q=n("code",null,"base64",-1),z=s("\u538B\u7F29\uFF0C\u5728"),C=n("code",null,"webpack5",-1),D=s("\u4E2D\u53EF\u4EE5\u7528\u5185\u7F6E\u7684"),I=n("code",null,"Asset Modules",-1),U=s("\u6765\u5904\u7406\u56FE\u7247\u8D44\u6E90"),B=s("\u63A5\u4E0B\u6765\u6211\u4EEC\u4E00\u8D77\u6765\u63A2\u8BA8\u4E0B"),N=n("code",null,"webpack5",-1),E=s("\u4E2D\u5173\u4E8E"),P={href:"https://webpack.docschina.org/guides/asset-modules/",target:"_blank",rel:"noopener noreferrer"},$=s("Asset Modules"),W=s("\u7684\u90A3\u4E9B\u4E8B"),F=p(`<p>\u6B63\u6587\u5F00\u59CB...</p><h3 id="\u521D\u59CB\u5316\u57FA\u7840\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#\u521D\u59CB\u5316\u57FA\u7840\u9879\u76EE" aria-hidden="true">#</a> \u521D\u59CB\u5316\u57FA\u7840\u9879\u76EE</h3><p>\u65B0\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939<code>webpack-04-resource</code>\uFF0C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>npm init <span class="token operator">-</span>y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u5B89\u88C5\u9879\u76EE\u4E00\u4E9B\u57FA\u7840\u652F\u6301\u7684\u63D2\u4EF6</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>npm i webpack webpack<span class="token operator">-</span>cli webpack<span class="token operator">-</span>dev<span class="token operator">-</span>server html<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin babel<span class="token operator">-</span>loader @babel
l<span class="token operator">/</span>core <span class="token operator">-</span><span class="token constant">D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u6839\u76EE\u5F55\u65B0\u5EFA<code>webpack.config.js</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> CleanWebpackPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;clean-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/index.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;js/[name].js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;babel-loader&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;@babel/env&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;asset/resource&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">CleanWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;./public/index.html&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\u6211\u4EEC\u52A0\u8F7D\u56FE\u7247\u6CA1\u6709\u4F7F\u7528<code>file-loader</code>\u4E0E<code>url-loader</code>\uFF0C\u6211\u4EEC\u4F7F\u7528\u7684\u662F<code>webpack5</code>\u5185\u7F6E\u7684<code>asset/rosource</code>\u8FD9\u4E2A\u6765\u5904\u7406</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;asset/resource&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728<code>index.js</code>\u4E2D\u6211\u4EEC\u63D2\u5165\u4E00\u5F20\u56FE\u7247</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> img1Src <span class="token keyword">from</span> <span class="token string">&#39;../assets/images/1.png&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> appDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> img1Src<span class="token punctuation">;</span>
appDom<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ok\uFF0C\u8FD0\u884C<code>npm run server</code>,\u6253\u5F00\u6D4F\u89C8\u5668<code>localhost:8080</code><img src="https://files.mdnice.com/user/24614/cfbb4fb7-2827-4ec2-befe-ff296759831a.png" alt=""> \u6211\u4EEC\u4F1A\u53D1\u73B0\uFF0C\u751F\u6210\u7684\u56FE\u7247\u5730\u5740\u5C31\u662F<code>&lt;img src=&quot;http://localhost:8080/js/../b1640e009cff6a775ce5.png&quot;&gt;</code></p><h3 id="generator-\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#generator-\u914D\u7F6E" aria-hidden="true">#</a> generator \u914D\u7F6E</h3><p>\u73B0\u5728\u6211\u60F3\u914D\u7F6E\u56FE\u7247\u7684\u9ED8\u8BA4\u8F93\u51FA\u5730\u5740\u4E0E\u540D\u5B57,\u5728<code>module.rules</code>\u4E2D\u6709\u4E00\u4E2A<code>generator</code>\u7684\u5C5E\u6027\u53EF\u4EE5\u914D\u7F6E\u5339\u914D\u56FE\u7247\u8F93\u51FA\u7684\u6587\u4EF6</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token operator">...</span><span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;asset/resource&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;images/[name][ext]&#39;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u9875\u9762\u52A0\u8F7D\u56FE\u7247\u7684\u8DEF\u5F84\u5C31\u53D8\u6210<code>&lt;img src=&quot;http://localhost:8080/js/../images/1.png&quot;&gt;</code>\u4E86</p><p>\u5982\u679C\u4F60\u7684\u56FE\u7247\u5730\u5740\u662F\u4E0A\u4F20\u5230<code>cdn</code>\u4E0A\u7684\uFF0C\u90A3\u4E48\u4F60\u53EF\u4EE5\u8FD9\u4E48\u505A\uFF0C\u4F46\u662F\u8FD9\u79CD\u505A\u6CD5\u662F\u4E0D\u662F\u5728\u9879\u76EE\u4E2D\u771F\u7684\u9700\u8981\uFF0C\u8FD8\u6709\u5F85\u5546\u69B7\uFF0C\u56E0\u4E3A\u8FD9\u6837\u4F1A\u5BFC\u81F4\u5E94\u7528\u6240\u6709\u7684\u6240\u6709\u56FE\u7247\u7528<code>cdn</code>\u65B9\u5F0F\u52A0\u8F7D\uFF0C\u5982\u679C\u9879\u76EE\u4E2D\u53EA\u662F\u90E8\u5206\u56FE\u7247\u6309\u9700 cdn \u52A0\u8F7D\uFF0C\u90A3\u4E48\u8FD9\u79CD\u505A\u6CD5\u662F\u4E0D\u53EF\u53D6\u7684\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code> <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token comment">// type: &#39;asset/resource&#39;</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;asset&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">dataUrlCondition</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">maxSize</span><span class="token operator">:</span> <span class="token number">40</span> <span class="token operator">*</span> <span class="token number">1024</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;https://cdn/assets&#39;</span><span class="token punctuation">,</span> <span class="token comment">// cdn\u57DF\u540D\u524D\u7F00</span>
          <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;images/[name][ext]&#39;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u81EA\u6B64\u9875\u9762\u7684\u52A0\u8F7D\u7684\u56FE\u7247\u5C31\u662F<code>&lt;img src=&quot;https://cdn/assets/images/3.png&quot;&gt;</code></p><h3 id="assetmodulefilename" tabindex="-1"><a class="header-anchor" href="#assetmodulefilename" aria-hidden="true">#</a> assetModuleFilename</h3><p>\u9664\u4E86<code>generator.filename</code>\u65B9\u5F0F\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u5728<code>output</code>\u4E2D\u52A0\u5165<code>assetModuleFilename</code>\u914D\u7F6E\u6765\u4FEE\u6539\u56FE\u7247\u9ED8\u8BA4\u7684\u5730\u5740,\u4E0D\u8FC7\u6CE8\u610F\u8FD9\u4E2A\u5C5E\u6027\u53EA\u80FD\u662F\u9488\u5BF9<code>rule</code>\u4E2D\u8BBE\u7F6E\u7684 type<code>&#39;&#39;asset/resource&#39; | &#39;asset&#39;</code>\u7C7B\u578B\u624D\u751F\u6548\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;js/[name].js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">assetModuleFilename</span><span class="token operator">:</span> <span class="token string">&#39;images/[name][ext]&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u901A\u5E38\u9879\u76EE\u91CC\u6211\u4EEC\u4F1A\u628A\u6BD4\u8F83\u5C0F\u7684\u56FE\u7247\u76F4\u63A5\u5750<code>base64</code>\u52A0\u8F7D\uFF0C\u5927\u7684\u56FE\u7247\u5C31\u76F4\u63A5\u8F93\u51FA\u52A0\u8F7D\uFF0C\u6216\u8005\u4E0A\u4F20\u5230<code>cdn</code>\u76F4\u63A5\u52A0\u8F7D\u56FE\u7247\u5730\u5740,\u4F60\u53EF\u4EE5\u5728<code>rules</code>\u7684<code>generator.publicPath</code>\u8BBE\u7F6E\u5730\u5740\u56FE\u7247\u5730\u5740\u3002</p><p>\u56E0\u6B64\u6211\u5F15\u5165\u4E24\u5F20\u5927\u5C0F\u4E0D\u4E00\u6837\u7684\u56FE\u7247\u6D4B\u8BD5\uFF0C\u4FEE\u6539\u4E00\u4E0B<code>index.js</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> img1Src <span class="token keyword">from</span> <span class="token string">&#39;../assets/images/1.png&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> img3Src <span class="token keyword">from</span> <span class="token string">&#39;../assets/images/3.png&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">renderImage</span><span class="token punctuation">(</span><span class="token parameter">imageSource</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> weakMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> appDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  imageSource<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    weakMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>img<span class="token punctuation">,</span> img<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>weakMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      weakMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">.</span>src <span class="token operator">=</span> src<span class="token punctuation">;</span>
      appDom<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">renderImage</span><span class="token punctuation">(</span><span class="token punctuation">[</span>img1Src<span class="token punctuation">,</span> img3Src<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u518D\u4FEE\u6539\u4E0B<code>webpack.config.js</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token operator">...</span><span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token comment">// type: &#39;asset/resource&#39;</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;asset&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">dataUrlCondition</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">maxSize</span><span class="token operator">:</span> <span class="token number">40</span> <span class="token operator">*</span> <span class="token number">1024</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728<code>rules</code>\u4E2D\u589E\u52A0<code>parser</code>\u5C5E\u6027\uFF0C\u5E76\u4E14\u5C06<code>type</code>\u6539\u6210<code>asset</code>,\u5F53\u6211\u4EEC\u8BBE\u7F6E\u4E00\u4E2A<code>dataUrlCondition: {maxSize: 40 * 1024}</code>,\u5C0F\u4E8E<code>KB</code>\u5C31\u7528<code>base64</code>\u52A0\u8F7D\u4E86\uFF0C\u5927\u4E8E<code>40KB</code>\u5C31\u76F4\u63A5\u7528\u56FE\u7247\u8DEF\u5F84\u52A0\u8F7D</p><p><img src="https://files.mdnice.com/user/24614/73ab86a1-25e7-499a-a728-c710b6ae6916.png" alt=""> \u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u770B\u5230\u4E24\u5F20\u56FE\u7247\uFF0C\u4E00\u5F20\u56FE\u7247\u662F<code>base64</code>\u4E00\u5F20\u56FE\u7247\u5C31\u8D70\u6587\u4EF6\u8DEF\u5F84\u4E86\u3002</p><p>\u6240\u4EE5\u5728\u4F60\u7684\u9879\u76EE\u4E2D\u4F60\u53EF\u4EE5\u5229\u7528\u8FD9\u4E2A<code>parser.dataUrlCondition.maxSize</code>\u7279\u6027\u6765\u4F18\u5316\u56FE\u7247\u8D44\u6E90\uFF0C\u6709\u4E9B\u8D44\u6E90\u5C0F\u56FE\u7247\u5C31\u53EF\u4EE5\u7528<code>base64</code>\u6765\u52A0\u8F7D\uFF0C\u8FD9\u6837\u53EF\u4EE5\u51CF\u5C11\u9875\u9762\u56FE\u7247\u7684\u8D44\u6E90\u8BF7\u6C42</p><p>\u4F46\u662F\u5E76\u4E0D\u662F\u6240\u6709\u7684\u56FE\u7247\u90FD\u8981<code>base64</code>,<code>base64</code>\u751F\u6210\u7684\u5B57\u7B26\u4E32\u975E\u5E38\u5927\uFF0C\u540C\u65F6\u4E5F\u662F\u589E\u52A0\u4E86<code>html</code>\u7684\u4F53\u79EF\uFF0C\u65E0\u6CD5\u5229\u7528\u7F13\u5B58\u673A\u5236\u52A0\u8F7D\u56FE\u7247\u3002</p><p>\u6240\u4EE5\u5728\u4F18\u5316\u7684\u7F51\u9875\u52A0\u8F7D\u8FC7\u7A0B\u4E2D\uFF0C\u5E76\u4E0D\u662F\u5168\u90E8\u90FD\u7528<code>base64</code>\u6765\u52A0\u8F7D\u56FE\u7247\u3002</p><h3 id="\u5173\u4E8E\u5185\u7F6E\u6A21\u5757\u7684\u51E0\u4E2A\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8E\u5185\u7F6E\u6A21\u5757\u7684\u51E0\u4E2A\u53C2\u6570" aria-hidden="true">#</a> \u5173\u4E8E\u5185\u7F6E\u6A21\u5757\u7684\u51E0\u4E2A\u53C2\u6570</h3>`,34),O=s("\u4E3B\u8981\u53C2\u8003\u5B98\u7F51"),V={href:"https://webpack.docschina.org/guides/asset-modules/",target:"_blank",rel:"noopener noreferrer"},A=s("asset-modules"),H=p('<p>webpack5 \u4E4B\u524D</p><ul><li>row-loader \u5C06\u6587\u4EF6\u5BFC\u5165\u4E3A\u5B57\u7B26\u4E32\uFF0C\u6BD4\u5982\u5BFC\u5165.txt \u7C7B\u578B\u7684\u6587\u4EF6</li><li>url-loader \u5C06\u6587\u4EF6\u4F5C\u4E3A<code>Data Url</code>\u5D4C\u5165\u5230\u6253\u5305\u540E<code>bundle.js</code>\u4E2D\uFF0C\u6BD4\u5982<code>base64</code>\u6587\u4EF6</li><li>file-loader \u5C06\u6587\u4EF6\u8F93\u51FA\u76EE\u5F55\uFF0C\u56FE\u7247\u6587\u4EF6\u4F1A\u88AB\u6253\u5305\u5230\u6307\u5B9A\u76EE\u5F55\u4E2D\u52A0\u8F7D</li></ul><p>webpack5 \u73B0\u5728</p><p>\u7528<code>asset module type</code>\u901A\u8FC7\u6DFB\u52A0\u4EE5\u4E0B\u56DB\u79CD\u7C7B\u578B\u6765\u4EE3\u66FF\u4EE5\u4E0A<code>loader</code></p><ul><li>asset/resource \u5BFC\u51FA\u5355\u72EC\u7684<code>url</code>,\u662F<code>file-loader</code>\u7684\u66FF\u4EE3\u54C1</li><li>asset/inline \u5BFC\u51FA\u8D44\u6E90 Data Url,\u662F<code>url-loader</code>\u7684\u66FF\u4EE3\u54C1</li><li>asset/source \u5230\u5904\u6587\u4EF6\u8D44\u6E90\u5185\u5BB9\uFF0C\u662F<code>row-loader</code>\u7684\u66FF\u4EE3\u54C1</li><li>asset \u5728<code>url-loader</code>\u548C<code>file-loader</code>\u4E2D\u9009\u62E9\uFF0C\u914D\u7F6E<code>parse.dataUrlCondition.maxSize</code> \u6765\u8F93\u51FA\u56FE\u7247\u8D44\u6E90\u662F\u5426<code>base64</code>\u8F93\u51FA</li></ul><h3 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h3>',6),K=p("<li><p>\u76F8\u6BD4\u8F83<code>webpack5</code>\u4E4B\u524D\u6211\u4EEC\u52A0\u8F7D\u56FE\u7247\u8D44\u6E90\u6587\u4EF6\u4F7F\u7528<code>file-loader</code>\u6216\u8005<code>url-loader</code>\u5728<code>webpack5</code>\u4E2D\u53EF\u4EE5\u4F7F\u7528\u5185\u7F6E\u6A21\u5757<code>type: &#39;assets/resource&#39;</code></p></li><li><p>\u57FA\u4E8E webpack5 \u5185\u7F6E\u6A21\u5757<code>asset module type</code>\u6765\u8BBE\u7F6E\u8D44\u6E90\u7684\u52A0\u8F7D</p></li><li><p>\u56FE\u7247\u8D44\u6E90<code>base64</code>\u5904\u7406\uFF0C\u6839\u636E\u56FE\u7247\u8D44\u6E90\u7684\u5927\u5C0F<code>parse.dataUrlCondition.maxSize</code>\u6765\u9650\u5236\u662F\u5426\u9700\u8981<code>base64</code>\u8F93\u51FA</p></li><li><p>\u6BD4\u8F83<code>asset module type</code>\u51E0\u79CD\u6A21\u5F0F\u533A\u522B\uFF0C\u4EE3\u66FF\u4EE5\u524D<code>row-loader</code>\u3001<code>file-loader</code>\u3001<code>url-loader</code>\u65B9\u6848\uFF0C\u4F46\u662F\u8FD9\u4EC5\u4EC5\u662F\u4F60\u7684<code>webpack</code>\u7248\u672C\u5728 5 \u4EE5\u540E\u3002</p></li>",4),L=s("\u672C\u6587"),T={href:"https://github.com/maicFir/lessonNote/tree/master/webpack/webpack-04-assets",target:"_blank",rel:"noopener noreferrer"},G=s("code example");function J(Q,R){const a=l("ExternalLinkIcon");return o(),c("div",null,[n("p",null,[r,d,u,k,v,n("a",m,[b,e(a)]),g,n("a",y,[h,e(a)]),_,f,x,w,j,S,M,q,z,C,D,I,U]),n("p",null,[B,N,E,n("a",P,[$,e(a)]),W]),F,n("p",null,[O,n("a",V,[A,e(a)])]),H,n("ul",null,[K,n("li",null,[n("p",null,[L,n("a",T,[G,e(a)])])])])])}var Y=t(i,[["render",J],["__file","2022-06-10.html.vue"]]);export{Y as default};
