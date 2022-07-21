<template><div><p>在<code v-pre>webpack</code>中构建本地服务，最重要的一个插件<code v-pre>webpack-dev-server</code>,我们俗称<code v-pre>WDS</code>,它承担起了在开发环境<code v-pre>模块热加载</code>、<code v-pre>本地服务</code>、<code v-pre>接口代理</code>等非常重要的功能。</p>
<p>本文是笔者对<code v-pre>wds</code>的一些理解和认识，希望在项目中有所帮助。</p>
<p>正文开始...</p>
<p>在阅读本文之前，本文会大概从下几个方面去了解<code v-pre>wds</code></p>
<p>1、了解<code v-pre>wds</code>是什么</p>
<p>2、<code v-pre>wds</code>在 webpack 中如何使用</p>
<p>3、项目中使用<code v-pre>wds</code>是怎么样的</p>
<p>4、关于配置<code v-pre>devServer</code>的一些常用配置，代理等</p>
<p>5、<code v-pre>wds</code>如何实现模块热加载原理</p>
<h3 id="了解webpack-dev-server" tabindex="-1"><a class="header-anchor" href="#了解webpack-dev-server" aria-hidden="true">#</a> 了解<code v-pre>webpack-dev-server</code></h3>
<p>顾名思义，这是一个在<code v-pre>开发环境</code>下的使用的<code v-pre>本地服务</code>，它承担了一个提供前端静态服务的作用</p>
<p>首先我们快速搭建一个项目,创建一个项目<code v-pre>webpack-07-wds</code>执行<code v-pre>npm init -y</code>,然后安装基础支持的插件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i webpack webpack<span class="token operator">-</span>cli html<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin webpack<span class="token operator">-</span>dev<span class="token operator">-</span>server <span class="token operator">-</span><span class="token constant">D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个<code v-pre>webpack.config.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> htmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'js/[name].js'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">htmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'./public/index.html'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在根目录下创建<code v-pre>public</code>,新建<code v-pre>html</code>文件</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>webpack-for-dev-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在入口文件写入一段简单的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// index</span>
<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> appDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  appDom<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">'hello webpack for wds'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经准备好了内容，现在需要启动<code v-pre>wds</code>，因此我们需要在在<code v-pre>package.json</code>中启动服务</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"webpack server"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行<code v-pre>npm run start</code></p>
<p><img src="https://files.mdnice.com/user/24614/2a36ab68-179c-43cb-a70f-e074c9d0a634.png" alt=""></p>
<p>万事大吉，原来就是一行命令就可以了</p>
<p>但是这行命令的背后实际上有<code v-pre>webpack-cli</code>帮我们做了一下事情，实际上在<code v-pre>.bin</code>目录下，当你执行该命令时，<code v-pre>webpack</code>就会启用告知<code v-pre>webpack-dev-server</code>开启服务，通过<code v-pre>webpack</code>根据<code v-pre>webpack.config.js</code>的配置信息进行<code v-pre>compiler</code>,然后再交给<code v-pre>webpack-dev-server</code>处理</p>
<p>参考官方文档<a href="https://webpack.docschina.org/api/webpack-dev-server/" title="webpack-dev-server" target="_blank" rel="noopener noreferrer">webpack-dev-server<ExternalLinkIcon/></a></p>
<p>根目录新建<code v-pre>server.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// server.js</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> webpackDevServer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-dev-server'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./webpack.config.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// webpack处理入口配置相关文件</span>
<span class="token keyword">const</span> compiler <span class="token operator">=</span> <span class="token function">webpack</span><span class="token punctuation">(</span>webpackConfig<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// devServer的相关配置</span>
<span class="token keyword">const</span> devServerOption <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">8081</span><span class="token punctuation">,</span>
  <span class="token keyword">static</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">directory</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'public'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 开启gizps压缩public中的html</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">webpackDevServer</span><span class="token punctuation">(</span>devServerOption<span class="token punctuation">,</span> compiler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">startServer</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'server is start'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">await</span> server<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">startServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>终端执行<code v-pre>node server.js</code>或者在<code v-pre>package.json</code>中配置,执行<code v-pre>npm run server</code></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"webpack server"</span><span class="token punctuation">,</span>
    <span class="token property">"server"</span><span class="token operator">:</span> <span class="token string">"node ./server.js"</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开页面<code v-pre>http://localhost:8081</code>地址，发现是<code v-pre>ok</code>的</p>
<p>我们注意到可以使用<code v-pre>webpack server</code>启动服务，这个主要是<code v-pre>webpack-cli</code>的命令<a href="https://github.com/webpack/webpack-cli/blob/master/SERVE-OPTIONS-v4.md" title="server" target="_blank" rel="noopener noreferrer">server<ExternalLinkIcon/></a></p>
<p>关于在命令行中设置对应的环境，在以前项目中可能你会看到，<code v-pre>process.env.NODE_ENV</code>这样的设置</p>
<p>你可以在<code v-pre>cli</code>命令中配置,注意只能在最前面设置，不能像以下这种方式设置<s>webpack server NODE_ENV=test NODE_API=api</s>，不然会无效</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"NODE_ENV=test NODE_API=api webpack server"</span><span class="token punctuation">,</span>
    <span class="token property">"server"</span><span class="token operator">:</span> <span class="token string">"node ./server.js"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>webpack.config.js</code>中就可以看到设置的参数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> htmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'html-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span><span class="token punctuation">,</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_API</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// test api</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'development'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'js/[name].js'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">htmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'./public/index.html'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以设置<code v-pre>--node-env xxx</code>环境参数来指定环境变量</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code> <span class="token property">"start:test"</span><span class="token operator">:</span> <span class="token string">"webpack server --node-env test"</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>更多参数设置参考官方<a href="https://webpack.docschina.org/api/cli/" title="cli" target="_blank" rel="noopener noreferrer">cli<ExternalLinkIcon/></a></p>
<h3 id="wds-在-webpack-中的使用" tabindex="-1"><a class="header-anchor" href="#wds-在-webpack-中的使用" aria-hidden="true">#</a> wds 在 webpack 中的使用</h3>
<p>我们上述是用一个<code v-pre>server.js</code>，通过命令行方式，调用<code v-pre>webpack-dev-server</code>API 方式去启动一个本地的静态服务，但是实际上，在<code v-pre>webpack</code>中直接在配置<a href="https://webpack.docschina.org/configuration/dev-server/" title="devServer" target="_blank" rel="noopener noreferrer">devServer<ExternalLinkIcon/></a>接口中配置就行。</p>
<p>了解几个常用的配置</p>
<ul>
<li><code v-pre>port</code> 指定端口打开页面</li>
<li><code v-pre>client</code>
<ul>
<li>overlay 当程序错误时，浏览器页面全屏警告</li>
<li>webSocketURL 允许指定 websocket 服务器</li>
</ul>
</li>
<li><code v-pre>progress</code> 启动开发环境 gizp 压缩静态 html</li>
<li><code v-pre>historyApiFallback</code> 当使用路由模式为 history 时，必须设置这个，要不然前端刷新直接 404 页面</li>
<li><code v-pre>hot</code>模块热加载，需要结合<code v-pre>module.hot.accept('xxx/xxx')</code>指定某个模块热加载<a href="https://webpack.docschina.org/api/hot-module-replacement/" target="_blank" rel="noopener noreferrer">module.hot.accept<ExternalLinkIcon/></a></li>
<li>open 当我们启动本地服务时，自动打开指定配置端口的浏览器</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token string">'9000'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">client</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">progress</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 启用gizp</span>
      <span class="token literal-property property">overlay</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">errors</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 如果有错误会有蒙层</span>
        <span class="token literal-property property">warnings</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">webSocketURL</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">hostname</span><span class="token operator">:</span> <span class="token string">'0.0.0.0'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">pathname</span><span class="token operator">:</span> <span class="token string">'/ws'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">8080</span><span class="token punctuation">,</span>
        <span class="token literal-property property">protocol</span><span class="token operator">:</span> <span class="token string">'ws'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">historyApiFallback</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 使用路由模式为history时，必须设置这个，要不然前端刷新会直接404页面</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 模块热加载，对应模块须配合module.hot.accept('xxx/xxx.js')指定模块热加载</span>
    <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 当服务启动时默认自动直接打开浏览器，可以指定打开哪个页面</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> proxy</h3>
<p><code v-pre>proxy</code> 这是项目中接触最多一点，也是初学者配置代理时常最令人头疼的事情，实际上<code v-pre>proxy</code>本质就是将本地的<code v-pre>接口路由前缀</code>代理到目标服务器环境,可以同时代理多个不同环境,具体参考以下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/j'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://movie.douban.com'</span><span class="token punctuation">,</span> <span class="token comment">// 代理豆瓣</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string-property property">'/cmc'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://apps.game.qq.com'</span><span class="token punctuation">,</span> <span class="token comment">// 代理王者荣耀官网</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 必须要加，否则代理接口直接返回html</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">'^/cmc'</span><span class="token operator">:</span> <span class="token string">'/cmc'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们修改<code v-pre>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">$</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> appDomMovie <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'movie'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> gameDom <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'wang'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// appDom.innerHTML = 'hello webpack for wds,';</span>
  <span class="token comment">// https://movie.douban.com/j/new_search_subjects?sort=U&amp;range=0,10&amp;tags=%E7%94%B5%E5%BD%B1&amp;start=0</span>
  <span class="token comment">// 豆瓣电影</span>
  <span class="token keyword">const</span> <span class="token function-variable function">featchMovie</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'/j/new_search_subjects?sort=U&amp;range=0,10&amp;tags=%E7%94%B5%E5%BD%B1&amp;start=0'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// console.log(data)</span>
    <span class="token keyword">const</span> divDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> title<span class="token punctuation">,</span> rate <span class="token punctuation">}</span> <span class="token operator">=</span> item<span class="token punctuation">;</span>
      str <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string"> &lt;span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>rate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    divDom<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> str<span class="token punctuation">;</span>
    appDomMovie<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>divDom<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">featchMovie</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">wangzherongyao</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> divDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// https://apps.game.qq.com/cmc/cross?serviceId=18&amp;filter=tag&amp;sortby=sIdxTime&amp;source=web_pc&amp;limit=20&amp;logic=or&amp;typeids=1%2C2&amp;exclusiveChannel=4&amp;exclusiveChannelSign=8a28b7e82d30142c1a986bb7acdcc068&amp;time=1655732988&amp;tagids=931</span>
    <span class="token comment">// 王者荣耀官网</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token punctuation">(</span>
      <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>
        <span class="token string">'/cmc/cross?serviceId=18&amp;filter=tag&amp;sortby=sIdxTime&amp;source=web_pc&amp;limit=20&amp;logic=or&amp;typeids=1%2C2&amp;exclusiveChannel=4&amp;exclusiveChannelSign=8a28b7e82d30142c1a986bb7acdcc068&amp;time=1655732988&amp;tagids=931'</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span><span class="token punctuation">;</span>
    items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> sTitle<span class="token punctuation">,</span> sIMG <span class="token punctuation">}</span> <span class="token operator">=</span> item<span class="token punctuation">;</span>
      str <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;div>
          &lt;img src=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>sIMG<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> />
          &lt;div></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>sTitle<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div>
      &lt;/div></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    divDom<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> str<span class="token punctuation">;</span>
    gameDom<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>divDom<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">wangzherongyao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/866fd77d-f174-45f2-a119-e8235b5aae70.png" alt="">
