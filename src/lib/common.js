export function age_to_date(age) {
  let current_date = new Date()
  let mmdd = `${current_date.getMonth()+1 < 10 ? '0' : ''}${current_date.getMonth()+1}-${current_date.getDate() < 10 ? '0' : ''}${current_date.getDate()}`
  return current_date.getFullYear()-age+'-'+mmdd
}

export function get_date_after(start, days) {
  let newDate = start.setDate(start.getDate()+days)
  newDate = new Date(newDate)
  let year = newDate.getFullYear()
  let mmdd = `${newDate.getMonth()+1 < 10 ? '0' : ''}${newDate.getMonth()+1}-${newDate.getDate() < 10 ? '0' : ''}${newDate.getDate()}`
  return year+'-'+mmdd
}

export function range_init(range_options, unit) {
  let range = []
  range_options.forEach(v => {
    range.push(v.replace(unit, '').split('-').map(vv => { return vv*1}))
  })
  return range
}

//所有generate_display_options方法，传入一个对象参数，为调用者的related_factor和对应的selected_index
//this指向被调用者所在的factor对象
//输出为调用者经过计算后的display_options
export function get_end_date(related_factor) {
  let start = new Date(related_factor.start_date)
  let min_end = get_date_after(start, 0)
  let max_end = get_date_after(start, this.generate_options.max_days-1)
  this.date_range = { min : min_end, max : max_end }
  this.selected_index = min_end
  return min_end
}

export function get_how_many_days(related_factor) {
  console.log(JSON.stringify(related_factor))
  let start = new Date(related_factor.start_date)
  let end = new Date(related_factor.end_date)
  let days = parseInt(Math.abs(end-start)/1000/60/60/24)+1
  this.selected_index = days
  return days
}

export function birth_to_age(related_factor) {
  var strBirthday = related_factor[this.generate_options.related_factor[0]]
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

export function num_to_range(related_factor) {
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

export function use_mapping(related_factor) {
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
