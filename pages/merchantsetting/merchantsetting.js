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
      deliveryArea:''
		},
		
		hotList: null
	},
	getSelectPos:function(){
		var _this = this;
		var _dataMsg = this.data.dataMsg;
		wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] === false) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userLocation'] === true) {
                wx.chooseLocation({
                  success:function(data){
                    _dataMsg.latitude = data.latitude;
                    _dataMsg.longitude = data.longitude;
                    _dataMsg.address = data.name;
                    _this.setData({
                     	dataMsg:_dataMsg
                    })
                  },
                  fail:function(res){
                    _this.setData({
                     res:res

                    })
                  }
                })

              }
            }
          })
        }else{
          wx.chooseLocation({
            success:function(data){
              _dataMsg.latitude = data.latitude;
              _dataMsg.longitude = data.longitude;
              _dataMsg.address = data.name;
              _this.setData({
               	dataMsg:_dataMsg
              })
            },
            fail:function(res){
              _this.setData({
               res:res
              })
            }
          })
        }
      }
  	})
	},
  inputdeliveryArea:function(e) {
    var _dataMsg = this.data.dataMsg;
    _dataMsg.deliveryArea = e.detail.value;
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
          sendPrice:baseInfo.merchantInfo.sendPrice,
          deliveryFee:baseInfo.merchantInfo.deliveryFee,
          deliveryArea:baseInfo.merchantInfo.deliveryArea,
        }
      })
    }
    
  },
	toSubmit:function(){
    var _this = this;
    var params = _this.data.dataMsg;
    service.updateMerchantBaseInfo(params,function(res){
        app.globalData.baseInfo.merchantInfo.sendPrice = params.sendPrice;
        app.globalData.baseInfo.merchantInfo.deliveryFee = params.deliveryFee;
        app.globalData.baseInfo.merchantInfo.deliveryArea = params.deliveryArea;
        app.goBack("修改成功");


    })
	},
})