/**
 * @author tygm
 * @Date 2017/9/20
 */
var service = require("../../js/service.js");
var app = getApp();
import * as Size from '../../js/imagesize';
Page({
	data: {
		Size,
		
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
		this.setData({
			menuList:[{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"}],
			bannerList:[{pic:'https://ps.ssl.qhimg.com/sdmt/179_135_100/t010b0a4aa5bb6941c4.jpg'}],
			goodsList:[{
				id:1,
				title:'特价商品',
				mainImage:'https://ps.ssl.qhimg.com/sdmt/179_135_100/t010b0a4aa5bb6941c4.jpg',
				unitPrice:10,
				marketPrice:20
			},{
				id:1,
				title:'特价商品',
				mainImage:'https://ps.ssl.qhimg.com/sdmt/179_135_100/t010b0a4aa5bb6941c4.jpg',
				unitPrice:10,
				marketPrice:20
			},{
				id:1,
				title:'特价商品',
				mainImage:'https://ps.ssl.qhimg.com/sdmt/179_135_100/t010b0a4aa5bb6941c4.jpg',
				unitPrice:10,
				marketPrice:20
			}]
		})
	}
})