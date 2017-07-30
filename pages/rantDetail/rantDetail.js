var that;
var app = getApp();
var util = require('../../utils/util');
Page({
  data: {
    commentHidden:true,//是否隐藏评论输入框
    item: [],      //整条数据。
    like_count:0,
    comment_count:0,

    groupid: null,
    topComments: [],
    recentComments: [],
    commentCount: 0,//评论数目
    offset: 0,
    hasMore: false,
    isOver: false, // 下拉加载是否返回没有数据了
    commentArray:[],

       //下面的是评论窗的。
        isShow: false,//控制emoji表情是否显示
        cfBg: false,
        isLoad:true,//解决初始加载时emoji动画执行一次
        emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [],//qq、微信原始表情

  },
  onLoad: function (options) {//这个函数更新了searchKey 函数。
    // 生命周期函数--监听页面加载
    that = this;
    console.log('onLoad!!!')
    let em = {},
        emojis = [],
        emChar = that.data.emojiChar.split('-')
        that.data.emoji.forEach(function (v,i) {
          em = {
            char:emChar[i],
            emoji: '0x1f'+v
          }
          emojis.push(em)
        })

    //拷贝源对象自身的并且可枚举的属性到目标对象身上. 替换掉旧有的group_id。
    let searchKeys = Object.assign({}, that.data.searchKeys, { group_id: options.groupid });
    that.setData({
      searchKeys: searchKeys,
      emojis: emojis
    });
  },
  onReady: function () {
    that.setData({
      item: app.globalData.detail,//TODO: 这个全局数据是前一页的内容.在这边就能显示出发帖的个人信息和内容。
      like_count:app.globalData.detail.like_count,
      comment_count:app.globalData.detail.comment_count
    });
    console.log('this.data.item')
    console.log(this.data.item)
  },
  // 预览图片
  onPreviewImage: function (ev) {
    let current = ev.currentTarget.dataset.current;
    let urls = ev.currentTarget.dataset.urls;
    // 多张图
    if (typeof urls == 'object') {
      let arr = [];
      urls.map((item) => {
        arr.push(item.url);
      });
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      });
    } else { // 一张图
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: [urls] // 需要预览的图片http链接列表
      });
    }

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    // String7
    console.log('TODO:pull down refresh.');
  },

 //点赞
   likeIt:function(ev){
   let that=this
   let rid = ev.currentTarget.dataset.detail.rid;
   let dataTemp=ev.currentTarget.dataset.detail;  //整条数据
   let userID = app.globalData.accountInfo.userID  //从全局下来一个userID 作为用户的识别信息
   let flag = -1  //userID内部识别标志
       
       for (let j = 0; j < dataTemp["likeArray"].length; j++) {
          if (dataTemp["likeArray"][j].userID == userID){
            flag  = j;break;}
       }
       if (flag !== -1) {
          dataTemp.like_count--
          dataTemp.likeArray.splice(flag,1)  //删掉一个
       } else {
          dataTemp.like_count++
          dataTemp.likeArray.push({userID:app.globalData.accountInfo.userID})
       }   
       flag = 0;
       that.setData({  //数据完成重新存储
          item:dataTemp,
          like_count:dataTemp.like_count
       })
       //数据变化上传服务器。
       let formData = {
         rid: dataTemp.rid,
         like_count: dataTemp.like_count,//更新点赞数
         likeArray: dataTemp.likeArray
       }
       console.log(formData)
       wx.request({
        url: 'https://zaodong.club/zaodong/roastInfo_updateRoastInfo.action',   //这里更换新链接。
        data: formData,
        method: 'post',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('POST success!!')
          let temp = res.data.success
          console.log(temp) //这里查看结果输出

        },
        fail: function () {
          console.log('POST failed!!')
        }
    })
     
  },

  //提交评论
  formSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(app);
    app.globalData.commentHidden=true;
    this.setData({
      commentHidden:true
    })
  },
  onReachBottom: function () {
    if (that.data.pageCount > 1 && that.data.offset < that.data.commentCount + 15) {
      that.setData({
        searchKeys: Object.assign({}, that.data.searchKeys, { offset: that.data.offset }),
        hasMore: true
      });
      that.onFetchComments();
    }
  },




  //下面是评论函数
     //点击emoji背景遮罩隐藏emoji盒子。
  cemojiCfBg: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },
  //点击表情显示/隐藏表情盒子
  emojiShowHide: function () {
    this.setData({
      isShow: !this.data.isShow,
      isLoad: false,
      cfBg: !this.data.false
    })
  },

  //文本域失去焦点时 事件处理
  textAreaBlur: function (e) {
    //获取此时文本域值
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value
    })

  },
 
   //文本域获得焦点事件处理
  textAreaFocus: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },
  //发送评论评论 事件处理.1,把个人信息和评论内容放到一个对象，2，清空评论窗内容。
  send: function () {
    var that = this, 
        conArr = [];
    //此处延迟的原因是 在点发送时 先执行失去文本焦点 再执行的send 事件 此时获取数据不正确 故手动延迟100毫秒
    setTimeout(function () {
      if (that.data.content.trim().length > 0) {
        conArr.push({
          avatar: app.globalData.accountInfo.avatar,//个人头像信息
          nickName: app.globalData.accountInfo.nickName,
          userID: app.globalData.accountInfo.userID,
          comment_content: that.data.content //评论内容
        })
        
        let temp = that.data.item.commentArray.splice(0,0,conArr[0]);
        that.setData({
          item: that.data.item, //再把评论内容加到评论列表。
          comment_count:that.data.item.commentArray.length,
          content: "",//清空文本域值
          isShow: false,
          cfBg: false
        })
        console.log('item')
        console.log(that.data.item)
        let formData = {
          rid : that.data.item.rid,
          comment_count:that.data.comment_count,
          commentArray:that.data.item.commentArray
        }
        console.log('formData')
        console.log(formData)

        wx.request({
        url: 'https://zaodong.club/zaodong/roastInfo_updateRoastInfo.action',   //这里更换新链接。
        data: formData,
        method: 'post',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('POST success!!')
          let temp = res.data.success
          console.log(res.data) //这里查看结果输出
        },
        fail: function () {console.log('POST failed!!')}
    })


      } else {
        that.setData({
          content: ""//清空文本域值
        })
      }
    }, 100)
  },
  //解决滑动穿透问题
  emojiScroll: function (e) {
    console.log(e)
  },
   //表情选择
  emojiChoose: function (e) {
    //当前输入内容和表情合并
    if (this.data.content) {//这个emoji还是从data里中采到的。
      this.setData({
        content: this.data.content + e.currentTarget.dataset.emoji
      })
    } else {
      this.setData({
        content: e.currentTarget.dataset.emoji
      })
    }
  },
})