<template>
  <div class="z_bg">
    <div class="grzx_main">
      <user-left-menu></user-left-menu>
      <div class="grzx_right grzx_right_b">
        <div class="grzx_right1 grzx_right1_b">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserLeftMenu from './leftMenu'
  export default {
    name: 'user_resources',
    data () {
      return {
      }
    },
    components:{
      'user-left-menu': UserLeftMenu
    },
  }
</script>

<style>
</style>
