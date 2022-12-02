<template><div><p><code v-pre>阿里矢量图标</code>在项目中都用使用，通常一般我们引入<code v-pre>css</code>使用<code v-pre>iconfont</code>,或者我们使用<code v-pre>svg</code>加载图标，亦或我们可以使用<code v-pre>Unicode</code>，除了第一种与第二种，今天分享第三种方式<code v-pre>unicode</code>加载图标，希望看完在项目中能有些思考和帮助。</p>
<p>正文开始...</p>
<h3 id="css加载图标" tabindex="-1"><a class="header-anchor" href="#css加载图标" aria-hidden="true">#</a> css加载图标</h3>
<p>这是我们项目中最常用的一种方式</p>
<p>我在自己的<a href="https://www.iconfont.cn/" title="iconfont" target="_blank" rel="noopener noreferrer">iconfont<ExternalLinkIcon/></a>仓库中添加了几个图标</p>
<p><img src="https://files.mdnice.com/user/24614/4b2290ea-3c0d-4f16-9a41-b579818e98bf.png" alt=""></p>
<p>打开前阵子我开源的一个移动端项目<a href="https://github.com/maicFir/topfreeApplication" title="topfreeApplication" target="_blank" rel="noopener noreferrer">topfreeApplication<ExternalLinkIcon/></a></p>
<p>我们在<code v-pre>common.less</code>中引入阿里矢量图标的这个css</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/*src/assets/css/common.less*/</span>
<span class="token atrule"><span class="token rule">@import</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">'./normalize.less'</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>
<span class="token atrule"><span class="token rule">@import</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">'//at.alicdn.com/t/c/font_3470263_sw1krly77xh.css'</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在<code v-pre>src/pages/home/component/Search.vue</code>
引入一个图标
<img src="https://files.mdnice.com/user/24614/60e5f0c6-e914-4437-abab-867ba8781cfd.png" alt=""></p>
<p>所以加入了一行代码,就将<code v-pre>删除</code>图标就加入我们的页面中了</p>
<p><img src="https://files.mdnice.com/user/24614/212f9a8a-4693-4db7-8901-2e21215a42fe.png" alt=""></p>
<h3 id="svg图标" tabindex="-1"><a class="header-anchor" href="#svg图标" aria-hidden="true">#</a> svg图标</h3>
<p>在这之前，我们都是用<code v-pre>class</code>方式加载，现在我们看下<code v-pre>svg</code>方式加载图标</p>
<p>在<code v-pre>src/pages/home/component/Search.vue</code>组件中也看到我使用一个<code v-pre>svg-icon</code>的二次组件加载图标的</p>
<p>我把<code v-pre>svg-icon</code>注册成一个全局组件</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!--src/components/svg-icon/view/Index.vue--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tsx<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// 必须引入iconfont.js</span>
<span class="token keyword">import</span> <span class="token string">'@/assets/font/iconfont'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> PropType<span class="token punctuation">,</span> useAttrs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'SvgIcon'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String <span class="token keyword">as</span> PropType<span class="token operator">&lt;</span>string<span class="token operator">></span><span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">iconClass</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String <span class="token keyword">as</span> PropType<span class="token operator">&lt;</span>string<span class="token operator">></span><span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> iconClass <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>svg <span class="token keyword">class</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">icon </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>iconClass<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">}</span> aria<span class="token operator">-</span>hidden<span class="token operator">=</span><span class="token string">"true"</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token function">useAttrs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>use xlinkHref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">#icon-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">}</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>use<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>svg<span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>less<span class="token punctuation">"</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.icon</span> <span class="token punctuation">{</span>
  <span class="token property">fill</span><span class="token punctuation">:</span> currentColor<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>src/components/index.ts</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> SvgIcon <span class="token keyword">from</span> <span class="token string">'./svg-icon'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> DataEmpty <span class="token keyword">from</span> <span class="token string">'./data-empty'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> customComponents <span class="token operator">=</span> <span class="token punctuation">{</span>
  SvgIcon<span class="token punctuation">,</span>
  <span class="token literal-property property">CDataEmpty</span><span class="token operator">:</span> DataEmpty<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">installComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 自定义注册全局组件</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>customComponents<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">key</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> customComponents<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们必须引入<code v-pre>iconfont.js</code>具体可以参考使用<a href="https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&amp;helptype=code" title="web文档" target="_blank" rel="noopener noreferrer">web文档<ExternalLinkIcon/></a></p>
<h3 id="unicode-加载图标" tabindex="-1"><a class="header-anchor" href="#unicode-加载图标" aria-hidden="true">#</a> uniCode 加载图标</h3>
<p>我们注意到我们css加载图标实际上图标的一个伪类元素加载的一个<code v-pre>unicode</code>
<img src="https://files.mdnice.com/user/24614/969f2b67-ea77-4daf-86ec-9e07c312b84d.png" alt=""></p>
<p>加载图标实际上是引用了一个<code v-pre>uncode</code>，所以我们可以<code v-pre>借鸡生蛋</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search-bar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg-icon</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sousuo<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>20<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>20<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search-icon<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
        <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span>
        <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>searchVal<span class="token punctuation">"</span></span>
        <span class="token attr-name">@input</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleVal<span class="token punctuation">"</span></span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input-search<span class="token punctuation">"</span></span>
        <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Search...<span class="token punctuation">"</span></span>
      <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg-icon</span>
        <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>guanbi<span class="token punctuation">"</span></span>
        <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>20<span class="token punctuation">"</span></span>
        <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>20<span class="token punctuation">"</span></span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>close-icon<span class="token punctuation">"</span></span>
        <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClear<span class="token punctuation">"</span></span>
        <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>searchVal<span class="token punctuation">"</span></span>
      <span class="token punctuation">/></span></span>
      <span class="token comment">&lt;!-- &lt;i class="iconfont icon-shanchu">&lt;/i> --></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>iconfont maic-del<span class="token punctuation">"</span></span> <span class="token attr-name">unicode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token entity" title="&#xe718;">&amp;#xe718;</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们注意到我们在<code v-pre>i</code>标签上将<code v-pre>icon-shanchu</code>替换成了自己自定义的一个<code v-pre>class</code>，但同时也多了一个自定义属性<code v-pre>unicode=&quot;&amp;#xe718;&quot;</code>,这是一个很有用的属性，通常我们需要动态的更换图标时，我们就可以把这个<code v-pre>unicode</code>写在标签上，那怎么才能显示呢？</p>
<p><code v-pre>css</code>有一个超强的特性<code v-pre>attr</code>,在css里面我们可以动态的取到<code v-pre>unicode</code>的值</p>
<p>我们看下<code v-pre>css</code>代码,注意<code v-pre>unicode</code>就是你标签上的那个属性</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code> <span class="token selector">.maic-del</span> <span class="token punctuation">{</span>
  <span class="token selector">&amp;::before</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">attr</span><span class="token punctuation">(</span>unicode<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意到没有，利用<code v-pre>attr</code>这个特性就可以成功的加载到<code v-pre>unicode</code>了（不过注意，因为我这个是vue3项目，在vue2中，我们必须<code v-pre>v-html</code>渲染这整个标签，不然图标始终显示不出来）
<img src="https://files.mdnice.com/user/24614/17303f5a-2c23-4f76-8b0a-7b1772f88404.png" alt=""></p>
<p>所以你会发现在<code v-pre>css</code>中你用<code v-pre>attr</code>这个属性就可以动态的加载标签上的<code v-pre>unicode</code>了</p>
<h3 id="css的attr" tabindex="-1"><a class="header-anchor" href="#css的attr" aria-hidden="true">#</a> css的Attr</h3>
<p>在以上我们的图标用<code v-pre>unicode</code>就可以加载图标，同时我们也知道利用css中的<code v-pre>attr</code>特性成功解决了图标加载问题</p>
<p>我们看看<code v-pre>attr</code>这个属性可以在我们项目中怎么用,在哪些场景可以用？</p>
<p>我们尝试写一个计数器</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>startBtn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>开始计数<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span> <span class="token attr-name">data-content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的<code v-pre>css</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>  <span class="token selector">*</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">:root</span> <span class="token punctuation">{</span>
    <span class="token property">--color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token property">--width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">--height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">#app</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--width<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--height<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid <span class="token function">var</span><span class="token punctuation">(</span>--color<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">#app button</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 5px 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.content</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token function">var</span><span class="token punctuation">(</span>--width<span class="token punctuation">)</span> / 2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token function">var</span><span class="token punctuation">(</span>--width<span class="token punctuation">)</span> / 2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.content::before</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">attr</span><span class="token punctuation">(</span>data-content<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用了<code v-pre>css3</code>的函数<code v-pre>var</code>,以及<code v-pre>calc</code>,还有<code v-pre>attr</code>，这些都是<code v-pre>css3</code>的函数，注意<code v-pre>var</code>中的变量必须在<code v-pre>:root{}</code>中用<code v-pre>--xxx</code>申明成全局，即可使用</p>
<p>看下布局后的基本页面</p>
<p><img src="https://files.mdnice.com/user/24614/9c90ed83-ef09-4d97-b094-8e6441518a0e.png" alt="">
我们再看下对应的<code v-pre>js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// requestAnimationFrame 模拟setInterval</span>
 <span class="token keyword">function</span> <span class="token function">customizeSetInterval</span><span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span> interval</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> startTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> <span class="token function-variable function">loop</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> endTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>endTime <span class="token operator">-</span> startTime <span class="token operator">>=</span> interval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        startTime <span class="token operator">=</span> endTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      timer <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>loop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> timer<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
  <span class="token keyword">const</span> startBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"startBtn"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> contentDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">".content"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> initData <span class="token operator">=</span> contentDom<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>content <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">;</span>
  startBtn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 计数操作</span>
  <span class="token keyword">function</span> <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token parameter">interval <span class="token operator">=</span> <span class="token number">1000</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token function">customizeSetInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>initData <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        startBtn<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">"正在计数..."</span><span class="token punctuation">;</span>
        contentDom<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"data-content"</span><span class="token punctuation">,</span> initData<span class="token operator">--</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>initData <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          startBtn<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">"重新计数"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> interval<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>initData <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      initData <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
      window<span class="token punctuation">.</span><span class="token function">cancelAnimationFrame</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过操作<code v-pre>.content</code>的<code v-pre>data-content</code>,因此可以实现一个简单的倒计时效果。</p>
<p>因此我们就用css中<code v-pre>attr</code>结合<code v-pre>js</code>实现了一个计数器功能，关于css<code v-pre>attr</code>还有更多待挖掘的功能，在动态改变图标等，<code v-pre>attr</code>是一种不错的选择方案</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>加载阿里矢量图标除了使用<code v-pre>class</code>与<code v-pre>svg</code>,我们也可以使用<code v-pre>attr</code>加载使用<code v-pre>unicode</code></p>
</li>
<li>
<p><code v-pre>css3</code>函数<code v-pre>var</code>,<code v-pre>calc</code>,<code v-pre>attr</code>的使用</p>
</li>
<li>
<p>使用<code v-pre>css</code>的<code v-pre>attr</code>特性简单实现计数器的效果</p>
</li>
<li>
<p>本文示例<a href="https://github.com/maicFir/lessonNote/tree/master/html/07-attr" title="code example" target="_blank" rel="noopener noreferrer">code example<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>
