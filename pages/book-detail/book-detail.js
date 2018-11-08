import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading()  //加载loading
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    // 行的Promise 合体   在全部运行完后再执行then回调，时间取决于最长的时间
    //race 竞争   当任意一个完成后  就进行回调
    Promise.all([detail,comments,likeStatus])
    .then(res=>{
      // console.log(res)
      this.setData({
        book:res[0],
        comments:res[1].comments,
        likeStatus:res[2].like_status,
        likeCount:res[2].fav_nums
      })
      wx.hideLoading()
    })


    // //从detail中把数据取出来，并存到data中
    // detail.then(res => {
    //   // console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })

    // comments.then(res => {
    //   // console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    // likeStatus.then(res => {
    //   // console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },

  onLike: function(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)  //400代表书籍
  },

  onFakePost:function(event){
    this.setData({
      posting:true
    })
  },

  onCancel:function(event){
    this.setData({
      posting: false
    })
  },

  onPost(event){    
    // const comment = event.detail.text         //用户选择的短评
    // const commentInput = event.detail.value   //获取用户在input中输入的短评
    const comment = event.detail.text || event.detail.value

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: "none"
        })

        this.data.comments.unshift({   //添加到数组的首位 unshift是内置的
          content: comment,
          nums: 1
        })

        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  },
})