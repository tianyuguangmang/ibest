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
    cartList:[],

   /* selectedAddress:{
      name:"王文斌",
      phone:"187547008212",
      address:"山东农业大学",
      detail:"104号"
    }*/
    
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
  selectedAddress:function(){

  },
  getStockOrderInfo:function(){
    var _this = this;
    service.getStockOrderInfo({},function(res){
      var _dataMsg = res.data.result;
      
      _this.setData({
        dataMsg:_dataMsg
      })

    })
  },

  getUserOrderInfo:function(){
    service.getUserOrderInfo({},function(res){
      var _dataMsg = res.data.result;
      _dataMsg.productList = JSON.parse(_dataMsg.productList);
     
      console.log(_dataMsg)
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
    service.stockBuyConfirm({addressId:this.data.selectedAddress.addressId,payType:'ACCOUNT'},function(res){
      wx.navigateTo({
        url: '/pages/msorder/msorder?type=MERCHANT'
      })
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
    this.getStockOrderInfo();

  }
})