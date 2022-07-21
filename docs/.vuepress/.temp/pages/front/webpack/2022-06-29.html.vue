<template><div><p>为组内实现一个私有通用的组件库，解放重复劳动力，提高效率，让你的代码被更多小伙伴使用。</p>
<p>本文是笔者总结的一篇关于构建组件库的一些经验和思考，希望在项目中有所帮助。</p>
<p>正文开始...</p>
<h3 id="初始化一个基础项目" tabindex="-1"><a class="header-anchor" href="#初始化一个基础项目" aria-hidden="true">#</a> 初始化一个基础项目</h3>
<p>生成基础<code v-pre>package.json</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm init <span class="token operator">-</span>y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装项目指定需要的插件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i webpack webpack<span class="token operator">-</span>cli html<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin @babel<span class="token operator">/</span>core @babel<span class="token operator">/</span>cli @babel<span class="token operator">/</span>preset<span class="token operator">-</span>env webpack<span class="token operator">-</span>dev<span class="token operator">-</span>server <span class="token operator">--</span>save<span class="token operator">-</span>dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>webpack</code>官方支持<code v-pre>ts</code>编写配置环境，不过需要安装几个插件支持，参考官网<a href="https://webpack.docschina.org/configuration/configuration-languages/#typescript" title="configuration-languages" target="_blank" rel="noopener noreferrer">configuration-languages<ExternalLinkIcon/></a>，我们今天使用<code v-pre>ts</code>配置<code v-pre>webpack</code>。</p>
<h3 id="配置支持配置文件-ts" tabindex="-1"><a class="header-anchor" href="#配置支持配置文件-ts" aria-hidden="true">#</a> 配置支持配置文件 ts</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev typescript ts<span class="token operator">-</span>node @types<span class="token operator">/</span>node @types<span class="token operator">/</span>webpack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改<code v-pre>tsconfig.json</code></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     ...
    <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"commonjs"</span><span class="token punctuation">,</span>
    <span class="token property">"target"</span><span class="token operator">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>
    ...
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>.eslintrc.js</code>中的相关配置，配置<code v-pre>env.node:true</code>,具体参考如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'eslint:recommended'</span><span class="token punctuation">,</span> <span class="token string">'plugin:@typescript-eslint/recommended'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">'@typescript-eslint/parser'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">'latest'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">'module'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@typescript-eslint'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'@typescript-eslint/no-var-requires'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'@typescript-eslint/no-non-null-assertion'</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在根<code v-pre>config</code>目录新建<code v-pre>webpack.common.ts</code>、<code v-pre>webpack.dev.ts</code>、<code v-pre>webpack.prod.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// webpack.common.ts</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> path <span class="token keyword">from</span> <span class="token string">'path'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> webpack <span class="token keyword">from</span> <span class="token string">'webpack'</span><span class="token punctuation">;</span>
<span class="token comment">// 配置devServer</span>
<span class="token keyword">import</span> <span class="token string">'webpack-dev-server'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> configCommon<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token punctuation">{</span>
  entry<span class="token operator">:</span> <span class="token punctuation">{</span>
    app<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../src/index.ts'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    path<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../dist'</span><span class="token punctuation">)</span>
    <span class="token comment">// clean: true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'babel-loader'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        exclude<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.ts(x?)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">'babel-loader'</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            loader<span class="token operator">:</span> <span class="token string">'ts-loader'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        exclude<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    extensions<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.tsx'</span><span class="token punctuation">,</span> <span class="token string">'.ts'</span><span class="token punctuation">,</span> <span class="token string">'.js'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  devServer<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      directory<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../example'</span><span class="token punctuation">)</span> <span class="token comment">// 修改默认静态服务访问public目录</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> configCommon<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>webpack.dev.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// config/webpack.dev.ts</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> path <span class="token keyword">from</span> <span class="token string">'path'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> webpack <span class="token keyword">from</span> <span class="token string">'webpack'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> merge <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'webpack-merge'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlWebpackPlguin <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> webpackCommon <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'./webpack.common'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> devConfig<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>webpackCommon<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  devtool<span class="token operator">:</span> <span class="token string">'inline-source-map'</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlguin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      inject<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      filename<span class="token operator">:</span> <span class="token string">'index.html'</span><span class="token punctuation">,</span> <span class="token comment">// 只能是文件名，不能是xxx/index.html 会造成页面模版加载ejs解析错误</span>
      template<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../example/index.html'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      title<span class="token operator">:</span> <span class="token string">'example'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> devConfig<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>webpack.prod.ts</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.prod.ts</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> merge <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-merge'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> webpack <span class="token keyword">from</span> <span class="token string">'webpack'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> commonConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./webpack.common'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token literal-property property">prodConfig</span><span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>commonConfig<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'production'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> prodConfig<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在根目录下创建<code v-pre>webpack.config.ts</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.ts</span>
