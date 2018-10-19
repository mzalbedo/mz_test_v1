import {ClassicModel} from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m_classic:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //classic.getLatest() 是异步函数 无法写成let latest = classic.getLatest()
    classicModel.getLatest((res)=>{
      console.log(res)
      //数据更新
      this.setData({
        m_classic:res
      })
    })  
  },

  onLike:function(event){
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior,this.data.m_classic.id,this.data.m_classic.type)
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