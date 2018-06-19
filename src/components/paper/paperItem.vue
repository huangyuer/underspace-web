<template>
  <div class="paper-item">
    <router-link :to="`/paper/info/${paper._id}`">
      <div class="paper-title" v-text="paper.title"></div>
    </router-link>
    <div class="paper-subtitle">
      <span class="paper-category">期刊论文</span>
      <span v-text="paper.authorInfo">作者名</span>
      <span>-</span>
      <span>期刊名字</span>
      <span class="paper-publish-id">CSTPCD</span>
      <span>-</span>
      <span class="paper-publish-number">{{paper.createdAt | getYear}}年{{paper.createdAt | getMonth}}期</span>
    </div>
    <div class="paper-summary">
      <span>内容摘要：</span><span v-text="paper.summary"></span>
    </div>
    <div class="paper-keyword">
      <span>关键词：</span>
      <span>关键词一</span>
      <span>关键词二</span>
      <span>关键词三</span>
      <span>关键词三</span>
      <span>关键词三</span>
    </div>
    <div class="paper-item-btn-group">
      <router-link :to="`/paper/info/${paper._id}`">
        <span>在线阅读</span>
      </router-link>
      <span>加入收藏</span>
    </div>
    <div class="paper-divider"></div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/paper/paperItem";
</style>

<script>
  export default {
    props: {
      paper: {}
    },
    filters: {
      getYear: function (value) {
        let date = new Date(value)
        return date.getFullYear()
      },
      getMonth: function (value) {
        let date = new Date(value)
        let month = date.getMonth() + 1
        return month < 10 ? '0' + month : month
      }
    }
  }
</script>
