
Page({
	data: {
	 list:[]
	},
  add:function(e){
    var msg = e.currentTarget.dataset.msg;
    var list = this.data.list;
    list.push(msg);
    this.setData({
      list:list
    })

  }

})