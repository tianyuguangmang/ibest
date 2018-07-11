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
    cartList:null,
    countMoney:0
  },
  selectedThisGoods:function(currentTarget){
    var _index = app.getData(currentTarget,"index");
    var _amount = this.data.countMoney;
    var _cartList = this.data.cartList;
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
  getProductByIds:function(){
    var _this = this;
    service.getMproductByIds({
      productIds:JSON.stringify(this.productIds)
    },function(res){
      var _list = res.data.result;
      var _amount = 0;
      for(var i=0;i<_list.length;i++){
        if(_this.cartInfo['pid_'+_list[i].productId+'_skuid_1']){
          _list[i].count = _this.cartInfo['pid_'+_list[i].productId+'_skuid_1'].count;
          _amount += _list[i].count * _list[i].resetPrice;
        }else{
          _list[i].count = 0;
        }
        _list[i].selected = true;
      }
      _this.setData({
        cartList:_list,
        countMoney:_amount
      })

    })
  },
  productIds:[],
  cartInfo:{},
  onShow:function(){
    var _this = this;
    var _cartInfo = wx.getStorageSync(app.CART_INFO);
    this.cartInfo = _cartInfo;
    console.log(_cartInfo);
    var _arr = [];
    var _amount = 0;
    for(var key in _cartInfo){
      /*_cartInfo[key].selected = true;
      _amount += _cartInfo[key].resetPrice*_cartInfo[key].count;*/
      _arr.push(_cartInfo[key].productId);
    }
    if(_arr.length>0){
      _this.productIds = _arr;
      this.getProductByIds();
    }else{
      _this.setData({
        cartList:[]
      })
    }
    
   /* _this.setData({
      cartList:_arr,
      countMoney:_amount
    })*/
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
  onSubmit:function(){
    var _arr = [];
    var _list = this.data.cartList;
    for(var i=0;i<_list.length;i++){
      if(_list[i].selected){
        _arr.push({
          productId:_list[i].productId,
          count:_list[i].count,
        });
      }
    }
    service.cmOrderSave({list:JSON.stringify(_arr),merchantId:this.merchantId},function(res){
      wx.navigateTo({
        url: '/pages/userordersubmit/userordersubmit'
      })

    })
  },
  merchantId:null,
  onLoad:function(){
    this.merchantId = app.globalData.merchantId||9;
    

  }
})