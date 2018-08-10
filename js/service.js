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
//获取商品详情
const getSproductDetailUrl = "/supplier/product/detail";
const getMproductDetailUrl = "/merchant/product/detail";
//更新供应商商品数据
const updateSproductGoodsUrl = "/supplier/product/update";
//更新商家商品
const updateMproductGoodsUrl = "/merchant/product/update";
//获取银行卡列表
const getBankCardListUrl= "/bankcard/list";
//各个银行的信息
const getBankListUrl = "/bank/list";
//添加银行卡
const addBankCardUrl = "/bankcard/add";
//删除银行卡
const deleteBankCardUrl = "/bankcard/delete";
//提现
const withdrawUrl = "/withdraw/add";
//通过商品id 批量获取
const getMproductByIdsUrl = "/merchant/product/cartlist";
//图片上传七牛token
const qiniuTokenUrl = "/qiniu/token";
//商家的基础信息
const merchantBaseInfoUrl = "/merchant/shop/baseinfo";
//商家进货时的购物车数据
const stockCartListUrl = "/supplier/product/cartlist";
//获取订单的token
const getOrderTokenUrl = "/order/token";
//手机短信验证码
const getValidateCodeUrl = "/phone/code";
//普通用户支付
const userPayUrl = "/wx/pay/cmorder";
//商家支付
const userPayMsOrderUrl = "/wx/pay/msorder";
//更新状态
const updateMsOrderStatusUrl = "/msorder/update";
const getQrCodeUrl = "/wx/qrcode";
var Service = {
	getQrCode: function(params,cb,failcb){
		http.get(getQrCodeUrl,params,cb,failcb);
	},
	updateMsOrderStatus: function(params,cb,failcb){
		http.post(updateMsOrderStatusUrl,params,cb,failcb);
	},
	userPayMsOrder: function(params,cb,failcb){
		http.post(userPayMsOrderUrl,params,cb,failcb);
	},
	userPay: function(params,cb,failcb){
		http.post(userPayUrl,params,cb,failcb);
	},
	getValidateCode: function(params,cb,failcb){
		http.get(getValidateCodeUrl,params,cb,failcb);
	},
	getStockCartList: function(params,cb,failcb){
		http.get(stockCartListUrl,params,cb,failcb);
	},
	getOrderToken: function(params,cb,failcb){
		http.get(getOrderTokenUrl,params,cb,failcb);
	},
	updateMproductGoods: function(params,cb,failcb){
		http.post(updateMproductGoodsUrl,params,cb,failcb);
	},
	updateMerchantBaseInfo: function(params,cb,failcb){
		http.post(merchantBaseInfoUrl,params,cb,failcb);
	},
	qiniuToken: function(params,cb,failcb){
		http.get(qiniuTokenUrl,params,cb,failcb);
	},
	getMproductByIds: function(params,cb,failcb){
		http.get(getMproductByIdsUrl,params,cb,failcb);
	},
	withdraw: function(params,cb,failcb){
		http.json(withdrawUrl,params,cb,failcb);
	},
	supplierWithdraw: function(params,cb,failcb){
		http.json(supplierWithdrawUrl,params,cb,failcb);
	},
	deleteBankCard: function(params,cb,failcb){
		http.get(deleteBankCardUrl,params,cb,failcb);
	},
	addBankCard: function(params,cb,failcb){
		http.json(addBankCardUrl,params,cb,failcb);
	},
	getBankList: function(params,cb,failcb){
		http.get(getBankListUrl,params,cb,failcb);
	},
	getBankCard: function(params,cb,failcb){
		http.get(getBankCardListUrl,params,cb,failcb);
	},
	updateSproductGoods: function(params,cb,failcb){
		http.json(updateSproductGoodsUrl,params,cb,failcb);
	},
	getMproductDetail: function(params,cb,failcb){
		http.get(getMproductDetailUrl,params,cb,failcb);
	},
	getSproductDetail: function(params,cb,failcb){
		http.get(getSproductDetailUrl,params,cb,failcb);
	},
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
		http.get(merchantGoodsListUrl,params,cb,failcb,1);
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
