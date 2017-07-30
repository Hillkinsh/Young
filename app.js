//app.js
var Bmob = require("utils/bmob.js");
var common = require("utils/common.js");
Bmob.initialize("d8018ba83020bcc9224aa2b7fc3794f3", "8058620170bc13fb230f0ab5fdea0491");

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //  wx.redirectTo({
      //           url: '/pages/login/login',
      //           success: function(res){
      //             // success
      //             console.log(res)
      //           },
      //           fail: function(res) {
      //             // fail
      //           },
      //           complete: function(res) {
      //             // complete
      //           }
      //         })
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          })
        }
      });
    }
  },

  globalData: {
    userInfo: null,
    commentHidden:true,//是否隐藏吐槽详细页的评论框。
    accountInfo:{
      userID:123456789000,
      avatar:'http://bmob-cdn-11557.b0.upaiyun.com/2017/07/30/bd1c207f4009832680b43f6d9b89a749.png',
      account:'11011011001',
      nickName:'瑞秋·格林',
      pass:'xiaoming',
      sex:'女',
      birthday:'1999/12/02',
      university:'MIT',
      school:'商学院',
      wechat:'Tink',
      QQ:'往事如风',
      pictureArray: [
        'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png',
        'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png',
        'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png',
        'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png',
        'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png',
      ],//其它图片地址
      eatArray: ['金香鲍','汉巴烤肉','苹果派','烤串'],
      sportArray: ['吹唢呐','吻别','百鸟朝凤'],
      watchArray: ['霸王别姬','教父','肖申克的救赎','friends'],
      listenArray: ['古典'],
      playArray: ['跑步','爬山'],
    }
  },
  setGlobalData: function (obj) {
    for (var n in obj) {
      this.globalData[n] = obj[n];
    }
  },
  debug: true
})