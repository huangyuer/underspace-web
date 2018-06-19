<template>
  <div class="engineer_wrapper">

    <engineer-header-search></engineer-header-search>
    <engineer-header-bg></engineer-header-bg>
    <engineer-header-bar></engineer-header-bar>

    <div class="engineer_list_wrapper">


      <!--工程师-->
      <div class="engineer_list" v-if="engineers.length > 0">

        <!--wap 端-->
        <div class="wap_engineer_header">
          <div class="wap_engineer_header_left">
            <img src="../assets/images/engineer_avatar.png"/>
            <span>工程师</span>
          </div>
          <div class="wap_engineer_header_right">
            <router-link :to="'/engineer/list'">
              <span>查看全部→</span>
            </router-link>
          </div>
          <div class="clear"></div>
        </div>

        <router-link :to="'/engineer/list'">
          <div class="engineer_list_left">
            <div class="engineer_list_left_img">
              <img src="../assets/images/engineer_avatar.png"/>
            </div>
            <h4>工程师</h4>
            <p>收录了从古代到改革开放以来的著名工程师，包括等等</p>
          </div>
        </router-link>
        <div class="engineer_list_right">
          <ul>
            <li v-for="engineer in engineers">
              <router-link :to="'/engineer/info/' + engineer._id">
                <engineer-item :engineer="engineer._source"></engineer-item>
              </router-link>
            </li>
          </ul>
          <div class="list_all">
            <a href="javascript:;" @click="searchMoreEngineers()" class="link">  <p class="list_all_btn"> > </p>
              <p>更多搜索结果</p>
            </a>
          </div>
        </div>

      </div>
      <div class="clear"></div>

      <!--工程-->
      <div class="engineer_list" v-if="works.length > 0">

        <!--wap 端-->
        <div class="wap_engineer_header">
          <div class="wap_engineer_header_left">
            <img src="../assets/images/project_avatar.png"/>
            <span>工程项目</span>
          </div>
          <div class="wap_engineer_header_right">
            <router-link :to="'/project/list'">
              <span>查看全部→</span>
            </router-link>
          </div>
          <div class="clear"></div>
        </div>

        <router-link :to="'/project/list'">
          <div class="engineer_list_left">
            <div class="engineer_list_left_img">
              <img src="../assets/images/project_avatar.png"/>
            </div>
            <h4>工程项目</h4>
            <p>收录了从古代到改革开放依赖的著名工程师，包括等等</p>
          </div>
        </router-link>
        <div class="engineer_list_right">
          <ul>
            <li v-for="project in works">
              <router-link :to="'/project/info/' + project._id">
                <project-item :project="project._source"></project-item>
              </router-link>
            </li>
          </ul>
          <div class="list_all">
            <a href="javascript:;" @click="searchMoreProjects()" class="link">  <p class="list_all_btn"> > </p>
              <p>更多搜索结果</p>
            </a>
          </div>
        </div>
      </div>
      <div class="clear"></div>

      <!--工程文献-->
      <div class="engineer_list" v-if="literatures.length > 0">

        <!--wap 端-->
        <div class="wap_engineer_header">
          <div class="wap_engineer_header_left">
            <img src="../assets/images/project_avatar.png"/>
            <span>工程文献</span>
          </div>
          <div class="wap_engineer_header_right">
            <router-link :to="'/literature/list'">
              <span>查看全部→</span>
            </router-link>
          </div>
          <div class="clear"></div>
        </div>

        <router-link :to="'/literature/list'">
          <div class="engineer_list_left">
            <div class="engineer_list_left_img">
              <img src="../assets/images/literature_avatar.png"/>
            </div>
            <h4>工程文献</h4>
            <p>收录了从古代到改革开放以来的著名工程师，包括等等</p>
          </div>
        </router-link>
        <div class="literature_list_right">
          <ul>
            <li v-for="literature in literatures">
              <router-link :to="'/literature/info/' + literature._id">
                <literature-item :literature="literature._source"></literature-item>
              </router-link>
            </li>
          </ul>
           <div class="list_all">
            <a href="javascript:;" @click="searchMoreLiteratures()" class="link">  <p class="list_all_btn"> > </p>
              <p>更多搜索结果</p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/css/selected";
</style>

<script>
  import engineerHeaderSearch from './engineer/engineerHeaderSearch.vue'
  import engineerHeaderBg from './engineer/engineerHeaderBg.vue'
  import engineerHeaderBar from './engineer/engineerHeaderBar.vue'
  import engineerItem from './engineer/engineerItem.vue'
  import projectItem from './project/projectItem.vue'
  import literatureItem from './literature/literatureItem.vue'
  export default {
    data() {
      return {

      }
    },
    components: {
      engineerHeaderSearch,
      engineerHeaderBg,
      engineerHeaderBar,
      engineerItem,
      projectItem,
      literatureItem
    },
    mounted(){
      this.getData();
    },
    computed: {
      engineers () {
        return this.$store.state.search.hybridEngineerList
      },
      literatures () {
        return this.$store.state.search.hubridLiteratureList
      },
      works () {
        return this.$store.state.search.hybridProjectList
      },
      searchContextData: function () {
        return this.$store.state.searchContext.searchContextData
      },
      searchContent: function () {
        return this.$store.state.searchComponent.searchContent
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
      searchMoreEngineers(val){
        let p = {
          searchContent: this.searchContent,
          category: '0',
          keywords: [],
          rows: 16,
          page: 1,
        }
        this.$store.dispatch('searchEngineer', p)
        // this.$store.dispatch('searchProject', p)
        this.$router.push('/engineer/search/result')
      },
      searchMoreProjects(val){
        let p = {
          searchContent: this.searchContent,
          category: '0',
          keywords: [],
          rows: 16,
          page: 1,
        }
        this.$store.dispatch('searchProject', p)
        // this.$store.dispatch('searchProject', p)
        this.$router.push('/project/search/result')
      },
      searchMoreLiteratures(val){
        let p = {
          searchContent: this.searchContent,
          category: '0',
          keywords: [],
          rows: 16,
          page: 1,
        }
        this.$store.dispatch('searchLiterature', p)
        // this.$store.dispatch('searchProject', p)
        this.$router.push('/literature/search/result')
      }
    }
  }
</script>
