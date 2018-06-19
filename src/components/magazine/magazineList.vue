<template>
  <div class="magazine-list">

    <search-component></search-component>
    <nav-bar firstUrl="/" firstNav="首页" secondUrl="/magazine/list" secondNav="期刊列表"></nav-bar>
    <div class="magazine-list-wrapper">
      <magazine-list-left></magazine-list-left>

      <div class="magazine-left">
        <div class="list-cent">
          <!--wap tool bar-->
          <magazine-tool-bar></magazine-tool-bar>

          <tool-bar></tool-bar>

          <div class="list-center">

           <!--  <div class="list-count">找到&nbsp;<font color="#E37423">5</font>&nbsp;条结果</div> -->

            <magazine-list-center></magazine-list-center>

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
      <magazine-list-right></magazine-list-right>
    </div>
    <div class="clear"></div>

  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/magazine/magazineList";
</style>

<script>
  import toolBar from '../search/toolBar.vue'
  import magazineToolBar from './magazineToolBar.vue'
  import navBar from '../public/navBar.vue'
  import searchComponent from '../public/searchComponent.vue'
  import magazineListCenter from './magazineListCenter.vue'
  import magazineListLeft from './magazineListLeft.vue'
  import magazineListRight from './magazineListRight.vue'
  export default {
    components: {
      toolBar,
      magazineToolBar,
      navBar,
      searchComponent,
      magazineListCenter,
      magazineListLeft,
      magazineListRight
    }
  }
</script>