对应的两个接口数据就已经在页面上渲染出来了</p>
<p>对于代理我们会常常容易会犯以下<code v-pre>几个误区</code></p>
<ul>
<li>第一种, 多个接口代理，第一个直接以<code v-pre>/</code>代理，这会造成第二个代理无效，接口直接 404，优先级会先匹配第一个</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
 <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://movie.douban.com'</span><span class="token punctuation">,</span> <span class="token comment">// 代理豆瓣</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string-property property">'/cmc'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://apps.game.qq.com'</span><span class="token punctuation">,</span> <span class="token comment">// 代理王者荣耀官网</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 必须要加，否则代理接口直接返回html</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">'^/cmc'</span><span class="token operator">:</span> <span class="token string">'/cmc'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>第二种，<code v-pre>pathRewrite</code>要不要加，什么时候该加，不知道你发现没有我第一个接口拦截并没有加<code v-pre>pathRewrite</code>，但是和第二个加了效果是一样的。</li>
</ul>
<p>现在有一个场景，就是你本地测试服务接口与线上接口是有区别的，一般你在本地开发是联调环境，后端的接口不按照常理出牌，假设联调环境后端就是死活不同意统一接口路径怎么办？</p>
<p>现在假设后端接口</p>
<p>联调环境:<code v-pre>/dev/api/cmc/cross</code></p>
<p>线上环境是<code v-pre>/api/cmc/cross</code></p>
<p>于是你想到有以下两种方案：</p>
<p>1、在 axios 请求拦截根据<code v-pre>环境变量</code>手动添加前缀,但是这不是一种很好的方案，相当于把不确定性的逻辑代码打包到线上去了，有一定风险</p>
<p>2、不管开发环境还是本地联调环境都是统一的路径，仅仅只是在<code v-pre>proxy</code>的<code v-pre>pathRewrite</code>做处理，这样风险很小，不容易造成线上接口 404 风险</p>
<p>于是这时候<code v-pre>pathRewrite</code>的作用就来了,重写路径，注意是<code v-pre>pathRewrite: { '^/cmc': '/dev/cmc' }</code></p>
<p>我们仅仅是在开发环境重新了<code v-pre>/cmc</code>接口路径，实际上代码环境的代码并不会打包到线上</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token punctuation">{</span>
 <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/j'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://movie.douban.com'</span><span class="token punctuation">,</span> <span class="token comment">// 代理豆瓣</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string-property property">'/cmc'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://apps.game.qq.com'</span><span class="token punctuation">,</span> <span class="token comment">// 代理王者荣耀官网</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 必须要加，否则代理接口直接返回html</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">'^/cmc'</span><span class="token operator">:</span> <span class="token string">'/dev/cmc'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>第三种，缺少<code v-pre>changeOrigin:true</code>，像下面这种丢失了<code v-pre>changeOrigin</code>是不行的</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/j'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://movie.douban.com'</span><span class="token punctuation">,</span> <span class="token comment">// 代理豆瓣</span>
        <span class="token comment">// changeOrigin: true,</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">'^/j'</span><span class="token operator">:</span> <span class="token string">'/j'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string-property property">'/cmc'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://apps.game.qq.com'</span><span class="token punctuation">,</span> <span class="token comment">// 代理王者荣耀官网</span>
        <span class="token comment">//changeOrigin: true,</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">'^/cmc'</span><span class="token operator">:</span> <span class="token string">'/dev/cmc'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果遇到有多个路由指向的是同一个服务器怎么办，别急，官网有方案，你可以这么做</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">context</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'/j'</span><span class="token punctuation">,</span> <span class="token string">'/cmc'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'https://movie.douban.com'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目常用的就是以上这些了，另外拓展的，比如可以支持本地<code v-pre>https</code>，因为默认本地是<code v-pre>http</code>,还有支持当前可以开启一个<code v-pre>websocket</code>服务，更多配置参考官网，或者有更多特别的需求，及时翻阅<a href="https://webpack.docschina.org/configuration/dev-server/" title="官网" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></p>
