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
		productId:null,
		name:'',
		resetPrice:'',
		stock:"",
	},
	
	productId:null,
	stock:0,
	getProductDetail:function(){
		var _this = this;
		service.getMproductDetail({productId:this.productId},function(res){
			var productDetail = res.data.result;
			productDetail.resetPrice = app.dot2(productDetail.resetPrice);
			_this.stock = productDetail.stock;
			_this.setData(productDetail)
		})
	},
	
	onLoad:function(options){
		this.productId = options.productId;
		if(this.productId){
			this.getProductDetail();
		}
	},
	
	inputName:function(e){
		this.setData({
			name:e.detail.value
		})
	},
	inputResetPrice:function(e){
		this.setData({
			resetPrice:e.detail.value
		})
	},
	inputStock:function(e){
		var _value = e.detail.value>this.stock?this.stock:e.detail.value;
		this.setData({
			stock:_value
		})
	},
	dataLoading:false,
	toSubmit:function(){
		var _this = this;
		var params = {
			resetPrice:this.data.resetPrice,
			stock:this.data.stock,
			productId:this.data.productId
		}
	    if(!app.required(params.resetPrice)){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入商品价格",
	        showCancel:false
	      })
	      return;
	    }
	    if(params.resetPrice<this.data.originPrice*0.01){
	      wx.showModal({
	        title: '温馨提示',
	        content:"商品价格不能低于"+this.data.originPrice*0.01+"元",
	        showCancel:false
	      })
	      return;
	    }
	    if(!app.dot2(params.resetPrice)){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入正确商品价格",
	        showCancel:false
	      })
	      return;
	    }
	    if(params.stock<0){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入正确的商品库存",
	        showCancel:false
	      })
	      return;
	    }
	   
	    if(this.dataLoading){
	    	return;
	    }
	    this.dataLoading = true;
	    wx.showModal({
	        title: '温馨提示',
	        content:"确定修改完成吗？",
	        showCancel:true,
	        success:function(){
	        	params.resetPrice = params.resetPrice*100;
	        	service.updateMproductGoods(params,function(res){
        		_this.dataLoading = false;
					app.goBack("已提交");
				},function(){
					_this.dataLoading = false;
				});
	        },
	        fail:function(){
	        	_this.dataLoading = false;
	        }
	    })
	    
	},
	hasClick:false,
	imgList:[],
	//商品添加时候图片上传
	uploadImage:function(cb){
		var _this = this;
		var localImgList = _this.data.localImgList;
		for(let i =0,len = localImgList.length;i<len;i++){
			wx.uploadFile({
			  //url: 'https://upload.qiniup.com', //接口地址
			  url: 'https://upload.qiniup.com', //接口地址
			  filePath: localImgList[i],
			  name: 'file',
			  formData:{
			    "token":_this.data.token
			  },
			  success: function(res){
			    var data = JSON.parse(res.data);
			    var _imgPath = "http://oznoulcwg.bkt.clouddn.com/"+data.key;
			    _this.imgList.push(_imgPath);
			    _this.dataLoading = false;
			    if(cb&&(i==localImgList.length-1))cb();
			  },
			  fail: function (res) {
			  	_this.dataLoading = false;
			    
			  }
			})
		}
	},
	//商品更改信息图片上传
	uploadImage2:function(cb){
		var _this = this;
		var localImgList = _this.data.localImgList;
		var changeIndex = _this.data.changeIndex;
		for(let i =0,len = localImgList.length;i<len;i++){
			if(changeIndex["img"+i]){
				wx.uploadFile({
				  //url: 'https://upload.qiniup.com', //接口地址
				  url: 'https://upload.qiniup.com', //接口地址
				  filePath:changeIndex["img"+i],
				  name: 'file',
				  formData:{
				    "token":_this.data.token
				  },
				  success: function(res){
				  	_this.dataLoading = false;
				    var data = JSON.parse(res.data);
				    var _imgPath = "http://oznoulcwg.bkt.clouddn.com/"+data.key;
				    _this.imgList[i] = _imgPath;
				    if(cb&&(i==localImgList.length-1))cb();
				  },
				  fail: function (res) {
				    _this.dataLoading = false;
				  }
				})
			}else{
				if(cb)cb();
			}
			
		}
	},
	imgIndex:0,
	chooseImage: function (currentTarget) {
	    var _this =　this;
	    var _localImgList = this.data.localImgList;
	    var _index = app.getData(currentTarget,"index");
	    var changeIndex = this.data.changeIndex;
	    if(_this.hasClick){
	        return false;
	    }
	    _this.hasClick = true;
	    var _count = _localImgList.length;
	    if(_index===undefined&&_count==6){
	        return false;
	    }
	    wx.chooseImage({
		    count:_index===undefined?6-_count:1,
		    // count: _this.data.count[_this.data.countIndex],
		    sizeType: ['original','compressed'],//原图、压缩图
		    sourceType: ['album','camera'],//相片来源：相册、相机
		    success: function (res) {
		      var tempFilePaths = res.tempFilePaths;
		      if(_index!==undefined){
		      	_localImgList[_index] = tempFilePaths[0];
		      	changeIndex["img"+_index] = tempFilePaths[0];
		      }else{
		      	for(var i=0;i<tempFilePaths.length;i++){
		      		changeIndex["img"+(i+_localImgList.length)] = tempFilePaths[i];
		      	}
		      	_localImgList = _localImgList.concat(tempFilePaths);

		      }
		      _this.hasClick = false;
		      _this.setData({
		      	localImgList:_localImgList
		      })
		    },
		    fail:function(){
		    	_this.hasClick = false;
		    }
	    })
	  },
})