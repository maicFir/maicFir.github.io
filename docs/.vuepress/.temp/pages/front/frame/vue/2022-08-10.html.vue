<template><div><p>这道面试题大概是这样的，在<code v-pre>vue</code>中，一个组件你修改了数据，但是页面没有更新，通常是什么原因造成的。</p>
<p>我：嗯...,大概可能是数据流原因造成的，如果一个子组件依赖父级，通常来说如果模版里未直接引用<code v-pre>props</code>，而是通过子组件<code v-pre>data</code>中一个变量去接收<code v-pre>props</code>值，如果父组件更新，但是如果此时子组件不监听<code v-pre>props</code>值变化，而从新赋值的话，那么一直都会是初始化的那个值。</p>
<p>我：或者是当你在使用<code v-pre>hooks</code>时，在子组件直接使用<code v-pre>hooks</code>导出的值，而不是通过父组件传子组件的值，你在父组件以为修改同一个<code v-pre>hooks</code>值时，子组件的值依然不会变化。</p>
<p>面试官：还有其他场景方式吗？</p>
<p>我：暂时没想到...</p>
<p>面试官：现在子组件有一个数组，假设你初始化数组的数据里面是多个字符串数组，然后我在子组件内部我是通过获取索引的方式去改变的，比如你在<code v-pre>mounted</code>通过数组索引下标的方式去改变，数据发生了变化，模版并不会更新，这也是一种场景</p>
<p>我：一般没有这么做，通常如果修改的话，会考虑在计算属性里面做，但是这种应该可以更新吧？于是我说了<code v-pre>vue</code>响应式如何做的，我想修改数组下标的值，为啥不是不会更新模版，不是有做对象劫持吗？修改值不会触发<code v-pre>set</code>方法吗，只要触发了<code v-pre>set</code>那么就会触发内部一个<code v-pre>dep.notify</code>去更新组件啊，这不科学啊。但事实上，如果一个数组的<code v-pre>item</code>是基础数据类型，用数组下标方式去修改数组值还真是不会更新模版。</p>
<p>于是去翻阅源码，写一个例子证实下。</p>
<h3 id="开始一个例子" tabindex="-1"><a class="header-anchor" href="#开始一个例子" aria-hidden="true">#</a> 开始一个例子</h3>
<p>新建一个<code v-pre>index.html</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>...
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item in dataList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item in dataList2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item.name}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./vue.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们引入<code v-pre>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">'#app'</span><span class="token punctuation">,</span>
      <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">dataList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'Maic'</span><span class="token punctuation">,</span> <span class="token string">'Test'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token literal-property property">dataList2</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'深圳'</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'广州'</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">debugger</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dataList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'111'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在<code v-pre>mounted</code>中写入了一行调试代码，并且我们用数组索引改变<code v-pre>dataList[0]</code>选项的值</p>