<h3 id="wds-模块热加载原理-hmr" tabindex="-1"><a class="header-anchor" href="#wds-模块热加载原理-hmr" aria-hidden="true">#</a> WDS 模块热加载原理(HMR)</h3>
<p>只更新页面模块变化的内容，无需全站刷新</p>
<p>本质上就是<code v-pre>webpack-dev-server</code>中的两个服务，一个<code v-pre>express</code>提供的静态服务，通过<code v-pre>webpack</code>去<code v-pre>compiler</code>入口的依赖文件，加载打包内存中的<code v-pre>bundle.js</code></p>
<p>第二个模块热加载是一个<code v-pre>websocket</code>服务，通过<code v-pre>socketio</code>,当源码静态文件发生变化时，此时会生成一个<code v-pre>manifest</code>文件，这个文件会记录一个<code v-pre>hash</code>以及对应文件修改的<code v-pre>chunk.js</code>,当文件修改时<code v-pre>websocket</code>会单独向浏览器发送一个<code v-pre>ws</code>服务，从而更新页面部分模块，更多可以参考官网<a href="https://webpack.docschina.org/concepts/hot-module-replacement/" title="hot-module-replacement" target="_blank" rel="noopener noreferrer">hot-module-replacement<ExternalLinkIcon/></a></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>了解<code v-pre>webpack-dev-server</code>是什么，它是一个开发环境的静态服务</p>
</li>
<li>
<p><code v-pre>webpack-dev-server</code>在 webpack 中的使用</p>
</li>
<li>
<p>关于<code v-pre>WDS</code>一些常用的配置，比如如何配置接口代理等</p>
</li>
<li>
<p>浅识<code v-pre>HMR</code>模块热加载，原生<code v-pre>webpack</code>虽然也提供了模块热加载，但是<code v-pre>webpack-dev-server</code>可以实现模块热加载，常用框架，比如<code v-pre>vue</code>，内部热加载是用<code v-pre>vue-loader</code>实现的，在使用<code v-pre>WDS</code>时，默认是开启了热加载的。</p>
</li>
</ul>
</div></template>
