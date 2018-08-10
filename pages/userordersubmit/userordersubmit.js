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

  
  getUserOrderInfo:function(){
    var _this = this;
    service.getUserOrderInfo({},function(res){
      var _dataMsg = res.data.result;
      _dataMsg.totalMoney = app.dot2(_dataMsg.totalMoney);
      _dataMsg.allFee = app.dot2(_dataMsg.allFee);
      _dataMsg.deliveryFee = app.dot2(_dataMsg.deliveryFee);
      _dataMsg.subOrderList.forEach(function(item,index){
        _dataMsg.subOrderList[index].resetPrice = app.dot2(item.resetPrice);
      })
      _this.setData({
        dataMsg:_dataMsg
      })

    })
  },
  dataLoading:false,
  buyConfirm:function(){

    var _this = this;
    if(!this.data.selectedAddress||!this.data.selectedAddress.addressId){
      wx.showModal({
        title: '温馨提示',
        content:"请选择地址",
        showCancel:false
      })
      return;
    }
    if(_this.dataLoading){
      return;
    }
    _this.dataLoading = true;
    wx.showLoading({
      title: '加载中',
    })
    service.userOrderSubmit({addressId:this.data.selectedAddress.addressId,token:this.data.token},function(response){
      var _msg = response.data.result;
      _this.dataLoading = false;
      service.userPay({orderId:_msg.orderId},function(res){
        var _results = res.data.result;
        wx.hideLoading()
        wx.requestPayment({
             'timeStamp': _results.timeStamp,
             'nonceStr': _results.nonceStr,
             'package': _results.packAge,
             'signType': 'MD5',
             'paySign': _results.paySign,
             'success':function(res){
                wx.switchTab({
                  url: '/pages/myorder/myorder'
                })
                /*service.updateCmOrderState({orderId:_msg.orderId,status:"PAID"},function(res){
                  wx.switchTab({
                    url: '/pages/myorder/myorder'
                  })
                })*/
             },
             'fail':function(res){
                /*wx.switchTab({
                  url: '/pages/myorder/myorder'
                })*/
             }
          })
      })
      //清除本地存储的购物车信息
      wx.removeStorageSync(app.CART_INFO);
      /*wx.switchTab({
        url: '/pages/myorder/myorder'
      })*/
    },function(){
      _this.dataLoading = false;
      _this.getOrderToken();
    })
  },
  onShow:function(){
    if(app.globalData.selectedAddress){
      this.setData({
        selectedAddress:app.globalData.selectedAddress
      })
    }
   
  },
  getOrderToken:function(){
    var _this = this;
    service.getOrderToken(null,function(res){
      _this.setData({
        token:res.data.result
      })
    })
  },
  
  onLoad:function(options){
    this.getUserOrderInfo();
    this.getOrderToken();

  }
})