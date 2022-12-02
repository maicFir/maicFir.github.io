<template><div><p>全文关键词检索高亮，这个在业务中常有的功能，比如浏览器默认有个功能，关键词搜索就会匹配你检索的文字，并且会给你高亮，这是怎么实现的呢？</p>
<p>正文开始...</p>
<p>在开始正文之前，主要是利用字符串<code v-pre>replace</code>这个<code v-pre>API</code>,你将要了解到如下几个知识</p>
<p>1、字符串<code v-pre>replace</code>替换</p>
<p>2、如何扩展<code v-pre>elementUI</code>组件源码支持下拉框关键字搜索高亮</p>
<p>3、<code v-pre>正则匹配</code>对应结果，<code v-pre>replace</code>高阶用法</p>
<h3 id="了解需求" tabindex="-1"><a class="header-anchor" href="#了解需求" aria-hidden="true">#</a> 了解需求</h3>
<p>比如，现在一个常用的下拉框，我需要搜索关键词模糊匹配，我们看下代码</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-form-item</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>爱好<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-select</span>
      <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>condition.fv<span class="token punctuation">"</span></span>
      <span class="token attr-name">clearable</span>
      <span class="token attr-name">filterable</span>
      <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请选择爱好<span class="token punctuation">"</span></span>
    <span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-option</span>
        <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, index) in favData<span class="token punctuation">"</span></span>
        <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span>
        <span class="token attr-name">:label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span>
        <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span>
      <span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-option</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-select</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-form-item</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">favData</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">'我喜欢篮球'</span><span class="token punctuation">,</span>
          <span class="token string">'我喜欢乒乓球'</span><span class="token punctuation">,</span>
          <span class="token string">'足球'</span><span class="token punctuation">,</span>
          <span class="token string">'游泳'</span><span class="token punctuation">,</span>
          <span class="token string">'跳水'</span><span class="token punctuation">,</span>
          <span class="token string">'aabbccaa'</span><span class="token punctuation">,</span>
          <span class="token string">'hello aa, test'</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现当我在<code v-pre>el-select</code>组件上添加<code v-pre>filterable</code>属性后，就可以关键词过滤了，但是只是过滤了，但是我想关键词高亮</p>
