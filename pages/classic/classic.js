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
    latest:true,
    firsr:false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //ES6模板字符串
    // let a = 123
    // console.log(`${a}456`)

    //获取最新一期的数据
     //classic.getLatest() 是异步函数 无法写成let latest = classic.getLatest()
    classicModel.getLatest((res)=>{
      // console.log(res)
      //数据更新
      this.setData({
        // ...res  //...是扩展运算符 （相当于把res展开了，在wxml网页调用时不用m_classic.属性）
        m_classic:res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
      // latestClassic LatestIndex (最新期刊)     ****     current  currenIndex
    })  
  },

  //点赞处理
  onLike:function(event){
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior,this.data.m_classic.id,this.data.m_classic.type)
  },

  //查看下一期
  onNext:function(event){
    this._updateClassic('next')
  },

  //查看上一期
  onPrevious: function (event) {
    this._updateClassic('previous')
  },

  //获取 上/下 一期的内容
  _updateClassic: function (nextOrPrevious){
    const index = this.data.m_classic.index
    classicModel.getClassic(index,nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type)  //更新点赞
      this.setData({
        m_classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  //更新点赞
  _getLikeStatus:function(artID,category){
    likeModel.getClassicLikeStatus(artID,category,
      (res)=>{
        this.setData({
          likeCount: res.fav_nums,
          likeStatus:res.like_status
        })
      })
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