type PlainObj <span class="token operator">=</span> Record<span class="token operator">&lt;</span>string<span class="token punctuation">,</span> any<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> devConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./config/webpack.dev'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> prdConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./config/webpack.prod'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">env</span><span class="token operator">:</span> PlainObj<span class="token punctuation">,</span> <span class="token literal-property property">argv</span><span class="token operator">:</span> PlainObj</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 开发环境 argv会获取package.json中设置--mode的值</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>argv<span class="token punctuation">.</span>mode <span class="token operator">===</span> <span class="token string">'development'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> devConfig<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> prdConfig<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>package.json</code>中</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token string-property property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"start"</span><span class="token operator">:</span> <span class="token string">"webpack serve --mode development"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"build"</span><span class="token operator">:</span> <span class="token string">"webpack --mode production"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行<code v-pre>npm run start</code>
<img src="https://files.mdnice.com/user/24614/92732490-132c-4a9f-a88f-76f457ffe48e.png" alt=""></p>
<p>我们看下<code v-pre>src/index.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> domApp <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">11122</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
domApp<span class="token operator">!</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">'hello word'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上所有的这些基本都是为了支持<code v-pre>ts</code>环境，还有支持<code v-pre>ts</code>可配置<code v-pre>webpack</code>环境</p>
<p>现在我们试图将一些通用的工具函数贡献给其他小伙伴用了。</p>
<p>在<code v-pre>src</code>新建其他工具函数，例如在之前我们所用到的<code v-pre>timerChunk</code>分时函数</p>
<p><code v-pre>timerChunk.ts</code>分时函数</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// timerChunk.ts</span>
<span class="token comment">// 分时函数</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span>sourceArr<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token function-variable function">callback</span><span class="token operator">:</span> <span class="token punctuation">(</span>args<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">,</span> count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> wait <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> ret<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span>
    timer<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">renderData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>count<span class="token punctuation">,</span> sourceArr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 取出数据</span>
      ret <span class="token operator">=</span> sourceArr<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">callback</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 利用定时器每隔200ms取出数据</span>
      timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果数据取完了，就清空定时器</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>sourceArr<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
          ret <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">renderData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>memorize</code>缓存函数</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// src/memorize.ts</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@desption</span> 缓存函数
 * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> callback
 * <span class="token keyword">@returns</span>
 */</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">memorize</span> <span class="token operator">=</span> <span class="token punctuation">(</span>callback<span class="token operator">:</span> callBack<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> cache <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> result<span class="token operator">:</span> <span class="token builtin">unknown</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果缓存标识存在，则直接返回缓存的结果</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 将执行的回调函数赋值给结果</span>
      result <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 把缓存开关打开</span>
      cache <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token comment">// 清除传入的回调函数</span>
      callback <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>isType.ts</code>检测数据类型</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@desption</span> 判断基础数据类型以及引用数据类型，替代typeof
 * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> val
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">isType</span> <span class="token operator">=</span> <span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> object <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>type<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[object </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">type</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>formateUrl.ts</code>获取<code v-pre>url</code>参数</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isType <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./isType'</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@desption</span> 将url参数转换成对象
 * <span class="token keyword">@param</span> <span class="token parameter">params</span>
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">formateUrl</span> <span class="token operator">=</span> <span class="token punctuation">(</span>params<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'String'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^http(s)?</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">URL</span></span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 将参数转换成http://localhost:8080?a=1&amp;b=2   -> {a:1,b:2}</span>
      <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">fromEntries</span><span class="token punctuation">(</span>url<span class="token punctuation">.</span>searchParams<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// params如果为a=1&amp;b=2,则转换成{a:1,b:2}</span>
    <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">fromEntries</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>lazyFunction.ts</code>懒加载函数</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> memorize <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./memorize'</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@desption</span> 懒加载可执行函数
 * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> factory
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">lazyFunction</span> <span class="token operator">=</span> <span class="token punctuation">(</span>factory<span class="token operator">:</span> callBack<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> fac<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token function">memorize</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">fac</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> f<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>hasOwn.ts</code>判断一个对象的属性是否存在</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> has <span class="token operator">=</span> Reflect<span class="token punctuation">.</span>has<span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">hasOwn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>obj<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">has</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> hasOwn <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>mergeDeep.ts</code>深拷贝对象</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isType <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./isType'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> memorize <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./memorize'</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@desption</span> 深拷贝一个对象
 * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> obj
 * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> targets
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">mergeDeep</span> <span class="token operator">=</span> <span class="token punctuation">(</span>obj<span class="token operator">:</span> object<span class="token punctuation">,</span> targets<span class="token operator">:</span> object<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> descriptors <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptors</span><span class="token punctuation">(</span>targets<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// todo 针对不同的数据类型做value处理</span>
  <span class="token keyword">const</span> <span class="token function-variable function">helpFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'String'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Object'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Array'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> ret<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token comment">// todo 辅助函数，递归数组内部, 这里递归可以考虑用分时函数来代替优化</span>
      <span class="token keyword">const</span> <span class="token function-variable function">loopFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>curentVal<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        curentVal<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Object'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">helpFn</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Array'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">loopFn</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token function">loopFn</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> name <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>descriptors<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// todo 根据name取出对象属性的每个descriptor</span>
    <span class="token keyword">const</span> descriptor <span class="token operator">=</span> descriptors<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>descriptor<span class="token punctuation">.</span>get<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> fn <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>get<span class="token punctuation">;</span>
      Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> name<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        configurable<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        enumerable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        writable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        get<span class="token operator">:</span> <span class="token function">memorize</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span> <span class="token comment">// 参考https://github.com/webpack/webpack/blob/main/lib/index.js</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> name<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        value<span class="token operator">:</span> <span class="token function">helpFn</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span>
        writable<span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在<code v-pre>src</code>中创建了以上所有的工具函数</p>
