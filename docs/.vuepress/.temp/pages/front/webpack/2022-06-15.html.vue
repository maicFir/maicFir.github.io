<template><div><p><code v-pre>eslint</code>在项目里并不太陌生，通常在使用脚手架时，会默认让你安装执行的<code v-pre>eslint</code>,公司项目比较规范时，常常会配置组内统一的<code v-pre>eslint</code>规则，<code v-pre>eslint</code>帮助我们在开发阶段检查代码是否符合标准规范，统一了我们组内不同项目代码风格，也可以帮助我们养成良好的代码习惯，统一<code v-pre>eslint</code>对于项目的可维护性必不可少，今天我们一起学习一下如果改进你项目的规范。</p>
<p>正文开始...</p>
<p>首先我们还是用之前搭建<code v-pre>vue</code>的一个项目做从 0 到 1 开始配置<code v-pre>eslint</code></p>
<h3 id="安装-eslint" tabindex="-1"><a class="header-anchor" href="#安装-eslint" aria-hidden="true">#</a> 安装 eslint</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm i eslint <span class="token operator">--</span>save<span class="token operator">-</span>dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们执行初始化<code v-pre>eslint</code>命令</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm init @eslint<span class="token operator">/</span>config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时会让我们选择第三个,并且选择<code v-pre>js modules</code>, <code v-pre>vue</code>
<img src="https://files.mdnice.com/user/24614/0a6781e4-d624-4512-a7da-6200138de6a8.png" alt="">
<img src="https://files.mdnice.com/user/24614/9fff8377-1913-4173-8a78-d3f5dad16c6c.png" alt="">
<img src="https://files.mdnice.com/user/24614/ed056186-d823-4ff9-aebc-c1c455509d89.png" alt="">
当你默认选择后就会生成一个文件<code v-pre>.eslintrc.js</code>,由于我添加了<code v-pre>ts</code>所以默认也会添加<code v-pre>@typescript-eslint</code>，我们会发现<code v-pre>package.json</code>多了几个插件<code v-pre>@typescript-eslint/eslint-plugin</code>、<code v-pre>@typescript-eslint/parser</code>，并且要安装<code v-pre>npm i typescript --save-dev</code></p>
<p><code v-pre>eslint</code>规则是自己默认选择的配置</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'eslint:recommended'</span><span class="token punctuation">,</span> <span class="token string">'plugin:vue/essential'</span><span class="token punctuation">,</span> <span class="token string">'plugin:@typescript-eslint/recommended'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">'latest'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">'@typescript-eslint/parser'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">'module'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'vue'</span><span class="token punctuation">,</span> <span class="token string">'@typescript-eslint'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">indent</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'tab'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">'linebreak-style'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'unix'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">quotes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'single'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'never'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认生成的规则就是以上</p>
<p>我们运行<code v-pre>npx eslint ./src/index.js</code>
<img src="https://files.mdnice.com/user/24614/05ade79a-d5e9-48bc-8f62-dfb389b54c69.png" alt="">
执行该命令就会检测对于的文件是否符合<code v-pre>eslint</code>默认配置的规则</p>
<h3 id="添加-eslint-规则" tabindex="-1"><a class="header-anchor" href="#添加-eslint-规则" aria-hidden="true">#</a> 添加 eslint 规则</h3>
<p>在<code v-pre>.eslintrc.js</code>中</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'eslint:recommended'</span><span class="token punctuation">,</span> <span class="token string">'plugin:vue/essential'</span><span class="token punctuation">,</span> <span class="token string">'plugin:@typescript-eslint/recommended'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">'latest'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">'@typescript-eslint/parser'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">'module'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'vue'</span><span class="token punctuation">,</span> <span class="token string">'@typescript-eslint'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">indent</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'tab'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">'linebreak-style'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'unix'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">quotes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'single'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'always'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要由以下 5 个部分</p>
<ul>
<li>env 支持的环境，根据<code v-pre>.browserslistrc</code>浏览器预设的环境预设对应的规则</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es6</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>extends 继承第三方的规则</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'eslint:recommended'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>parserOptions 指定解析器选项</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">'latest'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">'@typescript-eslint/parser'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">'module'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>plugins 插件</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'vue'</span><span class="token punctuation">,</span> <span class="token string">'@typescript-eslint'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>rules 具体对应规则的设置</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token comment">// 0 off,1 warn,2 error</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考一段之前业务有用用到的统一<code v-pre>eslint</code>配置</p>
<details class="custom-container details"><summary>code</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// eslint配置</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">'@typescript-eslint/parser'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'plugin:vue/essential'</span><span class="token punctuation">,</span> <span class="token string">'plugin:prettier/recommended'</span><span class="token punctuation">,</span> <span class="token string">'@vue/airbnb'</span><span class="token punctuation">,</span> <span class="token string">'@vue/typescript'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'no-undef'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 由于eslint无法识别.d.ts声明文件中定义的变量，暂时关闭</span>
    <span class="token string-property property">'no-console'</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'production'</span> <span class="token operator">?</span> <span class="token number">2</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-debugger'</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'production'</span> <span class="token operator">?</span> <span class="token number">2</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token literal-property property">indent</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'linebreak-style'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-trailing-spaces'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'class-methods-use-this'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/prefer-default-export'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-restricted-syntax'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-tabs'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/no-unresolved'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-underscore-dangle'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'comma-dangle'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'max-len'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">camelcase</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'object-curly-newline'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'operator-linebreak'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'guard-for-in'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/no-webpack-loader-syntax'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 不安全项</span>
    <span class="token string-property property">'no-param-reassign'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-dupe-class-members'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-unused-vars'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// ts里面有校验，可以把eslint 的校验关闭</span>
    <span class="token comment">// 提示警告</span>
    <span class="token string-property property">'no-return-await'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/no-cycle'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-nested-ternary'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-new-func'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'vue/no-side-effects-in-computed-properties'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'vue/no-multiple-template-root'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span> <span class="token comment">// vue3 模板可以有多个根结点</span>
    <span class="token string-property property">'vue/valid-template-root'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'vue/no-v-for-template-key'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span> <span class="token comment">// vue3  v-for 中template 可以设置key</span>
    <span class="token string-property property">'vue/no-v-model-argument'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'vue/no-use-v-if-with-v-for'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/no-extraneous-dependencies'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-continue'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'operator-assignment'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-bitwise'</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string-property property">'prefer-destructuring'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'array-callback-return'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'func-names'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-plusplus'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-shadow'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-mixed-operators'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-fallthrough'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'default-case'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-useless-constructor'</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">'no-unused-expressions'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">allowShortCircuit</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 关闭iview input组件，col组件个别标签报错</span>
    <span class="token string-property property">'vue/no-parsing-error'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string-property property">'x-invalid-end-tag'</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 保证js、ts项目arrow风格一致</span>
    <span class="token string-property property">'arrow-parens'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'always'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">requireForBlockBody</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">'implicit-arrow-linebreak'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">'beside'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// ts 任意枚举报错问题</span>
    <span class="token string-property property">'no-shadow'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'@typescript-eslint/no-shadow'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">overrides</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'**/__tests__/*.{j,t}s?(x)'</span><span class="token punctuation">,</span> <span class="token string">'**/tests/unit/**/*.spec.{j,t}s?(x)'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">jest</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="选择-airbnb-风格" tabindex="-1"><a class="header-anchor" href="#选择-airbnb-风格" aria-hidden="true">#</a> 选择 Airbnb 风格</h3>
