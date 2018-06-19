<template>
  <div class="paper-tool-bar">
    <div class="tool-bar-left" @click="showMenu()">
      <p>
        <span v-text="leftPaperCategory"></span>
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
  @import "../../assets/css/paper/paperToolBar";
</style>

<script>
  export default {
    methods: {
      showMenu: function () {
        this.$store.commit('setLeftPaperMenuVisible', true)
      }
    },
    computed: {
      leftPaperCategory () {
        return this.$store.getters.leftPaperCategory
      }
    }
  }
</script>
