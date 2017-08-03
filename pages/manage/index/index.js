//manage/index.js
Page({
  data: {
    isErrorMsg: false,
    array: ["先息后本","等额本息","到期一次性还本付息"],
    items: [
      {name: 'day', value: '天'},
      {name: 'mouth', value: '月', checked: 'true'},
    ],
    index: 0,
    amount: '',
    annualRate: '',
    deadLine: '',
    type: 'mouth'
  },
  inputAmount:function(e){
    this.setData({
      amount:e.detail.value,
      isErrorMsg: false, 
    })
  },
  inputAnnualRate:function(e){
    this.setData({
      annualRate:e.detail.value,
      isErrorMsg: false,
    })
  },
  inputDeadLine:function(e){
    this.setData({
      deadLine:e.detail.value,
      isErrorMsg: false,
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  radioChange: function(e) {
    this.setData({
      type: e.detail.value
    })
    if(e.detail.value == "day"){
      this.setData({
        array:["到期一次性还本付息"],
        index:0
      });
    } else {
      this.setData({
        array:["先息后本","等额本息","到期一次性还本付息"],
        index:0
      });
    }
  },
  inputReset: function(e) {
    console.log(e)
    this.setData({
      array:["先息后本","等额本息","到期一次性还本付息"],
      index:0,
      amount:'333',
      annualRate:'',
      deadLine:'',
      type:'mouth'
    })
  },
  inputSubmit: function(e) {
    if (this.data.amount == "" || this.data.amount == undefined) {
      this.setData({ 
        popErrorMsg: '投资金额不能为空',
        isErrorMsg: true, 
      });
      return false;   
    }
    if (this.data.annualRate == "" || this.data.annualRate == undefined) {
      this.setData({ 
        popErrorMsg: '年化利率不能为空',
        isErrorMsg: true, 
      });
      return false;   
    }
    if (this.data.deadLine == "" || this.data.deadLine == undefined) {
      this.setData({ 
        popErrorMsg: '项目期限不能为空',
        isErrorMsg: true, 
      });
      // window.timmer = setTimeout( function(){
      //   this.setData({ 
      //     isErrorMsg: false, 
      //   });
      // }.bind(this),2000);
      return false;   
    }
    wx.navigateTo({
      url: '../detail/detail?type='+this.data.type+'&index='+this.data.index+'&amount='+this.data.amount+'&annualRate='+this.data.annualRate+'&deadLine='+this.data.deadLine
    });
  },
  onShareAppMessage: function (res) {
    return {
      title: '理财收益计算器',
      path: 'pages/manage/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
