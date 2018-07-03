/**
 * @author tygm
 * @Date 2018/3/20
 */
var service = require("../../js/service.js");
var app = getApp();
import * as Size from '../../js/imagesize';
Page({
  data: {
    orderNumber:'',
    courier:"",

  },
  orderId:null,
  onLoad:function(options){
    this.orderId = options.id;
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      menuIndex: e.detail.value
    })
  },

  inputOrderNumber:function(e){
    this.setData({
      orderNumber:e.detail.value
    })
  },
 
  inputCourier:function(e){
    this.setData({
      courier:e.detail.value
    })
  },
  toSubmit:function(){
    var params = {
      orderNumber:this.data.orderNumber,
      courier:this.data.courier,
      orderId:this.orderId
    }
    if(this.orderId == null){
        wx.showModal({
          title: '温馨提示',
          content:"没有该订单",
          showCancel:false
        })
        return;
      }
    if(!app.required(params.orderNumber)){
        wx.showModal({
          title: '温馨提示',
          content:"请输入发货单号",
          showCancel:false
        })
        return;
      }
      if(!app.required(params.courier)){
        wx.showModal({
          title: '温馨提示',
          content:"请输入物流公司",
          showCancel:false
        })
        return;
      }

      wx.showModal({
          title: '温馨提示',
          content:"确定填写信息无误吗？",
          showCancel:false,
          success:function(){
            service.supplierDeliveryGoods(params,function(res){
              app.goBack("已提交");
            });
          }
      })
    }
})