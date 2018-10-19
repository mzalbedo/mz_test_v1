import {config} from '../config.js'

const tips = {
  1:'抱歉，出现了一个错误',
  1005:'aapkey无效，请前往官网申请',
  3000:'期刊不存在'
}

class HTTP{
  request(params){
    if(!params.method){
      params.method = "GET"
    }
    // url,data,method
      wx.request({
        url:config.api_base_url + params.url,
        method:params.method,
        data:params.data,
        header:{
          'content-type':'application/json',
          'appkey':config.appkey
        },
        success:(res)=>{
          // startsWith
          // endsWith
          let code = res.statusCode.toString()  //statusCode获取http的状态码
          if(code.startsWith('2')){ //如果code是以2开头(成功)
            params.success && params.success(res.data)    //将结果放入到调用的回调函数(改：加了params.success && 当success为空时不执行后面函数)
          }
          else{ //服务器异常
            let error_code = res.data.error_code  //返回数据data中的错误码
            this._show_error(error_code)
            // wx.showToast({
            //   title: '服务器异常',
            //   icon:'none',
            //   duration:2000
            // })
          }
        },
        fail:(err)=>{ //API调用失败
          this._show_error(1)
        }
      })
  }

  _show_error(error_code){
    if(!error_code){
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }

}
export{HTTP}