<p>我们在<code v-pre>src/index.ts</code>将上面所有的工具函数导入</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// const domApp = document.getElementById('app');</span>
<span class="token comment">// console.log(11122);</span>
<span class="token comment">// domApp!.innerHTML = 'hello word';</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'./memorize'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'./lazyFunction'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'./hasOwn'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'./getOrigin'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'./formateUrl'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'./mergeDeep'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'./isType'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在需要打包不同环境的<code v-pre>lib</code>,通用就是<code v-pre>umd</code>,<code v-pre>cjs</code>,<code v-pre>esm</code>这三种方式</p>
<p>主要要是修改下<code v-pre>webpack.config.output</code>的<code v-pre>library.type</code>,参考官方<a href="https://webpack.docschina.org/configuration/output/#outputlibrary" title="outputlibrary" target="_blank" rel="noopener noreferrer">outputlibrary<ExternalLinkIcon/></a></p>
<p>我们在<code v-pre>config</code>目录下新建一个<code v-pre>webpack.target.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> webpack <span class="token keyword">from</span> <span class="token string">'webpack'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> prdConfig <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'./webpack.prod'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> name <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'../package.json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">enum</span> <span class="token constant">LIBARY_TARGET</span> <span class="token punctuation">{</span>
  umd <span class="token operator">=</span> <span class="token string">'umd'</span><span class="token punctuation">,</span>
  cjs <span class="token operator">=</span> <span class="token string">'cjs'</span><span class="token punctuation">,</span>
  esm <span class="token operator">=</span> <span class="token string">'esm'</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> targetUMD<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>prdConfig<span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>prdConfig<span class="token punctuation">.</span>output<span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">'umd/index.js'</span><span class="token punctuation">,</span>
    library<span class="token operator">:</span> <span class="token punctuation">{</span>
      name<span class="token punctuation">,</span>
      type<span class="token operator">:</span> <span class="token string">'umd'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> targetCJS<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>prdConfig<span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>prdConfig<span class="token punctuation">.</span>output<span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">'cjs/index.js'</span><span class="token punctuation">,</span>
    library<span class="token operator">:</span> <span class="token punctuation">{</span>
      name<span class="token punctuation">,</span>
      type<span class="token operator">:</span> <span class="token string">'commonjs'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> targetESM<span class="token operator">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>prdConfig<span class="token punctuation">,</span>
  experiments<span class="token operator">:</span> <span class="token punctuation">{</span>
    outputModule<span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>prdConfig<span class="token punctuation">.</span>output<span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">'esm/index.js'</span><span class="token punctuation">,</span>
    library<span class="token operator">:</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">'module'</span><span class="token punctuation">,</span>
      <span class="token keyword">export</span><span class="token operator">:</span> <span class="token string">'default'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> libraryTargetConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token constant">LIBARY_TARGET</span><span class="token punctuation">.</span>umd<span class="token punctuation">,</span> targetUMD<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token constant">LIBARY_TARGET</span><span class="token punctuation">.</span>cjs<span class="token punctuation">,</span> targetCJS<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token constant">LIBARY_TARGET</span><span class="token punctuation">.</span>esm<span class="token punctuation">,</span> targetESM<span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> libraryTargetConfig<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>webpack.config.ts</code>引入<code v-pre>webpack.target.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// webpack.config.ts</span>
<span class="token keyword">type</span> <span class="token class-name">PlainObj</span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> devConfig <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'./config/webpack.dev'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> libraryTargetConfig <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'./config/webpack.target'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span>env<span class="token operator">:</span> PlainObj<span class="token punctuation">,</span> argv<span class="token operator">:</span> PlainObj<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 开发环境 argv会获取package.json中设置--mode的值</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>argv<span class="token punctuation">.</span>mode <span class="token operator">===</span> <span class="token string">'development'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> devConfig<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> libraryTargetConfig<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>argv<span class="token punctuation">.</span>env<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token operator">?</span> libraryTargetConfig<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>argv<span class="token punctuation">.</span>env<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token operator">:</span> libraryTargetConfig<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'umd'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们在<code v-pre>package.json</code>中配置不同模式打包</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code> <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"webpack serve --mode development"</span><span class="token punctuation">,</span>
    <span class="token property">"build:umd"</span><span class="token operator">:</span> <span class="token string">"webpack --mode production --env target=umd"</span><span class="token punctuation">,</span>
    <span class="token property">"build:esm"</span><span class="token operator">:</span> <span class="token string">"webpack --mode production --env target=esm"</span><span class="token punctuation">,</span>
    <span class="token property">"build:cjs"</span><span class="token operator">:</span> <span class="token string">"webpack --mode production --env target=cjs"</span><span class="token punctuation">,</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"npm run build:umd &amp;&amp; npm run build:esm &amp;&amp; npm run build:cjs"</span>

  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们依次执行<code v-pre>npm run build</code></p>
<p><img src="https://files.mdnice.com/user/24614/47df5bff-313d-430a-822a-3b727bd92093.png" alt="">
在<code v-pre>example</code>目录下新建测试<code v-pre>index.ts</code>，同时记得修改<code v-pre>webpack.dev.ts</code>的<code v-pre>entry</code>入口文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// example/index.ts</span>
<span class="token comment">// ok</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> nice_utils <span class="token keyword">from</span> <span class="token string">'../src/index'</span><span class="token punctuation">;</span>
<span class="token comment">// umd</span>
<span class="token comment">// const nice_utils = require('../dist/umd/index.js');</span>
<span class="token comment">// cjs</span>
<span class="token comment">// const { nice_utils } = require('../dist/cjs/index.js');</span>
<span class="token comment">// esm error</span>
<span class="token comment">// import nice_utils from '../dist/esm/index.js';</span>

<span class="token keyword">const</span> appDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
appDom<span class="token operator">!</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">'hello, 欢迎关注公众号：Web技术学苑，好好学习，天天向上!'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nice_utils<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'formateUrl:'</span><span class="token punctuation">,</span> nice_utils<span class="token punctuation">.</span><span class="token function">formateUrl</span><span class="token punctuation">(</span><span class="token string">'http://www.example.com?name=Maic&amp;age=18'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hasOwn:'</span><span class="token punctuation">,</span> nice_utils<span class="token punctuation">.</span><span class="token function">hasOwn</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">publictext</span><span class="token operator">:</span> <span class="token string">'Web技术学苑'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'publictext'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'isType:'</span><span class="token punctuation">,</span> nice_utils<span class="token punctuation">.</span><span class="token function">isType</span><span class="token punctuation">(</span><span class="token string">'Web技术学苑'</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'String'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们运行<code v-pre>npm run start</code>,测试运行下<code v-pre>example</code>是否<code v-pre>ok</code>
<img src="https://files.mdnice.com/user/24614/4b0e462c-5e25-4748-9817-13f223f508b4.png" alt=""></p>
<p>我发现<code v-pre>esm</code>打包出来的居然用不了，这就很坑了，难道是模块使用的问题？
<img src="https://img.soogif.com/2kVolGgyZRQOZAprxSzXn3GH9ssoNLK8.gif?scope=mdnice" alt=""></p>
<p>但是其他两种貌似是<code v-pre>ok</code>的</p>
<h3 id="npm-发布组件" tabindex="-1"><a class="header-anchor" href="#npm-发布组件" aria-hidden="true">#</a> npm 发布组件</h3>
<p>我们现在将这包发布到<code v-pre>npm</code>上吧</p>
<ul>
<li><code v-pre>npm run build</code></li>
</ul>
<p>生成<code v-pre>dist</code>包,并且修改<code v-pre>package.json</code>文件的<code v-pre>main</code>，指定到<code v-pre>dist/umd/index.js</code>下</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"@maicfir/nice_utils"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.4"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"一个好用的工具类库"</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"dist/umd/index.js"</span><span class="token punctuation">,</span>
  <span class="token property">"types"</span><span class="token operator">:</span> <span class="token string">"src/types/global.d.ts"</span><span class="token punctuation">,</span>
  ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>npm login</code></p>
<ul>
<li>输入自己<code v-pre>npm</code>账户和密码</li>
<li>输入自己密码后，需要输入邮箱，然后 npm 会给你邮箱发个<code v-pre>code</code>，把<code v-pre>code</code>输入即可</li>
</ul>
</li>
<li>
<p><code v-pre>npm publish</code></p>
</li>
<li>
<p>查看 npm 上是否成功，具体可以查看<a href="https://www.npmjs.com/package/@maicfir/nice_utils" target="_blank" rel="noopener noreferrer">nice_utils<ExternalLinkIcon/></a>
<img src="https://files.mdnice.com/user/24614/0b502648-704d-4133-a751-55bb8f44eb98.png" alt=""></p>
</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>利用<code v-pre>webpack5</code>配置打包<code v-pre>ts</code>环境，主要是让<code v-pre>webpack5</code>配置文件支持<code v-pre>ts</code></p>
</li>
<li>
<p>组织<code v-pre>webpack5</code>打包不同<code v-pre>library.type</code>,支持打包成不同<code v-pre>type</code>,<code v-pre>umd</code>,<code v-pre>cjs</code>,<code v-pre>ejs</code>三种类型</p>
</li>
<li>
<p>编写具体工具类函数</p>
</li>
<li>
<p>将自己写的工具类发布到<code v-pre>npm</code>或者私服上，让工具类变成通用工具代码</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/nice_utils" title="code-example" target="_blank" rel="noopener noreferrer">code-example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
