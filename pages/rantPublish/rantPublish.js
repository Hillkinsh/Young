Page({
  data: {
    // text:"这是一个页面"
    tip: '',
    userName: '',
    psw: '',
    height: 20,
    focus: false,
    picPaths: [],

  },
  formBindsubmit: function (e) {
    if (e.detail.value.userName.length == 0 || e.detail.value.psw.length == 0) {
      this.setData({
        tip: '提示：用户名和密码不能为空！',
        userName: '',
        psw: ''
      })
    } else {
      this.setData({
        tip: '',
        userName: '用户名：' + e.detail.value.userName,
        psw: '密码：' + e.detail.value.psw
      })
    }
  },
  formReset: function () {
    this.setData({
      tip: '',
      userName: '',
      psw: ''
    })
  },

  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(res.tempFilePaths[0]);
        var temp = _this.data.picPaths;
        // console.log(temp);
        temp.push({ url: res.tempFilePaths[0] });
        // console.log(temp);
        // console.log(_this.data.tempFilePaths);
        _this.setData({
          picPaths: temp
        })
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
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
  },

  // 预览图片
  onPreviewImage: function (ev) {
    // console.log(ev);
    let current = ev.currentTarget.dataset.current;
    let urls = ev.currentTarget.dataset.urls;//是一个对象，对象里有一个 url属性

    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [urls.url] // 需要预览的图片http链接列表
    });
  },
})