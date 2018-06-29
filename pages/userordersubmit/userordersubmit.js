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
      _this.setData({
        dataMsg:_dataMsg
      })

    })
  },
  buyConfirm:function(){
    if(!this.data.selectedAddress||!this.data.selectedAddress.addressId){
      wx.showModal({
        title: '温馨提示',
        content:"请选择地址",
        showCancel:false
      })
      return;
    }
    service.userOrderSubmit({addressId:this.data.selectedAddress.addressId},function(res){
      console.log(res);
    })
  },
  onShow:function(){
    if(app.globalData.selectedAddress){
      this.setData({
        selectedAddress:app.globalData.selectedAddress
      })
    }
   
  },
  onLoad:function(options){
    this.getUserOrderInfo();

  }
})