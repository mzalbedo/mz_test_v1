import {config} from '../config.js'

const tips = {
  1:'抱歉，出现了一个错误',
  1005:'aapkey无效，请前往官网申请',
  3000:'期刊不存在',
}

class HTTP{
  request({url, data = {}, method = 'GET'}){
    return new Promise((resolve,reject)=>{
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {  //这里resolve 和 reject不可以写在data和method这也赋默认值的后面（原则）
    // url,data,method

      wx.request({
        url:config.api_base_url + url,
        method:method,
        data:data,
        header:{
          'content-type':'application/json',
          'appkey':config.appkey
        },
        success:(res)=>{
          // startsWith
          // endsWith
          const code = res.statusCode.toString()  //statusCode获取http的状态码
          if(code.startsWith('2')){ //如果code是以2开头(成功)
            resolve(res.data)   
          }
          else{ //服务器异常
            reject()
            const error_code = res.data.error_code  //返回数据data中的错误码
            this._show_error(error_code)
            // wx.showToast({
            //   title: '服务器异常',
            //   icon:'none',
            //   duration:2000
            // })
          }
        },
        fail:(err)=>{ //API调用失败
          reject()
          this._show_error(1)
        }
      })
  }

  _show_error(error_code){
    if(!error_code){
      error_code = 1;
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export{HTTP}
