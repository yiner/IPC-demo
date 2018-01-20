<template>
  <div id="preminum-caculate">
    <div v-for="(f,k) in factor_data" v-show="f.input_type!=='none'">
      <span>{{f.name}}</span>
      <span>
        <input v-if="f.input_type==='date'" type="date" :min="f.birth_range.min" :max="f.birth_range.max" v-model="birthday" required>
        <template v-if="f.input_type==='radio'">
          <template v-for="(v,i) in f.display_options">
              <input type="radio" :name="k" :id="k+i" :value="i" v-model="f.selected_index">
              <label :for="k+i">{{v}}</label>
          </template>
        </template>
        <select v-if="f.input_type==='select'" v-model="f.selected_index" @change="refresh(f)">
            <template v-for="(v,i) in f.display_options">
            <template v-if="v">
            <option :value="i" v-if="i===f.selected_index" selected>{{v}}</option>
            <option :value="i" v-else>{{v}}</option>
            </template>
          </template>
          </select>
      </span>
    </div>
  </div>
</template>

<script>
  import factor_data from './lib/factor_config'
  import { get_age, get_age_select_index, factor_data_init } from './lib/common'

  const prod_id = 'p10'

  export default {
    data(){
      return {
        factor_data : factor_data_init(factor_data[prod_id]),
        birthday    : ''
      }
    },
    watch   : {
      birthday : function(val) {
        if (val) {
          let age = get_age(val)
          this.age = age
          this.factor_data.age.selected_index = get_age_select_index(age, this.factor_data.age.age_range)
          if (this.factor_data.age.selected_index!== -1) this.refresh(this.factor_data.age)
        }
      }
    },
    methods : {
      refresh(factor){
        if (!factor.influence_factor) return
        let _this = this
        let fif = factor.influence_factor
        for (let i = 0; i < fif.length; i++) {
          this.factor_data[fif[i]].display_options = get_display_options(this.factor_data[fif[i]])
        }
        function get_display_options(factor) {
          let rfn = factor.related_factor.name
          let mapping_index = []
          let options = factor.related_factor.mapping
          for (let i = 0; i < rfn.length; i++) {
            mapping_index.push(_this.factor_data[rfn[i]].selected_index)
          }
          for (let i = 0; i < mapping_index.length; i++) {
            options = options[mapping_index[i]]
          }
          for (let i = 0; i < options.length; i++) {
            if (options[i]) {
              factor.selected_index = i
              break
            }
          }
          console.log(`${factor.name}索引值是：${mapping_index}，索引值是：${options}`)
          return options
        }
      }
    }
  }
</script>
<style>
  div {
    margin-bottom: 20px;
  }
</style>
