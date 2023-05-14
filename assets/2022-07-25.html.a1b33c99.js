import{_ as t,o as c,c as o,b as s,a,d as n,e as i,r as l}from"./app.13e035d0.js";const d={},p=n("\u5E73\u65F6\u9879\u76EE\u4E2D\u6211\u4EEC\u7EDD\u5927\u90E8\u5206\u90FD\u662F\u7528"),r=s("code",null,"bash",-1),u=n("\u547D\u4EE4\u884C\uFF0C\u6216\u8005\u7528"),m=s("code",null,"GUI",-1),v=n("\u53EF\u89C6\u5316\u5DE5\u5177\uFF0C\u65E0\u8BBA\u662F\u5C0F\u4E4C\u9F9F\u8FD8\u662F"),b=s("code",null,"gui",-1),h=n("\u5DE5\u5177\uFF0C\u5982\u679C\u662F\u5DE5\u5177\u6BD4\u8F83\u63A8\u8350"),g=s("code",null,"sourceTree",-1),k=n("\uFF0C\u4F46\u662F\u6211\u66F4\u63A8\u8350"),_={href:"https://git-fork.com/",title:"git-fork",target:"_blank",rel:"noopener noreferrer"},x=n("git-fork"),f=n(",\u5DE5\u5177\u56E0\u4EBA\u800C\u5DF2\uFF0C\u65E0\u8BBA\u4E60\u60EF\u547D\u4EE4\u884C\u8FD8\u662F\u5DE5\u5177\uFF0C\u5BFB\u5F97\u81EA\u5DF1\u559C\u6B22\u7684\u65B9\u5F0F\u5C31\u884C\uFF0C\u6CA1\u6709\u597D\u574F\u4E4B\u5206\uFF0C\u4E5F\u6CA1\u6709\u9AD8\u4F4E\u4E4B\u5206\u3002"),q=i(`<p>\u5982\u679C\u4F60\u5E38\u5E38\u7528<code>gui</code>\uFF0C\u6216\u8005\u4F60\u5E38\u5E38\u7528<code>\u547D\u4EE4\u884C</code>\uFF0C\u90A3\u4E48\u4E0D\u59A8\u7528\u7528\u811A\u672C\u6765\u89E3\u653E\u4F60\u7684\u53CC\u624B\u3002</p><p>\u6B63\u6587\u5F00\u59CB...</p><h3 id="\u524D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u524D\u7F6E" aria-hidden="true">#</a> \u524D\u7F6E</h3><p>\u6B63\u5E38\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u77E5\u9053\u6211\u4EEC<code>bash</code>\u4E2D\uFF0C\u6211\u4EEC\u4F7F\u7528<code>git pull</code>\u3001<code>git add .</code>\u3001<code>git commit</code>\u3001<code>git push</code>\u7B49\u8FD9\u4E9B\u547D\u4EE4\u5B9E\u9645\u662F\u5728<code>git bash</code>\u73AF\u5883\u4E0B\u6267\u884C\u7684\u547D\u4EE4\u3002\u76F8\u5F53\u4E8E<code>DOS</code>\u73AF\u5883\u6216\u8005<code>shell</code>\u6267\u884C<code>git</code>\u547D\u4EE4\u3002</p><p>\u5728<code>git bash</code>\u4E5F\u662F\u53EF\u4EE5\u6267\u884C<code>.sh</code>\u7684<code>xshell</code>\u811A\u672C</p><h3 id="bash\u4E2D\u7684xshell\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#bash\u4E2D\u7684xshell\u547D\u4EE4" aria-hidden="true">#</a> bash\u4E2D\u7684xshell\u547D\u4EE4</h3><p>\u6211\u4EEC\u5728<code>bash</code>\u65B0\u5EFA\u4E00\u4E2A<code>index.sh</code>\u6587\u4EF6\u6D4B\u8BD5\u4E00\u4E0B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">touch</span> index.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5728<code>index.sh</code>\u4E2D\u8F93\u5165\u4E00\u6BB5\u6253\u5370\u811A\u672C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;hello bash&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5728\u547D\u4EE4\u884C\u4E2D\u8F93\u5165<code>bash index.sh</code><img src="https://files.mdnice.com/user/24614/4cd691e0-be68-450c-b58a-687989bacae4.png" alt=""></p><ul><li>\u5220\u9664\u6587\u4EF6</li></ul><p>\u6211\u4EEC\u5728<code>index.sh</code>\u4E2D\u65B0\u589E\u4E00\u4E2A\u547D\u4EE4</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;hello bash&#39;</span>
<span class="token comment"># \u5220\u9664test.txt</span>
<span class="token function">rm</span> test.txt

<span class="token comment"># \u5220\u9664test\u76EE\u5F55</span>
<span class="token function">rm</span> -rf <span class="token builtin class-name">test</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u6253\u5F00\u6587\u4EF6\u4FEE\u6539</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6253\u5F00xx\u6587\u4EF6\u4FEE\u6539</span>
<span class="token function">vim</span> test2.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u7EC8\u7AEF\u4E2D\u4F60\u9700\u8981\u7528<code>i</code>\u63D2\u5165\uFF0C\u4FEE\u6539\u540E\u6267\u884C<code>:wq!</code>\u5C31\u53EF\u4EE5\u4FDD\u5B58\u9000\u51FA\u4E86 <img src="https://files.mdnice.com/user/24614/c3796393-883f-4157-a632-28c94d4844fa.png" alt=""></p><ul><li>\u67E5\u770B\u76EE\u5F55\u6240\u6709\u6587\u4EF6</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ls</span> -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/ed9e9287-9582-439b-9246-87bcd542c559.png" alt=""></p><ul><li>\u590D\u5236</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5C06\u5F53\u524D\u7684test2.txt\u590D\u5236\u6210test2_blank.txt</span>
<span class="token function">cp</span> test2.txt test2_blank.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,22),y=n("\u4EE5\u4E0A\u662F\u4E00\u4E9B\u5E38\u7528\u7684"),j=s("code",null,"xshell",-1),N=n("\u547D\u4EE4\uFF0C\u66F4\u591A\u547D\u4EE4\u53EF\u4EE5\u53C2\u8003"),E={href:"https://cloud.tencent.com/developer/article/1778560",title:"xshell",target:"_blank",rel:"noopener noreferrer"},V=n("xshell"),B=i(`<h3 id="git-\u63D0\u4EA4\u672C\u5730\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#git-\u63D0\u4EA4\u672C\u5730\u4EE3\u7801" aria-hidden="true">#</a> git \u63D0\u4EA4\u672C\u5730\u4EE3\u7801</h3><p>\u4EE5\u4E0A\u57FA\u7840\u7684\u4E86\u89E3\u4E00\u4E9B\u5E38\u7528\u7684<code>xshell</code>\u547D\u4EE4\uFF0C\u73B0\u5728\u6211\u4EEC\u53EF\u4EE5\u7F16\u5199\u4E00\u4E2A<code>xshell</code>\u811A\u672C\u4E86</p><p>\u9996\u5148\u6211\u4EEC\u5728\u6211\u4EEC\u9879\u76EE\u6839\u76EE\u5F55\u65B0\u5EFA\u4E00\u4E2A<code>deplop.sh</code>\u6587\u4EF6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>touch deplop.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5BF9\u5E94\u7684<code>deplop.sh</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5982\u679C\u9879\u76EE\u5DF2\u7ECF\u521D\u59CB\u5316\u540E\uFF0C\u5DF2\u7ECFinit \u90A3\u4E48\u4E0D\u7528\u52A0\u8FD9\u4E2A</span>
<span class="token comment"># git init</span>
<span class="token comment"># \u66F4\u65B0your\u5BF9\u5E94\u5206\u652F</span>
<span class="token function">git</span> pull origin your_branch
<span class="token comment"># \u67E5\u770B\u672C\u5730\u72B6\u6001</span>
<span class="token function">git</span> status
<span class="token comment"># \u6DFB\u52A0\u672C\u5730\u4FEE\u6539\u7684\u6587\u4EF6</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment"># \u63D0\u4EA4</span>
<span class="token function">git</span> commit -m <span class="token string">&#39;add xx&#39;</span>
<span class="token comment"># \u6DFB\u52A0\u8FDC\u7A0Bremote \u5982\u679C\u9879\u76EE\u5DF2\u7ECFremote\uFF0C\u53EF\u4EE5\u7701\u7565</span>
<span class="token comment"># git remote add origin https://github.com/xx.git</span>
<span class="token comment"># \u63A8\u9001\u5230\u6307\u5B9A\u5206\u652F</span>
<span class="token function">git</span> push origin your_branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u6211\u4EEC\u5728\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E00\u4E2A<code>package.json</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> init -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\u5728<code>package.json</code>\u4E2D,\u6DFB\u52A0\u547D\u4EE4</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lessonNote&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lessonNote-js \u5B66\u4E60\u7B14\u8BB0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;push&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bash deplop.sh&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u6211\u4EEC\u8FD0\u884C\u547D\u4EE4<code>npm run push</code><img src="https://files.mdnice.com/user/24614/152ded1a-f69f-43ae-8d9b-bd3d84f879b3.png" alt=""></p><p>\u81F3\u6B64\u4F60\u5C31\u53EF\u4EE5\u6109\u5FEB\u7684\u7528\u4E00\u884C\u547D\u4EE4\u4E86\uFF0C\u4F46\u662F\u6B63\u5E38\u60C5\u51B5\u4E0B\u4F60\u6BCF\u6B21\u5F97\u4FEE\u6539<code>commit</code>\u7684\u4FE1\u606F,\u800C\u4E0D\u662F\u5199\u6B7B\u5728<code>deplop.sh</code>\u811A\u672C\u91CC\u9762</p><p>\u4E8E\u662F\u4F60\u53EF\u4EE5\u8FD9\u6837</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5982\u679C\u9879\u76EE\u5DF2\u7ECF\u521D\u59CB\u5316\u540E\uFF0C\u5DF2\u7ECFinit \u90A3\u4E48\u4E0D\u7528</span>
<span class="token comment"># git init</span>
<span class="token comment"># \u66F4\u65B0your_branch</span>
<span class="token function">git</span> pull origin your_branch
<span class="token comment"># \u67E5\u770B\u672C\u5730\u72B6\u6001</span>
<span class="token function">git</span> status
<span class="token comment"># \u6DFB\u52A0\u672C\u5730\u4FEE\u6539\u7684\u6587\u4EF6</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment"># \u8BFB\u53D6\u7EC8\u7AEF\u8F93\u5165\u7684\u4FE1\u606F</span>
<span class="token builtin class-name">read</span> -p <span class="token string">&quot;input your commit message: &quot;</span> msg
<span class="token comment"># \u63D0\u4EA4</span>
<span class="token function">git</span> commit -m <span class="token string">&quot;<span class="token variable">$msg</span>&quot;</span>
<span class="token comment"># \u6DFB\u52A0\u8FDC\u7A0Bremote \u5982\u679C\u9879\u76EE\u5DF2\u7ECFremote\uFF0C\u53EF\u4EE5\u7701\u7565</span>
<span class="token comment"># git remote add origin https://github.com/xx.git</span>
<span class="token comment"># \u63A8\u9001\u5230\u6307\u5B9A\u5206\u652F</span>
<span class="token function">git</span> push origin your_branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u4F60\u8FD0\u884C<code>npm run push</code>\u540E\uFF0C\u5C31\u4F1A\u6267\u884C\u4E0A\u9762\u4F60\u7F16\u8F91\u7684\u811A\u672C\uFF0C\u5C31\u53EF\u4EE5\u5FEB\u901F\u7684\u63D0\u4EA4\u5230\u81EA\u5DF1\u4ED3\u5E93\u4E86 <img src="https://files.mdnice.com/user/24614/7c0f4db6-eac4-480d-831d-a14d500b44a6.png" alt=""></p>`,15),F=n("\u5982\u679C\u4F60\u662F\u60F3\u63A8\u4E00\u4E2A\u4F60\u6253\u5305\u540E\u7684\u9879\u76EE\u5230\u6307\u5B9A\u4ED3\u5E93\uFF0C\u53EF\u4EE5\u53C2\u8003"),I={href:"https://github.com/maicFir/maicFir.github.io/blob/dev2.0/deploy.sh",title:"deplop.sh",target:"_blank",rel:"noopener noreferrer"},L=n("deplop.sh"),S=i(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># deploy.sh</span>
<span class="token comment">#!/usr/bin/env sh</span>
<span class="token comment"># \u786E\u4FDD\u811A\u672C\u629B\u51FA\u9047\u5230\u7684\u9519\u8BEF</span>
<span class="token builtin class-name">set</span> -e
<span class="token comment"># \u751F\u6210\u9759\u6001\u6587\u4EF6</span>
<span class="token function">npm</span> run build
<span class="token comment"># \u8FDB\u5165\u751F\u6210\u7684\u6587\u4EF6\u5939\u76EE\u5F55</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist
<span class="token function">git</span> init
<span class="token comment"># \u6DFB\u52A0\u5F53\u524D\u6587\u4EF6</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token comment"># \u8BFB\u53D6\u7EC8\u7AEF\u8F93\u5165\u7684\u4FE1\u606F</span>
<span class="token builtin class-name">read</span> -p <span class="token string">&quot;input commit message: &quot;</span> msg
<span class="token function">git</span> commit -m <span class="token string">&quot;<span class="token variable">$msg</span>&quot;</span>
<span class="token comment"># remote \u6307\u5B9A\u4ED3\u5E93</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/xxx.git
<span class="token comment"># \u63A8\u9001\u5230\u6307\u5B9A\u4ED3\u5E93</span>
<span class="token function">git</span> push -f origin your_branch
<span class="token builtin class-name">echo</span> <span class="token string">&#39;push success&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u6267\u884C<code>npm run push</code>\u8FD9\u6837\u5C31\u53EF\u4EE5\u4E00\u884C\u547D\u4EE4\u66FF\u4EE3\u4F60\u63D0\u4EA4\u7684\u6240\u6709\u64CD\u4F5C\u4E86</p><h3 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h3>`,3),T=i("<li><p>\u4E86\u89E3\u4E00\u4E9B\u5E38\u7528\u7684<code>xshell</code>\u811A\u672C\u547D\u4EE4\uFF0C\u5728<code>xx.sh</code>\u8FD9\u6837\u7684\u6587\u4EF6\uFF0C\u4F60\u53EF\u4EE5\u7F16\u5199\u4E00\u4E9B\u811A\u672C\uFF0C\u5BF9\u6587\u4EF6\u8FDB\u884C\u5220\u9664\uFF0C\u4FEE\u6539\u7B49\u64CD\u4F5C</p></li><li><p>\u65B0\u5EFA\u4E00\u4E2A<code>deplop.sh</code>\u6587\u4EF6\uFF0C\u7F16\u5199<code>git</code>\u63D0\u4EA4\u672C\u5730\u6587\u4EF6\uFF0C\u89E3\u653E<code>git add </code>\u3001<code>git commit</code>\u3001<code>git push</code>\u64CD\u4F5C</p></li>",2),$=n("\u672C\u6587\u793A\u4F8B"),w={href:"https://github.com/maicFir/lessonNote/tree/master/bash",title:"code example",target:"_blank",rel:"noopener noreferrer"},C=n("code example");function D(G,O){const e=l("ExternalLinkIcon");return c(),o("div",null,[s("p",null,[p,r,u,m,v,b,h,g,k,s("a",_,[x,a(e)]),f]),q,s("p",null,[y,j,N,s("a",E,[V,a(e)])]),B,s("p",null,[F,s("a",I,[L,a(e)])]),S,s("ul",null,[T,s("li",null,[s("p",null,[$,s("a",w,[C,a(e)])])])])])}var z=t(d,[["render",D],["__file","2022-07-25.html.vue"]]);export{z as default};