<template><div><p><code v-pre>npm</code>是一个包管理工具，当我们安装<code v-pre>nodejs</code>时，这个命令会默认安装。你可能非常熟悉<code v-pre>npm run xxx</code>这个命令，每次上线前你都在执行<code v-pre>npm run build</code>，甚至你常常在<code v-pre>npm i</code>的等待中摸鱼。</p>
<p>当某一天你的同事在你电脑输入了一行命令...,<code v-pre>npm view typescript versions</code>,你脑壳里想着，这
<img src="https://img.soogif.com/Wj4jXG873HMGeq4tjWcVDmhZf9WjBDJM.gif?scope=mdnice" alt=""></p>
<p>于是乎，你去官方文档查了下这个命令，原来<code v-pre>npm view xx versions</code>是查询 <code v-pre>xx</code> 包所有可用版本。为了不拘泥于<code v-pre>npm run start</code>与<code v-pre>npm run build</code>这两行命令，于是笔者总结了这篇没有深度，但是很广度的<code v-pre>npm</code>命令大全，希望你能在你实际项目中能用得上。</p>
<p>正文开始...</p>
<h3 id="npm-init" tabindex="-1"><a class="header-anchor" href="#npm-init" aria-hidden="true">#</a> npm init</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init
// or <span class="token function">npm</span> init -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>该命令意思是初始化一个包项目，生成一个<code v-pre>package.json</code>文件
<img src="https://files.mdnice.com/user/24614/6e96e454-8e72-415b-9292-da76c85810dc.jpg" alt="">
可以一直<code v-pre>enter</code>键下去，你也可以按你心情在控制台输入一些信息，然后<code v-pre>enter</code>下去
<code v-pre>later</code>...
<img src="https://files.mdnice.com/user/24614/5518b79c-1377-4e31-8bee-093259ef30ae.png" alt=""></p>
<p>最后在你目录下生成了一个<code v-pre>package.json</code>文件</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"npm-know"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"description"</span><span class="token operator">:</span> <span class="token string">"My first encounter with npm"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"npm"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">"author"</span><span class="token operator">:</span> <span class="token string">"Maic"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"license"</span><span class="token operator">:</span> <span class="token string">"ISC"</span><span class="token punctuation">,</span> <span class="token comment">// 以上都是默认的配置</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>另外如果你想在指定的目录中生成<code v-pre>package.json</code>,那么你你只需执行下面一行命令
<code v-pre>npm init -w 01</code>, <code v-pre>01</code>是你当前已存在的目录，如果<code v-pre>01</code>不存在，则会在你得根目录<code v-pre>.Trash</code>中创建一个<code v-pre>01/package.json</code></p>
<hr>
<h3 id="关于package-json的一些解释" tabindex="-1"><a class="header-anchor" href="#关于package-json的一些解释" aria-hidden="true">#</a> 关于<code v-pre>package.json</code>的一些解释</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// name  包名，如果你需要发布一个npm包，那么这是必须的</span>
<span class="token comment">// version 版本 同上，你需要发布一个包，那么版本是必须的 包名+版本构成一个包的唯一标识</span>
<span class="token comment">// description 包名的描述，npm能根据这个描述检索你得包名</span>
<span class="token comment">// main 程序的主要入口，默认index.js</span>
<span class="token comment">// scripts 可以执行npm 指定运行的别名</span>
<span class="token comment">// keywords 关键字，便于别人搜索关联找到你发布的包名</span>
<span class="token comment">// author 发布该包的作者名</span>
<span class="token comment">// license 许可证 通常是ISC或者MIT,便于开发者知道这是个开源可免费试用的包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>关于<code v-pre>package.json</code>的默认的配置就是这么多，接下来，你感兴趣的来了,她来了，她就是
<code v-pre>bin</code>...</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token operator">...</span><span class="token punctuation">,</span>
  <span class="token literal-property property">license</span><span class="token operator">:</span> <span class="token string">'ISC'</span><span class="token punctuation">,</span>
   <span class="token string-property property">"bin"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token string-property property">"maic-app-cli"</span><span class="token operator">:</span> <span class="token string">"./cli.js"</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>在官方解释这个<code v-pre>bin</code>有点绕，我的理解的就是，提供一个可执行的接口命令，让你可以运行你写的包，能关联到当前的项目，不管是全局还是局部安装，<code v-pre>npm</code>可以通过这个<code v-pre>bin</code>的别名命令，执行指定包内的脚本，从而进行一系列的初始化工作。比如大名鼎鼎的<code v-pre>vue-cli</code>和<code v-pre>create-react-app</code>脚手架,当你看到<code v-pre>vue-cli@2.96</code>版本<code v-pre>package.json</code>时，可以看到<code v-pre>vue</code>命令的操作</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"vue-cli"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"version"</span><span class="token operator">:</span> <span class="token string">"2.9.6"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"description"</span><span class="token operator">:</span> <span class="token string">"A simple CLI for scaffolding Vue.js projects."</span><span class="token punctuation">,</span>
  <span class="token string-property property">"preferGlobal"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">"bin"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"vue"</span><span class="token operator">:</span> <span class="token string">"bin/vue"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"vue-init"</span><span class="token operator">:</span> <span class="token string">"bin/vue-init"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"vue-list"</span><span class="token operator">:</span> <span class="token string">"bin/vue-list"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>前往<code v-pre>bin/vue</code>目录你可以看到</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token hashbang comment">#!/usr/bin/env node</span>
