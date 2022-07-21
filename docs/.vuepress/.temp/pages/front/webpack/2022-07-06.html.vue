<template><div><p><a href="https://webpack.docschina.org/concepts/module-federation/" title="module Federation" target="_blank" rel="noopener noreferrer">Module Federation<ExternalLinkIcon/></a>官方称为<code v-pre>模块联邦</code>，模块联邦是<code v-pre>webpack5</code>支持的一个最新特性，多个独立构建的应用，可以组成一个应用，这些独立的应用不存在依赖关系，可以独立部署，官方称为<code v-pre>微前端</code>。</p>
<p>什么<code v-pre>模块联邦</code>,<code v-pre>微前端</code>，瞬间高大上了，但是官方那解释和示例似乎看起来还是似懂非懂。</p>
<p>正文开始...</p>
<p>在阅读本文前，本文将会从以下几点去探讨<code v-pre>MDF</code></p>
<ul>
<li>为什么会有<code v-pre>MDF</code></li>
<li><code v-pre>MDF</code>给我解决了什么样的问题</li>
<li><code v-pre>MDF</code>在多个应用中如何使用</li>
<li>写了一个例子感受<code v-pre>MDF</code>的强大</li>
</ul>
<h3 id="为什么会有-module-federation" tabindex="-1"><a class="header-anchor" href="#为什么会有-module-federation" aria-hidden="true">#</a> 为什么会有 Module Federation</h3>
<p>我们先看一下图</p>
<p><img src="https://files.mdnice.com/user/24614/d2769ff0-a17f-4511-9250-ed779d188df2.png" alt=""></p>
<p>在以前，我们每一个项目都会是一个独立的仓库，一个独立项目，一个独立的应用，多个项目应用之间都是互相独立，独立构建，独立部署。</p>
<p>现在假设<code v-pre>application-a</code>项目有一个组件是<code v-pre>Example</code>,假设<code v-pre>application-b</code>中也有一个组件需要这个组件<code v-pre>Example</code></p>
<p>我们之前的做法就是把<code v-pre>a</code>项目的<code v-pre>Example</code>拷贝到<code v-pre>b</code>项目中，如果这个<code v-pre>Example</code>组件有依赖第三方插件，那么我们在<code v-pre>b</code>项目也需要安装对应的第三方插件，而且有一种场景，就是哪天这个<code v-pre>Example</code>组件需要更新了，那么两个应用得重复修改两次。</p>
<p>于是你想到另外一种方案，我是不是可以把这个独立的组件可以抽象成一个独立的组件仓库，用<code v-pre>npm</code>去管理这个组件库，而且这样有组件的版本控制，看起来是一种非常不错的办法。</p>
<p>但是...，请看下面，MDF 解决的问题</p>
<h3 id="mdf-解决的问题" tabindex="-1"><a class="header-anchor" href="#mdf-解决的问题" aria-hidden="true">#</a> MDF 解决的问题</h3>
<p><code v-pre>webpack5</code>升级了，<code v-pre>module Federation</code>允许一个应用可以动态的加载另一个应用的代码，而且<code v-pre>共享依赖项</code></p>
<p>现在就变成了一个项目 A 中可以动态加载项目 B，项目 B 也可以动态加载项目 A,A 应用的任何应用可以通过<code v-pre>MFD</code>共享给其他应用使用。</p>
<p>我们可以用下面一张图理解下
<img src="https://files.mdnice.com/user/24614/251a8e52-7291-455e-885d-35e93e70525a.png" alt=""></p>
<p>甚至你可以把<code v-pre>B</code>应用利用模块联邦导出，在<code v-pre>A</code>应用中使用。</p>
<p>现在终于明白为啥会有<code v-pre>module federation</code>了吧，本质上就是多个独立的应用之间，可以相互引用，可以减少重复的代码，更好的维护多个应用。我在 A 项目写的一个组件，我发现 B 项目也有用，那么我可以把这个组件共享给 B 使用。而不是 cv 操作，或者把这个组件搞个独立 npm 仓库(这也是一种比较可靠的方案)</p>
<h3 id="举个栗子" tabindex="-1"><a class="header-anchor" href="#举个栗子" aria-hidden="true">#</a> 举个栗子</h3>
<p>新建一个目录<code v-pre>module-federation</code>,然后新建一个<code v-pre>packages</code>目录，对应的目录结构如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>packages
      <span class="token operator">|</span>
