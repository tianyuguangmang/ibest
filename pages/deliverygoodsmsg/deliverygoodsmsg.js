/**
 * @author tygm
 * @Date 2018/3/20
 */
var service = require("../../js/service.js");
var app = getApp();
import * as Size from '../../js/imagesize';
Page({
  data: {
    courierNumber:'',
    courier:"",

  },
  orderId:null,
  onLoad:function(options){
    this.orderId = options.id;
  },

  bindPickerChange: function(e) {
    this.setData({
      menuIndex: e.detail.value
    })
  },

  inputOrderNumber:function(e){
    this.setData({
      courierNumber:e.detail.value
    })
  },
 
  inputCourier:function(e){
    this.setData({
      courier:e.detail.value
    })
  },
  dataLoading: false,
  toSubmit:function(){
    var _this = this;
    var params = {
      courierNumber:this.data.courierNumber,
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
    if(!app.required(params.courierNumber)){
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
      if(this.dataLoading)return;
      _this.dataLoading = true;
      wx.showModal({
          title: '温馨提示',
          content:"确定填写信息无误吗？",
          showCancel:false,
          success:function(){
            service.supplierDeliveryGoods(params,function(res){
              _this.dataLoading = false;
              app.goBack("已提交");
            },function(){
              _this.dataLoading = false;
            });
          },
          fail:function(){
            _this.dataLoading = false;
          }
      })
    }
})