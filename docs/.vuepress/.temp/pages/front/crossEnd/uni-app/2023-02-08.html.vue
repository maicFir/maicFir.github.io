<template><div><p>在这之前我们已经将一个<a href="https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&amp;mid=2247491952&amp;idx=1&amp;sn=23ba0beebea7a50443576d83dffc5427&amp;chksm=c36bd802f41c5114aa20d8f33b16b6ece27d39b45e49d2acad2b9099ece5f2da6b559bfaddc8#rd" target="_blank" rel="noopener noreferrer">淘宝首页<ExternalLinkIcon/></a>进行的UI切图，在过去我们的静态资源都是直接放到自己的服务器里，<code v-pre>nginx</code>配置好接口代理，每次打包都需要将打包后的资源，上传到自己服务器的对应目录中，如果是<code v-pre>uni-app</code>呢，一切变得简单，<a href="https://unicloud.dcloud.net.cn/" title="uni-clound" target="_blank" rel="noopener noreferrer">uni-clound<ExternalLinkIcon/></a>提供了静态资源服务，打包后的代码可以直接托管到云端里</p>
<p>在本文开始之前，主要会从以下方面认识<code v-pre>uni-cloud</code>的云端部署</p>
<ul>
<li>需要关联一个云服务空间</li>
<li><code v-pre>uni-app</code>打包前端静态文件部署到云服务空间并在线访问</li>
<li>绑定自定义域名</li>
</ul>
<p>正文开始...</p>
<h3 id="关联云服务空间" tabindex="-1"><a class="header-anchor" href="#关联云服务空间" aria-hidden="true">#</a> 关联云服务空间</h3>
<p>在<code v-pre>uni-app</code>中，我们的<code v-pre>云开发</code>都需要关联一个服务空间，<code v-pre>一个空间</code>可以关联<code v-pre>多个应用</code>，<code v-pre>一个应用</code>只能关联<code v-pre>一个空间</code></p>
<p><img src="https://files.mdnice.com/user/24614/31957869-248c-4896-9e74-68a1198ab34a.png" alt=""></p>
<p>在关联服务空间前，我们首先要新建空间，在<a href="https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&amp;mid=2247491927&amp;idx=1&amp;sn=e2899a0094b62b1e39572dd3604fff28&amp;chksm=c36bd825f41c51339667424cb01b8b00d8f31e33d6c45f3efd10146fb37dd7b1964346954e5e#rd" target="_blank" rel="noopener noreferrer">uni-app修仙笔记，炼气期入门<ExternalLinkIcon/></a>这篇文章我们有讲过，我们的项目里有一个文件夹<code v-pre>uniCloud</code>，右键关联服务空间</p>
<p><img src="https://files.mdnice.com/user/24614/0ac6a070-7522-4834-9332-49b0e123d15d.png" alt=""></p>
<p>点击新建一个服务空间
<img src="https://files.mdnice.com/user/24614/dbbac56e-1c85-4c24-b64e-c4a2061a4763.png" alt=""></p>
<p>在服务空间，有两种选择，一般我们选择阿里云，因为我自己买的域名服务器就是阿里云的，并且腾讯云不支持免费，所以还是选择限量版阿里云吧，不过我们发现免费的开发版，实际上云函数调用次数，云数据库读取次数都会非常有限，一天只能500次操作，所以用完了话就只能等第二天了。</p>
<p>如果是一个线上自己的项目还是可以选择<code v-pre>包年包月</code>或者<code v-pre>按量计费</code>,一个月5块钱，也算是非常良心了。</p>
<p>当我们开通后，我们大概需要等待10min，我们关联新创建的服务空间
<img src="https://files.mdnice.com/user/24614/19b08213-4d93-4a6a-9035-ac63352d008a.png" alt=""></p>
<p>我们进入我们创建的云空间可以看到是下面这样的</p>
<p><img src="https://files.mdnice.com/user/24614/3d5d32de-ca5c-4835-a38a-e08ddf5ec860.png" alt=""></p>
<ul>
<li>概览</li>
</ul>
<p>我们创建云空间的一些基本信息，可以实时看到我们云函数使用的数量</p>
<ul>
<li>云数据库</li>
</ul>
<p>基本上我们所有数据库操作表的一些相关表，这里在后面云开发时我们会详细介绍</p>
<ul>
<li>云存储</li>
</ul>
<p>在<code v-pre>uni-app</code>所有上传的图片会存放在这里，你也可以上传一些自己的文件，可以把这个当成一个自己的<code v-pre>cdn</code>在线服务器地址</p>
<ul>
<li>云对象/云函数</li>
</ul>
<p>因为在<code v-pre>云开发</code>中所有的接口都是前端自己写，而<code v-pre>uni-cloud</code>提供了两种方式，一种是<code v-pre>云对象</code>，另一种是<code v-pre>云函数</code>，这两种都可以创建接口，当我们发布在线环境时，我们我们创建的云函数与云对象都需要上传到这里，这样我们线上访问才不会报错</p>
<ul>
<li>跨域配置</li>
</ul>
<p>当我们将本地部署到线上时，那么我们需要在<code v-pre>跨域配置</code>里添加对应的域名才行，这里在我们遇到这个错误时，我们可以再回头来添加域名就行，所有调用云函数或者调用云对象，当我们上线时，我们需要在跨域配置中添加域名</p>
<ul>
<li>前端网页托管</li>
</ul>
<p>这就是我们今天的主场，因为<code v-pre>uni-app</code>可以实现跨端，在H5的web端应用中，我们可以不像以前一样购买服务器，而是把我们自己的前端代码托管在<code v-pre>uni-cloud</code>中，这样自己的应用就可以被外网访问了</p>
<p>我们在了解<code v-pre>服务空间</code>的一些基础后，我们看下如何将这个应用放置到我们的托管中</p>
<h3 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h3>
<p>首页我们运行一下我们本地服务，查看下页面是怎么样的 <code v-pre>运行》运行到浏览器》chrome</code>
<img src="https://files.mdnice.com/user/24614/181cc402-7370-4190-b737-a0831e9dc762.png" alt=""></p>
<p><img src="https://files.mdnice.com/user/24614/1a481954-5480-4a75-bf7f-0399cb7719a1.png" alt=""></p>
<p>我们点击<code v-pre>发行》网站PC或者H5</code>
<img src="https://files.mdnice.com/user/24614/54ea8e9a-64e3-47e4-aec3-efb72aa30ec0.png" alt=""></p>
<p><img src="https://files.mdnice.com/user/24614/d63cf2ac-781e-412b-8ae2-b4245a1a75a3.png" alt=""></p>
<p>当我们点击发行后</p>
<p><img src="https://files.mdnice.com/user/24614/88b85945-6b3a-4dc4-aa1e-4d7abdabcb14.png" alt=""></p>
<ul>
<li>我们的项目目录会生成一个<code v-pre>unpackage</code>在这个目录的dist文件内会有h5文件夹，这个h5文件夹就是我们需要托管到静态服务器里面</li>
<li>我们发现打包后的文件上传到了静态托管里，并且访问地址已经有了<code v-pre>https://static-mp-e770384a-64f6-4f20-903e-57eeaaa86862.next.bspapp.com</code>,当你打开这个地址时</li>
</ul>
<p><img src="https://files.mdnice.com/user/24614/5231bb6f-11eb-4adf-9018-f9ce690f9dac.png" alt=""></p>
<p>我们再看下云端前端网页托管</p>
<p><img src="https://files.mdnice.com/user/24614/22e005a4-328e-4534-a369-36e68a503c19.png" alt=""></p>
<p>其实就是把我们本地的<code v-pre>h5</code>目录上传到了网页托管中</p>
<p>注意如果你想根目录带路径访问，那么你必须在<code v-pre>manifest.json</code>中<code v-pre>Web配置</code>的运行基础路径中加入路径即可，那么此时我们的这里回多加一级文件目录</p>
<p>至此我们前端部署就已经ok了，通常这个静态域名是可以在线访问的</p>
<p>但是我们想自定义域名访问，比如在这之前我做的一个个人小程序，h5版的地址就是<code v-pre>http://h5learn.wmcweb.cn/h5#/</code>,因为<code v-pre>uni-app</code>提供的地址太长了，此时我们需要自定义配置域名</p>
<h3 id="自定义域名配置" tabindex="-1"><a class="header-anchor" href="#自定义域名配置" aria-hidden="true">#</a> 自定义域名配置</h3>
<p><img src="https://files.mdnice.com/user/24614/a9637795-19c1-46fe-9ec4-378c3c4f87f8.png" alt=""></p>
<p>点击添加域名，这里我写了一个简单的子域名，<a href="http://tb.wmcweb.cn/#/" title="tb.wmcweb.cn" target="_blank" rel="noopener noreferrer">tb.wmcweb.cn<ExternalLinkIcon/></a>
<img src="https://files.mdnice.com/user/24614/ac106059-fa14-42dc-a58f-7fe4f25439bc.png" alt="">
然后我们登陆自己阿里云，域名解析，添加记录，选择CHNAME，将以上记录值填入即可</p>
<p><img src="https://files.mdnice.com/user/24614/056145fc-56c2-470d-b006-0c8187fa0e3a.png" alt=""></p>
<p>当你添加完记录后，此时你刷新配置,当状态变成部<code v-pre>署完成时</code>,说明我们添加记录已经ok了</p>
<p><img src="https://files.mdnice.com/user/24614/4b7a44d1-d2cb-46fc-9d97-1296912cc611.png" alt=""></p>
<p>最后我们可以通过自己自定义的域名进行访问了<code v-pre>http://tb.wmcweb.cn/</code></p>
<p><img src="https://files.mdnice.com/user/24614/ea143a85-3445-4850-98ca-5e002df146f0.png" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>一个应用只能关联一个服务空间，一个服务空间可以对应多个应用，我们所有的云开发必须关联对应的服务空间</p>
</li>
<li>
<p>当我们应用运行打包后可以部署上传到云服务，<code v-pre>uni-cloud</code>会给我们一个默认域名，通过这个域名可以访问我们前端应用</p>
</li>
<li>
<p>我们可以自定义域名访问前端应用，我们将<code v-pre>uni-cloud</code>生成的记录值添加到自己域名解析的记录值中，这样就可以自定义域名访问应用了</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/uni-app-taobao" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
