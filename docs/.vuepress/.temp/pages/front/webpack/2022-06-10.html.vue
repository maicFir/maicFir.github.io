<template><div><p>在前面几篇文章中，我们已经基础的如何运用一个<code v-pre>webpack</code>与<code v-pre>webpack-cli</code>从 0 到 1 搭建一个简单的<a href="https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&amp;mid=2247488592&amp;idx=1&amp;sn=346db8b9a019552c4e087beda6229849&amp;chksm=c3682d22f41fa4341be31bb874199729b940b05ac57ba968400727c078ef0da1c5fedcca4022#rd" target="_blank" rel="noopener noreferrer">react<ExternalLinkIcon/></a>或者<a href="https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&amp;mid=2247488788&amp;idx=1&amp;sn=842d58a67e8a46cfecaa7e53fe0fa913&amp;chksm=c3682c66f41fa5702aa86a440f12e31002d0e48d8606dc848218909d2b84ecc7ff01c5a56086#rd" target="_blank" rel="noopener noreferrer">vue<ExternalLinkIcon/></a>工程应用，其中我们使用了加载文件，我们在之前处理文件使用<code v-pre>file-loader</code>或者<code v-pre>url-loader</code>处理，<code v-pre>url-loader</code>主要是可以针对图片文件大小进行有选择的<code v-pre>base64</code>压缩，在<code v-pre>webpack5</code>中可以用内置的<code v-pre>Asset Modules</code>来处理图片资源</p>
<p>接下来我们一起来探讨下<code v-pre>webpack5</code>中关于<a href="https://webpack.docschina.org/guides/asset-modules/" target="_blank" rel="noopener noreferrer">Asset Modules<ExternalLinkIcon/></a>的那些事</p>
<p>正文开始...</p>
<h3 id="初始化基础项目" tabindex="-1"><a class="header-anchor" href="#初始化基础项目" aria-hidden="true">#</a> 初始化基础项目</h3>
<p>新建一个文件夹<code v-pre>webpack-04-resource</code>，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm init <span class="token operator">-</span>y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们安装项目一些基础支持的插件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i webpack webpack<span class="token operator">-</span>cli webpack<span class="token operator">-</span>dev<span class="token operator">-</span>server html<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin babel<span class="token operator">-</span>loader @babel
l<span class="token operator">/</span>core <span class="token operator">-</span><span class="token constant">D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在根目录新建<code v-pre>webpack.config.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> CleanWebpackPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'clean-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'js/[name].js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'development'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'babel-loader'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@babel/env'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset/resource'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">CleanWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'./public/index.html'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们加载图片没有使用<code v-pre>file-loader</code>与<code v-pre>url-loader</code>，我们使用的是<code v-pre>webpack5</code>内置的<code v-pre>asset/rosource</code>这个来处理</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset/resource'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>index.js</code>中我们插入一张图片</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> img1Src <span class="token keyword">from</span> <span class="token string">'../assets/images/1.png'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> appDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> img1Src<span class="token punctuation">;</span>
appDom<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ok，运行<code v-pre>npm run server</code>,打开浏览器<code v-pre>localhost:8080</code>
<img src="https://files.mdnice.com/user/24614/cfbb4fb7-2827-4ec2-befe-ff296759831a.png" alt="">
我们会发现，生成的图片地址就是<code v-pre>&lt;img src=&quot;http://localhost:8080/js/../b1640e009cff6a775ce5.png&quot;&gt;</code></p>
<h3 id="generator-配置" tabindex="-1"><a class="header-anchor" href="#generator-配置" aria-hidden="true">#</a> generator 配置</h3>
<p>现在我想配置图片的默认输出地址与名字,在<code v-pre>module.rules</code>中有一个<code v-pre>generator</code>的属性可以配置匹配图片输出的文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token operator">...</span><span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset/resource'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'images/[name][ext]'</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时页面加载图片的路径就变成<code v-pre>&lt;img src=&quot;http://localhost:8080/js/../images/1.png&quot;&gt;</code>了</p>
<p>如果你的图片地址是上传到<code v-pre>cdn</code>上的，那么你可以这么做，但是这种做法是不是在项目中真的需要，还有待商榷，因为这样会导致应用所有的所有图片用<code v-pre>cdn</code>方式加载，如果项目中只是部分图片按需 cdn 加载，那么这种做法是不可取的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token comment">// type: 'asset/resource'</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">dataUrlCondition</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">maxSize</span><span class="token operator">:</span> <span class="token number">40</span> <span class="token operator">*</span> <span class="token number">1024</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">generator</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">'https://cdn/assets'</span><span class="token punctuation">,</span> <span class="token comment">// cdn域名前缀</span>
          <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'images/[name][ext]'</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自此页面的加载的图片就是<code v-pre>&lt;img src=&quot;https://cdn/assets/images/3.png&quot;&gt;</code></p>
