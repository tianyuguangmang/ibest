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
		cateId:1
		
	},
	cateId:1,
	changeCateId:function(currentTarget){
	    var cateId = app.getData(currentTarget,"cateid");
	    //类目保存
	    this.cateId = cateId; 
	    this.setData({
	      cateId:cateId
	    })
	    this.dataLoad(true);
	},
	dataLoad:function(reload){
	    var _this = this;
	    var params = {
	      size:this.size,
	      current:this.current+1,
	    };
	    if(reload){
	      params.current = 1;
	      this.noMoreData = false;
	    }
	    if(this.isMerchant){
	      params.merchantId = this.baseInfo.merchantInfo.mchtId;
	    }else{
	      params.supplierId = this.baseInfo.supplierInfo.supId;
	    }
	    var _id = Number(this.cateId);
	    if(_id == 2){
	      params.status = 'WAIT_CHECK';
	    }else if(_id == 3){
	      params.status = 'PASS_CHECK';
	    }else if(_id == 4){
	      params.status = 'REFUSE_CHECK';
	    }else if(_id == 5){
	      params.status = 'STOP_USE';
	    }
	    if(this.noMoreData){
	      return;
	    }
	    this.getData(params,reload);
	},
	noMoreData:false,
  dataLoading:false,
  current:0,
  size:10,
	getData:function(params,reload){
    var _this = this;
    if(_this.noMoreData){
      return;
    }
    if(_this.dataLoading){
      return;
    }
    _this.dataLoading = true;
    if(this.isMerchant == 1){
    	this.getMerchantProduct(params,reload);
    }else{
    	this.getSupplierProduct(params,reload);
    }
  },
	getSupplierProduct:function(params,reload) {
		var _this = this;
		service.getSupplierProduct(params,function(res){
      var originList = reload?[]:_this.data.dataList;
      var _list = res.data.result.list;
      if(_list.length == _this.size){
        _this.current = res.data.result.pageNum;
      }else{
        _this.noMoreData = true;
      }
      _list = originList.concat(_list);
      _this.setData({
        dataList:_list
      })
      _this.dataLoading = false;
    },function(){
      _this.dataLoading = false;
    })
	},
	getMerchantProduct:function(params,reload) {
		var _this = this;
		service.getMerchantProduct(params,function(res){
      var originList = reload?[]:_this.data.dataList;
      var _list = res.data.result.list;
      if(_list.length == _this.size){
        _this.current = res.data.result.pageNum;
      }else{
        _this.noMoreData = true;
      }
      _list = originList.concat(_list);
      _this.setData({
        dataList:_list
      })
      _this.dataLoading = false;
    },function(){
      _this.dataLoading = false;
    })
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
	isMerchant:false,
	onLoad:function(options){
		this.baseInfo = app.globalData.baseInfo;
		this.type = options.type;
		if(this.type == 'MERCHANT'){
			this.isMerchant = true;
		}
		
		
	},
	onShow:function(){
		this.dataLoad(true);
	}
})