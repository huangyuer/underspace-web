<template>
  <div class="paper-list-center">
    <ul>
      <li v-for="paper in papers">
        <paper-item :paper="paper"></paper-item>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/paper/paperListCenter";
</style>

<script>
  import paperItem from './paperItem'
  export default {
    components: {
      paperItem
    },
    computed: {
      currentCategory () {
        return this.$store.getters.leftMagazineCategory
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
    methods: {
      //
    },
    mounted () {
      this.$store.dispatch('getLatestPapers', {'limit': this.pageSize, 'page': this.currentPage})
      // this.$store.dispatch('getLatestPapers', {'category': this.currentCategory, 'limit': this.pageSize, 'page': this.currentPage})
    }
  }
</script>
