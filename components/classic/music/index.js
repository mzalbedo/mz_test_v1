import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()   //音乐管理对象


Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],

  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc:'images/player@pause.png',
    playSrc:'images/player@play.png'
  },

  attached(event) {   //
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached: function (event) {   //在组件实例被从页面节点树移除时执行。
    // mMgr.pause()    //暂停
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(even){
      //图片切换
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src    //播放
      }
      else{
        this.setData({
          playing: false
        })
        mMgr.pause()    //暂停
      }
    },

    //判断音乐图片的显示  (恢复状态)
     _recoverStatus: function () {
      if (mMgr.paused) {  //当前全局没有任何音乐播放
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    //音乐总控开关与界面的关联
    _monitorSwitch:function(){  
      mMgr.onPlay(()=>{ //播放
        this._recoverStatus()
      })
      mMgr.onPause(()=>{  //暂停
        this._recoverStatus()
      })
      mMgr.onStop(() => { //关闭总控开关
        this._recoverStatus()
      })
      mMgr.onEnded(() => {  //自然播放完毕
        this._recoverStatus()
      })
    }

  },
})
