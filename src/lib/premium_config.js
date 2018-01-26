const premium_data_config = {
  p20 : {
    args     : ['sex', 'payment_period', 'insurance_period', 'amount', 'age'],
    index    : 'age',
    multi    : 'amount',
    multiply : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    factors  : ['sex', 'payment_period', 'insurance_period'],
    '0-0-0'  : [, , , , , , , , , , , , , , , , , , , ,
      7, 7, 8, 8, 8, 9, 9, 9, 10, 11,
      11, 12, 13, 14, 15, 16, 17, 18, 20, 21,
      23, 25, 26, 28, 31, 33, 36, 39, 42, 46, 52],
    '1-0-0'  : [, , , , , , , , , , , , , , , , , , , ,
      3, 3, 3, 4, 4, 4, 4, 4, 5, 5,
      5, 6, 6, 7, 7, 8, 8, 9, 10, 10,
      11, 12, 13, 15, 16, 18, 19, 22, 24, 27, 30],
    '0-0-1'  : [, , , , , , , , , , , , , , , , , , , ,
      27, 28, 28, 29, 30, 32, 33, 34, 35, 36,
      37, 38, 40, 41, 42, 44, 45, 47, 48, 50,
      51, 53, 55, 57, 58, 60, 62, 64, 67, 69,
      71, 74, 76, 79, 81, 84, 87, 88, 90, 93, 96],
    '0-0-1'  : [, , , , , , , , , , , , , , , , , , , ,
      15, 16, 17, 18, 19, 20, 21, 23, 24, 26,
      28, 30, 32, 34, 37, 40, 43, 46, 50, 54,
      59, 64, 70, 77, 84, 93, 102, 113, 125, 138, 152]
  },
  p30 : {
    args    : ['insurance_period'],
    index   : 'insurance_period',
    factors : [],
    'any'   : [198, 258, 352, 418, 506, 572]
  },
  p50 : {
    args     : ['sex', 'payment_period', 'amount', 'age', 'accessory_risk_1', 'accessory_risk_2'],
    index    : 'age',
    multi    : 'amount',
    multiply : [10, 20, 30, 40, 50],
    factors  : ['sex', 'payment_period'],
    '0-0'    : [843, 872, 902],
    '1-0'    : [683, 707, 732],
    '0-1'    : [180, 187, 193],
    '1-1'    : [146, 151, 157],
    '0-2'    : [98, 101, 105],
    '1-2'    : [79, 82, 85],
    risks    : {
      accessory_risk_1 : {
        args     : ['sex', 'payment_period', 'amount', 'age'],
        index    : 'age',
        multi    : 'amount',
        multiply : [3, 6, 9, 12, 15],
        factors  : ['sex', 'payment_period'],
        '0-0'    : [364, 370, 378],
        '1-0'    : [429, 435, 444],
        '0-1'    : [79, 79, 81],
        '1-1'    : [92, 94, 95],
        '0-2'    : [43, 44, 44],
        '1-2'    : [51, 51, 52]
      },
      accessory_risk_2 : {
        args     : ['payment_period', 'amount', 'applicant_age', 'applicant_sex'],
        index    : 'applicant_age',
        multi    : 'amount',
        multiply : [10, 20, 30, 40, 50],
        factors  : ['applicant_sex', 'payment_period'],
        '0-1'    : [, , , , , , , , , , , , , , , , , , 29, 30, 32],
        '1-1'    : [, , , , , , , , , , , , , , , , , , 25, 27, 28],
        '0-2'    : [, , , , , , , , , , , , , , , , , , 70, 74, 78],
        '1-2'    : [, , , , , , , , , , , , , , , , , , 62, 66, 71],
        '0-3'    : [, , , , , , , , , , , , , , , , , , 115, 122, 129],
        '1-3'    : [, , , , , , , , , , , , , , , , , , 109, 118, 129]
      }
    }
  }
}

export default function get_premium(pid, selected_index) {
  let premium_data = premium_data_config[pid]
  let premium = _get_premium(premium_data, selected_index)
  let risks = premium_data.risks
  if (risks!==undefined) {
    for (let risk in risks) {
      if (selected_index[risk]===1) premium = premium+_get_premium(risks[risk], selected_index)
    }
  }
  return premium

  function _get_premium(premium_data, selected_index) {
    let args = premium_data.args
    if (!check_arg(selected_index, args)) {
      console.log('传入参数有误，无法计算保费')
      return 'NA'
    } else {
      let index = premium_data.index || 0
      let multi = premium_data.multi || ''
      let multiply = premium_data.multiply || 1
      let _factor_index = []
      premium_data.factors.forEach(f => {
        _factor_index.push(selected_index[f])
      })
      let factor_index = _factor_index.join('-')
      if (factor_index==='') factor_index = 'any'
      console.log('因子：'+factor_index, '取值：'+(premium_data[factor_index] && premium_data[factor_index][selected_index[index]] || '参数对应的费率表不完整'), '倍数：'+(multiply[selected_index[multi]] || 1))
      return (premium_data[factor_index] && premium_data[factor_index][selected_index[index]] || 0)*(multiply[selected_index[multi]] || 1)
    }

    function check_arg(selected_index, args) {
      return args.every(a => {
        return (typeof selected_index[a]==='number' && selected_index[a] >= 0)
      })
    }
  }
}


