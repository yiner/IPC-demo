let factor_config = {
  //健康人生重大疾病保险(个人版)
  'p10' : {
    sex              : {
      name          : '性别',
      input_type    : 'radio',
      options       : ['男', '女'],
      default_index : 0
    },
    birth            : {
      name          : '出生日期',
      input_type    : 'date',
      date_range    : { min : age_to_date(55), max : age_to_date(20) },
      default_index : 0
    },
    age              : {
      name             : '年龄',
      input_type       : 'static',
      options          : 0,
      default_index    : 0,
      generate_options : {
        related_factor      : ['birth'],
        get_display_options : birth_to_age
      }
    },
    age_range        : {
      name             : '年龄区间',
      input_type       : 'static',
      options          : ['0-40周岁', '41-45周岁', '46-50周岁', '51-55周岁'],//xx-xx周岁
      default_index    : 0,
      range            : range_init,
      unit             : '周岁',
      generate_options : {
        related_factor      : ['age'],
        get_display_options : num_to_range
      }
    },
    liability        : {
      name          : '保险责任',
      input_type    : 'select',
      options       : ['重大疾病', '重大疾病+轻症疾病'],
      default_index : 0
    },
    amount           : {
      name             : '保额',
      input_type       : 'select',
      options          : ['10万元', '20万元', '30万元', '50万元'],
      default_index    : 0,
      generate_options : {
        related_factor      : ['age_range', 'liability'],
        get_display_options : use_mapping,
        mapping             : [
          [
            ['10万元', '20万元', '30万元', '50万元'], ['10万元+3万元', '20万元+6万元', '30万元+9万元', '50万元+15万元']
          ],
          [
            ['10万元', '20万元', '30万元'], ['10万元+3万元', '20万元+6万元', '30万元+9万元']
          ],
          [
            ['10万元', '20万元', '30万元'], ['10万元+3万元', '20万元+6万元', '30万元+9万元']
          ],
          [
            ['10万元'], ['10万元+3万元']
          ]
        ]
      }
    },
    insurance_period : {
      name             : '保险期间',
      input_type       : 'select',
      options          : ['至70周岁', '至终身'],
      default_index    : 0,
      generate_options : {
        related_factor      : ['age_range'],
        get_display_options : use_mapping,
        mapping             : [
          ['至70周岁', '至终身'],
          ['至70周岁', '至终身'],
          ['至70周岁', '至终身'],
          ['', '至终身']
        ]
      }
    },
    payment_period   : {
      name             : '缴费年限',
      input_type       : 'select',
      options          : ['20年', '30年'],
      default_index    : 0,
      generate_options : {
        get_display_options : use_mapping,
        related_factor      : ['age_range', 'insurance_period'],
        mapping             : [
          [
            ['20年', '30年'], ['20年', '30年']
          ],
          [
            ['20年'], ['20年', '30年']
          ],
          [
            ['20年'], ['20年', '30年']
          ],
          [
            [], ['20年', '30年']
          ]
        ]
      }
    }
  },
  //海外畅游乐境外旅行保险（豪华型）
  'p30' : {
    birth            : {
      name          : '出生日期',
      input_type    : 'date',
      date_range    : { min : age_to_date(80), max : age_to_date(0) },
      default_index : ''
    },
    start_date       : {
      name          : '旅行开始时间',
      input_type    : 'date',
      date_range    : { min : get_date_after(new Date(), 1) },
      default_index : ''
    },
    end_date         : {
      name             : '旅行结束时间',
      input_type       : 'date',
      date_range       : { min : get_date_after(new Date(), 1) },
      default_index    : '',
      generate_options : {
        related_factor      : ['start_date'],
        get_display_options : get_end_date,
        max_days            : 24
      }
    },
    days             : {
      name             : '旅行天数',
      input_type       : 'static',
      generate_options : {
        related_factor      : ['start_date', 'end_date'],
        get_display_options : get_how_many_days
      }
    },
    insurance_period : {
      name             : '保险期间',
      input_type       : 'static',
      options          : ['1-7天', '8-10天', '11-14天', '15-17天', '18-21天', '22-24天'],
      unit             : '天',
      default_index    : 0,
      range            : range_init,
      generate_options : {
        related_factor      : ['days'],
        get_display_options : num_to_range
      }
    }
  },
  'p20' : {
    sex              : {
      name          : '性别',
      input_type    : 'radio',
      options       : ['男', '女'],
      default_index : 0
    },
    birth            : {
      name          : '出生日期',
      input_type    : 'date',
      date_range    : { min : age_to_date(50), max : age_to_date(20) },
      default_index : ''
    },
    age              : {
      name             : '年龄',
      input_type       : 'static',
      options          : 0,
      default_index    : 0,
      generate_options : {
        related_factor      : ['birth'],
        get_display_options : birth_to_age
      }
    },
    age_range        : {
      name             : '年龄区间',
      input_type       : 'static',
      options          : ['20-30周岁', '31-40周岁', '41-50周岁'],
      range            : range_init,
      unit             : '周岁',
      default_index    : 0,
      generate_options : {
        related_factor      : ['age'],
        get_display_options : num_to_range
      }
    },
    amount           : {
      name             : '保额',
      input_type       : 'select',
      options          : ['10万元', '20万元', '30万元', '40万元', '50万元', '60万元', '70万元', '80万元', '90万元', '100万元'],
      default_index    : 0,
      generate_options : {
        related_factor      : ['age_range'],
        get_display_options : use_mapping,
        mapping             : [
          ['10万元', '20万元', '30万元', '40万元', '50万元', '60万元', '70万元', '80万元', '90万元', '100万元'],
          ['10万元', '20万元', '30万元', '40万元', '50万元', '60万元', '70万元', '80万元', '90万元', '100万元'],
          ['10万元', '20万元', '30万元', '40万元', '50万元', '60万元']
        ]
      }
    },
    insurance_period : {
      name             : '保险期间',
      input_type       : 'select',
      options          : ['10年', '20年', '30年', '至60周岁', '至70周岁'],
      default_index    : 0,
      generate_options : {
        related_factor      : ['age_range'],
        get_display_options : use_mapping,
        mapping             : [
          ['10年', '20年', '30年', '至60周岁', '至70周岁'],
          ['10年', '20年', '30年', '至60周岁', '至70周岁'],
          ['10年', '20年', '', '至60周岁', '至70周岁']
        ]
      }
    },
    payment_period   : {
      name             : '缴费年限',
      input_type       : 'radio',
      options          : ['10年交', '20年交', '30年交'],
      default_index    : 0,
      generate_options : {
        related_factor      : ['age_range', 'insurance_period'],
        get_display_options : use_mapping,
        mapping             : [
          [
            ['10年交'], ['10年交', '20年交'], ['10年交', '20年交', '30年交'], ['10年交', '20年交', '30年交'], ['10年交', '20年交', '30年交']
          ],
          [
            ['10年交'], ['10年交', '20年交'], ['10年交', '20年交', '30年交'], ['10年交', '20年交'], ['10年交', '20年交', '30年交']
          ],
          [
            ['10年交'], ['10年交', '20年交'], [], ['10年交', '20年交'], ['10年交', '20年交']
          ]
        ]
      }
    }
  },
  'p40' : {
    age              : {
      name          : '年龄',
      input_type    : 'radio',
      options       : ['0-3周岁', '4-19周岁'],
      default_index : 0
    },
    insurance_period : {
      name       : '保险期间',
      input_type : 'static',
      options    : '1年'
    },
    amount           : {
      name             : '购买份数',
      input_type       : 'select',
      options          : [1, 2, 3],
      default_index    : 0,
      generate_options : {
        related_factor      : ['age'],
        get_display_options : use_mapping,
        mapping             : [[1], [1, 2, 3]]
      }
    }
  }
}

