<template>
  <div class="book-category-bar">
    <p @click="showBookCategory()">
      <span>图书目录</span>
      <b class="triangle-down"></b>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/book/bookCategoryBar";
</style>

<script>
  export default {
    methods: {
      showBookCategory: function () {
        this.$store.commit('setBookCategoryVisible', true)
      }
    }
  }
</script>
