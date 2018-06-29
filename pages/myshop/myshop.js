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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  inputName:function(e){
    this.setData({
      realName: e.detail.value
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
  toSubmit:function(){
  	this.supplierRegister();
  },
  isMerchant:null,
  onLoad:function(options){
    if(options.type == "MERCHANT"){
      this.isMerchant = 1;
    }
  },
  onSubmit: function(){
    var params = {
      realName:this.data.realName,
      phone:this.data.phone,
      validCode:this.data.validCode
    }
    if(!app.required(params.realName)){
      wx.showModal({
        title: '温馨提示',
        content:"请输入姓名",
        showCancel:false
      })
      return;
    }
    if(!app.phoneValidate(params.phone)){
      wx.showModal({
        title: '温馨提示',
        content:"请输入正确手机号",
        showCancel:false
      })
      return;
    }

    if(!app.required(params.validCode)){
      wx.showModal({
        title: '温馨提示',
        content:"请输入验证码",
        showCancel:false
      })
      return;
    }
    if(this.isMerchant == 1){
      service.registerMerchant(params,function(res){
        app.goBack("请等待审核");
      })
      return;
    }

    service.registerSupplier(params,function(res){
      app.goBack("请等待审核");

    })
  }
	
})