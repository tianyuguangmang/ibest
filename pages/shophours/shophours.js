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
			amStartTime:'09:00',
			amEndTime:'12:00',
			pmStartTime:'14:00',
			pmEndTime:'18:00',
     // weekAmStartTime:'',
     // weekPmStartTime:''
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
  isMerchant:null,
  onLoad:function(options){
    var baseInfo = app.globalData.baseInfo;

    if(options.type=="MERCHANT"){
      this.isMerchant = 1;
      this.setData({
        dataMsg:baseInfo.merchantInfo
      })
    }else{
      this.setData({
        dataMsg:baseInfo.supplierInfo
      })
    }
   
  },
  dataLoading:false,
	toSubmit:function(){
    var _this = this;
    var params = this.data.dataMsg;
    if(_this.dataLoading)return;
    _this.dataLoading = true;
    if(this.isMerchant == 1){
      service.updateMerchantShopTime(params,function(res){
        _this.dataLoading = false;
        app.goBack("修改成功");
      },function(){
        _this.dataLoading = false;
      });
      return;
    }
    service.updateSupplierShopTime(params,function(res){
      _this.dataLoading = false;
      app.goBack("修改成功");
    },function(){
      _this.dataLoading = false;
    })
	},
})