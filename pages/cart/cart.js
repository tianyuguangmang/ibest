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
      menuList:[{id:1,name:"今日推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"},{id:1,name:"推荐"}],
      bannerList:[{pic:'https://ps.ssl.qhimg.com/sdmt/179_135_100/t010b0a4aa5bb6941c4.jpg'}],
      cartList:[{
        id:1,
        title:'特价特价商品特价商特价',
        mainImage:'https://img.alicdn.com/tfs/TB1EkSvdr_I8KJjy1XaXXbsxpXa-350-350.jpg_240x240xz.jpg_.webp',
        originPrice:40,
        currentPrice:20,
        sku:"特价商品黑色",
        count:1,
      }]
    })
  }
})