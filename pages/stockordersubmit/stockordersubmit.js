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
  getStockOrderInfo:function(){
    var _this = this;
    service.getStockOrderInfo({},function(res){
      var _dataMsg = res.data.result;
      _dataMsg.productList = JSON.parse(_dataMsg.productList);
      for(var i=0;i<_dataMsg.productList.length;i++){
        _dataMsg.productList[i].supplierProduct = JSON.parse(_dataMsg.productList[i].supplierProduct);
      }
      console.log(_dataMsg)
      _this.setData({
        dataMsg:_dataMsg
      })

    })
  },
  buyConfirm:function(){
    service.stockBuyConfirm({},function(res){
      console.log(res);
    })
  },
  onShow:function(){
    this.getStockOrderInfo();
   
  },
  onLoad:function(){
  }
})