<template><div><p><code v-pre>uni-app</code>官方解释是一款用<code v-pre>vuejs</code>开发前端应用的<code v-pre>跨端框架</code>，从官方解释的第一句话，其实就可以看出，<code v-pre>uni-app</code>集成了<code v-pre>vuejs</code>所有特性，然后具有<code v-pre>跨端</code>的特性，什么是<code v-pre>跨端</code>，通俗理解就是使用<code v-pre>uni-app</code>一套代码开发<code v-pre>h5</code>,<code v-pre>App</code>,<code v-pre>微信小程序</code>,<code v-pre>快应用</code>,<code v-pre>支付宝小程序</code>，<code v-pre>QQ小程序</code>等等。</p>
<p>看到上面<code v-pre>uni-app</code>可以开发多个平台应用，是不是内心很兴奋，what，<code v-pre>android</code>，<code v-pre>ios</code>程序员是不是要失业了，千万不要让我老板看到这种技术，我只会<code v-pre>原生ios,android</code>开发,什么？一套代码代码多端运行？我只是一个切图的，我还要做小程序？APP？快应用？</p>
<p>除了吃惊，更多的是<code v-pre>uni-app</code>简直是万能钥匙啊，面对复杂的多端兼容性需求，程序员掉头发肯定少不了，特别是小程序那主包不得超过<code v-pre>1.5M</code>,总包不得超过<code v-pre>2M</code>的要求，你能想像所有的微信小程序都是2M以内的，而我一张高清图都有<code v-pre>6M</code>了，除了优化再优化，没有更好的选择。</p>
<p>本文是一篇<code v-pre>uni-app</code>入门的笔记，<code v-pre>uni-app</code>这个系列大概会写十来篇，主要会从<code v-pre>uni-app</code>到<code v-pre>云开发</code>，会以实际例子由浅入深认识<code v-pre>uni-app</code>与<code v-pre>云开发</code>,同时也是记录开发中遇到的一些坑。</p>
<p>正文开始...</p>
<p>在开始本文之前，本文主要以下几个方面认识<code v-pre>uni-app</code></p>
<ul>
<li>
<p><code v-pre>uni-app</code>初始化基础项目有哪些关键目录</p>
</li>
<li>
<p><code v-pre>pages.json</code>与<code v-pre>mainifest.json</code>文件，探究对应配置项</p>
</li>
<li>
<p><code v-pre>eazycom</code>全局注册组件，条件编译多端代码</p>
</li>
<li>
<p><code v-pre>uni-app</code>与<code v-pre>web</code>开发的区别</p>
</li>
</ul>
<h3 id="hbuilderx" tabindex="-1"><a class="header-anchor" href="#hbuilderx" aria-hidden="true">#</a> HbuildērX</h3>
<p>使用用<code v-pre>uni-app</code>开发跨端项目，必不可少的一个开发工具就是使用<a href="https://uniapp.dcloud.net.cn/quickstart-hx.html" title="HbuilderX" target="_blank" rel="noopener noreferrer">HbuilderX<ExternalLinkIcon/></a>，官方提供了两种方式创建<code v-pre>uni-app</code></p>
<ul>
<li>可视化界面，这种方式是官方推荐的首选，使用官方插件时非常方便</li>
<li>命令行<code v-pre>vue-cli</code>，对于喜欢命令行的，可以用这个，但个人认为使用可视化界面要高效得多</li>
</ul>
<h3 id="开始一个基础项目" tabindex="-1"><a class="header-anchor" href="#开始一个基础项目" aria-hidden="true">#</a> 开始一个基础项目</h3>
<p>打开<code v-pre>HBuilderX</code>，<code v-pre>文件&gt;新建&gt;项目</code>选择一个<code v-pre>uni-app</code>最简单的默认模版</p>
<p>新建一个<code v-pre>02-uni-demo</code>大概结构就下下面这样</p>
<p><img src="https://files.mdnice.com/user/24614/81aa8092-c55b-46a9-9487-63f31f1c911c.png" alt=""></p>
<p>我们可以看到初始化的目录结构与我们普通项目没什么太大的区别，但还是有些区别，因为我们看到项目里有<code v-pre>uniCloud</code></p>
<p>在<code v-pre>uni-Cloud</code>下主要有两个目录，一个是<code v-pre>database</code>，另一个是<code v-pre>cloudfunctions</code>，这两个目录是云开发的关键，在开始云开发前，你必须关联一个<a href="https://unicloud.dcloud.net.cn/" title="服务空间" target="_blank" rel="noopener noreferrer">服务空间<ExternalLinkIcon/></a>。注意在使用之前，我们必须用邮箱注册登陆<code v-pre>HbuilderX</code>，然后用账号登陆<code v-pre>uni-Cloud</code>创建一个空间，不过此空间是免费，你只能创建一个免费空间，且云函数读取次数只有<code v-pre>500次/天</code>,这量太不够用了，相信我你一定会花钱的，但是不得不说也非常便宜。</p>
<ul>
<li>
<p><code v-pre>database</code>这个目录是<code v-pre>xx.scheme.json</code>文件，当我们在该目录下新建<code v-pre>db schema</code>时，我们在前端页面可以直接使用云函数连接对应的表</p>
</li>
<li>
<p><code v-pre>cloudfunctions</code>这个目录是存放<code v-pre>云函数</code>与<code v-pre>云对象</code></p>
</li>
</ul>
<p>关于<code v-pre>云函数</code>,<code v-pre>云对象</code>，还有<code v-pre>db schema</code>我会在后续的<code v-pre>云开发</code>中陆续揭开</p>
<p>当我们使用<code v-pre>HBuilderX</code>创建一个基础项目后，我们是怎么运行的呢？</p>
<p><img src="https://files.mdnice.com/user/24614/2d4a4e0d-5b46-47f6-ac91-0b0c1fc4d947.png" alt=""></p>
<p>当我们运行到浏览器时，我们就可以打开页面了
<img src="https://files.mdnice.com/user/24614/b20ecabc-457f-451b-b2fd-eb2c3ac41d2a.png" alt=""></p>
<p>这个默认的页面路由就是<code v-pre>pages/index/index.vue</code>，同时也是在<code v-pre>pages.json</code>中注册的第一个页面</p>
<h3 id="pages-json" tabindex="-1"><a class="header-anchor" href="#pages-json" aria-hidden="true">#</a> pages.json</h3>
<p>我们在普通的web开发中，我们的路由是会自己去手动注册，然后必须挂载在根实例上。但是<code v-pre>uni-app</code>你创建的每一个页面会注册在<code v-pre>pages.json</code>的<code v-pre>pages</code>中</p>
<ul>
<li><code v-pre>pages.json</code></li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
	<span class="token property">"pages"</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token comment">//pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages</span>
		<span class="token punctuation">{</span>
			<span class="token property">"path"</span><span class="token operator">:</span> <span class="token string">"pages/index/index"</span><span class="token punctuation">,</span>
			<span class="token property">"style"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token property">"navigationBarTitleText"</span><span class="token operator">:</span> <span class="token string">"uni-app"</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token property">"globalStyle"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token property">"navigationBarTextStyle"</span><span class="token operator">:</span> <span class="token string">"black"</span><span class="token punctuation">,</span>
		<span class="token property">"navigationBarTitleText"</span><span class="token operator">:</span> <span class="token string">"uni-app"</span><span class="token punctuation">,</span>
		<span class="token property">"navigationBarBackgroundColor"</span><span class="token operator">:</span> <span class="token string">"#F8F8F8"</span><span class="token punctuation">,</span>
		<span class="token property">"backgroundColor"</span><span class="token operator">:</span> <span class="token string">"#F8F8F8"</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token property">"uniIdRouter"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>router</code>跳转</li>
</ul>
<p>在<code v-pre>pages</code>中，我们主要看到有<code v-pre>path</code>,这个<code v-pre>path</code>就是我们的路由地址，但是<code v-pre>pages</code>的第一个就是我们程序默认启动的首页，关于<a href="https://uniapp.dcloud.net.cn/collocation/pages.html#pages" title="pages" target="_blank" rel="noopener noreferrer">pages<ExternalLinkIcon/></a>的配置我们会在后续中逐一讲解，我们也可以去官网看到更多的配置信息</p>
<p>我们尝试在<code v-pre>pages</code>中新建一个页面，我们在<code v-pre>pages</code>右键点击<code v-pre>新建页面</code></p>
<p><img src="https://files.mdnice.com/user/24614/6bc6cfd7-c176-4eb6-b7a4-e93c2d1ead6f.png" alt=""></p>
<p>此时我们在新建的页面中尝试加点自己的写的内容</p>
<p><code v-pre>pages/about/about.vue</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">></span></span>
	    我是关于页面
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到这个文件我们是不是非常的熟悉，是不是<code v-pre>vue</code>的味道？</p>
<p>是的，除了模版根标签是<code v-pre>view</code>,在<code v-pre>script</code>上所有的钩子函数都是与<code v-pre>vue</code>没有任何区别</p>
<p>在<code v-pre>开头</code>我们就知道<code v-pre>uni-app</code>就是使用了<code v-pre>vuejs</code>开发跨端应用的，同时又新增了<code v-pre>小程序API</code>与<code v-pre>条件编译</code>，所以你会看到在使用<code v-pre>uni-app</code>开发小程序时，你会看到<code v-pre>小程序的API</code></p>
<p>当我们在浏览器输入地址<code v-pre>http://localhost:8080/#/pages/about/about</code>时就可以打开刚才你新建的一个页面了</p>
<p>关于<code v-pre>uni-app</code>中的路由跳转主要有以下三种</p>
<ul>
<li><code v-pre>uni.navigateTo({url: 'xxx?id=123'})</code>; 保留当前页面，前往另一个非<code v-pre>tabBar</code>页面,可以携带参数,当前页面不会被销毁，使用这个<code v-pre>api</code>跳转另一个页面时，使用<code v-pre>uni.navigateBack</code>返回上一个页面，只能打开非<code v-pre>tabBar</code>页面</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>image</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logo<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/static/logo.png<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>image</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text-area<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{title}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>goToAbout<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>前往关于页面<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'Hello'</span><span class="token punctuation">,</span>

			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token function">goToAbout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					uni<span class="token punctuation">.</span><span class="token function">navigateTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">url</span><span class="token operator">:</span><span class="token string">"/pages/about/about"</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>uni.redirectTo</code>关闭当前页面，前往另一个页面,与<code v-pre>navigateTo</code>的区别是，跳转的新页面不会有返回操作，只能打开非<code v-pre>tabBar</code>页面</p>
</li>
<li>
<p><code v-pre>uni.reLaunch</code>关闭所有页面，前往指定页面，可以打开任意页面</p>
</li>
<li>
<p><code v-pre>uni.switchTab</code>切换<code v-pre>tabBar</code>，只能打开<code v-pre>tabBar</code>的路由页面</p>
</li>
</ul>
<p>关于这几个路由跳转的<code v-pre>api</code>触发页面钩子也会有所不同</p>
<p>当我们使用<code v-pre>uni.navigateTo</code>跳转<code v-pre>about</code>页面时，此时<code v-pre>about</code>页面的两个钩子会被触发<code v-pre>onLoad</code>,<code v-pre>onShow</code>。因为<code v-pre>navigateTo</code>不会销毁当前页面，所以在<code v-pre>about</code>页面返回上一个页面时会直接从页面栈中获取，此时只会触发<code v-pre>onShow</code>不会触发<code v-pre>onLoad</code>钩子</p>
<p>所以此时你会遇到一个场景，<code v-pre>A</code>页面<code v-pre>onLoad</code>钩子请求数据，在<code v-pre>A</code>页面列表也编辑进入详情页保存然后返回，你会发现此时页面不会更新，因为此时<code v-pre>A</code>页面不会触发<code v-pre>onLoad</code>钩子，所以此时请求放在<code v-pre>onLoad</code>钩子估计不太合适，所以要么你把请求放在<code v-pre>onShow</code>中，要么就想办法重新触发<code v-pre>onLoad</code>而重新触发<code v-pre>onLoad</code>你可以使用<code v-pre>uni.reLaunch</code></p>
<p>关于路由跳转钩子在不同场景都会有不同的选择，更多细节参考官方文档<a href="https://uniapp.dcloud.net.cn/api/router.html#" title="router" target="_blank" rel="noopener noreferrer">router<ExternalLinkIcon/></a></p>
<ul>
<li><code v-pre>globalStyle</code></li>
</ul>
<p>我们看到基础配置就有这个，主要是全局设置默认页面窗口的基本公用样式，比如<code v-pre>title</code>、<code v-pre>导航</code>、不同平台的默认首页样式，一般是<code v-pre>pages</code>的第一项为默认页</p>
<ul>
<li><code v-pre>tabBar</code></li>
</ul>
<p>这是我们切换底部<code v-pre>tabBar</code>的页面切换,最关键的就是<code v-pre>list</code>项的配置,当我们配置底部<code v-pre>tabBar</code>后，我们的页面底部就会出现三个切换项，这里的配置是同小程序是一样的</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>	<span class="token punctuation">{</span>
   ...
      <span class="token property">"tabBar"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"color"</span><span class="token operator">:</span> <span class="token string">"#7A7E83"</span><span class="token punctuation">,</span>
      <span class="token property">"selectedColor"</span><span class="token operator">:</span> <span class="token string">"#3cc51f"</span><span class="token punctuation">,</span>
      <span class="token property">"list"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token property">"pagePath"</span><span class="token operator">:</span> <span class="token string">"pages/index/index"</span><span class="token punctuation">,</span>
          <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"Web技术"</span><span class="token punctuation">,</span>
          <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"1"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">"pagePath"</span><span class="token operator">:</span> <span class="token string">"pages/engineer/engineer"</span><span class="token punctuation">,</span>
          <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"工程化"</span><span class="token punctuation">,</span>
          <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"0"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">"pagePath"</span><span class="token operator">:</span> <span class="token string">"pages/my/my"</span><span class="token punctuation">,</span>
          <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"我的"</span><span class="token punctuation">,</span>
          <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"2"</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>subPackages</code>
这个选项能减少小程序<code v-pre>主包</code>的大小，算是优化小程序体积的一种有效手段，因为小程序主包限制<code v-pre>1.5M</code>，总体积不能超过<code v-pre>2M</code>，所以我们非常有必要将非<code v-pre>tabBar</code>页面尽可能的分包出去，从而会减少主包的大小</p>
</li>
<li>
<p><code v-pre>easycom</code></p>
</li>
</ul>
<p>在官方文档上，<code v-pre>HBuilderX 2.5.5</code>支持<code v-pre>eazycom</code>自动引入组件模式，本质上就是按照<code v-pre>官方规范</code>，组件就可以自动注册，并全局使用,在打包后<code v-pre>eazycom</code>会剔除未使用的组件</p>
<p>关于<code v-pre>规范</code>引入官方一段原话</p>
<p><code v-pre>只要组件安装在项目根目录或uni_modules的components目录下，并符合components/组件名称/组件名称.vue或uni_modules/插件ID/components/组件名称/组件名称.vue目录结构,就可以不用引用、注册，直接在页面中使用</code></p>
<p>这段话翻译的简版就是在根目录，假设我创建一个全局组件，在<code v-pre>components</code>目录下创建一个<code v-pre>custEditor</code>的组件</p>
<p><code v-pre>components/custEditor/custEditor.vue</code>这个组件就只要符合这种文件结构，那么我们就可以在其他页面上不用局部注册，就可以使用</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>custEditor</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>custEditor</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token comment">// 这里不用import引入，也不需要在components内注册custEditor组件。template里就可以直接用</span>
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>

			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外一个就是在<code v-pre>uni_modules</code>中的符合这样的文件目录也会自动被注册</p>
<p><code v-pre>uni_modules/uni-badge/components/uni-badge/uni-badge.vue</code>我们注意到所有官方插件都是这种目录结构，如果你想安装插件，就直接去官方插件市场搜索导入就可
<img src="https://files.mdnice.com/user/24614/68a6d75f-46b6-42d4-acbd-adf1caf285cb.png" alt=""></p>
<p>直接导入你的<code v-pre>HBuilderX</code>即可</p>
<p>正常情况如果使用官方插件市场导入，那么会默认支持<code v-pre>eazycom</code>自动导入组件全局注册，而且<code v-pre>eazycom</code>是自动开启的，官方提供了可支持自定义配置</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"easycom"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"autoscan"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"custom"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"^uni-(.*)"</span><span class="token operator">:</span> <span class="token string">"@/components/uni-$1.vue"</span><span class="token punctuation">,</span> <span class="token comment">// 匹配components目录内的vue文件</span>
    <span class="token property">"^vue-file-(.*)"</span><span class="token operator">:</span> <span class="token string">"packageName/path/to/vue-file-$1.vue"</span> <span class="token comment">// 匹配node_modules内的vue文件</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mainifest-json" tabindex="-1"><a class="header-anchor" href="#mainifest-json" aria-hidden="true">#</a> mainifest.json</h3>
<p>这是一个配置文件，如果是小程序，那么需要配置对应的<code v-pre>appid</code>以及对应其他跨端的相关配置，目前只配置了<code v-pre>小程序</code>与<code v-pre>web配置</code>，没有太多复杂东西，小程序只需要将微信公众号新注册的小程序<code v-pre>appid</code>填入即可</p>
<h3 id="uni-app与web" tabindex="-1"><a class="header-anchor" href="#uni-app与web" aria-hidden="true">#</a> uni-app与web</h3>
<p>如果没有开发过小程序，貌似这东西很高大上，但其实并没有太多新颖，微信小程序开发是有微信自己的一套语法API,有自己的标签，页面生命周期<code v-pre>钩子</code>，非常贴近<code v-pre>vue</code>语法。</p>
<p>掌握了<code v-pre>vueJS</code>与最基础的<code v-pre>web</code>开发，完全是很容易的上手小程序，而<code v-pre>uni-app</code>就是用<code v-pre>vuejs</code>语法开发小程序与跨端应用的。</p>
<p>在<code v-pre>uni-app</code>页面布局就是用<code v-pre>view</code>标签,在<code v-pre>uni-app</code>中，这是一个内置组件，类似<code v-pre>web</code>中的<code v-pre>div</code>，是一个视图容器，在<code v-pre>uni-app</code>中根组件必须使用<code v-pre>view</code>标签包裹。</p>
<p>当然<code v-pre>uni-app</code>也提供了其他标签，比如<code v-pre>scroll-view</code>，<code v-pre>swiper</code>等，这些都是<code v-pre>uni-app</code>内置的组件，在<code v-pre>web</code>开发中，我们会使用<code v-pre>div</code>,<code v-pre>span</code>,<code v-pre>img</code>等标签，但是<code v-pre>uni-app</code>最基础的组件就是<code v-pre>view</code>，这个相当<code v-pre>div</code>，我们使用的<code v-pre>uni-app</code>内置组件非常有限，一般都是<code v-pre>view</code>与<code v-pre>text</code>,而在布局样式上基本没有什么太大的区别</p>
<p>在<code v-pre>uni-app</code>中提供了<code v-pre>uni</code>这样的api访问内置的一些方法，比如设置缓存，获取设备信息以及蓝牙等设备信息，与普通不同的web不同的是，<code v-pre>uni-app</code>在其他小程序是无法访问<code v-pre>window</code>对象，当只有运行<code v-pre>h5</code>时，才是运行在浏览器环境里，此时才可以访问<code v-pre>window</code>,<code v-pre>document</code>对象，否则在其他平台会报错，所以此时你可以使用<code v-pre>条件编译</code>来区分不同的端。</p>
<h3 id="条件编译" tabindex="-1"><a class="header-anchor" href="#条件编译" aria-hidden="true">#</a> 条件编译</h3>
<p>在同一个工程项目里使用<code v-pre>条件编译</code>有选择的编译需要的代码</p>
<p>下面这块代码使用条件编译，我们发现是以单行注释的方式定义编译条件的，这块代码只会在H5端有作用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// #ifdef H5</span>
window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">'xxx'</span><span class="token punctuation">;</span>
<span class="token comment">// #endif </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>模版中</code>的条件编译</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!--  #ifdef  H5 --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">></span></span>只会在H5显示的内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--  #endif --></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>css</code>中的条件编译</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* #ifdef  H5 */</span>
<span class="token selector">.h5box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100rpx<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* #endif */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只需要<code v-pre>// #ifdef %PLATFORM% </code>开始，以<code v-pre>// #endif</code>结尾就可以标注这块代码块的条件编译</p>
<p><code v-pre>%PLATFORM%</code>的取值参考官方文档<a href="https://uniapp.dcloud.net.cn/tutorial/platform.html" title="PLATFORM" target="_blank" rel="noopener noreferrer">PLATFORM<ExternalLinkIcon/></a></p>
<p>条件编译真的是维护多端差异的一种必要手段，因为多端差异在同一个工程中，我使用该技术就可区别化不同端。</p>
<p>最后，最近写了一个个人小程序，前端就是使用<code v-pre>uni-app</code>开发的,后端使用<code v-pre>uni-Cloud</code>，有使用官方的插件<code v-pre>uni-ui</code>也有<code v-pre>uView</code>，登陆注册使用的就是官方的<code v-pre>uni-id-pages</code>,小程序后台使用的是<code v-pre>uni-admin</code>开发，基本实现了首页所有模块的增删查改。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>主要使用认识一个最简单的<code v-pre>uni-app</code>项目，了解项目基本结构，以及对<code v-pre>HBuilderX</code>创建<code v-pre>uni-app</code>的初步认识</p>
</li>
<li>
<p>在<code v-pre>uni-app</code>关键的<code v-pre>pages.json</code>与<code v-pre>mainifest.json</code>相关配置项，当你新建页面时，会在<code v-pre>pages.json</code>的<code v-pre>pages</code>注册路由，在<code v-pre>tabBar</code>中配置底部切换，<code v-pre>mainifest</code>主要是<code v-pre>小程序端</code>的<code v-pre>appid</code>，其他也没什么太多的配置</p>
</li>
<li>
<p><code v-pre>eazycom</code>自动注册全局组件，这种方式主要是遵循官方规范即可，全局组件主要有<code v-pre>uni_moudles</code>与<code v-pre>components</code>两种方式，也可在<code v-pre>pages.json</code>中自定义设置<code v-pre>eazycom</code>规则，默认是自动启动<code v-pre>eazycom</code></p>
</li>
<li>
<p>认识<code v-pre>uni-app</code>与普通<code v-pre>web</code>开发的一些不同，知道<code v-pre>条件编译</code>可以区分不同端，使用<code v-pre>uni-app</code>几本内置组件布局。<code v-pre>小程序</code>开发并没那么高大上，门槛也没有想象那么大，所以有小程序需求，如果是跨端项目，那么<code v-pre>uni-app</code>是一种比较可靠的技术方案</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/uni-app/02-uni-demo" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
