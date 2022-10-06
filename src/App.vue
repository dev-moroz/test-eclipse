<template>

<div class="container">
  <div class="sidebar">
    <div class="menu">
      <h3>Menu</h3>
      <router-link to="/">List Valute</router-link>
      <router-link to="/converter">Convertor</router-link>
    </div>
  </div>

  <div class="main">
      <router-view />
  </div>
</div>

</template>
<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  setup(){
		const store = useStore()

    onMounted(() => store.dispatch('getValute'))
	}
}
</script>

<style lang="sass">
body
  padding: 0
  margin: 0
  .container
    display: flex
    height: 100%
    min-height: 100vh
    .router-link-active
      background-color:#fff
    .main
      margin-top: 10px
      width: calc(100% - 300px)
      display: flex
      justify-content: center
    .sidebar
      background-color: #eee
      width: 25%
      max-width: 300px
      box-shadow: 10px 0px 10px -7px rgba(34, 60, 80, 0.3)
      .open_mobile
          display: none
      .menu
        display: flex
        flex-direction: column
        align-items: center
        position: fixed
        width: 25%
        max-width: 300px
        top: 20px
        a
          width: 100%
          padding: 10px 0
          justify-content: center
          display: flex
          transition: all .2s ease-out
          text-decoration: none
          color: #000
          &:hover
            background-color: #fff
    @media screen and (max-width:771px)
      .main
        width: 100%
        margin-top: 60px
      .sidebar
        width: 100%
        max-width: unset
        position: absolute
        height: 50px
        display: flex
        box-shadow: 0px 10px 10px -7px rgba(34, 60, 80, 0.3)
        .menu
          flex-direction: row
          width: 100%
          max-width: unset
          top: 0
          position: absolute
          a
            padding: 15px 0
          h3
            display: none

</style>