<h3 id="assetmodulefilename" tabindex="-1"><a class="header-anchor" href="#assetmodulefilename" aria-hidden="true">#</a> assetModuleFilename</h3>
<p>除了<code v-pre>generator.filename</code>方式，你也可以在<code v-pre>output</code>中加入<code v-pre>assetModuleFilename</code>配置来修改图片默认的地址,不过注意这个属性只能是针对<code v-pre>rule</code>中设置的 type<code v-pre>''asset/resource' | 'asset'</code>类型才生效。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'js/[name].js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">assetModuleFilename</span><span class="token operator">:</span> <span class="token string">'images/[name][ext]'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常项目里我们会把比较小的图片直接坐<code v-pre>base64</code>加载，大的图片就直接输出加载，或者上传到<code v-pre>cdn</code>直接加载图片地址,你可以在<code v-pre>rules</code>的<code v-pre>generator.publicPath</code>设置地址图片地址。</p>
<p>因此我引入两张大小不一样的图片测试，修改一下<code v-pre>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> img1Src <span class="token keyword">from</span> <span class="token string">'../assets/images/1.png'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> img3Src <span class="token keyword">from</span> <span class="token string">'../assets/images/3.png'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">renderImage</span><span class="token punctuation">(</span><span class="token parameter">imageSource</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> weakMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> appDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  imageSource<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    weakMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>img<span class="token punctuation">,</span> img<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>weakMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      weakMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">.</span>src <span class="token operator">=</span> src<span class="token punctuation">;</span>
      appDom<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">renderImage</span><span class="token punctuation">(</span><span class="token punctuation">[</span>img1Src<span class="token punctuation">,</span> img3Src<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再修改下<code v-pre>webpack.config.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token operator">...</span><span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|jpg)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token comment">// type: 'asset/resource'</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">dataUrlCondition</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">maxSize</span><span class="token operator">:</span> <span class="token number">40</span> <span class="token operator">*</span> <span class="token number">1024</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>rules</code>中增加<code v-pre>parser</code>属性，并且将<code v-pre>type</code>改成<code v-pre>asset</code>,当我们设置一个<code v-pre>dataUrlCondition: {maxSize: 40 * 1024}</code>,小于<code v-pre>KB</code>就用<code v-pre>base64</code>加载了，大于<code v-pre>40KB</code>就直接用图片路径加载</p>
<p><img src="https://files.mdnice.com/user/24614/73ab86a1-25e7-499a-a728-c710b6ae6916.png" alt="">
因此我们可以看到两张图片，一张图片是<code v-pre>base64</code>一张图片就走文件路径了。</p>
<p>所以在你的项目中你可以利用这个<code v-pre>parser.dataUrlCondition.maxSize</code>特性来优化图片资源，有些资源小图片就可以用<code v-pre>base64</code>来加载，这样可以减少页面图片的资源请求</p>
<p>但是并不是所有的图片都要<code v-pre>base64</code>,<code v-pre>base64</code>生成的字符串非常大，同时也是增加了<code v-pre>html</code>的体积，无法利用缓存机制加载图片。</p>
<p>所以在优化的网页加载过程中，并不是全部都用<code v-pre>base64</code>来加载图片。</p>
<h3 id="关于内置模块的几个参数" tabindex="-1"><a class="header-anchor" href="#关于内置模块的几个参数" aria-hidden="true">#</a> 关于内置模块的几个参数</h3>
<p>主要参考官网<a href="https://webpack.docschina.org/guides/asset-modules/" target="_blank" rel="noopener noreferrer">asset-modules<ExternalLinkIcon/></a></p>
<p>webpack5 之前</p>
<ul>
<li>row-loader 将文件导入为字符串，比如导入.txt 类型的文件</li>
<li>url-loader 将文件作为<code v-pre>Data Url</code>嵌入到打包后<code v-pre>bundle.js</code>中，比如<code v-pre>base64</code>文件</li>
<li>file-loader 将文件输出目录，图片文件会被打包到指定目录中加载</li>
</ul>
<p>webpack5 现在</p>
<p>用<code v-pre>asset module type</code>通过添加以下四种类型来代替以上<code v-pre>loader</code></p>
<ul>
<li>asset/resource 导出单独的<code v-pre>url</code>,是<code v-pre>file-loader</code>的替代品</li>
<li>asset/inline 导出资源 Data Url,是<code v-pre>url-loader</code>的替代品</li>
<li>asset/source 到处文件资源内容，是<code v-pre>row-loader</code>的替代品</li>
<li>asset 在<code v-pre>url-loader</code>和<code v-pre>file-loader</code>中选择，配置<code v-pre>parse.dataUrlCondition.maxSize</code>
来输出图片资源是否<code v-pre>base64</code>输出</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>相比较<code v-pre>webpack5</code>之前我们加载图片资源文件使用<code v-pre>file-loader</code>或者<code v-pre>url-loader</code>在<code v-pre>webpack5</code>中可以使用内置模块<code v-pre>type: 'assets/resource'</code></p>
</li>
<li>
<p>基于 webpack5 内置模块<code v-pre>asset module type</code>来设置资源的加载</p>
</li>
<li>
<p>图片资源<code v-pre>base64</code>处理，根据图片资源的大小<code v-pre>parse.dataUrlCondition.maxSize</code>来限制是否需要<code v-pre>base64</code>输出</p>
</li>
<li>
<p>比较<code v-pre>asset module type</code>几种模式区别，代替以前<code v-pre>row-loader</code>、<code v-pre>file-loader</code>、<code v-pre>url-loader</code>方案，但是这仅仅是你的<code v-pre>webpack</code>版本在 5 以后。</p>
</li>
<li>
<p>本文<a href="https://github.com/maicFir/lessonNote/tree/master/webpack/webpack-04-assets" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
