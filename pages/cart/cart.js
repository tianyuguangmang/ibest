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
    cartList:[]
    
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
        // 
        // 
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
  selectedThisGoods:function(currentTarget){
    var _index = app.getData(currentTarget,"index");
    var _cartList = this.data.cartList;
    if(_cartList[_index].selected){
      _cartList[_index].selected = false;
    }else{
      _cartList[_index].selected = true;
    }
    this.setData({
      cartList:_cartList
    })
    

  },
  onShow:function(){
    var _this = this;
    var _cartInfo = wx.getStorageSync('shop_cart_info');
    var _arr = [];
    for(var key in _cartInfo){
      _arr.push(_cartInfo[key]);
    }
    console.log(_cartInfo);
    _this.setData({
      cartList:_arr
    })
    /*wx.getStorage({
      key: 'shop_cart_info',
      success: function(res) {
          console.log("x",res);

          
          _this.setData({
            cartList:res.data,
          })
      } 
    })*/
  },
  onLoad:function(){
  }
})