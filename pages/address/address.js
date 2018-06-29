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
	selectedThis:function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var _select = this.data.dataList[_index];
		_select.index = _index;
		app.globalData.selectedAddress = _select;
		wx.navigateBack({
		  delta: 1
		})
	},
	onShow:function(){
		this.dataList();
	},
	setDefault: function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var _id = app.getData(currentTarget,"id");
		service.setDefaultAddress({addressId:_id},function(res){

		})
	},
	editorAddress: function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var _select = this.data.dataList[_index];
		_select.index = _index;
		app.globalData.selectedAddress = _select;
		wx.navigateTo({
		  url: '/pages/newaddress/newaddress?type=1'
		})
	},
	deleteAddress: function(currentTarget){
		var _this = this;
		var _id = app.getData(currentTarget,"id");
		var _index = app.getData(currentTarget,"index");
		var _list =this.data.dataList;
		wx.showModal({
		  title: '提示',
		  content: '确定要删除这个地址吗？',
		  success: function(res) {
		    if (res.confirm) {
		      	service.deleteAddress({addressId:_id},function(res){
					_list.splice(_index,1);
					_this.setData({
						dataList:_list
					})
				})
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
		
	},
	dataList:function(){
		var _this = this;
		service.getAddressList({},function(res){
			_this.setData({
				dataList:res.data.result
			})

		})

	}
})