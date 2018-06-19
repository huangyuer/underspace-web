<template>
  <div class="literature_wrapper">

    <engineer-header-bg></engineer-header-bg>
    <engineer-header-bar></engineer-header-bar>

    <div class="literature_list_wrapper">

      <!--工程文献-->
      <div class="literature_list">

        <!--wap 端-->
        <div class="wap_literature_header">
          <div class="wap_literature_header_left">
            <img src="../../assets/images/literature_avatar.png"/>
            <span>工程文献</span>
          </div>
          <div class="clear"></div>
        </div>

        <router-link :to="'/literature/list'">
        <div class="literature_list_left">
          <div class="literature_list_left_img">
            <img src="../../assets/images/literature_avatar.png"/>
          </div>
          <h4>工程文献</h4>
          <p>收录了从古代到改革开放以来的著名工程师，包括等等</p>
        </div>
      </router-link>
        <div class="literature_list_right">
          <div>
          <ul>
            <li v-for="literature in literatures">
              <router-link :to="'/literature/info/' + literature._id">
                <literature-item :literature="literature"></literature-item>
              </router-link>
            </li>
          </ul>
          </div>
          <div class="clear"></div>
          <div style="width: 100%; margin: 20px auto; text-align: center;" class="paginator">
            <el-pagination
              small
              background
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="literaturesTotal" :current-page="currentPage" :page-size="pageSize">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="clear"></div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/literature/literatureList";
</style>

<script>
  import engineerHeaderBg from '../engineer/engineerHeaderBg.vue'
  import engineerHeaderBar from '../engineer/engineerHeaderBar.vue'
  import literatureItem from './literatureItem.vue'
  export default {
    components: {
      engineerHeaderBg,
      engineerHeaderBar,
      literatureItem
    },
    data() {
      return {
      }
    },
    mounted(){
      this.getLatestLiteratures();
    },
    computed:{
      literatures(){
        return this.$store.getters.literatures;
      },
      literaturesTotal(){
        return this.$store.getters.literaturesTotal;
      },
      currentCategory(){
        let category = this.$route.query.category || '';
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
       '$route': 'getLatestLiteratures'
    },
    methods: {
      getLatestLiteratures: function(category,limit,page){
        this.$store.dispatch('getLatestLiteratures', {'category': this.currentCategory,'era': this.currentEra, 'limit': 20, 'page': 1});
      },
      handleCurrentChange(val) {
        this.$store.dispatch('getLatestLiteratures', {'category': this.currentCategory, 'era': this.currentEra, 'limit': this.pageSize, 'page': val});
        document.documentElement.scrollTop = 0;

      },
    }
  }

</script>
