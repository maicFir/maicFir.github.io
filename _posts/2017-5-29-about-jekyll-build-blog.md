---
layout: post
title: 利用jekyll搭建博客(一)
date: 2017-05-29
tag: jekyll 
categories: jekyll
permalink: /jekyll/2017/05/29
---
### 前言
jekyll是一种静态网站生成器，主要依赖ruby环境，在windows操作系统需要依赖RubyGems。简单来说就是jekyll利用markdown和模板引擎liquid转换生成的静态代码，本博客免费托管在gitbub上，针对较轻的网站博客系统比较适合
<!--more-->

### 搭建自己的博客前提需要哪些准备
* 1:必须要安装[ruby](https://rubyinstaller.org/downloads/)`我所用的是ruby2.3.0p0版本的`
* 2:由于是windows用户，要下载[python](https://www.python.org/downloads/)我用的是`2.7.13版`
* 3:下载[RubyGems](https://rubygems.org/pages/download)
* 4:安装[Devkit](https://rubyinstaller.org/downloads/)(`当你解压完成时，进入该目录运行ruby dk.rb操作`)
* 5:必须要有以上几个基础环境才能正常运行jekyll，这里如何安装ruby和python省略。

### 你可能和我一样掉进坑里

* 1:比如我在 E:\Program Files\buildblog\text 目录下搭建一个自己网站(`cd E:\Program Files\buildblog\text`)
* 2:通过已安装好的RubyGem安装jekyll和bundler(`gem install jekyll bundler`)
<br/>
``` 
	Successfully installed jekyll-3.4.3
	Parsing documentation for jekyll-3.4.3
	Done installing documentation for jekyll after 8 seconds
	Successfully installed bundler-1.15.0
	Parsing documentation for bundler-1.15.0
	Done installing documentation for bundler after 16 seconds
	2 gems installed
```
* 3:创建本地博客(`jekyll new myblog`)
<br/>
```   
	  Bundler: Using jekyll-watch 1.5.0
	  Bundler: Using jekyll 3.4.3
	  Bundler: Fetching minima 2.1.1
	  Bundler: Installing minima 2.1.1
	  Bundler: Fetching jekyll-feed 0.9.2
	  Bundler: Installing jekyll-feed 0.9.2
	  Bundler: Bundle complete! 4 Gemfile dependencies, 24 gems now installed.
	  Bundler: Use `bundle info [gemname]` to see where a bundled gem is instal
	  New jekyll site installed in E:/Program Files/buildblog/text/myblog.
```
* 4:进入创建的blog(`cd myblog`)
```
WARN: Unresolved specs during Gem::Specification.reset:
      jekyll-watch (~> 1.1)
      rouge (~> 1.7)
	  WARN: Clearing out unresolved specs.
	  Please report a bug if this causes problems.
	  Configuration file: E:/Program Files/buildblog/text/myblog/_config.yml
	  Configuration file: E:/Program Files/buildblog/text/myblog/_config.yml
            Source: E:/Program Files/buildblog/text/myblog
       Destination: E:/Program Files/buildblog/text/myblog/_site
     Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 1.251 seconds.
    Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
   Auto-regeneration: enabled for 'E:/Program Files/buildblog/text/myblog'
     Configuration file: E:/Program Files/buildblog/text/myblog/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
  ```
* 5:运行(`jekyll server`)
* 6:打开浏览器运行 localhost:4000端口，因此，你就打开了属于你自己的网站了(如果有该界面，证明你已经上路了)
![](/images/jekyll/2.png)
###  以上步骤走的太顺了，如果你没有按照上面步骤来，你可能就会遇到这样的一些错误
-------------  
* 要按照套路来，否则好多莫名其妙的错误折腾你许久
* 比如在安装好ruby和python忘掉了安装devkit，那么系统会提示你去下载安装divkit(此时一定要进入压缩目录运行ruby dk.rb)，验证gem是否安装成功 `gem -v`
* 通常在你基本环境(ruby,python,gem安装成功的前提下，基本不会有什么问题)
* 有问题通常都是以下这种类似的问题，直接按照系统给的提示安装相关的依赖包即可，比如:
![](http://localhost:4000/images/jekyll/3.png)
* 以上类似的报错，直接gem install xxx 即可

### 本文小节
* 初步认识jekyll,jekyll是依赖ruby，利用标记语言markdown和模板引擎liquid进行静态html生成
* 了解了windows搭建jekyll博客需要ruby,python,devkit,rubGems环境
* 只要通过gem install jekyll bundle 形成本地jekyll server 监控本地4000端口，正常打开本地页面

本文就自己搭建jekyll博客而写下的一点点认识，如果你搭建途中遇到什么问题，欢迎给我留言。下一篇会就怎样copy别人的模板进行自我博客造。
	