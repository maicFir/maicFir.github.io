<template><div><p>在这之前我们通过<code v-pre>uniCloud</code>的云函数与云对象创建了前端的接口，在官方文档里，我们可以看到云函数和云对象是可以<code v-pre>URL</code>化的，也就是说我们写好了云函数和云对象，可以将它们URL化，我们在前端可以通过<code v-pre>uni.request</code>方式调用我们写好的接口，就像后台<code v-pre>java</code>或者<code v-pre>php</code>提供的接口一样在前端使用，当然并不提倡这种方式，<code v-pre>URL</code>的目的主要是给非<code v-pre>uni-app</code>开发的系统能接入<code v-pre>uni-cloud</code>，能够使用<code v-pre>uniCloud</code>的云函数或者云对象，从而有了<code v-pre>URL</code>化的需求</p>
<p>在开始本文之前，主要会从以下几点去认识云函数的<code v-pre>URL</code>化</p>
<ul>
<li>
<p>了解<code v-pre>URL</code>的使用场景，在什么时候可以使用</p>
</li>
<li>
<p>注意云函数<code v-pre>URL</code>的一些事项</p>
</li>
<li>
<p>云函数如何接口URL化，并指定域名绑定</p>
</li>
<li>
<p><code v-pre>apiPost</code>测试我们的云函数接口数据</p>
</li>
<li>
<p><code v-pre>apiPost</code>如何自动生成接口文档</p>
</li>
</ul>
<h3 id="url化使用场景" tabindex="-1"><a class="header-anchor" href="#url化使用场景" aria-hidden="true">#</a> URL化使用场景</h3>
<p>在官方文档里有阐述<a href="https://uniapp.dcloud.net.cn/uniCloud/http.html#" target="_blank" rel="noopener noreferrer">http<ExternalLinkIcon/></a>，我们要使用它就必须知道知道在什么样的情况使用它</p>
<ul>
<li>
<p>在App接入微信支付，需要配置服务器地址，此时需要接口URL</p>
</li>
<li>
<p>在非<code v-pre>uni-app</code>开发的系统，想要连接<code v-pre>uni-cloud</code>读写数据也要通过http url方式访问</p>
</li>
</ul>
<p>通过以上我们就知道一个是在接入微信支付，另一个是在非<code v-pre>uni-app</code>开发的系统，我们其他系统想要用<code v-pre>uni-cloud</code>的服务时，我们就需要url化，因为这样url化后，在其他系统就可以访问我们的接口数据了</p>
<h3 id="云函数接口url的注意事项" tabindex="-1"><a class="header-anchor" href="#云函数接口url的注意事项" aria-hidden="true">#</a> 云函数接口URL的注意事项</h3>
<ul>
<li>主要是为了接口的读写的安全性，我们需要在接口做好权限控制</li>
<li>要防止大量恶意访问接口url，消耗云函数资源，如果遇到这种情况可以停止url访问，避免消耗云函数读写</li>
</ul>
<h3 id="如何接口url化" tabindex="-1"><a class="header-anchor" href="#如何接口url化" aria-hidden="true">#</a> 如何接口url化</h3>
<p>我们在之前创建的云函数中
<img src="https://files.mdnice.com/user/24614/3c7ddc0b-9f3b-4ce4-8dbd-513575186366.png" alt=""></p>
<p>在云函数/云对象中，我们将本地的云函数上传到控制台了，在详情中添加一个基础的路径<code v-pre>/query</code>
<img src="https://files.mdnice.com/user/24614/8923c77c-dbfd-44bb-a7c6-a677fc03f2db.png" alt=""></p>
<p>最后我们使用<code v-pre>apiPost</code>工具测试一下我们的接口,我可以使用在线web，也可以使用客户端应用测试，注意我们配置了接口环境变量这个<code v-pre>baseUrl</code>地址就是我们在这之前添加的地址，比如<code v-pre>https://fc-mp-e770384a-64f6-4f20-903e-57eeaaa86862.next.bspapp.com/query</code>这样的一串地址就是<code v-pre>baseUrl</code>
<img src="https://files.mdnice.com/user/24614/56b300db-ccf6-4e36-b002-79d834b20aba.png" alt="">
<img src="https://files.mdnice.com/user/24614/4932e9f2-360d-4b7e-9442-5d22950eabef.png" alt=""></p>
<p>我们看下查询详情接口,接口后缀就是<code v-pre>queryDetail</code>,注意我们参数是放在<code v-pre>query</code>上的
<img src="https://files.mdnice.com/user/24614/47319513-ac7b-4403-bb4c-83c2ef9e7dfa.png" alt=""></p>
<p>我们看下更新接口，接口地址就是<code v-pre>{{baseUrl}}/update</code>,这个<code v-pre>update</code>就是我们的云对象里面的方法名称，其他接口也是类似，我们更新form数据，此时我们选择body的方式是<code v-pre>form-data</code>
<img src="https://files.mdnice.com/user/24614/f9d59d7a-b50d-48dc-8615-fcc5eb22dfa6.png" alt=""></p>
<h3 id="apipost自动生成接口文档" tabindex="-1"><a class="header-anchor" href="#apipost自动生成接口文档" aria-hidden="true">#</a> apipost自动生成接口文档</h3>
<p>在之前，其实我们的后端写好接口要么放在<code v-pre>yapi</code>上，要么他们后端自己用<code v-pre>word</code>写个接口文档，但是这种过去式的方式有些低效，我们后端接口在自测阶段就可以将一些补充的字段和描述进行实时更新，而不需担心接口字段不同步问题，因为文档可以自动更新</p>
<p>我们看下如何使用<code v-pre>apipost</code>完善接口文档</p>
<p>我们以查询详情为例子
<img src="https://files.mdnice.com/user/24614/a85b30a4-091b-4cf2-8eb4-d5819a93aefb.png" alt="">
当我们依次完善这些备注信息时，我们的接口文档就会很完善,当我们点击最顶部的分享项目时，就可以有一个分享链接，生成接口文档了
<img src="https://files.mdnice.com/user/24614/e0e7e487-5c50-43b4-bfe9-a9d93d1d4680.png" alt=""></p>
<p>我们会发现这个链接的接口文档就很清晰了，可以直接访问这个<a href="https://console-docs.apipost.cn/preview/a8515ffdb2103669/848cbaf24e08a143?target_id=0b961a6d-c969-4438-a5e6-de650e8b41c7" target="_blank" rel="noopener noreferrer">接口地址<ExternalLinkIcon/></a>
<img src="https://files.mdnice.com/user/24614/0ff8d2b0-1c5c-47e9-91e2-4b7fb8cb6539.png" alt=""></p>
<h3 id="绑定域名" tabindex="-1"><a class="header-anchor" href="#绑定域名" aria-hidden="true">#</a> 绑定域名</h3>
<p>我们用<code v-pre>apiPost</code>测试的接口前缀我们使用了变量方式测试，实际上，我想通过域名+接口Path方式去调用接口，所以官方也支持绑定域名方式
<img src="https://files.mdnice.com/user/24614/18a55fae-8b9c-44f9-9b5d-d48e93028066.png" alt=""></p>
<p>我们发现云函数绑定域名是需要填写证书的，此时我们需要登陆我们的阿里云添加免费证书即可,我使用免费证书即可以，一个域名可以有20个免费的证书</p>
<p><img src="https://files.mdnice.com/user/24614/cc353bb1-4848-483f-9a4c-b60ee670355c.png" alt=""></p>
<p>然后证书申请，填写自己项目的域名就行，比如我这个项目的域名就是<code v-pre>tb.wmcweb.cn</code>
<img src="https://files.mdnice.com/user/24614/e5f4838b-dcd1-4f6d-9429-1aa69c216f2d.png" alt=""></p>
<p>大概一分钟左右就审核通过了，我们只需要选择nginx版，下载即可，然后解压，将安装包的key,和pem填入即可
<img src="https://files.mdnice.com/user/24614/8d57ffb3-bdc6-4508-bd8e-c3e317ace411.png" alt=""></p>
<p>你的自定义域名之前必须要在域名解析中添加cname后，才可填入正确的key与pem
<img src="https://files.mdnice.com/user/24614/918165fc-343e-4003-8826-cd047f667014.png" alt=""></p>
<p>当我绑定域名后，我们用<code v-pre>apipost</code>验证一下</p>
<p><img src="https://files.mdnice.com/user/24614/e19a5501-47b6-4daa-bf1a-176280482b6e.png" alt=""></p>
<p>自此我们接口url自定义绑定域名就已经ok了</p>
<h3 id="项目中测试一下接口url的效果" tabindex="-1"><a class="header-anchor" href="#项目中测试一下接口url的效果" aria-hidden="true">#</a> 项目中测试一下接口url的效果</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">queryTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> uni<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
					<span class="token literal-property property">url</span><span class="token operator">:</span><span class="token string">"https://tb.wmcweb.cn/query/query"</span><span class="token punctuation">,</span>
					
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
				console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleQueryData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">queryTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/9967f63d-e60a-4db5-b6f8-53fc3de9e318.png" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>云函数与云对象可以进行url化，我们在有使用<code v-pre>url</code>化时必须知道其使用场景，通常我们需要让非<code v-pre>uni-app</code>项目使用我们的<code v-pre>uniCloud</code>的云数据时，我们就可以通url方式提供给对方，或者使用App<code v-pre>微信支付</code>回调时也需要一个接口地址</p>
</li>
<li>
<p>接口url化，所有配置只需要在<code v-pre>uniCloud</code>后台详情修改配置就行</p>
</li>
<li>
<p>了解如何让接口支持自定义域名，注意得解析添加记录，并在阿里云添加免费证书后，把对应域名的密钥与证书填入即可</p>
</li>
<li>
<p><code v-pre>apipost</code>测试验证接口并生成接口文档</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/uni-app-taobao" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