<p>你会发现<code v-pre>el-select</code>显示的<code v-pre>label</code>并没有提供插槽或者其他方式去自定义显示<code v-pre>label</code>，源码里是直接显示的</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!--https://github.com/ElemeFE/element/blob/dev/packages/select/src/option.vue--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span>
    <span class="token attr-name">@mouseenter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hoverItem<span class="token punctuation">"</span></span>
    <span class="token attr-name">@click.stop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectOptionClick<span class="token punctuation">"</span></span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>el-select-dropdown__item<span class="token punctuation">"</span></span>
    <span class="token attr-name">v-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>visible<span class="token punctuation">"</span></span>
    <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{
      <span class="token punctuation">'</span>selected<span class="token punctuation">'</span>: itemSelected,
      <span class="token punctuation">'</span>is-disabled<span class="token punctuation">'</span>: disabled || groupDisabled || limitReached,
      <span class="token punctuation">'</span>hover<span class="token punctuation">'</span>: hover
    }<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>{{ currentLabel }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'ElOption'</span><span class="token punctuation">,</span>
   <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">isObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object object]'</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">currentLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>label <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isObject <span class="token operator">?</span> <span class="token string">''</span> <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们尝试修改扩展增强下这个<code v-pre>option</code>,于是想办法去修改<code v-pre>currentLabel</code>,但是你会发现你想让<code v-pre>computed</code>的<code v-pre>currentLabel</code>返回一个<code v-pre>jsx</code>貌似不太可能，因为渲染出来的会带标签，所以只能考虑重写<code v-pre>render</code>方法</p>
<h3 id="重写option源码" tabindex="-1"><a class="header-anchor" href="#重写option源码" aria-hidden="true">#</a> 重写Option源码</h3>
<p>于是我们重写<code v-pre>render</code>,新建一个<code v-pre>extendElement.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// src/extendElement.js</span>
<span class="token comment">// eslint-disable-next-line import/prefer-default-export</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">extendElemenUI</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">ElementUI</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> Option <span class="token punctuation">}</span> <span class="token operator">=</span> ElementUI<span class="token punctuation">;</span>
  <span class="token comment">// 重写elementUI下拉框的Option,让其支持模糊搜索关键字高亮</span>
  <span class="token comment">// eslint-disable-next-line no-unused-vars</span>
  Option<span class="token punctuation">.</span><span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> visible<span class="token punctuation">,</span> itemSelected<span class="token punctuation">,</span> disabled<span class="token punctuation">,</span> groupDisabled<span class="token punctuation">,</span> limitReached<span class="token punctuation">,</span> selectOptionClick<span class="token punctuation">,</span> hoverItem<span class="token punctuation">,</span> currentLabel<span class="token punctuation">,</span> hover<span class="token punctuation">,</span> <span class="token literal-property property">select</span><span class="token operator">:</span> <span class="token punctuation">{</span> query <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">setSlectClass</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">'el-select-dropdown__item'</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>itemSelected<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        str <span class="token operator">+=</span> <span class="token string">' selected'</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>disabled <span class="token operator">||</span> groupDisabled <span class="token operator">||</span> limitReached<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        str <span class="token operator">+=</span> <span class="token string">' is-disabled'</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>hover<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        str <span class="token operator">+=</span> <span class="token string">' hover'</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>visible <span class="token operator">?</span> <span class="token operator">&lt;</span>li
      on<span class="token operator">-</span>mouseenter<span class="token operator">=</span><span class="token punctuation">{</span>hoverItem<span class="token punctuation">}</span>
      on<span class="token operator">-</span>click<span class="token operator">=</span><span class="token punctuation">{</span>selectOptionClick<span class="token punctuation">}</span>
      <span class="token keyword">class</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token function">setSlectClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token operator">></span>
      <span class="token operator">&lt;</span>slot<span class="token operator">></span>
        <span class="token operator">&lt;</span>span domPropsInnerHTML<span class="token operator">=</span><span class="token punctuation">{</span><span class="token function">hightText</span><span class="token punctuation">(</span>currentLabel<span class="token punctuation">,</span> query<span class="token punctuation">,</span> <span class="token string">'all'</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>li <span class="token operator">></span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们注意到我们就是重写了<code v-pre>Option</code>这个组件，x我们在<code v-pre>install</code>安装前就拦截这个组件，然后重写了<code v-pre>Option</code>，主要是在<code v-pre>ElementUI</code>注册前完成,<code v-pre>jsx</code>渲染标签的关键在于<code v-pre>domPropsInnerHTML</code>这个接口，如果在模版中我们就是使用<code v-pre>v-html</code>去代替的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'element-ui/lib/theme-chalk/index.css'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ElementUI <span class="token keyword">from</span> <span class="token string">'element-ui'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> installCustComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/components'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> extendElemenUI <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./extendElement'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">'./router'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">'./store'</span><span class="token punctuation">;</span>
<span class="token function">installCustComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>productionTip <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token comment">// 这里进行了扩展，主要是想扩展ElementUI不支持的功能，一定是在组件未注册前进行拦截，重写部分组件</span>
<span class="token function">extendElemenUI</span><span class="token punctuation">(</span>ElementUI<span class="token punctuation">)</span><span class="token punctuation">;</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementUI<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* eslint-disable no-new */</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  router<span class="token punctuation">,</span>
  store<span class="token punctuation">,</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现在高亮关键字有用到这个<code v-pre>hightText</code>方法,主要支持关键词全匹配与部分匹配，默认全匹配</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hightText <span class="token operator">=</span> <span class="token punctuation">(</span>sourceStr<span class="token punctuation">,</span> curentVal<span class="token punctuation">,</span> reg <span class="token operator">=</span> <span class="token string">'all'</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>curentVal <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceStr<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> sourceStr<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>curentVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> hightStr <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token operator">?</span> ret<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>reg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 全匹配</span>
    <span class="token keyword">return</span> sourceStr<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>hightStr<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cur <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        prev<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;span class="hight" style="color: red;font-weight:bold"></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>hightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        prev<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cur<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> hightStr
    <span class="token operator">?</span> sourceStr<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
      hightStr<span class="token punctuation">,</span>
      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;span class="hight" style="color: red;font-weight:bold"></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>hightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>sourceStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的一块代码中我们发现，非全匹配，我们就用到了<code v-pre>replace</code>这个方法，主要是替换匹配到的关键字，但是这个<code v-pre>replace</code>我们结合<code v-pre>match</code>,我们发现无法重复匹配</p>
<p>假设<code v-pre>aabbccaa</code>需要高亮<code v-pre>aa</code>，如果用不借助数组或者正则方式处理，我们使用的是<code v-pre>replace</code>字符串匹配的方式，那么一旦匹配到就结束，所以借助了数组的方式做了一点取巧实现了全检索高亮</p>
<p>看下最终的结果</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e2eda1dccce4e5a9aba9a7649d0b16d~tplv-k3u1fbpfcp-watermark.image?" alt="05-keep-alive (1).gif"></p>
<h3 id="replace" tabindex="-1"><a class="header-anchor" href="#replace" aria-hidden="true">#</a> replace</h3>
<p><code v-pre>replace</code>高亮关键词基本就已经完成这个需求功能，我们重新看下官方MDN<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace" title="replace" target="_blank" rel="noopener noreferrer">replace<ExternalLinkIcon/></a>的解释</p>
<p>replace()<code v-pre>方法返回一个由替换值（</code>replacement<code v-pre>）替换部分或所有的模式（</code>pattern<code v-pre>）匹配项后的新字符串。模式可以是一个字符串或者一个[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp &quot;正则表达式&quot;)，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。**如果</code>pattern<code v-pre>是字符串，则仅替换第一个匹配项。**</code></p>
<p>所以我们从这段解释中可以发现，当我们使用<code v-pre>replace</code>替换，如果<code v-pre>pattern</code>是字符串，则仅替换第一个匹配项</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var sourceStr = 'aabbbccaa';
const ret = sourceStr.replace('aa', 111);
console.log(ret) // 111bbbccaa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们发现匹配模式还可以是正则</p>
<p>所以如果想全匹配，那么可以用<code v-pre>正则</code>来做</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sourceStr <span class="token operator">=</span> <span class="token string">'aabbbccaa'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> sourceStr<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">aa</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token comment">// 111bbbcc111</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以我们也可以将我们上面的<code v-pre>hightText</code>方法改成下面这样</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hightText <span class="token operator">=</span> <span class="token punctuation">(</span>sourceStr<span class="token punctuation">,</span> curentVal<span class="token punctuation">,</span> reg <span class="token operator">=</span> <span class="token string">'all'</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>curentVal <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sourceStr<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> sourceStr<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>curentVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> hightStr <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token operator">?</span> ret<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">hightDom</span> <span class="token operator">=</span> <span class="token parameter">text</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;span class="hight" style='color: red;font-weight:bold'></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>text<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>hightStr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>reg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 全匹配</span>
      <span class="token keyword">return</span> sourceStr<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>hightStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token string">'ig'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">hightDom</span><span class="token punctuation">(</span>hightStr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sourceStr<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>
      hightStr<span class="token punctuation">,</span> <span class="token function">hightDom</span><span class="token punctuation">(</span>hightStr<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> sourceStr<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>官方的<code v-pre>replace</code>语法是这样的
<code v-pre>str.replace(regexp|substr, newSubStr|function) </code>
也就是说<code v-pre>replace</code>的第一个参数是字符串或者正则，第二个参数是字符串或者一个函数</p>
<ul>
<li>字符串</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sourceStr <span class="token operator">=</span> <span class="token string">'aabbbccaa'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> sourceStr<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">'aa'</span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token comment">// 111bbbccaa</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>正则</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sourceStr <span class="token operator">=</span> <span class="token string">'aabbbccaa'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> sourceStr<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">aa</span><span class="token regex-delimiter">/</span><span class="token regex-flags">ig</span></span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token comment">// 111bbbcc111</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'abc12345#$*%'</span>
<span class="token keyword">var</span> newString <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">([^\d]*)(\d*)([^\w]*)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">match<span class="token punctuation">,</span> $1<span class="token punctuation">,</span> $2<span class="token punctuation">,</span> $3<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>match<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> string<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>$1<span class="token punctuation">,</span> $2<span class="token punctuation">,</span> $3<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看下第二次函数，对应的<code v-pre>mactch</code>与<code v-pre>string</code>是原数据，<code v-pre>$1</code>...<code v-pre>$3</code>是对应正则匹配的，如果我想把中间对应的数字换成其他的呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'abc12345#$*%'</span>
<span class="token keyword">var</span> newString <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">([^\d]*)(\d*)([^\w]*)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">match<span class="token punctuation">,</span> $1<span class="token punctuation">,</span> $2<span class="token punctuation">,</span> $3<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> $1<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>$1<span class="token punctuation">,</span> <span class="token string">'公众号:'</span><span class="token punctuation">)</span> <span class="token operator">+</span> $2<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>$2<span class="token punctuation">,</span> <span class="token string">'Web技术学苑'</span><span class="token punctuation">)</span><span class="token operator">+</span>$3<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>$3<span class="token punctuation">,</span> <span class="token string">'-Maic'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newString<span class="token punctuation">)</span> <span class="token comment">//公众号:Web技术学苑-Maic</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于<code v-pre>function</code>的参数可以参考下面这个表</p>
<table>
<thead>
<tr>
<th>变量名</th>
<th>代表的值</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>match</code></td>
<td>匹配的子串。（对应于上述的 $&amp;。）</td>
</tr>
<tr>
<td><code v-pre>$1,$2, ...</code></td>
<td>假如 replace() 方法的第一个参数是一个<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp" title="`RegExp`" target="_blank" rel="noopener noreferrer"><code v-pre>RegExp</code><ExternalLinkIcon/></a> 对象，则代表第 n 个括号匹配的字符串。（对应于上述的 $1，$2 等。）例如，如果是用 <code v-pre>/([^\d]*)(\d*)([^\w]*)/</code> 这个来匹配，<code v-pre>$1</code> 就是匹配的 <code v-pre>([^\d]*)</code>，<code v-pre>$2</code> 就是匹配的 <code v-pre>(\d*)</code>，依次类推...</td>
</tr>
<tr>
<td><code v-pre>offset</code></td>
<td>匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 <code v-pre>'abcd'</code>，匹配到的子字符串是 <code v-pre>'bc'</code>，那么这个参数将会是 1）</td>
</tr>
<tr>
<td><code v-pre>string</code></td>
<td>被匹配的原字符串。</td>
</tr>
</tbody>
</table>
<p>在业务中你也会经常看到这样的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sourceStr <span class="token operator">=</span> <span class="token string">'aabbbccaa'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> sourceStr<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">aa</span><span class="token regex-delimiter">/</span><span class="token regex-flags">ig</span></span><span class="token punctuation">,</span> <span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">'bbb'</span><span class="token punctuation">,</span> <span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token comment">// 111222cc111'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>replace</code>调用返回的是一个新字符串，所以可以继续调用<code v-pre>replace</code>方法,因为<code v-pre>replace</code>是挂载在<code v-pre>String.prototype</code>上的方法，所以所有字符串可以链式调用</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>以一个实际例子，通过扩展<code v-pre>el-select</code>的<code v-pre>Option</code>组件实现高亮模糊关键字匹配与全匹配，不过这种方式有缺陷，无法根据当前组件有条件的选择是否高亮匹配，因为我们是在注册前重写了<code v-pre>render</code>，这样会导致所有下拉组件都会高亮模糊关键字</p>
</li>
<li>
<p>讲解<code v-pre>replace</code>这个关键字函数，如果字符串替换就要知道这个<code v-pre>API</code></p>
</li>
<li>
<p><code v-pre>replace</code>支持正则与字符串匹配，如果是字符串，则只会匹配首次，一旦匹配就成功替换，而正则可以做到全局匹配替换</p>
</li>
<li>
<p>关于<code v-pre>replace</code>第二个参数是<code v-pre>回调函数</code>的几个参数的讲解,当是回调函数时，第一个是<code v-pre>match</code>、<code v-pre>string</code>是原字符串，其余的<code v-pre>$1,...$n</code>是对应正则匹配的内容</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/vue/05-keep-alive" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
