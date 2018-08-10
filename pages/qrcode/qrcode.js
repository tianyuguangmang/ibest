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
		hotList: null
	},

  getQrCode:function(){
    service.getQrCode({},function(res){
      console.log(res);
      var url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token="+res.data.result;

    })
  },
  onLoad:function(){
    
  },
  onShow:function(){
    this.getQrCode();
    
  }
  
	
})