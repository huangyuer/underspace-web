<template>
  <div class="back_bar">
    <a href="javascript:;" @click="goBack()" class="link">
      < &nbsp; 返回
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/css/public/backBar";
</style>

<script>
export default {
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>


