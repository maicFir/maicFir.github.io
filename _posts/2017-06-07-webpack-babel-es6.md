---
layout: post
title: webpack中利用es6
date: 2017/06/07
tag: es6
categories: es6
permalink: /es6/2017/06/07
---
### webpack中利用es6

es6已经开始逐渐变成开发的主流，虽然古老的陈旧代码仍然使用强大的es5,为兼容和迭代老项目，es6不是一个好的开发方式，但新项目中已经开始结合前端最流行的打包工具webpack,使用webpack必然会使用es6,虽然各大浏览器对es6做了部分兼容，但没有完全脱离es5,主流开发者仍是使用es5。es6是一种趋势，一旦所有浏览器就像抛弃ie678一样，那么e6的春天就来临了。

<!--more-->
### webpack使用es6我们应该知道些什么

必须要安装babel,虽然你是在写es6，但其实还是需要变成es5,es6只有通过babel编译成es5才能被浏览器解析。babel被称为是下一代js语法代码，对react发烧者来说，支持jsx以及模块组合方式，在你的Js中混写html,高逼格的代码，让你写页面也会有一种写js的感觉。本篇只针对你需要用到的es6以及一些配置做个简单的入门级介绍。

* 目录工程文件

```
  |---public
  ​    |---index.html
  |---src
  ​ |---css
  ​     |---main.css
  ​ |---img
  ​        |---main.js
  |---.babelrc
  |---package.json
  |---webpack.config.js
```
* index.html 

```
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title></title>
 </head>
 <body>
  <div id="main">
      <nav class="header">
          <li>积分商场</li>
          <li>购物大厅</li>
          <li>浏览器</li>
      </nav>
      <div class="content">
         积分商场
      </div>
  </div>
  <!--
    这里的路径要与webpack.config.js中的filename路径保持一致
  -->
  <script type="text/javascript" src="./build.js"></script>
 </body>
</html>
 ```
 * main.js文件
 

 ```
//es5方式
var style = require("./css/style.css");//引入css
//引入jquery插件库
var $ = require("jquery");//cmd方式
$(function(){
  $(".header>li").on("click",function(){
    var index = $(this).index();
    var text = $(this).text();
    $(this).addClass("active").siblings().removeClass("active");
    $(".content").html(text)
  })
})
```

```
//es6方式 main.js
import $ from "jquery";
import style from "./css/style.css";//引入css
import selectTab from "./js/selectTab";
(function(){
  selectTab.selectTab();//调用select中的selectTab内部方法
})()

```
    
* selectTab.js

```
class Select{//Select相当于es5中构造函数
  constructor(){};
  selectTab(){//selectTab相当于es5中proptotype.selectTab原型链扩展的方法
    let liDom = document.getElementsByTagName("li");
    let contentDom = document.getElementsByClassName("content")[0];
    for(let i in liDom){
      if(liDom[i]){
        liDom[i].setAttribute("num",i)
      }
      liDom[i].onclick = function(){
          for(let k=0;k<liDom.length;k++){
            liDom[k].className = "";
          }
          let num = this.getAttribute("num");
          if(num == i){
            this.classList.add("active");
            contentDom.innerHTML = this.innerHTML;
          }
        }
      }
  }
};
var fn = new Select();//实例Select
export default fn;//输出fn函数
```

* style.css

```
*{padding:0px;margin:0px;}
#main{
  overflow:hidden;
}
.header{
  width:200px;
  height:100px;
  border:1px solid red;
  float:left;
  margin:10px;
}
.app{
  width:100px;
  height:200px;
  background:yellow;
}
.active{
  background:gray;
  cursor: pointer
}
.content{
  background:url("../img/test2.png") no-repeat center;
  width: 300px;
    height: 100px;
    background-size: 50% 100px;
    clear: both;
    border: 1px solid #ff0000;
    background-position: 150px 0px;
}
```
* .babelrc

```
{
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ]
}
```

* 在package.json文件中主要有以下配置


 ```
    {
      "name": "hot-loader",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack-dev-server --port 7000"//设置启动端口，dos下直接npm run start启动服务
      },
      "author": "maic",
      "license": "ISC",
      "devDependencies": {
        "babel-core": "^6.25.0",//编译es6所需要的babel插件
        "babel-loader": "^7.0.0",
        "babel-preset-es2015": "^6.24.1",//转换成es5
        "babel-preset-react": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1",//支持es7高级语法
        "css-loader": "^0.28.4",//加载css
        "file-loader": "^0.11.2",//css读取图片资源需要依赖的库
        "jquery": "^3.2.1",//npm安装jquery插件
        "react": "^15.6.1",//安装react模块
        "style-loader": "^0.18.2",//引入style加载
        "url-loader": "^0.5.9",//与css加载图片相关
        "webpack": "^2.6.1",
        "webpack-dev-server": "^2.4.5"//启动端口
      }
    }
 ```
 * webpack.config.js

```
module.exports = {
entry:__dirname+"/src/main.js",//入口文件
output:{
  path:__dirname+"/public",//打包后的文件
  filename:"build.js"//打包输出后的文件名
},
resolve: {
  extensions: ['.js', '.jsx']//extennsions省略引入模块的.js，.jsx后缀
},
module:{
  loaders:[
     {
     test:/\.json$/,
     loader: "json-loader",//这里必须是json-loader(加载json数据使用)
    },
    {
       test:/\.js$/,
       exclude:/node_modules/,
       loader:'babel-loader',//能使用es6
       query:{
        presets:['es2015','react',"stage-0"]  
       }
    },
    {
      test:/\.css$/,
      //loader:"style-loader!css-loader?modules"
      //loader: "style-loader!css-loader?modules&localIdentName=[path]-[hash:base64:5]"
      loader: "style-loader!css-loader"
    },
    {
      test: /\.styl/,
          loader: 'style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:5]!stylus-loader'
        },
        {
      test: /\.(png|jpg|gif|woff|woff2)$/,
          loader: 'url-loader?limit=8192'//css中加载图片使用的插件，url-loader,同时css引用资源要用file-loader这个插件
        }
  ]
},
 devServer: {
  contentBase: "./public",//设置进入public路径下的index.html页面,
  historyApiFallback: true,
  inline: true,//开启热加载
  port: "http://localhost:7000",//热加载开启请求端口设置
 }
}
```

* 效果图

    ![5](\images\webpack\5.png)

<h3>本文小结</h3>
  [demo](https://github.com/maicFir/lesson-demo/tree/master/note01)
  *  对于webpack支持es6必须要安装babel相关插件，在package.json中，其中babel-core,babel-loader,babel-preset-es2015必须要安装,其中关于根目录的.babelrc必须与webpack.config.js中module的loaders的query配置一致
  *  注意import与require之间的区别，当我们使用require()方式时，比如你想把另外一个js文件引入到本文件中，那么有两种方式，一种是import a from 'path/xx.js' ,这里的xx.js输出必须是export default xx,而另外一种方式时遵循cmd方式，require('path/xx.js')，这里的xx.js必须是module.export = xx 方式，两者区别具体在代码中体会。
  *   在使用webpack中的css背景图片，通常需要file-loader和url-loader两个插件的支持，如果使用stylus,则必须要使用styl-loader模块。class的样式会生成随机数，具体原因主要受webpack.config.js中的loader影响
  *  为什么在引入相应的js省去了后缀，主要受webpack.config.js中的resolve影响，extension可以省略后缀