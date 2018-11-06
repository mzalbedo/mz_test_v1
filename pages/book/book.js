import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching:false
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
  }
 
})