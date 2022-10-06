<template>
   <div v-if="isLoaded">
      <div class="search">
         <input type="text" placeholder="Input name" v-model="search">
      </div>

      <div class="cards" v-if="isValues">
         <div class="card" v-for="item,i in findValutes" :key="i">
            <p>{{item.Name}} ({{item.CharCode}})</p>
            <div class="values">
               <p>new: {{item.Value}}</p>
               <p>old: {{item.Previous}}</p>
            </div>
            <p>previous: 
               <span :class="difference(item.difference)">{{item.difference}}</span>
            </p>
         </div>
      </div>

      <div v-else class="empty cards">
         <p>Empty</p>
      </div>
   </div>
   
   <div v-else>
      <p>Loading...</p>
   </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
   setup() {
      const store = useStore()
      const valute = computed(() => store.getters.valute)
      const isLoaded = computed(() => valute.value.length > 0 )
      const difference = currentValue => currentValue > 0 
      ? 'up'
      : 'down'
      const search = ref('')
      const findValutes = computed(() => search.value.length > 0
         ? valute.value.filter(item => 
            item.Name.toLowerCase().includes(search.value.toLowerCase())
            ? item.Name.toLowerCase().includes(search.value.toLowerCase())
            : item.CharCode.toLowerCase().includes(search.value.toLowerCase())
         )
         : valute.value
      )
      const isValues = computed(() => findValutes.value.length > 0)

      return {
         isLoaded,
         difference,
         findValutes,
         search,
         isValues
      }
   }
}
</script>

<style lang="sass" scoped>
.cards
   display: flex
   flex-wrap: wrap
   justify-content: center
   .card
      background: #eee
      padding: 6px 20px
      border-radius: 8px
      margin: 8px
      height: 90px
      max-width: 300px
      width: 100%
      display: flex
      flex-direction: column
      justify-content: center
      p
         margin: 2px 0
      .values
         display: flex
         gap: 20px
.search
   width: 100%
   margin: 10px auto
   display: flex
   justify-content: center
   input
      min-width:300px
      max-width:400px
      height: 12px
      padding: 5px
      border-radius: 10px
      border: 1px solid #eee
      transition: all .2s ease-out
      &:hover
         border: 1px solid #929292
.empty
   display: flex
   justify-content: center
   background: #eee
   padding: 6px 20px
   border-radius: 8px
.up
   color: green
   &:after
      position: relative
      top: 5px
      content: ""
      display: inline-block
      width: 10px
      height: 10px
      border-right: 0.2em solid green
      border-top: 0.2em solid green
      transform: rotate(-45deg)
      margin-left: .6em
.down
   color: red
   &:after
      position: relative
      top: -3px
      content: ""
      display: inline-block
      width: 10px
      height: 10px
      border-right: 0.2em solid red
      border-top: 0.2em solid red
      transform: rotate(135deg)
      margin-left: .6em
</style>