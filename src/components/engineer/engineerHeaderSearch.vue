<template>
  <div class="engineer-header-search">
    <div class="search-input-wrapper">
      <input type="text" placeholder="搜索精选内容" @keyup.enter="doSearch()" v-model="searchContent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/engineer/engineerHeaderSearch";
</style>

<script>
  export default {
    data () {
      return {
        searchContent: ''
      }
    },
    methods: {
      doSearch: function () {
        console.log(this.searchContent)
        let p = {
          searchContent: this.searchContent,
          category: '0',
          keywords: []
        }
        this.$store.dispatch('searchHybrid', p)
        // this.$store.dispatch('searchProject', p)
        this.$router.push('/history/search/result')
      },
    }
  }
</script>
