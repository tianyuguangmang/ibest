//app.js
/**
 * @author tygm
 * @Date 2018/3/20
 */
import {Validate} from "./validate/index";
import * as Constant from "./js/constant";
App({
  /*...{Validate},*/
  ...Validate,
  ...Constant,
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        },
        fail:function(res){
          console.log(res);
        }
      })
    }
  },
  timeCount:function(s){
    var _hour = parseInt(s/3600)<10?'0'+parseInt(s/3600):parseInt(s/3600);
    var _min = parseInt((s-_hour*3600)/60)<10?'0'+parseInt((s-_hour*3600)/60):parseInt((s-_hour*3600)/60);
    var _second = parseInt(s-_hour*3600-_min*60)<10?'0'+parseInt(s-_hour*3600-_min*60):parseInt(s-_hour*3600-_min*60)
    
    return {
      hour:_hour,
      min:_min,
      second:_second
    }

  },
  dot2:function(value){
    return (value*0.01).toFixed(2);
  },
  socketOpen:false,
  /**
   * 创建socket
   * @param  {Function} cb 回调函数
   * @return {[type]}      [description]
   */
  createSocket:function(keyId,cb){
    var _this = this;
    wx.connectSocket({
      url: 'wss://im.echgs.com/websocket?openId='+keyId,
      //url: 'ws://192.168.26.111:8080/ibest/websocket?openId='+keyId,
    })
    wx.onSocketOpen(function(res) {
      console.log("连接成功");
      _this.socketOpen = true;
    })
    wx.onSocketMessage(cb)
    wx.onSocketClose(function(res) {
      console.log("连接关闭");
    })
  },
  closeSocket: function(){
    wx.closeSocket();
    console.log("连接关闭");
  },
  sendSocketMessage: function(msg) {
    if (this.socketOpen) {
      wx.sendSocketMessage({
        data:msg
      })
    } else {
       socketMsgQueue.push(msg)
    }
  },
  goBack:function(content,delta){
    if(content){
       wx.showToast({
        title:content,
        duration: 1000
      })
    }
    var _timer = setTimeout(() => {
      wx.hideToast();
      clearTimeout(_timer);
      wx.navigateBack({
        delta: delta||1
      })
    },1000)
  },
  /**
   * 获取登录微信的信息
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */
   getLoginMsg: function(cb) {
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          cb(res);
        } else {
      
        }
      }
    });
  },
  /**
   * 全局变量
   */
  globalData: {
   
    //获取到的基本信息
    baseInfo:null,
    //用户基本信息
    userInfo: null,
    //用户访问的商户的id
    merchantId:null,
    //用户访问的商家信息
    merchantInfo:null,
    baseUrl:"https://im.echgs.com",
    //访问url
    //baseUrl:"http://192.168.43.90:8080/ibest",
    //用户的openId
    openId:'',
  },
  /**
   * 打开地图
   * @param  {[type]} longitude [description]
   * @param  {[type]} latitude  [description]
   * @return {[type]}           [description]
   */
    goMaps: function(longitude,latitude){
      var _this = this;
       if(latitude&&longitude){
            var _latitude = latitude;
            var _longitude = longitude;
          }else{
            var _latitude = _this.globalData.shopGlobalMsg.coordLatitude;
            var _longitude =  _this.globalData.shopGlobalMsg.coordLongitude;
          }
          wx.openLocation({
            latitude:_latitude*1,
            longitude: _longitude*1,//经度
            scale: 28
          })
          /*wx.showLoading({
            title: '加载中',
          })
          wx.getLocation({
            type:"wgs84",
            success:function(){
              wx.openLocation({
                latitude:_latitude*1,
                longitude: _longitude*1,//经度
                scale: 28
              })
            },
            fail:function(){
               wx.openLocation({
                latitude:_latitude*1,
                longitude: _longitude*1,//经度
                scale: 28
              })
            }
          })*/
          

  },

  /**
   * 时间转换
   * @param  {[type]} _time [description]
   * @return {[type]}       [description]
   */
  timeFormcat: function(_time){
      var time = {};
      var oDate = new Date(_time*1000);
      time.year = oDate.getFullYear();   //获取系统的年；
       time.month = oDate.getMonth()+1<10?'0'+(oDate.getMonth()+1):oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
      time.day = oDate.getDate()<10?'0'+oDate.getDate():oDate.getDate(); // 获取系统日，
      time.hour = oDate.getHours()<10?'0'+oDate.getHours():oDate.getHours();//获取系统时，
      time.min = oDate.getMinutes()<10?'0'+oDate.getMinutes():oDate.getMinutes(); //分
      time.second = oDate.getSeconds()<10?'0'+oDate.getSeconds():oDate.getSeconds();//秒
      return time;
  },
  /**
   * 获取地理位置
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */
  getPosition:function(cb){
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        cb(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      },
      fail: function(res){
        cb(res)
      }
    })
  },
  /**
   * 获取data-xx 中的值；
   * @param  {[type]} event [description]
   * @param  {String} id    [id 为可变值]
   * @return {[type]}       [description]
   */
  getData:function(event,id){
    return event.currentTarget.dataset[id]
  },
  getPhoneSystemInfo:function(){
    wx.getSystemInfo({
      success: function(res) {
      
      }
    })
  },
  saveUserMsg:""
})
