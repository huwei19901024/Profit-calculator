//manage/detail.js
//获取应用实例
var app = getApp()
Page({
	data: {
    summoney:'',
    resultTitle:'',
    resultNum:'',
    resultDepict:'',
  	index:'',
  	amount:'',
  	annualRate:'',
  	deadLine:'',
  	type:'',
    results:[],
    capitalTotal:'',
    interestTotal:'',
    repaymentTotal:''
	},
	onLoad: function (options) {
		this.setData({
      index: options.index,
      amount: options.amount,
      annualRate: options.annualRate,
      deadLine: options.deadLine,
      type: options.type
    })
    var repayArray = [];
    if (this.data.type == "mouth" && this.data.index == 0) {
      var interest = (this.data.amount * this.data.annualRate/1200).toFixed(2);
      var capital = 0;
      var interestTotal = (this.data.amount * this.data.annualRate * this.data.deadLine/1200).toFixed(2);
      for (var i = 1; i <= this.data.deadLine; i++) {
        if (i == this.data.deadLine) {
          capital = parseFloat(this.data.amount).toFixed(2);
          interest = (interestTotal - interest*(i-1)).toFixed(2);
        }
        var repayment =  Math.round((Number(capital) + Number(interest)).toFixed(2)*100)/100.0;
        repayArray.push(
          {id: i, capital: capital, interest: interest, repayment: repayment},
        )
      }
      this.setData({
        summoney: (this.data.amount * this.data.annualRate * this.data.deadLine/1200).toFixed(2),
        results: repayArray,
        resultTitle: '每月应收',
        resultNum: interest,
        resultDepict: '每个月收到的利息，最后一个月收回本金',
        capitalTotal: parseFloat(this.data.amount).toFixed(2),
        interestTotal: interestTotal,
        repaymentTotal: (parseFloat(this.data.amount) + parseFloat(interestTotal)).toFixed(2)
      })
    } else if(this.data.type == "mouth" && this.data.index == 1) {
      var repayment =(this.data.amount * (this.data.annualRate/12/100) * Math.pow((1 + (this.data.annualRate/12/100)), this.data.deadLine) / (Math.pow((1 + (this.data.annualRate/12/100)), this.data.deadLine) - 1)).toFixed(2)
      var interestTotal =  (this.data.deadLine * this.data.amount * (this.data.annualRate/12/100) * Math.pow((1 + (this.data.annualRate/12/100)), this.data.deadLine) / (Math.pow((1 + (this.data.annualRate/12/100)), this.data.deadLine) - 1) - this.data.amount).toFixed(2)
      var capital_ready = 0;
      for (var i = 1; i <= this.data.deadLine; i++) {
        if (i == 1) {
          var interest = Math.round(this.data.amount * (this.data.annualRate/12/100)*100)/100.0;
        } else {
          var interest = Math.round(((this.data.amount * (this.data.annualRate/12/100)-Number(repayment)) * Math.pow((1 + (this.data.annualRate/12/100)), (i-1))+Number(repayment))*100)/100.0;
        }
        var capital = (Number(repayment) - Number(interest)).toFixed(2);
        if (i == this.data.deadLine) {
          var capital = (this.data.amount - capital_ready).toFixed(2);
          var repayment = Math.round((Number(capital) + Number(interest)).toFixed(2)*100)/100.0;
          repayArray.push(
            {id: i, capital: capital, interest: interest, repayment: repayment},
          )
        } else {
          repayArray.push(
            {id: i, capital: capital, interest: interest, repayment: repayment},
          )
        }
        capital_ready += Math.round((repayment - interest)*100)/100.0;
      }
      this.setData({
        summoney: (this.data.deadLine * this.data.amount * (this.data.annualRate/12/100) * Math.pow((1 + (this.data.annualRate/12/100)), this.data.deadLine) / (Math.pow((1 + (this.data.annualRate/12/100)), this.data.deadLine) - 1) - this.data.amount).toFixed(2),
        results: repayArray,
        resultTitle: '每月应收',
        resultNum: repayment,
        resultDepict: '每个月收到的本金与利息和相同',
        capitalTotal: parseFloat(this.data.amount).toFixed(2),
        interestTotal: interestTotal,
        repaymentTotal: (parseFloat(this.data.amount) + parseFloat(interestTotal)).toFixed(2)
      })
    } else if(this.data.type == "mouth" && this.data.index == 2) {
      var capital = parseFloat(this.data.amount).toFixed(2);
      var interest = (this.data.amount * this.data.annualRate * this.data.deadLine/1200).toFixed(2);
      var repayment = (Number(capital) + Number(interest)).toFixed(2);
      this.setData({
        summoney: (this.data.amount * this.data.annualRate * this.data.deadLine/1200).toFixed(2),
        results: [{id: 1, capital: capital, interest: interest, repayment: repayment}],
        resultTitle: '最后应收',
        resultNum: repayment,
        resultDepict: '最后一次性收回本息',
        capitalTotal: parseFloat(this.data.amount).toFixed(2),
        interestTotal: interest,
        repaymentTotal: (parseFloat(this.data.amount) + parseFloat(interest)).toFixed(2)
      })
    } else {
      var capital = parseFloat(this.data.amount).toFixed(2);
      var interest = (this.data.amount * this.data.annualRate * this.data.deadLine/36500).toFixed(2);
      var repayment = (Number(capital) + Number(interest)).toFixed(2);
      this.setData({
        summoney: (this.data.amount * this.data.annualRate * this.data.deadLine/36500).toFixed(2),
        results: [{id: 1, capital: capital, interest: interest, repayment: repayment}],
        resultTitle: '最后应收',
        resultNum: repayment,
        resultDepict: '最后一次性收回本息',
        capitalTotal: parseFloat(this.data.amount).toFixed(2),
        interestTotal: interest,
        repaymentTotal: (parseFloat(this.data.amount) + parseFloat(interest)).toFixed(2)
      })
    }
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
