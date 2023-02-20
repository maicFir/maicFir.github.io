<template><div><p>在上一篇中，我们用内置组件切了一张<code v-pre>仿淘宝首页</code>，主要了解到了<code v-pre>uni-app</code>内置组件的布局，我们在布局首页时，我们使用了<code v-pre>uni-list</code>这个组件，这是一个<code v-pre>uni-app</code>内置官方扩展组件,该组件长列表性能优化，多端兼容。</p>
<p>我们继续完善一下首页的商品列表模块</p>
<p>主要会从以下完善功能</p>
<ul>
<li>
<p>在线mock商品数据</p>
</li>
<li>
<p>实现商品的上拉加载，下拉刷新</p>
</li>
</ul>
<h3 id="在线mock数据" tabindex="-1"><a class="header-anchor" href="#在线mock数据" aria-hidden="true">#</a> 在线<code v-pre>mock</code>数据</h3>
<p>首先我们在<a href="https://mock.mengxuegu.com/" title="EazyMock" target="_blank" rel="noopener noreferrer">EazyMock<ExternalLinkIcon/></a>在线平台登陆，创建一个个人项目，然后我们在线创建一个接口</p>
<p><img src="https://files.mdnice.com/user/24614/adbb06e5-0615-4a92-af64-d5f230e623d0.png" alt=""></p>
<p>然后我们编辑<code v-pre>mock</code>数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">pageIndex</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>
      _req
    <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> _req<span class="token punctuation">.</span>query<span class="token punctuation">.</span>pageIndex
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">pageSize</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>
      _req
    <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> _req<span class="token punctuation">.</span>query<span class="token punctuation">.</span>pageSize
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">"list|10"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token string-property property">'url'</span><span class="token operator">:</span> <span class="token string">"@image('200x100', '#50B347', '#FFF', 'Web技术学苑')"</span><span class="token punctuation">,</span>
      <span class="token string-property property">'desc'</span><span class="token operator">:</span> <span class="token string">'@ctitle()'</span><span class="token punctuation">,</span>
      <span class="token string-property property">'prices'</span><span class="token operator">:</span> <span class="token string">'@integer(100,1000)'</span><span class="token punctuation">,</span>
      <span class="token string-property property">'buys'</span><span class="token operator">:</span> <span class="token string">'@integer(60,100)'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在代码中我们需要将模拟的<code v-pre>mock</code>数据放置到数据中</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Content.vue</span>
 <span class="token operator">...</span>
	<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token function">queryGoods</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token punctuation">{</span>condation<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
				uni<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
					<span class="token literal-property property">url</span><span class="token operator">:</span><span class="token string">"https://mock.mengxuegu.com/mock/63e0b9f41b8291742151c7a2/tabbao/goodslist"</span><span class="token punctuation">,</span>
					<span class="token literal-property property">method</span><span class="token operator">:</span><span class="token string">'GET'</span><span class="token punctuation">,</span>
					<span class="token literal-property property">data</span><span class="token operator">:</span> condation<span class="token punctuation">,</span>
					<span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span>  <span class="token punctuation">{</span>
						<span class="token keyword">const</span> <span class="token punctuation">{</span><span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>data<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">=</span> res<span class="token punctuation">;</span>
						<span class="token keyword">this</span><span class="token punctuation">.</span>shopData <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>shopData<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>list<span class="token punctuation">)</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">queryGoods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看下预览效果,页面展示了<code v-pre>10</code>条数据
<img src="https://files.mdnice.com/user/24614/a2d15d12-3e22-4170-bc16-853e1041e676.png" alt=""></p>
<h3 id="上拉加载" tabindex="-1"><a class="header-anchor" href="#上拉加载" aria-hidden="true">#</a> 上拉加载</h3>
<p>在<code v-pre>uni-app</code>中实现上拉加载主要有两种方案，第一种的是使用内置组件<code v-pre>scroll-view</code>，另一种就是使用原生<code v-pre>pages.json</code>配置实现，我们需要注意<code v-pre>scroll-view</code>是区域滚动，并且<a href="https://uniapp.dcloud.net.cn/component/scroll-view.html" title="scroll-view" target="_blank" rel="noopener noreferrer">scroll-view<ExternalLinkIcon/></a>并不适合长列表</p>
<p>官方推荐上拉加载使用原生配置</p>
<p>首先我们必须在<code v-pre>pages.json</code>中对应的<code v-pre>style</code>中添加<code v-pre>enablePullDownRefresh</code></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"pages"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
			<span class="token property">"path"</span><span class="token operator">:</span> <span class="token string">"pages/index/index"</span><span class="token punctuation">,</span>
			<span class="token property">"style"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token property">"navigationBarTitleText"</span><span class="token operator">:</span> <span class="token string">"仿淘宝网触屏版"</span><span class="token punctuation">,</span>
				<span class="token property">"enablePullDownRefresh"</span><span class="token operator">:</span> <span class="token boolean">true</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只有对应路有页面新增<a href="https://uniapp.dcloud.net.cn/collocation/pages.html#pages" title="enablePullDownRefresh" target="_blank" rel="noopener noreferrer">enablePullDownRefresh<ExternalLinkIcon/></a>，对应路由页面才会触发下拉加载钩子</p>
<p>我们在主页面可以看到</p>
<ul>
<li>新增了两个方法<code v-pre>onPullDownRefresh</code>、<code v-pre>onReachBottom</code></li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Header</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Header</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Content</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Content</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> Header <span class="token keyword">from</span> <span class="token string">"./component/Header.vue"</span><span class="token punctuation">;</span>
	<span class="token keyword">import</span> Content <span class="token keyword">from</span> <span class="token string">"./component/Content.vue"</span><span class="token punctuation">;</span>
	
	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			Header<span class="token punctuation">,</span>
			Content
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">onPullDownRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>content<span class="token punctuation">.</span><span class="token function">pullDownRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">onReachBottom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>content<span class="token punctuation">.</span><span class="token function">reachBottom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'index load'</span><span class="token punctuation">)</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token function">onShow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'index on show'</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
	
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>onPullDownRefresh</code>在下拉时会触发这个钩子函数</p>
<p><code v-pre>onReachBottom</code>触发底部时会触发这个函数</p>
<p>注意这两个钩子只能在主页里生效，并不能在<code v-pre>content</code>组件中生效，所以我们使用一个<code v-pre>ref</code>方式与子组件通信</p>
<p>在<code v-pre>Content</code>组件中</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token function">queryGoods</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">const</span> <span class="token punctuation">{</span> condation <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>loadStatus <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
				uni<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
					<span class="token literal-property property">url</span><span class="token operator">:</span><span class="token string">"https://mock.mengxuegu.com/mock/63e0b9f41b8291742151c7a2/tabbao/goodslist"</span><span class="token punctuation">,</span>
					<span class="token literal-property property">method</span><span class="token operator">:</span><span class="token string">'GET'</span><span class="token punctuation">,</span>
					<span class="token literal-property property">data</span><span class="token operator">:</span> condation<span class="token punctuation">,</span>
					<span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span>  <span class="token punctuation">{</span>
						<span class="token keyword">const</span> <span class="token punctuation">{</span><span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>data<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">=</span> res<span class="token punctuation">;</span>
						<span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>hasMore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
							<span class="token keyword">this</span><span class="token punctuation">.</span>loadStatus <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
							<span class="token keyword">this</span><span class="token punctuation">.</span>shopData <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>shopData<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>list<span class="token punctuation">)</span>
						<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
							<span class="token keyword">this</span><span class="token punctuation">.</span>loadStatus <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 下拉刷新</span>
			<span class="token function">pullDownRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>condation<span class="token punctuation">.</span>pageIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>condation<span class="token punctuation">.</span>pageSize <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>shopData <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">queryGoods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 停止loading</span>
				uni<span class="token punctuation">.</span><span class="token function">stopPullDownRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 上拉触发底部加载</span>
			<span class="token function">reachBottom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>condation<span class="token punctuation">.</span>pageIndex <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span>condation<span class="token punctuation">.</span>pageIndex <span class="token operator">+=</span><span class="token number">1</span><span class="token punctuation">;</span>
					<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">queryGoods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">queryGoods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我使用<code v-pre>hasMore</code>的标识模拟数据加载完毕，当<code v-pre>hasMore</code>为<code v-pre>false</code>时就代表数据加载完毕</p>
<p><code v-pre>loadStatus</code>用<code v-pre>0,1,2</code>三个值代表加载状态</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>	<span class="token comment">&lt;!--商品列表_start--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uni-list</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shop-list<span class="token punctuation">"</span></span> <span class="token attr-name">:border</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uni-list-item</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in shopData<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-item-body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>image</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>img<span class="token punctuation">"</span></span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.url<span class="token punctuation">"</span></span> <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>aspectFill<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>image</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-item-body-desc<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
							<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span><span class="token punctuation">></span></span>{{item.desc}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">></span></span>
							<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>prise<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>￥{{item.prices}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">></span></span>
							<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>buys<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item.buys}}+人已购买<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>uni-list-item</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>load-status<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
				{{loadStatusText[loadStatus]}}
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>uni-list</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后的结果翻到最后一页时
<img src="https://files.mdnice.com/user/24614/195eda64-ff4c-4928-bce9-446ccaa061e2.png" alt=""></p>
<p>当<code v-pre>pageIndex==5</code>时，在线的<code v-pre>mock</code>接口将<code v-pre>hasMore</code>改成false</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">pageIndex</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>
      _req
    <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> _req<span class="token punctuation">.</span>query<span class="token punctuation">.</span>pageIndex
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">pageSize</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>
      _req
    <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> _req<span class="token punctuation">.</span>query<span class="token punctuation">.</span>pageSize
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">hasMore</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>
      _req
    <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>_req<span class="token punctuation">.</span>query<span class="token punctuation">.</span>pageIndex <span class="token operator">*</span> <span class="token number">1</span> <span class="token operator">>=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">"list|10"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token string-property property">'url'</span><span class="token operator">:</span> <span class="token string">"@image('200x100', '#50B347', '#FFF','Web技术学苑')"</span><span class="token punctuation">,</span>
      <span class="token string-property property">'desc'</span><span class="token operator">:</span> <span class="token string">'@ctitle()'</span><span class="token punctuation">,</span>
      <span class="token string-property property">'prices'</span><span class="token operator">:</span> <span class="token string">'@integer(100,1000)'</span><span class="token punctuation">,</span>
      <span class="token string-property property">'buys'</span><span class="token operator">:</span> <span class="token string">'@integer(60,100)'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>主要是完善首页商品列表，通过内置配置实现<code v-pre>下拉刷新</code>与上拉加载</p>
</li>
<li>
<p><code v-pre>pages.json</code>中关键的配置<code v-pre>enablePullDownRefresh</code>，当它为true时会触发页面的<code v-pre>onPullDownRefresh</code>与<code v-pre>onReachBottom</code></p>
</li>
<li>
<p><code v-pre>EazyMock</code>在线模拟了接口，实现假数据的填充</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/uni-app-taobao" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
