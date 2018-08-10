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

  selectedAddress:function(){

  },
  getStockOrderInfo:function(){
    var _this = this;
    service.getStockOrderInfo({},function(res){
      var _dataMsg = res.data.result;
      _dataMsg.totalMoney = app.dot2(_dataMsg.totalMoney);
      _dataMsg.orderList.forEach(function(item,index){
        _dataMsg.orderList[index].resetPrice = app.dot2(item.resetPrice);
      })
      _this.setData({
        dataMsg:_dataMsg
      })

    })
  },

  dataLoading: false,
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
    var params = {
      addressId:this.data.selectedAddress.addressId,
      payType:'WX'
    };
    _this.dataLoading = true;
    service.stockBuyConfirm(params,function(response){
      var _msg = response.data.result;
      _this.dataLoading = false;
      if(params.payType == 'WX'){
        service.userPayMsOrder({orderId:_msg.orderId},function(res){
          var _results = res.data.result;
          wx.requestPayment({
               'timeStamp': _results.timeStamp,
               'nonceStr': _results.nonceStr,
               'package': _results.packAge,
               'signType': 'MD5',
               'paySign': _results.paySign,
               'success':function(res){
                  wx.redirectTo({
                    url: '/pages/msorder/msorder?type=MERCHANT'
                  })
               },
               'fail':function(res){
                  // wx.redirectTo({
                  //   url: '/pages/msorder/msorder?type=MERCHANT'
                  // })
               }
            })
        })
      }

      wx.removeStorageSync(app.SHOP_CART_INFO);
      
    },function(){
      _this.dataLoading = false;
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