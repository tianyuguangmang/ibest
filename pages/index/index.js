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
		menuList:null,
		bannerList:[{pic:'https://ps.ssl.qhimg.com/sdmt/179_135_100/t010b0a4aa5bb6941c4.jpg'}],
		goodsList:null
		
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
	changeCate:function(currentTarget){
		var _index = app.getData(currentTarget,"index");
		var cateId = app.getData(currentTarget,"id");
		this.dataCateId = cateId;
		this.getDataList();
		this.setData({
			cateIndex:_index
		})
	},
	cartInfo:{},
	/**
	 * 购物车本地存储数据格式 
	 * cart_info
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
	//获取分类列表
	getCateList:function(){
		var _this = this;
		service.getCateList(null,function(res){
			_this.setData({
				menuList:res.data.result
			})
		});
	},
	/**
	 * 计算购物车
	 * @param  {[type]} data 商品数据
	 * @return {[type]}
	 */
	calcCart:function(data){
		var _cartInfo = this.cartDataInfo||{};
		if(_cartInfo['pid_'+data.productId+'_skuid_1']){
			if(data.count == 0){
				delete _cartInfo['pid_'+data.productId+'_skuid_1'];
			}else{
				_cartInfo['pid_'+data.productId+'_skuid_1'].count = data.count;
			}
		}else{
			_cartInfo['pid_'+data.productId+'_skuid_1'] = {
				count:data.count,
				productId:data.productId
			}
		}
		wx.setStorageSync(app.CART_INFO,_cartInfo);
		return true;

	},
	onHide:function(){
		
	},
	/**
	 * 购物车增加
	 * @param {[type]} currentTarget [description]
	 */
	addToCart:function(currentTarget){
		var _index = app.getData(currentTarget,'index');
		var _list = this.data.goodsList;
		
		_list[_index].count = _list[_index].count?_list[_index].count+1:1;
		var _select = _list[_index];
		if(this.calcCart(_select)){
			this.setData({
				goodsList:_list
			})
		}
		
	},
	/**
	 * 购物车减少
	 * @param  {[type]} currentTarget [description]
	 * @return {[type]}               [description]
	 */
	subtractCart:function(currentTarget){
		var _index = app.getData(currentTarget,'index');
		var _list = this.data.goodsList;
		_list[_index].count = _list[_index].count>0?_list[_index].count-1:0;
		var _select = _list[_index];
		if(this.calcCart(_select)){
			this.setData({
				goodsList:_list
			})
		}
	},
	dataCurrent:1,
	dataSize:10,
	dataCateId:null,
	cartGoods:function(_goodsList,_cartInfo){
		if(_cartInfo&&_goodsList.length>0){
			for(var i=0,_len = _goodsList.length;i<_len;i++){
		    	if(_cartInfo['pid_'+_goodsList[i].productId+'_skuid_1']){
		    		_goodsList[i].count = _cartInfo['pid_'+_goodsList[i].productId+'_skuid_1'].count;
		    	}
		    }
		}
		this.setData({
			goodsList:_goodsList
		})
	},
	onShow:function(){
		var _cartInfo = wx.getStorageSync(app.CART_INFO);
		var _goodsList = this.data.goodsList;

		if(_cartInfo&&_goodsList){
			this.cartGoods(_goodsList,_cartInfo);
		}
		
	},
	getDataList:function(){
		var _this = this;
		var params = {
			current:this.dataCurrent,
			size:this.dataSize,
			merchantId:this.mchtId
		}
		if(this.dataCateId) params.cateId = this.dataCateId;
		service.merchantGoodsList(params,function(res){
			var _goodsList = res.data.result.list;
			var _cartInfo = _this.cartInfo;
			_this.cartGoods(_goodsList,_cartInfo);
		},function(res){
			wx.showModal({
			  title: '温馨提示',
			  content:res.data.error,
			  showCancel:false,
			  success: function(res) {
			    
			  }
			})
		})
	},
	cartDataInfo:null,
	mchtId:1,
	getWxUserInfo:function(){
		//app.getUserInfo(function(res) {
			/*service.updateUserInfo({
				avatar:"",
				nickName:"王文",
				userId:app.globalData.baseInfo.userId
			},function(res){})*/
		//});
		
	},
	onLoad:function(options){
		var _this = this;
		this.mchtId = options.merchantId||9;
		app.globalData.merchantId = this.mchtId;
		this.getCateList();
		this.cartDataInfo = wx.getStorageSync(app.CART_INFO);
		this.getDataList();	
		this.getWxUserInfo();	
		
	}
})