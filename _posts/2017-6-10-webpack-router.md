---
layout: post
title: webpack搭建工程结合react路由实现组件化
date: 2017-06-10 
tag: react 
categories: react
permalink: /jekyll/2017/06/10
---
###   react技术栈结合webpack组件化一个工程实现

react的学习是比较陡峭的，通常来说掌握react并不容易，对于react来说，官方介绍就是一个注重UI层面的库，无论是耳熟目濡的ng还是国人用得挺6的vue.js,每个框架都有它的优点和特殊之处。react生态圈也很强大，组件化思想，在虚拟dom上挂载操作真实dom,一系列丰富的插件，可以让你少写很多重复的代码。多人协作开发更是便捷。使用react可以选择es5也可以选择es6,用过vuejs,vuejs使用起来确实简单，也比较爽，对于初学者来说，react更适合有一定经验的老司机，框架思想最重要，不同框架所用的语法千篇一律，当我们学会从语言设计者的思考角度去解决一个问题时，我们也就真正学会了。就平时项目一点经验，总结一篇比较简洁的react项目。

<!--more-->
### webpack的一个通用工程目录（具体项目应自己习惯而定，不唯一）

> 在该项目中主要体现有以下几点
>
> * 1:对一个基本webpack构建项目有基本的认识，能够跑起自己搭建的项目
> * 2：对于通用的路由模块进行讲解，实现一个简易的单页切换
> * 3：就使用到一些小点进行剖析，比如stylus或者es6中的变量参数
> * 4:一些自己遇到的问题和思考

### 工程目录如下:

```
|---node_modules
|---src
     |---component  //主要是一些可以分离出来的组件页面
           |----header
               |---header.js
               |---header.styl
     |---img  //存放公用图片文件
     |---pages//业务相关页面
        |---home
             |---Home.js
        |---prize
             |---Prize.js
        |---task
             |---Task.js
        |---AppRoute.js
     |---style //相关style.css文件
     |---app.js
 |---.babelrc
 |---index.html
 |---package.json
 |---webpack.config.js
```

### 主页面
* index.html

```html
  <!doctype html>
  <html lang="en">
   <head>
    <meta charset="UTF-8">
    <meta name="Generator" content="EditPlus®">
    <meta name="Author" content="">
    <meta name="Keywords" content="">
    <meta name="Description" content="">
    <title>webpack构建工程实例</title>
   </head>
   <body>
    <div id="main"></div>
    <!--
      注意这里的路径要与webpack.config.js中的filename路径保持一致
    -->
    <script type="text/javascript" src="./build.js"></script>
   </body>
  </html>
  ```
* .babelrc这是个文件，内容是个json格式的配置，注意与webpack.config.js中的babel-loader中的query配置保持一致即可

* package.json  主要看下我们这个项目所用到的一些模块


 ```json
    {
      "name": "hot-loader",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack-dev-server --port 5000"//启动端口配置
      },
      "author": "maic",
      "license": "ISC",
      "devDependencies": {
        "babel-core": "^6.25.0",
        "babel-loader": "^7.0.0",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1",
        "css-loader": "^0.28.4",
        "file-loader": "^0.11.2",
        "jquery": "^3.2.1",
        "react": "^15.6.1",
        "react-dom": "^15.6.1",
        "react-router": "^4.1.1",
        "react-router-dom": "^4.1.1",
        "style-loader": "^0.18.2",
        "stylus": "^0.54.5",
        "stylus-loader": "^3.0.1",
        "url-loader": "^0.5.9",
        "webpack": "^2.6.1",
        "webpack-dev-server": "^2.4.5"
      }
    }
    
 ```
上面一些通用的模块就不一一说了，想要安装的模块直接 npm install xxx --save-dev即可

*  webpack.config.js

