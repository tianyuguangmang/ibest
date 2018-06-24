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
		hotList: null,
		phone:"18712300417",
		inputValidCode:"3号楼403",
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
	
	inputPhone:function(e){
		this.setData({
			phone:e.detail.value
		})
	},

	inputValidCode:function(e){
		this.setData({
			validCode:e.detail.value
		})
	},
	onSubmit: function(){
		var params = {
			name:this.data.name,
			phone:this.data.phone,
			address:this.data.address,
			detail:this.data.detail
		}
		
		if(!app.phoneValidate(params.phone)){
			wx.showModal({
			  title: '温馨提示',
			  content:"请输入正确手机号",
			  showCancel:false
			})
			return;
		}
	
		if(!app.required(params.validCode)){
			wx.showModal({
			  title: '温馨提示',
			  content:"请输入验证码",
			  showCancel:false
			})
			return;
		}
		/*service.addNewAddress(params,function(res){
			app.goBack("添加成功");

		})*/
	}
})