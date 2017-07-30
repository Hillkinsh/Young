var util = require('../../utils/util.js');
var Bmob = require("../../utils/bmob.js");
var app = getApp();

let that

Page({
  data: {
    picArray:[0 ,1, 2 ,3 , 4],//标志位，用来判定修改哪张小图
    picture0:'',
    avatarUrl:'',//上传头像url。
    pictureArray:[],//小图数组

    flag_name:true,
    flag_sex:true,
    flag_university:true,
    flag_school:true,
    flag_wechat:true,
    flag_QQ:true,

    info_name:'name',
    info_sex:'sex',
    info_university:'university',
    info_school:'school',
    info_wechat:'wechat',
    info_QQ:'QQ',

    flag_eat:true,
    flag_sport:true,
    flag_watch:true,
    flag_listen:true,
    flag_play:true,
    hobbyArray:[1,2,3,4,5],
    
    eatArray:[],//爱吃标签
    sportArray:[],//爱动标签
    watchArray:[],
    listenArray:[],
    playArray:[],

    nickName:'xiaoming',
    sex: '男',
    birthday: '',
    university:'',
    school:'理工',
    wechat:'111223',
    QQ:'2121314',

    index: 0,
    eventTitle: '',
    
    sexs: [
      { name: '男', value: '男', checked: 'true' },
      { name: '女', value: '女' }
    ],
    universitys: [
      { name: '西安电子科技大学', value: '西安电子科技大学', checked: 'true' },
      { name: '西安交通大学', value: '西安交通大学' },
      { name: '西北工业大学', value: '西北工业大学' },
      { name: '陕西师范大学', value: '陕西师范大学' },
      { name: '西北政法大学', value: '西北政法大学' },
      { name: '长安大学', value: '长安大学' },
      { name: '西安音乐学院', value: '西安音乐学院' }
    ],
    
    
    signature: '就算失败，也要摆出豪迈的姿态',
    actionSheetHidden: true, // 是否显示底部可选菜单  
    actionSheetItems: [
      { bindtap: 'changeImage', txt: '修改头像' },
      { bindtap: 'viewImage', txt: '查看头像' }
    ] // 底部可选菜单  
  },
  // 初始化加载获取设备长宽  
  onLoad: function (options) {
    var that = this;
    let accountInfo = app.globalData.accountInfo
    console.log(accountInfo)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          picture0:accountInfo.avatar,
          pictureArray:accountInfo.pictureArray,
          nickName:accountInfo.nickName,
          birthday:accountInfo.birthday,
          sex:accountInfo.sex,
          university:accountInfo.university,
          school:accountInfo.school,
          wechat:accountInfo.wechat,
          QQ:accountInfo.QQ,

          eatArray:accountInfo.eatArray,//爱吃标签
          sportArray:accountInfo.sportArray,//爱动标签
          watchArray:accountInfo.watchArray,
          listenArray:accountInfo.listenArray,
          playArray:accountInfo.playArray,
        })
      }
    });
  },

  onShow: function () {
    var that = this;
    let accountInfo = app.globalData.accountInfo
    console.log(accountInfo)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          picture0: accountInfo.avatar,
          pictureArray: accountInfo.pictureArray,
          nickName: accountInfo.nickName,
          sex: accountInfo.sex,
          university: accountInfo.university,
          school: accountInfo.school,
          wechat: accountInfo.wechat,
          QQ: accountInfo.QQ
        })
      }
    });
  },

  //修改内容后上传函数
  upload:function (formData, type) {
    wx.request({
        url: 'https://zaodong.club/zaodong/accountInfo_acquireInfo',
        data: formData,
        method: 'post',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('POST success!!!!!!')
          let temp = res
          if (temp) {
            for (let key in formData) {  //则把个人信息保存到全局数据中
              app.globalData.accountInfo[key] = formData[key];
            }
            
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
  },

  //把头像设置到全局。
  globalAvatar: function () {
    if(this.data.avatarUrl) {
      console.log('change avatar!!!')
      app.globalData.accountInfo.avatar = this.data.avatarUrl
    }
    
  },

//改变大图0
changepic0:function(){
  let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        // 改动之后，改变相应的全局account属性。
        let tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length) {
          let time = Date.parse(new Date());
          let name = time.toString() + '.png';
          let file = new Bmob.File(name, tempFilePaths)//图片上传，获取图片地址
          file.save().then(function (res) {


            _this.setData({  avatarUrl: res.url() }) //保存回传图片地址。
          }, function (error) { console.log(error) })
        }

        setTimeout(_this.globalAvatar,500)//设置到全局
         _this.setData({
           picture0:res.tempFilePaths[0]
         })
      }
    })
},

