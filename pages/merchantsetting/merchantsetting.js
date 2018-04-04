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
			address:'',
			detailAddress:'',

		},
		
		hotList: null
	},
	getSelectPos:function(){
		var _this = this;
		wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] === false) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userLocation'] === true) {
                wx.chooseLocation({
                  success:function(data){
                    
                    _this.setData({
                      errorTip:'',
                      selectPos:data.name,
                      latitude:data.latitude,
                      longitude:data.longitude,
                      flag: !_this.data.flag

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
              _this.setData({
                selectPos:data.name,
                errorTip:'',
                latitude:data.latitude,
                longitude:data.longitude,
                flag: !_this.data.flag
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
	timeCount:function(s){
    var _this = this;
    var _results = s||this.data.effectiveTime;
    //disEndTime
    var _timer = setInterval(function(){
      
        if(_results>0){
          _results -=1;
        }else{
          clearInterval(_timer);
        }
      _this.setData({
        effectiveTime:_results
        
      })

    },1000)
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