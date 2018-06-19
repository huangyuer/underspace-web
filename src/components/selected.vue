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
                <engineer-item :engineer="engineer"></engineer-item>
              </router-link>
            </li>
          </ul>
          <div class="list_all">
            <router-link to="/engineer/list">
              <p class="list_all_btn"> > </p>
              <p>查看全部</p>
            </router-link>
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
            <p>收录了从古代到改革开放依赖的著名工程师，包括等等</p>`
          </div>
        </router-link>
        <div class="engineer_list_right">
          <ul>
            <li v-for="project in works">
              <router-link :to="'/project/info/' + project._id">
                <project-item :project="project"></project-item>
              </router-link>
            </li>
          </ul>
          <div class="list_all">
            <router-link to="/project/list">
              <p class="list_all_btn"> > </p>
              <p>查看全部</p>
            </router-link>
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
                <literature-item :literature="literature"></literature-item>
              </router-link>
            </li>
          </ul>
          <div class="list_all">
            <router-link to="/literature/list">
              <p class="list_all_btn"> > </p>
              <p>查看全部</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="clear"></div>

    </div>
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
    data () {
      return {}
    },
    mounted () {
      let p = {
        searchContent: '工程',
        category: '0',
      }

      this.$store.dispatch('searchHybrid', p)
      this.getData()
    },
    computed: {
      engineers () {
        //return this.$store.state.search.hybridEngineerList
        return this.$store.getters.engineers;
      },
      literatures () {
        //return this.$store.state.search.hubridLiteratureList
        return this.$store.getters.literatures;
      },
      works () {
        //return this.$store.state.search.hybridProjectList
        return this.$store.getters.works;
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
      currentProfession () {
        let profession = this.$route.query.profession || ''
        return profession
      }, 
    },
    components: {
      engineerHeaderSearch,
      engineerHeaderBg,
      engineerHeaderBar,
      engineerItem,
      projectItem,
      literatureItem
    },
    watch: {
      '$route': 'getData'
    },
    methods: {
      getLatestWorks: function () {
        this.$store.dispatch('getLatestWorks', {
          'category': this.currentCategory,
          'era': this.currentEra,
          'area': this.currentArea,  
          'limit': 6,
          'page': 1
        })
      },
      getLatestEngineers: function (profession, era) {
        this.$store.dispatch('getLatestEngineers', {
          category: this.currentCategory,
          'era': this.currentEra,
          'area': this.currentArea,
          'limit': 6,
          'page': 1
        })
      },
      getLatestLiteratures: function () {
        this.$store.dispatch('getLatestLiteratures', {
          'category': this.currentCategory,
          'era': this.currentEra,
          'area': this.currentArea,
          'limit': 6,
          'page': 1
        })
      },
      getData: function () {
        this.getLatestLiteratures();
        this.getLatestEngineers();
        this.getLatestWorks();
      }
    }
  }
</script>
