function get_age(strBirthday) {
  var returnAge
  var birthYear = strBirthday.slice(0, 4)
  var birthMonth = strBirthday.slice(5, 2)
  var birthDay = strBirthday.slice(8, 2)

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

  return returnAge//返回周岁年龄

}
function factor_data_init(factor_data) {
  for (let fk in factor_data) {
    if (fk==='birth') {
      factor_data[fk].birth_range = age_to_date(factor_data[fk].age_range.min, factor_data[fk].age_range.max)
      if (factor_data.age) {
        factor_data.age.age_range = []
        age_range_init(factor_data.age.options, factor_data.age.age_range)
      }
    } else {
      factor_data[fk].display_options = factor_data[fk].options
    }
  }
  influence_factor_init(factor_data)
  return factor_data
  function age_to_date(min_age, max_age) {
    let current_date = new Date()
    let mmdd = `${current_date.getMonth()+1 < 10 ? '0' : ''}${current_date.getMonth()+1}-${current_date.getDate() < 10 ? '0' : ''}${current_date.getDate()}`
    return { min : current_date.getFullYear()-max_age+'-'+mmdd, max : current_date.getFullYear()-min_age+'-'+mmdd }
  }

  function age_range_init(age_options, age_range) {
    age_options.forEach(v => {
      age_range.push(v.replace('周岁', '').split('-').map(vv => { return vv*1}))
    })
  }

  function influence_factor_init(factor_data) {
    for(let fk in factor_data){
      if (factor_data[fk].related_factor && factor_data[fk].related_factor.name) {
        let rfn=factor_data[fk].related_factor.name
        rfn.forEach(fn => {
          if (!factor_data[fn].influence_factor) factor_data[fn].influence_factor = []
          factor_data[fn].influence_factor.push(fk)
        })
      }
    }
    //factor_data.forEach(e=>{console.log(e)})
    //factor_data.forEach((f, k) => {
    //  if (f.related_factor.name) {
    //    f.related_factor.name.forEach(fn => {
    //      if (!factor_data[fn].influence_factor) factor_data[fn].influence_factor = []
    //      factor_data[fn].influence_factor.push(k)
    //    })
    //  }
    //})
  }
}
function get_age_select_index(age, age_range) {
  if (age < age_range[0][0] || age > age_range[age_range.length-1][1]) return -1
  for (let i = 0; i < age_range.length; i++)
    if (age >= age_range[i][0] && age <= age_range[i][1]) {
      return i
    }
}

export { get_age, factor_data_init, get_age_select_index }
