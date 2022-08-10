<template><div><p>平时项目中我们绝大部分都是用<code v-pre>bash</code>命令行，或者用<code v-pre>GUI</code>可视化工具，无论是小乌龟还是<code v-pre>gui</code>工具，如果是工具比较推荐<code v-pre>sourceTree</code>，但是我更推荐<a href="https://git-fork.com/" title="git-fork" target="_blank" rel="noopener noreferrer">git-fork<ExternalLinkIcon/></a>,工具因人而已，无论习惯命令行还是工具，寻得自己喜欢的方式就行，没有好坏之分，也没有高低之分。</p>
<p>如果你常常用<code v-pre>gui</code>，或者你常常用<code v-pre>命令行</code>，那么不妨用用脚本来解放你的双手。</p>
<p>正文开始...</p>
<h3 id="前置" tabindex="-1"><a class="header-anchor" href="#前置" aria-hidden="true">#</a> 前置</h3>
<p>正常情况下，我们知道我们<code v-pre>bash</code>中，我们使用<code v-pre>git pull</code>、<code v-pre>git add .</code>、<code v-pre>git commit</code>、<code v-pre>git push</code>等这些命令实际是在<code v-pre>git bash</code>环境下执行的命令。相当于<code v-pre>DOS</code>环境或者<code v-pre>shell</code>执行<code v-pre>git</code>命令。</p>
<p>在<code v-pre>git bash</code>也是可以执行<code v-pre>.sh</code>的<code v-pre>xshell</code>脚本</p>
<h3 id="bash中的xshell命令" tabindex="-1"><a class="header-anchor" href="#bash中的xshell命令" aria-hidden="true">#</a> bash中的xshell命令</h3>
<p>我们在<code v-pre>bash</code>新建一个<code v-pre>index.sh</code>文件测试一下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> index.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code v-pre>index.sh</code>中输入一段打印脚本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'hello bash'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在命令行中输入<code v-pre>bash index.sh</code>
<img src="https://files.mdnice.com/user/24614/4cd691e0-be68-450c-b58a-687989bacae4.png" alt=""></p>
<ul>
<li>删除文件</li>
</ul>
<p>我们在<code v-pre>index.sh</code>中新增一个命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'hello bash'</span>
<span class="token comment"># 删除test.txt</span>
<span class="token function">rm</span> test.txt

<span class="token comment"># 删除test目录</span>
<span class="token function">rm</span> -rf <span class="token builtin class-name">test</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>打开文件修改</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 打开xx文件修改</span>
<span class="token function">vim</span> test2.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在终端中你需要用<code v-pre>i</code>插入，修改后执行<code v-pre>:wq!</code>就可以保存退出了
<img src="https://files.mdnice.com/user/24614/c3796393-883f-4157-a632-28c94d4844fa.png" alt=""></p>
<ul>
<li>查看目录所有文件</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/ed9e9287-9582-439b-9246-87bcd542c559.png" alt=""></p>
<ul>
<li>复制</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将当前的test2.txt复制成test2_blank.txt</span>
<span class="token function">cp</span> test2.txt test2_blank.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>以上是一些常用的<code v-pre>xshell</code>命令，更多命令可以参考<a href="https://cloud.tencent.com/developer/article/1778560" title="xshell" target="_blank" rel="noopener noreferrer">xshell<ExternalLinkIcon/></a></p>
<h3 id="git-提交本地代码" tabindex="-1"><a class="header-anchor" href="#git-提交本地代码" aria-hidden="true">#</a> git 提交本地代码</h3>
<p>以上基础的了解一些常用的<code v-pre>xshell</code>命令，现在我们可以编写一个<code v-pre>xshell</code>脚本了</p>
<p>首先我们在我们项目根目录新建一个<code v-pre>deplop.sh</code>文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>touch deplop.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对应的<code v-pre>deplop.sh</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如果项目已经初始化后，已经init 那么不用加这个</span>
<span class="token comment"># git init</span>
<span class="token comment"># 更新your对应分支</span>
<span class="token function">git</span> pull origin your_branch
<span class="token comment"># 查看本地状态</span>
<span class="token function">git</span> status
<span class="token comment"># 添加本地修改的文件</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 提交</span>
<span class="token function">git</span> commit -m <span class="token string">'add xx'</span>
<span class="token comment"># 添加远程remote 如果项目已经remote，可以省略</span>
<span class="token comment"># git remote add origin https://github.com/xx.git</span>
<span class="token comment"># 推送到指定分支</span>
<span class="token function">git</span> push origin your_branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们在根目录下创建一个<code v-pre>package.json</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在<code v-pre>package.json</code>中,添加命令</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"lessonNote"</span><span class="token punctuation">,</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"lessonNote-js 学习笔记"</span><span class="token punctuation">,</span>
    <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
    <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span><span class="token punctuation">,</span>
        <span class="token property">"push"</span><span class="token operator">:</span> <span class="token string">"bash deplop.sh"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们运行命令<code v-pre>npm run push</code>
