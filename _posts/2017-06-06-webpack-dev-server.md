---
layout: post
title: webpack中的webpack-dev-server
tag: webpack
categories: webpack
permalink: /webpack/2017/06/06
---
### 认识webpack-dev-server
webpack-dev-server主要是利用express的http服务器，主要作用是开辟一个端口能实现本地开发，webpack-dev-server会实时编译，热加载功能，无需刷新页面自动保存页面

<!--more-->
### 准备工作
* 0: 目标工程目录
```
	|---build
		|---build.js
	|---node_modules
	|---src
		|---common
			|---a.js
			|---main.css
	|---index.html
	|---package.json
	|---webpack.config.js
```
* 1：npm init 创建一个package.json文件
* 2: 新建一个webpack.config.js文件
```
	module.exports = {
	entry:__dirname+"/src/main.js",//入口的main.js文件
	output:{
		path:__dirname+"/build",//打包后的文件(注意这里`/`不能少写)
		filename:"build.js"//相对于path路径,webpack生成的js文件
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader: "style-loader!css-loader",//这里的loader会影响css的class名
			}	
		]
	},
	resolve:{
		extensions: ['.js','.jsx'],//以.js，.jsx结尾的可以省略
	},
	devServer:{
		contentBase:'./',//设置根路径,指向的是index.html
		inline: true,//启动热加载
		historyApiFallback:true,//设置默认true,加载页面时会默认找到根路径的index.html文件
	}
}
```
* 3:npm install webpack jquery webpack-dev-server style-loader css-loader --save-dev 安装依赖模块
* 4:在src/common/a.js,main.css中编写相应的js代码
```
/*a.js*/
module.exports = {
	name:"maic",
	form:"china",
	home: "北京"
}
/*main.css*/
#main{
	color:yellow;
}
```
* 5:在src/main.js中编写入口js
```
var config = require("./common/a");//引入a.js,这里后缀省略，原因是package.json中extensions的配置影响
var style = require("./common/main.css");//引入main.css
var $ = require("jquery");//引入jquery
var username = config.name;
var home = config.home;
(function(){
	$("#main").html(username);//调用jquery方法
	$("#main").css({
		width:"100px",
		height:"100px",
		backgroundColor:"red"
	})
})()
```
* 6:运行 webpack src/main.js build/build.js
* 7:运行 npm run start,打开指定端口页面loalhost:9000
* 8：最终结果
![](/images/webpack/2.png)
* 9:看一下页面结构
![](/images/webpack/3.png)
* 10:内联的样式与可疑怪异的maic字符串？
>以上图片特征表明，css-loader引入页面中,通过require('./main.css')方式是内联嵌入的，与此同时jquery库已经生效，后面得反复试验，得知是output中path路径的原因
path改成__dirname/build/就ok了
再者发现一个神奇的东西

![](/images/webpack/4.png)
* 10:webpack将所有加载的模块打包成了一个文件，所以jquery也被打包到了build.js文件中，因此可推理所有webpack引入模块都将被打包成一个js文件。

### 本文小结
* 1：主要是配置webpack.config.js的一些模块，认识entry,module中的loaders
* 2: 因为webpack遵循CommondJS的cmd规范，所有直接通过require("xxx")就可引入其它文件的模块，
	module.exports = fn,输入该内部函数或对象
* 3：在package.json可以在script中加入运行webpack-dev-server --port 8000 设置可运行端口
  其中，devServer配置中的contentBase可以改变端口打开进入的目标页面地址
* 4:在入口文件index.html中你会发现浏览器会报404，因为指定webpack生成的build.js在内存中存储。器路径是基于devServr中./路径，所以index.html中引入的资源路径吧、改成./build.js就可以了



