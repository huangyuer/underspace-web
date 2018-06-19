<template>
  <div class="app">
    <!--wap left menu-->
    <side-bar></side-bar>
    <section class="container" :class="{open : isSideBarShow}">
      <router-view name="app-header"></router-view>
      <router-view name="app-body"></router-view>
      <router-view name="app-footer"></router-view>
      <router-view name="media-popup"></router-view>
      <router-view name="loading-component"></router-view>
    </section>
  </div>
</template>

<script>
import sideBar from "./components/public/sideBar";
export default {
  name: "app",
  components: {
    sideBar
  },
  computed: {
    isSideBarShow() {
      return this.$store.getters.isSideBarShow;
    }
  }
};
</script>

<style scoped>
@import "./assets/css/style.css";
</style>
