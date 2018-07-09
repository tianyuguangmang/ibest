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
		menuList:null,
		menuIndex:0,
		name:'',
		bankCard:'',
		phone:""
	},

	
	onLoad:function(options){
		this.getBankList();
	},
	//获取银行卡列表
	getBankList:function(){
		var _this = this;
		service.getBankList(null,function(res){
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
	inputBankCard:function(e){
		this.setData({
			bankCardNumber:e.detail.value
		})
	},
	inputPhone:function(e){
		this.setData({
			phone:e.detail.value
		})
	},
	inputName:function(e){
		this.setData({
			name:e.detail.value
		})
	},
	toSubmit:function(){
		var params = {
			userId:app.globalData.baseInfo.userId,
			realName:this.data.name,
			phone:this.data.phone,
			bankCardNumber:this.data.bankCardNumber,
			bankId:this.data.menuList[this.data.menuIndex].bankId,
			bankName:this.data.menuList[this.data.menuIndex].bankName,
			bankCode:this.data.menuList[this.data.menuIndex].bankCode
		}
		if(!app.required(params.realName)){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入姓名",
	        showCancel:false
	      })
	      return;
	    }
	    if(!app.required(params.phone)){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入手机号",
	        showCancel:false
	      })
	      return;
	    }

	    if(!app.required(params.bankCard)){
	      wx.showModal({
	        title: '温馨提示',
	        content:"请输入银行卡号",
	        showCancel:false
	      })
	      return;
	    }
	    service.addBankCard(params,function(res){
			app.goBack("保存成功");

		});
		

	}
})