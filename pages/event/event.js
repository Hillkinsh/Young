// pages/test/test.js
var that;
var util = require('../../utils/util');
var app = getApp();
Page({
  data: {
    selectAnony: true,
    anonyInfo: '实名',
    anony_selectArea: false,
    selectPerson: true,
    firstPerson: '学校',
    selectArea: false,

    jokes: [], // 每一项
    tip: '', // 更新提示内容
    tipShow: false, // 是否显示更新提示
    scrollFlag: true, // 是否可以滚动加载
    refreshFlag: false, // 是否显示刷新。疑似无用数据，未找到在哪里用它。
    scrollTopView: 'scrollTop', // 返回顶部锚点id
    loadMore: false, // 是否现在加载更多

    searchKeys:{
       currentPage:1,
    },

    All: [{//这里加一个状态显示属性。在数据过滤时加进去. 为了配合前面的显示颜色，再加一个isJoin属性
      state:'',
      isJoin:'',
      eid: 1122334415,
      type: '玩耍',//这里要改成玩耍两个字就好。
      title: '去操场玩狼人傻吧',
      content: '我是预言家，等你来悍跳。这个周末晚8点。不见不散哦',
      picture: ['http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/35a8ab7a40a32853803fca5ed13273a2.png'],
      eventTime: '8/1/20:00',
      deadline: '8月1日 20：00',
      eventSpot: '西军操场',
      requireNum: 12,
      joinNum: 4,
      joinerInfo: [
        {
          nickName: '躁动的胡萝卜',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123321
        },
        {
          nickName: '王者墓',
          avatar: 'http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/6532e32240d139708012ee05db35024c.png',
          userID: 123123123
        },{
          nickName: '王者墓',
          avatar: 'http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/c8eade634069fbd980b8c6eeca8637be.png',
          userID: 123123123
        },{
          nickName: '王者墓',
          avatar: 'http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/6cd1d7bb4061a72880641bc1c57c6b74.png',
          userID: 123123123
        }
      ],
      user: {
        nickName: 'gakki',
        avatar: 'http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/c8eade634069fbd980b8c6eeca8637be.png',
        userID: 123123123
      }
    }, {
      eid: 1122334415,
      type: '玩耍',//这里要改成玩耍两个字就好。
      title: '一起打王者荣耀了',
      content: '我是王者的大神啊，现在段位都到钻石一了。虽说很有成就感，但是到现在还是没有女朋友啊。所以，有介绍对象的来，有打游戏的也请过来',
      picture: ['http://pic.baike.soso.com/ugc/baikepic2/0/ori-20150112170748-462105668.jpg/800'],
      eventTime: '6/21/13:50',
      deadline: '6月21日 13：50',
      eventSpot: '西军电咖啡厅',
      requireNum: 4,
      joinNum: 2,
      
      joinerInfo: [
        {
          nickName: '躁动的胡萝卜',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123321
        },
        {
          nickName: '王者墓',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123123
        }
      ],
      user: {
        nickName: '小明',
        avatar: 'http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/c8eade634069fbd980b8c6eeca8637be.png',
        userID: 123123123
      }
    }, {
      eid: 1122334415,
      type: '玩耍',//这里要改成玩耍两个字就好。
      title: '一起打王者荣耀了',
      content: '我是王者的大神啊，现在段位都到钻石一了。虽说很有成就感，但是到现在还是没有女朋友啊。所以，有介绍对象的来，有打游戏的也请过来',
      picture: ['http://pic.baike.soso.com/ugc/baikepic2/0/ori-20150112170748-462105668.jpg/800'],
      eventTime: '6/16/13:50',
      deadline: '6月16日 13：50',
      eventSpot: '西军电咖啡厅',
      requireNum: 4,
      joinNum: 2,
      
      joinerInfo: [
        {
          nickName: '躁动的胡萝卜',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123321
        },
        {
          nickName: '王者墓',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123123
        }
      ],
      user: {
        nickName: '小明',
        avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
        userID: 123123123
      }
    }, {
      eid: 1122334415,
      type: '玩耍',//这里要改成玩耍两个字就好。
      title: '一起打王者荣耀了',
      content: '我是王者的大神啊，现在段位都到钻石一了。虽说很有成就感，但是到现在还是没有女朋友啊。所以，有介绍对象的来，有打游戏的也请过来',
      picture: ['http://pic.baike.soso.com/ugc/baikepic2/0/ori-20150112170748-462105668.jpg/800'],
      eventTime: '6/18/13:50',
      deadline: '6月18日 13：50',
      eventSpot: '西军电咖啡厅',
      requireNum: 4,
      joinNum: 2,
      
      joinerInfo: [
        {
          nickName: '躁动的胡萝卜',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123321
        },
        {
          nickName: '王者墓',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123123
        }
      ],
      user: {
        nickName: '小明',
        avatar: 'http://bmob-cdn-11557.b0.upaiyun.com/2017/07/02/6532e32240d139708012ee05db35024c.png',
        userID: 123123123
      }
    }, {
      eid: 1122334415,
      type: '玩耍',//这里要改成玩耍两个字就好。
      title: '一起打王者荣耀了',
      content: '我是王者的大神啊，现在段位都到钻石一了。虽说很有成就感，但是到现在还是没有女朋友啊。所以，有介绍对象的来，有打游戏的也请过来',
      picture: ['http://pic.baike.soso.com/ugc/baikepic2/0/ori-20150112170748-462105668.jpg/800'],
      eventTime: '6/21/13:50',
      deadline: '6月21日 13：50',
      eventSpot: '西军电咖啡厅',
      requireNum: 4,
      joinNum: 2,
      
      joinerInfo: [
        {
          nickName: '躁动的胡萝卜',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123321
        },
        {
          nickName: '王者墓',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123123
        }
      ],
      user: {
        nickName: '小明',
        avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
        userID: 123123123
      }
    }, {
      eid: 1122334415,
      type: '玩耍',//这里要改成玩耍两个字就好。
      title: '一起打王者荣耀了',
      content: '我是王者的大神啊，现在段位都到钻石一了。虽说很有成就感，但是到现在还是没有女朋友啊。所以，有介绍对象的来，有打游戏的也请过来',
      picture: ['http://pic.baike.soso.com/ugc/baikepic2/0/ori-20150112170748-462105668.jpg/800'],
      eventTime: '6/18/13:50',
      deadline: '6月18日 13：50',
      eventSpot: '西军电咖啡厅',
      requireNum: 4,
      joinNum: 3,//TODO:这个数据应该在渲染的时候再加进来，不然会对人造成困扰。
      
      joinerInfo: [
        {
          nickName: '躁动的胡萝卜',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123321
        },
        {
          nickName: '躁动的胡萝卜',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123321
        },
        {
          nickName: '王者墓',
          avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
          userID: 123123123
        }
      ],
      user: {
        nickName: '小明',
        avatar: 'https://p3a.bytecdn.cn/large/22df000467288808aa7e',
        userID: 123123123
      }
    },

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.showToast({
      title: '正在开启躁动模式...',
      icon: 'loading',
      duration: 10000
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that.onFtechData(that.data.searchKeys);
  },

  // 获取数据
  onFtechData: function (bool) {
    wx.request({
      url:'https://zaodong.club/zaodong/eventInfo_pageShow.action',
      // url: 'https://lf.snssdk.com/neihan/stream/mix/v1/',
      data: this.data.searchKeys,
      method:'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();//隐藏消息提示框
        let data = res.data.data//后台返回数据。
        console.log('res')
        console.log(res)
        that.setData({
          scrollFlag: true,
          refreshFlag: false,
          tipShow: false,
          loadMore: true//下面的数据加载中动画显示，他不会被隐藏。
        });
        console.log('data')
        console.log(data)
        if (data == undefined ) {
          
          let results = that.data.All;

          let timeNow = util.timeNow();
          let timeArray = timeNow.split('/');
          
          let stamp = (timeArray[0] - 0) * 216000 + (timeArray[1] - 0) * 3600 + (timeArray[2] - 0) * 60 + (timeArray[3] - 0);//当下时间

          for(let i = 0; i < results.length;i++) {

            let resultsArray = results[i].eventTime.split('/');//不包含年的。
            let temp = resultsArray[2].split(':');
            resultsArray.splice(2,1,temp[0],temp[1])
           
            let deadStamp = (resultsArray[0] - 0) * 216000 + (resultsArray[1] - 0) * 3600 + (resultsArray[2] - 0) * 60 + (resultsArray[3] - 0);
            
            if(stamp <= deadStamp){ //添加属性
              if(results[i].joinNum - 0 < results[i].requireNum - 0){
                results[i].state = '正在集结'
                results[i].isJoin = true
                
              } else {
                results[i].state = '集结完毕'
                results[i].isJoin = false
                
              }
            }else{
              
              results[i].state = '活动结束'
              results[i].isJoin = false
            }
          }
          
          if (bool) {//有选择传参。bool是传入的到后台的参数，用于筛选数据。
            let dataShow = that.data.All.concat(that.data.All)
            
            that.setData({
              // tip: data.tip,//更新提示内容
              jokes: results.concat(results)//这里要添加更多内容。

            });
          } else {
            that.setData({
              // tip: data.tip,
              jokes: that.data.All
            });
          }
        } else {//上面在探讨得到有用数据的情况，但是当data为不合格（if判断为0）则
          that.setData({
            refreshFlag: true
          });
          // 没有数据，重新加载
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

  // 跳到详情页
  //把本条数据内容，通过全局添加到另外一个页面上，反正就是不停的覆盖嘛，只要实现就可以啦
  onGoDetail: function (ev) {
    let detail = ev.currentTarget.dataset.detail;//本条数据内容。
    // console.log(ev.currentTarget.dataset.detail);
    console.log(ev);
    app.setGlobalData({
      detail: detail
    });
    let eid = detail.eid;
    wx.navigateTo({
      url: '../eventDetail/eventDetail?eid=' + eid
    });
  },

  //下拉刷新函数
  // scroll:function (){
  //   console.log('scroll!!!!');
  // },
  pullDownRefresh:function () {
    console.log('pulldownfresh!!!')
    // console.log('pullDowning!!!')
    that.setData({
      scrollTopView: 'scrollTop',
      refreshFlag: true,
      tipShow: true
    });
    that.onFtechData();
    wx.stopPullDownRefresh()
  },

  //加载更多函数
   onScrollToLower: function () {
    console.log("I will scrolling! ");
    if (that.data.scrollFlag) {
      console.log("I will scrolling! ");
      that.setData({
        scrollFlag: false,
        refreshFlag: true
      });
      that.onFtechData(true);//这个和刷新里的是一个函数，区别在于有没有传参。
    }
  },
  
})