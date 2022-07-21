<template><div><p><code v-pre>webpack</code>官方提供了分析打包的一些工具，我们在开发打包后，我们可以利用<code v-pre>webpack</code>给我们提供的一些工具去分析包的大小，从而对打包输出文件进行优化，通常我们都会用<code v-pre>webpack-bundle-analyzer</code>这个插件去分析，除了这种，我们看下官方提供的另外几种工具。</p>
<p>正文开始...</p>
<p>在开始本文之前，首先会从以下几点去利用工具分析打包<code v-pre>dist</code>，参考官方文档<a href="https://webpack.docschina.org/guides/code-splitting/#bundle-analysis" target="_blank" rel="noopener noreferrer">bundle-analysis<ExternalLinkIcon/></a></p>
<ul>
<li>
<p><code v-pre>webpack-chart</code>: webpack stats 交互饼图，主要是利用命令行<code v-pre>webpack --profile --json=stats.json</code> 本地生成<code v-pre>json</code>,然后根据生成的<code v-pre>json</code>显示包的信息</p>
</li>
<li>
<p><code v-pre>webpack-bundle-analyzer</code>是一个插件，只要打包成功后，会自动打开一个界面分析 dist 包</p>
</li>
<li>
<p><code v-pre>webpack bundle optimize helper</code> 分析打包后的<code v-pre>bundle.js</code>，减少<code v-pre>bundle</code>大小</p>
</li>
<li>
<p><code v-pre>bundle-stats</code>生成一个 bundle 报告，比较不同构建之间的结果</p>
</li>
</ul>
<h3 id="webpack-chart" tabindex="-1"><a class="header-anchor" href="#webpack-chart" aria-hidden="true">#</a> webpack-chart</h3>
<p>我们打开<a href="https://alexkuz.github.io/webpack-chart/" target="_blank" rel="noopener noreferrer">webpack-chart<ExternalLinkIcon/></a>
<img src="https://files.mdnice.com/user/24614/3d0ea394-e4c4-4b33-bef5-b238ab331e17.png" alt="">
然后在我们的项目命令行里输入</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npx webpack <span class="token operator">--</span>profile <span class="token operator">--</span>json<span class="token operator">=</span>stats<span class="token punctuation">.</span>json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/ec5c0aac-0a14-4fc9-9410-2d2a7b274630.png" alt="">
或者在<code v-pre>package.json</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
  <span class="token string-property property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"server"</span><span class="token operator">:</span> <span class="token string">"webpack server"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"async"</span><span class="token operator">:</span> <span class="token string">"webpack --profile --json=stats.json"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将生成的<code v-pre>stats.json</code>在指定打开的那个网站上上传上去
<img src="https://files.mdnice.com/user/24614/04376129-cc01-4167-88f1-e9409f2b87ab.png" alt=""></p>
<p>但是这个图貌似并没有那么明显</p>
<h3 id="webpack-visualizer" tabindex="-1"><a class="header-anchor" href="#webpack-visualizer" aria-hidden="true">#</a> webpack-visualizer</h3>
<p>打开<a href="https://chrisbateman.github.io/webpack-visualizer/" target="_blank" rel="noopener noreferrer">webpack-visualizer<ExternalLinkIcon/></a>
<img src="https://files.mdnice.com/user/24614/4fb8538e-0116-4dd7-98ba-079fb310560f.png" alt="">
将生成的<code v-pre>stats.json</code>上传后
<img src="https://files.mdnice.com/user/24614/8fbf96cc-b37f-48c5-9efe-b1b9f907226a.png" alt="">
能分析哪个文件包含的一些依赖包的关系</p>
<h3 id="webpack-bundle-analyzer" tabindex="-1"><a class="header-anchor" href="#webpack-bundle-analyzer" aria-hidden="true">#</a> webpack-bundle-analyzer</h3>
<p>直接安装<a href="https://github.com/webpack-contrib/webpack-bundle-analyzer" target="_blank" rel="noopener noreferrer">webpack-bundle-analyzer<ExternalLinkIcon/></a>插件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i webpack<span class="token operator">-</span>bundle<span class="token operator">-</span>analyzer <span class="token operator">--</span>save<span class="token operator">-</span>dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> BundleAnalyzerPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-bundle-analyzer'</span><span class="token punctuation">)</span>
<span class="token operator">...</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token operator">...</span>
    <span class="token keyword">new</span> <span class="token class-name">BundleAnalyzerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行<code v-pre>npx webpack</code>时，就会自动打开本地<code v-pre>8888</code>端口了
<img src="https://files.mdnice.com/user/24614/e7dc4afd-4c9d-4f6d-a532-ed57d9309806.png" alt="">
通常来说，这种方式效果最好，可以非常清楚的看到文件包之间的依赖关系</p>
<p>另外还有一种方式，就是可以用命令行方式,前提是先生成<code v-pre>stats.json</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npx webpack-bundle-analyzer stats.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="webpack-bundle-optimize-helper" tabindex="-1"><a class="header-anchor" href="#webpack-bundle-optimize-helper" aria-hidden="true">#</a> webpack bundle optimize helper</h3>
<p>打开地址<a href="https://webpack.jakoblind.no/optimize/" target="_blank" rel="noopener noreferrer">helper<ExternalLinkIcon/></a>,上传生成的<code v-pre>stats.json</code></p>
<p><img src="https://files.mdnice.com/user/24614/a5c207b0-5149-4ff9-b5cb-d93079e5ea89.png" alt="">
在这之前我们<code v-pre>webpack.config.js</code>的<code v-pre>mode:development</code>此时我们改成<code v-pre>mode:production</code></p>
<p>相比较之前要小得多,并且告诉我们一些可以改进的意见
<img src="https://files.mdnice.com/user/24614/b325e5cf-acc6-4f2d-a6d6-5462839308df.png" alt=""></p>
<h3 id="analyse" tabindex="-1"><a class="header-anchor" href="#analyse" aria-hidden="true">#</a> analyse</h3>
<p>直接打开<a href="https://webpack.github.io/analyse" target="_blank" rel="noopener noreferrer">analyse<ExternalLinkIcon/></a>,把生成的<code v-pre>stats.json</code>上传上去即可</p>
<p><img src="https://files.mdnice.com/user/24614/0dbb7ea4-cd7b-4991-9708-4fcf59321107.png" alt="">
不过这个信息貌似只能分析包文件的一些大小，包之间的依赖关系并没有那么明显</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>主要是介绍<code v-pre>webpack</code>几种不同分析包的工具，每一种都有不同的特点</li>
<li><code v-pre>webpack --profile --json=stats.json</code>生成<code v-pre>stats.json</code>文件，然后利用工具上传<code v-pre>stats.json</code>，分析包数据</li>
<li>最实用的还是<code v-pre>webpack-bundle-analyzer</code>用得比较多点</li>
</ul>
</div></template>
