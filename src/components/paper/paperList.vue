<template>
  <div class="paper-list">

    <search-component></search-component>
    <nav-bar firstUrl="/" firstNav="首页" secondUrl="/paper/list" secondNav="论文列表"></nav-bar>
    <div class="paper-list-wrapper">
      <paper-list-left></paper-list-left>

      <div class="paper-left">
        <div class="list-cent">
          <!--wap tool bar-->
          <paper-tool-bar></paper-tool-bar>

          <tool-bar></tool-bar>

          <div class="list-center">

            <div class="list-count">找到&nbsp;<font color="#E37423">23232</font>&nbsp;条结果</div>

            <paper-list-center></paper-list-center>

            <div class="clear"></div>
            <!--<div style="width: 100%; margin: 20px auto; text-align: center;" class="paginator">-->
            <!--<el-pagination-->
            <!--small-->
            <!--background-->
            <!--@current-change="handleCurrentChange"-->
            <!--layout="prev, pager, next"-->
            <!--:total="booksTotal" :current-page="currentPage" :page-size="pageSize">-->
            <!--</el-pagination>-->
            <!--</div>-->
          </div>

        </div>
      </div>

      <paper-list-right></paper-list-right>
    </div>
    <div class="clear"></div>

  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/paper/paperList";
</style>

<script>
  import toolBar from '../search/toolBar.vue'
  import paperToolBar from './paperToolBar.vue'
  import navBar from '../public/navBar.vue'
  import searchComponent from '../public/searchComponent.vue'
  import paperListCenter from './paperListCenter.vue'
  import paperListLeft from './paperListLeft.vue'
  import paperListRight from './paperListRight.vue'
  export default {
    components: {
      toolBar,
      paperToolBar,
      navBar,
      searchComponent,
      paperListCenter,
      paperListLeft,
      paperListRight
    }
  }
</script>