//改变小图
changepic:function(para){
  let _this = this;
  let tempPicArray = this.data.pictureArray;
  let tempArray = app.globalData.accountInfo.pictureArray
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {

        let tempFilePaths = res.tempFilePaths
        let temp  //存 上传回来的地址照片
        if (tempFilePaths.length) {
          let time = Date.parse(new Date());
          let name = time.toString() + '.png';
          let file = new Bmob.File(name, tempFilePaths)//图片上传，获取图片地址
          file.save().then(function (res1) {
            temp = res1.url()

         switch (para) {
          case 0:{tempArray[0] = temp;console.log('temp  '+temp)} ; break; //res.tempFilePaths[0]
          case 1:{tempArray[1] = temp;console.log('temp  '+temp)} ; break;
          case 2:{tempArray[2] = temp;console.log('temp  '+temp)} ; break;
          case 3:{tempArray[3] = temp;console.log('temp  '+temp)} ; break;
          case 4:{tempArray[4] = temp;console.log('temp  '+temp)} ; break;
         }
         app.globalData.accountInfo.pictureArray = tempArray;//传到全局，满好的
          }, function (error) {
            console.log(error)
          })
        }

        switch (para) {
          case 0:{tempPicArray[0] = res.tempFilePaths[0]} ; break; //res.tempFilePaths[0]
          case 1:{tempPicArray[1] = res.tempFilePaths[0]} ; break;
          case 2:{tempPicArray[2] = res.tempFilePaths[0]} ; break;
          case 3:{tempPicArray[3] = res.tempFilePaths[0]} ; break;
          case 4:{tempPicArray[4] = res.tempFilePaths[0]} ; break;
           }
        _this.setData({
          pictureArray : tempPicArray
        })  
      }
    })
},
  //重置小图函数。 直接反馈到到全局上 
resetImage: function (para) {
  let tempPicArray = this.data.pictureArray;
  switch (para) {
    case 0: { tempPicArray[0] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
      app.globalData.accountInfo.pictureArray[0] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
    } ; break;
    case 1: { tempPicArray[1] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
      app.globalData.accountInfo.pictureArray[1] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
    } ; break;
    case 2: { tempPicArray[2] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
      app.globalData.accountInfo.pictureArray[2] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
    } ; break;
    case 3: { tempPicArray[3] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
      app.globalData.accountInfo.pictureArray[3] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
    } ; break;
    case 4: { tempPicArray[4] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
      app.globalData.accountInfo.pictureArray[4] = 'http://bmob-cdn-11557.b0.upaiyun.com/2017/06/25/cb4c48ff40b6b08a8069dcad3c201444.png';
    } ; break;
  }


 this.setData({
    pictureArray : tempPicArray
 })
},

