import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

import {
  promisic
} from '../../util/common.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    bookCount:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized() 
    this.getMyBookCount()
    this.getMyFavor()
    // wx.getUserInfo({  //用户授权之后才可以获取到数据
    //   success:data=>{
    //     console.log(data)
    //   }
    // })
  },


  getMyFavor() {  //获取收藏数据
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  userAuthorized1() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },

  userAuthorized(){
    wx.getSetting({ //查看是否已授权
      success:data=>{
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({  
           success:data=>{
              this.setData({
                authorized:true,
                userInfo:data.userInfo
              })
            }
          })
        }
        else{
          console.log('err')
        }
      }
    })
  },

  onGetUserInfo(event){ 
    const userInfo = event.detail.userInfo
    if (userInfo){  //解决用户点击取消授权时写入空数据二报错
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {  
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {  
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  onJumpToDetail(event) { //在我的收藏中打开书籍
    // console.log(event)
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  }

})