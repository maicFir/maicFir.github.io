<template><div><p>在客户端，我们所接触到的绝大部分本地缓存方案主要有<code v-pre>localStorage</code>以及<code v-pre>sessionStorage</code>,其实<code v-pre>Storage</code>除了这两大高频 api,另外还有<code v-pre>IndexDB</code>、<code v-pre>cookies</code>、<code v-pre>WebSQL</code>,<code v-pre>Trust Token(信任令牌)</code>，<code v-pre>cookies</code>相对来说在前端接触比另外几个多点，<code v-pre>IndexDB</code>在平常业务中肯定有所耳闻，至于其他的貌似还真没用过</p>
<p>本文是笔者关于<code v-pre>IndexDB</code>的一个简单的实践示例，一起来学习下<code v-pre>IndexDB</code>，因为有时候，还是真的很有用。</p>
<p>正文开始...</p>
<p>在阅读本文之前，本文主要从以下几点去探讨<code v-pre>IndexDB</code></p>
<ul>
<li>
<p>为什么会有<code v-pre>IndexDB</code>,本地<code v-pre>localStorage</code>与<code v-pre>sessionStorage</code>不够用吗</p>
</li>
<li>
<p><code v-pre>IndexDB</code>有何特征</p>
</li>
<li>
<p>以一个示例加深对于<code v-pre>IndexDB</code>的理解</p>
</li>
<li>
<p><code v-pre>IndexDB</code>在什么情况下能为我们的业务解决什么样的问题</p>
</li>
</ul>
<h3 id="了解-indexdb" tabindex="-1"><a class="header-anchor" href="#了解-indexdb" aria-hidden="true">#</a> 了解 IndexDB</h3>
<p>根据官方 MDN<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB" title="Index DB" target="_blank" rel="noopener noreferrer">Index DB<ExternalLinkIcon/></a>文档查询解释</p>
<ul>
<li><code v-pre>IndexDB</code>是浏览器提供的一种可持久化数据存储方案</li>
<li>支持多种类型的键，可以支持存储任何类型的数据</li>
<li>支持键检索，查询，新增，删除操作</li>
<li>在客户端浏览器可以存储大数据量，适用于离线应用</li>
<li>所有接口都是基于事件
在与<code v-pre>lcoalStorage</code>或者<code v-pre>seesionStorage</code>来说，<code v-pre>IndexDB</code>存储数据量更大，更强大</li>
</ul>
<h3 id="indexdb-特征" tabindex="-1"><a class="header-anchor" href="#indexdb-特征" aria-hidden="true">#</a> IndexDB 特征</h3>
<p>你可以把<code v-pre>IndexDB</code>当成一个本地的数据库，如果你要使用它。那么会有以下几个步骤</p>
<ul>
<li>
<p>打开数据库，创建本地数据库并连接<code v-pre>IndexDB.open('lcoal-test')</code></p>
</li>
<li>
<p>创建对象库<code v-pre>db.createObjectStore('user')</code></p>
</li>
<li>
<p>基于事务操作本地数据库，实现增删查改</p>
</li>
</ul>
<h3 id="举个例子" tabindex="-1"><a class="header-anchor" href="#举个例子" aria-hidden="true">#</a> 举个例子</h3>
<p>本示例主要考虑最简单方式实现，也不依赖任何工程化工具，首先新建一个<code v-pre>index.html</code>，在<code v-pre>index.html</code>中引入<code v-pre>vue2.7</code>,<code v-pre>vue2.7</code>出来了，尝下鲜，主要支持组合式 api 方式了，基本<code v-pre>api</code>使用上与<code v-pre>组合式API</code>没有啥区别。</p>
<p>并且，这里我没有直接用原生<code v-pre>IndexDB</code>，而是使用了官方文档推荐的一个库<a href="https://dexie.org/docs/API-Reference" title="dexie.js" target="_blank" rel="noopener noreferrer">dexie.js<ExternalLinkIcon/></a>,因为官方原生<code v-pre>API</code>太难用了,而这个库是对原生<code v-pre>IndexDB</code>的二次封装，使用起来更高效</p>
<p><code v-pre>index.html</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>初识index-db<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./css/index.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>{{lesson}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript:void(0)<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleAdd(<span class="token punctuation">'</span>add<span class="token punctuation">'</span>)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>新增<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content-box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search-bar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入名称<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>searchName<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleSearch<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点击搜索<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item) in initData<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>{{item.name}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>{{item.age}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleAdd(<span class="token punctuation">'</span>edit<span class="token punctuation">'</span>,item)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>编辑<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleDel(item)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap-modal<span class="token punctuation">"</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>showDiag<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入name<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>formParams.name<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入age<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>formParams.age<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleSure<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>确认<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdn.bootcdn.net/ajax/libs/vue/2.7.0/vue.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./js/dexie.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们引入业务<code v-pre>js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token operator">...</span>
<span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">"module"</span><span class="token operator">></span>
  <span class="token comment">// 引入hooks</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> useApp<span class="token punctuation">,</span> useIndexDB <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./hooks/index.js'</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> toRefs<span class="token punctuation">,</span> createApp<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token operator">=</span> Vue<span class="token punctuation">;</span>
  <span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> searchName<span class="token punctuation">,</span> lesson<span class="token punctuation">,</span> initData<span class="token punctuation">,</span> showDiag<span class="token punctuation">,</span> view<span class="token punctuation">,</span> formParams <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> add_indexDB<span class="token punctuation">,</span> update_indexDB<span class="token punctuation">,</span> search_indexDB<span class="token punctuation">,</span> del_indexDB <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useIndexDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// todo 查询数据</span>
      <span class="token keyword">const</span> featchList <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>searchName <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> colletion <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">search_indexDB</span><span class="token punctuation">(</span>searchName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        initData<span class="token punctuation">.</span>value <span class="token operator">=</span> colletion<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">featchList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// todo 编辑or添加</span>
      <span class="token keyword">const</span> <span class="token function-variable function">handleAdd</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">viewType<span class="token punctuation">,</span> row</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        searchName<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
        view<span class="token punctuation">.</span>value <span class="token operator">=</span> viewType<span class="token punctuation">;</span>
        showDiag<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token comment">// 编辑</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>view<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token string">'edit'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span>
          formParams<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token operator">...</span>row
          <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// 添加</span>
          formParams<span class="token punctuation">.</span>value<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
          formParams<span class="token punctuation">.</span>value<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> <span class="token function-variable function">handleSure</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        showDiag<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        view<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token string">'edit'</span> <span class="token operator">?</span> <span class="token function">update_indexDB</span><span class="token punctuation">(</span>formParams<span class="token punctuation">.</span>value<span class="token punctuation">,</span> featchList<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">add_indexDB</span><span class="token punctuation">(</span>formParams<span class="token punctuation">.</span>value<span class="token punctuation">,</span> featchList<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> <span class="token function-variable function">handleDel</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">row</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">del_indexDB</span><span class="token punctuation">(</span>row<span class="token punctuation">.</span>id<span class="token punctuation">,</span> featchList<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token comment">// 搜索</span>
      <span class="token keyword">const</span> <span class="token function-variable function">handleSearch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">featchList</span><span class="token punctuation">(</span>searchName<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        searchName<span class="token punctuation">,</span>
        lesson<span class="token punctuation">,</span>
        showDiag<span class="token punctuation">,</span>
        initData<span class="token punctuation">,</span>
        formParams<span class="token punctuation">,</span>
        handleAdd<span class="token punctuation">,</span>
        handleSure<span class="token punctuation">,</span>
        handleDel<span class="token punctuation">,</span>
        handleSearch
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 绑定app</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看下这里面引入的<code v-pre>useApp, useIndexDB</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// hooks/index.js</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> toRefs<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token operator">=</span> Vue<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">useApp</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> useInfo <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">lesson</span><span class="token operator">:</span> <span class="token string">'初识IndexDB，实现本地crud一把梭'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">initData</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">showDiag</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">view</span><span class="token operator">:</span> <span class="token string">'add'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">searchName</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token literal-property property">formParams</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token string">''</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token function">toRefs</span><span class="token punctuation">(</span>useInfo<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// IndexDB hooks</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">useIndexDB</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> db <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dexie</span><span class="token punctuation">(</span><span class="token string">'local-test'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  db<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stores</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">'++id, name, age'</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 添加数据</span>
  <span class="token keyword">const</span> <span class="token function-variable function">add_indexDB</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 更新数据</span>
  <span class="token keyword">const</span> <span class="token function-variable function">update_indexDB</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 查询</span>
  <span class="token keyword">const</span> <span class="token function-variable function">search_indexDB</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> colletion <span class="token operator">=</span> params <span class="token operator">?</span> <span class="token keyword">await</span> db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">await</span> db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> colletion<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 删除</span>
  <span class="token keyword">const</span> <span class="token function-variable function">del_indexDB</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">id<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    db<span class="token punctuation">,</span>
    add_indexDB<span class="token punctuation">,</span>
    update_indexDB<span class="token punctuation">,</span>
    search_indexDB<span class="token punctuation">,</span>
    del_indexDB
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>页面已经搭完，我们打开页面看下
<img src="https://files.mdnice.com/user/24614/c840468b-2ac1-40e0-9d3b-e41a4891ccc4.png" alt=""></p>
<ul>
<li>新增</li>
</ul>
<p>现在我们新增一条数据,在页面点击新增按钮,在<code v-pre>applcation/Storage/IndexDB</code>中就会保存一条数据</p>
<p><img src="https://files.mdnice.com/user/24614/3e06228c-d6d9-4949-bd38-13a874d3e1bc.png" alt=""></p>
<p>当我们刷新时，数据页面仍然会保留上一次的数据</p>
<p>在我们新增操作，然后刷新的过程中主要发生了什么呢</p>
<p>其实<code v-pre>IndexDB</code>主要做了以下几件事情</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// hooks/index.js</span>
<span class="token comment">// 1 建立连接，创建db</span>
<span class="token keyword">const</span> db <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dexie</span><span class="token punctuation">(</span><span class="token string">'local-test'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//2 创建了一个user的表名</span>
db<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stores</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">'++id, name, age'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 3 向user中添加数据</span>
<span class="token comment">// 添加数据</span>
<span class="token keyword">const</span> <span class="token function-variable function">add_indexDB</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//4 查询user表中的数据，并返回</span>
<span class="token keyword">const</span> <span class="token function-variable function">search_indexDB</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> colletion <span class="token operator">=</span> params <span class="token operator">?</span> <span class="token keyword">await</span> db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">await</span> db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> colletion<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在点击创建时，然后点击确认操作，就是在创建数据操作</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token comment">// 点击确认会调用这个方法</span>
<span class="token keyword">const</span> <span class="token function-variable function">handleSure</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// showDiag.value = false;</span>
  view<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token string">'edit'</span> <span class="token operator">?</span> <span class="token function">update_indexDB</span><span class="token punctuation">(</span>formParams<span class="token punctuation">.</span>value<span class="token punctuation">,</span> featchList<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">add_indexDB</span><span class="token punctuation">(</span>formParams<span class="token punctuation">.</span>value<span class="token punctuation">,</span> featchList<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且注意，我们还传入了一个<code v-pre>featchList</code>方法，这是在添加数据成功了，我们重新更新页面数据的一个回调</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
 <span class="token comment">// todo 查询数据</span>
<span class="token keyword">const</span> featchList <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>searchName <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> colletion <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">search_indexDB</span><span class="token punctuation">(</span>searchName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 页面数据赋值</span>
  initData<span class="token punctuation">.</span>value <span class="token operator">=</span> colletion<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此一个增加操作流程就已经结束</p>
<ul>
<li>更新</li>
</ul>
<p>当我们点击编辑时，我们尝试修改名称，然后点击确认，那么此时就调用更新数据操作</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// hooks/index.js</span>
<span class="token comment">// 更新数据</span>
<span class="token keyword">const</span> <span class="token function-variable function">update_indexDB</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用的是<code v-pre>put</code>方法直接就可以更新数据了</p>
<p>更新前
<img src="https://files.mdnice.com/user/24614/53321b2f-eec2-4684-8823-2c4fc822a4a4.png" alt=""></p>
<p>当我点击编辑</p>
<p>更新后
<img src="https://files.mdnice.com/user/24614/e28905fa-6919-499e-bd22-b3c29b30e768.png" alt=""></p>
<p>我们可以刷新右侧的刷新按钮现实对应的数据</p>
<ul>
<li>删除</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token comment">// 删除</span>
<span class="token keyword">const</span> <span class="token function-variable function">del_indexDB</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">id<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  db<span class="token punctuation">.</span>user<span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">'id'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除前
<img src="https://files.mdnice.com/user/24614/1971aed7-1280-495b-8f82-6634605c80d4.png" alt=""></p>
<p>删除后
<img src="https://files.mdnice.com/user/24614/db4452ae-358b-4afd-a3fb-ed254db1a43a.png" alt=""></p>
<p>当我们删除后，又可以重新添加</p>
<p>但是我们发现，每次只能添加一次，如果重复添加，那么此时会添加不了
<img src="https://files.mdnice.com/user/24614/20c7881f-3e3a-48c2-a003-68c700019fbc.png" alt=""></p>
<p>主要原因是<code v-pre>store</code>中的<code v-pre>key</code>重复了，无法重复添加，但是你把上一条删除了，你就可以重复添加了</p>
<p>而且你删除后，当你刷新页面，那条数据就真的没有，当你新增一条数据，只要你不删除，那么打开页面数据就会一直在页面中。</p>
<p>所以<code v-pre>IndexDB</code>这个相当于在前端设计了一个小型数据库能力了，真的是
<img src="https://img.soogif.com/s6xkwXQ200yEBYxkCYJ7B2Y1HNnbP5pY.png?scope=mdnice" alt=""></p>
<h3 id="什么样业务适合用-indexdb" tabindex="-1"><a class="header-anchor" href="#什么样业务适合用-indexdb" aria-hidden="true">#</a> 什么样业务适合用 IndexDB</h3>
<p>在上一个例子中，我们尝试用简单的一个例子去了解了<code v-pre>IndexDB</code>，但是在具体实际业务中，我们也很少会使用<code v-pre>IndexDB</code>去做这种杀鸡用牛刀的事，因为<code v-pre>localStorage</code>与<code v-pre>sessionStorage</code>也可以满足了，但如果是那种大数据量计算，如果涉及步骤操作那种，比如在这样的一个业务场景中，现在比较流行的低代码平台，拖拉拽的几个步骤就能生成一个页面，如果中途我只完成了一部分操作，页面不小心关掉了，此时如果你又让用户重新配置操作，那么体验就不会那么好，因此你可以尝试用<code v-pre>IndexDB</code>去做你操作流程的本地数据持久化操作，因为<code v-pre>IndexDB</code>可以存储足够大的数据量，你只需要保证你存的<code v-pre>Schema</code>数据能正常渲染你的页面就行，或者你的暂存操作也可以不用服务端处理，暂存功能完全可以依赖客户端做，这样也会减少服务端的压力。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>基础的了解<code v-pre>IndexDB</code>,它是浏览器提供的一种可持久化缓存数据方案，相当于一个本地的数据库</p>
</li>
<li>
<p>写了一个简单的例子，支持<code v-pre>IndexDB</code>的增删查改功能</p>
</li>
<li>
<p>探讨了业务实际使用场景，一般用于存储大数据量，暂存操作等</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/javascript/16-indexDB" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
