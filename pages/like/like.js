var that;
var app = getApp();
var util = require('../../utils/util');
let PIC1 = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/27/695d01aa40dc4882804dff38f0a7dc1d.png',
PIC2 = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/27/efbef36040ddd67280229c83d7a35da3.png',
PIC3 = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/26/2c2a633e403a53da80872fa972d64410.png',
PIC4 = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png'

Page({
  data: {
    data: [],
    pictureArray:[],
    swiper:[]
  },
  onLoad: function (options) {
    that = this;
  },
  onReady: function () {
    let data = app.globalData.detail
    this.data.swiper.push(data.avatar)
    for (let i = 0; i < data.picture.length; i++) {
      if (data.picture[i] != PIC1 && data.picture[i] != PIC2 && data.picture[i] != PIC3 && data.picture[i] != PIC4) {
        this.data.swiper.push(data.picture[i])
      }
    }
   
    that.setData({
      data: app.globalData.detail,
      swiper:this.data.swiper
    });
    
  }
  
})