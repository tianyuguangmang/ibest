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
	chooseImage: function (currentTarget) {
      var _this =　this;
      var _evaluateList = this.data.evaluateList;
      var _index = app.getData(currentTarget,"index");
      if(_this.data.hasClick){
          return false;
      }
      _this.setData({
          hasClick:true,
          colo: '#000'
      })
      var _count = _evaluateList[_index].imageList.length? _evaluateList[_index].imageList.length:0;
      if(_count==6){
          return false;
      }
      wx.chooseImage({
        count:6-_count,
        // count: _this.data.count[_this.data.countIndex],
        sizeType: ['original','compressed'],//原图、压缩图
        sourceType: ['album','camera'],//相片来源：相册、相机
        success: function (res) {
          var tempFilePaths = res.tempFilePaths;
          var _arr = '';
          for(let i = 0,_len = tempFilePaths.length;i<_len;i++){
            wx.uploadFile({
              url: 'https://upload.qiniup.com', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[i],
              name: 'file',
              formData:{
                "token":_this.data.token
              },
              success: function(res){
                var data = JSON.parse(res.data);
               _arr = _evaluateList[_index].imageList||[];
                var _imgPath = "https://img.chuanshangjia.com/"+data.key;
                _arr.push(_imgPath)
                _evaluateList[_index].imageList = _arr;
                _this.setData({
                    evaluateList:_evaluateList,
                    hasClick:false
                })
                
              },
              fail: function (res) {
                 _this.setData({
                    hasClick:false
                })
                
              }
            })
          }
        }
      })
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