<p>因为设置值肯定有改变数据的拦截，所以我在源码的<code v-pre>defineReactive$$1</code>也写入一行<code v-pre>debugger</code></p>
<p>打开页面，我们可以看到
<img src="https://files.mdnice.com/user/24614/6582fadc-05c5-47f3-92f2-038db923950b.png" alt=""></p>
<p>我们从第一行源码到<code v-pre>defineReactive$$1</code>方法的<code v-pre>debugger</code>分析进行逐步分析</p>
<ul>
<li>首先是实例<code v-pre>new Vue(options)</code>,实际上<code v-pre>Vue</code>就是下面的一个<code v-pre>Vue$3</code>构造函数，当传入<code v-pre>options</code>,此时会调用<code v-pre>_init</code>方法并传入<code v-pre>options</code>,这个<code v-pre>options</code>就是</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 以下就是Vue构造函数中的options</span>
<span class="token comment">/*
  {
    el: '#app',
    data() {
      return {

      }
    },
    mounted() {

    }
  }
*/</span>
<span class="token keyword">function</span> <span class="token function">Vue$3</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"development"</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vue</span>$3<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'Vue is a constructor and should be called with the `new` keyword'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们会发现<code v-pre>_init</code>是挂载在<code v-pre>Vue$3.prototype._init</code>上，实际当我们一<code v-pre>new Vue()</code>时，就会执行<code v-pre>_init</code>方法，而<code v-pre>_init</code>方法,主要做了以下几件事情</p>
<ul>
<li>
<p>1、为每一个实例<code v-pre>vm</code>对象绑定了一个<code v-pre>uid</code></p>
</li>
<li>
<p>2、判断传入的<code v-pre>options</code>中是否含有<code v-pre>component</code>,注册这个传入的组件</p>
</li>
<li>
<p>3、合并<code v-pre>options</code>对象,并且会将传入的<code v-pre>options</code>动态绑定到<code v-pre>$options</code>中去</p>
</li>
<li>
<p>4、劫持<code v-pre>options</code>这个传入的对象，将这个传入的对象通过<code v-pre>new Proxy(vm)</code>,从而绑定在<code v-pre>vm._renderProxy</code>这个对象上</p>
</li>
<li>
<p>5、动态绑定<code v-pre>_self</code>属性并指向<code v-pre>vm</code>实例对象</p>
</li>
<li>
<p>6、在<code v-pre>_init</code>方法干的最重要的几件事</p>
<ul>
<li><code v-pre>initLifecycle(vm)</code>主要是绑定一些自定义接口，比如你常常用<code v-pre>this</code>访问<code v-pre>$children</code>、<code v-pre>$parent</code>、<code v-pre>$refs</code>,<code v-pre>_watcher</code>等</li>
<li><code v-pre>initEvents(vm)</code>这个方法主要是<code v-pre>事件的更新监听</code></li>
<li><code v-pre>callHook(vm, 'beforeCreate')</code>，主要执行<code v-pre>Vue</code>指定的钩子函数<code v-pre>beforeCreate</code></li>
<li>当执行<code v-pre>breforeCreate</code>之后，那么此时就是进入<code v-pre>initState(vm)</code>,这时对传入的<code v-pre>options</code>的数据进行响应式初始化操作</li>
<li>数据进行劫持，响应式后，就是执行<code v-pre>callHook(vm, 'created')</code></li>
<li>调用<code v-pre>initRender(vm)</code>方法更新页面</li>
</ul>
</li>
</ul>
<p>具体代码可以参考以下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token function">initLifecycle</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span> <span class="token comment">// </span>
<span class="token function">initEvents</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
<span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'beforeCreate'</span><span class="token punctuation">)</span>
<span class="token function">initState</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
<span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'created'</span><span class="token punctuation">)</span>
<span class="token function">initRender</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们依次从执行栈中去寻找真相
<img src="https://files.mdnice.com/user/24614/909ec414-b15f-4663-be44-8bef1522ce2f.png" alt="">
当调用<code v-pre>initState</code>方法后，此时会进入<code v-pre>initData</code>方法</p>
<p>在<code v-pre>initData</code>主要做什么呢？</p>
<ul>
<li>1、主要是获取传入的<code v-pre>data</code>,并且对传入的<code v-pre>data</code>做了一些兼容处理，可以是函数，也可以是对象,并且对<code v-pre>data</code>必须返回一个对象做了防御性处理</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> data <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>data
    data <span class="token operator">=</span> vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'function'</span>
      <span class="token operator">?</span> <span class="token function">data</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
      <span class="token operator">:</span> data <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>对传入的<code v-pre>data</code>中的属性进行<code v-pre>proxy</code>劫持处理，将<code v-pre>data</code>是两个数组<code v-pre>dataList</code>，<code v-pre>dataList2</code>直接挂在了<code v-pre>vm</code>对象上，所以我们在<code v-pre>vue</code>中都是直接<code v-pre>this.dataList</code>,<code v-pre>this.dataList2</code>，或者能访问<code v-pre>methods</code>的一些方法，就是这里在初始化的时候，进行了<code v-pre>proxy</code>,主要看下面这个<code v-pre>proxy</code>方法</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token operator">...</span>
    <span class="token comment">// proxy data on instance</span>
    <span class="token keyword">var</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">var</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props
    <span class="token keyword">var</span> i <span class="token operator">=</span> keys<span class="token punctuation">.</span>length
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>props <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">"development"</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token string">"The data property \""</span> <span class="token operator">+</span> <span class="token punctuation">(</span>keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\" is already declared as a prop. "</span> <span class="token operator">+</span>
          <span class="token string">"Use prop default value instead."</span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// observe data</span>
    <span class="token function">observe</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    data<span class="token punctuation">.</span>__ob__ <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>__ob__<span class="token punctuation">.</span>vmCount<span class="token operator">++</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当对<code v-pre>data</code>中的属性进行一一<code v-pre>proxy</code>后，此时我们看到有有进行<code v-pre>observer(data)</code>这个操作</p>
<p><code v-pre>observer</code>这是一个非常重要的方法，所有<code v-pre>data</code>中的数据在初始化时候，都会被放入<code v-pre>new Observer(value)</code>中去</p>
<p>我们具体看下<code v-pre>observe</code>这个方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/* value 就是 
  {
    dataList: ['Maic', 'Test'], 
    dataList2: [{}, {}]
  }
*/</span>
 <span class="token keyword">function</span> <span class="token function">observe</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// debugger;</span>
    <span class="token keyword">var</span> ob
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">'__ob__'</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>__ob__ <span class="token keyword">instanceof</span> <span class="token class-name">Observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ob <span class="token operator">=</span> value<span class="token punctuation">.</span>__ob__
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
      observerState<span class="token punctuation">.</span>shouldConvert <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span>config<span class="token punctuation">.</span>_isServer <span class="token operator">&amp;&amp;</span>
      <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span>value<span class="token punctuation">.</span>_isVue
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ob
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入<code v-pre>new Observer()</code>中，我们可以看到以下代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">Observer</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">Observer</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
    value:
      {
        dataList: ['Maic','Test'],
        dataList2: [{}]
      }
    */</span>
    <span class="token comment">// debugger;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value <span class="token comment">// data中返回的值</span>
    <span class="token comment">// 动态绑定一个dep对象</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vmCount <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// 主要会将value值copy到this的__ob__</span>
    <span class="token function">def</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">'__ob__'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> augment <span class="token operator">=</span> hasProto
        <span class="token operator">?</span> protoAugment
        <span class="token operator">:</span> copyAugment
      <span class="token function">augment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">,</span> arrayKeys<span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从以上这段代码中首先每一个传入的对象会有一个<code v-pre>this.dep = new Dep()</code>,每一个对象都会有一个<code v-pre>dep</code>对象</p>
<p>首先会判断传入的<code v-pre>value</code>是不是一个对象，如果是对象就会走<code v-pre>walk</code>方法</p>
<p><code v-pre>walk</code>方法的作用就是遍历传入的<code v-pre>value</code>,然后将<code v-pre>value</code>变成一个响应式的对象，用<code v-pre>defineReactive$$1</code>来劫持每个对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// walk</span>
<span class="token class-name">Observer</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">walk</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">walk</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">defineReactive$$1</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> obj<span class="token punctuation">[</span>keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时当我们进入<code v-pre>defineReactive$$1</code>后</p>
<p>我们会发现，对于<code v-pre>{dataList: ['Maic', 'Test']}</code>,首先会遍历<code v-pre>dataList</code>,获取<code v-pre>dataList</code>的值，然后把数组的值进行<code v-pre>observe</code>,在<code v-pre>observe</code>中，我们可以看到,如果这个值不是对象，那么不会被<code v-pre>new Objsever</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">observe</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//   这行代码是根据数组索引修改值，不会更新的根本原因</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// debugger;</span>
    <span class="token keyword">var</span> ob
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">'__ob__'</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>__ob__ <span class="token keyword">instanceof</span> <span class="token class-name">Observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ob <span class="token operator">=</span> value<span class="token punctuation">.</span>__ob__
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
      observerState<span class="token punctuation">.</span>shouldConvert <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span>config<span class="token punctuation">.</span>_isServer <span class="token operator">&amp;&amp;</span>
      <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span>value<span class="token punctuation">.</span>_isVue
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ob
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且每个值都会有一个有一个对应的<code v-pre>dep = new Dep()</code>,在访问对象时会调用<code v-pre>depend</code>方法进行依赖收集</p>
<p><img src="https://files.mdnice.com/user/24614/4994f39d-ca83-4222-b9ad-9c5c035be5a6.png" alt="">
每一个对象都有一个<code v-pre>dep</code>对象,在<code v-pre>dep</code>对象的<code v-pre>subs</code>中就会添加一个<code v-pre>watch</code></p>
<p>当从<code v-pre>_init</code>方法调用的，到数据初始化完成<code v-pre>响应式</code>拦截后，<code v-pre>initState</code>走完了，然后就是<code v-pre>callHook(vm, 'created')</code>,最后<code v-pre>initRender(vm)</code>,然后就走到了我们在<code v-pre>mounted</code>方法<code v-pre>debugger</code>的位置</p>
<p><img src="https://files.mdnice.com/user/24614/9fa71eb3-caae-4565-b28c-e54b69ff91c7.png" alt=""></p>
<p>我们继续下一步，此时我们会走到修改数组</p>
<p>当我们直接进行下面操作</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>dataList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"111"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>首先会通过<code v-pre>proxy</code>方法，直接可以从vm对象data中获取dataList值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">proxy</span><span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isReserved</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">proxyGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> vm<span class="token punctuation">.</span>_data<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">proxySetter</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          vm<span class="token punctuation">.</span>_data<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于<code v-pre>dataList</code>在初始化的时候，数组中每一项都会先进行循环，如果是对象，则会遍历数组内部的对象，然后添加响应式，每一项都会<code v-pre>dep</code>依赖</p>
<p>但是由于<code v-pre>dataList</code>的每一项是数组，我们可以继续看到这段代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token keyword">var</span> <span class="token function-variable function">Observer</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">Observer</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// debugger;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
    <span class="token keyword">this</span><span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vmCount <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token function">def</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">'__ob__'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token comment">// 由于dataList是数组</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> augment <span class="token operator">=</span> hasProto
        <span class="token operator">?</span> protoAugment
        <span class="token operator">:</span> copyAugment
      <span class="token function">augment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">,</span> arrayKeys<span class="token punctuation">)</span>
      <span class="token comment">// 遍历数组</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看下<code v-pre>observeArray</code>,<code v-pre>observe</code>每一项</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token class-name">Observer</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">observeArray</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">observeArray</span><span class="token punctuation">(</span><span class="token parameter">items</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> items<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">observe</span><span class="token punctuation">(</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后看<code v-pre>observe</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">observe</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// debugger;</span>
    <span class="token keyword">var</span> ob
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">'__ob__'</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>__ob__ <span class="token keyword">instanceof</span> <span class="token class-name">Observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ob <span class="token operator">=</span> value<span class="token punctuation">.</span>__ob__
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
      observerState<span class="token punctuation">.</span>shouldConvert <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span>config<span class="token punctuation">.</span>_isServer <span class="token operator">&amp;&amp;</span>
      <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      <span class="token operator">!</span>value<span class="token punctuation">.</span>_isVue
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ob
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只有每一项被<code v-pre>new Observer</code>后，就会去调用<code v-pre>walk</code>，然后继续<code v-pre>defineReactive$$1</code>,这样每一项<code v-pre>item</code>就被<code v-pre>Object.defineProperty</code>拦截了。</p>
<p>此时如果是对象，当你对数组的<code v-pre>item</code>对象进行修改时，就会触发<code v-pre>set</code>进而更新页面了。</p>
<p>所以你修改<code v-pre>this.dataList[0] = &quot;111&quot;;</code>，因为dataList的每一项<code v-pre>item</code>并不是一个对象，并没有被<code v-pre>observer</code>，所以修改其值，只是改变对原对象值，但是根本不会出发拦截对象的<code v-pre>set</code>方法，自然就不会<code v-pre>dep.notify()</code>去派发更新，触发页面更新了</p>
<p>并没有更新页面
<img src="https://files.mdnice.com/user/24614/4c144130-fd6a-4461-af4b-bd6e6b50ff6d.png" alt=""></p>
<p>于是当你这样处理时</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">debugger</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dataList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"111"</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dataList2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'北京'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现，页面会更新了，但是实际上修改<code v-pre>dataList</code>并不会立即更新页面，会等<code v-pre>dataList2[0]</code>修改了，批量更新
<img src="https://files.mdnice.com/user/24614/7e5e39f5-f265-457e-8a44-534c65aee4eb.png" alt="">
所以当修改<code v-pre>dataList2[0].name</code>执行完毕后
<img src="https://files.mdnice.com/user/24614/52f826fc-b3e3-4b15-a94f-110c50747615.png" alt=""></p>
<p>已经可以看到页面更改了
<img src="https://files.mdnice.com/user/24614/b272b99a-5577-488e-b527-7a9103187979.png" alt=""></p>
<p>另外你看到下面可能会疑惑</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token operator">...</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token string">"Web技术学苑"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">dataList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Maic"</span><span class="token punctuation">,</span> <span class="token string">"Test"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">dataList2</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"深圳"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"广州"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我在<code v-pre>data</code>中申明了一个<code v-pre>test</code>他的值也是字符串，不是对象啊，那么为什么我直接修改，也可以更新数据呢</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">debugger</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dataList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"111"</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>test <span class="token operator">=</span> <span class="token string">"前端早早聊"</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样你会会发现<code v-pre>this.test</code>直接访问了data的数据，并且修改了test的数据。</p>
<p>其实当你修改<code v-pre>test</code>时，本质就会触发<code v-pre>vm</code>对象，这个<code v-pre>this</code>就是那个实例对象，因为实例对象在初始化的时候，这个对象就已经被<code v-pre>observer</code>，所以你修改<code v-pre>test</code>就是在设置实例化对象上的属性，自然就会触发<code v-pre>set</code>所以页面就更新了。</p>
<p>如果你直接修改<code v-pre>this.dataList = ['aa', 'bb']</code>，那么也是可以更新数据的，因为此时<code v-pre>dataList</code>是绑定在实例化对象上的，这个<code v-pre>dataList</code>已经被<code v-pre>proxy</code>处理直接挂载了<code v-pre>this</code>对象上，而这个<code v-pre>this</code>对象也是被<code v-pre>observer</code>了，所以你修改其值，自然就会触发<code v-pre>set</code>,所以页面就会更新</p>
<p>在<code v-pre>vue</code>中，initState的时候，会将<code v-pre>data</code>中的所有数据编程响应式，每一个属性对象都会有一个<code v-pre>dep</code>,当这个属性值是数组时，会对数组进行遍历，每一项都会被<code v-pre>observer</code>，数组的每一项都会增加一个<code v-pre>dep</code>对象，当数据更新时，会派发更新所有的数据。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ul>
<li>
<p>当一个组件数据发生了变化，但是视图层没有发生变化，形成的原因只有以下几种</p>
<p>1、 数据流的问题，如果一个子组件的props数据时直接通过子组件data中去接收<code v-pre>props</code>，当修改负组件props时，如果子组件不监听<code v-pre>props</code>，重新对<code v-pre>data</code>赋值那么可能会导致子组件数据并不会更新</p>
<p>2、 如果使用<code v-pre>hooks</code>,如果并不会是从负组件传入的props,而是重新在子组件重新引入hooks,在负组件你修改同一份hooks引用，子组件并不会有效果，因为hooks每次调用都会时一份新的引用，所以子组件只能从<code v-pre>props</code>接口获取</p>
</li>
<li>
<p>当一个数组的每一个<code v-pre>item</code>并不是对象时，其实此时<code v-pre>item</code>并不是一个响应式，并不会被<code v-pre>observe</code>,在data初始化的每一个对象vue初始化时，都会给每一个对象变成<code v-pre>reactive</code>,并且每一个对象会有一个<code v-pre>dep</code>对象。只有被<code v-pre>observer</code>，修改其值才会触发<code v-pre>set</code>,从而更新视图层</p>
</li>
<li>
<p>我们每一个<code v-pre>data</code>中返回的对象的值都会被<code v-pre>observer</code>，每一个数组对象在初始化时都会被<code v-pre>observer</code>，数组中的每一个对象都会添加一个<code v-pre>dep</code>对象，当数组对象发生变化时，就会触发对象拦截，更新操作。</p>
</li>
<li>
<p><a href="'https://github.com/maicFir/lessonNote/tree/master/vue/03-%E6%95%B0%E7%BB%84%E5%93%8D%E5%BA%94%E5%BC%8F%E6%B5%8B%E8%AF%95'" title="code example">code example</a></p>
</li>
</ul>
</div></template>
