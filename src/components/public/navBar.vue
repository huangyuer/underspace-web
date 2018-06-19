<template>
  <div>
    <div class="nav-bar">
      <router-link :to="firstUrl">
        <span class="activated" v-if="firstNav" v-text="firstNav"></span>
      </router-link>

      <span v-if="secondNav"> > </span>
      <router-link :to="secondUrl" v-if="secondNav">
        <span class="activated" v-text="secondNav"></span>
      </router-link>

      <span v-if="thirdNav"> > </span>
      <router-link :to="thirdUrl" v-if="thirdNav">
        <span class="activated" v-text="thirdNav"></span>
      </router-link>

      <span v-if="fourthNav"> > </span>
      <router-link :to="fourthUrl" v-if="fourthNav">
        <span class="activated" v-text="fourthNav"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      firstNav: String,
      firstUrl: String,
      secondNav: String,
      secondUrl: String,
      thirdNav: String,
      thirdUrl: String,
      fourthNav: String,
      fourthUrl: String
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/public/navBar";
</style>

