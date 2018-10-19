import { HTTP } from '../util/http.js'

class ClassicModel extends HTTP{
  getLatest(sCallabck){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallabck(res)
      }
    })
  }
}

export{ClassicModel}