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
			originPrice:20
		},{
			productId:2,
			title:'特价商品价商',
			mainImage:'https://img.alicdn.com/tfs/TB1EkSvdr_I8KJjy1XaXXbsxpXa-350-350.jpg_240x240xz.jpg_.webp',
			currentPrice:10,
			sellCount:10,
			originPrice:20
		}]
		
	},
	//获取供应商商品列表
	getSupplierGoodsList:function(){
		var params = {};
		service.getSupplierGoodsList(params,function(res){
			console.log(res);
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
	cartInfo:{},
	/**
	 * 购物车本地存储数据格式 
	 * key: mid 商户id uid 用户id
	 * shop_cart_info
	 * 
	 * value:
	 * pid 商品id skuid 商品规格id
	 * {
	 * 		pid_1_skuid_1:{
	 * 			productId:1,//商品id
	 * 			count:1,//数量
	 * 			title:'',//名称
	 * 			currentPrice:10,//当前价格
	 * 			mainImage:'',
	 * 			originPrice:10,
	 * 			sku:褐色,
	 * 			skuId:1
	 * 		}
	 * 
	 * 
	 * }
	 * @param {[type]} currentTarget [description]
	 */
	cartList:function(){
		var _list = this.data.goodsList;
		var _cartInfo = {};
		for(var i=0,_len = _list.length;i<_len;i++){
			if(_list[i].count&&_list[i].count>0){
				_cartInfo["pid_1_skuid_1"] = {

				}

			}
		}
	},
	/**
	 * 计算购物车
	 * @param  {[type]} data 商品数据
	 * @return {[type]}
	 */
	calcCart:function(data){
		var _cartInfo = this.cartInfo;
		if(_cartInfo['pid_'+data.productId+'_skuid_1']){
			if(data.count == 0){
				delete _cartInfo['pid_'+data.productId+'_skuid_1'];
			}else{
				_cartInfo['pid_'+data.productId+'_skuid_1'].count = data.count;
			}
		}else{
			_cartInfo['pid_'+data.productId+'_skuid_1'] = {
				count:data.count,
				productId:data.productId,
				title:data.title,//名称
				currentPrice:data.currentPrice,
				mainImage:data.mainImage,
				originPrice:data.originPrice,
				sku:'褐色',
				skuId:0
			}
		}

	},
	onHide:function(){
		wx.setStorage({
		  key:"shop_cart_info",
		  data:this.cartInfo
		})

	},
	countValue:function(){
		wx.redirectTo({
		  url: '/pages/shopsettle/shopsettle'
		})
	},
	/**
	 * 购物车增加
	 * @param {[type]} currentTarget [description]
	 */
	addToCart:function(currentTarget){
		var _index = app.getData(currentTarget,'index');
		var _list = this.data.goodsList;
		
		_list[_index].count = _list[_index].count?_list[_index].count+5:5;
		var _select = _list[_index];
		this.calcCart(_select);


		this.setData({
			goodsList:_list
		})
	},
	/**
	 * 购物车减少
	 * @param  {[type]} currentTarget [description]
	 * @return {[type]}               [description]
	 */
	subtractCart:function(currentTarget){
		var _index = app.getData(currentTarget,'index');
		var _list = this.data.goodsList;
		_list[_index].count = _list[_index].count>0?_list[_index].count-5:0;
		var _select = _list[_index];
		this.calcCart(_select);
		this.setData({
			goodsList:_list
		})
	},
	onLoad:function(){
		var _this = this;
		wx.getStorage({
		  key: 'shop_cart_info',
		  success: function(res) {
	      var _cartInfo = res.data;
	      _this.cartInfo = _cartInfo;
	      var _goodsList = _this.data.goodsList;
	      for(var i=0,_len = _goodsList.length;i<_len;i++){
	      	if(_cartInfo['pid_'+_goodsList[i].productId+'_skuid_1']){
	      		_goodsList[i].count = _cartInfo['pid_'+_goodsList[i].productId+'_skuid_1'].count;
	      	}
	      }
	      _this.setData({
	      	goodsList:_goodsList,
	      })
		  } 
		})
		
	}
})