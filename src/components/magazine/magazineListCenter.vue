<template>
  <div class="magazine-list-center">
    <ul>
      <li v-for="issue in issues">
        <magazine-item :issue="issue"></magazine-item>
      </li>
      <!--<li>-->
        <!--<magazine-item></magazine-item>-->
      <!--</li>-->
      <!--<li>-->
        <!--<magazine-item></magazine-item>-->
      <!--</li>-->
      <!--<li>-->
        <!--<magazine-item></magazine-item>-->
      <!--</li>-->
      <!--<li>-->
        <!--<magazine-item></magazine-item>-->
      <!--</li>-->
      <!--<li>-->
        <!--<magazine-item></magazine-item>-->
      <!--</li>-->
      <!--<li>-->
        <!--<magazine-item></magazine-item>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/magazine/magazineListCenter";
</style>

<script>
  import magazineItem from './magazineItem'
  export default {
    mounted () {
      this.$store.dispatch('getLatestIssues', {'magazineId': '', 'limit': this.pageSize, 'page': this.currentPage})
      // this.$store.dispatch('getLatestMagazines', {'category': this.currentCategory, 'limit': this.pageSize, 'page': this.currentPage})
    },
    components: {
      magazineItem
    },
    computed: {
      
      pageSize () {
        let pageSize = this.$route.query.limit || 20
        return parseInt(pageSize)
      },
      currentPage () {
        let currentPage = this.$route.query.page || 1
        return parseInt(currentPage)
      },
      issues () {
        return this.$store.getters.issues
      }
    }
  }

</script>
