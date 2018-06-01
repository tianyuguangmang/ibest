import  http from "./http";


//分享者分到红包
const shareCanGetMoneyUrl = "/merchantredpacketaccount/user/redpacket/get";
const cateListUrl = "/cate/list";
const addNewGoodsUrl = "/supplier/product/add";
const supplierRegisterUrl = "/supplier/register";
const getSupplierGoodsListUrl = "/supplier/product/list";
const stockCartInfoSubmitUrl = "/msorder/save";
var Service = {
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
