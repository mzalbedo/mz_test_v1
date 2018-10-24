import { HTTP } from '../util/http.js'

class ClassicModel extends HTTP{
  //获取最新一期的方法
  getLatest(sCallabck){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallabck(res)
        this._setLatestIndex(res.index) //将当前（最新）期刊号写入缓存
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  //获取 上/下 一期的方法，index是当前期数
  getClassic(index,nextOrPrevious, sCallback){
    //判断要查找的期刊所对应的key
    let key = nextOrPrevious == 'next' ? 
        this._getKey(index+1) : this._getKey(index-1)
    //从缓存中读取
    let classic = wx.getStorageSync(key)
    //如果缓存中没有
    if(!classic){
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,    //模板字符串
        success: (res) => {
          //将数据写入缓存
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }

    //如果缓存中存在数据
    else{
      sCallback(classic)
    }
  }


  //判断是否是第一期
  isFirst(index){
    return index == 1 ? true : false  
  }
  //判断是否是最新一期
  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }
  //将最新的期刊号写入缓存
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)  //缓存  第一个参数自定义   第二个是缓存数据 （同步写入缓存）
  }
  //读取缓存
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index){
    let key = 'classic-' + index
    return key
  }

}

export{ClassicModel}