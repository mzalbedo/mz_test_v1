==============
= 2018/10/14 =
============== 

  开始学习
  一、导航栏
      1.navigation开头的都是设置导航栏的，
      2.navigationStyle 的 custom属性可以隐藏导航栏
      3.backgroundColor 是手机上下拉动是出现的地方的颜色
  二、代码规范（团队）
      1.不能导致代码错误
      2.满足大规范
  三、小程序组件class中可以写入多个样式
  四、<view>相当于网页中的div  是个块级元素（一个占用一行）  (display: inline; 变为行内元素,无显示，因为行内元素无法设置长宽)；用display: inline-block解决(显示在一行);


==============
= 2018/10/15 =
============== 

  一、弹性盒子 -----  flex flexible box  
      1.flex container  容器 
     2.flex item  子元素
      （块状元素放到弹性盒子中后就会失去块状元素特性）
      3.可以设置排列方式  flex-direction: column;垂直排列      row（默认）：水平排列
    
==============
= 2018/10/16 =
============== 
  一、reverse倒序排列
      1.flex-direction  四个属性：column 垂直（上对齐）、column-reverse垂直倒叙（下对齐）、row水平（左对齐）、row-reverse水平倒叙（右对齐）
      2.弹性盒子宽度100%、高度自适应
  二、justify-content: 控制对齐方式。
      1.flex-start、flex-end
     2.center:居中
      3.space-around：等距分布
     4.space-between:平均分布
  三、主轴和交叉轴
     1.相对的 当布局是垂直布局时  主轴是垂直的  横向的就是交叉轴   反之相应改变
      2.交叉轴中
        align-items: stretch; 拉伸
        align-items: baseline;元素内文字基线对齐
      3.flex-wrap:是否换行
        nowrap （默认）不换行  如果元素宽度超过容器会被压缩
        wrap 换行

      ==============
      =   项目开发  =
      ============== 
      4.display: inline-flex;  消除块状特性，自适应大小
      5.bind:tap   bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。
        ps:事件分为冒泡事件和非冒泡事件：
          冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
          非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。
    
==============
= 2018/10/17 =
============== 
  一、三元表达式  a?b:c
  二、(组件)封装性   开放性
      1.封装在内部 ，开放出来的？（开放：可以在组件外部修改的）
      2.粒度   
  三、let like = this.properties.like  
      1.let  允许你声明一个作用域被限制在块级中的变量，语句或者表达式。与var关键字不同的是，它（var）声明的变量只能是全局或者整个函数块的。
        if(true){
          let a = 1
          var b = 2
        }
        console.log(b)  2
        console.log(a)  未定义
        
  四、this.setData({  //可以接收JavaScript对象  （用来更新指定属性）
        count:count,
        like:!like
      })
  

==============
= 2018/10/18 =
============== 
  一、同步、异步与回调函数
      1.let data = wx.request({.....})  无法将获取到的数据给data，因为wx.request是异步的，异步函数的返回值需要用回调函数接收
      2.回调函数
        success:function(res){
          console.log(res)    //在这里console.log(this.data.test)   this不可以使，因为作用域改变，他并没有指向任何page的object
         }
        需要改为：（箭头函数）
        success:(res)=>{
          console.log(this.data.test)
        }
  二、const （与let一样定义变量）
      1.定义的是一个（不可改变的）常量
      2.const config = {
        api_base_url:'http://bl.7yue.pro/v1/',
        appkey: "pe6lyAeHjpf7FrQf"
      }
      修改：config = 2  //报错    因为内存地址改变了
           config.appkey = 1 //不报错   
  三、import导入的时候路径只能是相对路径

==============
= 2018/10/19 =
============== 
  一、在classic.js中获得的数据给到index.js中
      1.在index.js中只能修改properties（组件）中的属性，data中的不可以（私有的）

  二、自定义组件中properties属性 关系
      properties: {
        like:{
          type:Boolean,
        },
        count:{
        type:Number
        }
      },
     在使用是：<m-like like="{{}}" count="{{}}" />

  三、赋值<m-like like="{{m_classic.like_status}}" count="{{m_classic.fav_nums}}" />

      1.m_classic是与js中setData中自定义名字相对应
  四、自定义事件
    1.激活   事件
      let behavior = this.properties.like?'like':'cancel'     //判断是点赞还是撤销
      this.triggerEvent('like',{},{})     //激活自定义事件   第一个参数：事件名称   后两个为JavaScript对象  第二个参数可以自定义  第三个不可以
      (第二个参数是设置detail属性的，可在调试中查看)
  
  8-7-完
         


