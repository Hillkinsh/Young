let that
let app = getApp()
let util = require('../../utils/util.js')
let Bmob = require("../../utils/bmob.js");
let eventPic = [] //保存网上返回的图片地址。
Page({
  data: {
    flag: true,
    show: '学习',
    deadlineDate: '05月20日',
    deadlineTime: '12:00',
    eventDate:'',
    eventTime:'',
    index: 0,

    flag_error:false,
    info_title:'title',
    info_spot:'spot',
    info_num:'num',
    flag_title:true,
    flag_spot:true,
    flag_num:true,
    title: '',// 活动标题
    eventSpot:'',
    requireNum:'',
    
    eventDateUp: '',
    type: '学习',

    items: [
      { name: '学习', value: '学习', checked: 'true' },
      { name: '玩耍', value: '玩耍' },
      { name: '约饭', value: '约饭' },
    ],
    tip: '',
    userName: '',
    psw: '',
    height: 20,
    focus: false,
    picPaths: [],
    
  },

  //模态框出现
  showModal: function () {
    this.setData({ flag: false })
  },
  //模态框隐藏
  hiddenModal: function () {
    this.setData({ flag: true })
  },

  //显示模态框
    show: function (e) {
    console.log(e);
    let mid=e.currentTarget.dataset.mid
    switch (mid){
      case 'title':this.setData({ flag_title: false,flag_error:false});break;
      case 'spot' :this.setData({ flag_spot: false,flag_error:false});break;
      case 'num' :this.setData({ flag_num: false,flag_error:false});break;
    }
  },
  hidden: function (e) {
    let mid=e.currentTarget.dataset.mid
    switch (mid){
      case 'title':this.setData({ flag_title: true});break;
      case 'spot' :this.setData({ flag_spot: true});break;
      case 'num' :this.setData({ flag_num: true});break;
    }
  },

  change:function(e){
    let temp=e.detail.value;
    let mid = e.currentTarget.dataset.mid
    switch (mid){
      case 'title' :this.setData({title:temp});break;
      case 'spot' :this.setData({eventSpot:temp});break;
      case 'num' :this.setData({requireNum:temp});break;
    }

  },
  ensure:function (e) {
    let temp=e.detail.value;
    let mid = e.currentTarget.dataset.mid
    switch (mid){
      case 'title':this.setData({ flag_title: true});break;
      case 'spot' :this.setData({ flag_spot: true});break;
      case 'num' :this.setData({ flag_num: true});break;
    }
  },

  listenerRadio: function (e) {
    this.setData({
      type: e.detail.value,
      show: e.detail.value,
      flag: true
    })
    console.log('type+ ' + this.data.type)
  },

  deadlineDateChange: function (e) {

    let temp = e.detail.value;
    let dateArray = temp.split('-');
    let tempStr = dateArray.join('/')
    if (dateArray[0] == '2017') {
      this.setData({
        deadlineDate: dateArray[1] + '月' + dateArray[2] + '日 ',
        eventDate: tempStr
      })
    } else {
      this.setData({
        deadlineDate: dateArray[0] + '年' + dateArray[1] + '月' + dateArray[2] + '日 ',
        eventDate: tempStr
      })
    }
  },

  deadlineTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      deadlineTime: e.detail.value,
      eventTime: e.detail.value
    })
  },

  //抽屉函数
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#656565",//f7982a
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },

  //选择是拍照还是本地图片
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length) {
          let time = Date.parse(new Date());
          let name = time.toString() + '.png';
          let file = new Bmob.File(name, tempFilePaths)//图片上传，获取图片地址
          file.save().then(function (res) {
            eventPic.push(res.url())
          }, function (error) {
            console.log(error)
          })
        }

        let temp = _this.data.picPaths;
        temp.push( res.tempFilePaths[0]);
        _this.setData({
          picPaths: temp,
          logo: res.tempFilePaths[0]
        })
      }
    })
  },


  //表单提交
  bindFormSubmit: function (e) {
    let accountInfo = app.globalData.accountInfo
    
    let formData = {//都是发布的数据
      content: e.detail.value.content,
      deadline: this.data.deadlineDate + this.data.deadlineTime, 
      eid: util.getUserID(),//活动ID
      eventSpot: this.data.eventSpot,
      eventTime: this.data.eventDate +'/'+ this.data.eventTime,//TODO:后台使用用那个来判断的时间数据
      joinerInfo:[
        {
          nickName: accountInfo.nickName,
          avatar: accountInfo.avatar,
          userID: accountInfo.userID 
        }
      ],
      joinNum:1,
      picture: eventPic,
      requireNum: this.data.requireNum,
      title: this.data.title,
      type: this.data.type||'学习',
      user: [{//这个该取全局的个人登陆数据。
        nickName: accountInfo.nickName,
          avatar: accountInfo.avatar,
          userID: accountInfo.userID 
      }],
      time: util.timeNow(),//当前时间
      state:'正在集结',
      isJoin:true
     
    }
    if(formData.picture.length == 0){
      console.log(formData.picture)
      switch (formData.type){
        case '学习' : formData.picture.push('http://bmob-cdn-11557.b0.upaiyun.com/2017/06/27/695d01aa40dc4882804dff38f0a7dc1d.png');break;
        case '玩耍' : formData.picture.push('http://bmob-cdn-11557.b0.upaiyun.com/2017/06/27/af03424a4043dbcb80a89a3d1dfd8162.png');break;
        case '约饭' : formData.picture.push('http://bmob-cdn-11557.b0.upaiyun.com/2017/06/27/efbef36040ddd67280229c83d7a35da3.png');break;
      }  
    }
    if( formData.title != ''&& formData.eventSpot != '' &&formData.requireNum != '') {
       console.log(formData)
       //TODO: 1,发布活动成功，跳转到活动列表页面
       //2,数据更新到数据库

       let that = this
      wx.request({
        url: 'https://zaodong.club/zaodong/eventInfo_eventPublish.action',
        data: formData,
        method: 'post',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('POST success!!!!!!')
          console.log(res)
          let temp = res
          if (temp) {
            console.log('活动发布成功！！！')
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
          url: '../event/event',
        });
    } else {
      this.setData({
        flag_error: true
      })
    }
    
  },

  // 预览图片
  onPreviewImage: function (ev) {
    let current = ev.currentTarget.dataset.current;
    let urls = ev.currentTarget.dataset.urls;//是一个对象，对象里有一个 url属性
    console.log('urls!!!')
    console.log(urls)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [urls] // 需要预览的图片http链接列表
    });
  },

  //TODO:不想要的图片应该给机会删掉。
})