```json
module.exports = {
entry:__dirname+"/src/app.js",//入口文件
output:{
  path:__dirname+"/public",//打包后的文件
  filename:"build.js"//打包输出后的文件名
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
          loader: 'style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:5]!stylus-loader'//.styl后缀的css会生成一连串随机字符串
        },
        {
      test: /\.(png|jpg|gif|woff|woff2)$/,
          loader: 'url-loader?limit=8192'//css中加载图片使用的插件，url-loader,同时css引用资源要用file-loader这个插件
        }
  ]
},
 devServer: {
  contentBase: "./",//设置进入public路径下的index.html页面,
  historyApiFallback: true,
  inline: true,//开启热加载
  port: "http://localhost:5000",//热加载开启请求端口设置
  proxy: {//设置跨域,这个配置可解决mock.js模拟数据的跨域问题
    '/note02/*': {
      target: 'http://localhost:1000',//这个配置端口，利用express模拟端口数据解决跨域问题
      secure: false
    }
  }
 }
}
 ```
上面通用配置都是固定的，主要有一点devServer这个配置中，其conetntBase项会影响入口初始化加载的首页，这里的index.html是放在根目录中，所以直接```./``` 配置，另proxy这个配置在使用mock.js模拟数据中十分有用，可解决模拟接口跨域问题,后续会专门做个专题探讨这个，这里配置几乎用不到，现可忽略。

* app.js文件

```javascript
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./pages/AppRouter";//从另外一个文件中引入的AppRouter模块
//这里<AppRouter/>是虚拟dom,后面是一个挂载的真实dom,利用ReactDOM.render()方法渲染到页面上
ReactDOM.render(<AppRouter/>,document.getElementById("main"));
```

* 在pages文件夹下的三个单页

```javascript
//pages/home/Home.js
import React from "react";
import ReactDOM from "react-dom";
import Header from "../../component/header/Header";//引入component中Header模块
//es6写法，继承React.Component组件
class Home extends React.Component{
render(){
//这里最外层必须只能是一个dom结构
return(<div className="home"> 
    我是刮刮乐
  </div>)
}
}
export default Home;//输出该模块
```

```javascript
//pages/prize/Prize.js
import React from "react";
import ReactDOM from "react-dom";
import Header from "../../component/header/Header";
class Prize extends React.Component{
render(){
return(<div className="Prize">
    我是签到有奖
  </div>)
}
}
export default Prize;
```

```javascript
//pages/task/Task.js
import React from "react";
import ReactDOM from "react-dom";
import Header from "../../component/header/Header";
class Task extends React.Component{
  render(){
    return(<div className="task">
        <div>
          我是任务达人
        </div>
      </div>)
  }
}
export default Task;
```

以上三个单页基本格式差不多，唯一要注意的几点就是，render()中return方式只能有一个最外层只能有一个节点，否则就会报错

* 配置路由页面 pages/AppRouter.js


```javascript
import React from "react";
import ReactDOM from "react-dom"
//import {Router,Route,hashHistory} from 'react-router';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';//引入多个模块方式
import home from "./home/Home";
import prize from "./prize/Prize";
import task from "./task/Task";
import Header from "../component/header/Header";
//注意这里的exact的作用，只允许唯一单独存在
class AppRouter extends React.Component{
  render(){
    return(<Router >
      <div className="main-app">
        <Header/>
        <div className="container" style={{"clear":"both"}}>
          <Route exact path="/" component={home}></Route>
          <Route exact path="/home" component={home}></Route>
          <Route exact path="/prize" component={prize}></Route>
          <Route exact path="/task" component={task}></Route>
        </div>
      </div>
    </Router>)
  }
}
export default AppRouter;
 ```
 路由这里的都是按照官方文档规则配置，不过值得注意一点的是这个exact属性，这个属性的作用是只会选择单一的一个模块，这里的路由path对应Header中的Link中的to属性值，实现路由功能主要是Router,Route,Link和HashRouter几个模块

 * component/header/Header.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
