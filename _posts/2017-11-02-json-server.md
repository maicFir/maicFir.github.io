---
layout: post
title: json-server 伪造接口数据
date: 2017-11-22
tag: json server
categories: json-server
permalink: /json-server/2017/11/22
---

####  json-server伪造接口数据

通过json-server伪造假接口数据，让前端摆脱过度依赖后端接口的开发方式，从而达到前后分离同步开发。在本文中主要涉及mockjs,以及json-server的配置使用，需要对react基础有一定的认识，对模拟数据进行真实请求访问

<!--more-->
#### 首先构建一个简单的react应用页面

```javascript
//项目结构
|---node_module
|---src
    |----app.js
|---index.html
|---package.json
|---webpack.config.js
|---.babelrc
```

#### package.json

> 在这个文件中主要是依赖的一些包，主要是你在babel环境运行es6以及react的依赖包，这里关于构建react页面以及运行环境不作详细陈述，其中.babelrc文件必不可少

```json
{
  "name": "json-server",
  "version": "1.0.0",
  "description": "伪造数据",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --port 5000"
  },
  "author": "maic",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.24.1",
    "babel-loader": "^6.4.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "jquery": "^3.2.1",
    "json-loader": "^0.5.4",
    "json-server": "^0.10.0",
    "mock": "^0.1.1",
    "mockjs": "^1.0.1-beta3",
    "stylus-loader": "^3.0.1",
    "webpack": "^2.3.3",
    "webpack-dev-server": "^1.14.1"
  },
  "dependencies": {
    "babel": "^6.23.0",
    "css-loader": "^0.28.0",
    "postcss-loader": "^1.3.3",
    "postcss-modules-values": "^1.2.2",
    "rc-calendar": "^8.1.0",
    "rc-time-picker": "^2.3.4",
    "react": "^15.5.3",
    "react-bootstrap": "^0.30.8",
    "react-css-modules": "^4.2.0",
    "react-dom": "^15.5.3",
    "react-router-dom": "^4.1.1",
    "style-loader": "^0.16.1",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.1",
    "url-loader": "^0.5.8"
  }
}
```



#### index.js

```html
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>json-server</title>
 </head>
 <body>
	<div id="app"></div>
    //这里的路径要与webpack.config.js中的output路径保持一致
	<script type="text/javascript" src="./build.js"></script>
 </body>
</html>
```

#### webpack.config.json

```javascript
module.exports = {
	entry:__dirname+"/src/app.js",
	output:{
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
			   loader:'babel-loader',
			   query:{
				  presets:['es2015','react']	
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
	        	loader: 'url-loader?limit=8192'//css中加载图片使用的插件，url-loader
	      	}
		]
	},
	 devServer: {
		contentBase: "./",//这里配置影响入口文件
		colors: true,
		historyApiFallback: true,
		inline: true
	 }
}
```

#### 入口app.js文件

```javascript
import React from "react"
import ReactDom from "react-dom"
class Main extends React.Component{
	constructor(props){
		super(props);
	}
  getData(){
    //alert(1111)
    $.ajax('http://localhost:3002/mynewslist').then((res)=>{
      console.log(res)
    })
  }
	render(){
		return (
			<div className="main">
				<input type='button' value="获取数据" onClick={this.getData.bind(this)}/>
			</div>
		)
	}

}
ReactDom.render(<Main/>,document.getElementById('app'))
```

* 新建mock/data.json

```js
  {
    "news":[
      {
        "id": 1,
        "title": "曹县宣布昨日晚间登日成功",
        "date": "2016-08-12",
        "likes": 55,
        "views": 100086
      },
      {
        "id": 2,
        "title": "长江流域首次发现海豚",
        "date": "2016-08-12",
        "likes": 505,
        "views": 9800
      }
    ],  
    "comments":[
      {
        "id": 1,
        "news_id": 1,
        "data": [
          {
            "id": 1,
            "content": "支持党中央决定"
          },
          {
            "id": 2,
            "content": "抄写党章势在必行！"
          }
        ]
      }
    ]
  }
```

  * npm install json-server

  * 在package.json 的script中配置json-server

```json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack-dev-server --port 5000",
        "mock": "json-server ./mock/data.json --port 3002",//json-server模拟的端口号
      }
```

  * 在配置json-server 中有这样的一些配置参数

