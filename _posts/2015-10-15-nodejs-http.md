---
layout: post
title: 关于nodejs的认识
date: 2017-10-15
tag: nodejs
---
#### 关于nodejs
> 我们在官网看到关于Nodejs的介绍，nodejs是基于Chrome v8引擎的javascript环境，它利用事件驱动，非阻塞的IO模型，并且nodejs使用npm包管理，同时可操作流，访问后台数据库，nodejs可以作为一门后台语言，对于未曾接触后台的语言的同学来说，nodejs打开了你视野，让前端不在拘泥于纯前端的状态中，nodejs解放了不会后台语言开发模式，nodejs也让前端的生产工程化迈向了一个更高更远的境界

#### nodejs的全局变量global
```js
// a.js
var a = 1;
global.a = 2;
console.log(a,global.a);//1,2
console.log(a == global.a)//false
```

当我们运行node a.js，此时结果发现用var申明的变量a与global并不一致，他们并不相等

```javascript
//b.js
var c = require('./a.js');
console.log(a,global.a);//2,2
```

运行node b.js此时打印的结果是2,2，此时说明在nodejs中利用global定义的变量，如果通过require引入另外一个文件中就可使用，`与var申明的变量不是同一变量`;

#### 关于global变量中的module,exports,__dirname,__filename,module,require()

* module
```javascript
  console.dir(module);
  /*
  	Module {
        id: '.',//模块的标识
        exports: {},
        parent: null,
        filename: 'E:\\nodejs学习\\lesson3\\index5.js',//该模块的文件名
        loaded: false, //模块是否加载完成
        children:
         [ Module {
             id: 'E:\\nodejs学习\\lesson3\\index4.js',
             exports: {},
             parent: [Circular],
             filename: 'E:\\nodejs学习\\lesson3\\index4.js',
             loaded: true,
             children: [],
             paths: [Object] } 
            ],
        paths://模块的搜索路径
         [ 'E:\\nodejs学习\\lesson3\\node_modules',
           'E:\\nodejs学习\\node_modules',
           'E:\\node_modules'
          ] 
    }
  */

  console.log(module.filename);//E:\\nodejs学习\\lesson3\\index5.js 打印出该文件的全部路径以及文件名
  console.log(module.export.c = 'hello');
```

  在module对象下有exports属性，该属性通常是导出指定的某个变量、对象、或者方法,然后可以在另外一个文件中利用require引入该文件就可以使用module.exports导出的模块，譬如：module.exports = {a:1}等。

  ```javascript
  //d.js
  module.exports.prize = 100;//或者exports.prize = 100
  module.exports.stu = {name:'maic',age:20}//或者 exports.stu = {name: 'maic',age:20}
  console.log(module.exports == exports);//true
  //e.js
  var data = require('./d.js');
  console.log(data);//{prize:100,stu:{name:'maic',age:20}}
  ```

  通常我们有时会见到这样的写法:`module.exports`和`exports`两者实为等价.

#### 关于__dirname

  在Nodejs中，`__dirname`是个全局变量，它代表当前文件相对路径

  ```javascript
  //a.js
  console.log(__dirname);//E:\nodejs学习\lesson3
  ```
  #### 关于process(进程)
  > 它是nodejs的进程，属于全局global变量，使用process可以获取nodejs的版本以及系统的相关信息


​ console.log(process.argv);//打印两个，一个是node的可执行程序，另一个是该文件所在路径


```javascript
 //模拟输入流输出到输出流，输出到终端去

    process.stdout.write('请输入num的值:');

     //监听用户输入的值

     var num1,num2;

     process.stdin.on('data',function(chuck){

        if(!num1){

            num1 = Number(chuck);

            process.stdout.write("请输入num2的值:")

        }else{

            num2 = Number(chuck);

            process.stdout.write('结果是:'+(num1+num2))

        }

     })
```

#### 关于nodejs中的http模块

> http 模块是nodejs构建一个服务器的不可或缺的模块，该模块处理客户端到服务器之间通信 

