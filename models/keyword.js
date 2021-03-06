import { HTTP } from '../util/http-p.js'

class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }
  
  getHot(){
    return this.request({
      url: '/book/hot_keyword'
    }) 
  }

  addToHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    // 队列
    if(!has){
      //先检查数组长度 ，如果大于规定长度，先删除末尾元素，在在数组首地址添加
      const length = words.length
      if(length >= this.maxLength){
        words.pop()
      }
      words.unshift(keyword)  //放到数组第一位
      wx.setStorageSync(this.key, words)
    }
  }

}

export {KeywordModel}