<span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'commander'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
program
  <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../package'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>version<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">usage</span><span class="token punctuation">(</span><span class="token string">'&lt;command> [options]'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">'init'</span><span class="token punctuation">,</span> <span class="token string">'generate a new project from a template'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">'list'</span><span class="token punctuation">,</span> <span class="token string">'list available official templates'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">'build'</span><span class="token punctuation">,</span> <span class="token string">'prototype a new project'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">'create'</span><span class="token punctuation">,</span> <span class="token string">'(for v3 warning only)'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

program<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>这里就是熟悉的脚手架<code v-pre>vue create xx</code>,<code v-pre>vue init</code>的一些 <code v-pre>xxx</code>项目的脚手架工作了，具体可以查看<a href="https://github.com/vuejs/vue-cli/blob/v2" title="vue-cli源码" target="_blank" rel="noopener noreferrer">vue-cli 源码<ExternalLinkIcon/></a></p>
<p>关于<code v-pre>bin</code>的实际操作，后续会专门写一个自己的脚手架，再来细细了解下这些知识。</p>
<p><code v-pre>conig</code>，这个配置可以在你指定包名，版本升级时，一些特殊值可以保持不变。</p>
<p><code v-pre>dependencies</code>这是一个开发依赖，当你在你得<code v-pre>cmd</code>控制台输入<code v-pre>npm i ramda -s</code>时</p>
<p><img src="https://files.mdnice.com/user/24614/3e2df9cd-a69e-4048-a7ef-576067eab276.jpg" alt=""></p>
<p><code v-pre>package.json</code>中<code v-pre>dependencies</code>生成了一个依赖文件<code v-pre>&quot;ramda&quot;: &quot;^0.27.1&quot;</code>。</p>
<p><code v-pre>devDependencies</code>是一个在生产环境需要依赖的包，<code v-pre>dependencies</code>与<code v-pre>devDependencies</code>的区别是:<code v-pre>npm i xx -s</code>和<code v-pre>npm i xx --save-dev</code>,在实际项目开发中，你可以把<code v-pre>dependencies</code>安装的开发环境依赖包，在你打包的时候利用<code v-pre>webpack</code>的<code v-pre>externals</code>外部扩展特性分离出去，也就是将开发环境的包可以用<code v-pre>cdn</code>加载，这样减少你生产环境的<code v-pre>bundle.js</code>的体积，开发环境那部分依赖的包就可以单独<code v-pre>cdn</code>引入，进而提升你项目的打包速度。</p>
<p>打开<code v-pre>node_modules/ramda</code>，我们能从这个优秀的<code v-pre>ramda</code>包中发现些什么,
注意<code v-pre>scripts</code></p>
<p>在<code v-pre>scripts</code>配置中有一个<code v-pre>&quot;build&quot;: &quot;npm run build:es &amp;&amp; npm run build:cjs &amp;&amp; npm run build:umd &amp;&amp; npm run build:umd:min &amp;&amp; npm run build:mjs&quot;</code>,<code v-pre>ramda</code>
是用<code v-pre>rollup</code>打包的，这行命令可以将你的<code v-pre>ramda</code>打包成了不同模式,支持按需引入还是<code v-pre>script</code>标签引用的多种方式。关于<code v-pre>rollup</code>打包，可以参考官网学习<a href="https://www.rollupjs.com/" title="rollup.js" target="_blank" rel="noopener noreferrer">rollup.js<ExternalLinkIcon/></a>。</p>
<p>现在我们测试下自己配置的<code v-pre>scripts</code>,当前目录下新建一个文件<code v-pre>index.js</code>,并控制台运行<code v-pre>npm run start</code></p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token punctuation">{</span>
  <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"npm-know"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"description"</span><span class="token operator">:</span> <span class="token string">"My first encounter with npm"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"start"</span><span class="token operator">:</span> <span class="token string">"node index.js"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><code v-pre>index.js</code>写入测试代码</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 由于刚项目已经安装ramda，所以直接require该包</span>
