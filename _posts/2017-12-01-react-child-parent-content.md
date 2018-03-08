---
layout: post
title: react父子组件通信以及生命周期
date: 2017-12-01
tag: react
---

#### react中的父子通信

> 在react开发中，通常接触最多的就是组件中的state以及props,在react中数据流是单向的，它是通过state去更新UI,在父组件传递到子组件的数据中，子组件获取数据就通过父组件传入的props中去拿到。在父子组件的通信中，我们要关注，react是怎样通过state去驱动更新UI的，以及在setState()这个更新UI数据中中，React是如何渲染的，因此react中的生命周期也是一个非常重要的点，在本文中你也可以看到父子间的通信，以及对react中生命周期的详解

#### 项目结构
```javascript
|---mock
     |----book.js
     |----data.json
     |----draw.js
     |----point.js
     |----routers.json
 |---node_modules
 |---src
      |----components
             |-----item.js
             |-----list.js
       |----app.js
  |----.babelrc
  |----index.html
  |----package.json
  |----webpack.config.js
```

#### 主要关注app.js(入口文件)

```javascript
import React from "react"
import ReactDom from "react-dom"
//引入其他组件
import List from "./components/list.js"
import $ from 'jquery'
class Main extends React.Component{

    //默认构造函数constructor方法，默认只会加载一次
    constructor(props){
    	super(props);
    	this.state = {
    		data:[]
    	}
    }
    getData(){
      //请求接口数据
      $.get('/ucs/book/list.do').then((res)=>{
       		this.setState({
       			data:res.data
       		})
       });
   }  
	render(){
		return(
			<div className="main">
			    <List data={this.state.data}/> 
				<input type='button' value="获取数据" onClick={this.getData.bind(this)}/>
			</div>
		)
	}

}
ReactDom.render(<Main/>,document.getElementById('app'))
```

#### 我们利用mock以及json-server构造了假接口数据 `/ucs/book/list.do`

#### list.js

在List组件中，我们可以发现app.js中的`<List/>`可作为父级，数据是从data传入List子组件中的，我们在list.js中获取父组件的数据是通过this.props.data获取父组件传入子组件的数据

```javascript
//list.js
import React from "react"
import ReactDom from "react-dom"

import Item from "./item.js"
class List extends React.Component{
  	//初始化数据，只会一次
	constructor(props){
		super(props); 
		this.state = {
			idx:0
		}
	}
	handShow(idx){
		//改变状态
		this.setState({
			idx:idx
		})
	}
	render(){
		let list = this.props.data.map((item,idx)=>{  
			return (<div key={idx}>
						<h3 onClick={this.handShow.bind(this,idx)}>
							{item.title}
						</h3>
					<Item list={item.list} showContent={this.state.idx == idx}/>
				</div>)
		   });
		return (<div>
				{list}
			</div>)
	}
}
export default List
```

在item.js中，同样是父组件的数据通过list传入子组件中，并且传入了一个showContent的props属性 ,在handShow方法中通过idx索引去选择showContent的布尔值。

```javascript
//item.js
import React from "react"
import ReactDom from "react-dom"
class Item extends React.Component{
	constructor(props){
		super(props);	
	}
	render(){
		return (<div>
		{
			this.props.showContent?
		  	this.props.list.map((item,idx)=>{
		  		return(<ul key={idx}>
		  			<li>{this.props.list[0]['author']}</li>
		  			<li>{this.props.list[0]['desc']}</li>
		  		</ul>)
		  	}):null
		}	
		</div>)
	}
}
export default Item;
```

在list.js中,我们主要看一下react的整个生命周期过程

