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
			latitude:'',
			longitude:'',
			address:'',
			detailAddress:'',

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
  inputDetailAddress:function(e) {
    var _dataMsg = this.data.dataMsg;
    _dataMsg.detailAddress = e.detail.value;
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
	//页面分享功能
	onShareAppMessage: function(res) {
		return {
			//longitude 经度 
			//latitude 维度
			title: app.globalData.title,
			path: '/pages/mall/mall',
			success: function(res) {
				// 转发成功
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
	toSubmit:function(){
		console.log(this.data.dataMsg);
	},
})