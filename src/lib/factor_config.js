import { age_to_date, get_date_after, range_init, get_end_date, get_how_many_days, birth_to_age, num_to_range, use_mapping } from './common'
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
  //大白定寿
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
  //贝健康
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
  },
  //长安无忧终身保障计划
  'p50' : {
    sex              : {
      name          : '被保险人性别',
      input_type    : 'radio',
      options       : ['男', '女'],
      default_index : 0
    },
    birth            : {
      name          : '被保险人出生日期',
      input_type    : 'date',
      date_range    : { min : age_to_date(55), max : get_date_after(new Date(), -28) },
      default_index : 0
    },
    age              : {
      name             : '被保险人年龄',
      input_type       : 'none',
      options          : 0,
      default_index    : 0,
      generate_options : {
        related_factor      : ['birth'],
        get_display_options : birth_to_age
      }
    },
    age_range        : {
      name             : '被保险人年龄区间',
      input_type       : 'none',
      options          : ['0-35周岁', '36-40周岁', '41-45周岁', '46-50周岁'],//xx-xx周岁
      default_index    : 0,
      range            : range_init,
      unit             : '周岁',
      generate_options : {
        related_factor      : ['age'],
        get_display_options : num_to_range
      }
    },
    applicant_sex    : {
      name          : '投保人性别',
      input_type    : 'radio',
      options       : ['男', '女'],
      default_index : 0
    },
    applicant_birth  : {
      name          : '投保人出生日期',
      input_type    : 'date',
      date_range    : { min : age_to_date(55), max : age_to_date(18) },
      default_index : 0
    },
    applicant_age    : {
      name             : '投保人年龄',
      input_type       : 'none',
      options          : 0,
      default_index    : 18,
      generate_options : {
        related_factor      : ['applicant_birth'],
        get_display_options : birth_to_age
      }
    },
    amount           : {
      name             : '保额',
      input_type       : 'select',
      options          : ['10万元', '20万元', '30万元', '40万元', '50万元'],
      default_index    : 0,
      generate_options : {
        related_factor      : ['age_range'],
        get_display_options : use_mapping,
        mapping             : [
          ['10万元', '20万元', '30万元', '40万元', '50万元'],
          ['10万元', '20万元', '30万元', '40万元', '50万元'],
          ['10万元', '20万元'],
          ['10万元']
        ]
      }
    },
    accessory_risk_1 : {
      name          : '重大疾病',
      input_type    : 'radio',
      default_index : 1,
      options       : ['不投保', '投保']
    },
    accessory_risk_2 : {
      name          : '投保人豁免',
      input_type    : 'radio',
      default_index : 0,
      options       : ['不投保', '投保']
    },
    payment_period   : {
      name             : '缴费年限',
      input_type       : 'select',
      options          : ['一次交清', '5年', '10年', '15年', '20年'],
      default_index    : 4,
      generate_options : {
        get_display_options : use_mapping,
        related_factor      : ['age_range', 'accessory_risk_2'],
        mapping             : [
          [['一次交清', '5年', '10年', '15年', '20年'], ['', '5年', '10年', '15年', '20年']],
          [['一次交清', '', '', '', '20年'], ['', '', '', '', '20年']],
          [['一次交清', '', '', '', '20年'], ['', '', '', '', '20年']],
          [['一次交清', '', '', '', '20年'], ['', '', '', '', '20年']]
        ]
      }
    }
  }
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

