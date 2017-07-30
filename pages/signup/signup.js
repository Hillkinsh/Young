var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    avatar: '../../images/doge.jpg',
    showTopTips: false,
    errorMsg: "",
    actionSheetHidden: true, // 是否显示底部可选菜单  
    actionSheetItems: [
      { bindtap: 'changeImage', txt: '修改头像' },
      { bindtap: 'viewImage', txt: '查看头像' }
    ] // 底部可选菜单  
  },

  formSubmit: function (e) {
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用  
    var account = e.detail.value.account;
    var password = e.detail.value.password;
    var subPassword = e.detail.value.subPassword;
    var that = this;
    // 判断账号是否为空和判断该账号名是否被注册  
    if ("" == util.trim(account)) {
      util.isError("账号不能为空", that);
      return;
    } else {
      util.clearError(that);
      util.req('/register/checkLoginName', {
        "loginName": account
      }, function (res) {
        if (!res) {
          util.isError("账号已经被注册过", that);
          return;
        }
      });
    }
    // 判断密码是否为空  
    if ("" == util.trim(password)) {
      util.isError("密码不能为空", that);
      return;
    } else {
      util.clearError(that);
    }
    // 两个密码必须一致  
    if (subPassword != password) {
      util.isError("输入密码不一致", that);
      return;
    } else {
      util.clearError(that);
    }
    // 验证都通过了执行注册方法  
    util.req('/itdragon/register', {
      "account": account,
      "password": password
    }, function (res) {
      if (true == res) {
        // 显示模态弹窗  
        wx.showModal({
          title: '注册状态',
          content: '注册成功，请点击确定登录吧',
          success: function (res) {
            if (res.confirm) {
              // 点击确定后跳转登录页面并关闭当前页面  
              wx.redirectTo({
                url: '../login/login?account=' + account + '&password?=' + password + ''
              })
            }
          }
        })
      } else {
        // 显示消息提示框  
        wx.showToast({
          title: '注册失败',
          icon: 'error',
          duration: 2000
        })
      }
    });
  },

  //选择头像图片
  chooseAvatar: function () {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })

    // var _this = this;
    // wx.chooseImage({
    //   count: 1, // 默认9  
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
    //     console.log(res.tempFilePaths[0]);
    //     var temp = res.tempFilePaths[0];
    //     // console.log(temp);
    //     // temp.push({ url: res.tempFilePaths[0] });
    //     // console.log(temp);
    //     // console.log(_this.data.tempFilePaths);
    //     _this.setData({
    //       avatar: temp
    //     })
    //   }
    // })
  },
  changeImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片，只有一张图片获取下标为0  
        var tempFilePaths = res.tempFilePaths[0];
        console.log(tempFilePaths);
        that.setData({
          avatar: tempFilePaths,
          actionSheetHidden: !that.data.actionSheetHidden
        })
        // util.uploadFile('/itdragon/uploadImage', tempFilePaths, 'imgFile', {}, function (res) {
        //   console.log(res);
        //   if (null != res) {
        //     that.setData({
        //       userImg: res
        //     })
        //   } else {
        //     // 显示消息提示框  
        //     wx.showToast({
        //       title: '上传失败',
        //       icon: 'error',
        //       duration: 2000
        //     })
        //   }
        // });
      }
    })
  },
  // 查看原图  
  viewImage: function () {
    var that = this;
    console.log(that.data.avatar);
    wx.previewImage({
      current: '', // 当前显示图片的http链接  
      urls: [that.data.avatar] // TODO:这里应该分配一张头像的原始图片。放在网上。
    })
  },
  // 点击其他区域 隐藏底部菜单  
  actionSheetbindchange: function () {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  }
})  