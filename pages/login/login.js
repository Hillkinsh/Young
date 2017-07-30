//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flag_error:false,
    errprMsg:''
  },
  onLoad: function () {

  },
  //表单提交。TODO:后面还应有密码错误的情况和用户名不存在的情况。
  bindFormSubmit: function (e) {
    
    let inputData=e.detail.value
    console.log(inputData)
    if(inputData.user==''){
      this.setData({
        flag_error:true,
        errprMsg:'账户名不能为空'
      })
    }else if(inputData.password==''){
      this.setData({
        flag_error:true,
        errprMsg:'密码不能为空'
      })
    }else{
      let formData = {//都是发布的数据
      user: e.detail.value.user,
      pass: e.detail.value.password,
    }
    //TODO:添加登录功能
    wx.switchTab({
      url: '../index/index'
    });
    }
  },
  // 跳到详情页
  onForget: function (ev) {
    let detail = ev.currentTarget.dataset.detail;//本条数据内容。
    // console.log(ev.currentTarget.dataset.detail);
    console.log(ev);
    // app.setGlobalData({
    //   detail: detail
    // });
    // let uid = detail.uid;
    wx.navigateTo({
      url: '../forgetPass/forgetPass'
    });
  },
  // 跳到详情页
  onRegister: function (ev) {
    let detail = ev.currentTarget.dataset.detail;//本条数据内容。
    console.log(ev);
    wx.navigateTo({//这个其实可以跳转，只是因为他在tab上，所以不显示。
      url: '../register/register'
    });
  },

  inputChange:function(){
    this.setData({
      flag_error:false
    })
  }

})
