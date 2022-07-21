<template><div><p><code v-pre>webpack</code>如何打包资源优化你有了解吗？或者一个经常被问的面试题，首屏加载如何优化，其实无非就是从<code v-pre>http</code>请求、<code v-pre>文件资源</code>、<code v-pre>图片加载</code>、<code v-pre>路由懒加载</code>、<code v-pre>预请求</code>，<code v-pre>缓存</code>这些方向来优化，通常在使用脚手架中，成熟的脚手架已经给你做了最大的优化，比如压缩资源，代码的<code v-pre>tree shaking</code>等。</p>
<p>本文是笔者根据以往经验以及阅读官方文档总结的一篇关于<code v-pre>webpack打包</code>方面的长文笔记，希望在项目中有所帮助。</p>
<p>正文开始...</p>
<p>在阅读之前，本文将从以下几个点去探讨 webpack 的打包优化</p>
<p>1、<code v-pre>webpack</code>如何做<code v-pre>treeShaking</code></p>
<p>2、<code v-pre>webpack</code>的 gizp 压缩</p>
<p>3、<code v-pre>css</code>如何做<code v-pre>treeShaking</code>,</p>
<p>4、入口依赖文件<code v-pre>拆包</code></p>
<p>5、<code v-pre>图片资源</code>加载优化</p>
<h3 id="treeshaking" tabindex="-1"><a class="header-anchor" href="#treeshaking" aria-hidden="true">#</a> treeShaking</h3>
<p>在官网中有提到<a href="https://webpack.docschina.org/guides/tree-shaking/" title="treeShaking" target="_blank" rel="noopener noreferrer">treeShaking<ExternalLinkIcon/></a>,从名字上中文解释就是摇树，就是利用<code v-pre>esModule</code>的特性，删除上下文未引用的代码。因为 webpack 可以根据<code v-pre>esModule</code>做静态分析，本身来说它是打包编译前输出，所以<code v-pre>webpack</code>在编译<code v-pre>esModule</code>的代码时就可以做上下文未引用的删除操作。</p>
<p>那么如何做<code v-pre>treeshaking</code>?我们来分析下</p>
<h3 id="快速初始化一个-webpack-项目" tabindex="-1"><a class="header-anchor" href="#快速初始化一个-webpack-项目" aria-hidden="true">#</a> 快速初始化一个 webpack 项目</h3>
<p>在之前我们都是手动配置搭建<code v-pre>webpack</code>项目，<code v-pre>webpack</code>官方提供了<code v-pre>cli</code>快速构建基本模版，无需像之前一样手动配置<code v-pre>entry</code>、<code v-pre>plugins</code>、<code v-pre>loader</code>等</p>
<p>首先安装<code v-pre>npm i webpack webpack-cli</code>，命令行执行`</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npx webpack init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一系列初始化操作后，就生成以下代码了
<img src="https://files.mdnice.com/user/24614/d00ffdba-a94b-4d80-b378-550af52e1364.png" alt="">
默认的<code v-pre>webpack.config.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Generated using webpack-cli https://github.com/webpack/webpack-cli</span>

<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> MiniCssExtractPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mini-css-extract-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> WorkboxWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'workbox-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> isProduction <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">==</span> <span class="token string">'production'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> stylesHandler <span class="token operator">=</span> MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">;</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">'localhost'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'index.html'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Add your plugins here</span>
    <span class="token comment">// Learn more about plugins from https://webpack.js.org/configuration/plugins/</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(js|jsx)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'babel-loader'</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.less$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>stylesHandler<span class="token punctuation">,</span> <span class="token string">'css-loader'</span><span class="token punctuation">,</span> <span class="token string">'postcss-loader'</span><span class="token punctuation">,</span> <span class="token string">'less-loader'</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>stylesHandler<span class="token punctuation">,</span> <span class="token string">'css-loader'</span><span class="token punctuation">,</span> <span class="token string">'postcss-loader'</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset'</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// Add your rules for custom modules here</span>
      <span class="token comment">// Learn more about loaders from https://webpack.js.org/loaders/</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isProduction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">'production'</span><span class="token punctuation">;</span>

    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WorkboxWebpackPlugin<span class="token punctuation">.</span>GenerateSW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">'development'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行命令<code v-pre>npm run serve</code>
<img src="https://files.mdnice.com/user/24614/3a94620d-4717-4460-a27c-8a6aed495be5.png" alt=""></p>
<p>现在修改一下<code v-pre>index.js</code>,并在<code v-pre>src</code>中增加<code v-pre>utils</code>目录</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// utils/index.js</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">square</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> add <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./utils'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello World!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>index.js</code>中我只引入了<code v-pre>add</code>，相当于<code v-pre>square</code>这个函数在上下文中并未引用。</p>
<h3 id="usedexports" tabindex="-1"><a class="header-anchor" href="#usedexports" aria-hidden="true">#</a> usedExports</h3>
<p>不过我还需要改下<code v-pre>webpack.config.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isProduction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">"production"</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WorkboxWebpackPlugin<span class="token punctuation">.</span>GenerateSW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">"development"</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>devtool <span class="token operator">=</span> <span class="token string">'source-map'</span>
    config<span class="token punctuation">.</span>optimization <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我只增加了<code v-pre>devtool:source-map</code>与<code v-pre>optimization.usedExports = true</code></p>
<p>我们看下<code v-pre>package.json</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token string-property property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"build"</span><span class="token operator">:</span> <span class="token string">"webpack --mode=production --node-env=production"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"build:dev"</span><span class="token operator">:</span> <span class="token string">"webpack --mode=development"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"build:prod"</span><span class="token operator">:</span> <span class="token string">"webpack --mode=production --node-env=production"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"watch"</span><span class="token operator">:</span> <span class="token string">"webpack --watch"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"serve"</span><span class="token operator">:</span> <span class="token string">"webpack serve"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认初始化已经给们预设了多个不同的打包环境，因此我只需要运行下面命令就可以选择开发环境了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm run build<span class="token operator">:</span>dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/dd5f1a51-432c-4101-b371-1b426dcd37e6.png" alt="">
此时我们看到打包后的代码未引入的<code v-pre>square</code>有一行注释</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/* unused harmony export square */</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">square</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>square</code>上下文未引用，虽然给了标记，但是未真正清除。</p>
<p>光使用<code v-pre>usedExports:true</code>还不行，<code v-pre>usedExports 依赖于 terser 去检测语句中的副作用</code>,因此需要借助<code v-pre>terser</code>插件一起使用，官方<code v-pre>webpack5</code>提供了<code v-pre>TerserWebpackPlugin</code>这样一个插件</p>
<p>在<code v-pre>webpack.config.js</code>中引入</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">const</span> TerserPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"terser-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isProduction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">"production"</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WorkboxWebpackPlugin<span class="token punctuation">.</span>GenerateSW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">"development"</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>devtool <span class="token operator">=</span> <span class="token string">'source-map'</span>
    config<span class="token punctuation">.</span>optimization <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 设置为true 告诉webpack会做treeshaking</span>
      <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 开启terser</span>
      <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">extractComments</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>  <span class="token comment">// 是否将注释剥离到单独文件，默认是true</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现，那个<code v-pre>square</code>函数就没有了
<img src="https://files.mdnice.com/user/24614/9423307e-23d2-464b-b069-5adb708931b2.png" alt="">
如果我将<code v-pre>usedExports.usedExports = false</code>,你会发现<code v-pre>square</code>没有被删除。
<img src="https://files.mdnice.com/user/24614/ae858b55-8062-4200-b319-4edd0090bdef.png" alt=""></p>
<p>官方解释，当我们设置<code v-pre>optimization.usedExports</code>必须为<code v-pre>true</code>,当我们设置<code v-pre>usedExports:true</code>，且必须开起<code v-pre>minimize: true</code>，这样才会把上下文未使用的代码给清除掉，如果<code v-pre>minimize: false</code>,那么压缩插件将会失效。</p>
<p>当我们设置<code v-pre>usedExports: true</code></p>
<p>此时生成打包的代码会有一个这样的魔法注释,<code v-pre>square</code>未使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/* unused harmony export square */</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">square</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们设置<code v-pre>minimize: true</code>时，<code v-pre>webpack5</code>会默认开启<code v-pre>terser</code>压缩，然后发现有这样的<code v-pre>unused harmony export square</code>就会删掉对应未引入的代码。</p>
<h3 id="sideeffects" tabindex="-1"><a class="header-anchor" href="#sideeffects" aria-hidden="true">#</a> sideEffects</h3>
<p>这个是<code v-pre>usedExports</code>摇树的另一种方案，<code v-pre>usedExports</code>是检查上下文有没有引用，如果没有引用，就会注入<code v-pre>魔法注释</code>，通过<code v-pre>terser</code>压缩进行去除未引入的代码</p>
<p>而<code v-pre>slideEffects</code>是对<code v-pre>没有副作用</code>的代码进行去除</p>
<p>首先什么是<code v-pre>副作用</code>，这是一个不太好理解的词，在<code v-pre>react</code>中经常有听到</p>
<p>其实<code v-pre>副作用</code>就是一个纯函数中存在可变依赖的因变量，因为某个因变量会造成纯函数产生不可控的结果</p>
<p>举个例子</p>
<p>没有副作用的函数，输入输出很明确</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">watchEnv</span><span class="token punctuation">(</span><span class="token parameter">env</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> env <span class="token operator">===</span> <span class="token string">'prd'</span> <span class="token operator">?</span> <span class="token string">'product'</span> <span class="token operator">:</span> <span class="token string">'development'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">watchEnv</span><span class="token punctuation">(</span><span class="token string">'prd'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有副作用,函数体内有不确定性因素</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">watchEnv</span><span class="token punctuation">(</span><span class="token parameter">env</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> num <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    env <span class="token operator">=</span> <span class="token string">'development'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> env <span class="token operator">===</span> <span class="token string">'production'</span> <span class="token operator">?</span> <span class="token string">'生产环境'</span> <span class="token operator">:</span> <span class="token string">'测试开发环境'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在<code v-pre>index.js</code>中引入<code v-pre>watch.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> add <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./utils'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'./utils/watch.js'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello World!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后运行<code v-pre>npm run build:dev</code>,打包后的文件有<code v-pre>watch</code>的引入</p>
<p><img src="https://files.mdnice.com/user/24614/191110aa-26a5-49de-9bc3-60a63ecb49be.png" alt=""></p>
<p>在<code v-pre>index.js</code>中引入<code v-pre>watch.js</code>并没有什么使用,但是我们仍然打包了进去</p>
<p>为了去除这引入但未被使用的代码，因此你需要在<code v-pre>optimization.sideEffects: true</code>，并且要在<code v-pre>package.json</code>中设置<code v-pre>sideEffects: false</code>，在<code v-pre>optimization.sideEffects</code>设置 true,告知 webpack 根据 package.json 中的 sideEffects 标记的副作用或者规则，从而告知 webpack 跳过一些引入但未被使用的模块代码。具体参考<a href="https://webpack.docschina.org/configuration/optimization/#optimizationsideeffects" title="optimization.sideEffects" target="_blank" rel="noopener noreferrer">optimization.sideEffects<ExternalLinkIcon/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isProduction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">'production'</span><span class="token punctuation">;</span>

    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WorkboxWebpackPlugin<span class="token punctuation">.</span>GenerateSW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">'development'</span><span class="token punctuation">;</span>
    <span class="token punctuation">(</span>config<span class="token punctuation">.</span>devtool <span class="token operator">=</span> <span class="token string">'source-map'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>config<span class="token punctuation">.</span>optimization <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">sideEffects</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 开启sideEffects</span>
        <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 开启terser</span>
        <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">extractComments</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 是否将注释剥离到单独文件，默认是true</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-webpack-project"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"My webpack project"</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
  <span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时你运行命令<code v-pre>npm run build:dev</code>，查看打包文件
<img src="https://files.mdnice.com/user/24614/3807f010-fcb6-471f-8333-bd5e3d6c1858.png" alt="">
我们就会发现，引入的<code v-pre>watch.js</code>就没有了</p>
<p>在官方中有这么一段话<code v-pre>使用 mode 为 &quot;production&quot; 的配置项以启用更多优化项，包括压缩代码与 tree shaking。</code></p>
<p>因此在<code v-pre>webpack5</code>中只要你设置<code v-pre>mode:production</code>那些代码压缩、<code v-pre>tree shaking</code>通通默认给你做了做了最大的优化，你就无需操心代码是否有被压缩，或者<code v-pre>tree shaking</code>了。
<img src="https://img.soogif.com/UOkPg5REz1gR8YJNpWMBpagd78IhUwzk.gif?scope=mdnice" alt=""></p>
<p>对于能否被<code v-pre>tree shaking</code>还补充几点</p>
<p>1、一定是<code v-pre>esModule</code>方式，也就是<code v-pre>export xxx</code>或者<code v-pre>import xx from 'xxx'</code>的方式</p>
<p>2、<code v-pre>cjs</code>方式不能被<code v-pre>tree shaking</code></p>
<p>3、线上打包生产环境<code v-pre>mode:production</code>自动开启多项优化，可以参考生产环境的构建<a href="https://webpack.docschina.org/guides/production/" title="production" target="_blank" rel="noopener noreferrer">production<ExternalLinkIcon/></a></p>
<h3 id="gizp-压缩" tabindex="-1"><a class="header-anchor" href="#gizp-压缩" aria-hidden="true">#</a> gizp 压缩</h3>
<p>首先是是在<code v-pre>devServer</code>下提供了一个开发环境的<code v-pre>compress:true</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">"localhost"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 启用zip压缩</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>CompressionWebpackPlugin 插件<a href="https://webpack.docschina.org/plugins/compression-webpack-plugin/" title="gizp" target="_blank" rel="noopener noreferrer">gizp<ExternalLinkIcon/></a>压缩</li>
</ul>
<p>需要安装对应插件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i compression<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin <span class="token operator">--</span>save<span class="token operator">-</span>dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>webpack.config.js</code>中引入插件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Generated using webpack-cli https://github.com/webpack/webpack-cli</span>
<span class="token operator">...</span>
<span class="token keyword">const</span> CompressionWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'compression-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"index.html"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">CompressionWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// Add your plugins here</span>
    <span class="token comment">// Learn more about plugins from https://webpack.js.org/configuration/plugins/</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你运行命令后，你就会发现打包后的文件有<code v-pre>gzip</code>的文件了</p>
<p><img src="https://files.mdnice.com/user/24614/78e275ee-181a-4f4d-ac86-f873d89fe897.png" alt="">
但是我们发现<code v-pre>html</code>以及<code v-pre>map.js.map</code>文件也被<code v-pre>gizp</code>压缩了，这是没有必要的</p>
<p>官方提供了一个<code v-pre>exclude</code>,可以排除某些文件不被<code v-pre>gizp</code>压缩</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
   <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"index.html"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">CompressionWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.(html|map)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span> <span class="token comment">// 排除html,map文件</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// Add your plugins here</span>
    <span class="token comment">// Learn more about plugins from https://webpack.js.org/configuration/plugins/</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/937b596d-db4a-4923-a0aa-1cc0b3a48090.png" alt=""></p>
<p>对比开启<code v-pre>gizp</code>压缩与未压缩,加载时间很明显有提升
<img src="https://files.mdnice.com/user/24614/95b3a34f-aab9-4774-ab5e-305d89efc60f.png" alt=""></p>
<h3 id="css-tree-shaking" tabindex="-1"><a class="header-anchor" href="#css-tree-shaking" aria-hidden="true">#</a> css tree shaking</h3>
<p>主要删除未使用的样式，如果样式未使用，就删除掉。</p>
<p>现在修改下<code v-pre>index.js</code>
我在<code v-pre>body</code>中插入一个<code v-pre>class</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> add <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./utils'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'./utils/watch'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'./css/index.css'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello World!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// /*#__PURE__*/ watchEnv(process.env.NODE_ENV)</span>

<span class="token keyword">const</span> bodyDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">'body'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> divDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
divDom<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'class'</span><span class="token punctuation">,</span> <span class="token string">'wrap-box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
bodyDom<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>divDom<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的 css 如下</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行<code v-pre>npm run serve</code>
<img src="https://files.mdnice.com/user/24614/e2dee5f8-35ac-40d3-b79a-94b0e80045dd.png" alt="">
但是我们发现，样式居然没了</p>
<p>于是苦思瞑想，不得其解,于是一顿排查，当我们把<code v-pre>sideEffects: false</code>时，神奇的是，样式没有被删掉
<img src="https://files.mdnice.com/user/24614/cf723a9f-b90e-4d3c-8dcb-a3654c141f98.png" alt="">
原来是<code v-pre>sideEffects:true</code>把引入的 css 当成没有副作用的代码给删除了，此时，你需要告诉<code v-pre>webpack</code>不要删除我的这有用的代码,不要误删了，因为<code v-pre>import 'xxx.css'</code>如果设置了<code v-pre>sideEffects: true</code>，此时引入的<code v-pre>css</code>会被当成无副作用的代码，就给删除了。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// package.json</span>
<span class="token punctuation">{</span>
  <span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"**/*.css"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你设置完后，页面就可以正常显示 css 了</p>
<p>官方也提供了另外一种方案，你可以在<code v-pre>module.rules</code>中设置</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
         <span class="token punctuation">{</span>
        test<span class="token operator">:</span> /\.css$/i<span class="token punctuation">,</span>
        sideEffects<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span>stylesHandler<span class="token punctuation">,</span> <span class="token string">"css-loader"</span><span class="token punctuation">,</span> <span class="token string">"postcss-loader"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上与在<code v-pre>package.json</code>设置一样的效果，都是让<code v-pre>webpack</code>不要误删了无副作用的 css 的代码</p>
<p>但是现在有这样的<code v-pre>css</code>代码</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.wrap-box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.title</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>title</code>页面没有被引用，但是也被打包进去了</p>
<p>此时需要一个插件来帮助我们来完成 css 的摇树<a href="https://www.npmjs.com/package/purgecss-webpack-plugin" title="purgecss-webpack-plugin" target="_blank" rel="noopener noreferrer">purgecss-webpack-plugin<ExternalLinkIcon/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
<span class="token keyword">const</span> glob <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'glob'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> PurgeCSSPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'purgecss-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">PATH</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">src</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'src'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token operator">...</span>
    <span class="token keyword">new</span> <span class="token class-name">PurgeCSSPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">paths</span><span class="token operator">:</span> glob<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">PATH</span><span class="token punctuation">.</span>src<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/**/*</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">nodir</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// Add your plugins here</span>
    <span class="token comment">// Learn more about plugins from https://webpack.js.org/configuration/plugins/</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>未引用的 css 就已经被删除了
<img src="https://files.mdnice.com/user/24614/d9af57c5-ffe4-49cd-8a3d-d36c07449db1.png" alt=""></p>
<h3 id="分包" tabindex="-1"><a class="header-anchor" href="#分包" aria-hidden="true">#</a> 分包</h3>
<p>主要是减少入口依赖文件包的体积，如果不进行拆包，那么我们根据<code v-pre>entry</code>的文件打包就很大。那么也会影响首页加载的性能。</p>
<p>官方提供了两种方案：</p>
<ul>
<li>entry 分多个文件，举个栗子</li>
</ul>
<p>引入<code v-pre>loadsh</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> add <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./utils'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">'loadsh'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'./utils/watch'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'./css/index.css'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello World!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// /*#__PURE__*/ watchEnv(process.env.NODE_ENV)</span>

<span class="token keyword">const</span> bodyDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">'body'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> divDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
divDom<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'class'</span><span class="token punctuation">,</span> <span class="token string">'wrap-box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
divDom<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">'wrap-box'</span><span class="token punctuation">;</span>
bodyDom<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>divDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_<span class="token punctuation">.</span><span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Maic'</span><span class="token punctuation">,</span> <span class="token string">'Web技术学苑'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/c0e1397b-d212-48ad-bd3f-22dea9d6c7d9.png" alt="">
<code v-pre>main.js</code>中将<code v-pre>loadsh</code>打包进去了,体积也非常之大<code v-pre>72kb</code>
<img src="https://files.mdnice.com/user/24614/975cc315-b243-4a51-a522-60f6efea3dd7.png" alt=""></p>
<p>我们现在利用<code v-pre>entry</code>进行分包</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token keyword">import</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'./src/index'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">dependOn</span><span class="token operator">:</span> <span class="token string">'loadsh-vendors'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">'loadsh-vendors'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'loadsh'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时我们再次运行<code v-pre>npm run build:dev</code>
此时<code v-pre>main.js</code>的大小<code v-pre>1kb</code>，但是<code v-pre>loadsh</code>已经被分离出来了
<img src="https://files.mdnice.com/user/24614/f8ad63c5-378f-4736-82d2-dbdb69a86554.png" alt="">
<img src="https://files.mdnice.com/user/24614/fd4caef1-a8e5-44a2-9e25-cf4e812e0156.png" alt="">
生成的<code v-pre>loadsh-vendors.js</code>会被单独引入</p>
<p>可以看下打包后的<code v-pre>index.html</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Webpack App<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>loadsh-vendors.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main.css<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello world!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>Tip: Check your console<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">'serviceWorker'</span> <span class="token keyword">in</span> navigator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'load'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        navigator<span class="token punctuation">.</span>serviceWorker
          <span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string">'service-worker.js'</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">registration</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Service Worker registered: '</span><span class="token punctuation">,</span> registration<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">registrationError</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'Service Worker registration failed: '</span><span class="token punctuation">,</span> registrationError<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>splitChunks
主要是在<code v-pre>optimzation.splitChunks</code>对于动态导入模块，在<code v-pre>webpack4+</code>就默认采取分块策略</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// entry: {</span>
  <span class="token comment">//   main: { import: ['./src/index'], dependOn: 'loadsh-vendors' },</span>
  <span class="token comment">//   'loadsh-vendors': ['loadsh']</span>
  <span class="token comment">// },</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isProduction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">"production"</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WorkboxWebpackPlugin<span class="token punctuation">.</span>GenerateSW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">"development"</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>devtool <span class="token operator">=</span> <span class="token string">'source-map'</span><span class="token punctuation">,</span>
      config<span class="token punctuation">.</span>optimization <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">'all'</span> <span class="token comment">// 支持异步和非异步共享chunk</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sideEffects</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 开启terser</span>
        <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">extractComments</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否将注释剥离到单独文件，默认是true</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当<code v-pre>optimization.splitChunks.chunks:'all'</code>,此时可以把<code v-pre>loash</code>分包出来了
<img src="https://files.mdnice.com/user/24614/b3e726b9-bfb1-4f2b-b017-201351f619dd.png" alt=""></p>
<p>关于<code v-pre>optimization.splitChunks</code>的设置非常之多，有对缓存的设置，有对<code v-pre>chunk</code>大小的限制，最常用的还是设置<code v-pre>chunks:all</code>，建议<a href="https://webpack.docschina.org/plugins/split-chunks-plugin/" title="SplitChunksPlugin" target="_blank" rel="noopener noreferrer">SplitChunksPlugin<ExternalLinkIcon/></a>多读几遍,一定会找到不少收获。</p>
<ul>
<li>runtimeChunk
主要减少依赖入口文件打包体积，当我们设置<code v-pre>optimization.runtimeChunk</code>时，运行时依赖的代码会独立打包成一个<code v-pre>runtime.xxx.js</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
  config<span class="token punctuation">.</span>optimization <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">runtimeChunk</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 减少入口文件打包的体积，运行时代码会独立抽离成一个runtime的文件</span>
        <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 默认是1，可以不设置</span>
          <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span> <span class="token comment">// 支持异步和非异步共享chunk</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sideEffects</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 开启terser</span>
        <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">extractComments</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否将注释剥离到单独文件，默认是true</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>main.js</code>有一部分代码移除到一个独立的<code v-pre>runtime.js</code>中
<img src="https://files.mdnice.com/user/24614/07da67f1-be68-4bc6-a786-59e3845eb0a9.png" alt=""></p>
<ul>
<li>Externals 外部扩展
第三种方案就是，<code v-pre>webpack</code>提供了一个外部扩展，将输出的<code v-pre>bundle.js</code>排除第三方的依赖，参考<a href="https://webpack.docschina.org/configuration/externals/" title="Externals" target="_blank" rel="noopener noreferrer">Externals<ExternalLinkIcon/></a></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// entry: {</span>
  <span class="token comment">//   main: { import: ['./src/index'], dependOn: 'loadsh-vendors' },</span>
  <span class="token comment">//   'loadsh-vendors': ['loadsh']</span>
  <span class="token comment">// },</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
  <span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^(loadsh)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
  <span class="token comment">/* or
  externals: {
    loadsh: '_'
  }
  */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isProduction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">"production"</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WorkboxWebpackPlugin<span class="token punctuation">.</span>GenerateSW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token string">"development"</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>devtool <span class="token operator">=</span> <span class="token string">'source-map'</span><span class="token punctuation">,</span>
      config<span class="token punctuation">.</span>optimization <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">runtimeChunk</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 减少入口文件打包的体积，运行时代码会独立抽离成一个runtime的文件</span>
        <span class="token comment">// splitChunks: {</span>
        <span class="token comment">//   minChunks: 1,</span>
        <span class="token comment">//   chunks: 'all', // 支持异步和非异步共享chunk</span>
        <span class="token comment">// },</span>
        <span class="token literal-property property">sideEffects</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">usedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 开启terser</span>
        <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">extractComments</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否将注释剥离到单独文件，默认是true</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是此时<code v-pre>loash</code>已经被我们移除了，我们还需在<code v-pre>HtmlWebpackPlugin</code>中加入引入的<code v-pre>cdn</code>地址</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
 <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"index.html"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token string">'body'</span><span class="token punctuation">,</span> <span class="token comment">// 插入到body中</span>
      <span class="token literal-property property">cdn</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">basePath</span><span class="token operator">:</span> <span class="token string">'https://cdn.bootcdn.net/ajax/libs'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">js</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">'/lodash.js/4.17.21/lodash.min.js'</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改模版,由于模版内容是<a href="https://ejs.bootcss.com/#docs" title="ejs" target="_blank" rel="noopener noreferrer">ejs<ExternalLinkIcon/></a>，所以我们循环取出<code v-pre>js</code>数组中的数据</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Webpack App<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello world!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>Tip: Check your console<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
    &lt;% for (var i in htmlWebpackPlugin.options.cdn &amp;&amp; htmlWebpackPlugin.options.cdn.js) { %>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&lt;%= htmlWebpackPlugin.options.cdn.basePath %>&lt;%= htmlWebpackPlugin.options.cdn.js[i] %><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    &lt;% } %>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">'serviceWorker'</span> <span class="token keyword">in</span> navigator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'load'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        navigator<span class="token punctuation">.</span>serviceWorker
          <span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string">'service-worker.js'</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">registration</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Service Worker registered: '</span><span class="token punctuation">,</span> registration<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">registrationError</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'Service Worker registration failed: '</span><span class="token punctuation">,</span> registrationError<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时你运行命令<code v-pre>npm run build:dev</code>,然后打开 html 页面
<img src="https://files.mdnice.com/user/24614/18577504-a0c1-465b-b367-b74a40cb2f43.png" alt=""></p>
<p>但是我们发现当我们运行<code v-pre>npm run serve</code>启动本地服务，此时页面还是会引入<code v-pre>loadsh</code>，在开发环境，其实并不需要引入，本身生成的<code v-pre>bundle.js</code>就是在内存中加载的，很显然不是我们需要的</p>
<p>此时我需要做几件事</p>
<p>1、开发环境我不允许引入<code v-pre>externals</code></p>
<p>2、模版<code v-pre>html</code>中需要根据环境判断是否需要插入<code v-pre>cdn</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">const</span> isProduction <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">==</span> <span class="token string">"production"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> stylesHandler <span class="token operator">=</span> MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token constant">PATH</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">src</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'src'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// entry: {</span>
  <span class="token comment">//   main: { import: ['./src/index'], dependOn: 'loadsh-vendors' },</span>
  <span class="token comment">//   'loadsh-vendors': ['loadsh']</span>
  <span class="token comment">// },</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"dist"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">"localhost"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">env</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span><span class="token punctuation">,</span> <span class="token comment">// 传入模版中的环境</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"index.html"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token string">'body'</span><span class="token punctuation">,</span> <span class="token comment">// 插入到body中</span>
      <span class="token literal-property property">cdn</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">basePath</span><span class="token operator">:</span> <span class="token string">'https://cdn.bootcdn.net/ajax/libs'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">js</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">'/lodash.js/4.17.21/lodash.min.js'</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">CompressionWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.(html|map)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span> <span class="token comment">// 排除html,map文件不做gizp压缩</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">PurgeCSSPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">paths</span><span class="token operator">:</span> glob<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">PATH</span><span class="token punctuation">.</span>src<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/**/*</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">nodir</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// Add your plugins here</span>
    <span class="token comment">// Learn more about plugins from https://webpack.js.org/configuration/plugins/</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
  <span class="token comment">// externals: /^(loadsh)$/i,</span>
  <span class="token literal-property property">externals</span><span class="token operator">:</span> isProduction <span class="token operator">?</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">loadsh</span><span class="token operator">:</span> <span class="token string">'_'</span>
  <span class="token punctuation">}</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据传入模版的<code v-pre>env</code>判断是否需要插入 cdn</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>... &lt;% if (htmlWebpackPlugin.options.env === 'production') { %> &lt;% for (var i in htmlWebpackPlugin.options.cdn &amp;&amp; htmlWebpackPlugin.options.cdn.js) { %>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&lt;%= htmlWebpackPlugin.options.cdn.basePath %>&lt;%= htmlWebpackPlugin.options.cdn.js[i] %><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
&lt;% } %> &lt;% } %>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="图片资源压缩" tabindex="-1"><a class="header-anchor" href="#图片资源压缩" aria-hidden="true">#</a> 图片资源压缩</h3>
<p>主要是有选择的压缩图片资源，我们可以看下<code v-pre>module.rules.parser</code></p>
<ul>
<li>module.rules.parser.dataUrlCondition
对应的资源文件可以限制图片的输出,比如静态资源模块类型</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(png|svg|jpg|jpeg|gif)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset/resource'</span><span class="token punctuation">,</span>
       <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">dataUrlCondition</span><span class="token operator">:</span> <span class="token punctuation">{</span>
           <span class="token literal-property property">maxSize</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token comment">// 小于4kb将会base64输出</span>
         <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>官方提供了一个<a href="https://webpack.docschina.org/plugins/image-minimizer-webpack-plugin/" title="ImageMinimizerWebpackPlugin" target="_blank" rel="noopener noreferrer">ImageMinimizerWebpackPlugin<ExternalLinkIcon/></a>
我们需要安装</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i image<span class="token operator">-</span>minimizer<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin imagemin <span class="token operator">--</span>save<span class="token operator">-</span>dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code v-pre>webpack.config.js</code>中引入<code v-pre>image-minimizer-webpack-plugin</code>,并且在<code v-pre>plugins</code>中引入这个插件,注意<code v-pre>webpack5</code>官网那份文档很旧，参考<code v-pre>npm</code>上<a href="https://www.npmjs.com/package/image-minimizer-webpack-plugin" title="npm-image-minimizer-webpack-plugin" target="_blank" rel="noopener noreferrer">npm-image-minimizer-webpack-plugin<ExternalLinkIcon/></a></p>
<p>按照官网的，就直接报错一些配置参数不存在，我估计文档没及时更新</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">const</span> ImageMinimizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'image-minimizer-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
 <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
   <span class="token operator">...</span>
    <span class="token keyword">new</span> <span class="token class-name">ImageMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// Implementation</span>
        <span class="token literal-property property">implementation</span><span class="token operator">:</span> ImageMinimizerPlugin<span class="token punctuation">.</span>squooshMinify<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// Add your plugins here</span>
    <span class="token comment">// Learn more about plugins from https://webpack.js.org/configuration/plugins/</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>未压缩前
<img src="https://files.mdnice.com/user/24614/5e1ad262-bdce-485a-b698-57f9a6600da8.png" alt=""></p>
<p>压缩后</p>
<p><img src="https://files.mdnice.com/user/24614/f15cf267-d7b1-436a-8091-5fca113f8403.png" alt="">
使用压缩后，图片无损压缩体积大小压缩大小缩小一半，并且网络加载图片时间从<code v-pre>18.87ms</code>减少到<code v-pre>4.81ms</code>,时间加载上接近 5 倍的差距，因此可以用这个插件来优化图片加载。</p>
<p>这个插件可以将图片转成<code v-pre>webp</code>格式，具体参考官方文档效果测试一下</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>1、<code v-pre>webpack</code>如何做<code v-pre>treeShaking</code>，主要是两种</p>
<ul>
<li>optimization 中设置<code v-pre>usedExports:true</code>，但是要配合<code v-pre>terser</code>压缩插件才会生效</li>
<li>optimization 中设置<code v-pre>sideEffects: true</code>,在<code v-pre>package.json</code>中设置<code v-pre>sideEffects:false</code>去除无副作用的代码，但是注意<code v-pre>css</code>引入会当成无副作用的代码，此时需要在 rules 的 css 规则中标记<code v-pre>sideEffects: true</code>,这样就不会删除 css 了</li>
</ul>
<p>2、<code v-pre>webpack</code>的 gizp 压缩
主要是利用<code v-pre>CompressionWebpackPlugin</code>官方提供的这个插件</p>
<p>3、<code v-pre>css</code>如何做<code v-pre>treeShaking</code>,
主要是利用<code v-pre>PurgeCSSPlugin</code>这个插件，会将没有引用 css 删除</p>
<p>4、入口依赖文件拆包</p>
<ul>
<li>第一种是在入口文件<code v-pre>entry</code>中分包处理，将依赖的第三方库独立打包成一个公用的<code v-pre>bundle.js</code>,入口文件不会把第三方包打包到里面去</li>
<li>第二种利用<code v-pre>optimization.splitChunks</code>设置<code v-pre>chunks:'all'</code>将同步或者异步的<code v-pre>esModule</code>方式的代码进行分包处理，会单独打成一个公用的 js</li>
<li>利用外置扩展<code v-pre>externals</code>将第三方包分离出去，此时第三方包不会打包到入口文件中去，不过注意要在<code v-pre>ejs</code>模版中进行单独引入
5、<code v-pre>图片资源</code>加载优化</li>
<li>主要是利用静态资源模块对文件体积小的可以进行 base64</li>
<li>利用社区插件<code v-pre>image-minimizer-webpack-plugin</code>做图片压缩处理
6、本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/webpack/webpack-08-tree-shaking" title="code-example" target="_blank" rel="noopener noreferrer">code-example<ExternalLinkIcon/></a></li>
</ul>
</div></template>
