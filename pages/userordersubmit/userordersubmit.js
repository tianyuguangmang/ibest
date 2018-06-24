/**
 * @author tygm
 * @Date 2018/3/20
 */
var service = require("../../js/service.js");
var app = getApp();
import * as Size from '../../js/imagesize';
Page({
  data: {
    Size,
    cartList:[]
    
  },

  //页面分享功能
  onShareAppMessage: function(res) {

    return {
      //longitude 经度 
      //latitude 维度
      title: app.globalData.title,
      path: '/pages/mall/mall',
      success: function(res) {
        // 转发成功
        // 
        // 
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {

      }
    }
  },
  
  getUserOrderInfo:function(){
    var _this = this;
    service.getUserOrderInfo({},function(res){
      var _dataMsg = res.data.result;
    
     
      console.log(_dataMsg)
      _this.setData({
        dataMsg:_dataMsg
      })

    })

  },
  buyConfirm:function(){
    service.userOrderSubmit({addressId:3},function(res){
      console.log(res);
    })
  },
  onShow:function(){
    //this.getStockOrderInfo();
   
  },
  type:'user_type',
  onLoad:function(options){
    this.getUserOrderInfo();

  }
})