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
  //表单提交
  bindFormSubmit: function (e) {
    console.log(e)
    let formData = {//都是发布的数据
      account: e.detail.value.account,
      pass: e.detail.value.password
      // passEnsure:e.detail.value.passEnsure
    }
    if(formData.account==""){
      this.setData({
        flag_error:true,
        errprMsg:'帐号不能为空!'
      })
    }else if(formData.pass==''){
      this.setData({
        flag_error:true,
        errprMsg:'密码未填写！'
      })
    } else if (formData.pass != e.detail.value.passEnsure){
      this.setData({
        flag_error:true,
        errprMsg:'密码输入不一致！'
      })
    } else {
      console.log(formData)
      var that = this;
      wx.request({
        url: 'https://zaodong.club/zaodong/accountInfo_register.action',
        data: formData,
        method:'post',
        header: { 'Content-Type':'application/json'},
        success:function(res){
            console.log('POST success!!')
            let temp = res.data.success
            console.log('temp')
            console.log(res)
            if (temp) {
              for (let key in formData) {  //如果新注册，则把个人信息保存到全局数据中。把信息存入缓存。
                app.globalData.accountInfo[key] = formData[key];
              }

              wx.setStorageSync('account', formData.account)
              wx.setStorageSync('pass', formData.pass)
              console.log('存入成功！！')
              
              wx.navigateTo({
                url: '../register-next/register-next'
              });
            } else {
              console.log('该账户已被注册！')
              that.setData({
                flag_error: true,
                errprMsg: '该账户已被注册！'
              })
            }

        },
        fail:function(){
          console.log('POST failed!!')
        }
    })

    //TODO:再判断是否是重名的，是，再来。不是，保存并跳转。

    }
  },

  inputChange:function(){
    this.setData({
      flag_error:false
    })
  },

  onLogin:function(){
     wx.navigateTo({
      url: '../login/login'
    });
  }

})
