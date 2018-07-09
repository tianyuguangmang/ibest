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
	selectedThis:function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var _select = this.data.dataList[_index];
		_select.index = _index;
		app.globalData.selectedBankCard = _select;
		wx.navigateBack({
		  delta: 1
		})
	},
	onShow:function(){
		this.dataList();
	},
	editorBankCard: function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var _select = this.data.dataList[_index];
		_select.index = _index;
		app.globalData.selectedAddress = _select;
		wx.navigateTo({
		  url: '/pages/newbankcard/newbankcard?type=1'
		})
	},
	deleteBankCard: function(currentTarget){
		var _this = this;
		var _id = app.getData(currentTarget,"id");
		var _index = app.getData(currentTarget,"index");
		var _list =this.data.dataList;
		wx.showModal({
		  title: '提示',
		  content: '确定要删除这个银行卡吗？',
		  success: function(res) {
		    if (res.confirm) {
		      	service.deleteBankCard({bankCardId:_id},function(res){
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
	isMerchant:null,
	onLoad:function(options){
	  if(options.type == "MERCHANT"){
	    this.isMerchant = 1;
	  }
	},
	dataList:function(){
		var _this = this;
		service.getBankCard({userId:app.globalData.baseInfo.userId},function(res){
			_this.setData({
				dataList:res.data.result
			})

		})

	}
})