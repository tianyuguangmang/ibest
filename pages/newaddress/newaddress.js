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
		phone:"18712300417",
		name:"天才",
		detail:"3号楼403",
		address:""
	},
	isEditor:null,
	onLoad:function(options){

		if(options.type == 1){
			this.isEditor = 1;
			var _address = app.globalData.selectedAddress;
			this.setData(_address);
		}
	},
	inputName:function(e){
		this.setData({
			name:e.detail.value
		})
	},
	inputPhone:function(e){
		this.setData({
			phone:e.detail.value
		})
	},
	inputAddress:function(e){
		this.setData({
			address:e.detail.value
		})
	},
	inputDetail:function(e){
		this.setData({
			detail:e.detail.value
		})
	},
	dataLoading:false,
	onSubmit: function(){
		var _this = this;
		var params = {
			name:this.data.name,
			phone:this.data.phone,
			address:this.data.address,
			detail:this.data.detail
		}
		if(!app.required(params.name)){
			wx.showModal({
			  title: '温馨提示',
			  content:"请输入姓名",
			  showCancel:false
			})
			return;
		}
		if(!app.phoneValidate(params.phone)){
			wx.showModal({
			  title: '温馨提示',
			  content:"请输入正确手机号",
			  showCancel:false
			})
			return;
		}
		if(!app.required(params.address)){
			wx.showModal({
			  title: '温馨提示',
			  content:"请输入地址",
			  showCancel:false
			})
			return;
		}

		if(!app.required(params.detail)){
			wx.showModal({
			  title: '温馨提示',
			  content:"请输入门牌号",
			  showCancel:false
			})
			return;
		}
		if(this.isEditor){
			params.addressId = this.data.addressId;
			params.userId = this.data.userId;
			params.isDefault = this.data.isDefault;
			service.editorAddress(params,function(res){

			})
			return;
		}
		if(this.dataLoading){return}
		_this.dataLoading = true;
		service.addNewAddress(params,function(res){
			_this.dataLoading = false;
			app.goBack("添加成功");
		},function(){
			_this.dataLoading = false;
		})
	}
})