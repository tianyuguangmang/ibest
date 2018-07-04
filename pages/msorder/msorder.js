

var service = require("../../js/service.js");
var app = getApp();
import * as Size from '../../js/imagesize';
var isSubmiting = false;
Page({
  data: {
    Size,
    cateId:1,
  
    
  },
  /**
   * 删除订单
   */
  deleteOrder:function(currentTarget){
    var dataId = app.getData(currentTarget,"id");
    var _index = app.getData(currentTarget,"index");
    var _this = this;
      wx.showModal({
      title: '提示',
      content: '确定要删除这个订单吗?',
      success: function(res) {
        if (res.confirm) {
           service.deleteOrder({id:dataId},function(res){
              var _finishList = _this.data.finishList;
              _finishList.splice(_index,1);
              _this.setData({
                finishList:_finishList
              })
            wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            });
        } else if (res.cancel) {
        
        }
      }
    })

  },
 
  onShow:function(){
    this.dataLoad(true);
  },
  toPay:function(currentTarget){
    var _dataId = app.getData(currentTarget,'id');
    var _index = app.getData(currentTarget,'index');
    if(isSubmiting){
      return false;
    }
    isSubmiting = true;
    service.getPayMsg({tradeId:_dataId},function(res){
      var _transId = res.data.results;
      service.prepay({transId:_transId},function(res){
       
        var _results = res.data.results;

        wx.requestPayment({
           'timeStamp': _results.timeStamp+"",
           'nonceStr': _results.nonceStr+"",
           'package': _results.packAge+"",
           'signType': 'MD5',
           'paySign': _results.paySign+"",
           'success':function(res){
            isSubmiting = false;
             wx.redirectTo({
                url: '/pages/myorder/myorder?id=3'
              })
           },
           'fail':function(res){
            isSubmiting = false;
           }
        })
      },function(){
      isSubmiting = false;
    })
    },function(){
      isSubmiting = false;
    })
  },
  changeCateId:function(currentTarget){
    var cateId = app.getData(currentTarget,"cateid");
    //类目保存
    this.cateId = cateId; 
    this.setData({
      cateId:cateId
    })
    this.dataLoad(true);
  },
    //滚动到底部，加载更多的数据
  onReachBottom:function(e){
    this.dataLoad(false);
  },
  // 下拉刷新
  onPullDownRefresh(){
    var _this = this;
    this.current = 0;
    this.dataLoad(true);
    wx.stopPullDownRefresh();
  },
  noMoreData:false,
  dataLoading:false,
  current:0,
  size:10,
  /**
   * 数据加载
   * @param  Boolean reload 是否重新加载
   * @return Boolean more   是否加载更多
   */
  cateId:1,
  dataLoad:function(reload){
    var _this = this;
    var params = {
      size:this.size,
      current:this.current+1
    };
    if(reload){
      params.current = 1;
      this.noMoreData = false;
    }
    var _id = Number(this.cateId);
    if(_id == 2){
      params.status = 'WAIT_PAY';
    }else if(_id == 3){
      params.status = 'PAID';
    }else if(_id == 4){
      params.status = 'WAIT_RECEIVE';
    }else if(_id == 5){
      params.status = 'FINISHED';
    }
    if(this.isMerchant){
      params.merchantId = this.baseInfo.merchantInfo.mchtId;
    }else{
      params.supplierId = this.baseInfo.supplierInfo.supId;
    }
    if(this.noMoreData){
      return;
    }
    
    this.getData(params,reload);
  },
  getData:function(params,reload){
    var _this = this;
    if(_this.noMoreData){
      return;
    }
    if(_this.dataLoading){
      return;
    }
    _this.dataLoading = true;
    service.getMerchantOrder(params,function(res){
      var originList = reload?[]:_this.data.dataList;
      var _list = res.data.result.list;
      if(_list.length == _this.size){
        _this.current = res.data.result.pageNum;
      }else{
        _this.noMoreData = true;
      }
      _list = originList.concat(_list);
      _this.setData({
        dataList:_list
      })
      _this.dataLoading = false;
    },function(){
      _this.dataLoading = false;
    })
  },
  baseInfo:null,
  isMerchant:null,
  createSocket:function(){
    var _this = this;
    console.log(_this.baseInfo);
    //var keyId = this.baseInfo;
    app.createSocket("supId_"+this.baseInfo.supplierInfo.supId,function(res){
      if(res.data == "success"){
        wx.showModal({
          title: '温馨提示',
          content:"有新的订单",
          showCancel:false,
          success:function(res){
            _this.dataLoad(true);
          }
        })
      }
    })
  },
  closeSocket:function(){
    app.closeSocket();
  },
  onHide:function(){
    this.closeSocket();
  },
  baseInfo:null,
  onLoad: function(options){
    var _this = this;
    this.baseInfo = app.globalData.baseInfo;
    if(options.type == 'MERCHANT'){
      this.isMerchant = 1;
      this.setData({
        isMerchant:1
      })
    }else{
      this.createSocket()
    }
    
  },
  remindBusiness:function(){
    var _phone = app.globalData.shopGlobalMsg.serviceTelphone;
     wx.makePhoneCall({
      phoneNumber: _phone //仅为示例，并非真实的电话号码
    })

  },
  refuseOrder:function(currentTarget){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要拒绝这个订单吗？',
      success: function(res) {
        if (res.confirm) {
          _this.updateOrderState(currentTarget,"REFUSE_ORDER");
        } else if (res.cancel) {
        }
      }
    })
  },
  deleteOrder:function(currentTarget){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除这个订单吗？',
      success: function(res) {
        if (res.confirm) {

        } else if (res.cancel) {
        }
      }
    })
  },
  cancelOrder:function(currentTarget){
    var _this = this;
    wx.showModal({
    title: '提示',
    content: '确定要取消这个订单吗？',
    success: function(res) {
      if (res.confirm) {
        _this.updateOrderState(currentTarget,"CANCEL_ORDER");
      } else if (res.cancel) {
      }
    }
  })
  },
  confirmReceive:function(currentTarget){
    this.updateOrderState(currentTarget,"CONFIRM_RECEIVE");
  },
  finished:function(currentTarget){
    this.updateOrderState(currentTarget,"FINISHED");
  },
  updateOrderState:function(currentTarget,state){
    var _this = this;
    var _id = app.getData(currentTarget,"id");
    var params = {
      orderId:_id,
      status:state
    };
    service.updateMsOrderState(params,function(res){
      wx.showToast({
        title:"操作成功",
        duration: 1000
      })
      _this.dataLoad(true);
    })
  },
  refund:function(){

  },
  orderDetail:function(){

  },
  callPhone:function(){
    var _phone = this.data.contactPhone;
     wx.makePhoneCall({
      phoneNumber: _phone //仅为示例，并非真实的电话号码
    })
  },
  toEvaluate:function(currentTarget){
    var _index = app.getData(currentTarget,"index");
    var _dataMsg = this.data.dataMsg;
    app.globalData.needEvaluateOrder = _dataMsg[_index];
    if(app.globalData.needEvaluateOrder){
      wx.navigateTo({
        url: '/pages/evaluateSubmit/evaluateSubmit'
      })
    }
    /* wx.showToast({
      title: '该功能未开启',
      icon: 'success',
      image:"../../images/warnicon.png",
      duration: 2000
    })*/

  }
})