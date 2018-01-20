export default {
  'p10' : {
    sex              : {
      name           : '性别',
      input_type     : 'radio',
      options        : ['男', '女'],
      selected_index : 0,
      related_factor : {}
    },
    birth            : {
      name          : '出生日期',
      input_type    : 'date',
      age_range     : { min : '20', max : '55' },
      selected_date : ''
    },
    age              : {
      name             : '年龄',
      input_type       : 'none',
      options          : ['0-40周岁', '41-45周岁', '46-50周岁', '51-55周岁'],//xx-xx周岁
      selected_index   : 0,
      related_factor   : {},
    },
    liability        : {
      name             : '保险责任',
      input_type       : 'select',
      options          : ['重大疾病', '重大疾病+轻症疾病'],
      selected_index   : 0,
      related_factor   : {},
    },
    amount           : {
      name           : '保额',
      input_type     : 'select',
      options        : ['10万元', '20万元', '30万元', '50万元'],
      selected_index : 0,
      related_factor : {
        name    : ['age', 'liability'],
        mapping : [
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
      selected_index   : 0,
      related_factor   : {
        name    : ['age'],
        mapping : [
          ['至70周岁', '至终身'],
          ['至70周岁', '至终身'],
          ['至70周岁', '至终身'],
          ['', '至终身']
        ]
      },
    },
    payment_period   : {
      name           : '缴费年限',
      input_type     : 'select',
      options        : ['20年', '30年'],
      selected_index : 0,
      related_factor : {
        name    : ['age', 'insurance_period'],
        mapping : [
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
  'p20' : {
    sex              : {
      name           : '性别',
      input_type     : 'radio',
      options        : ['男', '女'],
      selected_index : 0,
      related_factor : {}
    },
    birth            : {
      name       : '出生日期',
      input_type : 'date',
      age_range  : { min : '20', max : '50' }
    },
    age              : {
      name             : '年龄',
      input_type       : 'none',
      options          : ['20-30周岁', '31-40周岁', '41-50周岁'],
      selected_index   : 0,
      related_factor   : {},
    },
    amount           : {
      name           : '保额',
      input_type     : 'select',
      options        : ['10万元', '20万元', '30万元', '40万元', '50万元', '60万元', '70万元', '80万元', '90万元', '100万元'],
      selected_index : 0,
      related_factor : {
        name    : ['age'],
        mapping : [
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
      selected_index   : 0,
      related_factor   : {
        name    : ['age'],
        mapping : [
          ['10年', '20年', '30年', '至60周岁', '至70周岁'],
          ['10年', '20年', '30年', '至60周岁', '至70周岁'],
          ['10年', '20年', '', '至60周岁', '至70周岁']
        ]
      },
    },
    payment_period   : {
      name           : '缴费年限',
      input_type     : 'radio',
      options        : ['10年交', '20年交', '30年交'],
      selected_index : 0,
      related_factor : {
        name    : ['age', 'insurance_period'],
        mapping : [
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
  }
}


