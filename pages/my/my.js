// import {
//   ClassicModel
// } from '../../models/classic.js'
// import {
//   BookModel
// } from '../../models/book.js'

// import {
//   promisic
// } from '../../util/common.js'

// const classicModel = new ClassicModel()
// const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    // wx.getUserInfo({  //用户授权之后才可以获取到数据
    //   success:data=>{
    //     console.log(data)
    //   }
    // })
  },

  userAuthorized(){
    wx.getSetting({ //查看是否已授权
      success:data=>{
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({  
           success:data=>{
             console.log(data)
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
    console.log(userInfo)
  }

})