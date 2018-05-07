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
		cateIndex:0,
		totalMoney:0,
		menuList:[],
		bannerList:[{pic:'https://ps.ssl.qhimg.com/sdmt/179_135_100/t010b0a4aa5bb6941c4.jpg'}],
		goodsList:[],
		//是否显示商品详情默认不显示
		showDetail:false,
		//选中的要显示的商品
		productDetail:null
		
	},
	showDetailLay:function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var _goodsList = this.data.goodsList;
		this.setData({
			productDetail:_goodsList[_index],
			showDetail:true
		})
	},
	showDetailToggle:function(){
		this.setData({
			showDetail:!this.data.showDetail
		})
	},
	//获取供应商商品列表
	getSupplierGoodsList:function(cateId){
		var _this = this;
		cateId = cateId?cateId:1;

		var params = {
			cateId:cateId
		};

		service.getSupplierGoodsList(params,function(res){
			_this.setData({
				goodsList:res.data.result.list
			})
			
		})
	},
	
	changeCate:function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var _cateId = app.getData(currentTarget,"cateid");
		this.setData({
			cateIndex:_index
		})
		this.getSupplierGoodsList(_cateId);

	},
	//获取分类列表
	getCateList:function(){
		var _this = this;
		service.getCateList(null,function(res){
			_this.setData({
				menuList:res.data.result
			})



		});
	},
	onLoad:function(){
		var _this = this;
		this.getSupplierGoodsList();
		this.getCateList();
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
				name:data.name,//名称
				resetPrice:data.resetPrice,
				mainImage:data.mainImage,
				originPrice:data.originPrice,
				sku:'褐色',
				skuId:0
			}
		}
		var _totalMoney = 0;
		for(var key in _cartInfo){
			_totalMoney += _cartInfo[key].count*_cartInfo[key].resetPrice;

		}
		this.setData({
			totalMoney:_totalMoney
		})
		wx.setStorageSync('shop_cart_info', _cartInfo);
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
	addToCart:function(){
		var _select = this.data.productDetail;
		_select.count = 5;
		this.calcCart(_select);
		/*this.setData({
			goodsList:_list
		})*/
	},

	toCart:function(){
		wx.switchTab({
		  url: '/pages/cart/cart'
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
	
})