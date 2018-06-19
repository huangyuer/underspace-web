<template>
  <div class="book-tool-bar">
    <div class="tool-bar-left" @click="showMenu()">
      <p>
        <span v-text="leftBookCategory"></span>
        <b class="triangle-down"></b>
      </p>
    </div>
    <div class="tool-bar-center">
      <p>
        <span>排序</span>
        <b class="triangle-down"></b>
      </p>
    </div>
    <div class="tool-bar-right">
      <p>
        <span>显示</span>
        <b class="triangle-down"></b>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/book/bookToolBar";
</style>

<script>
  export default {
    methods: {
      showMenu: function () {
        this.$store.commit('setLeftBookMenuVisible', true)
      }
    },
    computed: {
      leftBookCategory () {
        return this.$store.getters.leftBookCategory
      }
    }
  }
</script>
