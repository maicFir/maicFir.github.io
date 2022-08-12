<template><div><p>最近将公众号的文章进行了整理，用<code v-pre>vuepress</code>搭建了一个在线文档版的文章笔记，整体来说<code v-pre>vuepress</code>在线文档不管<code v-pre>pc</code>端还是<code v-pre>移动端</code>阅读体验是相当可以，我的在线文档是<code v-pre>vuepress2.0</code>搭的(<code v-pre>vuepress2.0</code>是<code v-pre>vite</code>构建)，无论本地打包还是本地服务是相当的快，从<code v-pre>vuepress1.0</code>到<code v-pre>2.0</code>升级过程遇到的一些问题，做了一些记录。</p>
<p>正文开始...</p>
<h3 id="vuepress1-x" tabindex="-1"><a class="header-anchor" href="#vuepress1-x" aria-hidden="true">#</a> vuepress1.x</h3>
<ul>
<li>默认首页有左侧菜单栏</li>
</ul>
<p>当我们设置一个默认自定义首页，然后开启左侧菜单栏时，此时<code v-pre>首页</code>也会出现<code v-pre>左侧菜单栏</code></p>
<p>解决办法，主要是<code v-pre>sidebar</code>格式配置错误</p>
<p>错误配置</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">sidebar</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>SidebarItem4Group<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">collapsable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sidebarDepth</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'基础'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'你不知道的循环中断'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">sidebarDepth</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/front/js/2022-02-18'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
 <span class="token operator">...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正确配置</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> sidebar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">'/front/js/'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'基础'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">collapsable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">''</span><span class="token punctuation">,</span> <span class="token comment">// js下的RADEME.md文件</span>
        <span class="token string">'2022-02-18'</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'进阶'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">collapsable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">''</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你设置左侧菜单后，你想让右侧也出现一个内容进度导航，因此你可以设置<code v-pre>subSidebar</code></p>
