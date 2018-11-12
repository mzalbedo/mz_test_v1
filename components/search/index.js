import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */

  behaviors: [paginationBev], //使用behaviors 
  properties: {
    more: {
      type: String,
      observer: 'loadMore' //_load_more为自定义函数
      // observer: 属性发生变化是触发
    }
  },

  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '', //要搜索的数据
    loading: false,
    loadingCenter:false
  },

  attached() { //组件初始化是调用的函数
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
    loadMore() { //所搜数据触底时被调用
      // console.log(123321)
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      // const length = this.data.dataArray.length   //已经从服务器取了多少条数据
      if (this.hasMore()) { //判断是否还有数据没有加载
        this.locked()    //加锁  防止因为快速下拉获取重复数据
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()  
          },()=>{     //这里是then回调失败时执行的（第二个参数）如果不在这里解锁 在请求失败时会造成死锁现象
            this.unLocked() 
          })
      }
    },

    onCancel(event) {   //取消按键
      this.initialize() 
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {   //点击搜索框的叉
      this.initialize() 
      this._closeResult()
    },

    onConfirm(event) { //传入搜索记录
      this._showResult()  //当用敲击回车后切换到搜索页面
      this._showLoadingCenter()   //加载动画
      // this.initialize()   
      const q = event.detail.value || event.detail.text //拿到用户输入的搜索数据 或者 用户点击标签
      this.setData({
        q: q
      })
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books) //传入behaviors
        this.setTotal(res.total)
        keywordModel.addToHistory(q) //将搜索数据记录写入缓存
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {   //当用敲击回车后切换到搜索页面
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        q:''
      })
    },
  }
})