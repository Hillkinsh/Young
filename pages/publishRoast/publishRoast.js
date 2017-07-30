let util = require('../../utils/util.js')
let Bmob = require("../../utils/bmob.js")
let app = getApp()
let tempPicture = []

Page({
  data: {
    tip: '',
    userName: '',
    psw: '',
    height: 20,
    focus: false,
    picPaths: [],

  },

  formReset: function () {
    this.setData({
      tip: '',
      userName: '',
      psw: '',
      picPaths:[]
    })
  },

  //抽屉函数
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
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
            console.log('res.url()')
            console.log(res.url())

            
        tempPicture.push({url:res.url()})
        console.log(tempPicture)
           
          }, function (error) {
            console.log(error)
          })
        }


        let temp = _this.data.picPaths;
        temp.push({ url: res.tempFilePaths[0] });
        console.log(res);
        _this.setData({
          picPaths: temp,
          logo: res.tempFilePaths[0]
        })
        console.log('_this.data.picPaths')
        console.log(_this.data.picPaths)
      }
    })
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },

  //表单提交
  bindFormSubmit: function (e) {
    let formData = {//都是发布的数据
      rid: util.getUserID(),//吐槽ID
      is_anony:false,
      anonAvatar:'', //匿名头像
      flowerName:'',//匿名者花名
      content: e.detail.value.textarea,//吐槽内容
      picture: tempPicture,//吐槽配图。图示数组
      time: util.timeNow(),//吐槽发布时间
      like_count: 0,
      likeArray: [],//只保存userID就好。{userID:'111222333'}
      commentArray:[  
        {   //评论列表
          userID: '1223442',
          nickName: '',
          avatar: '',
          comment_content: 'ewfewfwefe'
        }, {
          userID: '1223443',
          nickName: '',
          avatar: '',
          comment_content: 'ewfewfwefe'
        }
      ],
      comment_count: 0,
      userID: app.globalData.accountInfo.userID,
      avatar: app.globalData.accountInfo.avatar,
      nickName: app.globalData.accountInfo.nickName,
      university: app.globalData.accountInfo.university,
      
    }
    // e.detail.value.pictureUrl=this.data.picPaths;
    console.log(formData)

    wx.request({
      url: 'https://zaodong.club/zaodong/roastInfo_saveRoastInfo.action',  //这个链接要换
      data: formData,
      method: 'post',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('POST success!!')
        let temp = res.data.success
        console.log(temp) //这里查看结果输出
        if(temp) {
          wx.switchTab({
            url: '../roast/roast',//TODO:这里要实现跳转后的页面有自己刚刚push的吐槽。
          })
        }

      },
      fail: function () {
        console.log('POST failed!!')
      }
    })

  },

  // 预览图片
  onPreviewImage: function (ev) {
    let current = ev.currentTarget.dataset.current;
    let urls = ev.currentTarget.dataset.urls;//是一个对象，对象里有一个 url属性
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [urls.url] // 需要预览的图片http链接列表
    });
  },

  //TODO:不想要的图片应该给机会删掉。
})