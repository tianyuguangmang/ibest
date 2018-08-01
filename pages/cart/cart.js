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
      countMoney:Math.round(_amount*100)/100
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
        _list[i].originPrice = app.dot2(_list[i].originPrice);
        _list[i].resetPrice = app.dot2(_list[i].resetPrice);
        if(_this.cartInfo['pid_'+_list[i].productId+'_skuid_1']){
          _list[i].count = _this.cartInfo['pid_'+_list[i].productId+'_skuid_1'].count;
          _amount += _list[i].count * _list[i].resetPrice;
        }else{
          _list[i].count = 0;
        }
        _list[i].selected = true;
      }
      _amount = Math.round(_amount*100)/100
      var _needAmount = Math.round((_this.merchantInfo.sendPrice - _amount)*100)/100
      _this.setData({
        cartList:_list,
        countMoney:_amount.toFixed(2),
        needAmount:_needAmount.toFixed(2) 
      })

    })
  },
  
  productIds:[],
  cartInfo:{},
  merchantInfo:null,
  onShow:function(){
    var _this = this;
    this.merchantId = app.globalData.merchantId;
    if(app.globalData.merchantInfo){
      this.merchantInfo = app.globalData.merchantInfo
      this.setData({
        merchantInfo:app.globalData.merchantInfo
      })
    }
    var _cartInfo = wx.getStorageSync(app.CART_INFO);
    this.cartInfo = _cartInfo;
    var _arr = [];
    var _amount = 0;
    for(var key in _cartInfo){
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
    this.refush();
  },
  /**
   * 计算购物车
   * @param  Number num +-数量
   * @return null
   */
  calcCart:function(index,num){
    var cartList = this.data.cartList;
    var _select = cartList[index];
    var _cartInfo = this.cartInfo;
    var _amount = 0;
    var _info = _cartInfo['pid_'+_select.productId+'_skuid_1'];
    if(_info){
      _info.count += num;
      if(_info.count<0){
        _info.count = 0;
      }
    }else{
      _info = {
        count:1,
        productId:_select.productId,
      }
    }
    _cartInfo['pid_'+_select.productId+'_skuid_1'] = _info;
    cartList[index].count = _info.count;
    for(var i = 0;i<cartList.length;i++){
      _amount += cartList[i].count * cartList[i].resetPrice;
    }
    _amount = Math.round(_amount*100)/100
    var _needAmount = Math.round((this.merchantInfo.sendPrice - _amount)*100)/100
    this.setData({
      cartList:cartList,
      countMoney:_amount.toFixed(2),
      needAmount:_needAmount.toFixed(2)
    })
    wx.setStorageSync(app.CART_INFO, _cartInfo);
  },
  //减少购物车数量
  decrease:function(currentTarget){
    var index = app.getData(currentTarget,"index");
    this.calcCart(index,-1);
  },
  //增加购买车
  add:function(currentTarget){
    var index = app.getData(currentTarget,"index");
    this.calcCart(index,1);
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

  refush:function(){
    if(app.globalData.merchantInfo){
      this.setData({
        merchantInfo:app.globalData.merchantInfo
      })
    }
  },
  onLoad:function(){
    

    

  }
})