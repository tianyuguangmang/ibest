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
		menuList:[{id:1,name:"今日推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"}],
		bannerList:[{pic:'https://ps.ssl.qhimg.com/sdmt/179_135_100/t010b0a4aa5bb6941c4.jpg'}],
		goodsList:[{
			productId:1,
			title:'特价商品价商',
			mainImage:'https://img.alicdn.com/tfs/TB1EkSvdr_I8KJjy1XaXXbsxpXa-350-350.jpg_240x240xz.jpg_.webp',
			currentPrice:10,
			sellCount:10,
			onShelf:false,
			originPrice:20
		},{
			productId:2,
			title:'特价商品价商',
			mainImage:'https://img.alicdn.com/tfs/TB1EkSvdr_I8KJjy1XaXXbsxpXa-350-350.jpg_240x240xz.jpg_.webp',
			currentPrice:10,
			sellCount:10,
			onShelf:false,
			originPrice:20
		}]
		
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
	

	
	getSupplierProduct:function() {

		var _this = this;
		service.getSupplierProduct({current:1,size:10,supplierId:this.baseInfo.supplierInfo.supId},function(res){
			_this.setData({
				dataList:res.data.result.list
			})
		})
	},
	toShelfGood: function(productId,onSell){


	},
	editor:function(currentTarget){
		var _this = this;
		var index = app.getData(currentTarget,"index");
		var _list = this.data.dataList;
		var _onSell = _list[index].onSell==1?0:1;
		var _productId = _list[index].productId;
		service.toShelfGood({productId:_productId,onSell:_onSell,_type:this.type},function(res){
			_list[index].onSell = _onSell;
			wx.showToast({
			  title: _onSell==1?"已上架":"已下架",
			  icon: 'success',
			  duration: 2000
			})
			_this.setData({
				dataList:_list

			})

		})

	},
	type:null,
	baseInfo:null,
	onLoad:function(options){
		this.baseInfo = app.globalData.baseInfo;
		this.type = options.type;
		if(this.type == 'SUPPLIER')
			this.getSupplierProduct();
		else
			this.getMerchantProduct();
		
	}
})