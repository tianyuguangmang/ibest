Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    baseInfo: {
      type: Object,
      value:{},
      observer: function(newVal, oldVal, changedPath) {
        if(newVal&&newVal.supplierInfo){
          newVal.supplierInfo.accountFund = (newVal.supplierInfo.accountFund*0.01).toFixed(2);
        }
        if(newVal&&newVal.supplierInfo){
          newVal.merchantInfo.accountFund = (newVal.merchantInfo.accountFund*0.01).toFixed(2);
        }
        this.setData({
          baseInfo:newVal
        })
      }
    }
  },
  data: {

    
  },
  attached:function(){
    
  },
  ready:function(){

  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})