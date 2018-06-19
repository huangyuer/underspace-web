<template>
  <div class="search-paper">
    <ul>
      <li v-for="paper in papers">
        <paper-item :paper="paper"></paper-item>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/search/searchPaper";
</style>

<script>
  import paperItem from '../paper/paperItem'
  export default {
    components: {
      paperItem
    },
    computed: {
      papers () {
        return this.$store.getters.latestPapers
      },
      pageSize () {
        let pageSize = this.$route.query.limit || 20
        return parseInt(pageSize)
      },
      currentPage () {
        let currentPage = this.$route.query.page || 1
        return parseInt(currentPage)
      },
      papers () {
        return this.$store.getters.latestPapers
      }
    },
    mounted () {
      this.$store.dispatch('getLatestPapers', {'limit': this.pageSize, 'page': this.currentPage})
    }

  }
</script>
