import { HTTP } from '../util/http.js'

class ClassicModel extends HTTP{
  //获取最新一期的方法
  getLatest(sCallabck){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallabck(res)
      }
    })
  }
  //获取上一期的方法，index是当前期数
  getPrevious(index, sCallback){
    this.request({
      url:'classic/' + index + '/previous',
      success:(res) => {
        sCallback(res)
      }
    })
  }
}

export{ClassicModel}