<template><div><blockquote>
<p>在过往中，我们都是本地配置<code v-pre>ssh</code>生成<code v-pre>key</code>,然后在<code v-pre>github</code>的<code v-pre>ssh</code>中粘贴本地生成的<code v-pre>key</code>,这种方式其实挺繁琐的，如果我换一台电脑，貌似又需要重复一遍这样的操作，但是从<code v-pre>2021.8.13</code>号这天，也就是七夕节的前一天，<code v-pre>github</code>禁止了这种密码凭证的方式，所以有了<code v-pre>personal access token</code>这种方式</p>
</blockquote>
<p><code v-pre>personal access token</code>这种方式比价简单，只需要在个人账号的<code v-pre>set</code>Person key</p>
<h3 id="打开个人github的seting页" tabindex="-1"><a class="header-anchor" href="#打开个人github的seting页" aria-hidden="true">#</a> 打开个人<code v-pre>github</code>的<code v-pre>seting</code>页</h3>
<p><img src="https://files.mdnice.com/user/24614/84d1b483-777d-473c-8d10-64078cdbab99.png" alt=""></p>
<h3 id="打开settings-developer-settings" tabindex="-1"><a class="header-anchor" href="#打开settings-developer-settings" aria-hidden="true">#</a> 打开Settings Developer settings</h3>
<p><img src="https://files.mdnice.com/user/24614/a2279a7f-fada-418a-8ee8-72af92c4df22.png" alt=""></p>
<h3 id="在developer中选择personal-access-tokens" tabindex="-1"><a class="header-anchor" href="#在developer中选择personal-access-tokens" aria-hidden="true">#</a> 在Developer中选择Personal access tokens</h3>
<p><img src="https://files.mdnice.com/user/24614/f3925f3d-9d50-446d-9519-6a3187c25236.png" alt=""></p>
<h3 id="新建一个token令牌" tabindex="-1"><a class="header-anchor" href="#新建一个token令牌" aria-hidden="true">#</a> 新建一个token令牌</h3>
<p><img src="https://files.mdnice.com/user/24614/d7bec768-65ea-42a4-b2e8-206aa3b412ce.png" alt=""></p>
<h3 id="新建成功后就会生成一个token" tabindex="-1"><a class="header-anchor" href="#新建成功后就会生成一个token" aria-hidden="true">#</a> 新建成功后就会生成一个token</h3>
<p>注意这个<code v-pre>token</code>你需要复制出来，页面不要刷新，一刷新就没有了
<img src="https://files.mdnice.com/user/24614/c97a008e-ebdd-472a-b72d-9aae4805d09d.png" alt=""></p>
<h3 id="然后vscode打开自己项目" tabindex="-1"><a class="header-anchor" href="#然后vscode打开自己项目" aria-hidden="true">#</a> 然后vscode打开自己项目</h3>
<p>在之前网上各种资料里可能都是推荐把<code v-pre>token</code>复制下载来，然后设置<code v-pre>remote</code></p>
<p>比如你会像这样一样,假如你生成的token是下面这样的<code v-pre>ghp_FMSODEFl6IxW8PEmHIsNYGV33232112UuvP90MHrhS</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> origin http://ghp_FMSODEFl6IxW8PEmHIsNYGV33232112UuvP90MHrhS@github.com/useName/xxx.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>@github.com</code>后面跟着的就是你创建项目名的具体<code v-pre>git</code>地址</p>
<p>比如我的就下面这样</p>
<p><img src="https://files.mdnice.com/user/24614/bbd5f435-5bca-484b-8d20-7466b53bab78.png" alt=""></p>
<p>你会发现这样设置，提交貌似没有问题，但是当你在另外一个仓库也是同样使用设置token时，如果你有用自动化脚本，大概率另外一个仓库一提交自动化脚本就会把这个token设置的给删除了</p>
<p>所以就需要设置另外一种方式</p>
<ul>
<li>先删除已设置的remote</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">rm</span> origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加<code v-pre>https://username/xxx.git</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> origin https://xxx/xxx.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/877f6c44-36a0-43ef-b102-2f864c681363.png" alt=""></p>
<ul>
<li>添加完了，修改任意一文件，然后再提交</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -m <span class="token string">'update'</span>
<span class="token function">git</span> push origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时你的<code v-pre>vscode</code>会让你输入用户名<code v-pre>(github账号名)</code>
<img src="https://files.mdnice.com/user/24614/7a0fb15a-2c8b-422e-ab19-344fc171b3d8.png" alt="">
当你输入完用户名后，会继续让你输入密码，此时你就需要把刚才你生成的<code v-pre>token</code>复制过来，填进去就可以了</p>
<p>然后当你看到以下就说明已经提交成功了</p>
<p><img src="https://files.mdnice.com/user/24614/2d1163a7-d768-4b8c-ae9c-dbd82c36af73.png" alt=""></p>
<p>至此，当你再次提交时，你不需重复以上步骤，已经可以愉快的提交你的本地仓库了</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>新替代原有<code v-pre>ssh</code>提交方案，原来那种<code v-pre>ssh key</code>方式官方已经不太建议了</p>
</li>
<li>
<p>现有<code v-pre>person token</code>方式更简单，安全性也很高</p>
</li>
<li>
<p><code v-pre>remote</code>不太建议<code v-pre>https://token/userName/xxx.git</code>这种方式，当另外一个仓库也采用此时方式提交时，会把这个设置的<code v-pre>token</code>给删除掉，这个是有坑的</p>
</li>
<li>
<p>建议直接<code v-pre>remote</code>原有仓库的https方式，然后将token当成密码填入即可</p>
</li>
</ul>
</div></template>
