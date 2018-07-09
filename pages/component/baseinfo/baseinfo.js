Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    baseInfo: {
      type: Object,
      value:{},
      observer: function(newVal, oldVal, changedPath) {
        console.log("1,",newVal);
        console.log("2,",changedPath);
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