<ul>
<li>subSidebar 二级菜单</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 主题</span>
module<span class="token punctuation">.</span>export <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">subSildebar</span><span class="token operator">:</span> <span class="token string">'auto'</span> <span class="token comment">// 或者生成二级菜单</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是发现右侧内容导航fixed却始终失效了，一顿排查</p>
<ul>
<li>右侧目录fixed失效问题</li>
</ul>
<p>由于父级元素设置<code v-pre>transfrom:translateY(0)</code>产生堆叠上下文，因此需要重置<code v-pre>.page</code>样式</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">// styles/palette.styl
.page</span> <span class="token punctuation">{</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> none <span class="token important">!important</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vuepress中markdown文件引入第三方cdn图片403错误" tabindex="-1"><a class="header-anchor" href="#vuepress中markdown文件引入第三方cdn图片403错误" aria-hidden="true">#</a> vuepress中markdown文件引入第三方cdn图片403错误</h3>
<p>由于我们vuepress本地服务把当前本站的<code v-pre>referrer</code>带给了cdn图片请求，第三方发现不是本站的请求，所以直接<code v-pre>403</code>错误</p>
<p>在<code v-pre>config.ts</code>中添加<code v-pre>meta</code>标签</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">'meta'</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'referrer'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'no-referrer'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="此图片来自微信公众平台未经允许不可引用" tabindex="-1"><a class="header-anchor" href="#此图片来自微信公众平台未经允许不可引用" aria-hidden="true">#</a> 此图片来自微信公众平台未经允许不可引用</h3>
<p><img src="https://files.mdnice.com/user/24614/07501a55-e765-4198-a187-f7c2ea4296a9.png" alt=""></p>
<p>如果图片是微信公众号文章后台上传的，偶现图片显示不出来
需要添加<code v-pre>meta</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// /docs/.vuepress/configs/head/index.ts</span>
<span class="token operator">...</span>
 <span class="token punctuation">[</span>
    <span class="token string">'meta'</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token string-property property">'data-draft-node'</span><span class="token operator">:</span> <span class="token string">'block'</span><span class="token punctuation">,</span>
      <span class="token string-property property">'data-draft-type'</span><span class="token operator">:</span> <span class="token string">'table'</span><span class="token punctuation">,</span>
      <span class="token string-property property">'data-size'</span><span class="token operator">:</span> <span class="token string">'normal'</span><span class="token punctuation">,</span>
      <span class="token string-property property">'data-row-style'</span><span class="token operator">:</span> <span class="token string">'normal'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义全局组件" tabindex="-1"><a class="header-anchor" href="#定义全局组件" aria-hidden="true">#</a> 定义全局组件</h3>
<p>主要是在<code v-pre>.vuepress</code>新建<code v-pre>components</code>，内部组件会自动根据<code v-pre>文件名</code>注册成全局组件，比如下面两个类似的组件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>components
      <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>glob
            <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>text<span class="token punctuation">.</span>vue
      <span class="token operator">|</span><span class="token operator">--</span><span class="token operator">-</span>Hello<span class="token punctuation">.</span>vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>markdown</code>文件中就可以直接使用了</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token list punctuation">*</span> 这是一个全局注册的组件
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Hello</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>glob-text</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pwa" tabindex="-1"><a class="header-anchor" href="#pwa" aria-hidden="true">#</a> pwa</h3>
<p>主要在离线状态下，如果断网了，依然可以正常访问应用
参照官方<a href="https://www.vuepress.cn/plugin/official/plugin-pwa.html#%E5%AE%89%E8%A3%85" title="pwa" target="_blank" rel="noopener noreferrer">pwa<ExternalLinkIcon/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// pwa</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> pwaPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'@vuepress/plugin-pwa'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">plugins</span><span class="token operator">:</span> any <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token function">pwaPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">skipWaiting</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>public</code>目录下新建一个<code v-pre>manifest.webmanifest.json</code>文件</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Web技术学苑"</span><span class="token punctuation">,</span>
  <span class="token property">"short_name"</span><span class="token operator">:</span> <span class="token string">"Web技术学苑"</span><span class="token punctuation">,</span>
  <span class="token property">"start_url"</span><span class="token operator">:</span> <span class="token string">"/index.html"</span><span class="token punctuation">,</span>
  <span class="token property">"display"</span><span class="token operator">:</span> <span class="token string">"standalone"</span><span class="token punctuation">,</span>
  <span class="token property">"background_color"</span><span class="token operator">:</span> <span class="token string">"#fff"</span><span class="token punctuation">,</span>
  <span class="token property">"theme_color"</span><span class="token operator">:</span> <span class="token string">"#3eaf7c"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且在<code v-pre>header</code>中也需要配置</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> type <span class="token punctuation">{</span> HeadConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/core'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token literal-property property">head</span><span class="token operator">:</span> HeadConfig<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'icon'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/images/n_logo.png</span><span class="token template-punctuation string">`</span></span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'manifest'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'/manifest.webmanifest.json'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是注意，<code v-pre>只能生产环境才能验证，本地开发环境，貌似始终不生效</code></p>
<h3 id="webpackconfig修改aligns不能使用path" tabindex="-1"><a class="header-anchor" href="#webpackconfig修改aligns不能使用path" aria-hidden="true">#</a> webpackConfig修改aligns不能使用path</h3>
<p>当我配置文件使用webpack的配置时，使用不了path,非常困惑，无解</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// console.log(path.resolve(__dirname), 'dirname')</span>
<span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">configureWebpack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">config<span class="token punctuation">,</span> isServer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">config<span class="token punctuation">,</span> isServer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// config.resolve.alias</span>
    <span class="token comment">//   .set('@vuepress', '../../../.vuepress')</span>
    <span class="token comment">//   .set('@front', '../../../front')</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> webpackConfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npm-run-build-报错" tabindex="-1"><a class="header-anchor" href="#npm-run-build-报错" aria-hidden="true">#</a> npm run build 报错</h3>
<p><img src="https://files.mdnice.com/user/24614/e4ca00cd-3380-4dca-8bbd-27bc7ba34f8d.png" alt="">
以上错误在vuepress1.0中开发环境正常，但是一打包就报错，降级vuepress版本，删除<code v-pre>node_modules</code>都没有无解决</p>
<p>实在无奈弃坑了</p>
<h3 id="vuepress2-0小试牛刀" tabindex="-1"><a class="header-anchor" href="#vuepress2-0小试牛刀" aria-hidden="true">#</a> vuePress2.0小试牛刀</h3>
<p>vuepress2.0是用vite构建的，本地服务速度与大包速度真的比vuepress1.0要快很多，但是也有坑</p>
<h3 id="打包报报错" tabindex="-1"><a class="header-anchor" href="#打包报报错" aria-hidden="true">#</a> 打包报报错</h3>
<p>因为我是直接从1.0升级到2.0,所用的在<code v-pre>md</code>中使用了自定义全局组件，在vuepress1.0中只要是<code v-pre>commponents</code>下的组件就会按照文件名自动注册成全局的。</p>
<p>但是<code v-pre>vuepress2.0</code>需要你引入插件<code v-pre>@vuepress/plugin-register-components</code>才行，否则在<code v-pre>md</code>引入的全局组件，大概会报以下错误</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">TypeError</span><span class="token operator">:</span> Invalid value used <span class="token keyword">as</span> weak map key     at WeakMap<span class="token punctuation">.</span>set
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当你未使用<code v-pre>@vuepress/plugin-register-components</code>时，你需要把<code v-pre>md</code>的文件的组件注释掉，不然打包就会报错</p>
<p>假设你在<code v-pre>md</code>上使用的一个未注册的组件，打包就会报错
<img src="https://files.mdnice.com/user/24614/21284fda-d885-4381-b41a-6da14f7c1247.png" alt=""></p>
<p>因此要特别注意，自定义的组件在<code v-pre>md</code>文件中需要注册才行</p>
<h3 id="添加搜索" tabindex="-1"><a class="header-anchor" href="#添加搜索" aria-hidden="true">#</a> 添加搜索</h3>
<p><code v-pre>vuepress2.0</code>需要引入搜索插件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// plugins/index.ts</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> docsearchPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'@vuepress/plugin-docsearch'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">plugins</span><span class="token operator">:</span> any <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token function">docsearchPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文章编写错误" tabindex="-1"><a class="header-anchor" href="#文章编写错误" aria-hidden="true">#</a> 文章编写错误</h3>
<p>如果你的文章开头有换行，文章解析会有问题</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>
<span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">title</span><span class="token punctuation">:</span> 写了个git提交脚本
<span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2022-07-25</span>
<span class="token key atrule">sidebarDepth</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首行不能有换行
<img src="https://files.mdnice.com/user/24614/a9da5c59-9939-4a44-89b5-f7355a832156.png" alt=""></p>
<h3 id="vuepress2-0注册全局组件" tabindex="-1"><a class="header-anchor" href="#vuepress2-0注册全局组件" aria-hidden="true">#</a> vuepress2.0注册全局组件</h3>
<p>在<code v-pre>vuepress1.0</code>的<code v-pre>components</code>目录下，默认会以文件名注册全局组件，如果是文件夹会是默认以<code v-pre>文件夹名+文件名注册组件名</code></p>
<p>在<code v-pre>2.0</code>中，需要引入注册组件插件<code v-pre>@vuepress/plugin-register-components</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> registerComponentsPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'@vuepress/plugin-register-components'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">plugins</span><span class="token operator">:</span> any <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token function">registerComponentsPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">componentsDir</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../../'</span><span class="token punctuation">,</span> <span class="token string">'components'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 自动注册全局组件,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们这样设置后，注意在<code v-pre>components</code>目录下的<code v-pre>xxx.vue</code>组件会被注册成全局组件，参考<a href="https://v1.vuepress.vuejs.org/zh/guide/using-vue.html#%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6" title="使用组件" target="_blank" rel="noopener noreferrer">使用组件<ExternalLinkIcon/></a>
<img src="https://files.mdnice.com/user/24614/6787b9f6-d01f-46ac-b195-c00a4610031d.png" alt=""></p>
<p>但是官方也提供了一种方案，可以让我们手动注册全局组件，如果你不想局限于官方插件这种约定式的方式</p>
<h3 id="_2-0客户端自定义配置" tabindex="-1"><a class="header-anchor" href="#_2-0客户端自定义配置" aria-hidden="true">#</a> 2.0客户端自定义配置</h3>
<p>因为你想高度自定义化，所以官方提供了客户端自定义配置，首先需要在<code v-pre>.vuepress</code>文件夹下新建一个<code v-pre>client.ts</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// .vuepress/client.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineClientConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/client'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> installComponent<span class="token punctuation">,</span> rootComponentsGlobal <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./components'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineClientConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">enhance</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> app<span class="token punctuation">,</span> router<span class="token punctuation">,</span> siteData <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 注册自定义全局组件</span>
        <span class="token function">installComponent</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rootComponents</span><span class="token operator">:</span> rootComponentsGlobal<span class="token punctuation">,</span> <span class="token comment">// 注册全局组件，放在根节点</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们注意到<code v-pre>rootComponents</code>，这个实际上就是全局注册在根节点上的组件</p>
<p>我们看下<code v-pre>./components</code>这个目录</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 引入自定义注册全局组件</span>
<span class="token keyword">import</span> ActionFied <span class="token keyword">from</span> <span class="token string">"./ActionFied"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Custcomponents <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 自定义的一些组件</span>
<span class="token punctuation">}</span>
<span class="token comment">// 注册全局</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">installComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>Custcomponents<span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>Custcomponents<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> Custcomponents<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 注册到根节点上的全局组件</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> rootComponentsGlobal <span class="token operator">=</span> <span class="token punctuation">[</span>
    ActionFied
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此你看到的右侧的这个浮框就是一个全局组件,所有页面都会有这个全局组件
<img src="https://files.mdnice.com/user/24614/d836b981-63f8-4795-9c25-478cab97b7ad.png" alt=""></p>
<h3 id="配置alias" tabindex="-1"><a class="header-anchor" href="#配置alias" aria-hidden="true">#</a> 配置<code v-pre>alias</code></h3>
<p>比如我们通常项目用到的<code v-pre>aligns</code>，因此需要我们自己配置，参看官网<a href="https://v2.vuepress.vuejs.org/zh/reference/bundler/vite.html" title="vite" target="_blank" rel="noopener noreferrer">vite<ExternalLinkIcon/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// .vuepress/config.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuepress'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ViteConfig <span class="token keyword">from</span> <span class="token string">'./configs/viteConfig'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
   <span class="token operator">...</span><span class="token punctuation">,</span>
    <span class="token literal-property property">bundler</span><span class="token operator">:</span> ViteConfig<span class="token punctuation">.</span>bundler
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>./configs/viteConfig</code>中</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// configs/viteConfig/index.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> viteBundler <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/bundler-vite'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/cli'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> path <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'@vuepress/utils'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">bundler</span><span class="token operator">:</span> <span class="token function">viteBundler</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">viteOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">'@component'</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../../components'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string-property property">'@public'</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../../public'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string-property property">'@configs'</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'../../configs'</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">vuePluginOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h3>
<p>我是用同一个仓库，两个不同分支来管理，主要写了一个脚本，这样同一个仓库不同分支管理，避免了创建多个仓库的繁琐</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>
<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> -e

<span class="token comment"># 生成静态文件</span>
<span class="token function">npm</span> run build 

<span class="token comment"># 进入生成的文件夹</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -m <span class="token string">'deploy'</span>
<span class="token comment"># 推送到指定仓库</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/maicFir/maicFir.github.io.git

<span class="token function">git</span> push -f origin master

<span class="token builtin class-name">echo</span> <span class="token string">'push success'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你打包成<code v-pre>dist</code>文件时，你只需要将推送对应的分支即可</p>
<p>注意当你使用<code v-pre>gitPage</code>搭建你的博客时，根目录必须有<code v-pre>index.html</code>,不然访问就会是<code v-pre>404</code>
<img src="https://files.mdnice.com/user/24614/128d417f-a33d-42b0-ae0b-d10a932eafcb.png" alt=""></p>
<p>选择对应的提交分支，然后点击保存，等几分钟后就可以访问，然后打开你的<code v-pre>gitPage</code>地址，比如我的在线文档地址就是<code v-pre>https://maicfir.github.io/</code></p>
<p><img src="https://files.mdnice.com/user/24614/d33d50f2-7a35-4a9e-9421-193a18d49837.png" alt=""></p>
<p>另外<code v-pre>vuepress</code>搭建博客文章网上也比较多，可以参考<a href="https://v2.vuepress.vuejs.org/zh/" title="vuepress2.0官网" target="_blank" rel="noopener noreferrer">vuepress2.0官网<ExternalLinkIcon/></a>以及<a href="https://github.com/mqyqingfeng/Blog/issues/235" title="mqyqingfeng blog" target="_blank" rel="noopener noreferrer">mqyqingfeng blog<ExternalLinkIcon/></a>以及<a href="https://coder.itclan.cn/fontend/tools/vuepress-build-blog/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE" title="vuepress-build-blog" target="_blank" rel="noopener noreferrer">vuepress-build-blog<ExternalLinkIcon/></a></p>
<h3 id="宝塔部署https" tabindex="-1"><a class="header-anchor" href="#宝塔部署https" aria-hidden="true">#</a> 宝塔部署<code v-pre>https</code></h3>
<p>首先登陆自己的服务器</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ssh <span class="token operator">-</span>p <span class="token number">80</span> useName@<span class="token number">12</span><span class="token punctuation">.</span>xx<span class="token punctuation">.</span>xx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入自己的密码，然后就登陆进去了</p>
<p>然后在自己服务器安装宝塔软件，参考官网<a href="https://www.kancloud.cn/chudong/bt2017/443922" title="安装宝塔面板" target="_blank" rel="noopener noreferrer">安装宝塔面板<ExternalLinkIcon/></a></p>
<p>然后官网注册并实名认证,这是为了配置<code v-pre>ssl</code>的基础信息</p>
<p>当安装宝塔成功后，输入命令<code v-pre>bt default</code>,终端就会显示你在浏览器输入的地址，打开地址，输入用户名与密码登陆即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>bt <span class="token keyword">default</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我登陆后就是下面这样
<img src="https://files.mdnice.com/user/24614/42be075e-abcf-4cfb-9e8a-ba72a23bdfab.png" alt="">
点击网站，添加站点,比如我的站点就是<code v-pre>learn.wmcweb.cn</code>,注意我的主域是<code v-pre>wmcweb.cn</code>，而我是添加了一个子域名去访问我的网站的,这个子域名需要你添加域名解析，需要在你的域名解析里面设置
<img src="https://files.mdnice.com/user/24614/dd59021c-a01c-45cd-8910-e0f6da8640e1.png" alt=""></p>
<p>当我们添加一个站点成功后，然后设置ssl
<img src="https://files.mdnice.com/user/24614/660e5386-78c6-4bd0-a64d-e8db291e38ac.png" alt="">
注意，我们点击<code v-pre>宝塔SSL</code>，这样生成的证书时间比较长，到时我们如果到期了，重新替换证书就行。</p>
<p>当你添加<code v-pre>ssl</code>后，然后把你本地打包后的<code v-pre>dist</code>目录文件上传到你新建的网站目录下就行，然后你就可以愉快的让你的网站支持<code v-pre>https</code>访问了。</p>
<h3 id="在线文档" tabindex="-1"><a class="header-anchor" href="#在线文档" aria-hidden="true">#</a> 在线文档</h3>
<p>最后关于公众号文章的在线文档就可以愉快的访问了，具体可以访问<a href="https://learn.wmcweb.cn/" title="https://learn.wmcweb.cn/" target="_blank" rel="noopener noreferrer">https://learn.wmcweb.cn/<ExternalLinkIcon/></a>或者<a href="https://maicfir.github.io/" title="https://maicfir.github.io/" target="_blank" rel="noopener noreferrer">https://maicfir.github.io/<ExternalLinkIcon/></a>,文档在线源码参考底部<code v-pre>code example</code></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>主要是使用vuepress1.0与2.0遇到的一些问题</li>
<li>第三方图片访问不显示问题以及微信公众平台未经允许不可引用问题</li>
<li>vuepress2.0打包报错问题，未注册的组件不能在<code v-pre>md</code>文件中使用</li>
<li>关于部署<code v-pre>gitPage</code>404问题，当前部署分支必须是打包后的<code v-pre>dist</code>文件</li>
<li>自动化命令部署<code v-pre>gitPage</code></li>
<li>宝塔软件支持网站<code v-pre>https</code></li>
<li>本文文档源码地址<a href="https://github.com/maicFir/maicFir.github.io" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></li>
</ul>
</div></template>