<p>在自定义自己的<code v-pre>rules</code>,也可以执行<code v-pre>npm init @eslint/config</code>配置社区比较流行的自定义风格，使用<code v-pre>Airbnb</code></p>
<p><img src="https://files.mdnice.com/user/24614/9ac09898-ced2-4bf6-a6e5-459b5dfbf293.png" alt="">
<img src="https://files.mdnice.com/user/24614/2faced0f-e063-4bae-a337-0074f6dd0159.png" alt="">
<img src="https://files.mdnice.com/user/24614/ce45ea1a-9b08-48ec-8e63-ed124cf79ac5.png" alt="">
<img src="https://files.mdnice.com/user/24614/bde87ba7-2b85-4013-8991-3f5bd7766116.png" alt="">
<img src="https://files.mdnice.com/user/24614/ec5ef823-570b-4862-8e0b-b88f835acde0.png" alt="">
<img src="https://files.mdnice.com/user/24614/e520169c-f8df-4308-9ba3-12a4df63192c.png" alt="">
当我们选择<code v-pre>airbnb</code>风格后，执行<code v-pre>npx eslint ./src/index.js</code>
<img src="https://files.mdnice.com/user/24614/163ba005-48ce-45dc-994b-767c4eafd787.png" alt="">
提示<code v-pre>index.js</code>有一个规则错误</p>
<p><code v-pre>Expected 1 empty line after import statement not followed by another import import/newline-after-import</code>
我们将第三行换行就行</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span><span class="token punctuation">;</span>

