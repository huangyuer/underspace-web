<template>
  <div class="project_wrapper">

    <engineer-header-search></engineer-header-search>
    <engineer-header-bg></engineer-header-bg>
    <engineer-header-bar></engineer-header-bar>

    <div class="project_list_wrapper">

      <!--工程师-->
      <div class="project_list">
        <router-link :to="'/engineer/list'">
          <div class="project_list_left">
            <div class="project_list_left_img">
              <img src="../../assets/images/project_avatar.png"/>
            </div>
             <h4>工程项目</h4>
            <p>收录了从古代到改革开放依赖的著名工程师，包括等等</p>
          </div>
        </router-link>
        <div class="project_list_right">
           <ul>
              <li v-for="project in projects">
                <router-link :to="'/project/info/' + project._id">
                  <project-item :project="project._source"></project-item>
                </router-link>
              </li>
            </ul>
            <div style="clear:both;"></div>
             <div style="width: 100%; margin: 20px auto; text-align: center;" class="paginator">
            <el-pagination
              small
              background
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="projectsTotal" :current-page="currentPage" :page-size="pageSize">
            </el-pagination>
          </div>
        </div>

      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/project/projectList";
</style>

<script>
  import engineerHeaderSearch from '../engineer/engineerHeaderSearch.vue'
  import engineerHeaderBg from '../engineer/engineerHeaderBg.vue'
  import engineerHeaderBar from '../engineer/engineerHeaderBar.vue'
  import projectItem from './projectItem.vue'

  export default {
    data() {
      return {

      }
    },
    components: {
      engineerHeaderSearch,
      engineerHeaderBg,
      engineerHeaderBar,
      projectItem,

    },
    mounted(){
      this.getData();
    },
    computed: {
      projects () {
        return  this.$store.getters.projectSearchResults;
      },
      searchContent: function () {
        return this.$store.state.searchComponent.searchContent
      },
      projectsTotal(){
        return this.$store.getters.totalProjectSearchResults;
      },
      pageSize(){
        let pageSize = this.$route.query.limit || 20;
        return parseInt(pageSize);
      },
      currentPage(){
        let currentPage = this.$route.query.page || 1;
        return parseInt(currentPage);
      }
    },

    watch: {

    },
    methods: {
      getData: function(){

      },
      handleCurrentChange(val) {

      },
    }
  }
</script>