<span class="token keyword">const</span> <span class="token constant">R</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'ramda'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> cityMap <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">city</span><span class="token operator">:</span> <span class="token string">'北京'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">city</span><span class="token operator">:</span> <span class="token string">'上海'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">city</span><span class="token operator">:</span> <span class="token string">'深圳'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 找到上海</span>
<span class="token keyword">const</span> shanghaiCity <span class="token operator">=</span> <span class="token constant">R</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token constant">R</span><span class="token punctuation">.</span><span class="token function">propEq</span><span class="token punctuation">(</span><span class="token string">'city'</span><span class="token punctuation">,</span> <span class="token string">'上海'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">(</span>cityMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>shanghaiCity<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>测试结果如下：
<img src="https://files.mdnice.com/user/24614/3ad3f44e-98de-4f41-acc6-5556f1e6eb2c.jpg" alt=""></p>
<p>在你执行<code v-pre>npm run start</code>时，它与<code v-pre>npm start</code>也是等价的，实际上当我们执行这行命令时本质上在执行<code v-pre>node index.js</code>,前者相当于就是一个命令的别名，所以你看到<code v-pre>ramda</code>的<code v-pre>scripts</code>上配置了多行命令，<code v-pre>&quot;build&quot;: &quot;npm run build:es &amp;&amp; npm run build:cjs &amp;&amp; npm run build:umd &amp;&amp; npm run build:umd:min &amp;&amp; npm run build:mjs&quot;,</code>,在<code v-pre>ramda</code>中，这行命令执行了多行配置</p>
<p>在<code v-pre>npm init</code>生成的<code v-pre>package.json</code>内部还有其他的字段，更多可以参考官方文档<a href="https://docs.npmjs.com/cli/v8/configuring-npm/package-json" title="pckage.json" target="_blank" rel="noopener noreferrer">pckage.json<ExternalLinkIcon/></a>,你已经了解<code v-pre>npm</code>最硬核的一些知识了，其他的，你就熟悉下些配置时，比如支持操作系统、node 指定环境版本等等，巴拉巴拉...
<img src="https://img.soogif.com/goKDU3bQAgPVcajH8bdsf21FQF4MmHCr.gif?scope=mdnice" alt=""></p>
<h3 id="npm-h" tabindex="-1"><a class="header-anchor" href="#npm-h" aria-hidden="true">#</a> npm -h</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm <span class="token operator">-</span> h<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>这是一个查看<code v-pre>npm</code>cmmand 有那些指令，等价于<code v-pre>npm help</code>,如果你记不起 npm 有哪些命令，那么你可以用这个查看她的全家桶
<img src="https://files.mdnice.com/user/24614/424d5ac3-864b-4698-b09c-a08558db004c.jpg" alt=""></p>
<h3 id="npm-i-npm-install-的简写" tabindex="-1"><a class="header-anchor" href="#npm-i-npm-install-的简写" aria-hidden="true">#</a> npm i(npm install 的简写)</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i
<span class="token comment">// npm i -g 全局安装</span>
<span class="token comment">// npm i xx@latest 安装最新xx版本的包</span>
<span class="token comment">// npm i xx@1.x.x 安装指定版本的包</span>
<span class="token comment">// npm i xx@1.x.x -s or npm i xx@1.x.x -d 安装到开发环境，包名会在dependencies</span>
<span class="token comment">// npm i xx@1.x.x --save-dev 安装到生产环境，包名会在devDependencies</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>如果你<code v-pre>package.json</code>的<code v-pre>dependencies</code>或者<code v-pre>devDependencies</code>有对应的包了，那么你执行该命令后，会在你当前项目中生成一个<code v-pre>node_modules</code>文件夹,该文件下会下载你需要的包，应有尽有。</p>
<h3 id="npm-cache-clear" tabindex="-1"><a class="header-anchor" href="#npm-cache-clear" aria-hidden="true">#</a> npm cache clear</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm cache clear
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>清除缓存包，在你运行项目，莫名其妙的报错的时候，除了删除<code v-pre>node_modules</code>，有时候你执行这个命令，可能能帮助到你</p>
<h3 id="npm-bugs-xxx" tabindex="-1"><a class="header-anchor" href="#npm-bugs-xxx" aria-hidden="true">#</a> npm bugs xxx</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm bugs ramda
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>这是一个很有用的命令，快速链接到你这个包的<code v-pre>issue</code>，在<code v-pre>issue</code>中会找到你遇到的一些问题，例如：<code v-pre>cd node_modules/ramda</code>，执行命令<code v-pre>npm bugs</code>,浏览器自动给你打开了该包<code v-pre>issue</code>地址。(如果只是在你自己的项目根目录里，执行这个命令，这个命令会把以当前<code v-pre>package.json</code>的 name，在 npm 官网当成一个路由地址打开，那么就是 404 了，不信你可以试试)。</p>
<p><img src="https://files.mdnice.com/user/24614/53613955-1c4c-4871-b8df-abd9e7649c7a.jpg" alt=""></p>
<h3 id="npm-view-ramda-versions" tabindex="-1"><a class="header-anchor" href="#npm-view-ramda-versions" aria-hidden="true">#</a> npm view ramda versions</h3>
<p>查看 ramda 所有版本包</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm view ramda versions
<span class="token comment">// npm view ramda version  查看当前项目ramda版本</span>
<span class="token comment">// npm view ramda@* 查看当前包的基本信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><img src="https://files.mdnice.com/user/24614/baca798a-eb6e-461f-b0dc-4b6b1b372dca.jpg" alt=""></p>
<p>如果你本地想安装一个<code v-pre>vue</code>指定的版本，那么你可以先<code v-pre>npm view vue versions</code> 查到所有的版本，然后命令安装<code v-pre>npm i vue@3.2.25 -s</code>那么就会安装该版本。就是这么简单，这个命令用起来，你终于不用去官网看版本了。</p>
<p><img src="https://img.soogif.com/7Y565laHxRBdsm7JRXO9EYgz2VoAoZno.gif?scope=mdnice" alt=""></p>
<h3 id="npm-diff-diff-ramda-0-0-1-diff-ramda-0-1-0" tabindex="-1"><a class="header-anchor" href="#npm-diff-diff-ramda-0-0-1-diff-ramda-0-1-0" aria-hidden="true">#</a> npm diff --diff=ramda@0.0.1 --diff=ramda@0.1.0</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm diff <span class="token operator">--</span>diff<span class="token operator">=</span>ramda@<span class="token number">0.0</span><span class="token number">.1</span> <span class="token operator">--</span>diff<span class="token operator">=</span>ramda@<span class="token number">0.1</span><span class="token number">.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>比较两个版本的不同，用到少。</p>
<h3 id="npm-docs-ramda" tabindex="-1"><a class="header-anchor" href="#npm-docs-ramda" aria-hidden="true">#</a> npm docs ramda</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm docs ramda
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>这个命令打开<code v-pre>ramda</code>的官方文档，就是<code v-pre>package.json</code>里面的那个<code v-pre>homepage</code>地址</p>
<h3 id="npm-update-xxx" tabindex="-1"><a class="header-anchor" href="#npm-update-xxx" aria-hidden="true">#</a> npm update xxx</h3>
<p>更新 xxx 包</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm update ramda <span class="token comment">// 更新ramda包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h3 id="npm-uninstall-xxx" tabindex="-1"><a class="header-anchor" href="#npm-uninstall-xxx" aria-hidden="true">#</a> npm uninstall xxx</h3>
<p>卸载 xxx 包</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm uninstall ramda
<span class="token comment">// 简写，等价于下面  npm un ramda or npm rm ramda or npm r ramda</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="npm-pkg-get-xx1-xx2" tabindex="-1"><a class="header-anchor" href="#npm-pkg-get-xx1-xx2" aria-hidden="true">#</a> npm pkg get xx1 xx2</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascrpt ext-javascrpt line-numbers-mode"><pre v-pre class="language-javascrpt"><code>npm pkg get name version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>读取包名、版本等信息</p>
<p><img src="https://files.mdnice.com/user/24614/aecf7ada-d094-4066-a3e0-11d088d990b2.jpg" alt=""></p>
<hr>
<p>接下来说几个关于<code v-pre>npm</code>发包的几个关键命令</p>
<h3 id="npm-login" tabindex="-1"><a class="header-anchor" href="#npm-login" aria-hidden="true">#</a> npm login</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm login
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p><img src="https://files.mdnice.com/user/24614/af57b026-15c3-4538-9251-b1ccb1c94431.jpg" alt=""></p>
<p>这中途需要<code v-pre>npm</code>官方会给你发个邮箱的验证码，收到<code v-pre>npm</code>注册的邮箱，输入就 OK 了，这里以笔者 n 年前上传的一个包<code v-pre>eazyutils</code>包为例。</p>
<h3 id="npm-publish" tabindex="-1"><a class="header-anchor" href="#npm-publish" aria-hidden="true">#</a> npm publish</h3>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm publish
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p><img src="https://files.mdnice.com/user/24614/76046df6-cacb-4b8a-8a3c-82bfd68dfa9a.png" alt=""></p>
<p>(注意修改下<code v-pre>package.json</code>的版本)，否则提交不上</p>
<p>更多<code v-pre>npm</code>命令参考<a href="https://docs.npmjs.com/cli/v8/commands" title="npm commands" target="_blank" rel="noopener noreferrer">npm commands<ExternalLinkIcon/></a>了，不常用的就没写了，因为那些不常用的，笔者也没用过，哈哈。更多关于<code v-pre>npm</code>的命令最好就是找官方文档查询，本来以为你看到这里，以为已经总结了所有<code v-pre>npm</code>命令，但是....,笔者文章已经覆盖了项目里所用到的绝大部分场景。</p>
<p><img src="https://img.soogif.com/iM5TsaPVs9nfoJemXrpPRgpdCktSZmPK.gif?imageMogr2/thumbnail/!64.33917507232614p&amp;scope=mdnice" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>1.npm 常用的<code v-pre>command</code>命令，譬如高频命令<code v-pre>npm view xxx versions</code>,<code v-pre>npm update@lastest</code>、<code v-pre>npm un xxx</code>、<code v-pre>npm i xx -s</code>,常用的<code v-pre>增删查改</code>基本以及涵盖了。</p>
<p>2.了解<code v-pre>package.json</code>关键的几个字断意思，但是<code v-pre>bin</code>这个你必须要知道，因为她，你可以任性创建一个自己的<code v-pre>xx-cli</code>了</p>
<p>3.<code v-pre>npm</code>如何发布一个全世界都能看到，全世界都能下载的<code v-pre>npm</code>包，以 n 年前的一个简单<code v-pre>eazyutils</code>包为例</p>
<p>4.<a href="https://github.com/maicFir/lessonNote/tree/master/webpack/npm" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
<p>最后，喜欢的点个赞，在看，收藏等于学会，我会以循序渐进的方式一直分享下去。</p>
</div></template>
