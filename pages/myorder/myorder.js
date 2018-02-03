

var service = require("../../js/service.js");
var app = getApp();
import * as Size from '../../js/imagesize';
var isSubmiting = false;
Page({
  data: {
    Size,
    cateId:2,
    phone:0,
    contactPhone:0,
    dataMsg:'',
    noDataTip:'',
    pageId:1,
    size:20,
    current:0,
    nullMoreData:false,
    dataLoading:false
    
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
 
  onShow:function(options){
    var _this = this;
    _this.noMoreData = false;
    _this.current = 0;
    _this.setData({
      dataMsg:[{
        shopName:"商铺名称",
        id:"192732948824",
        status:'TRADE_FINISHED',
        deliveryFee:10,
        totalFee:20,
        productList:[{
          title:"特价商品",
          sku:"褐色",
          originPrice:20,
          currentPrice:10,
          count:1,
          mainImage:"https://img.alicdn.com/tfs/TB1EkSvdr_I8KJjy1XaXXbsxpXa-350-350.jpg_240x240xz.jpg_.webp",
          productId:1
        }]
      }]
    })
    //_this.dataLoad(true); 
  },
  toPay:function(currentTarget){
    var _dataId = app.getData(currentTarget,'id');
    var _index = app.getData(currentTarget,'index');

   /* var params = {
      tradeId:_dataId
    };*/
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
           /* wx.switchTab({
              url: '/pages/paybill/paybill'
            })*/
           }
        })
      },function(){
      isSubmiting = false;
    })
      /*service.prepay({trans})*/

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
    var _obj = this.orderMap["order_"+cateId];
    if(_obj&&_obj.current){
      this.current = _obj.current;
    }else{
      this.current =0;
    }
    //判断这个类目中是否有值
    if(this.orderMap["order_"+this.cateId]&&this.orderMap["order_"+this.cateId].orderList){
      this.dataLoad(false,false);
    }else{
      this.dataLoad(true,false);
    }
    
    
    
  },
    //滚动到底部，加载更多的数据
  onReachBottom:function(e){
    this.dataLoad(false,true);
  },
     // 下拉刷新
  
  onPullDownRefresh(){
    var _this = this;
    //将所属类目中nomoredata 置为false
    this.orderMap["order_"+this.data.cateId].noMoreData = false;
    this.current = 0;
    this.dataLoad(true,false);
    wx.stopPullDownRefresh();
    
  
  },
 /* lower:function(){
    this.dataLoad();
  },*/
  dataLoading:false,
  noMoreData:false,
  current:0,
  size:20,
  orderMap:{},
  from:null,
  /**
   * 
   * @param  {[type]} reload 是否重新加载
   * @return {[type]}        [description]
   */
  dataLoad:function(reload,more){
  	console.log(111)
    var _this = this;
    var params = '';
    var _id = this.cateId*1;
    var _this = this;
    if(_id==1){
      params = {};
    }else if(_id == 2){
      params = {status:'WAIT_BUYER_PAY'};
    }else if(_id == 3){
       params = {status:'WAIT_SELLER_SEND_GOODS'};
    }
    else if(_id == 4){
       params = {status:'WAIT_BUYER_CONFIRM_GOODS'};
    }
    else if(_id == 5){
       params = {status:'TRADE_FINISHED'};
    }
    var orderMap = this.orderMap;
    //不是重新加载
    //不是加载更多
    //并且productMap 中存在 直接将数据取出使用
    if(!more&&!reload&&orderMap["order_"+_id]&&orderMap["order_"+_id].orderList){
      this.setData({
        dataMsg:orderMap["order_"+_id].orderList
      })
      return ;
    }
    
    if(orderMap["order_"+_this.cateId]&&orderMap["order_"+_this.cateId].noMoreData){
      return false;
    }
    if(this.dataLoading){
      return false;
    }
    _this.dataLoading = true;
    wx.showLoading({
      title:"加载中..."
    })
    console.log(this.from);
    if(this.from == 'distribute'){
      params.from = "distribute";
    }
    service.getOrderDataList(Object.assign(params,{current:_this.current+1,size:_this.size}),function(res){
      wx.hideLoading();
      var _arr = reload?[]:_this.data.dataMsg||[];
       _this.dataLoading = false;
       _this.current =_this.current+1;
      var noMoreData = false;
      var record = res.data.results.records;
      if(record){
        _arr = _arr.concat(record);
        if(record != _this.size){
          noMoreData = true;
        }
        _this.orderMap["order_"+_id] = {
          current:_this.current,
          noMoreData:noMoreData,
          orderList:_arr
        }
        _this.setData({
          dataMsg:_arr
        })
      }else{
       _this.dataLoading = false;
      }
    },function(res){
      wx.hideLoading();
      _this.dataLoading = false;
    })
  },
  cateId:0,
  onLoad: function(options){
    var _this = this;
    this.from = options.from;

    if(!options.id){
      var _id = 1;
    }else{
      var _id = options.id;
    }
    this.setData({
      cateId:_id
    })
    this.cateId = _id;

  
    
/*
    var phone = app.globalData.shopGlobalMsg.serviceTelphone;
    this.setData({
      contactPhone:phone
    })*/
   
  },
  remindBusiness:function(){
    var _phone = app.globalData.shopGlobalMsg.serviceTelphone;
     wx.makePhoneCall({
      phoneNumber: _phone //仅为示例，并非真实的电话号码
    })

  },
  deleteOrder:function(currentTarget){
    var _this = this;

      var _id = app.getData(currentTarget,"id");
      var params = {
        id:_id
      };
      wx.showModal({
        title: '提示',
        content: '确定要删除这个订单吗？',
        success: function(res) {
          if (res.confirm) {
             service.deleteOrder(params,function(res){
              wx.redirectTo({
                url: '/pages/myorder/myorder?id='+ _this.data.cateId
              })
            })
          } else if (res.cancel) {
          }
        }
      })
    

   
  },
  cancelOrder:function(currentTarget){
     var _this = this;
    var _id = app.getData(currentTarget,"id");
    var params = {
      id:_id
    };
    wx.showModal({
    title: '提示',
    content: '确定要取消这个订单吗？',
    success: function(res) {
      if (res.confirm) {
        service.cancelOrder(params,function(res){
          wx.redirectTo({
            url: '/pages/myorder/myorder?id='+ _this.data.cateId
          })
        })
      } else if (res.cancel) {
      }
    }
  })
   
  },
  confirmReceive:function(currentTarget){
     var _this = this;
    var _id = app.getData(currentTarget,"id");
    var params = {
      id:_id
    };
    service.confirmReceive(params,function(res){
     
     wx.redirectTo({
        url: '/pages/myorder/myorder?id='+ _this.data.cateId
      })
    })
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