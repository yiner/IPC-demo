<template>
  <div id="premium-calculate">
    <div v-for="(f,k) in factor_data" v-show="f.input_type!=='none'">
      <span>{{f.name}}</span>
      <span>
        <input id='birth' v-if="f.input_type==='date'" type="date" :min="f.date_range.min" :max="f.date_range.max" v-model="f.selected_index" @change="refresh(f)" required>
        <template v-if="f.input_type==='radio'">
          <template v-for="(v,i) in f.display_options">
            <template v-if="v">
              <input type="radio" :name="k" :id="k+i" :value="i" v-model="f.selected_index" @click="refresh(f)">
              <label :for="k+i">{{v}}</label>
            </template>
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
        <template v-if="f.input_type==='static'">{{f.display_options}}</template>
      </span>
    </div>
  </div>
</template>

<script>
  import get_factor_data from './lib/factor_config'
  const prod_id = 'p40'
  export default {
    data(){
      return {
        factor_data : get_factor_data(prod_id),
      }
    },
    methods : {
      refresh(factor){
        if (!factor.trigger) {
          console.log(`${factor.name}不触发测算因子更新`)
          return
        }
        let _this = this
        let fif = factor.trigger
        console.log(`${factor.name}触发测算因子更新，重新计算${fif}`)
        fif.forEach(f => {
          let related_factor = {}
          _this.factor_data[f].generate_options.related_factor.forEach(rfn => {related_factor[rfn] = _this.factor_data[rfn].selected_index})
          _this.factor_data[f].display_options = _this.factor_data[f].generate_options.get_display_options.call(_this.factor_data[f], related_factor)
          this.refresh(_this.factor_data[f])
        })
      }
    }
  }
</script>
<style>
  div {
    margin-bottom: 20px;
  }
</style>
