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
  toSubmit:function(){
  	this.supplierRegister();
  },
  supplierRegister:function(){
  	var params = {
  		phone:"18754800737",
  		validCode:123
  	}
  	service.supplierRegister(params,function(res){
  		console.log(res);
  	});
  }
	
})