<span class="token operator">|</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>application<span class="token operator">-</span>a
        <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>src
            <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>App<span class="token punctuation">.</span>jsx
            <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>app<span class="token punctuation">.</span>js
        <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span><span class="token keyword">public</span>
        <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>index<span class="token punctuation">.</span>js
        <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span><span class="token operator">...</span>
        <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span><span class="token keyword">package</span><span class="token punctuation">.</span>json
<span class="token operator">|</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>application<span class="token operator">-</span>b
        <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span><span class="token operator">...</span>
<span class="token operator">|</span><span class="token operator">--</span><span class="token operator">--</span><span class="token keyword">package</span><span class="token punctuation">.</span>json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wsrun" tabindex="-1"><a class="header-anchor" href="#wsrun" aria-hidden="true">#</a> wsrun</h3>
<p>我们在<code v-pre>application-a</code>与<code v-pre>application-b</code>中新建一个<code v-pre>package.json</code>,我们使用一个工具<code v-pre>wsrun</code>，可以批量启动或者打包多个应用</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"module-federation"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"模块联邦demo测试"</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
  <span class="token property">"private"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"workspaces"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"packages/*"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"wsrun --parallel start"</span><span class="token punctuation">,</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"yarn workspaces run build"</span><span class="token punctuation">,</span>
    <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"wsrun --parallel dev"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">"maicFir"</span><span class="token punctuation">,</span>
  <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"ISC"</span><span class="token punctuation">,</span>
  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"wsrun"</span><span class="token operator">:</span> <span class="token string">"^5.2.4"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>application-a</code>应用中，我们主要看下以下几个文件</p>
<ul>
<li>package.json</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"application_a"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"webpack server --port=8081 --open"</span><span class="token punctuation">,</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"webpack"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"ISC"</span><span class="token punctuation">,</span>
  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"@babel/core"</span><span class="token operator">:</span> <span class="token string">"^7.18.2"</span><span class="token punctuation">,</span>
    <span class="token property">"@babel/preset-env"</span><span class="token operator">:</span> <span class="token string">"^7.18.2"</span><span class="token punctuation">,</span>
    <span class="token property">"@babel/preset-react"</span><span class="token operator">:</span> <span class="token string">"^7.17.12"</span><span class="token punctuation">,</span>
    <span class="token property">"babel-loader"</span><span class="token operator">:</span> <span class="token string">"^8.2.5"</span><span class="token punctuation">,</span>
    <span class="token property">"html-webpack-plugin"</span><span class="token operator">:</span> <span class="token string">"^5.5.0"</span><span class="token punctuation">,</span>
    <span class="token property">"webpack"</span><span class="token operator">:</span> <span class="token string">"^5.73.0"</span><span class="token punctuation">,</span>
    <span class="token property">"webpack-cli"</span><span class="token operator">:</span> <span class="token string">"^4.10.0"</span><span class="token punctuation">,</span>
    <span class="token property">"webpack-dev-server"</span><span class="token operator">:</span> <span class="token string">"^4.9.3"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"react"</span><span class="token operator">:</span> <span class="token string">"^18.2.0"</span><span class="token punctuation">,</span>
    <span class="token property">"react-dom"</span><span class="token operator">:</span> <span class="token string">"^18.2.0"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>webpack.config.js</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// application-a/webpack.config.js</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 引入moduleFed插件</span>