```javascript
//index.js
var http = require('http')//获取一个http的模块
//创建一个server服务
var server = http.createServer();

server.on('error',function(){
  //当服务器发生错误时，激活该方法
  console.log('this is server error');
});

server.on('listening',function(req,res){
  	//运行该服务时,监听
  	console.log('listening')
});

server.on('request',function(req,res){
  	//当在客户端输入地址请求的时候
  	res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    res.end('hello node js')
});
server.listen(8888);//浏览器监听8888端口
```

当们启动服务运行node index.js 在浏览器终端输入localhost:8888时，此时页面上的内容就是`hello node js`

上面一段程序很清晰的表述了一个网页从客户端请求到服务器接收响应返回相应的信息过程，上面一段可简写以下一种方式

```javascript
var http = require('http');
http.createServer(function(req,res){
  	res.writeHead(200,{'content-type':'charset=utf-8'});
    res.write('hello node js');
    res.end();//这一句一定要有
}).listen(8888);
```

### 模拟网页输入不同的url输出不同的内容

* 以下时目录结构
* 在准备该目录时，你的电脑环境必须要安装Nodejs环境
* npm init 初始化项目生成package.json配置文件
* 根据相应的报安装依赖 npm install --save-dev xxxx xxxxx

```javascript
|-----node_modules
|-----page
       |----404.html
       |----center.html
       |----index.html
 |-----index.js
```

index.js

```javascript
var http = require('http');//需要依赖http模块
var url = require('url');//需要url模块
var fs = require('fs');//依赖fs
var dirUrl = __dirname+'/page/';
var server = http.createServer(function(req,res){
  
  var path  = url.parse(req.url);//req.url获取浏览器输入的地址
  
  switch(path.pathname){
    case '/':
     // res.writeHeader(200,{'content-type':'text/html;charset=utf-8'});
     // res.end('首页');//等价于res.
      sendData(dirUrl+'index.html',req,res);
    case '/center':
      //res.writeHeader(200,{'content-type':"text/html;charset=utf-8"});
      //res.end('个人中心');
      sendData(dirUrl+'center.html',req,res);
    default:
      //res.writeHeader(200,{'content-type':"text/html;charset=utf-8"});
     // res.end('404页面')
      sendData(dirUrl+'404.html',req,res);
  }
})
function sendData(fileUrl,req,res){
  //利用fs读取文件获取文件内容
  fs.readFile(fileUrl,function(err,data){
    if(err){
        res.writeHeader(200,{'content-type':"text/html;charset=utf-8"});
        res.end('404页面');
    }else{
      	 res.writeHeader(200,{'content-type':"text/html;charset=utf-8"});
      	 res.end(data);
    }
  })
  
}
server.listen(8888)
```

接下来page目录中的几个页面

* `404页面`

```html
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>404页面</title>
 </head>
 <body>
  		<h5>我是404页面</h5>
 </body>
</html>
```

* `index.html`

```javascript
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>首页</title>
 </head>
 <body>
  		<h5>我是一个首页</h5>
 </body>
</html>
```

* center.html

```javascript
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>个人中心</title>
 </head>
 <body>
  		<h5>我是一个个人中心</h5>
 </body>
</html>
```

当我们启动服务，运行node index.js时，然后在浏览器中输入http://localhost:8888，对于依次输入localhsot:8888/center,或者localhost:8888/index,或者输入localhost:8888/task，那么会在客户端网页中响应不同的内容信息。

#### 文章总结

* 主要初步了解了什么是nodejs,nodejs是基于v8引擎能实现后台数据库操作，文件读取以及流操作，它的用法和js类似
* 比较了一下nodejs中全局变量，模块的引入与导出，通常用global申明的变量，如果被引入另一个Js文件中，则该变量可用，moudle.exports 等价于exports，在一个文件中引入另外一个文件，直接require(src);引入的内容等价于exports输出的内容
* 简单地了解到在客户端发送请求，后台响应的过程，利用nodejs中的http模块，创建服务，客户端请求，浏览器响应返回相应的信息
* 了解到根据不同的url请求，响应相应的内容