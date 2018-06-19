<template>
  <div class="engineer_wrapper">
    <engineer-header-search></engineer-header-search>
    <engineer-header-bg></engineer-header-bg>
    <engineer-header-bar></engineer-header-bar>

    <div class="engineer_list_wrapper">

      <!--工程师-->
      <div class="engineer_list">

        <!--wap 端-->
        <div class="wap_engineer_header">
          <div class="wap_engineer_header_left">
            <img src="../../assets/images/engineer_avatar.png"/>
            <span>工程师</span>
          </div>
          <div class="clear"></div>
        </div>

        <router-link :to="'/engineer/list'">
        <div class="engineer_list_left">
          <div class="engineer_list_left_img">
            <img src="../../assets/images/engineer_avatar.png"/>
          </div>
          <h4>工程师</h4>
          <p>收录了从古代到改革开放以来的著名工程师，包括等等</p>
        </div>
        </router-link>
        <div class="engineer_list_right">
          <div>
          <ul>
              <li v-for="engineer in engineers">
                <router-link :to="'/engineer/info/' + engineer._id">
                  <engineer-item :engineer="engineer"></engineer-item>
                </router-link>
              </li>
          </ul>
          </div>
          <div style="clear:both;"></div>
          <div style="width: 100%; margin: 20px auto; text-align: center;" class="paginator">
            <el-pagination
              small
              background
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="engineersTotal" :current-page="currentPage" :page-size="pageSize">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/engineer/engineerList";
</style>

<script>
  import engineerHeaderSearch from './engineerHeaderSearch.vue'
  import engineerHeaderBg from './engineerHeaderBg.vue'
  import engineerHeaderBar from './engineerHeaderBar.vue'
  import engineerItem from './engineerItem.vue'
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
    },
    mounted(){
      this.getData();
    },
    computed: {
      engineers () {
        return this.$store.getters.engineers;
      },

      isSearchResult () {
        return this.$store.getters.engineers.isSearchResult;
      },
      engineersTotal(){
        return this.$store.getters.engineersTotal;
      },
      currentProfession(){
        let profession = this.$route.query.profession || '';
        return profession;
      },
      currentCategory(){
        let category = this.$route.query.category ? this.$route.query.category : '';
        return category;
      },
      currentEra(){
        let era = this.$route.query.era || '';
        return era;
      },
      currentArea () {
        let era = this.$route.query.area || ''
        return era
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
       '$route': 'getData'
    },
    methods: {
      getData: function(){
        this.$store.dispatch('getLatestEngineers', {'category': this.currentCategory, 'era': this.currentEra, 'area': this.currentArea, 'limit': this.pageSize, 'page': this.currentPage});
      },
      handleCurrentChange(val) {
        this.$store.dispatch('getLatestEngineers', {'category': this.currentCategory, 'era': this.currentEra, 'area': this.currentArea, 'limit': this.pageSize, 'page': val});
        document.documentElement.scrollTop = 0;

      },
    }
  }
</script>
