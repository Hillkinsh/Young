var that;
var app = getApp();
var util = require('../../utils/util');
Page({
  data: {
    event: [],
    pictureArray:[]
  },
  onLoad: function (options) {
    that = this;
  },
  onReady: function () {
    that.setData({
      event: app.globalData.detail,
      pictureArray:app.globalData.detail.picture
    });
    
  },
  showDetail11: function (ev) {
    console.log(ev)
    console.log(that.data.event.picture)
  },

  //加入活动
  joining:function (e) {
    //首先判断自己是否自己已加入进来，如果是，点击该函数则退出该活动
    //从活动中推出，需要1，改变joinNum-- ，集结状态的改变：‘我已加入’-->‘正在集结’
    //加入之后需要，1，参与列表joiNum++。
    //TODO: 2，把新加一后的数据返回给后台数据库
    let temp = this.data.event
    let hasJoin = false;//判断是否已加入游戏的标志位
    for (let i=0 ; i < temp.joinerInfo.length; i++){
      if(temp.joinerInfo[i].userID == '1234456677'){
        hasJoin = true
        temp.joinerInfo.splice(i,1)//退出该活动
        temp.joinNum--
        temp.state = '正在集结'
        break ;
      }
    }
    if(hasJoin){
      this.setData({
      event:temp
    })
    } else {
      let account = {//个人信息
            nickName:app.globalData.accountInfo.nickName,
            avatar:app.globalData.accountInfo.avatar,
            userID:'1234456677'
          }
    temp.joinerInfo.push(account)
    temp.joinNum++
    if(temp.joinNum == temp.requireNum){
      temp.state = '集结完毕'
     }else{
       temp.state = '我已加入'
     }
    this.setData({
      event:temp
    })
    }

    
    
    
//TODO:把数据发给后台，找到此条数据，完成数据更新
  }
})