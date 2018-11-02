Mz_Dawn

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
  
==============
= 2018/10/20 =
============== 
  一、数据初始化注意事项
      （组件属性）properties: {index:Number}  和 data: {year:Number,month:String} 中的区别
      1.在输出显示是index:0    year:f Number()  month:f String()     ps:f表示函数
      2.不能再data中直接赋值 例如：year:Number,month:String  应该改为：year:0,month:''
      3.properties 和 data中不要定义相同名称的变量，不然会产生覆盖现象，properties中的变量会覆盖data中的变量
  二、observer:function(){}
     1.observer函数当属性值发生改变时,小程序会调用observe函数
     2.observer:function(newVal,oldVal,changedPath){
       newVal:改变后的值
       oldVal:改变前的值
       changedPath:路径
     }
     3.重点：千万不要在observe中修改自身属性值，有可能引起无限递归


第八章 结束
==============
= 2018/10/21 =
============== 

     休息 Mz_Dawn

==============
= 2018/10/22 =
============== 
  一、组件中的继承  behavior（行为）
      1.定义
        let classicBeh = Behavior({
          properties: {
            img: String,
            content: String
          },
        })
        export {classicBeh}
      2.导入
        import {classicBeh} from '../classic-beh.js'
      3.接收
         behaviors: [classicBeh],（支持多继承）
         ps：重名覆盖：behaviors: [b1,b2,b3] 如果b1，b2，b3中有同名属性，后者会覆盖前者，即b3中的属性会覆盖之前的
            当本函数中含有重名时会覆盖继承的属性
         ps：生命周期函数不会产生覆盖，会按顺序执行，最后执行子函数自己的声明周期函数

  9-7 完


==============
= 2018/10/23 =
============== 
  一、缓存
      1.wx.setStorageSync('latest', index)  //缓存  第一个参数自定义   第二个是缓存数据 （同步写入缓存）
      2.wx.setStorage('latest', index)  //缓存  第一个参数自定义   第二个是缓存数据 （异步写入缓存）
        (带有下划线的方法 表示他是私有的)

      3.wx.getStorageSync(key)  //缓存的读取

  10-2 完

==============
= 2018/10/24 =
============== 
  一、ES6 
    模板 字符串
     1. let a = 123
        console.log(`${a}456`)  //输出123456  {}里可是函数

    扩展运算符
      ...res  //...是扩展运算符 （相当于把res展开了，在wxml网页调用时不用m_classic.属性） 

  二、hidden 是不会触发 detached函数，但 wx:if可以触发
      1.detached生命周期函数:在组件实例被从页面节点树移除时执行。

  第十章  结束
  
==============
= 2018/10/25 =
============== 
  一、tabBar  
    "selectedColor": "#000000",     //选中后的颜色
    "backgroundColor": "#ffffff",   //底色
    "color": "#c7c7c7",             //未选中的颜色
  二、处理异步
    1.callback 回调函数， （纯粹的callback会产生回调地狱   它剥夺了函数的return能力）
    2.promise 多个异步等待合并  不需要层层传递callback
    3.async 和 await   是ES2017中的   现在小程序不支持
  三、Promise （是一个对象）
    1.对象是可以保存状态的  函数是不行的（闭包函数是可以的）
        // Promise 第一步 new一个Promise
        // 异步代码 写在  Promise的函数中 第二步
        const: promis = new Promise((resolve,reject)=>{
          //Promise的三种状态
          //pending  fulfilled   rejected   
          //进行中    已成功       以失败             （在第一步new Promise时 状态为pending）
          //状态的更改：  resolve是将pending改为fulfilled （已成功）
                         reject是将pending改为rejected（以失败）
          wx.getSystemInfo({
            success:(res)=> {
             resolve(res)       (当状态修改后Promise就会凝固，不会再改变状态)
            },
            fail:(Error)=>{
              reject(error)
            }
          })
        })
        //第三部  获取
         promise.then((res) => {  //成功
            console.log(res)
          }),
          (error)=>{              //失败（顺序不能改变）
            console.log(error)
          }

    11-4 完

==============
= 2018/10/26 =
============== 
  一、用{}括起来就相当于一个对象  详情见models中的book.js 和 util中http-p.js中

  二、Promise的正确用法
        //Promise的正确用法示例   book.js
    // bookModel.getHotList()
    //   .then(res => {
    //     console.log(res)
    //     return bookModel.getMyBookCount()
    //   })
    //   .then(res =>{
    //     console.log(res)
    //     return bookModel.getMyBookCount()
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
//==================================================================================
      //Promise的错误用法示例
    // const hotList = bookModel.getHotList()
    // hotList.then(
    //   res =>{
    //     console.log(res)
    //     bookModel.getMyBookCount()
    //     .then(res => {
    //       console.log(res)
    //       bookModel.getMyBookCount()
    //       .then(res => {
    //         console.log(res)
    //       })
    //     })
    //   }
    // )
//==================================================================================
    // // Promise 第一步 new一个Promise
    // // 异步代码 写在  Promise的函数中 第二步
    // const promise = new Promise((resolve, reject) => {
    //   //Promise的三种状态
    //   //pending  fulfilled   rejected
    //   //进行中    已成功       以失败
    //   wx.getSystemInfo({
    //     success: res => resolve(res),
    //     fail: Error => reject(error)
    //   })
    // })
    // promise.then(
    //   res => console.log(res),
    //   error => console.log(error)
    // )
    
    第十一章  结束

==============
= 2018/10/27 =
============== 

      休息 Mz_Dawn

==============
= 2018/10/28 =
============== 

     休息 Mz_Dawn

==============
= 2018/10/29 =
============== 

     休息 Mz_Dawn

==============
= 2018/10/30 =
============== 

     休息 Mz_Dawn

==============
= 2018/10/31 =
============== 
  一、wxml中循环（列表渲染）
    <block wx:for="{{books}}">
      <m-book book="{{item}}" />
    </block>
    block 不会显示  可以当做一个括号
    wx:for-item=" " 可以对默认的item改名
  二、页面接收参数
      1.组件接收参数是用properties
      2.页面接收用 (都在onLoad中的options中)
        onLoad: function (options) {
          const id = options.id
        },

  12-6 结束

==============
= 2018/11/01 =
============== 
  一、 slot   插槽  
      1.当接收到 值 或 者标 签时会显示，否则不会显示
      2.用法
        首先在 Component 中加入
        options:{
          multipleSlots:true
        }, 启用slot插槽

        之后在wxml中写入  <slot name="after"></slot> 插槽语句

        最后在其他页面中使用
        <m-tag text="{{item.content}}">
          <text slot="after">{{'+'+item.nums}}</text>   
        </m-tag>

  二、css子元素选择
         .comment-container>v-tag:nth-child(1)>view {
           background-color: #fffbdd;
          }

          .comment-container>v-tag:nth-child(2)>view {
              background-color: #eefbff;
          } 
          样式修改   （ 霸道  hack ）
        
  三、外部样式的传递（tag组件中）
        1.<!-- container普通样式、  tag-class外部样式  后面的样式不一定能成功覆盖前面的样式 -->
        2.解决方法
          .ex-tag1 {
            background-color: #fffbdd !important;       //!important 将强重要性 这样可以覆盖普通样式
          }
      
  第十二章  结束

==============
= 2018/11/02 =
============== 

  13-8  结束

==============
= 2018/11/03 =
============== 


==============
= 2018/11/04 =
============== 


==============
= 2018/11/05 =
============== 


==============
= 2018/11/06 =
============== 