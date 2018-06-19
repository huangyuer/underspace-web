<template>
  <div class="engineer_wrapper">

    <engineer-header-bg></engineer-header-bg>
    <engineer-header-bar></engineer-header-bar>

    <div class="engineer_list_wrapper">

      <!--工程师-->
      <div class="engineer_list">
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
              <a :href="'#/engineer/info/' + engineer._id" target="_blank">
                <engineer-item :engineer="engineer"></engineer-item>
              </a>
            </li>
          </ul> 
          </div>
          <div style="clear:both;"></div>
          <div style="margin:20px;" class="paginator">
            <el-pagination
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

<script>
  import engineerHeaderBg from './engineer_header_bg.vue'
  import engineerHeaderBar from './engineer_header_bar.vue'
  import engineerItem from './engineer_item.vue'
  export default {
    data() {
      return {
        
      }
    },
    components: {
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
      currentCategory () {
        let category = this.$route.query.category || ''
        return category
      },
      currentEra () {
        let era = this.$route.query.era || ''
        return era
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
        this.$store.dispatch('getLatestEngineers', {'category': this.currentCategory,'era': this.currentEra, 'area': this.currentArea, 'limit': this.pageSize, 'page': this.currentPage});
      },

      handleCurrentChange(val) { 
        this.$store.dispatch('getLatestEngineers', {'profession': this.currentProfession, 'era': this.currentEra,  'limit': this.pageSize, 'page': val}); 
        document.documentElement.scrollTop = 0;  
      },
    }
  }
</script>
