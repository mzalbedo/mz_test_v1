import { HTTP } from '../util/http.js'

class LikeModel extends HTTP{
  like(behavior,artID,category){    //点赞状态     点赞id   点赞内容
    let url = behavior=='like'?'like':'like/cancel'
    this.request({
      url:url,
      method:'POST',
      data:{
        art_id:artID,
        type:category
      }
    })
  }
  //获取点赞状态
  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }

}



export { LikeModel }