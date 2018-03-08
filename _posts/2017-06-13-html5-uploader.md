---
layout: post
title: HTML5图片上传
date: 2017/06/13
tag: html5
---


###  HTML5实现文件上传

> html5实现图片上传预览功能是一个非常称赞的功能，通常可以实现多张图片上传，过去使用flash上传多图片，现在使用H5中的FileReader方法就可以实现，
>
> 图片上传支持ajax方式，file控件可读取文件的相关信息，通过监控FileReader的onload方法获取该对象下e.target.result获取图片的base64的url,再通过readAsDataURL(files[0]) 将文件编码转换成DataURL,使用这种方式的好处是不用向服务器发送http请求额外的请求，但因图片大小限制，不太适合大图片的编码，网页也很可能因此而造成加载异常。

### 本文主要对图片上传做如下几个讲解

* 1：利用file控件获取该对象下的files[0]对象
* 2：var render = new FileReader() 下的几个api方法，onload,readeAsDataURL
* 3:trigger()方法改变事件绑定类型
* 5:对files.type的上传图片类型进行限制

### 正文开始

index.html

```html
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>HTML5文件上传</title>
   <style>
      .main{
    width:100%;
  }
  .add{
    font-size:30px;
    display:inline-block;
    text-align:center;
    padding:20px;
    border:1px solid #ccc;
    text-decoration:none;
    background-color:#ccc;
  }
  .img{
    position:relative;
    display:inline-block;
  }
  .img>a{
    position:absolute;
    right:0px;
    top:10px;
  }
   </style>
  </head>
 <body>
     <div class="main"></div>
     <div id='progress'></div>
     <a href="javascript:void(0)" class="add">+</a>
     <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
     <script type='text/javascript' src='./main.js'></script>
  </body>
  </html>
```

```html
$(function(){
      var defaultSie = 1*1024;
      var $this = null;
      var filesData = {
        image: [],//存储图片的相关信息,
        imgType: ['jpeg','jpg','gif','png'],//图片的允许类型
        defaultSize: defaultSie,
        delImage:[],
        flag:false
      };
      //添加
      $(".add").on("click",function(){
        var file = $("<input type='file' name='file' multiple='multiple' id='imgFile'/>");
        fileChange(file);
      });
      //删除
      $("body").on("click",".del",function(e){
        var name = $(this).attr("name");
        var index = 0;
        var image = filesData.image;
        var newsData = [];
        for(var i in image){
          if(image[i]['name'] == name){
            index = i;
            image.splice(index,1);//删除filesData.image中的指定元素
            filesData.delImage.push(name);//向delIage数组中添加图片信息
          }
        }
        filesData.flag = true;
        getImage(image,$(this));
        $this = $(this);
      });
      function fileChange(obj){
        obj.change(function(event){
          var ev = event.target||event.srcElement;
          //获取files[0]对象
          var file = ev.files[0];
          //获取fileReader对象
          var render = new FileReader();
         if(!isViliteImg(file)){
           return;
          }
         render.onloadstart = function(ev){
          console.log(ev)
         }
         render.onprogress = function(event){
          console.log(event)
         }
          //加载onload方法,获取图片的相关信息
          render.onload = function(e){
            filesData.image.push({
              lastModified: new Date(file.lastModified),
              file:file,
              name: file.name,
              size: file.size,
              type: file.type,
              path: e.target.result,//加载base64的图片地址
            });
            filesData.delImage = filesData.image;
            getImage(filesData.delImage)//必须是render加载完成时调用该方法
          }
          //调用readAsDataURL方法
          render.readAsDataURL(file);
         upload(file);
        })
        //将obj点击事件变成click
        obj.trigger("click");
      };
      function getImage(obj,ths) {
        var data = obj,html='';
        data.map(function(item,i){
          html+= "<div class='img'><img src="+item['path']+" width='100%' height='auto'/><a href='javascript:;' class='del' name="+item['name']+">删除</a></div>"
        })
        $(".main").html(html);
        if($(".img").find("img").attr("src")=="undefined"||$(".img").find("a").attr("name")=="undefined"){
          $("a[name='undefined']").parent().remove();
        };
      }
      function isViliteImg(file){
        var imgType = file.type.split("/")[1];
        var imgSize = file.size;
        //如果imageType不存在这几种类型的图片，则终止上传
        if(filesData.imgType.indexOf(imgType)==-1){
          return false;
        };
        return true;
      };
    })  
```

### 关于new  FileReader()对象下的一些api方法

> new FileReader()是用来读取文件的一个新的API方法，无论读取文件是否失败，方法都不会返回其结果，其结果会存在一个event.target.result属性中。

| error       | 读取文件失败时调用              |
| ----------- | ---------------------- |
| onerror     | 读取文件失败时调用              |
| onabort     | 中断读取                   |
| onload      | 文件加载完成后                |
| onloaded    | 读取完成时，此时无论文件是否读取失败还是成功 |
| onloadstart | 开始时读取                  |
| onprogress  | 文件正在读取                 |
| readState   | 文件读取的状态                |
| result      | 返回结果                   |

* onloadstart

~~~javascript
.....
  <a href="javascript:void(0);" class="add">添加</a>
  <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
  <script type="text/javascript">
    $(".add").click(function(){
        var $file = $("<input type='file' name='file'/>");
        $file.change(function(e){
                //获取file[0]对象
          var file = e.target.files[0];
                //获取FileReader对象
        var render = new FileReader();
        //加载文件时会调用这个匿名函数
        render.onloadstart = function(e){
          var target = e.target;
          console.log(target);//FileReader对象下的一些方法
          console.log(target.readyState);//1
        }
                //文件中断时加载这个方法
        render.onabort = function(){
          alert(1)
        }
        //正在加载时
        render.onprogress = function(e){
          var target = e.target;
          console.log(target.readyState);//1
          var imgUrl = target.result;
          console.log(imgUrl);
        }
        //加载完成
        render.onload = function(e){
          var target = e.target;
          console.log(target.readyState);//文件加载完成后  2
        }
        //读取file对象下的数据
        render.readAsDataURL(file);
                //render.readAsText(file);//如果该文件是个txt文件，则会读取文件内容
        });
        $file.trigger("click")
    })
  </script>

~~~

### 本文小结

主要对` new FileReader()`这个新的API进行的讲解，在文件上传时，先要获取file对象，然后监控`onchange`事件获取文件的files[0]对象，然后实例化FileReader对象，在FileReader对象下调用onload方法，获取result值，最后FileReader对象`readAsDataURL(files[0])`进行读取文件资源

通常实现了本地上传预览的基本功能，实际上功能只是实现了一半，在与后台的交互中，必须要讲form表单中的一些值传送给后台，此时在HTML5新增的一个API中就有一个非常有用的方法，`new FormData()`。

本文案例[demo]()