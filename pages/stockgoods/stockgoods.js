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
		goodsList:"",
		//是否显示商品详情默认不显示
		showDetail:false,
		//选中的要显示的商品
		productDetail:null
		
	},
	showDetailLay:function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var _cartInfo = this.cartInfo;
		var productDetail = this.data.goodsList[_index];
		productDetail.imgList = productDetail.imgList? typeof productDetail.imgList == "string"?JSON.parse(productDetail.imgList):productDetail.imgList:[];
		if(_cartInfo['pid_'+productDetail.productId+'_skuid_1']){
			productDetail.count = _cartInfo['pid_'+productDetail.productId+'_skuid_1'].count;
		}else{
			productDetail.count = 0;
		}
		this.setData({
			productDetail:productDetail,
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
			//cateId:cateId,
			size:10,
			current:1
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
	},

	cartInfo:wx.getStorageSync(app.SHOP_CART_INFO)||{},
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
	 */
	/**
	 * 计算购物车
	 * @param  Number num +-数量
	 * @return null
	 */
	calcCart:function(num){
		var _select = this.data.productDetail;
		var _cartInfo = this.cartInfo;
		if(_cartInfo['pid_'+_select.productId+'_skuid_1']){
			_cartInfo['pid_'+_select.productId+'_skuid_1'].count += num;
			if(_cartInfo['pid_'+_select.productId+'_skuid_1'].count<0){
				_cartInfo['pid_'+_select.productId+'_skuid_1'].count = 0;
			}
		}else{
			_cartInfo['pid_'+_select.productId+'_skuid_1'] = {
				count:1,
				productId:_select.productId,
				sku:'褐色',
				skuId:0
			}
		}
		_select.count = _cartInfo['pid_'+_select.productId+'_skuid_1'].count;
		this.setData({
			productDetail:_select
		})
		wx.setStorageSync(app.SHOP_CART_INFO, _cartInfo);
	},

	countValue:function(){
		wx.redirectTo({
		  url: '/pages/shopsettle/shopsettle'
		})
	},
	/**
	 * 购物车增加
	 */
	addToCart:function(){
		this.calcCart(1);
	},

	toCart:function(){
		wx.redirectTo({
		  url: '/pages/stockcart/stockcart'
		})
	},
	/**
	 * 购物车减少
	 */
	subtractCart:function(){
		this.calcCart(-1);
	},
	
})