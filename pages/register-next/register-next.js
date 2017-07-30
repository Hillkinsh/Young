var util = require('../../utils/util.js');
var app = getApp();

let that

Page({
  data: {
    errorMsg:'',

    flag_name:true,
    flag_sex:true,
    flag_university:true,
    flag_school:true,
    flag_wechat:true,
    flag_QQ:true,
    flag_error:false,

    info_name:'name',
    info_sex:'sex',
    info_university:'university',
    info_school:'school',
    info_wechat:'wechat',
    info_QQ:'QQ',
    
    index: 0,
    nickName: '未填写',
    sex: '未填写',
    birthday: '未填写',
    university:'未填写',
    school:'未填写',
    wechat:'未填写',
    QQ:'未填写',
     
    sexs: [
      { name: '男', value: '男'},
      { name: '女', value: '女' }
    ],
    universitys: [
      { name: '西安电子科技大学', value: '西安电子科技大学'},
      { name: '西安交通大学', value: '西安交通大学' },
      { name: '西北工业大学', value: '西北工业大学' },
      { name: '陕西师范大学', value: '陕西师范大学' },
      { name: '西北政法大学', value: '西北政法大学' },
      { name: '长安大学', value: '长安大学' },
      { name: '西安音乐学院', value: '西安音乐学院' }
    ],
     
  },
  
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  },

  show: function (e) {
    let mid=e.currentTarget.dataset.mid
    switch (mid){
      case 'name':this.setData({ flag_name: false,flag_error:false});break;
      case 'sex' :this.setData({ flag_sex: false,flag_error:false});break;
      case 'university' :this.setData({ flag_university: false,flag_error:false});break;
      case 'school' :this.setData({ flag_school: false,flag_error:false});break;
      case 'wechat' : this.setData({flag_wechat: false, flag_error:false});break;
      case 'QQ' : this .setData({flag_QQ : false, flag_error:false}); break;
    }
    
  },
  hidden: function (e) {
    let mid=e.currentTarget.dataset.mid
    switch (mid){
      case 'name':this.setData({ flag_name: true});break;
      case 'sex' :this.setData({ flag_sex: true});break;
      case 'university' :this.setData({ flag_university: true});break;
      case 'school' :this.setData({ flag_school: true});break;
      case 'wechat' :this.setData({ flag_wechat: true});break;
      case 'QQ' :this.setData({ flag_QQ: true});break;
    }
  },

    change:function(e){
    let temp=e.detail.value;
    let mid = e.currentTarget.dataset.mid
    switch (mid){
      case 'name' :this.setData({nickName:temp});break;
      case 'school' :this.setData({school:temp});break;
      case 'wechat' :this.setData({wechat:temp});break;
      case 'QQ' :this.setData({QQ:temp});break;
    }

  },
  ensure:function (e) {
    let temp=e.detail.value;
    let mid = e.currentTarget.dataset.mid
    switch (mid){
      case 'school' :this.setData({flag_school:true});break;
      case 'name' :this.setData({flag_name:true});break;
      case 'wechat' :this.setData({flag_wechat:true});break;
      case 'QQ' :this.setData({flag_QQ:true});break;
    }
  },

  //性别
  listenerRadio: function (e) {
    this.setData({
      sex: e.detail.value, flag_sex: true
    })
  },

  //生日
  birthday: function (e) {
    let temp = e.detail.value;
    let dateArray = temp.split('-');
      this.setData({
        flag_error:false,
        birthday: dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2],
      })
  },
  
  //学校
  listenerUniversity:function(e){
    this.setData({
      university: e.detail.value,
      flag_university: true
    })
  },
  //表单提交
  bindFormSubmit: function (e) {
    
    let formData = {//都是发布的数据
      userID: util.getUserID(),//个人id。
      account: app.globalData.accountInfo.account,

      nickName:this.data.nickName,
      sex: this.data.sex,
      university: this.data.university,
      school:this.data.school,
      birthday: this.data.birthday,
      wechat:this.data.wechat,
      QQ:this.data.QQ
    }
    if(formData.nickName=='未填写'||formData.sex=='未填写'
    ||formData.birthday=='未填写'||formData.university=='未填写'
    ||formData.school==''||formData.wechat=='未填写'
    ||formData.QQ=='未填写'){
      this.setData({
        flag_error:true,
        errorMsg:'有信息尚未完成填写！'
      })
    }else{//一切就绪，把数据传入全局对象：账户对象。 把数据存入缓存。
      console.log('formData')
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
            wx.navigateTo({
              url: '../register-last/register-last'
            });

            //缓存暂时放置区。↓↓↓↓↓
            wx.setStorageSync('userID', formData.userID)
            wx.setStorageSync('nickName', formData.nickName)
            wx.setStorageSync('sex', formData.sex)
            wx.setStorageSync('birthday', formData.birthday)
            wx.setStorageSync('university', formData.university)
            wx.setStorageSync('school', formData.school)
            wx.setStorageSync('wechat', formData.wechat)
            wx.setStorageSync('QQ', formData.QQ)
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

    }
  }

});  