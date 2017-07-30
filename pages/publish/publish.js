
let util = require('../../utils/util.js')
Page({
  data: {

  },

  roast:function () {
    wx.navigateTo({
      url: '../publishRoast/publishRoast'
    });
  },

  anonRoast: function () {
    wx.navigateTo({
      url: '../publishAnonym/publishAnonym'
    });
  },

  event: function () {
    wx.navigateTo({
      url: '../publishEvent/publishEvent'
    });
  },
})