```js
    json-server <source> <option>
    options
       --config, -c       指定 config 文件                  [默认: "json-server.json"]
      --port, -p         设置端口号                                   [default: 3000]
      --host, -H         设置主机                                   [默认: "0.0.0.0"]
      --watch, -w        监控文件                                           [boolean]
      --routes, -r       指定路由文件
      --static, -s       设置静态文件
      --read-only, --ro  只允许 GET 请求                                    [boolean]
      --no-cors, --nc    禁止跨域资源共享                                   [boolean]
      --no-gzip, --ng    禁止GZIP                                          [boolean]
      --snapshots, -S    设置快照目录                                     [默认: "."]
      --delay, -d        设置反馈延时 (ms)
      --id, -i           设置数据的id属性 (e.g. _id)                     [默认: "id"]
      --quiet, -q        不输出日志信息                                     [boolean]
      --help, -h         显示帮助信息                                       [boolean]
      --version, -v      显示版本号                                         [boolean]
```

* 运行npm run mock 浏览器中输入 localhost:3002/mynewslist

![](/images/jsonserver/1.png)

```js
  [
    {
      "id": 1,
      "title": "曹县宣布昨日晚间登日成功",
      "date": "2016-08-12",
      "likes": 55,
      "views": 100086
    },
    {
      "id": 2,
      "title": "长江流域首次发现海豚",
      "date": "2016-08-12",
      "likes": 505,
      "views": 9800
    }
  ]
```

  当我们在app.js页面中点击按钮时，此时会发生ajax请求，那么也会证实我们利用json-server模拟的数据没有错误

  #### 如何结合mock.js造json假数据

  * 在mock目录下新建draw.js,mockserver.js和routers.json

```javascript
//draw.js
let Mock = require('mockjs');//引入mockjs
let Random = Mock.Random;
let create = function createData(){
	let data = {
		total:7,
		data:[]
	} 
    for(var i=0;i<data.total;i++){
		data.data.push(Mock.mock({
			id: i,
			createTime: Random.date('T'),
			text: Random.cword(3,8),
			number: Random.integer(10,100)
		}))
	}
	return data
}
module.exports = create;
```
* mockserver.js

```javascript
let draw = require('./draw.js');
module.exports = function data(){
	let data = {};
	data.draw = draw();//这里的data.draw 与routers.json中的'/draw'对应
	return data
}
```

* routers.json

```javascript
{
   "/ucs/draw/list.do": "/draw"
}
```

* 在package.json中的script中配置加上mockrouter

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --port 5000",
    "mock": "json-server ./mock/data.json --port 3002",
    "mockrouter": "json-server --watch ./mock/mockserver.js --port 3023 --routes ./mock/routers.json"
  }
```

* 运行 npm run mockserver  浏览器中输入localhost:3023/draw或者loclost:3023/ucs/draw/list.do

![](/images/jsonserver/2.png)
![](/images/jsonserver/3.png)

* 当我们需要模拟多个接口时，只需要类似新建一个draw.js文件即可，比如新建point.js
```javascript
let Mock = require('mockjs');
let Random = Mock.Random;
let create = function createData(){
	let data = {
		total:6,
		data:[]
	}
    for(var i=0;i<data.total;i++){
		data.data.push(Mock.mock({
			id: i,
			createTime: Random.date('T'),
			img: Random.image('200x300'),
			number: Random.integer(10,100)
		}))
	}
	return data
}
module.exports = create;
```

然后在mockserver.js

```javascript
let draw = require('./draw.js');
let point = require('./point');//引入point
module.exports = function data(){
	let data = {};
	data.draw = draw();
	data.point = point();

	return data
}
```

routers.json中

```javascript
{
   "/ucs/draw/list.do": "/draw",
   "/ucs/point/list.do": "/point"
}
```

重启模拟接口服务 localhst:3023/ucs/point/list.do

![](/images/jsonserver/4.png)
![](/images/jsonserver/5.png)
#### 小结

* 主要是利用json-server模拟端口，在react中构建基础页面时，注意输出output文件与webpack.config.js配置中基础devServer的contentBase配置要保持一致
* 在使用mockjs和json-server的前提下要安装基本的相关依赖包
* 在package.json文件的scripts内容，注意json-server 的一些端口，路由参数配置
* 关于模拟接口文件,draw.js中主要依赖mock库产生的随机数,在mockserver.js文件中要引入相关接口