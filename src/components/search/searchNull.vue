<template>
  <div class="search-null">
    <tool-bar></tool-bar>
    <div class="null-container">
      <div class="inner">
        <div class="result">
          <span>找到<span>0</span>条结果</span>
        </div>
      </div>
      <div class="sorry">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Fill"></use>
        </svg>
        <div class="sorry-content">
          <span>抱歉，暂无数据!</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/search/searchNull.scss';
</style>
<script>
  import toolBar from './toolBar.vue'

  export default {
    mounted: function () {

    },
    components: {
      toolBar,
    },
    data () {
      return {}
    },
    methods: {},
    computed: {},
    filters: {}

  }
</script>
