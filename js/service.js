import  http from "./http";


//分享者分到红包
const shareCanGetMoneyUrl = "/merchantredpacketaccount/user/redpacket/get";
const cateListUrl = "/cate/list";
const addNewGoodsUrl = "/supplier/product/add";
const supplierRegisterUrl = "/supplier/register";
const getSupplierGoodsListUrl = "/supplier/product/list";
const stockCartInfoSubmitUrl = "/msorder/save";
const getStockOrderInfoUrl = "/msorder/info";
const buyConfirmUrl = "/msorder/add";
const getMerchantOrderUrl = "/submsorder/list";
const getMerchantProductUrl = "/merchant/product/list";
const getSupplierProductUrl = "/supplier/product/list";
const toShelfGoodUrl = "/merchant/product/sell";
const toShelfSupplierGoodUrl = "/supplier/product/sell";
const merchantConfirmReceiveUrl = "/submsorder/status";
const addNewAddressUrl = "/address/add";
const getAddressListUrl = "/address/list";
var Service = {
	getAddressList: function(params,cb,failcb){
		http.get(getAddressListUrl,params,cb,failcb);
	},
	addNewAddress: function(params,cb,failcb){
		http.json(addNewAddressUrl,params,cb,failcb);
	},
	merchantConfirmReceive: function(params,cb,failcb){
		http.get(merchantConfirmReceiveUrl,params,cb,failcb);
	},
	getSupplierProduct:function(params,cb,failcb){
		http.get(getSupplierProductUrl,params,cb,failcb,1);
	},
	toShelfGood:function(params,cb,failcb){
		var url = toShelfGoodUrl;
		if(params._type=="SUPPLIER"){
			url = toShelfSupplierGoodUrl;
		}
		http.get(url,params,cb,failcb);
	},
	getMerchantProduct:function(params,cb,failcb){
		http.get(getMerchantProductUrl,params,cb,failcb,1);
	},
	getMerchantOrder:function(params,cb,failcb){
		http.get(getMerchantOrderUrl,params,cb,failcb);
	},
	//进货的确认购买
	stockBuyConfirm:function(params,cb,failcb){
		http.post(buyConfirmUrl,params,cb,failcb);
	},
	//获取提交的购物车信息
	getStockOrderInfo:function(params,cb,failcb){
		http.get(getStockOrderInfoUrl,params,cb,failcb)
	},
	//进货时购物车信息保存
	stockCartInfoSubmit:function(params,cb,failcb){
		http.post(stockCartInfoSubmitUrl,params,cb,failcb)
	},
	//获取供应商商品列表
	getSupplierGoodsList:function(params,cb,failcb){
		http.get(getSupplierGoodsListUrl,params,cb,failcb)
	},
	//供应商注册
	supplierRegister:function(params,cb,failcb){
		http.get(supplierRegisterUrl,params,cb,failcb)
	},
	//供应商添加新产品
	addNewGoods:function(params,cb,failcb){
		http.json(addNewGoodsUrl,params,cb,failcb)
	},
	getCateList:function(params,cb,failcb){
		http.get(cateListUrl,params,cb,failcb,1)
	},

	shareCanGetMoney:function(params,cb){
		http.post(shareCanGetMoneyUrl,params,cb)
	},
	

}
module.exports = Service;
