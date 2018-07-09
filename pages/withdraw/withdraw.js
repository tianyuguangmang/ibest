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
    realName:'',
    phone:"",
    validCode:"",
    amount:"",
    region: ['北京市', '北京市', '东城区'],
	},
	timeCount:function(s){
    var _this = this;
    var _results = s||this.data.effectiveTime;
    //disEndTime
    var _timer = setInterval(function(){
      
        if(_results>0){
          _results -=1;
        }else{
          clearInterval(_timer);
        }
      _this.setData({
        effectiveTime:_results
        
      })

    },1000)
  },
  allAmount:function(){
    this.setData({
      amount:5000
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  inputAmount:function(e){
    this.setData({
      amount: e.detail.value
    })
  },
  inputPhone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  inputValidate:function(e){
    this.setData({
      validCode: e.detail.value
    })
  },

  isMerchant:null,
  onLoad:function(options){
    if(options.type == "MERCHANT"){
      this.isMerchant = 1;
    }
  },
  onShow:function(){
    if(app.globalData.selectedBankCard){
      this.setData({
        selectedBankCard:app.globalData.selectedBankCard
      })
    }
  },
  onSubmit: function(){
    var bankCard = this.data.selectedBankCard;
    console.log(bankCard);
    if(!bankCard){
      wx.showModal({
        title: '温馨提示',
        content:"请选择银行卡",
        showCancel:false
      })
      return;
    }
    var params = {
      amount:this.data.amount,
      userId:app.globalData.baseInfo.userId,
      bankCardNumber:bankCard.bankCardNumber,
      bankCardId:bankCard.bankCardId,
      type:0
    }
    if(!app.required(params.amount)){
      wx.showModal({
        title: '温馨提示',
        content:"请输入金额",
        showCancel:false
      })
      return;
    }
    if(this.isMerchant == 1){
      params.type = 1;
    }
    service.withdraw(params,function(res){
      app.goBack("请等待");
    })
  }
	
})