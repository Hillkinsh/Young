let util = require('../../utils/util.js')
let Bmob = require("../../utils/bmob.js");

var app = getApp();
Page({
  data: {
    avatar:'',//头像
    avatarUrl:'',//上传到数据库的头像图片。
    nickName:'',
    sex:'',
    sex_color:'',
    age:'',
    constel:'',
    constel_color:'',
    university:'',
    school:'',
    flag_error:false
  },
  onLoad: function (options) {
    let dataInfo=app.globalData.accountInfo
    let data_sex,data_sex_color;
    if(dataInfo.sex == '男'){
      data_sex='♂';
      data_sex_color='#59D2FE'
    }else{
      data_sex='♀'
      data_sex_color='#FF91F3'
    }
    
    let ageconstel=util.constel(dataInfo.birthday)
    this.setData({
      nickName:dataInfo.nickName,
      university:dataInfo.university,
      school:dataInfo.school,
      sex:data_sex,
      sex_color:data_sex_color,
      age:ageconstel[0],
      constel:ageconstel[1],
      constel_color:ageconstel[2],
      avatar:dataInfo.avatar
    })
  },

 changeImg:function(){
  let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length) {
          let time = Date.parse(new Date());
          let name = time.toString() + '.png';
          let file = new Bmob.File(name, tempFilePaths)//图片上传，获取图片地址
          file.save().then(function (res) {
            console.log('res.url()')
            console.log(res.url())

            //加入缓存
            wx.setStorageSync('avatar', res.url())
             console.log('缓存成功')
            _this.setData({
              avatarUrl: res.url()
            })
          }, function (error) {
            console.log(error)
          })
        }


        //  console.log(res.tempFilePaths[0]);
         _this.setData({//这么设置理应没有问题，首先拿该图片当头像，反映快，然后把链接头像上传数据库。
          avatar:res.tempFilePaths[0],
          flag_error:false
         })
      }
    })
},

finishAll:function(){//加一个延时操作
  let avatar = this.data.avatar
  if (avatar != 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/5f4c96d8407eabac804f91c7bdb5f33d.png'){
    //TODO:在这时候要把默认头像改掉。
    //这个修改有没有类似于setData({})一类的用法
    //这里还应有数据上传
    app.globalData.accountInfo.avatar = this.data.avatarUrl;//保存到全局
    let formData = {
      account: app.globalData.accountInfo.account,
      avatar:this.data.avatarUrl
    }
    console.log(formData)
    
    let that = this
      wx.request({
        url: 'https://zaodong.club/zaodong/accountInfo_acquireInfo.action',
        data: formData,
        method: 'post',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('POST success!!!!!!')
          console.log(res)
          let temp = res
          if (temp) {
            for (let key in formData) {  //则把个人信息保存到全局数据中
              app.globalData.accountInfo[key] = formData[key];
            }
            //缓存暂时放置区。↓↓↓↓↓
            wx.setStorageSync('avatar', formData.avatar)
            console.log('详细数据缓存成功')
            //缓存暂时存放区域。↑↑↑↑↑
          } else {
            console.log('信息保存失败')
            that.setData({
              flag_error: true,
              errorMsg: '信息保存失败'
            })
          }

        },
        fail: function () {
          console.log('POST failed!!')
        }
      })

   wx.switchTab  ({
      url: '../index/index',
    });
  }else{
    this.setData({
      flag_error:true
    })
  }
  
},

delayFinish:function () {
  let that = this
  setTimeout(that.finishAll,300)
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})