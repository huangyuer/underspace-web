<template>
  <div id="searchIndex" style="font-size: 0;">
    <search-component></search-component>
    <div class="gap"></div>
    <div class="inner">
      <router-view name="leftPanel"></router-view>
      <router-view name="middlePanel"></router-view>
      <router-view name="rightPanel"></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/search/searchIndex";
</style>

<script>
  import searchComponent from '../public/searchComponent.vue'

  export default {
    mounted: function () {
    },
    name: 'searchIndex',
    data () {
      return {}
    },
    props: {},
    components: {
      searchComponent,
    },
    methods: {},
    computed: {},
  }
</script>

