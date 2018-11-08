import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching:false,
    more:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookModel.getHotList()
      .then(res => {
        // console.log(res)
        this.setData({
          books: res
        })
      })

  },

  onSearchi(event){
    this.setData({
      searching:true
    })
  },

  cancel(event){
    this.setData({
      searching: false
    })
  },

  onReachBottom() { //页面下拉到低端是触发
    // console.log(123)
    this.setData({
      more:random(16) //生成16为随机数
    })
  }

})