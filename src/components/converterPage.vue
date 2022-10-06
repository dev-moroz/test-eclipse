<template>
      <div class="converter" v-if="isLoaded">
         <div class="crad_converter">
         <div class="select_valutes">
            <select v-model="convertVal1">
               <option :value="item" v-for="item,i in valute" :key="i">
                  {{item.CharCode}}
               </option>
            </select>
            <div class="counts">
               <button class="decrement" type="button" @click="decrement">-</button>
               <input type="number" min="1" v-model="current">
               <button class="increment" type="button" @click="increment">+</button>
            </div>
         </div>
         <div class="swap_valutes">
            <button @click="swapValutes"> Swap </button>
         </div>
         <div class="select_valutes">
            <select v-model="convertVal2">
               <option :value="item" v-for="item,i in valute" :key="i">
                  {{item.CharCode}}
               </option>
            </select>
            <div class="counts">
               <input type="number" readonly v-model="valueValute2">
            </div>
         </div>
         </div>
      </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
   setup() {

      const current = ref(1)
      const store = useStore()
      const valute = computed(() => store.getters.valute)
      const isLoaded = computed(() => (convertVal1.value !== undefined && convertVal2.value !== undefined))
      const swapValutes = () => store.dispatch('swapValutes')
      const valueValute2 = computed(() => (
         (convertVal2.value.Value / convertVal1.value.Value) * current.value 
      ).toFixed(4))

      const decrement = () => { if (current.value > 1) current.value -= 1 }
      const increment = () => current.value += 1
      const changeValutes = data => store.dispatch('changeValutes', data)

      const convertVal1 = computed({
         get: () => store.getters.convertVal1,
         set: newValue => changeValutes({ name: newValue.CharCode, num: 1 })
      })
      const convertVal2 = computed({
         get: () => store.getters.convertVal2,
         set: newValue => changeValutes({ name: newValue.CharCode, num: 2 })
      })

      return {
         valute,
         swapValutes,
         valueValute2,
         isLoaded,
         current,
         decrement,
         increment,
         convertVal1,
         convertVal2
      }
   }
}

</script>

<style lang="sass" scoped>
.converter
   display: flex
   height: 100%
   width: 100%
   justify-content: center
   align-items: center
   .crad_converter
      gap: 30px
      display: flex
      justify-content: space-between
      flex-direction: row
      align-items: center 
      background: #eee
      padding: 6px 20px
      border-radius: 8px
      margin: 8px
      height: 200px
      max-width: 500px
      width: 90% 
      .select_valutes
         display: flex
         flex-direction: column
         gap: 10px
         select, input
            display: block
            height: 32px
            width: 100%
            padding: 0
            margin: 0
            box-sizing: border-box
            text-align: center
            -moz-appearance: textfield
            -webkit-appearance: textfield
            appearance: textfield
            border-radius: 3px
            border: 1px solid #777
            &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
               display: none

      .swap_valutes
         button
            display: block
            background: #fff
            width: 100%
            padding: 20px 30px
            margin: 0
            box-sizing: border-box
            text-align: center
            border-radius: 3px
            border: 1px solid #777

      .counts
         display: inline-block
         position: relative
         width: 100px
         button
            position: absolute
            top: 1px
            bottom: 1px
            width: 20px
            padding: 0
            display: block
            text-align: center
            border: none
            border-right: 1px solid #ddd
         .decrement
            left: 1px
         .increment
            right: 1px
</style>