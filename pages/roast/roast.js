var that;
var util = require('../../utils/util');
var roastData = require('../../utils/roastData')
var app = getApp();

Page({
  data:{
    selectAnony:true,
    anonyInfo:'实名',
    anony_selectArea:false,
    selectPerson:true,
    firstPerson:'学校',
    selectArea:false,

    selectSex: true, //隐藏的性别下拉列表
    sex_selectArea:false,//三角符号要不要反转。
    sexInfo:'实名',
    schoolInfo: '学校',
    school_selectArea: false,
    selectSchool:true,

//下面这堆数据来自吐槽内容显示，需要优化。
    searchKeys: {
      currentPage:1
    },
    jokes: [], // 每一项
    tip: '', // 更新提示内容
    
    scrollFlag: true, // 是否可以滚动加载
    refreshFlag: false, // 是否显示刷新  
    scrollTopView: 'scrollTop', // 返回顶部锚点id
    loadMore: false, // 是否显示加载更多动画
    },
  
  //--------------匿名与否选择部分------------------------

  //点击选择类型（这里用作匿名列表）
  clickSex: function () {
    var selectSex = this.data.selectSex;
    if (selectSex) {
      this.setData({
        sex_selectArea: true,
        selectSex: false,
      })
    } else {
      this.setData({
        sex_selectArea: false,
        selectSex: true,
      })
    }
  },
  //点击性别切换
  sex_mySelect: function (e) {
    this.setData({
      sexInfo: e.currentTarget.dataset.me,
      selectSex: true,
      sex_selectArea: false,
    })
  },

  //学校列表显示
  clickSchool:function(){
    let selectSchool=this.data.selectSchool
    if(selectSchool){
      this.setData({
        school_selectArea:true,
        selectSchool:false
      })
    }else{
       this.setData({
        school_selectArea:false,
        selectSchool:true
      })
    }
  },

  //学校选择切换
  school_mySelect:function(e){
    this.setData({
      schoolInfo: e.target.dataset.me,
      selectSchool: true,
      school_selectArea: false,
    })
  },


//-----------------选择函数，以上
  onLoad:function(options){
    that = this;
    wx.showToast({
      title: '正在开启躁动模式...',
      icon: 'loading',
      duration: 10000
    })
  },

  // 页面渲染完成
  onReady:function(){
    that.onFtechData(that.data.searchKeys);
  },

  // 获取数据
  onFtechData: function (bool) {
    wx.request({
      url: 'https://zaodong.club/zaodong/roastInfo_pageShow.action', 
      data: that.data.searchKeys,
      method: 'post',
      header: {'content-type': 'application/json'},
       
      success: function (res) {
        wx.hideToast();//隐藏消息提示框
        let data = res.data.data//后台返回数据。
        that.setData({
          scrollFlag: true,
          refreshFlag: false,
          
          loadMore: true //显示最下面的loadmore动画.
        });

        if (true) {  //changed here!! 本来是data
          let results = roastData.roastData;//数据
          if (bool) {//有选择传参。bool是传入的到后台的参数，用于筛选数据。
            that.setData({
              jokes: that.data.jokes.concat(results)//把新的数据拼接到老数据后面。
            });
          } else {
            that.setData({
              // tip: data.tip,
              jokes: results
            });
          }
        
        } else {
          that.setData({
            refreshFlag: true
          });
          // 没有数据重新加载
          setTimeout(() => {
            bool ? that.onFtechData(true) : that.onFtechData();
          }, 2000);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },

  // 预览图片
  onPreviewImage: function (ev) {
    let current = ev.currentTarget.dataset.current;
    let picture = ev.currentTarget.dataset.urls.picture; //整条数据
   
    // 多张图
      let arr = [];
      picture.map((item) => {
        arr.push(item.url);
      });
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      });
   
  },

  // 远程图片加载404显示默认图
  onImageError: function (ev) {
    var _that = this;
    util.errImgFun(ev, _that);
  },

  // 跳到详情页
  onGoDetail: function (ev) {
    let detail = ev.currentTarget.dataset.detail;
    // console.log(ev.currentTarget.dataset.detail);
    app.setGlobalData({
      detail: detail
    });

    let groupid = detail.rid;   //页面跳转携带参数问题。这个在活动详情页已处理过。
    wx.navigateTo({
      url: '../rantDetail/rantDetail?groupid=' + groupid
    });
  },
  

  //点赞逻辑
  //点赞功能已实现，需要做的：
  //TODO:1,再次点击取消点赞，
  //2，当然要结合具体用户来判断，我是赞过还是没赞过。
  likeIt:function(ev){
  var that=this
   let rid = ev.currentTarget.dataset.detail.rid;
   let dataTemp=this.data.jokes;  //整条数据
   let dataTempLength=this.data.jokes.length;
   
   for(let i=0 ;i<dataTempLength;i++){
     if(rid===dataTemp[i].rid ){
       let userID = app.globalData.accountInfo.userID  //从全局下来一个userID 作为用户的识别信息
       let flag = -1  //userID内部识别标志
       
       for (let j = 0; j < dataTemp[i]["likeArray"].length; j++) {
          if (dataTemp[i]["likeArray"][j].userID == userID){
            flag  = j;
            break;
          }
       }
       if (flag !== -1) {
        dataTemp[i].like_count--
        dataTemp[i].likeArray.splice(flag,1)  //删掉一个
       } else {
        dataTemp[i].like_count++
        dataTemp[i].likeArray.push({userID:app.globalData.accountInfo.userID})
       }   
       flag = 0;
       that.setData({  //数据完成重新存储
          jokes:dataTemp
       })
       //数据变化上传服务器。
       let formData = {
         rid: dataTemp[i].rid,
         like_count:dataTemp[i].like_count,//更新点赞数
         likeArray:dataTemp[i].likeArray
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
         
        },
        fail: function () {console.log('POST failed!!')}
    })
       break;
     }
   }
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * TODO:这个没看到效果！
   */
  onPullDownRefresh: function () {
    console.log('pullDowning!!!')
    this.setData({
      scrollTopView: 'scrollTop',
      refreshFlag: true,
      
    });
    this.onFtechData();
    wx.stopPullDownRefresh()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (that.data.scrollFlag) {
      console.log('this.data.scrollFlag')
      console.log(that.data.scrollFlag);
      that.setData({
        scrollFlag: false,
        refreshFlag: true
      });
      that.onFtechData(true);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})