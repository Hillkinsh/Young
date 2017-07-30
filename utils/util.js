function formatTime(date) {
  var date = new Date(date)
  // var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  // var second = date.getSeconds()

  return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 毫秒转换分秒
function formatSeconds(s) {
    var t = '';
    if (s > -1) {
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; }
        t += parseInt(sec);
    }
    return t;
}
//远程图片no found情况下指引  
function errImgFun(ev, that) {
    var _errImg = ev.target.dataset.errImg;
    var _errObj = {};
    _errObj[_errImg] = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494312702095&di=a23d7b4383c5ce2fcd6848c761b0195e&imgtype=0&src=http%3A%2F%2Fwww.9tnl.com%2Fuploadfile%2Fimage%2F20150810%2F20150810225176647664.jpg";
    that.setData(_errObj);
}

//uid生成函数
function getUserID() {
  let num = ''
  for (let i = 0; i < 10; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num
}

//返回当前时间函数
function timeNow() {
  var date = new Date()
  var time = [];
  time.push(date.getMonth() + 1);
  time.push(date.getDate());
  time.push(date.getHours());
  time.push(date.getMinutes())
  return time.join('/')
}

//-------------------------------------注册页面函数---------

var rootDocment = 'https://www.itit123.cn';
function req(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}
function getReq(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}  
// 去前后空格  注册页面
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 提示错误信息 注册页面  
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}
// 清空错误信息  注册页面
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}  
//--------------------------------------注册页面函数-------

//-------------------星座和年龄函数
function constel(birth) {
        let age,
            constel,
            color
        let date=new Date();
        let birthArray=birth.split('/');
        let year=birthArray[0]-0;
        let mon=birthArray[1]-0;
        let day=birthArray[2]-0;
        age=date.getFullYear()-year;
        if((mon == 3&&day >= 21)||(mon == 4&&day <= 19)){
            constel='白羊座'
            color='#FF6745'
        }
        if((mon == 4&&day >= 20)||(mon == 5&&day <= 20)){
             color='#27CBF8'
            constel='金牛座'
        }
        if((mon == 5&&day >= 21)||(mon == 6&&day <= 21)){
            color='#FF9F34'
            constel='双子座'
        }
        if((mon == 6&&day >= 22)||(mon == 7&&day <= 22)){
           color='#C5CCC7'
            constel='巨蟹座'
        }
        if((mon == 7&&day >= 23)||(mon == 8&&day <= 22)){
            color='#FEC70F'
            constel='狮子座'
        }
        if((mon == 8&&day >= 23)||(mon == 9&&day <= 22)){
           color='#AACE45'
            constel='处女座'
        }
        if((mon == 9&&day >= 23)||(mon == 10&&day <= 23)){
             color='#E357AA'
            constel='天秤座'
        }
        if((mon == 10&&day >= 24)||(mon == 11&&day <= 22)){
            color='#BC5ED2'
            constel='天蝎座'
        }
        if((mon == 11&&day >= 23)||(mon == 12&&day <= 21)){
            color='#8AE28A'
            constel='射手座'
        }
        if((mon == 12&&day >= 22)||(mon == 1&&day <= 19)){
            color='#32A1E9'
            constel='摩羯座'
        }
        if((mon == 1&&day >= 20)||(mon == 2&&day <= 18)){
            color='#7AE0E8'
            constel='水瓶座'
        }
        if((mon == 2&&day >= 19)||(mon == 3&&day <= 20)){
            color='#F0E46A'
            constel='双鱼座'
        }
        return [age,constel,color]
    }

module.exports = {
  formatTime: formatTime,
  formatSeconds: formatSeconds,
  errImgFun: errImgFun,
  getUserID:getUserID,
  req:req,
  getReq:getReq,
  trim:trim,
  isError:isError,
  clearError:clearError,
  timeNow: timeNow,
  constel:constel
}
