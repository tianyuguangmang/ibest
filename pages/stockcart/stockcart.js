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
    cartList:[],
    countMoney:0
    
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
    var _amount = this.data.countMoney;
    if(_cartList[_index].selected){
      _cartList[_index].selected = false;
      _amount -= _cartList[_index].resetPrice*_cartList[_index].count;
    }else{
      _cartList[_index].selected = true;
      _amount += _cartList[_index].resetPrice*_cartList[_index].count;
    }
    this.setData({
      cartList:_cartList,
      countMoney:_amount
    })
    

  },
  cartInfoSubmit:function(){
    var _list = this.data.cartList;
    var _arr = [];
    for(var i = 0;i<_list.length;i++){
      if(_list[i].selected){
        _arr.push({
          productId:_list[i].productId,
          count:_list[i].count,
          supplierId:_list[i].supplierId
        });
      }
    }

    if(_arr.length<=0){
      wx.showModal({
        title: '温馨提示',
        content:"请选择商品",
        showCancel:false
      })
      return;
    }
    service.stockCartInfoSubmit({list:JSON.stringify(_arr)},function(res){
      wx.redirectTo({
      url: '/pages/stockordersubmit/stockordersubmit'
    })
      console.log(res);
    });

  },
  onShow:function(){
    var _this = this;
    var _cartInfo = wx.getStorageSync('shop_cart_info');
    console.log(_cartInfo);
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