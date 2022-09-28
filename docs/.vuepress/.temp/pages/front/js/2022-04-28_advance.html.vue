<template><div><blockquote>
<p><code v-pre>http</code>这道八股文在面试中屡见不鲜，也是屡战屡败，今天卷<code v-pre>http</code>也是让自己重新回顾<code v-pre>http</code>,虽然在实际项目中，你不需要像面试一样被刨根问底，来自灵魂的拷问，但是，高端岗位，高端面试总会让你欲罢不能，<code v-pre>说下http</code>的理解，这道看似简单的菜，但是当你吃的时候,总会耐人寻味。</p>
</blockquote>
<p>正文开始....</p>
<h3 id="http-是什么" tabindex="-1"><a class="header-anchor" href="#http-是什么" aria-hidden="true">#</a> http 是什么</h3>
<p>从<code v-pre>http</code>四个字母来讲，它是<code v-pre>Hypter transfer protocol</code>超文本传输协议。</p>
<p><code v-pre>超文本传输协议</code>，你告诉面试官，他首先是超文本，不是普通文本，然后它是一种<code v-pre>传输协议</code>。下面一张图再次印在脑壳里</p>
<p><img src="https://files.mdnice.com/user/24614/bd6c9ff9-aaa9-4098-9541-0ac44a7ae2c3.png" alt=""></p>
<p>首先我们知道<code v-pre>http</code>它是一种计算机通信的协议，它是在计算机之间通信的协议，你可以把它看成计算机之间通信的规范，能处理各种网上信息的媒介。</p>
<p>然后我们知道它能传输，互联网上所有的文本，图片，视频以及文件都是能传输的，我们之所以能看网上的所有任何信息，这些信息都离不开<code v-pre>传输</code>。那么传输就靠它，遵循 A-&gt;B 或者 B-&gt;A,它是一个双向的通信。在 A-&gt;B 两点之间可以加许多约束，比如加密，安全认证、压缩数据等等，但是始终得遵循<code v-pre>http</code>传输的规范。</p>
<p>最后我们知道它是超文本，既然是<code v-pre>超文本</code>，那么它是一定不同寻常。所有数据文本格式在<code v-pre>http</code>眼里统称为<code v-pre>超文本</code>【文字、图片，视频、文件等】</p>
<p>以上说了那么多，那么<code v-pre>http</code>既然是超文本传输协议，那么它是类似应用软件、操作系统或者是<code v-pre>apache</code>、<code v-pre>nginx</code>、<code v-pre>tomact</code>那样的服务器吗？以上都不是，它是一种计算机通信的规范，是一种动态的存在，与应用软件、操作系统，以及<code v-pre>web</code>服务器息息相关,我们可以用编程语言去操作<code v-pre>http</code>进而操作应用软件、操作系统等等。</p>
<p>在互联网的世界里，<code v-pre>http</code>协议并不是孤立存在的，它在<code v-pre>tcp/ip</code>协议栈的上层，通过<code v-pre>ip</code>协议实现寻址和路由，通过<code v-pre>tcp</code>协议实现可靠的数据传输，<code v-pre>DNS</code>协议实现域名解析，<code v-pre>SSL/TLS</code>实现安全通信，有些其他通信协议甚至是依赖它的，比如<code v-pre>websocket</code>协议、<code v-pre>HTTPDNS</code>,这些协议组成一个协议网，而<code v-pre>http</code>处于中心位置，它们有机组合。</p>
<h3 id="你知道-http-版本之间有哪些区别吗" tabindex="-1"><a class="header-anchor" href="#你知道-http-版本之间有哪些区别吗" aria-hidden="true">#</a> 你知道 http 版本之间有哪些区别吗</h3>
<p>通常来讲，问这问题，似乎有点超越我知识边界啊，此时脑子里一片空白，心中已是万马奔腾....</p>
<p><code v-pre>http0.9</code>版本</p>
<p>只支持<code v-pre>GET</code>请求方式，仅支持请求<code v-pre>HTML</code>格式资源。</p>
<p><code v-pre>http1.0</code>版本</p>
<p>1、增加了<code v-pre>HEAD</code>、<code v-pre>POST</code>请求方法</p>
<p>2、增加了<code v-pre>status</code>状态码，字符集，内容编码</p>
<p>3、增加了请求头，请求体，响应体，支持长链接<code v-pre>keep-alive</code></p>
<p>4、支持了多种文本格式传输，不仅限<code v-pre>html</code>格式文本</p>
<p>5、引入协议版本号</p>
<p>6、增加了缓存机制</p>
<p><code v-pre>http1.1</code>版本</p>
<p>1、增加了<code v-pre>PUT</code>、<code v-pre>DELETE</code>、<code v-pre>OPTION</code>等方法</p>
<p>2、增加了缓存管理与控制</p>
<p>3、默认长链接<code v-pre>connection:keep-alive</code></p>
<p>5、运行响应数据分块、利于传输大文件</p>
<p>6、强制要求<code v-pre>Host</code>头，增加管道机制，同时支持多个请求并行发送【把多个请求放到队列中，一个一个请求的同时，接收对应的响应】</p>
<p>7、增加了身份认证机制，新增 24 个错误码</p>
<p><code v-pre>http2.0</code>版本
延续了<code v-pre>http1.0</code>所有的特性，增加以下新功能</p>
<p>1、二进制协议，不再是纯文本</p>
<p>2、可以发个多个请求，废除 1.1 的管道</p>
<p>3、专用的算法压缩头部，减少数据量的传输</p>
<p>4、允许服务器向客户端推送消息</p>
<p>5、增加了安全性，要求安全加密</p>
<p>6、增加了双工模式【客户端发送多个请求，服务端同时处理多个请求】</p>
<h3 id="说下-tcp-ip-是什么" tabindex="-1"><a class="header-anchor" href="#说下-tcp-ip-是什么" aria-hidden="true">#</a> 说下 TCP/IP 是什么</h3>
<p><code v-pre>http</code>位于 TCP/IP 上层，准确的说，<code v-pre>http</code>是<code v-pre>TCP/IP</code>协议的子集，TCP/IP 协议按层次分层管理</p>
<p><img src="https://files.mdnice.com/user/24614/0578f4b6-76c3-440f-aa15-539e52a47627.png" alt=""></p>
<h3 id="tcp-ip-通信传输" tabindex="-1"><a class="header-anchor" href="#tcp-ip-通信传输" aria-hidden="true">#</a> TCP/IP 通信传输</h3>
<p><img src="https://files.mdnice.com/user/24614/9f991471-fb7d-48ff-b88c-66742e2063f3.png" alt=""></p>
<h3 id="三次握手" tabindex="-1"><a class="header-anchor" href="#三次握手" aria-hidden="true">#</a> 三次握手</h3>
<p>简单的来说就是<code v-pre>发送SYN标识</code>、<code v-pre>确认SYN/ACK标识</code>、<code v-pre>回传ACK标识</code></p>
<p><img src="https://files.mdnice.com/user/24614/68fd31b3-7cdf-4453-9348-e5bf9ee902dd.png" alt=""></p>
<h3 id="域名解析-dns-dommin-name-system" tabindex="-1"><a class="header-anchor" href="#域名解析-dns-dommin-name-system" aria-hidden="true">#</a> 域名解析 DNS（dommin name system）</h3>
<p>首先 DNS 同属于应用层协议，它是域名-&gt;ip 之间的解析服务</p>
<p>通常我们访问一个类似<code v-pre>www.baidu.com</code>的网站，这是域名，通过访问域名，浏览器响应的页面在客户端中，在访问域名时，DNS 是帮我们解析了该域名的地址，实际上百度的 IP 地址可能是类似<code v-pre>220.181.38.251</code>这样的 ip,这也是服务器的<code v-pre>ip</code>地址。</p>
<p>在 DNS 解析只是为了让用户不用记住这串<code v-pre>ip</code>,用域名映射了<code v-pre>ip</code>地址，IP 协议会在你当前的固定的<code v-pre>MAC</code>地址(相当于电脑端的门牌号)上与<code v-pre>ip</code>地址进行发送数据与接收数据操作。</p>
<h3 id="地址上的一些信息" tabindex="-1"><a class="header-anchor" href="#地址上的一些信息" aria-hidden="true">#</a> 地址上的一些信息</h3>
<p>随便淘宝输入一个地址<code v-pre>https://www.taobao.com/?spm=a2107.1.0.0.5c9511d9IYcDK4</code></p>
<p><img src="https://files.mdnice.com/user/24614/c57f9e9f-6f07-47ae-9e8d-19c905cbfccb.png" alt=""></p>
<h3 id="了解服务端与客户端" tabindex="-1"><a class="header-anchor" href="#了解服务端与客户端" aria-hidden="true">#</a> 了解服务端与客户端</h3>
<p>我们快速使用<code v-pre>express</code>搭建一个服务器，并指定<code v-pre>ip</code>访问</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init -y // 生成package.json
<span class="token function">npm</span> i express // 安装express
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>touch server.js</code> 创建服务端代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// server.js</span>
<span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">PORT</span> <span class="token operator">=</span> <span class="token string">'8081'</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'hello server'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token constant">PORT</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'server is start'</span> <span class="token operator">+</span> <span class="token constant">PORT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行命令<code v-pre>node server.js</code>,打开浏览器访问<code v-pre>localhost:8081</code>,这里的<code v-pre>localhost</code>之所以可以这么访问，是因为我们本地<code v-pre>host</code>映射的本地 ip 域名就是<code v-pre>localhost</code>,如果你查看你本地的<code v-pre>ip</code>也可以用<code v-pre>ip</code>访问，比如我的本地<code v-pre>ip</code>是<code v-pre>192.168.1.6</code>,具体查看<code v-pre>mac</code>,终端输入<code v-pre>ifconfig</code>即可查看本机的<code v-pre>ip</code>,如果你用<code v-pre>ip</code>访问那么就是<code v-pre>http://192.168.1.6:8081</code></p>
<p><img src="https://files.mdnice.com/user/24614/e9f00de2-a4d3-456f-a2dd-965c23450e1b.png" alt="">
从这段简单的<code v-pre>服务端</code>代码我们可以知道，打开<code v-pre>network</code>我们来仔细回顾下<code v-pre>http</code>到底有哪些信息</p>
<h3 id="general通用首部字段类型" tabindex="-1"><a class="header-anchor" href="#general通用首部字段类型" aria-hidden="true">#</a> <code v-pre>General</code>通用首部字段类型</h3>
<ul>
<li>有请求的路由<code v-pre>url</code>Request URL 地址，</li>
<li>请求方法 Request Method<code v-pre>GET</code>请求，</li>
<li>响应的状态码<code v-pre>Status</code>,还有<code v-pre>Remote Address</code>远程地址。</li>
<li>Referrer Policy:<code v-pre>strict-origin-when-cross-origin</code>,对于同源的请求，会发送完整的 URL 作为引用地址</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Request <span class="token constant">URL</span><span class="token operator">:</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">192.168.1.6:8081</span><span class="token regex-delimiter">/</span></span>
Request Method<span class="token operator">:</span> <span class="token constant">GET</span>
Status Code<span class="token operator">:</span> <span class="token number">200</span> <span class="token constant">OK</span>
Remote Address<span class="token operator">:</span> <span class="token number">192.168</span><span class="token number">.1</span><span class="token number">.6</span><span class="token operator">:</span><span class="token number">8081</span>
Referrer Policy<span class="token operator">:</span> strict<span class="token operator">-</span>origin<span class="token operator">-</span>when<span class="token operator">-</span>cross<span class="token operator">-</span>origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="response-headers" tabindex="-1"><a class="header-anchor" href="#response-headers" aria-hidden="true">#</a> Response Headers</h3>
<ul>
<li>
<p>有<code v-pre>http</code>的版本，状态是<code v-pre>200</code></p>
</li>
<li>
<p><code v-pre>X-Powered-By</code>:<code v-pre>Express</code>这是可以看出是哪个服务器开发的。</p>
</li>
<li>
<p><code v-pre>Content-Type: text/html;charset=utf-8</code>对应的网络类型语言和语言编码。</p>
</li>
<li>
<p><code v-pre>Content-Length: 12</code>报文的实体长度。</p>
</li>
<li>
<p><code v-pre>ETag:W/&quot;c-KpI5DocyxPM9FaJeckcyQoImh1k</code> 服务器返回的一段标识，<code v-pre>web</code>端缓存验证。</p>
</li>
<li>
<p><code v-pre>Connection:keep-alive</code>设置客户端长链接。<code v-pre>Keep-Alive: timeout=5</code></p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">HTTP</span><span class="token operator">/</span><span class="token number">1.1</span> <span class="token number">200</span> <span class="token constant">OK</span>
<span class="token constant">X</span><span class="token operator">-</span>Powered<span class="token operator">-</span>By<span class="token operator">:</span> Express
Content<span class="token operator">-</span>Type<span class="token operator">:</span> text<span class="token operator">/</span>html<span class="token punctuation">;</span> charset<span class="token operator">=</span>utf<span class="token operator">-</span><span class="token number">8</span>
Content<span class="token operator">-</span>Length<span class="token operator">:</span> <span class="token number">12</span>
<span class="token literal-property property">ETag</span><span class="token operator">:</span> <span class="token constant">W</span><span class="token operator">/</span><span class="token string">"c-KpI5DocyxPM9FaJeckcyQoImh1k"</span>
<span class="token literal-property property">Date</span><span class="token operator">:</span> Wed<span class="token punctuation">,</span> <span class="token number">27</span> Apr <span class="token number">2022</span> <span class="token number">13</span><span class="token operator">:</span><span class="token number">04</span><span class="token operator">:</span><span class="token number">19</span> <span class="token constant">GMT</span>
<span class="token literal-property property">Connection</span><span class="token operator">:</span> keep<span class="token operator">-</span>alive
Keep<span class="token operator">-</span>Alive<span class="token operator">:</span> timeout<span class="token operator">=</span><span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="request-headers" tabindex="-1"><a class="header-anchor" href="#request-headers" aria-hidden="true">#</a> Request Headers</h3>
<ul>
<li><code v-pre>Accept</code>服务器返回的语言</li>
<li><code v-pre>Accept-Encoding</code>: <code v-pre>gzip, deflate</code>,默认<code v-pre>gzip</code>与<code v-pre>deflate</code>,表示<code v-pre>http</code>响应是否进行压缩。</li>
</ul>
<p><code v-pre>Accept-Language</code>: <code v-pre>zh-CN,zh;q=0.9,en;q=0.8</code>,表示支持的语言</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">Accept</span><span class="token operator">:</span> text<span class="token operator">/</span>html<span class="token punctuation">,</span>application<span class="token operator">/</span>xhtml<span class="token operator">+</span>xml<span class="token punctuation">,</span>application<span class="token operator">/</span>xml<span class="token punctuation">;</span>q<span class="token operator">=</span><span class="token number">0.9</span><span class="token punctuation">,</span>image<span class="token operator">/</span>avif<span class="token punctuation">,</span>image<span class="token operator">/</span>webp<span class="token punctuation">,</span>image<span class="token operator">/</span>apng<span class="token punctuation">,</span><span class="token operator">*</span><span class="token comment">/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cache-Control: no-cache
Connection: keep-alive
Cookie: sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217af9c0b6845ce-07835609215c5b4-35637203-1296000-17af9c0b685d5f%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%2C%22%24latest_search_keyword%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%2C%22%24latest_referrer%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%7D%2C%22%24device_id%22%3A%2217af9c0b6845ce-07835609215c5b4-35637203-1296000-17af9c0b685d5f%22%7D; _ga=GA1.1.1843623571.1627687795; Hm_lvt_c090ced1a911ebae432278eea5465028=1627687795; _hjid=0262b7cd-3d01-48d6-bf20-77b938e07cbf
Host: 192.168.1.6:8081
Pragma: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="http-是无状态的" tabindex="-1"><a class="header-anchor" href="#http-是无状态的" aria-hidden="true">#</a> http 是无状态的</h3>
<p>因为<code v-pre>http</code>是无状态的的协议，它不会对之前的请求和响应进行管理，也就是无法根据之前的请求，判断当前的请求操作。虽然<code v-pre>http</code>是无状态的，也因此减少了服务器资源与<code v-pre>CPU</code>的内存消耗。但是可以通过<code v-pre>cookie</code>记录请求的状态，当一个<code v-pre>网站</code>需要登录后再次访问，不需要登录时，当我们登录后，服务端会在请求头里设置<code v-pre>cookie</code>，当客户端再次请求时，会携带这个之前设置好的<code v-pre>cookie</code>给后端，然后后端会在<code v-pre>cookie</code>设置<code v-pre>uid</code>等之类标识，前端也会根据这个设置标识不用重复登录操作。其实接口的鉴权也是这么这么做的，通常登录后，会在报文的请求头里设置<code v-pre>token</code>,所有接口请求头里都会带<code v-pre>cookie</code>标识给后端做验证，并且会设置当前<code v-pre>cookie</code>字段<code v-pre>HttpOnly=true</code>状态，在前端<code v-pre>js</code>是读取不到的。这是防御<code v-pre>xss</code>攻击的一种手段。</p>
<h3 id="http-的一些常用状态码" tabindex="-1"><a class="header-anchor" href="#http-的一些常用状态码" aria-hidden="true">#</a> http 的一些常用状态码</h3>
<p>客户端<code v-pre>HTTP</code>的返回结果，标记服务端处理是否正常。</p>
<p><code v-pre>status</code>大体分五类</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>1xx  信息状态码   接受请求正在处理
2xx  成功状态码  请求处理完毕 <span class="token number">200</span>
3xx  重定向状态码  需要加以附加操作才能完成请求 <span class="token number">302</span> 重定向
4xx  客户端状态码  服务器无法处理请求 <span class="token number">404</span>资源无法找到， <span class="token number">403</span>访问资源被服务器拒绝
5xx  服务器错误状态码  服务器处理请求错误 <span class="token number">500</span><span class="token punctuation">,</span><span class="token number">503</span>等
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安全性" tabindex="-1"><a class="header-anchor" href="#安全性" aria-hidden="true">#</a> 安全性</h3>
<ul>
<li>
<p>请求头 cookie 部分字段设置<code v-pre>HttpOnly</code>，Set-Cookie: token=123;HttpOnly<code v-pre>,</code>js 是无法读取<code v-pre>cookie</code>设置的属性值的，防止 xss 利用 js 劫持 cookie</p>
</li>
<li>
<p><code v-pre>X-Frame-Options: DENY / SAMEORGIN</code> 属于<code v-pre>http</code>响应首部，控制网站内容 Frame,防止点击劫持,`</p>
</li>
<li>
<p>X-XSS-Protection: 1 属于<code v-pre>http</code>响应首部，主要针对跨站脚本攻击， 1:xss 过滤设置成无效状态， 0:将 xss 过滤设置成有效状态</p>
</li>
</ul>
<h3 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h3>
<p>相比较<code v-pre>http</code>,<code v-pre>https</code>主要增强了安全性，<code v-pre>http</code>协议有很多的优点，但是也有缺点</p>
<p>1、首先<code v-pre>http</code>是明文通信，内容没有加密，有可能会被篡改</p>
<p>2、不会验证身份信息，因此可能会遭伪装</p>
<p>3、无法保护请求报文的完整性，报文有可能会被篡改。</p>
<p>因为以上种种，所以有了<code v-pre>SSL(Secure Socket Layer)/TSL(Transport Layer Security)</code>安全套接层/安全传输层协议</p>
<h3 id="证书和签名" tabindex="-1"><a class="header-anchor" href="#证书和签名" aria-hidden="true">#</a> 证书和签名</h3>
<p><code v-pre>https</code>通常会通过证书手段判断服务器和客户端的真实性，并且<code v-pre>SSL</code>会加密，意味报文不会轻易被窃取，一张图简单描述一下<code v-pre>https</code>
<img src="https://files.mdnice.com/user/24614/c55d1801-4e18-45d7-ab3f-1bd0797254e0.png" alt="">
本质上<code v-pre>https</code>是套了一层<code v-pre>SSL/TSL</code>协议的外壳，增强了<code v-pre>http</code>协议的安全性</p>
<h3 id="web-安全性" tabindex="-1"><a class="header-anchor" href="#web-安全性" aria-hidden="true">#</a> web 安全性</h3>
<p>主要分为 3 类</p>
<ul>
<li>主动攻击（SQL 注入，OS 命令注入攻击）</li>
<li>被动攻击（导用户点击，劫持网页，窃取 cookie 信息，伪造用户信息，xss 攻击(跨站脚本攻击)）</li>
<li>以服务器为目标的主动攻击(增加图片验证码，客户端与服务端同时验证)</li>
<li>会话劫持，攻击者通过某种手段拿到了会话 ID,伪装 ID,达到攻击用户目的（一般是窃取 cookie 信息）</li>
<li>跨站请求伪造（csrx）,利用写好的脚本植入当前网站，诱导用户执行脚本</li>
<li>DOS 攻击，客户端发送大量的合法请求，消耗大量服务器资源，造成服务器奔溃。</li>
</ul>
</div></template>
