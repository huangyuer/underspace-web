<template>
  <div class="magazine-item" v-if="issue">
    <router-link :to="'/magazine/info/' + issue._id">
      <img src="../../assets/images/img.jpg" v-if="issue.cover === ''"/>
      <img :src="issue.cover" v-else />
      <div class="magazine-title">{{issue.year}}年第{{issue.issue}}期</div>
      <div class="magazine-time"></div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/magazine/magazineItem";
</style>

<script>
  export default {
    props: {
      issue: {'_id': '', 'cover': '', 'year': '', 'issue': ''}
    },
    filters: {
      
    }
  }
</script>
