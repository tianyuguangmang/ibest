var app = getApp();
let MERCHANTID = app.globalData.MERCHANTID;
var BaseUrl = app.globalData.baseUrl;

/**
 * [request description]
 * @param  {[type]} contentType content-type的参数
 * @param  {String} type        请求类型
 * @param  {String} url         请求路径
 * @param  {Object} params 		请求参数
 * @param  {Function} successcb   [成功的回调]
 * @param  {Function} failcb      [失败的回调]
 * @return {[type]}             [description]
 */
function request(contentType,type,url,params,successcb,failcb){
	wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: params,
      method:type,
      header: {
          'content-type': contentType
      },
      success: function(res) {
      	
      	if(res.data.code == 200){
      		successcb(res);
      	}else{
      		wx.hideLoading();
      		wx.showModal({
			  title: '温馨提示',
			  content:res.data.errors,
			  showCancel:false,
			  success: function(res) {
			    if (res.confirm) {
			      
			    } else if (res.cancel) {
			      
			    }
			  }
			})
			if(failcb){
				failcb(res);
			}
      	}
  	
      },
      fail:function(res){
      	wx.hideLoading();   
      	if(res.errMsg.indexOf('timeout')>0){
      		wx.showModal({
			  title: '提示',
			  content: '请求超时',
			  showCancel:false,
			  success: function(res) {
			    if (res.confirm) {
			      
			    } else if (res.cancel) {
			      
			    }
			  }
			})

      	}else{
      		wx.showModal({
			  title: '请求失败',
			  content: '无法连接网络，请检查网络环境',
			  showCancel:false,
			  success: function(res) {
			    if (res.confirm) {
			      
			    } else if (res.cancel) {
			      
			    }
			  }
			})

      	}
      	if(failcb){
      		failcb(res);
      	}
      	
      }
    })
}
var http = {
	login:function(url,params,cb,failcb){
		
		request('application/x-www-form-urlencoded','GET',url,params,cb,failcb);
	},
	json:function(url,params,cb,failcb){
		if(!params){
			params = {}
		}
		var _openId = app.globalData.openId;
			if(_openId){
				params.mid = MERCHANTID;
				params.openid = _openId;
				params = JSON.stringify(params);
				request("application/json","POST",url,params,cb,failcb);
			}else{
			 	wx.login({
				    success: function(res) {
				      if (res.code) {
				        //发起网络请求
				        http.login(LoginUrl,{mid:MERCHANTID,code:res.code},function(res){
				        	
					    var _openId = res.data.results.user.bindOpenId;
					   
					    app.globalData.openId = _openId;
					    params.mid = MERCHANTID;
					    params.openid = _openId;
					     params = JSON.stringify(params);
					      
					    request("application/json","POST",url,params,cb,failcb);
				        },failcb)
				      } 
				    }
				});

			}	
	},
	get:function(url,params,cb,failcb,notNeedOpenId){
		if(!params){
			params = {}
		}
		if(notNeedOpenId){
			params.mid = MERCHANTID;
			request('application/x-www-form-urlencoded',"GET",url,params,cb,failcb);
		}else{
			var _openId = app.globalData.openId;
			if(_openId){
				params.mid = MERCHANTID;
				params.openid = _openId;
				request('application/x-www-form-urlencoded',"GET",url,params,cb,failcb);
			}else{
			 	wx.login({
				    success: function(res) {
				      if (res.code) {
				        //发起网络请求
				        http.login(LoginUrl,{mid:MERCHANTID,code:res.code},function(res){
				        	
					    var _openId = res.data.results.user.bindOpenId;
					   
					    app.globalData.openId = _openId;
					    params.mid = MERCHANTID;
					    params.openid = _openId;
					    request('application/x-www-form-urlencoded',"GET",url,params,cb,failcb);
				        })
				      } else {
				   
				      }
				    }
				});

			}	

		}
		
		
		
	},

	post:function(url,params,cb,failcb){
		if(!params){
			params = {}
		}
		var _openId = app.globalData.openId;
		if(_openId){
			params.mid = MERCHANTID;
			params.openid = _openId;
			request('application/x-www-form-urlencoded',"POST",url,params,cb,failcb);
		}else{
		 	wx.login({
			    success: function(res) {
			      if (res.code) {
			        //发起网络请求
			        http.login(LoginUrl,{mid:MERCHANTID,code:res.code},function(res){
			        	
				    var _openId = res.data.results.user.bindOpenId;
				   
				    app.globalData.openId = _openId;
				    params.mid = MERCHANTID;
				    params.openid = _openId;
				    
				     request('application/x-www-form-urlencoded',"POST",url,params,cb,failcb);
			        },failcb)
			      } else {
			      }
			    }
			});

		}
	}
}

//分享者分到红包
const shareCanGetMoneyUrl = BaseUrl + "/merchantredpacketaccount/user/redpacket/get";
const CateList = BaseUrl + "/cate/list";

var Service = {
	getCateList:function(params,cb,failcb){
		http.get(CateList,params,cb,failcb,1)
	},

	shareCanGetMoney:function(params,cb){
		http.post(shareCanGetMoneyUrl,params,cb)
	},
	

}
module.exports = Service;
