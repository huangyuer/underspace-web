<template>
  <div class="left-panel">
    <category-item v-for="i,index in itemList"  :ids="index" :obj="i" :key="i.id"></category-item>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/search/leftPanel.scss';
</style>
<script>
  import categoryItem from './categoryItem.vue'

  export default {
    mounted: function () {

    },
    components: {
      categoryItem,
    },
    data () {
      return {}
    },
    methods: {},
    computed: {
      itemList: function () {
        return this.$store.state.leftPanel.leftPanelItemList
      }
    },
    filters: {}

  }
</script>
