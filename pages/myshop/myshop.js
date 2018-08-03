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
    effectiveTime:0,
    realName:'',
    phone:"",
    validCode:"",
    region: ['北京市', '北京市', '东城区'],
    address:null,
    longitude:null,
    ltitude:null,
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
  getValidateCode:function(){
    var _this = this;
    if(!app.phoneValidate(this.data.phone)){
      wx.showModal({
        title: '温馨提示',
        content:"请输入正确手机号",
        showCancel:false
      })
      return;
    }
    service.getValidateCode({phone:this.data.phone},function(){
      _this.timeCount(60);

    })

  },
  handleChooseLocation:function(){
    var _this = this;
    var _dataMsg = {};
    wx.chooseLocation({
      success:function(data){
        console.log(data);
        data.city = data.address.substring(0,data.address.indexOf("市")+1);
        _this.setData(data)
      },
      fail:function(res){
        _this.setData({
         res:res

        })
      }
    })
  },
  getSelectPos:function(){
    var _this = this;
    _this.handleChooseLocation();
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
  inputPassword:function(e){
    this.setData({
      password: e.detail.value
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
  dataLoading:false,
  onSubmit: function(){
    var _this = this;
    var params = {
      realName:this.data.realName,
      phone:this.data.phone,
      password:this.data.password,
      validCode:this.data.validCode,
      address:this.data.address,
      longitude:this.data.longitude,
      latitude:this.data.latitude,
      city:this.data.city
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
   
    if(!params.address||!app.required(params.address)){
      wx.showModal({
        title: '温馨提示',
        content:"请选择地址",
        showCancel:false
      })
      return;
    }
    if(this.dataLoading){
      return;
    }
    this.dataLoading = true;
    if(this.isMerchant == 1){
      service.registerMerchant(params,function(res){
        app.globalData.baseInfo = res.data.result;
        _this.dataLoading = false;
        app.goBack("已注册");
      },function(){
        _this.dataLoading = false;
      })
      return;
    }

    service.registerSupplier(params,function(res){
      app.globalData.baseInfo = res.data.result;
      _this.dataLoading = false;
      app.goBack("已注册");
    },function(){
      _this.dataLoading = false;
    })
  }
	
})