```javascript
import React from "react"
import ReactDom from "react-dom"
import Item from "./item.js"
class List extends React.Component{

	constructor(props){
		console.log("3333");//只会调用一次
		super(props); 
		this.state = {
			idx:0
		}
	}
	//在构建组件的时调用,只会调用一次
	componentWillMount(){
		console.log("1111在构建时调用");
	}
	//组件完全挂载完成时调用
	componentDidMount(){
		console.log("22222");
	}
	//只要父组件render重新渲染数据后，就会调用这个方法
	componentWillReceiveProps(nextProps,nextState){
		console.log("555555")
		//console.log(nextProps);//监控父组件中传入的data
	}
	//这个方法默认返回true,当调用setState这个方法时，就会调用该方法shouldComponentUpdate,此时componentWillUpdate也会被调用
	shouldComponentUpdate(nextProps,nextState){
		console.log("4444444")
		//console.log(nextProps,nextState);
		return true
	}
	//当shouldComponentUpdate返回false,componentWillUpdate不会被调用
	componentWillUpdate(nextProps,nextState){
		console.log("666666",nextProps)
	}
	//在render结束后调用该方法
	componentDidUpdate(){
		console.log("7777777")
	}
	handShow(idx){
		//改变状态
		this.setState({
			idx:idx
		})
	}
	render(){
	    coonsole.log(88888);
		let list = this.props.data.map((item,idx)=>{  
			return (<div key={idx}>
						<h3 onClick={this.handShow.bind(this,idx)}>
							{item.title}
						</h3>
					<Item list={item.list} showContent={this.state.idx == idx}/>
				</div>)
		   });
		return (<div>
				{list}
			</div>)
	}
}
export default List
```

在`List` 组件中，constructor()只会在组件初始化的时候调用一次，componentWillMount()方法会在挂载时触发一次，componentDidMount()会在componentWillMount()之后触发,componentDidMount()这个方法在render方法只调用一次。

在运行整个服务时，react执行的顺序是:

1:constructor(){}

2: componentWillMount(){}

3:render()

4:componentDidMount()组件挂载完成时

5:当我们父组件向子组件传递数据时，此时会触发componentWillReceiveProps这个方法。在这个方法中会接收两个参数

componentWillReceiveProps(nextProps,nextState),nextProps会监测父组件中的props，nextState会监测当前的state;

6:shouldComponentUpdate()这个方法同样在父组件传递数据时会调用，默认该方法会被调用且返回true;当shouldComponentUpdate这个方法返回false时，此时

componentWillUpdate()方法就不会被调用，那么此时this.setState()也不会产生作用。

当shouldComponentUpdate()返回ture时，就会自动调用componentWillUpdate这个方法，从而去更新state

7:componentDidUpdate()这个方法会在render后调用。当我们没更新props数据时，都会重新进入render方法

![](/images/react/prop.png.png)

###  父子组件通信

再来看一段代码

Children子组件

```javascript
//子组件
class Children extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			flag: false,
			msg: '16px'
		}
	}
	changeFont(){
		this.state.flag = !this.state.flag;
		if(this.state.flag){
			this.state.msg = "32px"
		}else{
			this.state.msg = "16px";
		}
		this.props.fontSize(this.state.msg);
	}
	render(){
		let bookArr = this.props.bookArr;//获取父组件的传入的数据
		let fontSize = this.props.font;
		return(<div>
				{bookArr.map((item,i)=>{
					return(<p key={i} style={{fontSize:''+fontSize+''}}>{item}</p>)
				})}
				<input type="button" value={`改变父组件的字体${this.state.msg}`} onClick={this.changeFont.bind(this)}/>
	
			</div>)
	}
}
```

父组件

```javascript
 //父组件
class Parent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			bookArr:['你不知道的javascript','dom编程艺术','mySql必知必会','nodejs实战'],
			fontSize:"16px"//默认传入的初始值
		}
	}
	changeSize(msg){
		this.setState({
			fontSize:msg
		})
	}
	render(){
		return(<div>
				<Children bookArr={this.state.bookArr} font={this.state.fontSize} fontSize={msg =>this.changeSize(msg)}/>
			</div>)
	}
}
```

我们可以发现，Children在Parent组件中是一个子组件，在父组件中是bookArr接收父组件初始化的数据，父组件的数据bookArr数组在子组件Chiildren中，以this.props.bookArr获取，在子组件中可以改变父组件的state,而在react中数据流是单向的，在子组件中，我们将fontSize当成一个方法传入子组件中，通过箭头函数向方法中传入形参，因此在父组件中就可以调用该方法，传入实际参数，实现改变该值。 

[demo地址](https://github.com/maicFir/react-demo/lesson9)