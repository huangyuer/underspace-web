<template>
  <div class="loading-component" v-show="loadingState">
    <div class="gif-container">
      <img src="../../../src/assets/images/loading.gif">
      <div class="text-container">
        <span>正在加载,请稍后...</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../../src/assets/css/public/loadingComponent.scss';
</style>
<script>
  export default {
    mounted: function () {

    },
    components: {},
    data () {
      return {}
    },
    methods: {},
    computed: {
      loadingState: function () {
        return this.$store.state.loadingComponent.loadingState
      }
    },
    filters: {}

  }
</script>
