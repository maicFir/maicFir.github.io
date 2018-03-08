---
layout: post
title: react-router 进阶
date: 2017-10-26
tag: react
---

#### react中路由进阶

> 在react中，通常在单页的应用中我们都会考虑路由来控制页面，react-router是react路由理想的插件，路由本质上就是改变hash值来改变对应的内容，通常主要是通过html5中的hashchange事件来监控其hash值得改变，当你选择不同的hash值，因此对应的dom内容也会发生变化。我们知道在react中是虚拟dom绑定在真实dom中，而实际上，在react-router中，当我们hash值发生变化时，其实已经客户端已经有了很多值得变化，在你改变hash值得时候，我们一探究竟路由中到底有哪些东西值得我们去深究。

#### 项目结构

* 这里主要介绍一下本文所用的项目结构

```javascript
|-----node_modules
|-----src
       |-----components//组件目录
       |-----imgs //存放图片
       |-----pages//每个单页的模块
       		  |----activemgr
              		|-----Activemgr.js
              |-----black
              		|-----Black.js
              |-----config
              		|----Config.js
              |-----pointmgr
              		|-----Pointmgr
              |-----prem
              		|-----Prem.js
              |-----privilege
              		|-----Privilege.js
              |-----role
              		|-----Role.js
              |-----AppRouter.js
       |-----style//css,less样式
       |-----app.js//入口文件
|------index.html//首页
|------package.json
|------server.js//启动整个服务端口文件
|------webpack.config.js//配置文件
 
```

首先还是来粗略了解该项目中的几个文件

* webpack.config.js

```javascript
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
		proxy: {//设置跨域
			'/demo/*': {
				target: 'http://localhost:1000',//这个配置端口，利用express模拟端口数据解决跨域问题
				secure: false
			}
		}
	 }
}
```

  看一下package.json这个依赖的文件:我们会注意到该配置的package.json文件中有有`scripts` 前面的test,start或者dev就代表了在终端输入后面的一串东西，webpack直接提供了更加便捷的方式，直接npm run dev 就代表了运行你指定的服务。对于devDependencies这个配置，当我们项目中所有的依赖模块都会在这里显示，当我们要使用某个模块时，此时，我们必须要npm install --save-dev xxxx 某个模块即可。

```javascript
{
  "name": "hot-loader",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --port 5000",//这里这样设置直接启动端口，默认会找到根目录文件
     "dev": "node server.js"
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

再来看一下这个启动server.js的服务文件

```javascript
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');//需要webpack-dev-server这个模块启动端口
const config = require('./webpack.config.js');//需要引入webpack.config.js这个文件
const compiler = webpack(config);
//监听端口启动服务
new webpackDevServer(compiler).listen(config.devServer.port,function(err){
	if(err){
		console.log(err)
	}
	console.log('listening at localhost success:'+config.devServer.port);
})
```

介绍完最基本的几个配置文件，我们首先来看首页`index.html` 

```javascript
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
  </div>
	<!--
		这里的路径要与webpack.config.js中的filename路径保持一致
	-->
	<script type="text/javascript" src="./build.js"></script>
 </body>
</html>
```

在首页引入build.js这个文件实际上在我们运行npm run dev时，该文件由webpack打包在虚拟内存中，实际上是在根目录上是存在的，只是这个文件保存在内存中，所以才不会看到，当我们在正式环境时，我们就需要特殊的模块将它打包到指定的文件中即可。

我们注意到src目录中有一个app.js文件，该文件实际上是将react中每一个路由模块，以及构建的一些子页面形成虚拟dom挂载到index.html的真实dom中去

````javascript
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./pages/AppRouter";//引入路由，该文件包括所有的子页面
//将虚拟dom挂载到真实dom中去
ReactDOM.render(<AppRouter/>,document.getElementById("main"));
````

`AppRouter.js`文件

```javascript
import React from "react";
import ReactDOM from "react-dom"
//import {Router,Route,hashHistory} from 'react-router';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Pointmgr from "./pointmgr/pointmgr";
import Activemgr from "./activemgr/Activemgr";
import Privilege from "./privilege/privilege";
import Config from "./config/config";
const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/pointmgr">会员积分</Link></li>
        <li><Link to="/activemgr">会员活动</Link></li>
        <li><Link to="/privilege">会员特权</Link></li>
        <li><Link to="/config">配置管理</Link></li>
      </ul>
      <Route exact path="/" component={Pointmgr}/>
      <Route exact path="/pointmgr" component={Pointmgr}/>
      <Route path="/activemgr" component={Activemgr}/>
      <Route path="/privilege" component={Privilege}/>
      <Route path="/config" component={Config}/>
    </div>
  </Router>
)
export default AppRouter;//输出该路由模块
```

在AppRouter.js文件中我们定义 const AppRouter这个模块，在我们常用的开发习惯中，我们都会以一个模块方式来写，上面一块代码也等价于下面一段

```javascript
....
class AppRouter extends Recat.Component {
  constructor(props){ //默认的构造函数，如果不写，默认为空
    super(props)
  }
  render(){//render()内部是虚拟的dom结构，最外层只能有一个节点
    	return (<Router>
            <div>
              <ul>
                <li><Link to="/pointmgr">会员积分</Link></li>
                <li><Link to="/activemgr">会员活动</Link></li>
                <li><Link to="/privilege">会员特权</Link></li>
                <li><Link to="/config">配置管理</Link></li>
              </ul>
              <Route exact path="/" component={Pointmgr}/>
              <Route exact path="/pointmgr" component={Pointmgr}/>
              <Route path="/activemgr" component={Activemgr}/>
              <Route path="/privilege" component={Privilege}/>
              <Route path="/config" component={Config}/>
    		</div>           
       </Router>)
  }   
}
export default AppRouter
```

推荐第二种写法，在demo中还是以第一种写法，个人因人而异，虽然平时开发中都会是第二种，但是在demo中我还是用了第一种方式感受一下，两者代码风格在思维上有些不同，第二种方式写多了，因此第一种方式比较新颖。

在路由设置中，我们注意到在使用路由时，<Link>标签会自动被解析成a标签，而Route中的path必须要与Link中的路径保持一致，我们注意到在Router设置`/` 和`/pointmgr` 两个模块的模块都是Pointmgr,也就是意味着当我们访问地址`/` 和`/pointmgr` 是一样的。但是有一个`exact`属性，这个属性的作用是只会显示一次组件的内容，重复出现的内容会不显示。

看一个路由中的一个人role组件`role.js` ,其他几个模块类似

```javascript
/*role.js*/
import React from "react";
import ReactDOM from "react-dom";
import Header from "../../component/header/Header";
import style from "../../style/common.styl";
const role = () => (
  <div>
    <h2>角色管理</h2>
  </div>
)
export default role;
```

当我们有一个需求时，就是路由里面有子路由时，那么该怎么处理？

例如;`config.js` 该文件

```javascript
import React from "react";
import ReactDOM from "react-dom";
import style from "../../style/common.styl";
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import black from "../black/black";
import prem from "../prem/prem";
import role from "../role/role"

