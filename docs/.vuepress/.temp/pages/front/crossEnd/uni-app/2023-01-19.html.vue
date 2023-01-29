<template><div><p>在前一篇文章我们对<code v-pre>uni-app</code>有了一个最基础的认识，在开始一个<code v-pre>uni-app</code>项目，<code v-pre>HbuilderX</code>工具已经帮我们初始化好了一个工程化项目，所以此时我们开始<code v-pre>uni-app</code>项目后，一定是根据UI开始切图，所以此时你必须要以最高的标准还原一个小程序或者h5的切图。</p>
<p>正文开始...</p>
<p>在开始本文之前，主要会从以下几个方面去认识<code v-pre>uni-app</code>布局</p>
<ul>
<li>了解最基础常用内置组件</li>
<li>一些常用的内置组件</li>
<li>糊一个淘宝首页以此来熟悉<code v-pre>uni-app</code>中的内置组件</li>
</ul>
<h3 id="切图" tabindex="-1"><a class="header-anchor" href="#切图" aria-hidden="true">#</a> 切图</h3>
<p>我打算以移动端淘宝首页的静态页面来熟悉小程序中布局以及样式的编写</p>
<p><img src="https://files.mdnice.com/user/24614/5c974004-0f22-4426-8e2b-6611d52e77a5.png" alt=""></p>
<p>从结构分析来看，我们把首页主要分为三个模块<code v-pre>header</code>,<code v-pre>content</code>，<code v-pre>tabBar</code></p>
<ul>
<li>设置背景颜色</li>
</ul>
<p>我们发现背景颜色是灰色了，所以在<code v-pre>App.vue</code>中设置全局<code v-pre>page</code>的样式，相当于设置<code v-pre>body</code>的样式</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>&lt;style>
	<span class="token comment">/*每个页面公共css */</span>
