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

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    dataArray:[],
    searching:false,
    q:''
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
    }
  }
})