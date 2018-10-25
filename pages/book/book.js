// pages/book/book.js
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
    // Promise 第一步 new一个Promise
    // 异步代码 写在  Promise的函数中 第二步
    const promise = new Promise((resolve, reject) => {
      //Promise的三种状态
      //pending  fulfilled   rejected
      //进行中    已成功       以失败
      wx.getSystemInfo({
        success: res => resolve(res),
        fail: Error => reject(error)
      })
    })
      promise.then(
        res => console.log(res),
        error => console.log(error)
      )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})