<img src="https://files.mdnice.com/user/24614/152ded1a-f69f-43ae-8d9b-bd3d84f879b3.png" alt=""></p>
<p>至此你就可以愉快的用一行命令了，但是正常情况下你每次得修改<code v-pre>commit</code>的信息,而不是写死在<code v-pre>deplop.sh</code>脚本里面</p>
<p>于是你可以这样</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如果项目已经初始化后，已经init 那么不用</span>
<span class="token comment"># git init</span>
<span class="token comment"># 更新your_branch</span>
<span class="token function">git</span> pull origin your_branch
<span class="token comment"># 查看本地状态</span>
<span class="token function">git</span> status
<span class="token comment"># 添加本地修改的文件</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 读取终端输入的信息</span>
<span class="token builtin class-name">read</span> -p <span class="token string">"input your commit message: "</span> msg
<span class="token comment"># 提交</span>
<span class="token function">git</span> commit -m <span class="token string">"<span class="token variable">$msg</span>"</span>
<span class="token comment"># 添加远程remote 如果项目已经remote，可以省略</span>
<span class="token comment"># git remote add origin https://github.com/xx.git</span>
<span class="token comment"># 推送到指定分支</span>
<span class="token function">git</span> push origin your_branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你运行<code v-pre>npm run push</code>后，就会执行上面你编辑的脚本，就可以快速的提交到自己仓库了
<img src="https://files.mdnice.com/user/24614/7c0f4db6-eac4-480d-831d-a14d500b44a6.png" alt=""></p>
<p>如果你是想推一个你打包后的项目到指定仓库，可以参考<a href="https://github.com/maicFir/maicFir.github.io/blob/dev2.0/deploy.sh" title="deplop.sh" target="_blank" rel="noopener noreferrer">deplop.sh<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># deploy.sh</span>
<span class="token comment">#!/usr/bin/env sh</span>
<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> -e
<span class="token comment"># 生成静态文件</span>
<span class="token function">npm</span> run build
<span class="token comment"># 进入生成的文件夹目录</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist
<span class="token function">git</span> init
<span class="token comment"># 添加当前文件</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token comment"># 读取终端输入的信息</span>
<span class="token builtin class-name">read</span> -p <span class="token string">"input commit message: "</span> msg
<span class="token function">git</span> commit -m <span class="token string">"<span class="token variable">$msg</span>"</span>
<span class="token comment"># remote 指定仓库</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/xxx.git
<span class="token comment"># 推送到指定仓库</span>
<span class="token function">git</span> push -f origin your_branch
<span class="token builtin class-name">echo</span> <span class="token string">'push success'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行<code v-pre>npm run push</code>这样就可以一行命令替代你提交的所有操作了</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>了解一些常用的<code v-pre>xshell</code>脚本命令，在<code v-pre>xx.sh</code>这样的文件，你可以编写一些脚本，对文件进行删除，修改等操作</p>
</li>
<li>
<p>新建一个<code v-pre>deplop.sh</code>文件，编写<code v-pre>git</code>提交本地文件，解放<code v-pre>git add </code>、<code v-pre>git commit</code>、<code v-pre>git push</code>操作</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/bash" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
