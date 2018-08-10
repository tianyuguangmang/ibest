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
		noMoreData: false,
		dataMsg:{
			sendPrice:'',
			deliveryFee:'',
      amStartTime:'09:00',
      amEndTime:'12:00',
      pmStartTime:'14:00',
      pmEndTime:'18:00',
		},
		
		hotList: null
	},

  bindTimeChange1: function(e) {
    var _dataMsg = this.data.dataMsg;
    _dataMsg.amStartTime = e.detail.value;
    this.setData({
      dataMsg:_dataMsg
    })
  },
  bindTimeChange2: function(e) {
    var _dataMsg = this.data.dataMsg;
    _dataMsg.amEndTime = e.detail.value;
    this.setData({
      dataMsg: _dataMsg
    })
  },
  bindTimeChange3: function(e) {
    var _dataMsg = this.data.dataMsg;
    _dataMsg.pmStartTime = e.detail.value;
    this.setData({
      dataMsg:_dataMsg
    })
  },
  bindTimeChange4: function(e) {
    var _dataMsg = this.data.dataMsg;
    _dataMsg.pmEndTime = e.detail.value;
    this.setData({
      dataMsg:_dataMsg
    })
  },
 
	inputSendPrice:function(e) {
    var _dataMsg = this.data.dataMsg;
    _dataMsg.sendPrice = e.detail.value;
    this.setData({
      dataMsg:_dataMsg
    })
  },
  inputDeliveryFee:function(e) {
    var _dataMsg = this.data.dataMsg;
    _dataMsg.deliveryFee = e.detail.value;
    this.setData({
      dataMsg:_dataMsg
    })
  },
  onLoad:function(){
    var baseInfo = app.globalData.baseInfo;
    if(baseInfo){
      this.setData({
        dataMsg:{
          sendPrice:baseInfo.merchantInfo.sendPrice*0.01,
          deliveryFee:baseInfo.merchantInfo.deliveryFee*0.01,
          deliveryArea:baseInfo.merchantInfo.deliveryArea,
          amStartTime:baseInfo.merchantInfo.amStartTime,
          amEndTime:baseInfo.merchantInfo.amEndTime,
          pmStartTime:baseInfo.merchantInfo.pmStartTime,
          pmEndTime:baseInfo.merchantInfo.pmEndTime,
        }
      })
    }
    
  },
	toSubmit:function(){
    var _this = this;
    var params = _this.data.dataMsg;
    var baseInfo = app.globalData.baseInfo;
    params.sendPrice = baseInfo.merchantInfo.sendPrice*100,
    params.deliveryFee = baseInfo.merchantInfo.deliveryFee*100,
    service.updateMerchantBaseInfo(params,function(res){
        app.globalData.baseInfo.merchantInfo = Object.assign(app.globalData.baseInfo.merchantInfo,params);
        app.goBack("修改成功");


    })
	},
})