function age_to_date(age) {
  let current_date = new Date()
  let mmdd = `${current_date.getMonth()+1 < 10 ? '0' : ''}${current_date.getMonth()+1}-${current_date.getDate() < 10 ? '0' : ''}${current_date.getDate()}`
  return current_date.getFullYear()-age+'-'+mmdd
}

function get_date_after(start, days) {
  let newDate = start.setDate(start.getDate()+days)
  newDate = new Date(newDate)
  let year = newDate.getFullYear()
  let mmdd = `${newDate.getMonth()+1 < 10 ? '0' : ''}${newDate.getMonth()+1}-${newDate.getDate() < 10 ? '0' : ''}${newDate.getDate()}`
  return year+'-'+mmdd
}

function range_init(range_options, unit) {
  let range = []
  range_options.forEach(v => {
    range.push(v.replace(unit, '').split('-').map(vv => { return vv*1}))
  })
  return range
}

//所有generate_display_options方法，传入一个对象参数，内容为调用者的related_factor和对应的selected_index
//this指向被调用者所在的factor对象
//输出为调用者经过计算后的display_options
function get_end_date(related_factor) {
  let start = new Date(related_factor.start_date)
  let min_end = get_date_after(start, 0)
  let max_end = get_date_after(start, this.generate_options.max_days-1)
  this.date_range = { min : min_end, max : max_end }
  this.selected_index = min_end
  return min_end
}