<span class="token keyword">const</span> ModuleFederationPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack/lib/container/ModuleFederationPlugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> dependencies <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./package.json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'development'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./index.js'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[name].bundle.js'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.jsx'</span><span class="token punctuation">,</span> <span class="token string">'.js'</span><span class="token punctuation">,</span> <span class="token string">'.json'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(js|jsx)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'babel-loader'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@babel/env'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">ModuleFederationPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'application_a'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'var'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'application_a'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 另外一个应用html中引入的模块联邦入口文件</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'remoteEntry.js'</span><span class="token punctuation">,</span>
      <span class="token comment">// 选择暴露当前应用需要给外部使用的组件，供其他应用使用</span>
      <span class="token literal-property property">exposes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'./Example'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example'</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 这里是选择关联其他应用的组件</span>
      <span class="token literal-property property">remotes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">application_b</span><span class="token operator">:</span> <span class="token string">'application_b'</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// react react-dom会独立分包加载</span>
      <span class="token literal-property property">shared</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>dependencies<span class="token punctuation">,</span>
        <span class="token literal-property property">react</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">singleton</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">requiredVersion</span><span class="token operator">:</span> dependencies<span class="token punctuation">[</span><span class="token string">'react'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string-property property">'react-dom'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">singleton</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">requiredVersion</span><span class="token operator">:</span> dependencies<span class="token punctuation">[</span><span class="token string">'react-dom'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// shared: ['react', 'react-dom'], 这样会error</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'./public/index.html'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 热加载</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>HotModuleReplacementPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在看下入口<code v-pre>entry</code>文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// application-a/index.js</span>
<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./src/app.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>app.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// application-a/src/app.js</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRoot <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-dom/client'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.jsx'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> appDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> root <span class="token operator">=</span> <span class="token function">createRoot</span><span class="token punctuation">(</span>appDom<span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>App.jsx</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// application-a/src/App.jsx</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token comment">// 引入application_b应用的Example，Example2组件</span>
<span class="token comment">// import Example1 from 'application_b/Example';</span>
<span class="token comment">// import Example2 from 'application_b/Example2';</span>
<span class="token comment">//or</span>
<span class="token keyword">const</span> Example1 <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'application_b/Example'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Example2 <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'application_b/Example2'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token keyword">this</span> is applicatin a<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
      <span class="token operator">&lt;</span>Example1 <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>Example2 <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Example.jsx</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// application-a/src/compments/Example.jsx</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Example1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>我是<span class="token constant">A</span>应用的一个组件<span class="token operator">-</span>example1<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此我们<code v-pre>application-a</code>这个项目已经 ok 了</p>
<p>我们再看下<code v-pre>application-b</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// application-b/webpack.config.js</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 引入moduleFederation</span>
<span class="token keyword">const</span> ModuleFederationPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack/lib/container/ModuleFederationPlugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> dependencies <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./package.json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'development'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./index.js'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[name].bundle.js'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(js|jsx)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'babel-loader'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@babel/env'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.jsx'</span><span class="token punctuation">,</span> <span class="token string">'.js'</span><span class="token punctuation">,</span> <span class="token string">'.json'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">ModuleFederationPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'application_b'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'var'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'application_b'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'remoteEntry.js'</span><span class="token punctuation">,</span>
      <span class="token comment">// 当前组件需要暴露出去的组件</span>
      <span class="token literal-property property">exposes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'./Example'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'./Example2'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example2'</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 关联需要引入的其他应用</span>
      <span class="token literal-property property">remotes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">application_a</span><span class="token operator">:</span> <span class="token string">'application_a'</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">shared</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>dependencies<span class="token punctuation">,</span>
        <span class="token literal-property property">react</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">singleton</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">requiredVersion</span><span class="token operator">:</span> dependencies<span class="token punctuation">[</span><span class="token string">'react'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string-property property">'react-dom'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">singleton</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">requiredVersion</span><span class="token operator">:</span> dependencies<span class="token punctuation">[</span><span class="token string">'react-dom'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// shared: ['react', 'react-dom'],</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'./public/index.html'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>HotModuleReplacementPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在<code v-pre>application-b/src/compments</code>新建了两个组件</p>
<p><code v-pre>Example</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Example</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>我是<span class="token constant">B</span>应用<span class="token operator">-</span>example1<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Example1</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Example2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>我是<span class="token constant">B</span>应用<span class="token operator">-</span>example2<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>webpack.config.js</code>中我们在<code v-pre>exposes</code>中导出了，这样能给其他应用使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token operator">...</span>
 <span class="token literal-property property">plugin</span><span class="token operator">:</span> <span class="token punctuation">[</span>
     <span class="token keyword">new</span> <span class="token class-name">ModuleFederationPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'application_b'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'var'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'application_b'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'remoteEntry.js'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">exposes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'./Example'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'./Example2'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example2'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
 <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在-html-中引入remoteentry-js" tabindex="-1"><a class="header-anchor" href="#在-html-中引入remoteentry-js" aria-hidden="true">#</a> 在 html 中引入<code v-pre>remoteEntry.js</code></h3>
<p>由于我需要在<code v-pre>application-a</code>中使用<code v-pre>application-b</code>暴露出来的组件</p>
<p>因此我需要在<code v-pre>application-a</code>的模版页面中引入</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!--application-a/public/index.html--></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>application-a<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://localhost:8082/remoteEntry.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我需要在<code v-pre>application-b</code>中需要<code v-pre>application-a</code>中的组件，同样需要引入</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!--application-b/public/index.html--></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>application-b<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://localhost:8081/remoteEntry.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在根目录下执行<code v-pre>npm run start</code>,注意子应用里面的名字也必须是<code v-pre>start</code>，相当于批量开启应用</p>
<p><code v-pre>application-a</code>
<img src="https://files.mdnice.com/user/24614/118d587d-259f-4e12-8b1e-b21b7e61afe6.png" alt="">
<code v-pre>application-b</code>
<img src="https://files.mdnice.com/user/24614/19633585-bc10-47c9-8e02-7aaee7e18b23.png" alt="">
至此你会发现<code v-pre>application-a</code>需要<code v-pre>application-b</code>应用的两个组件就已经无缝的应用到了自己应用中去</p>
<p><img src="https://img.soogif.com/OmNbmhoolR9PrLGEKVnFJHocOothsgmo.gif?scope=mdnice" alt=""></p>
<p>我们会发现，在<code v-pre>application-a</code>应用共享出来的模块，在<code v-pre>application-b</code>中的要提前在<code v-pre>html</code>中下载引入。</p>
<h3 id="注意的一些问题" tabindex="-1"><a class="header-anchor" href="#注意的一些问题" aria-hidden="true">#</a> 注意的一些问题</h3>
<ul>
<li>exposes 使用错误</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// error</span>
 <span class="token literal-property property">exposes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token string-property property">'Example'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example'</span><span class="token punctuation">,</span>
 <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样会导致在<code v-pre>application-a</code>中的 Example`无法使用
<img src="https://files.mdnice.com/user/24614/ad9ec06d-d0b2-48fc-91f0-f7140774792d.png" alt="">
正确的做法是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token literal-property property">exposes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token string-property property">'./Example'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example'</span><span class="token punctuation">,</span>
   <span class="token comment">/*
   './App': './src/App' // 这样会报错，另外一个应用引入会报错
   */</span>
 <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外<code v-pre>exposes</code>只能暴露内部<code v-pre>jsx</code>的组件，不能是<code v-pre>js</code>文件，不能是整个<code v-pre>App.jsx</code>应用。主要是<code v-pre>App.jsx</code>有引用<code v-pre>application-a</code>的引用</p>
<p>如果<code v-pre>application-b</code>中,<code v-pre>App.jsx</code>改成以下</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span><span class="token plain-text">hello application B</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么此时我可以把整个<code v-pre>application-b</code>应用当成组件在<code v-pre>application-a</code>中使用，但是得把当前应用暴露出去</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// application-b/webpack.config.js</span>
  <span class="token literal-property property">exposes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'./Example'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'./Example2'</span><span class="token operator">:</span> <span class="token string">'./src/compments/Example2'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'./App'</span><span class="token operator">:</span> <span class="token string">'./src/App'</span>
 <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>application-a</code>的<code v-pre>App.jsx</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// application-a/src/App.jsx</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token comment">// import Example1 from 'application_b/Example';</span>
<span class="token comment">// import Example2 from 'application_b/Example2';</span>
<span class="token comment">// or</span>
<span class="token keyword">const</span> Example1 <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'application_b/Example'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Example2 <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'application_b/Example2'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> AppFromB <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'application_b/App'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token keyword">this</span> is applicatin a<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
      <span class="token operator">&lt;</span>Example1 <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>Example2 <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>p<span class="token operator">></span>下面是从另外一个应用动态加载过来的<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
      <span class="token operator">&lt;</span>AppFromB<span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>AppFromB<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/fe6daf09-b933-4561-87b6-386a93510ce6.png" alt="">
握草，真是感叹，MDF 真的是太强了，这不是妥妥的可以替代传统的那种<code v-pre>iframe</code>嵌套另外一个独立的项目
<img src="https://img.soogif.com/u4XEAQp4SjtDyWEL9RTUqYeSED1qLra6.gif?scope=mdnice" alt=""></p>
<ul>
<li>shared 提示版本问题</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token literal-property property">shared</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'react'</span><span class="token punctuation">,</span> <span class="token string">'react-dom'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/3bbdddcf-4e69-424d-8d4f-9f690e3547fa.png" alt=""></p>
<p>正确做法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> dependencies <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./package.json"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
<span class="token literal-property property">shared</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>dependencies<span class="token punctuation">,</span>
  <span class="token literal-property property">react</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">singleton</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">requiredVersion</span><span class="token operator">:</span> dependencies<span class="token punctuation">[</span><span class="token string">"react"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">"react-dom"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">singleton</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">requiredVersion</span><span class="token operator">:</span> dependencies<span class="token punctuation">[</span><span class="token string">"react-dom"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外推荐几篇关于<code v-pre>MDF</code>的参考资料以及文章</p>
<ul>
<li><a href="https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5.md" title="ModuleFederationWebpack5" target="_blank" rel="noopener noreferrer">ModuleFederationWebpack5<ExternalLinkIcon/></a></li>
<li><a href="https://betterprogramming.pub/how-to-use-webpack-module-federation-in-react-70455086b2b0" title="how-to-use-webpack-module-federation" target="_blank" rel="noopener noreferrer">how-to-use-webpack-module-federation<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/module-federation/module-federation-examples" title="module-federation-examples" target="_blank" rel="noopener noreferrer">module-federation-examples<ExternalLinkIcon/></a></li>
<li><a href="https://federated-libraries.vercel.app/get-started" title="federated-libraries" target="_blank" rel="noopener noreferrer">federated-libraries<ExternalLinkIcon/></a></li>
</ul>
<p>喝水不忘挖井人，参照官网以及以上一些资料，经本地不断的测试，终于了解<code v-pre>webpack5 MDF</code>的一些使用场景以及它在具体业务使用的可能性，更多关于 MDF 信息参考<a href="https://webpack.docschina.org/plugins/module-federation-plugin/" title="官方文档" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>了解<code v-pre>module federation</code>，官方解释就是<code v-pre>模块联邦</code>,主要依赖内部 webpack 提供的一个插件<code v-pre>ModuleFederationPlugin</code>,可以将内部的组件共享给其他应用使用</p>
</li>
<li>
<p><code v-pre>MDF</code>解决了什么样的问题，允许一个应用 A 加载另外一个应用 B,并且依赖共享，两个独立的应用之间互不影响</p>
</li>
<li>
<p>写了一个例子，进一步理解<code v-pre>MDF</code></p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/webpack/webpack-14-module-federation" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
