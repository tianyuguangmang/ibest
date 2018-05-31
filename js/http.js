var app = getApp();
var BaseUrl = app.globalData.baseUrl;
var OpenId = app.globalData.openId;
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
	params= params?params:{};
  var _header = {
  	"content-type": contentType,
  }
  if(OpenId){
  	_header.openId = OpenId;
  }
	wx.request({
    url: BaseUrl + url, //接口地址
    data: type=="JSON_POST"?JSON.stringify(params):params,
    method:type=="JSON_POST"?"POST":type,
    header:_header,
    success: function(res) {
    	if(res.data.code == 200){
    		successcb(res);
    	}else{
    		wx.hideLoading();
    		wx.showModal({
				  title: '温馨提示',
				  content:res.data.error,
				  showCancel:false,
				  success: function(res) {
				    if (res.confirm) {
				      if(failcb){
								failcb(res);
							}
				    } else if (res.cancel) {
				      
				    }
				  }
				})
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
				      if(failcb){
								failcb(res);
							}
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
				      if(failcb){
								failcb(res);
							}
				    } else if (res.cancel) {
				      
				    }
				  }
				})
      }
    }
  })
}
const http = {
	login:function(url,params,cb,failcb){
		request('application/x-www-form-urlencoded',"GET",url,params,cb,failcb);
		
	},
	httpRequest:function(contentType,type,url,params,cb,failcb,notNeedOpenId){
		//需要用户openid 并且用户openId不存在
		if(!notNeedOpenId&&!OpenId){
			wx.login({
			  success: function(res) {
			    if (res.code) {
			    	console.log(res);
			      //发起网络请求
			      http.login("/user/wxcode",{wxcode:res.code},function(res){
				  		var _openId = res.data.result.openId;
				  		app.globalData.openId = _openId;
				  		OpenId = _openId;
				  		app.globalData.baseInfo = res.data.result;
					 		request(contentType,type,url,params,cb,failcb);
				    })
				  }
				}
			});
		}else {
			request(contentType,type,url,params,cb,failcb);
			
		}
	},
	json:function(url,params,cb,failcb,notNeedOpenId){
		http.httpRequest("application/json","JSON_POST",url,params,cb,failcb,notNeedOpenId);
		
	},
	get:function(url,params,cb,failcb,notNeedOpenId){
		http.httpRequest('application/x-www-form-urlencoded',"GET",url,params,cb,failcb,notNeedOpenId);
	},

	post:function(url,params,cb,failcb,notNeedOpenId){
		http.httpRequest('application/x-www-form-urlencoded',"POST",url,params,cb,failcb,notNeedOpenId);
	}
}
export default http;