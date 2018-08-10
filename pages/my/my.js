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
		hotList: null
	},

  getSupplierInfo:function(cb){
    var _baseInfo = app.globalData.baseInfo;
    if(_baseInfo&&_baseInfo.isSupplier == 1){
        service.getSupplierInfo({userId:_baseInfo.userId},function(res){
          app.globalData.baseInfo.supplierInfo = res.data.result;
        })
    }
   
  },
  
  getMerchantInfo:function(){
     var _baseInfo = app.globalData.baseInfo;
    if(_baseInfo&&_baseInfo.isMerchant == 1){
        service.getMerchantInfo({userId:_baseInfo.userId},function(res){
          app.globalData.baseInfo.merchantInfo = res.data.result;
        })
    }
  },
  getBaseInfo:function(){
    var _this = this;
    service.getBaseInfo((res) => {
      app.globalData.baseInfo = res.data.result
      _this.setData({
        baseInfo:res.data.result
      })
     
    });
  },
  onLoad:function(){
    if(app.globalData.baseInfo){
      this.setData({
        baseInfo:app.globalData.baseInfo
      })
    }else{
      this.getBaseInfo();

    }
    
  },
  onShow:function(){
    
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getBaseInfo();
    wx.stopPullDownRefresh();
  },
	
})