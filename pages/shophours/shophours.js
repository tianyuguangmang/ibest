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
			amStartTime:'',
			amEndTime:'',
			pmStartTime:'',
			pmEndTime:'',
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

	toSubmit:function(){
		console.log(this.data.dataMsg); 
	},
})