//import {Link} from 'react-router';
import {Link} from 'react-router-dom';//只用到了react-router-dom中的Link模块
import style from './header.styl';//这里需要安装stylus 和stylus-loader
let navList = [{name:"刮刮乐",key:"home"},{name:"签到有奖",key:"prize"},{name:"任务达人",key:"task"}];
class Header extends React.Component{
  constructor(props){//默认可不写
    super(props);
  }
  render(){
      let hash = window.location.hash;//获取hash值
    return(<nav>
      {
        navList.map(function(item,key){
                let isActive = "";
          let match = hash.match(item.key);
          let flag = (hash == "#/"&&key == 0)||(match&&match[0]==item.key);
          isActive = flag?"active":"";
          return(<li key={key} className={style['item-li']}>
              <Link to={'/'+item.key} className={`${isActive}`}>{item.name}</Link>
            </li>)
        })

      }
    </nav>)
  }
}
export default Header;
```

1：注意以上的Link中的URL必须与Router中的path一一对应，这样才能实现其路由的效果；

2：在使用stylus中，采用import style from 'xxx'方式，其style相当于一个变量，在react中这种jsx写法，class名直接以className方式书写，如果要使得className动态变量方式输出，那儿么可以直接`className={parms}` 这里的parms是一个已初始化的变量，如果直接使用输出class名也可以直接写className = "item-li"的方式

3：我们注意打header.styl中的item-li是一个非全局class名，所以浏览页面上会存在一个随机的class字符串。如果该class名使用stylus方式，:global{.item-li{}}这种方式，那么页面上会直接内联原样输出该class名，那么此时以变量的方式输出class就可能失效了。如果是全局方式，那么直接以原字符串方式输出就好，比如：className="item-li"这种方式

4：这里巧妙的利用hash值作为相邻元素切换选项，这没有用一行jquery代码，实现思路也比较容易看懂，是一种比较好的思路，通常我们能根据hash值做出很多判断，利用hashchange事件可监控浏览器的返回物理键，history对象下也有一些很多常用的api方法，通常实现一个自定义的路由就有什么replaceState()以及,pushState()方法，以后会就history这个方法实现一个原生路由。这里只需了解react中router中怎样实现就行，至于路由内部深究以后再细聊。

5:在es6中`${parms}` 可以代替js的普通变量，涉及es6相关内容不再本篇，后续会就let,const什么的一一道来。

* header.sty

```css
//css
.item-li{
  float:left;
  list-style: none;
  padding:5px 10px;
}
/*global全局
:global{
    .item-li{
      float:left;
      list-style: none;
      padding:5px 10px;
    }
}
*/
:global{
   .active{
      background-color:red;
      color:#fff;
      text-decoration:none;
   }
}

```
关于stylus中的一些使用技巧，后面会专门写一篇文章结合实例重新整理一下，这里不过多详细讲解，这里的:glabal申明了.active为全局，所有在页面中就不会被加入随机字符串。

### 本文小结

* 如何搭建一个简易路由项目，实现路由的前提条件是npm insall react-router-dom以及react-router模块，注意路由使用的相关规则，Link中的hash值与Router中的url一一对应即可

* 在本项目中涉及了一些关于stylus,当我们npm run start启动端口时，打开页面，我们会发现，所有的样式都是内联在header中，这种机制主要是css-loader的原因，当我们修改css时，浏览器无需手动刷新页面即可看到效果。

* 在利用hash值实现一个选项卡时，主要运用到了match这个字符串方法，该方法是匹配一个字符串，并返回该字符串。

```javascript
var str = "http://localhost:5000/#/home";
var hash = str.match("/home");
console.log(hash[0]);//home   找到了hash值
var num = str.match(/\d+/g);
console.log(num[0]);//5000
 ```

 * 本案例demo

    [demo](https://github.com/maicFir/lesson-demo/tree/master/note02)

 以上为本人在使用react中的路由的一点体会，当然react路由远不止这些，一些关于路由props.match.parms的一些方法特性仍没有具体体现，后面遇到一一逐解，上文如有不好地方，多多指正，希望本文对你使用react路由模块有一点点小帮助.

  