const config = (macth)=>(
  <div>
    我是配置管理
  </div>
)
class Config extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    //这里的props主要可以拿到父级所有的参数
    /*
      isExact:false;
      params
      path
      url
    */

    let match = this.props.match;
    console.dir(match);//macth.url===='/config'

    return (<div>
              <ul>
                <li>
                  <Link to={`${match.url}/config`}>
                    基本配置
                  </Link>
                </li>
                <li>
                  <Link to={`${match.url}/black/1`}>
                    黑名单
                  </Link>
                </li>
                <li>
                  <Link to={`${match.url}/prem`}>
                    权限管理
                  </Link>
                </li>
                 <li>
                  <Link to={`${match.url}/role`}>
                    角色管理
                  </Link>
                </li>
              </ul>
              <Route path={`${match.url}/config`} component={config}/>
              <Route path={`${match.url}/black/:id`} component={black}/>
              <Route path={`${match.url}/prem`} component={prem}/>
              <Route path={`${match.url}/role`} component={role}/>
              <Route exact path={match.url} render={() => (
                <p>请选择配置管理</p>
              )}/>
          </div>
        )
  }
  
};
export default Config;
```

在config.js这个文件中，它的父组件是AppRouter.js中config模块，当路由发生变化时，我们可以在子组件中打印相应的props变化

```javascript
//props的变化
history,location,match
//其中match中有url的相关地址
let match = this.props.match;//match中有isExact:true,path:'/config',url:'/config'
```

故：在我们子路由中可以监控props的变化，监控URL的path值变化

在Link中设置的path要与Route中的path要保持一致，我们注意到`<Route path={`{match.url/black/:id}`}> ` 则对应的`<Link path={`${match.url/black/1}`}/>` 当这样设置时，这个id就等于1；

我们可以在black组件中通过this.props.match.id获取父组件中url中的参数

black.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import style from "../../style/common.styl";
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';


class black extends React.Component{
	render(){
		let match = this.props.match;
		return( <div>
    			<h2>黑名单{match.params.id}</h2>//这里的match.params.id ==>1
 			</div>
		)
	}
}
export default black;
```

其他几个模块基本上都差不多，路由最关键的一点是使用的Link中的path必须要与Route中的path保持一致，且在在AppRouter.js中最外层必须要有有Router包裹，且必须只能是一个节点，当我们路由中的aurl发生变化时，子组件会监控props的变化，因此我们可以通过设置link中参数可在子组件中获取。譬如：

```javascript
....
<Link path="/ptask/type/2"></Link>
<Route path="/ptask/type/:id" component="ptak"></Route>   
```

上诉的id就等于2，所以当匹配到相应的Url时，那么就会选择对应的内容。

### 总结

* 了解了如何使用路由，路由的使用必须依赖react中的`react-router-dom` ，其中必须引入`import {Router,Route,Link} from 'react-router-dom';` 这些模块
* 在我们使用一个路由子模块中，我们直接可以以变量的方式去输出对应的模块，例如 const a = ()=>(<div>我是内容a</div>)  export default a;
* 在使用路由的过程中，父组件的url发生变化时，子组件可以监控props的变化，其实`this.props.match` 可以监控到url的很多参数，比如path,location等等