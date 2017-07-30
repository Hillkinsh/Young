var indexData = require('../../utils/indexData.js');
var util = require('../../utils/util')
var app = getApp();
// 判断Like哪一张
var likeOneOrTwo = 0;
//锁定图片，使图片没法移动翻页
var lock = 0;
var isTransform=true;//辅助判断哪个页面需要切换
var allCount = 0;
var startPoint;

Page({
  data: {
    buttonTop: 0,//初始位置
    buttonLeft: 0,//初始位置

    selectSex: true, //隐藏的性别下拉列表
    sex_selectArea:false,//三角符号要不要反转。
    sexInfo:'性别',

    schoolInfo: '学校',
    school_selectArea: false,
    selectSchool:true,
    
    animationData: {},//动画
    want_hidden: false,
    nowant_hidden: true,
    cardInfoList:[],
    myData:[], //存后台返回数据。假的
  
  },

   // 加载数据
  //temp从ALL取出的数据
  //cardInfoList:temp;将ALL取出的数据放入以供显示
  //ballTop、ballLeft     第一张初始图片位置
  //ballTop2、ballLeft2   第二张初始图片位置
  //index1:6,index2:4,    两张图片初始的z-index
  onLoad: function () {
    var that = this;
    // 请求服务器数据
    // wx.request({
    //   url: 'https://service.woyao.huoxingwan.com',
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     // success
    //     console.log(res+"222");
    //     // that.setData({
    //       // All:res中的数组资源
    //     // })
    //   }
    // })
  
    let a = indexData.indexData
    let personInfo
    for (let i = 0; i < a.length; i++) {
      let personInfo = util.constel(a[i].birthday)
      a[i].age = personInfo[0]
      a[i].constel = personInfo[1]
      a[i].constel_color = personInfo[2]

      if(a[i].sex == '男'){
        a[i].data_sex='♂';
        a[i].data_sex_color='#59D2FE'
      }else{
        a[i].data_sex='♀'
        a[i].data_sex_color='#FF91F3'
      }
    }
    console.log(a)
    this.setData({
      myData:a
    })
   
    //调用应用实例的方法获取全局数据
    
    allCount = this.data.myData.length;//所有数据list的数目。

    var temp = new Array(); // 创建一个临时数组 ,用于加载2条数据。
    for (let i = 0; i < 2; i++) {
      var add = this.data.myData.shift();
      temp.push(add);
    }
  
    that.setData({
      cardInfoList: temp,
      ballTop: 55,
      ballLeft: 76,
      ballTop2: 55,
      ballLeft2: 76,
      index1: 6,
      index2: 4,
    })

    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
    wx.getSystemInfo({
      success: function (res) {
        // success
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        })

      }
    })
  },



  // 滑动第一张的移动事件
  //pageX,pageY,当前移动点位置
  //moveX,moveY用于锁定图片中点位置
  //ballLeft由于是rpx所以*2
  //TODO: 怎么移动的并不清楚，但确确实实是通过该函数移动的。
  touchmove: function (event) {
    //console.log(event)
    let pageX = event.touches[0].pageX;
    let pageY = event.touches[0].pageY;
    // console.log('pageX1 ' + pageX, 'pageY1 ' + pageY);
    // 需要移动的距离;
    let moveX = this.data.screenWidth * 0.8 * 0.5;
    let moveY = 350 * 0.5;
    if (lock == 0) {
      this.setData({//这两个参数表示图片位置。设置图片位置。
        ballTop: event.touches[0].pageY - moveY,
        ballLeft: (event.touches[0].pageX - moveX) * 2,
      });
    }
  },

  /**第一张移动结束处理动画
   * 如果没被锁定，就翻页或者复位。
   */
  touchend: function (event) {
    if (lock == 0) {
      if (event.currentTarget.offsetLeft < -30) {//-110
        this.Animation(-500);//这个函数是：滑动，切换页面。
      } else if (event.currentTarget.offsetLeft > 50) {//180
        this.Animation(500);
      } else {
        this.AnimationN1(event.currentTarget.offsetLeft, event.currentTarget.offsetTop);
      }
    }
  },
  touchmove2: function (event) {
    let pageX = event.touches[0].pageX;
    let pageY = event.touches[0].pageY;
    let moveX = this.data.screenWidth * 0.8 * 0.5;
    let moveY = 350 * 0.5;
    if (lock == 0) {
      this.setData({
        ballTop2: event.touches[0].pageY - moveY,
        ballLeft2: (event.touches[0].pageX - moveX) * 2,
      });
    }
  },

  // 第二张移动结束处理动画
  touchend2: function (event) {
    if (lock == 0) {
      if (event.currentTarget.offsetLeft < -30) {
        this.Animation2(-500);
      } else if (event.currentTarget.offsetLeft > 50) {
        this.Animation2(500);
      } else {
        this.AnimationN2(event.currentTarget.offsetLeft, event.currentTarget.offsetTop);
      }
    }
  },

  // 第一张左滑动右滑动动画
  Animation: function (translateXX) {
    var animation = wx.createAnimation({
      duration: 720,
      timingFunction: "ease",
    });
    this.animation = animation;
    this.animation.translateY(0).translateX(translateXX).step(); //TODO: 是不是仅仅把其移除出屏幕？？

    //TODO：上一张图片移走之后，新的图片加进来。这个怎么做到的？反正就是他。
    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({ duration: 1 }); //rotate(0)

    //通过动画实例的export方法导出动画数据传递给组件的animation属性
    this.setData({ animationData: this.animation.export(),});

    var self = this;
    likeOneOrTwo = 1;
    setTimeout(function () {//新的图片加入。这一组数据更新的是谁？？
      self.setData({
        ballTop: 55,//62
        ballLeft: 76,
        index1: 4,
        percent2: 100,
        index2: 6,
      })
    }, 720);//720
    setTimeout(function () {
      if (self.data.myData.length > 0) {
        var tempfromAll = self.data.myData.shift();//出队的结果赋给tempfromAll。新图片加入
        self.data.cardInfoList[0] = tempfromAll;
      }

      if (self.data.cardInfoList[0].id == allCount - 1) {//上锁是为了停止继续翻动，连接数据库。应该是数据刷新
        if (allCount % 2 == 0) {lock = 1;}
      }

      //当加载最后一条数据时划出后隐藏自己。这是不可能的。没法走到这里
      //TODO: 并没有id属性。
      if (self.data.cardInfoList[0].id == allCount) {

        wx.showToast({
          title: '已无更多',
          icon: 'success',
          duration: 2000
        })
      }

      self.setData({ //更新 cardInfoList
        cardInfoList: self.data.cardInfoList,
        animationData: {}, //TODO: 动画组件置空怎么回事
      });
    }, 720);//350
  },

  // 第二张左滑动右滑动动画
  Animation2: function (translateXX) {
    var animation = wx.createAnimation({
      duration: 720,
      timingFunction: "ease",
    });
    this.animation = animation;
    this.animation.translateY(0).translateX(translateXX).step();//透明度什么鬼？ 0.1
    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({ duration: 10 });

    this.setData({
      animationData1: this.animation.export(),
    });


    var self = this;
    likeOneOrTwo = 0;
    setTimeout(function () {
      self.setData({
        percent1: 100,
        index1: 6,
        ballTop2: 55,
        ballLeft2: 76,
        index2: 4,
      })
    }, 720)
    setTimeout(function () {
      var cardInfoList = self.data.cardInfoList;
      if (self.data.myData.length > 0) {
        var tempfromAll = self.data.myData.shift();
        self.data.cardInfoList[1] = tempfromAll;
      }


      //当倒数第二条数据时,隐藏可滑动的第二层和层叠效果的中间层
      if (self.data.cardInfoList[1].id == allCount - 1) {
        if (allCount % 2 == 1) {
          lock = 1;
        }

        self.setData({
          // hidden3:true,
          hidden2: true,
        })
      }
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {},
      });
    }, 350);
  },


  // 第一张图片不需翻页动画
  AnimationN1: function (offsetX, offsetY) {
    // 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      // timingFunction: "ease",

    });
    var self = this;
    this.animation = animation;
    this.animation.translateX(offsetX).translateY(offsetY).rotate(0).step({ duration: 10 });//10 before
    this.animation.translateY(0).translateX(0).rotate(0).scale(1).step();

    this.setData({
      animationData: this.animation.export(),
      ballTop: 55,
      ballLeft: 76,
    });
  },


  // 第二张图片不需翻页动画
  AnimationN2: function (offsetX, offsetY) {
    // 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      // timingFunction: "ease",

    });
    var self = this;
    this.animation = animation;
    this.animation.translateX(offsetX).translateY(offsetY).rotate(0).step({ duration: 10 });
    this.animation.translateY(0).translateX(0).scale(1).rotate(0).step();

    this.setData({
      animationData1: this.animation.export(),
      ballTop2: 55,
      ballLeft2: 76,
    });
  },

  //点击图片进入详情页面.TODO：可以不用他这种方法，一样可以传递信息。先保留，等有数据就改
  onGoDetail: function (ev) {
    let detail = ev.currentTarget.dataset.detail;//本条数据内容。
    // console.log(ev.currentTarget.dataset.detail);
    console.log('ev');
    console.log(ev);
    app.setGlobalData({
      detail: detail
    });
    let userID = detail.userID;
    wx.navigateTo({
      url: '../like/like?id=' + userID
    });
  },
 
  onReady: function () {
  },

  /**
   * 点击切换图片
   */
  imgTransform:function(){
    var self = this;
    var animation = wx.createAnimation({
      duration: 720,//持续时间
      timingFunction: "ease",
    });
    this.animation = animation;

    if (isTransform){
      isTransform = !isTransform;
      this.animation.translateY(0).translateX(550).step();
      this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({ duration: 10 });
      this.setData({
        animationData: this.animation.export(),
      });
      likeOneOrTwo = 1;//TODO：设置这个likeoneortwo何意？
      setTimeout(function () {//新的图片加入。这一组数据更新的是谁？？
        self.setData({
          ballTop: 55,//62
          ballLeft: 76,
          index1: 4,
          percent2: 100,
          index2: 6,
        })
      }, 720);//720
      setTimeout(function () {
        var cardInfoList = self.data.cardInfoList;
        if (self.data.myData.length > 0) {
          var tempfromAll = self.data.myData.shift();//出队的结果赋给tempfromAll。新图片加入
          self.data.cardInfoList[0] = tempfromAll;
        }
        if (self.data.cardInfoList[0].id == allCount - 1) {//上锁是为了停止继续翻动，连接数据库。应该是数据刷新
          if (allCount % 2 == 0) {
            lock = 1;
          }
        }
        //当加载最后一条数据时划出后隐藏自己。这是不可能的。没法走到这里
        if (self.data.cardInfoList[0].id == allCount) {
          wx.showToast({
            title: '已无更多',
            icon: 'success',
            duration: 2000
          })
        }
        self.setData({
          cardInfoList: self.data.cardInfoList,
          animationData: {},
        });
      }, 350);
    }else{
      isTransform = !isTransform;
      this.animation.translateY(0).translateX(550).opacity(1).step();//
      this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({ duration: 10 });
      this.setData({
        animationData1: this.animation.export(),
      });
      likeOneOrTwo = 0;
      setTimeout(function () {
        self.setData({
        percent1: 100,
        index1: 6,
        ballTop2: 55,
        ballLeft2: 76,
        index2: 4,
        })
      }, 720)
      setTimeout(function () {
        var cardInfoList = self.data.cardInfoList;
        if (self.data.myData.length > 0) {
          var tempfromAll = self.data.myData.shift();
          self.data.cardInfoList[1] = tempfromAll;
        }
        //当倒数第二条数据时,隐藏可滑动的第二层和层叠效果的中间层
        if (self.data.cardInfoList[1].id == allCount - 1) {
          if (allCount % 2 == 1) {
            lock = 1;
          }
          self.setData({
            // hidden3:true,
            hidden2: true,
          })
        }
        self.setData({
          cardInfoList: self.data.cardInfoList,
          animationData: {},
        });
      }, 350);
    } 
  },