<span class="token selector">page</span><span class="token punctuation">{</span>
	<span class="token property">background-color</span><span class="token punctuation">:</span> #f4f4f4<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>header模块</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>top-bar-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>top-bar-header-logo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>top-bar-header-search<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>寻找宝贝店铺<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>搜索<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>top-bar-header-sigin<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在看下对应<code v-pre>css</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>	$<span class="token property">logo</span><span class="token punctuation">:</span> <span class="token string">"https://gw.alicdn.com/imgextra/i4/O1CN019XWXNq1aAPOVMYSiu_!!6000000003289-2-tps-167-63.png"</span><span class="token punctuation">;</span>
	$<span class="token property">singPic</span><span class="token punctuation">:</span> <span class="token string">"https://gw.alicdn.com/imgextra/i4/O1CN01ftum4629SHP6bCqTm_!!6000000008066-2-tps-99-99.png"</span><span class="token punctuation">;</span>
	<span class="token selector">.top-bar-header</span> <span class="token punctuation">{</span>
		<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
		<span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
		<span class="token property">padding</span><span class="token punctuation">:</span> 10rpx 30rpx<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> sticky<span class="token punctuation">;</span>
		<span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
		<span class="token property">top</span><span class="token punctuation">:</span>0<span class="token punctuation">;</span>
		<span class="token property">background-color</span><span class="token punctuation">:</span> #f4f4f4<span class="token punctuation">;</span>
		<span class="token selector">&amp;-logo</span> <span class="token punctuation">{</span>
			<span class="token selector">&amp;::before</span> <span class="token punctuation">{</span>
				<span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
				<span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
				<span class="token property">width</span><span class="token punctuation">:</span> 94rpx<span class="token punctuation">;</span>
				<span class="token property">height</span><span class="token punctuation">:</span> 36rpx<span class="token punctuation">;</span>
				<span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>$logo<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
				<span class="token property">background-size</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
				<span class="token property">background-repeat</span><span class="token punctuation">:</span> no-repeat<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token selector">&amp;-search</span> <span class="token punctuation">{</span>
			<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
			<span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
			<span class="token property">flex</span><span class="token punctuation">:</span>1<span class="token punctuation">;</span>
			<span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ff5000<span class="token punctuation">;</span>
			<span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
			<span class="token property">height</span><span class="token punctuation">:</span> 60rpx<span class="token punctuation">;</span>
			<span class="token property">border-radius</span><span class="token punctuation">:</span> 60rpx<span class="token punctuation">;</span>
			<span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
			<span class="token property">margin</span><span class="token punctuation">:</span> 0 25rpx<span class="token punctuation">;</span>
			<span class="token selector">.text</span> <span class="token punctuation">{</span>
				<span class="token property">text-indent</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
				<span class="token property">font-size</span><span class="token punctuation">:</span>20rpx<span class="token punctuation">;</span>
				<span class="token property">color</span><span class="token punctuation">:</span>#666<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token selector">.btn</span> <span class="token punctuation">{</span>
				<span class="token property">width</span><span class="token punctuation">:</span>120rpx<span class="token punctuation">;</span>
				<span class="token property">height</span><span class="token punctuation">:</span> 54rpx<span class="token punctuation">;</span>
				<span class="token property">line-height</span><span class="token punctuation">:</span> 54rpx<span class="token punctuation">;</span>
				<span class="token property">border-radius</span><span class="token punctuation">:</span> 27px<span class="token punctuation">;</span>
				<span class="token property">font-size</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
				<span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
				<span class="token property">background-color</span><span class="token punctuation">:</span> #FF8D0E<span class="token punctuation">;</span>
				<span class="token property">margin</span><span class="token punctuation">:</span> 0 2rpx<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token selector">&amp;-sigin</span> <span class="token punctuation">{</span>
			<span class="token selector">&amp;::before</span> <span class="token punctuation">{</span>
				<span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
				<span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
				<span class="token property">width</span><span class="token punctuation">:</span> 56rpx<span class="token punctuation">;</span>
				<span class="token property">height</span><span class="token punctuation">:</span> 56rpx<span class="token punctuation">;</span>
				<span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>$singPic<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
				<span class="token property">background-size</span><span class="token punctuation">:</span> 56rpx 56rpx<span class="token punctuation">;</span>
				<span class="token property">background-repeat</span><span class="token punctuation">:</span> no-repeat<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上布局上，我们发现我们的<code v-pre>header</code>组件使用的布局标签就是内置组件<code v-pre>view</code>，<code v-pre>text</code>,然后我们的样式使用的是<code v-pre>scss</code>,你也会发现我们的<code v-pre>logo</code>与<code v-pre>签到</code>使用的是在线图片</p>
<p><code v-pre>为什么我们需要使用在线cdn图片？</code></p>
<p>其实在小程序中，我们很多的资源图片推荐使用在线图片，因为本地加载的图片会增加主包的体积，我们优先考虑<code v-pre>cdn</code>加载图片地址</p>
<p>另外为什么我们使用了伪类去加载图片，个人觉得这种方式比<code v-pre>image</code>标签方式性能要好，因为css是可以被缓存的，所以使用css方式去家在图片，对应的资源更容易缓存，而且减少了小程序页面标签结构。</p>
<p>还有我们的头部使用了一个吸顶的效果</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.top-bar-header</span> <span class="token punctuation">{</span>
		<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
		<span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
		<span class="token property">padding</span><span class="token punctuation">:</span> 10rpx 30rpx<span class="token punctuation">;</span>
		<span class="token property">position</span><span class="token punctuation">:</span> sticky<span class="token punctuation">;</span>
		<span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
		<span class="token property">top</span><span class="token punctuation">:</span>0<span class="token punctuation">;</span>
		<span class="token property">background-color</span><span class="token punctuation">:</span> #f4f4f4<span class="token punctuation">;</span>
   ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>position: sticky</code>吸顶这个特性非常有用，这也是我们在移动端布局优化交互的一种手段，使用它对用户体验来说比较友好。</p>
<p>最后我们看下布局样式后的结果</p>
<p><img src="https://files.mdnice.com/user/24614/4533d324-f00e-49c8-a5a8-ec5399596d49.png" alt=""></p>
<p>在顶部已经布局完了，我们再来看下内容区域部分</p>
<ul>
<li>content</li>
</ul>
<p>在内容区域我们发现最顶部是一个可滑动区域的模块，也是一个导航模块，我们暂且叫做<code v-pre>分类模块</code></p>
<p>在这块布局我主要是考虑这样的结构</p>
<p><img src="https://files.mdnice.com/user/24614/93ffa16b-b576-4a74-9f02-419cd365df97.png" alt=""></p>
<p>看下结构</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content-wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--分类_start--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scroll-view</span>  <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classify<span class="token punctuation">"</span></span> <span class="token attr-name">:scroll-x</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classify-item<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in classifyData<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classify-item-sub<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(sub, sindex) in item<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sindex<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>image</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sub.url<span class="token punctuation">"</span></span> <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>aspectFill<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>image</span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span><span class="token punctuation">></span></span>{{sub.text}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scroll-view</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--分类_end--></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们使用了一个内置<code v-pre>scroll-view</code>内置组件，通常在滑动区域我们就要考虑使用这个组件，我么设置<code v-pre>scroll-x=true</code>水平方向可以滚动，默认是<code v-pre>xy</code>轴方向不会滚动</p>
<p>写了结构后，我们看下<code v-pre>scss</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.content-wrap</span> <span class="token punctuation">{</span>
		<span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
		<span class="token selector">.classify</span> <span class="token punctuation">{</span>
			<span class="token property">margin</span><span class="token punctuation">:</span> 30rpx 0 10rpx<span class="token punctuation">;</span>
			<span class="token property">padding</span><span class="token punctuation">:</span> 10rpx 0<span class="token punctuation">;</span>
			<span class="token property">width</span><span class="token punctuation">:</span> 94%<span class="token punctuation">;</span>
			<span class="token property">height</span><span class="token punctuation">:</span> 320rpx<span class="token punctuation">;</span>
			<span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
			<span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
			<span class="token property">border-radius</span><span class="token punctuation">:</span> 30rpx<span class="token punctuation">;</span>
			<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>3%<span class="token punctuation">,</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
			<span class="token selector">/deep/ .uni-scroll-view</span> <span class="token punctuation">{</span>
				<span class="token property">-webkit-overflow-scrolling</span><span class="token punctuation">:</span> touch<span class="token punctuation">;</span>
				<span class="token selector">&amp;::-webkit-scrollbar</span> <span class="token punctuation">{</span>
					<span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token selector">&amp;-item</span> <span class="token punctuation">{</span>
					<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
					<span class="token property">width</span><span class="token punctuation">:</span>100%<span class="token punctuation">;</span>
				<span class="token selector">&amp;-sub</span> <span class="token punctuation">{</span>
					<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
					<span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
          <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
					<span class="token property">width</span><span class="token punctuation">:</span> 150rpx<span class="token punctuation">;</span>
					<span class="token property">font-size</span><span class="token punctuation">:</span>26rpx<span class="token punctuation">;</span>
					<span class="token property">margin-left</span><span class="token punctuation">:</span> 7rpx<span class="token punctuation">;</span>
					<span class="token selector">image</span> <span class="token punctuation">{</span>
						<span class="token property">width</span><span class="token punctuation">:</span>134rpx<span class="token punctuation">;</span>
						<span class="token property">height</span><span class="token punctuation">:</span>104rpx<span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现这个分类左右有间隙，所以宽度需要设置一个自适应的值，这个宽度你不能写<code v-pre>100%</code>,否则右边的间距，你始终无法空出来，所以，我们这里采用取巧的办法，宽度设置<code v-pre>94%</code>,然后设置<code v-pre>transform:translate(3%, 0)</code>移动自身<code v-pre>x</code>轴线的距离</p>
<p>另外，我们发现每一个<code v-pre>item-sub</code>都有设置固定的宽度，这是需要设置的，为了一整屏显示恰好是5个，所以需要设置一个合适的宽度即可。并且我们有设置<code v-pre>margin-left: 7rpx</code></p>
<p>我们看下绑定的数据部分</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>	<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">classifyData</span><span class="token operator">:</span> <span class="token punctuation">[</span>
					<span class="token punctuation">[</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"天猫新品"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"今日爆款"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i3/O1CN01FgQFp81spmBXqQMtA_!!6000000005816-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"天猫国际"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i1/O1CN01tsk5OY1q0MUo5PJga_!!6000000005433-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"飞猪旅行"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"天猫超市"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"冬奥公益"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i4/O1CN01VuRfwH1muSbsJFxoM_!!6000000005014-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"淘宝票"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i2/O1CN01qrrUAN1wRjrhtfk6Q_!!6000000006305-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"天猫好房"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i3/O1CN01MiunNU1oU0uEKRvja_!!6000000005227-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">]</span><span class="token punctuation">,</span>
					<span class="token punctuation">[</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"淘宝吃货"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i1/O1CN018Ilnep1Qt9ryh1Vue_!!6000000002033-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"省钱卡"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i2/O1CN01gUIFrA1OuPj70aTIW_!!6000000001765-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"领淘金币"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i3/O1CN013WcsZW1jfr4AXnmVl_!!6000000004576-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"阿里拍卖"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i2/O1CN01ZOR1cv1yjGFORGh1V_!!6000000006614-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"分类"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/tfs/TB1WgOmesieb18jSZFvXXaI3FXa-183-144.png_q90.jpg_.webp?getAvatar=1"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"咸鱼"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i1/O1CN01rIm4u11F81KogrKz4_!!6000000000441-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"土货鲜食"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i1/O1CN019LbO921EcsOuQqWTM_!!6000000000373-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"天猫汽车"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/imgextra/i4/O1CN01cxU47W1RnUaWavX3f_!!6000000002156-2-tps-183-144.png_q90.jpg_.webp"</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">]</span>
				<span class="token punctuation">]</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有人好奇，为什么我这是一个二维数组，正常情况下，后端给的动态接口数据肯定是一维的，怎么现在你渲染就变成二维的了？那是不是要跑去跟后端同学说，大兄弟，你的数据结构不符合我前端渲染要求，你能不能换成我这样的二维数组。</p>
<p><code v-pre>no</code>,只要是我们前端能解决的，我们尽量不要麻烦后端，无论是一维还是多维，数据在手，天下我有，拿到数据，我们就可以改在成我任意数据结构。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'天猫新品'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">''</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'今日爆款'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">''</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'天猫国际'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">''</span>
  <span class="token punctuation">}</span>
  <span class="token operator">...</span>
<span class="token punctuation">]</span>
<span class="token keyword">var</span> <span class="token function-variable function">proxyTarnsdata</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> limit <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> row<span class="token operator">=</span><span class="token number">2</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> len <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>length <span class="token operator">/</span> row<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>len<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> data<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>index<span class="token operator">*</span>limit<span class="token punctuation">,</span> limit<span class="token operator">*</span> <span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">proxyTarnsdata</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">/*
[
  [1,2],
  [3,4],
  [5,6],
  [7,8],
  [9, 10],
  [11]
]
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过以上一个<code v-pre>proxyTarnsdata</code>方法就可以将数组分割成我们想要的数据</p>
<p>最后我们看下最终布局效果</p>
<p>第一页默认数据
<img src="https://files.mdnice.com/user/24614/a74a6f59-3030-4d86-a24a-64c4ad21dd51.png" alt="">
滑动到第二页数据
<img src="https://files.mdnice.com/user/24614/53e8c997-a882-4810-b6d6-0d85031fd0f5.png" alt=""></p>
<p>在样式中，你会发现<code v-pre>css</code>中有这样的一段代码</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">/deep/ .uni-scroll-view</span> <span class="token punctuation">{</span>
    <span class="token property">-webkit-overflow-scrolling</span><span class="token punctuation">:</span> touch<span class="token punctuation">;</span>
    <span class="token selector">&amp;::-webkit-scrollbar</span> <span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的处理在业务中实际上是很常见，首先我么有用<code v-pre>/deep/</code>这样的一个深度选择器，通常来说是我们要修改第三方默认UI样式，除了这个我们有隐藏原生的滚动条，但是这并不会影响页面的横向滚动，在移动端可以这么做，要么设置一个好看的样式滚动条，但实际上原生滚动条样式在移动端确实有点丑了，所以这算是页面样式优化的一个点。</p>
<p><code v-pre>overflow-scrolling:touch</code>这个可以让页面滑动更流畅</p>
<ul>
<li>商品区域</li>
</ul>
<p>这部分比较简单，主要是固定四个模块</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!--货物分类_start--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>veiw</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>goods<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in goodsList<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-wrap<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(subItem, sindex) in item<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sindex<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{subItem.text}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[<span class="token punctuation">'</span>tag<span class="token punctuation">'</span>, subItem.tagClass]<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{subItem.tag}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-lf<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
							<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>image</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>subItem.lf<span class="token punctuation">"</span></span> <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>aspectFill<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>image</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item-rt<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
							<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>image</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>subItem.rl<span class="token punctuation">"</span></span> <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>aspectFill<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>image</span><span class="token punctuation">></span></span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>veiw</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--货物分类_end--></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再看下对应绑定的数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">goodsList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
					<span class="token punctuation">[</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'聚划算'</span><span class="token punctuation">,</span>
							<span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">"品牌折扣"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">lf</span><span class="token operator">:</span> <span class="token string">'//gw.alicdn.com/tps/O1CN01y2pvJj1QCZ62MzJpO_!!6000000001940-0-yinhe.jpg_140x140q90.jpg_.webp'</span><span class="token punctuation">,</span>
							<span class="token literal-property property">rl</span><span class="token operator">:</span> <span class="token string">'//gw.alicdn.com/tps/O1CN01YYixvu1hlgwUB7cJE_!!6000000004318-0-yinhe.jpg_180x180q90.jpg_.webp'</span><span class="token punctuation">,</span>
							<span class="token literal-property property">tagClass</span><span class="token operator">:</span> <span class="token string">"jhs"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'有好货'</span><span class="token punctuation">,</span>
							<span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">"好口碑"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">lf</span><span class="token operator">:</span> <span class="token string">'//gw.alicdn.com/tps/O1CN01t8hkxx1l7AOFWyMym_!!6000000004771-0-yinhe.jpg_140x140q90.jpg_.webp'</span><span class="token punctuation">,</span>
							<span class="token literal-property property">rl</span><span class="token operator">:</span> <span class="token string">'//gw.alicdn.com/tps/O1CN01IhbCD928CsXHRBzOP_!!6000000007897-0-yinhe.jpg_180x180q90.jpg_.webp'</span><span class="token punctuation">,</span>
							<span class="token literal-property property">tagClass</span><span class="token operator">:</span> <span class="token string">"hkb"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">]</span><span class="token punctuation">,</span>
					<span class="token punctuation">[</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"天天特卖"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">"1元秒杀"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">lf</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/tps/O1CN01sXaXqO1l5KpDBiueI_!!6000000004767-0-yinhe.jpg_140x140q90.jpg_.webp"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">rl</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/tps/TB1hevqDYj1gK0jSZFOSuw7GpXa.jpg_180x180q90.jpg_.webp"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">tagClass</span><span class="token operator">:</span> <span class="token string">"tttm"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
						<span class="token punctuation">{</span>
							<span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"每日好店"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">"头条"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">lf</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/tps/O1CN01UDLq5p1OdTBxWkrJk_!!6000000001728-0-yinhe.jpg_140x140q90.jpg_.webp"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">rl</span><span class="token operator">:</span> <span class="token string">"//gw.alicdn.com/tps/O1CN018R31ZP1CbNjUG4pee_!!99-0-lubanu.jpg_180x180q90.jpg_.webp"</span><span class="token punctuation">,</span>
							<span class="token literal-property property">tagClass</span><span class="token operator">:</span> <span class="token string">"mehd"</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">]</span>
				<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现<code v-pre>goodslist</code>依旧是一个二维数组，其实我们布局这样的结构主要有以下几种方案</p>
<ul>
<li>
<p>一维数据结构，采用换行，每一项item设置宽度<code v-pre>50%</code>,然后换行</p>
</li>
<li>
<p>二维数组，采用左右结构，然后子元素<code v-pre>flex：1</code>处理等分父元素</p>
</li>
</ul>
<p>这里我才用的是第二种方案，数据结构不同，采取的布局方案会稍有不同。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@mixin</span> <span class="token function">tagStyle</span><span class="token punctuation">(</span>$bgColor<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
		<span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
		<span class="token property">border-radius</span><span class="token punctuation">:</span> 5rpx<span class="token punctuation">;</span>
		<span class="token property">padding</span><span class="token punctuation">:</span> 0 5rpx<span class="token punctuation">;</span>
		<span class="token property">background-color</span><span class="token punctuation">:</span> $bgColor<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token atrule"><span class="token rule">@mixin</span> set_width_<span class="token function">height</span><span class="token punctuation">(</span>$w<span class="token punctuation">,</span> $h<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
		<span class="token property">width</span><span class="token punctuation">:</span> $w<span class="token punctuation">;</span>
		<span class="token property">height</span><span class="token punctuation">:</span> $h
	<span class="token punctuation">}</span>
	<span class="token selector">.content-wrap</span> <span class="token punctuation">{</span>
		<span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
		<span class="token selector">.classify</span> <span class="token punctuation">{</span>
			<span class="token property">margin</span><span class="token punctuation">:</span> 30rpx 0 10rpx<span class="token punctuation">;</span>
			<span class="token property">padding</span><span class="token punctuation">:</span> 10rpx 0<span class="token punctuation">;</span>
			<span class="token property">width</span><span class="token punctuation">:</span> 94%<span class="token punctuation">;</span>
			<span class="token property">height</span><span class="token punctuation">:</span> 320rpx<span class="token punctuation">;</span>
			<span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
			<span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
			<span class="token property">border-radius</span><span class="token punctuation">:</span> 30rpx<span class="token punctuation">;</span>
			<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>3%<span class="token punctuation">,</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
			<span class="token selector">/deep/ .uni-scroll-view</span> <span class="token punctuation">{</span>
				<span class="token property">-webkit-overflow-scrolling</span><span class="token punctuation">:</span> touch<span class="token punctuation">;</span>
				<span class="token selector">&amp;::-webkit-scrollbar</span> <span class="token punctuation">{</span>
					<span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token selector">&amp;-item</span> <span class="token punctuation">{</span>
					<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
					<span class="token property">width</span><span class="token punctuation">:</span>100%<span class="token punctuation">;</span>
				<span class="token selector">&amp;-sub</span> <span class="token punctuation">{</span>
					<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
					<span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
					<span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
					<span class="token property">width</span><span class="token punctuation">:</span> 150rpx<span class="token punctuation">;</span>
					<span class="token property">font-size</span><span class="token punctuation">:</span>26rpx<span class="token punctuation">;</span>
					<span class="token property">margin-left</span><span class="token punctuation">:</span> 7rpx<span class="token punctuation">;</span>
					<span class="token selector">image</span> <span class="token punctuation">{</span>
						<span class="token property">width</span><span class="token punctuation">:</span>134rpx<span class="token punctuation">;</span>
						<span class="token property">height</span><span class="token punctuation">:</span>104rpx<span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token selector">.goods</span> <span class="token punctuation">{</span>
			<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
			<span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
			<span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
			<span class="token property">border-radius</span><span class="token punctuation">:</span> 30rpx<span class="token punctuation">;</span>
			<span class="token property">margin</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
			<span class="token selector">.item</span> <span class="token punctuation">{</span>
				<span class="token property">flex</span><span class="token punctuation">:</span>1<span class="token punctuation">;</span>
				<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
				<span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 10rpx 0<span class="token punctuation">;</span>
				<span class="token selector">&amp;:first-child, &amp;:last-child</span> <span class="token punctuation">{</span>
					<span class="token selector">.item-wrap</span> <span class="token punctuation">{</span>
						<span class="token selector">&amp;:last-child</span> <span class="token punctuation">{</span>
							<span class="token property">border-bottom</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			
				<span class="token selector">&amp;:last-child</span> <span class="token punctuation">{</span>
					<span class="token selector">.item-wrap</span> <span class="token punctuation">{</span>
						<span class="token selector">&amp;:first-child</span> <span class="token punctuation">{</span>
							<span class="token property">border-right</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						<span class="token selector">&amp;:last-child</span> <span class="token punctuation">{</span>
							<span class="token property">border-right</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
				<span class="token selector">.item-wrap</span> <span class="token punctuation">{</span>
					<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
					<span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
					<span class="token property">border-right</span><span class="token punctuation">:</span> 1px solid #e5e5e5<span class="token punctuation">;</span>
					<span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid #e5e5e5<span class="token punctuation">;</span>
					
					<span class="token selector">.item-header</span> <span class="token punctuation">{</span>
						<span class="token selector">.title</span> <span class="token punctuation">{</span>
							<span class="token property">font-size</span><span class="token punctuation">:</span> 35rpx<span class="token punctuation">;</span>
							<span class="token property">color</span><span class="token punctuation">:</span> #111<span class="token punctuation">;</span>
							<span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
							<span class="token property">padding</span><span class="token punctuation">:</span> 25rpx 15rpx<span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						<span class="token selector">.tag</span> <span class="token punctuation">{</span>
							<span class="token property">font-size</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
							<span class="token selector">&amp;.jhs, &amp;.tttm</span> <span class="token punctuation">{</span>
								<span class="token atrule"><span class="token rule">@include</span> <span class="token function">tagStyle</span><span class="token punctuation">(</span>#ff4200<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
							<span class="token punctuation">}</span>
							<span class="token selector">&amp;.hkb</span> <span class="token punctuation">{</span>
								<span class="token atrule"><span class="token rule">@include</span> <span class="token function">tagStyle</span><span class="token punctuation">(</span>#0090ea<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
							<span class="token punctuation">}</span>
							<span class="token selector">&amp;.mehd</span> <span class="token punctuation">{</span>
								<span class="token atrule"><span class="token rule">@include</span> <span class="token function">tagStyle</span><span class="token punctuation">(</span>#ff9711<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span>
					<span class="token selector">.item-content</span> <span class="token punctuation">{</span>
						<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
						<span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
						<span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
						<span class="token selector">.item-lf</span> <span class="token punctuation">{</span>
							<span class="token selector">image</span> <span class="token punctuation">{</span>
								<span class="token atrule"><span class="token rule">@include</span> set_width_<span class="token function">height</span><span class="token punctuation">(</span>126rpx<span class="token punctuation">,</span> 126rpx<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
								<span class="token property">margin-left</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span>
						<span class="token selector">.item-rt</span> <span class="token punctuation">{</span>
							<span class="token property">align-self</span><span class="token punctuation">:</span> flex-end<span class="token punctuation">;</span>
							<span class="token selector">image</span> <span class="token punctuation">{</span>
								<span class="token atrule"><span class="token rule">@include</span> set_width_<span class="token function">height</span><span class="token punctuation">(</span>160rpx<span class="token punctuation">,</span> 160rpx<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
							<span class="token punctuation">}</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
				
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里讲解下关键的两个函数<code v-pre>tagStyle</code>与<code v-pre>set_width_height</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@mixin</span> <span class="token function">tagStyle</span><span class="token punctuation">(</span>$bgColor<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
		<span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
		<span class="token property">border-radius</span><span class="token punctuation">:</span> 5rpx<span class="token punctuation">;</span>
		<span class="token property">padding</span><span class="token punctuation">:</span> 0 5rpx<span class="token punctuation">;</span>
		<span class="token property">background-color</span><span class="token punctuation">:</span> $bgColor<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token atrule"><span class="token rule">@mixin</span> set_width_<span class="token function">height</span><span class="token punctuation">(</span>$w<span class="token punctuation">,</span> $h<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
		<span class="token property">width</span><span class="token punctuation">:</span> $w<span class="token punctuation">;</span>
		<span class="token property">height</span><span class="token punctuation">:</span> $h
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们页面有这样类似的标签样式代码，所以我们利用了一个<code v-pre>scss</code>的<code v-pre>mixin</code>极大的减少了重复代码，别忘记了<code v-pre>scss</code>内置了<code v-pre>mixin</code>这样好用方案，真的让你少写很多重复的代码</p>
<p>最后看下页面完成布局后的效果</p>
<p><img src="https://files.mdnice.com/user/24614/f0f4a1a9-c435-4dcd-bfc2-d870ad628dc2.png" alt=""></p>
<ul>
<li>商品列表
商品列表我们这里采用的官方推荐的组件<a href="https://uniapp.dcloud.net.cn/component/uniui/uni-list.html" title="uni-list" target="_blank" rel="noopener noreferrer">uni-list<ExternalLinkIcon/></a></li>
</ul>
<p>因为这个组件官方有多大数据渲染的长列表优化，所以肯定比我们普通的获取数据，并直接渲染性能更高些</p>
<p>不过在用这个组件前，我们需要到官方插件市场去安装</p>
<p><img src="https://files.mdnice.com/user/24614/1a96f77c-61b5-4997-9618-0e03d2b1eb57.png" alt=""></p>
<p>直接导入<code v-pre>HbuilderX</code>中安装即可全局使用</p>
<p>当我们安装导入到我们自己项目时，我们的<code v-pre>uni_modules</code>中就有一个<code v-pre>uni-list</code>组件</p>
<p>在之前一篇文章中有写到,像这样导入的插件是自动注册的，所以在我们的页面组件中可以使用</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!--商品列表_start--></span>
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
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>uni-list</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--商品列表_end--></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>uni-list</code>就是官方的一个插件，当我们在官方市场导入项目时，我们就可以像上面一样使用了</p>
<p>我们看下对应的css</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.shop-list</span> <span class="token punctuation">{</span>
			<span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
			<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
			<span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
			<span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
			<span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
			<span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
			<span class="token property">padding</span><span class="token punctuation">:</span> 0 20rpx<span class="token punctuation">;</span>
			<span class="token selector">/deep/</span> <span class="token punctuation">{</span>
				<span class="token selector">.uni-list-item__container</span> <span class="token punctuation">{</span>
					<span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>	
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token selector">.card-item-body</span> <span class="token punctuation">{</span>
				<span class="token property">width</span><span class="token punctuation">:</span>340rpx<span class="token punctuation">;</span>
				<span class="token property">border-radius</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
				<span class="token property">padding-bottom</span><span class="token punctuation">:</span> 10rpx<span class="token punctuation">;</span>
				<span class="token selector">&amp;-desc</span> <span class="token punctuation">{</span>
					<span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
					<span class="token property">height</span><span class="token punctuation">:</span> 75rpx<span class="token punctuation">;</span>
					<span class="token property">padding</span><span class="token punctuation">:</span> 20rpx 10rpx<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token selector">.prise</span> <span class="token punctuation">{</span>
					<span class="token property">color</span><span class="token punctuation">:</span> #ff5500<span class="token punctuation">;</span>
					<span class="token property">font-size</span><span class="token punctuation">:</span> 28rpx<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token selector">.buys</span> <span class="token punctuation">{</span>
					<span class="token property">color</span><span class="token punctuation">:</span> #999<span class="token punctuation">;</span>
					<span class="token property">padding-left</span><span class="token punctuation">:</span> 10rpx<span class="token punctuation">;</span>
					<span class="token property">font-size</span><span class="token punctuation">:</span>22rpx<span class="token punctuation">;</span>
					
				<span class="token punctuation">}</span>
				<span class="token selector">.img</span> <span class="token punctuation">{</span>
					<span class="token property">width</span><span class="token punctuation">:</span>100%<span class="token punctuation">;</span>
					<span class="token property">height</span><span class="token punctuation">:</span> 342rpx<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
<span class="token selector">.footer</span> <span class="token punctuation">{</span>
			<span class="token property">background-color</span><span class="token punctuation">:</span> #4e525e<span class="token punctuation">;</span>
			<span class="token selector">.footer-wrap</span> <span class="token punctuation">{</span>
				<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
				<span class="token property">justify-content</span><span class="token punctuation">:</span> space-around<span class="token punctuation">;</span>
				<span class="token property">padding</span><span class="token punctuation">:</span> 20rpx 0<span class="token punctuation">;</span>
				<span class="token property">color</span><span class="token punctuation">:</span> #c3c6ca<span class="token punctuation">;</span>
				<span class="token selector">.btn</span> <span class="token punctuation">{</span>
					<span class="token property">border</span><span class="token punctuation">:</span> 1px solid #42454d<span class="token punctuation">;</span>
					<span class="token property">background-color</span><span class="token punctuation">:</span> #555965<span class="token punctuation">;</span>
					<span class="token property">border-radius</span><span class="token punctuation">:</span> 12rpx<span class="token punctuation">;</span>
					<span class="token property">padding</span><span class="token punctuation">:</span> 10rpx 34rpx<span class="token punctuation">;</span>
					<span class="token property">font-size</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token selector">&amp;-timer</span> <span class="token punctuation">{</span>
				<span class="token property">font-size</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
				<span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
				<span class="token property">color</span><span class="token punctuation">:</span>#c3c6ca<span class="token punctuation">;</span>
				<span class="token property">padding-bottom</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外还有一个底部页脚</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>	<span class="token comment">&lt;!--底部_start--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer-wrap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in footerData<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
					{{item.text}}
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer-timer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
				@2022-Web技术学苑
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
			
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--底部_end--></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看下最终的布局效果</p>
<p><img src="https://files.mdnice.com/user/24614/812de1e1-8190-48c6-8759-7f149ee5bf47.png" alt=""></p>
<ul>
<li>tabBar底部切换</li>
</ul>
<p>关于<code v-pre>tabBar</code>其实在第一篇文章就已有讲过，实际上是在<code v-pre>pages.json</code>中配置</p>
<p>为什么不自己布局底部的<code v-pre>tabBar</code>呢？</p>
<p>其实官方采用这种方案肯定是有自己的考量，就是要磨平不同端的差异，所以不需要用户自己开发一个底部的<code v-pre>tab</code>切换，而是通过统一配置就行</p>
<p>在<a href="https://uniapp.dcloud.net.cn/collocation/pages.html#tabbar" title="tabBar" target="_blank" rel="noopener noreferrer">tabBar<ExternalLinkIcon/></a>中我们可以看到</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"tabBar"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token property">"color"</span><span class="token operator">:</span> <span class="token string">"#7A7E83"</span><span class="token punctuation">,</span>
		<span class="token property">"selectedColor"</span><span class="token operator">:</span> <span class="token string">"#3cc51f"</span><span class="token punctuation">,</span>
		<span class="token property">"borderStyle"</span><span class="token operator">:</span> <span class="token string">"black"</span><span class="token punctuation">,</span>
		<span class="token property">"backgroundColor"</span><span class="token operator">:</span> <span class="token string">"#ffffff"</span><span class="token punctuation">,</span>
		<span class="token property">"height"</span><span class="token operator">:</span> <span class="token string">"60px"</span><span class="token punctuation">,</span>
		<span class="token property">"list"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
			<span class="token property">"pagePath"</span><span class="token operator">:</span> <span class="token string">"pages/index/index"</span><span class="token punctuation">,</span>
			<span class="token property">"iconPath"</span><span class="token operator">:</span> <span class="token string">"https://img.alicdn.com/imgextra/i2/O1CN01OStgh21aWOP69RsTZ_!!6000000003337-2-tps-63-63.png"</span><span class="token punctuation">,</span>
			<span class="token property">"selectedIconPath"</span><span class="token operator">:</span> <span class="token string">"https://img.alicdn.com/imgextra/i1/O1CN01oAxBQ81qF1EZtn4Rq_!!6000000005465-2-tps-108-108.png"</span><span class="token punctuation">,</span>
			<span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">""</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
			<span class="token property">"pagePath"</span><span class="token operator">:</span> <span class="token string">"pages/shop/shop"</span><span class="token punctuation">,</span>
			<span class="token property">"iconPath"</span><span class="token operator">:</span> <span class="token string">"https://img.alicdn.com/imgextra/i3/O1CN0151qDFg2AN4Vma3SdE_!!6000000008190-2-tps-63-63.png"</span><span class="token punctuation">,</span>
			<span class="token property">"selectedIconPath"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
			<span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"购物车"</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>
			<span class="token property">"pagePath"</span><span class="token operator">:</span> <span class="token string">"pages/my/my"</span><span class="token punctuation">,</span>
			<span class="token property">"iconPath"</span><span class="token operator">:</span> <span class="token string">"https://img.alicdn.com/imgextra/i3/O1CN01nOAkIZ1ou7XqRzXEZ_!!6000000005284-2-tps-63-63.png"</span><span class="token punctuation">,</span>
			<span class="token property">"selectedIconPath"</span><span class="token operator">:</span> <span class="token string">"https://img.alicdn.com/imgextra/i1/O1CN01gJdKCx1sB10EydwbE_!!6000000005727-2-tps-63-63.png"</span><span class="token punctuation">,</span>
			<span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"我的淘宝"</span>
		<span class="token punctuation">}</span>
		<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在首页有使用一张透明图，此时你需要修改tabBar样式,正常情况，你需要在<code v-pre>App.vue</code>文件中修改</p>
<p><code v-pre>App.vue</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.pages-index-index</span> <span class="token punctuation">{</span>
	<span class="token selector">uni-tabbar</span> <span class="token punctuation">{</span>
		<span class="token selector">.uni-tabbar</span> <span class="token punctuation">{</span>
			<span class="token selector">.uni-tabbar__item</span> <span class="token punctuation">{</span>
				<span class="token selector">&amp;:nth-of-type(2)</span> <span class="token punctuation">{</span>
					<span class="token selector">.uni-tabbar__bd</span> <span class="token punctuation">{</span>
						<span class="token property">background-color</span><span class="token punctuation">:</span> #FF8D0E<span class="token punctuation">;</span>
						<span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
						<span class="token property">width</span><span class="token punctuation">:</span> 100rpx<span class="token punctuation">;</span>
						<span class="token property">height</span><span class="token punctuation">:</span> 100rpx <span class="token important">!important</span><span class="token punctuation">;</span>
						<span class="token selector">img</span> <span class="token punctuation">{</span>
							<span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
							<span class="token property">height</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
							<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们看下最终结果</p>
<p><img src="https://files.mdnice.com/user/24614/5ae0ca1d-a5a3-4ce5-91be-75d676a04d92.png" alt=""></p>
<p>这样我们用<code v-pre>uni-app</code>切了一张移动端淘宝的首页，还算完美，估计细节间距还要磨改，因为设计师的眼睛很毒，你这还原度太低了，这里要改，那里要改...，一个卑微的切图工具人，太惨了...</p>
<p>拿我大刀来，再说还原度不行，改个颜色一次，请自觉扫描五块钱...</p>
<p><img src="https://img.soogif.com/T6JR1mChXWr1xpChOzrxE7FEXIXuyvTi.gif?scope=mdnice" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>就是用<code v-pre>uni-app</code>的一些内置组件还原了淘宝首页</p>
</li>
<li>
<p>我们布局时候发现，所有的标签都是<code v-pre>view</code>与几个<code v-pre>text</code>，还有我们所用到的，<code v-pre>image</code>,<code v-pre>uni-list</code>、<code v-pre>uni-list-item</code>,布局好像没用太多的内置组件，写样式还是一样，没有任何区别</p>
</li>
<li>
<p>不知道你注意到没，我们的单位是用<code v-pre>rpx</code>,这在小程序中是一种响应式单位，其实在移动端自适应中，我们推崇<code v-pre>rpx</code>，<code v-pre>uni-app</code>支持了<code v-pre>h5</code>与<code v-pre>小程序</code>同时能用<code v-pre>rpx</code>，所以在<code v-pre>uni-app</code>
中单位就用<code v-pre>rpx</code>,<code v-pre>1px = 2rpx</code>,当你量得设计稿尺寸是100px时，换成<code v-pre>rpx</code>就是<code v-pre>200rpx</code>,<code v-pre>uni-app</code>会在最后的页面中帮你计算出来</p>
</li>
<li>
<p>分享了<code v-pre>scss</code>中关于<code v-pre>mixin</code>的用法，可以大大提高代码的复用度和可维护性</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/uni-app/02-uni-demo" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
