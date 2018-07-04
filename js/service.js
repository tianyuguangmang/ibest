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
const getMerchantStockOrderUrl = "/submsorder/list";
const getMerchantProductUrl = "/merchant/product/list";
const getSupplierProductUrl = "/sproduct/list";
const toShelfGoodUrl = "/merchant/product/sell";
const toShelfSupplierGoodUrl = "/supplier/product/sell";
const consumerConfirmReceiveUrl = "/cmorder/update";
const addNewAddressUrl = "/address/add";
const getAddressListUrl = "/address/list";
const deleteAddressUrl = "/address/delete";
const merchantGoodsListUrl = "/merchant/product/list";
const cmOrderSaveUrl = "/cmorder/save";
const getUserOrderInfoUrl = "/cmorder/info";
const userOrderSubmitUrl = "/cmorder/add";
const userOrderListUrl = "/cmorder/list";
const getSupplierInfoUrl = "/supplier/info";
const getMerchantInfoUrl = "/merchant/info";
const registerMerchantUrl = "/merchant/register";
const registerSupplierUrl = '/supplier/register';
const updateSupplierShopTimeUrl = "/supplier/shop/time";
const updateMerchantShopTimeUrl = "/merchant/shop/time";
const editorAddressUrl = "/address/update";
const updateUserUrl = "/user/update";
const getMerchantDeliveryOrderUrl = "/cmorder/list";
//供应商去发货
const supplierDeliveryGoodsUrl = "/submsorder/send";
//更新订单状态
const updateMsOrderStateUrl = "/submsorder/status";
//更新商家与用户的状态
const updateCmOrderStateUrl = "/cmorder/update";
var Service = {
	updateCmOrderState: function(params,cb,failcb){
		http.get(updateCmOrderStateUrl,params,cb,failcb);
	},
	updateMsOrderState: function(params,cb,failcb){
		http.get(updateMsOrderStateUrl,params,cb,failcb);
	},
	supplierDeliveryGoods: function(params,cb,failcb){
		http.post(supplierDeliveryGoodsUrl,params,cb,failcb);
	},
	getMerchantDeliveryOrder: function(params,cb,failcb){
		http.get(getMerchantDeliveryOrderUrl,params,cb,failcb);
	},
	/*setDefaultAddress: function(params,cb,failcb){
		http.json(editorAddressUrl,params,cb,failcb);
	},*/
	updateUserInfo: function(params,cb,failcb){
		http.post(updateUserUrl,params,cb,failcb);
	},
	editorAddress: function(params,cb,failcb){
		http.json(editorAddressUrl,params,cb,failcb);
	},
	updateMerchantShopTime: function(params,cb,failcb){
		http.post(updateMerchantShopTimeUrl,params,cb,failcb);
	},
	updateSupplierShopTime: function(params,cb,failcb){
		http.post(updateSupplierShopTimeUrl,params,cb,failcb);
	},
	getBaseInfo: function(cb){
		http.getBaseInfo(cb);
	},
	registerSupplier: function(params,cb,failcb){
		http.post(registerSupplierUrl,params,cb,failcb);
	},
	registerMerchant: function(params,cb,failcb){
		http.post(registerMerchantUrl,params,cb,failcb);
	},
	getMerchantInfo: function(params,cb,failcb){
		http.get(getMerchantInfoUrl,params,cb,failcb);
	},
	getSupplierInfo: function(params,cb,failcb){
		http.get(getSupplierInfoUrl,params,cb,failcb);
	},
	consumerConfirmReceive: function(params,cb,failcb){
		http.get(consumerConfirmReceiveUrl,params,cb,failcb);
	},
	getUserOrderList: function(params,cb,failcb){
		http.get(userOrderListUrl,params,cb,failcb);
	},
	userOrderSubmit: function(params,cb,failcb){
		http.post(userOrderSubmitUrl,params,cb,failcb);
	},
	getUserOrderInfo: function(params,cb,failcb){
		http.get(getUserOrderInfoUrl,params,cb,failcb);
	},
	cmOrderSave: function(params,cb,failcb){
		http.post(cmOrderSaveUrl,params,cb,failcb);
	},
	merchantGoodsList: function(params,cb,failcb){
		http.get(merchantGoodsListUrl,params,cb,failcb);
	},
	deleteAddress: function(params,cb,failcb){
		http.post(deleteAddressUrl,params,cb,failcb);
	},
	getAddressList: function(params,cb,failcb){
		http.get(getAddressListUrl,params,cb,failcb);
	},
	addNewAddress: function(params,cb,failcb){
		http.json(addNewAddressUrl,params,cb,failcb);
	},
	merchantConfirmReceive: function(params,cb,failcb){
		http.get(updateMsOrderStateUrl,params,cb,failcb);
	},
	getSupplierProduct:function(params,cb,failcb){
		http.get(getSupplierProductUrl,params,cb,failcb);
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
		http.get(getMerchantStockOrderUrl,params,cb,failcb);
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