/**
 * 那个叉叉的图片切换函数
 */
  imgTransformLeft:function(){
    var self = this;
    var animation = wx.createAnimation({
      duration: 720,//持续时间
      timingFunction: "ease",
    });
    this.animation = animation;

    if (isTransform) {
      isTransform = !isTransform;
      this.animation.translateY(0).translateX(-550).step();
      this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({ duration: 10 });
      this.setData({
        animationData: this.animation.export(),
      });
      likeOneOrTwo = 1;//TODO：设置这个likeoneortwo何意？ 跳到详情页的参数。
      setTimeout(function () {//新的图片加入。这一组数据更新的是谁？？
        self.setData({
          ballTop: 55,//62
          ballLeft: 76,
          index1: 4,
          percent2: 100,
          index2: 6,
        })
      }, 720);//720
      setTimeout(function () {
        var cardInfoList = self.data.cardInfoList;
        if (self.data.myData.length > 0) {
          var tempfromAll = self.data.myData.shift();//出队的结果赋给tempfromAll。新图片加入
          self.data.cardInfoList[0] = tempfromAll;
        }
        if (self.data.cardInfoList[0].id == allCount - 1) {//上锁是为了停止继续翻动，连接数据库。应该是数据刷新
          if (allCount % 2 == 0) {
            lock = 1;
          }
        }
        //当加载最后一条数据时划出后隐藏自己。这是不可能的。没法走到这里
        if (self.data.cardInfoList[0].id == allCount) {
          wx.showToast({
            title: '已无更多',
            icon: 'success',
            duration: 2000
          })
        }
        self.setData({
          cardInfoList: self.data.cardInfoList,
          animationData: {},
        });
      }, 350);
    } else {
      isTransform = !isTransform;
      this.animation.translateY(0).translateX(-550).opacity(1).step();//
      this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({ duration: 10 });
      this.setData({
        animationData1: this.animation.export(),
      });
      likeOneOrTwo = 0;
      setTimeout(function () {
        self.setData({
          percent1: 100,
          index1: 6,
          ballTop2: 55,
          ballLeft2: 76,
          index2: 4,
        })
      }, 720)
      setTimeout(function () {
        var cardInfoList = self.data.cardInfoList;
        if (self.data.myData.length > 0) {
          var tempfromAll = self.data.myData.shift();
          self.data.cardInfoList[1] = tempfromAll;
        }
        //当倒数第二条数据时,隐藏可滑动的第二层和层叠效果的中间层
        if (self.data.cardInfoList[1].id == allCount - 1) {
          if (allCount % 2 == 1) {
            lock = 1;
          }
          self.setData({
            // hidden3:true,
            hidden2: true,
          })
        }
        self.setData({
          cardInfoList: self.data.cardInfoList,
          animationData: {},
        });
      }, 350);
    } 
  },

})