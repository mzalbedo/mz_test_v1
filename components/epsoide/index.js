// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number,
      observer:function(newVal,oldVal,changedPath){  //observer函数当属性值发生改变时,小程序会调用observe
        let val = newVal <10?'0'+newVal:newVal
        this.setData({
          _index:val
        })
      }
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    year:0,
    month:'',
    _index:''
  },


  attached:function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() //month获取到的值 比真实月份少一 
    
    this.setData({
      year:year,
      month:this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