<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看下生成的<code v-pre>.eslintrc.js</code>这个一般在你项目中多少有看到也可以是 json 类型</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'plugin:vue/essential'</span><span class="token punctuation">,</span> <span class="token string">'airbnb-base'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">'latest'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">'module'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'vue'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>rules</code>有很多的配置，可以<a href="https://eslint.org/docs/rules/" title="参考官方" target="_blank" rel="noopener noreferrer">参考官方<ExternalLinkIcon/></a></p>
<h3 id="运行时检测-eslint" tabindex="-1"><a class="header-anchor" href="#运行时检测-eslint" aria-hidden="true">#</a> 运行时检测 eslint</h3>
<p>一般正常情况当我们启动服务时，如果我们代码有写得不规范，开发工具就终端就会给我们提示警告，此时我们需要<a href="https://www.npmjs.com/package/eslint-loader" title="eslint-loader" target="_blank" rel="noopener noreferrer">eslint-loader<ExternalLinkIcon/></a>，只需要这样配置即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(js|jsx)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'babel-loader'</span><span class="token punctuation">,</span> <span class="token string">'eslint-loader'</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是官方已经不建议这么用了<code v-pre>eslint-loader</code>已经停止了维护，官方建议使用<code v-pre>eslint-webpack-plugin</code></p>
<p>在<code v-pre>webpack.config.js</code>我们可以这么做</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> ESLintPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'eslint-webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">ESLintPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们运行<code v-pre>npm run server</code>时就会检查代码错误
<img src="https://files.mdnice.com/user/24614/8b828b60-90b6-4d71-956f-72701f956001.png" alt="">
提示在<code v-pre>utils/index.js</code>中不能使用<code v-pre>console</code>,很显然，这条规则并不符合我们的初衷，我只需要在生成环境环境不打印<code v-pre>console</code>才行</p>
<p>当我们修改<code v-pre>.eslintrc.js</code>时，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'no-console'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/extensions'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'always'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将<code v-pre>rules</code>规则的<code v-pre>noconsole: 0</code>允许使用<code v-pre>console</code>,当我修改完时，再次运行，终端就不会报错了</p>
<p>我们再加个规则,<code v-pre>max-params:2</code>,函数形参不能到过三个，如果超过三个就会报错</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'no-console'</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">'import/extensions'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token string">'always'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">'max-params'</span><span class="token operator">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// utils/index.js</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://files.mdnice.com/user/24614/c0908314-7146-40ba-85fd-aa4e07076ab9.png" alt="">
因为默认<code v-pre>max-params</code>默认最多就是 3 个参数，所以在运行时就提示报错了。
于是你改成下面这样就可以了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// utils/index.js</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> <span class="token operator">...</span>rest</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vscode-的-eslint-插件" tabindex="-1"><a class="header-anchor" href="#vscode-的-eslint-插件" aria-hidden="true">#</a> vscode 的 eslint 插件</h3>
<p>除了<code v-pre>eslint-webpack-plugin</code>的插件帮我们在代码运行时就可以检测出代码的一些不规范问题，我们通常可以结合<code v-pre>vscode</code>插件帮我更友好的提示,我们需要在写代码的时候，编辑器就已经给我们提示错误。
<img src="https://files.mdnice.com/user/24614/17b8f537-3e91-4e7e-89a9-fb79b9463928.png" alt=""></p>
<p>安装完后，打开对应文件,就会有对应的提示
<img src="https://files.mdnice.com/user/24614/2b0bf895-91cf-476c-9bc6-fa48ec108308.png" alt="">
并且你可以通过提示跳转到对应的<code v-pre>eslint</code></p>
<h3 id="prettierrc-自动格式化代码" tabindex="-1"><a class="header-anchor" href="#prettierrc-自动格式化代码" aria-hidden="true">#</a> .prettierrc 自动格式化代码</h3>
<p>在<code v-pre>vscode</code>中装上插件<code v-pre>Prettier code formatter</code>
<img src="https://files.mdnice.com/user/24614/f64cf4a0-54d0-4516-8833-7e301728e01b.png" alt=""></p>
<p>然后在根目录下创建<code v-pre>.prettierrc.json</code>文件</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"singleQuote"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"printWidth"</span><span class="token operator">:</span> <span class="token number">150</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置编辑器的代码长度 printWidth 是 150,设置 singleQuote 单引号。</p>
<p>我们也需要设置一下<code v-pre>vscode</code>的<code v-pre>settings.json</code>,主要设置参照如下
<img src="https://files.mdnice.com/user/24614/8eb50000-5b47-41ea-b753-cd4b66646adc.png" alt="">
然后添加一行自动保存功能,这样我们就可以保存时，自动格式化自己的代码</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"editor.codeActionsOnSave"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"source.fixAll.eslint"</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为<code v-pre>eslint</code>既检查了代码又可以根据<code v-pre>.eslintrc.js</code>美化代码，但是<code v-pre>prettierrc</code>有时会与<code v-pre>eslint</code>的配置格式有冲突，所以此时 vscode 格式化的状态就是混乱的，因此有时候很奇怪，所以你需要改<code v-pre>settings.json</code>默认改成<code v-pre>eslint</code>,具体可以参考知乎这篇文章<a href="https://zhuanlan.zhihu.com/p/347339865" title="prettierrc" target="_blank" rel="noopener noreferrer">prettierrc<ExternalLinkIcon/></a></p>
<p>网上关于<code v-pre>prettierrc</code>的配置有很多，具体上还是看组内统一的规范，这里我贴一份之前项目格式化所用的，估计不同团队的配置绝大数是大同小异。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// .prettierrc.json</span>
<span class="token punctuation">{</span>
  <span class="token string-property property">"eslintIntegration"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">"printWidth"</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token string-property property">"tabWidth"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token string-property property">"useTabs"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token string-property property">"semi"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">"singleQuote"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">"proseWrap"</span><span class="token operator">:</span> <span class="token string">"preserve"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"arrowParens"</span><span class="token operator">:</span> <span class="token string">"avoid"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"bracketSpacing"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">"disableLanguages"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"vue"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">"endOfLine"</span><span class="token operator">:</span> <span class="token string">"auto"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"htmlWhitespaceSensitivity"</span><span class="token operator">:</span> <span class="token string">"ignore"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"ignorePath"</span><span class="token operator">:</span> <span class="token string">".prettierignore"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"jsxBracketSameLine"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token string-property property">"jsxSingleQuote"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token string-property property">"requireConfig"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token string-property property">"trailingComma"</span><span class="token operator">:</span> <span class="token string">"es5"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p><code v-pre>eslint</code>在项目中的配置，主要利用<code v-pre>npm init @eslint/config</code>快速初始化一份<code v-pre>eslint</code>配置，在试用前先进行安装<code v-pre>npm i eslint --save-dev</code></p>
</li>
<li>
<p>开发环境使用<code v-pre>eslint-loader</code>,现在采用更多的是<code v-pre>eslint-webpack-plugins</code></p>
</li>
<li>
<p>采用<code v-pre>Airbnb</code>风格格式校验代码</p>
</li>
<li>
<p>.prettierrc.json 格式化代码，不过注意与<code v-pre>eslint</code>格式冲突的问题。</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/webpack/webpack-06-eslint" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
