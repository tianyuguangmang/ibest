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
		noMoreData: false,
		hotList: null,
		menuList:null,
		productId:null,
		localImgList:[],
		imgList:[],
		changeIndex:{},
		menuIndex:0,
		name:'',
		originPrice:'',
		stock:"",
		baseCount:''
	},
	
	productId:null,
	dataComputed:function(_menuList,productDetail){
		var _menuIndex = null;
		for(var i=0;i<_menuList.length;i++){
			if(_menuList[i].cateId == productDetail.cateId){
				_menuIndex = i;
				break;
			}
		}
		this.setData({
			menuList:_menuList,
			menuIndex:_menuIndex,
			...productDetail
		})

	},
	getProductDetail:function(){
		var _this = this;
		service.getSproductDetail({productId:this.productId},function(res){
			var productDetail = res.data.result;
			if(res.data.result.imgList){
				productDetail.localImgList = JSON.parse(res.data.result.imgList);
				_this.imgList = JSON.parse(res.data.result.imgList);
			}else{
				productDetail.localImgList = [];
				_this.imgList = [];
			}
			var _menuList = _this.data.menuList;
			if(_menuList == null){
				_this.getCateList(function(response){
					 _menuList = response.data.result;

					_this.dataComputed(_menuList,productDetail);
				});
				return;
			}
			_this.dataComputed(_menuList,productDetail);
		})
	},
	getQiNiuToken:function(){
		var _this = this;
		service.qiniuToken(null,function(res){
			_this.setData({
				token:res.data.result
			})
		})
	},
	onLoad:function(options){
		this.getCateList();
		this.getQiNiuToken();
		this.productId = options.productId?options.productId:null;
		if(this.productId){
			this.getProductDetail();
		}
		
	},
	//获取分类列表
	getCateList:function(cb){
		var _this = this;
		service.getCateList(null,function(res){
			if(cb){
				cb(res);
				return;
			}
			_this.setData({
				menuList:res.data.result
			})
		});
	},
	bindPickerChange: function(e) {
	  console.log('picker发送选择改变，携带值为', e.detail.value)
	  this.setData({
	    menuIndex: e.detail.value
	  })
	},
	inputBaseCount:function(e){
		this.setData({
			baseCount:e.detail.value
		})
	},
	inputName:function(e){
		this.setData({
			name:e.detail.value
		})
	},
	inputOriginPrice:function(e){
		this.setData({
			originPrice:e.detail.value
		})
	},
	inputStock:function(e){
		this.setData({
			stock:e.detail.value
		})
	},
	dataLoading:false,
	toSubmit:function(){
		var _this = this;
		var params = {
			name:this.data.name,
			originPrice:this.data.originPrice,
			stock:this.data.stock,
			baseCount:this.data.baseCount,
			cateId:this.data.menuList[this.data.menuIndex].cateId
		}
		if(!app.required(params.name)){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入商品名称",
	        showCancel:false
	      })
	      return;
	    }
	    if(!app.required(params.originPrice)){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入商品价格",
	        showCancel:false
	      })
	      return;
	    }

	    if(!app.required(params.stock)){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入商品库存",
	        showCancel:false
	      })
	      return;
	    }
	    if(this.data.localImgList.length == 0){
	    	wx.showModal({
	        title: '温馨提示',
	        content:"请上传商品图片",
	        showCancel:false
	      })
	      return;
	    }
	   	console.log("123");
	    if(this.dataLoading){
	    	return;
	    }
	    console.log("123");
	    this.dataLoading = true;
	    if(this.productId){
	    	params.productId = this.productId
	    	this.uploadImage2(function(){
	    		params.mainImage = _this.imgList[0];
	    		params.imgList = JSON.stringify(_this.imgList);

		    	wx.showModal({
			        title: '温馨提示',
			        content:"确定修改完成吗？",
			        showCancel:false,
			        success:function(){
			        	service.updateSproductGoods(params,function(res){
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
		    })
		    return;
	    }
	    this.uploadImage(function(){
	    	params.mainImage = _this.imgList[0];
	    	params.imgList = JSON.stringify(_this.imgList);
	    	wx.showModal({
	        title: '温馨提示',
	        content:"确定要以"+params.originPrice+"元/"+params.baseCount+"个(件)"+"销售此商品吗？",
	        showCancel:false,
	        success:function(){
	        	service.addNewGoods(params,function(res){
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