function get_how_many_days(related_factor) {
  console.log(JSON.stringify(related_factor))
  let start = new Date(related_factor.start_date)
  let end = new Date(related_factor.end_date)
  let days = parseInt(Math.abs(end-start)/1000/60/60/24)+1
  this.selected_index = days
  return days
}

function birth_to_age(related_factor) {
  var strBirthday = related_factor.birth
  var returnAge
  var birthYear = strBirthday.substr(0, 4)
  var birthMonth = strBirthday.substr(5, 2)
  var birthDay = strBirthday.substr(8, 2)

  var d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth()+1
  var nowDay = d.getDate()

  if (nowYear==birthYear) {
    returnAge = 0//同年 则为0岁
  }
  else {
    var ageDiff = nowYear-birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth==birthMonth) {
        var dayDiff = nowDay-birthDay//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff-1
        }
        else {
          returnAge = ageDiff
        }
      }
      else {
        var monthDiff = nowMonth-birthMonth//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff-1
        }
        else {
          returnAge = ageDiff
        }
      }
    }
    else {
      returnAge = -1//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  console.log(`重新计算计算出的年龄是${returnAge}`)
  this.selected_index = this.display_options = returnAge
  return returnAge//返回周岁年龄

}

function num_to_range(related_factor) {
  let num = related_factor[this.generate_options.related_factor[0]]
  let range = this.range
  if (num < range[0][0] || num > range[range.length-1][1]) return -1
  for (let i = 0; i < range.length; i++)
    if (num >= range[i][0] && num <= range[i][1]) {
      this.selected_index = i
      console.log(`重新计算${this.generate_options.related_factor[0]}对应的范围索引值是：${i}，值是：${this.options[i]}`)
      return this.options[i]
    }
}

function use_mapping(related_factor) {
  let mapping = this.generate_options.mapping
  this.generate_options.related_factor.forEach(rfn => {
    mapping = mapping[related_factor[rfn]]
  })
  for (let i = 0; i < mapping.length; i++) {
    if (mapping[i]!=='') {
      this.selected_index = i
      break
    }
  }
  console.log(`重新计算${this.name},传入的mapping_index是：${JSON.stringify(related_factor)},display_options是${JSON.stringify(mapping)}`)
  return mapping
}

export default
function factor_data_init(prod_id) {
  let factor_data = factor_config[prod_id]
  for (let fk in factor_data) {
    factor_data[fk].display_options = factor_data[fk].options
    factor_data[fk].selected_index = factor_data[fk].default_index
    if (factor_data[fk].range!==undefined && typeof factor_data[fk].range==='function') factor_data[fk].range = factor_data[fk].range(factor_data[fk].options, factor_data[fk].unit)
    if (factor_data[fk].generate_options && factor_data[fk].generate_options.related_factor) {
      let rfn = factor_data[fk].generate_options.related_factor
      rfn.forEach(fn => {
        if (!factor_data[fn].trigger) factor_data[fn].trigger = []
        factor_data[fn].trigger.push(fk)
      })
    }
  }
  return factor_data
}

