---
layout: post
title: 利用jekyll搭建博客(二)
date: 2017-05-30 
tag: jekyll 
categories: jekyll
permalink: /jekyll/2017/05/30
---
### 前言
在上一篇jekyll的介绍中，我们已经几乎从0到1开始搭建了一个博客，就jekyll本身而言，它的优势在于你不必关注内部怎么实现，常用的功能都是通过默认配置好的模板，你只需关注写博客的内容即可，搭建博客并不需要你去写什么代码，这就好似拿来主义，本博客也是基于别人的模板，如果你想改成自己比较有个性的博客，你就要利用前端知识进行改造定制一款属于自己的博客。我不是老司机，但下面可以教你怎样拿到一个模板进行改造。

<!--more-->
### 搭建一个和别人一样的博客，你需要哪些前提条件
* 1:你需要一个github账号
* 2:掌握最基本的git操作
* 3:了解一点markdown基本语法

### 你可能用到几个git命令(大牛绕道，小白勿离)
```
git init 初始化创建本地仓库
git clone path 克隆github上的项目资源源代码(path为目标地址)
git add . (将本地代码添加到暂存区)
git commit -m "当次修改信息" (将暂存区域提交仓库)
git push origin master `path` path为你自己github新建的response
(git remote add origin `path`)没有克隆现有仓库，将本地仓库远程到服务器
git pull (在你修改了github仓库代码时，你必须git pull检出仓库中的最新代码)
```
更多git相关知识请前往此处(<a href="http://marklodato.github.io/visual-git-guide/index-zh-cn.html">git</a>)
### 如何copy别人的代码
* 1:网上随便找了一个模板jekyll模板(<a href="http://jekyllthemes.org/">jekyllthems</a>)
* 2:在本地磁盘新建一个test文件夹 cd e:/gitBlog/test
* 3:git clone https://github.com/portfolio-central/jekyll-instagram-portfolio-theme.git

```
	Cloning into 'jekyll-instagram-portfolio-theme'...
	remote: Counting objects: 261, done.
	remote: Total 261 (delta 0), reused 0 (delta 0), pack-reused 261
	Receiving objects: 100% (261/261), 1.62 MiB | 338.00 KiB/s, done.
	Resolving deltas: 100% (64/64), done.
	Checking connectivity... done.

```
* 4:进入该目录 `cd jekyll-instagram-portfolio-theme`
* 5:运行 `jekyll server`
* 6:报错

```
  jekyll-watch (~> 1.1)
  rouge (~> 1.7)
  WARN: Clearing out unresolved specs.
  Please report a bug if this causes problems.
  F:/Ruby23-x64/lib/ruby/gems/2.3.0/gems/bundler-1.15.0/lib/bundler/spec_set.rb:87:in `block in materialize': Could not find sass-3.4.22 in any of the sources (Bundler::GemNotFound)

```
* 7:删除该目录下的Gemfile.lock

```
gem install bundle
Fetching gem metadata from https://rubygems.org/...........
Fetching version metadata from https://rubygems.org/..
Fetching dependency metadata from https://rubygems.org/.
Resolving dependencies...
Using colorator 1.1.0
Using sass 3.4.24
Using rb-fsevent 0.9.8
Using ffi 1.9.18 (x64-mingw32)
Using kramdown 1.13.2
Using liquid 3.0.6
Using mercenary 0.3.6
Using forwardable-extended 2.6.0
Using rouge 1.11.1
Using safe_yaml 1.0.4
Fetching minima 2.0.0
Installing minima 2.0.0
Using bundler 1.15.0
Using jekyll-sass-converter 1.5.0
Using rb-inotify 0.9.8
Using pathutil 0.14.0
Using listen 3.0.8
Using jekyll-watch 1.5.0
Fetching jekyll 3.2.1
Installing jekyll 3.2.1
Bundle complete! 2 Gemfile dependencies, 18 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
Post-install message from minima:

----------------------------------------------
Thank you for installing minima 2.0!

Minima 2.0 comes with a breaking change that
renders '<your-site>/css/main.scss' redundant.
That file is now bundled with this gem as
'<minima>/assets/main.scss'.

More Information:
https://github.com/jekyll/minima#customization
----------------------------------------------

```
* 8: 运行 `bundle exec jekyll s -w`
此时你会发现你的目录重新生成了一个Gemfile.lock
<br/>
结果是:

```
Configuration file: E:/gitBlog/test2/jekyll-instagram-portfolio-theme/_config.yml
            Source: E:/gitBlog/test2/jekyll-instagram-portfolio-theme
       Destination: E:/gitBlog/test2/jekyll-instagram-portfolio-theme/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 0.212 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'E:/gitBlog/test2/jekyll-instagram-portfolio-theme'
Configuration file: E:/gitBlog/test2/jekyll-instagram-portfolio-theme/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.

```
* 9:浏览器打开端口 localhost:4000
* 10:你就会成功看到属于克隆到本地的页面了
* 11:然后你就巴拉巴拉地把`_config.yml`里面的一些配置信息全改成自己的了(如想关联自己的github仓库，则_comfig.yml中的有一个url参数，记得配置成自己github的地址)
![](/images/jekyll/4.png)

### 接下来如何挂到自己的github上

* 1:注册申请gitbhub账号，此处省略(作为码农最大基友网站,必须要有一个git账号)
* 2:Create a new repository/usename.github.io(`usename`为你自己自定义的任意名字)
![](/images/jekyll/5.png)
* 3:进入刚在自己新建的项目，进入setting界面 设置你的page,更多gitpage知识参考<a href="https://pages.github.com/">pages</a>
![](/images/jekyll/6.png)
* 4:此时，你通过浏览器设置访问你的username.github.io网址，发现并不能打开
* 5:设置你github上的CNAME文件，将里面的url变成你的github网址，比如：username.github.io
* 7:针对本地修改的文件，如需外网要看到效果，必须将本地代码上传Git仓库中(先git pull,然后执行git add .等操作)
* 6:就此，你已经成功搭起了一个属于自己的网站了。虽然并不知怎么回事，但还是满满的成就感吧

### 本文小节

* 1:主要是对git的基本操作有了一定认识，基本掌握几个命令即可
* 2:对克隆别人代码到本地所遇到的异常进行解决，如果克隆别人项目到本地，遇到错误，基本删掉那个Gemfile.lock即可，按照那几条命令逐一操作
* 3:如何关联自己的github,通过设置一个自己的域名，能被外网访问得到

后期将深入介绍jekyll内部结构，以及一些liquid语法，真实了解jekyll内部机制，刨根问底，一起带你走进jekyll的奇妙世界。



