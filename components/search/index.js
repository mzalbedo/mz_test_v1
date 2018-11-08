import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer: '_load_more'  //_load_more为自定义函数
      // observer: 属性发生变化是触发
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    dataArray:[],
    searching:false,
    q:'',  //要搜索的数据
    loading:false
  },

  attached(){ //组件初始化是调用的函数
    // const historyWords = keywordModel.getHistory()
    // const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _load_more(){   //所搜数据触底时被调用
      // console.log(123321)
      if(!this.data.q){
        return
      }
      if(this.data.loading){
        return
      }
      const length = this.data.dataArray.length   //已经从服务器取了多少条数据
      this.data.loading = true      //加锁  防止因为快速下拉获取重复数据
      bookModel.search(length,this.data.q).then(res=>{
        this.data.dataArray   //之前已经取到的数据
        res.books    //新请求到的数据
        const tempArray = this.data.dataArray.concat(res.books)  //合并
        this.setData({
          dataArray:tempArray,
          loading:false   //解锁
        })
      })
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event){
      this.setData({
        searching:false
      })
    },

    onConfirm(event) {    //传入搜索记录
    console.log(event)
      this.setData({      //当用敲击回车后切换到搜索页面
        searching:true
      })
      const q = event.detail.value || event.detail.text  //拿到用户输入的搜索数据 或者 用户点击标签
      bookModel.search(0,q).then(res=>{
        this.setData({
          dataArray:res.books,
          q:q
        })
        keywordModel.addToHistory(q)   //将搜索数据记录写入缓存
      })
    },


  }
})