//小图修改函数
  chooseImageTap: function (e) {
    let pid = e.currentTarget.dataset.pid
    let _this = this;
    wx.showActionSheet ({
      itemList: ['更换', '删除'],
      itemColor: "#656565",//f7982a
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.changepic(pid)
          } else if (res.tapIndex == 1) {
              _this.resetImage(pid)
          }
        }
      }
    })
  },


  show: function (e) {
    console.log(e);
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

  //需要手动输入的几个。变动存全局就ok了
  change:function(e){
  
    let temp=e.detail.value;
    let mid = e.currentTarget.dataset.mid
    switch (mid){
      case 'name' : {
        this.setData({nickName:temp});
        app.globalData.accountInfo.nickName = temp
        
      };break;
      case 'school' : {
        this.setData({school:temp})
        app.globalData.accountInfo.school = temp
      };break;
      case 'wechat' :{
        this.setData({wechat:temp})
       app.globalData.accountInfo.wechat = temp
      };break;
      case 'QQ' :{
        this.setData({QQ:temp})
       app.globalData.accountInfo.QQ = temp
      };break;
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

  //性别变动
  listenerRadio: function (e) {
    console.log('e.detail.value')
    console.log(e.detail.value)
    this.setData({sex: e.detail.value,flag_sex: true})
    app.globalData.accountInfo.sex = e.detail.value  //全局作出改变
  },

  //生日
  birthday: function (e) {
    let temp = e.detail.value;
    let dateArray = temp.split('-');
      this.setData({
        birthday: dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2],
      })
      app.globalData.accountInfo.birthday = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2]
      
  },
  //学校
  listenerUniversity:function(e){
    this.setData({
      university: e.detail.value,
      flag_university: true
    })
   app.globalData.accountInfo.university = e.detail.value

  },

  //点击其他区域，隐藏模态框函数
  hiddenModal : function (e){
    let hobbytype = e.target.dataset.hobbytype
     switch (hobbytype) {
      case 1:{this.setData({flag_eat:true})} ;break;
      case 2:{this.setData({flag_sport:true})};break;
      case 3:{this.setData({flag_watch:true})};break;
      case 4:{this.setData({flag_listen:true})};break;
      case 5:{this.setData({flag_play:true})};break;
     }
  },

  //模态框出现--添加体育
  showIt:function(e){
    let hobbytype = e.target.dataset.hobbytype
  
    switch (hobbytype) {
      case 1:{this.setData({flag_eat:false })} ;break;
      case 2:{this.setData({flag_sport:false})};break;
      case 3:{this.setData({flag_watch:false})};break;
      case 4:{this.setData({flag_listen:false})};break;
      case 5:{this.setData({flag_play:false}); console.log('hello!!!')};break;
    }
    
  },
  submitIt:function(e){
     let hobbytype = e.target.dataset.hobbytype
     switch (hobbytype) {
      case 1:{this.setData({flag_eat:true})} ;break;
      case 2:{this.setData({flag_sport:true})};break;
      case 3:{this.setData({flag_watch:true})};break;
      case 4:{this.setData({flag_listen:true})};break;
      case 5:{this.setData({flag_play:true})};break;
    }
    
  },
  
  //添加到爱好的内容函数
  bindChange:function(e){
     let hobbytype = e.target.dataset.hobbytype
     let tempObject
     let temp=e.detail.value;
    switch (hobbytype) {
      case 1:{ tempObject=this.data.eatArray; };break;
      case 2:{tempObject=this.data.sportArray};break;
      case 3:{tempObject=this.data.watchArray};break;
      case 5:{tempObject=this.data.playArray};break; //为什么独独不识别？？
      case 4:{tempObject=this.data.listenArray};break;
      
    }
    console.log('tempObject!!')
    console.log(tempObject);
    let tempArray=temp.split(' ')
    for(let i=0;i<tempArray.length;i++){
      if(tempArray[i]!==''){
        tempObject.push(tempArray[i])
      }
    }
    //把爱好的数据添加到全局
    switch (hobbytype) {
      case 1:{app.globalData.accountInfo.eatArray = tempObject; this.setData({ eatArray:tempObject })};break;
      case 2:{app.globalData.accountInfo.sportArray = tempObject; this.setData({ sportArray:tempObject})};break;
      case 3:{app.globalData.accountInfo.watchArray = tempObject; this.setData({ watchArray:tempObject})};break;
      case 4:{app.globalData.accountInfo.listenArray = tempObject; this.setData({ listenArray:tempObject})};break;
      case 5:{app.globalData.accountInfo.playArray = tempObject; this.setData({ playArray:tempObject  })};break;
    } 
    console.log(app.globalData.accountInfo) 
  },

  

  //爱好列表删除函数
  changeIt:function (e) {
    let hobbytype = e.currentTarget.dataset.hobbytype;

    switch (hobbytype) {
      case 1:{
        let check = -1 
        let eatArray = this.data.eatArray
        let change = e.target.dataset.change;
        
        for (let i = 0 ; i<eatArray.length;i++ ){
          if(eatArray[i] == change){
            check = i; break
          }
        }
        if(check > -1){ eatArray.splice(check, 1) }
        this.setData({ eatArray:eatArray })
      };break;
      case 2:{
        let check = -1 
        let sportArray = this.data.sportArray
        let change = e.target.dataset.change;
        for (let i = 0 ; i<sportArray.length;i++ ){
          if(sportArray[i] == change){
            check = i; break
          }
        }
        if(check > -1){ sportArray.splice(check, 1) }
        this.setData({ sportArray:sportArray })
      };break;
       case 3:{
        let check = -1 
        let watchArray = this.data.watchArray
        let change = e.target.dataset.change;
        for (let i = 0 ; i<watchArray.length;i++ ){
          if(watchArray[i] == change){
            check = i; break
          }
        }
        if(check > -1){ watchArray.splice(check, 1) }
        this.setData({ watchArray:watchArray })
      };break;
       case 4:{
        let check = -1 
        let listenArray = this.data.listenArray
        let change = e.target.dataset.change;
        for (let i = 0 ; i<listenArray.length;i++ ){
          if(listenArray[i] == change){
            check = i; break
          }
        }
        if(check > -1){ listenArray.splice(check, 1) }
        this.setData({ listenArray:listenArray })
      };break;
      case 5:{
        let check = -1 
        let playArray = this.data.playArray
        let change = e.target.dataset.change;
        for (let i = 0 ; i<playArray.length;i++ ){
          if(playArray[i] == change){
            check = i; break
          }
        }
        if(check > -1){ playArray.splice(check, 1) }
        this.setData({ playArray:playArray })
      };break;

     }
     app.globalData.accountInfo.eatArray = this.data.eatArray
     app.globalData.accountInfo.sportArray = this.data.sportArray
     app.globalData.accountInfo.watchArray = this.data.watchArray
     app.globalData.accountInfo.listenArray = this.data.listenArray
     app.globalData.accountInfo.playArray = this.data.playArray
  },
  onHide:function () {
       //TODO：上传所有的数据，在这里
    console.log('HELOL world!!!')
       let formData = {
         account: app.globalData.accountInfo.account,
         avatar:app.globalData.accountInfo.avatar,
         nickName:app.globalData.accountInfo.nickName,
         sex:app.globalData.accountInfo.sex,
         birthday:app.globalData.accountInfo.birthday,
         university:app.globalData.accountInfo.university,
         school:app.globalData.accountInfo.school,
         wechat:app.globalData.accountInfo.wechat,
         QQ:app.globalData.accountInfo.QQ,
         pictureArray:app.globalData.accountInfo.pictureArray,
         eatArray:app.globalData.accountInfo.eatArray,
         sportArray:app.globalData.accountInfo.sportArray,
         watchArray:app.globalData.accountInfo.watchArray,
         listenArray:app.globalData.accountInfo.listenArray,
         playArray:app.globalData.accountInfo.playArray
       }
       console.log(formData)

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

     },
     onUnload:function () {
       
       //todo:再上传一遍。
     }
});  