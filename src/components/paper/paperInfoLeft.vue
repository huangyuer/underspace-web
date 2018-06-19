<template>
  <div class="paper-info-left-wrapper">
    <div class="paper-info-menu-bar">
      目录
    </div>
    <ul v-if="papers">
      <li v-for="paper in papers">
        <router-link :to="'/paper/info/' + paper._id">
          {{paper.title}}
        </router-link>
      </li> 
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/paper/paperInfoLeft";
</style>

<script>
export default {
  props: ['papers', ],
  computed:{
    paperId () {
        return this.$route.query.paperId || ''
    }, 
  },
  mounted () { 

  }
}
</script>
