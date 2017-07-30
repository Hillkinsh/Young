var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    avatar: "", 
    name: '',
    actionSheetHidden: true, // 是否显示底部可选菜单  
    actionSheetItems: [
      { bindtap: 'changeImage', txt: '修改头像' },
      { bindtap: 'viewImage', txt: '查看头像' }
    ] // 底部可选菜单  
  },
  // 初始化加载获取设备长宽  
  onLoad: function (options) {
    var that = this;
    let accountInfo=app.globalData.accountInfo
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          avatar:accountInfo.avatar,
          name:accountInfo.nickName
        })
      }
    });
  },

  onGoDetail:function () {
    wx.navigateTo({
     url: '../mine-data/mine-data',
    })
  },
  onGoRoast:function () {
    wx.navigateTo({
     url: '../mine-roast/mine-roast',
    })
  },
  onGoEvent:function () {
    wx.navigateTo({
     url: '../mine-event/mine-event',
    })
  },
  loginOut:function () {
    wx.showModal({
      title: '退出登录',
  content: '确定退出登录？',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
      wx.switchTab({
        url: '../index/index'
      })
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
    })
  }
});  