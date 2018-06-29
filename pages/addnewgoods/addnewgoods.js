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
		menuIndex:0,
		name:'',
		originPrice:'',
		stock:"",
		baseCount:''
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
	onLoad:function(){
		this.getCateList();
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
	toSubmit:function(){
		var params = {
			name:this.data.name,
			mainImage:"https://img.alicdn.com/tfs/TB1EkSvdr_I8KJjy1XaXXbsxpXa-350-350.jpg_240x240xz.jpg_.webp",
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
	    wx.showModal({
	        title: '温馨提示',
	        content:"确定要以"+params.originPrice+"元/"+params.baseCount+"个(件)"+"销售此商品吗？",
	        showCancel:false,
	        success:function(){
	        	service.addNewGoods(params,function(res){
					app.goBack("已提交");

				});
	        }
	    })
		

	}
})