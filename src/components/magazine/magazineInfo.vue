<template>
  <div class="magazine-info">
    <search-component></search-component>
    <nav-bar firstUrl="/" firstNav="首页" secondUrl="/magazine/list" secondNav="期刊列表"
             :thirdUrl="'/magazine/info/' + issueId" :thirdNav="issue.year + issue.issue"></nav-bar>
    <div class="magazine-info-wrapper">
      <div class="magazine-info-left" v-if="issue">
        <div class="magazine-info-header">
          <div class="magazine-info-title" v-text="issue.year + '年第' + issue.issue + '期'"></div>
          <img src="../../assets/images/img.jpg" v-if="issue.cover === ''"/>
          <img :src="issue.cover" v-else />
          <div class="magazine-info-detail">
            <p>
              <span>主管单位：</span>
              <span v-if="issue.magzine" v-text="issue.magzine.manager"></span>
            </p>
            <p>
              <span>主办单位：</span>
              <span v-if="issue.magzine" v-text="issue.magzine.organizer"></span>
            </p>
            <p>
              <span>主编：</span>
              <span v-if="issue.magzine" v-text="issue.magzine.chiefEditor">
              </span>
            </p>
            <p>
              <span>语种：</span>
              <span v-if="issue.magzine" v-text="issue.magzine.language"></span>
            </p>
            <p>
              <span>国际刊号：</span>
              <span v-if="issue.magzine" v-text="issue.magzine.issn"></span>
            </p>
            <p>
              <span>国内刊号：</span>
              <span v-if="issue.magzine" v-text="issue.magzine.cn"></span>
            </p>
            <p>
              <span>出版周期：</span>
              <span v-if="issue.magzine" v-text="issue.magzine.period"></span>
            </p>

            <div class="magazine-info-brief">
              <span>期刊简介：</span>
              <span v-if="issue.magzine" v-text="issue.magzine.info"></span>
            </div>

            <div class="magazine-info-btn-group">
              <span @click="readPdf(issue)">在线阅读</span>
              <span @click="addToFav">加入收藏</span>
            </div>
          </div>
        </div>
        <div class="magazine-info-menu-bar">目录</div>
        <ul>
          <li v-for="paper in papers">
            <div class="magazine-info-menu-title">
              <router-link :to="'/paper/info/' + paper._id">{{paper.title}}</router-link>
            </div>
            <div class="magazine-info-menu-info">
                {{paper.content}}
            </div>
          </li>
        </ul>
      </div>
      <div class="magazine-info-right">
        <div class="magazine-info-similar-bar">相关期刊</div>
        <ul>
          <li v-for="issue in relatedIssues">
            <router-link :to="`/magazine/info/${issue._id}`">
            <div class="magazine-info-similar-item">
              <img src="../../assets/images/img.jpg" v-if="issue.cover === ''"/>
              <img :src="issue.cover" v-else />
              <span>{{issue.year}}年第{{issue.issue}}期</span>
            </div>
            </router-link>
          </li> 
        </ul>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/magazine/magazineInfo";
</style>

<script>
  import searchComponent from '../public/searchComponent'
  import navBar from '../public/navBar'
  import issueApi from '../../store/api/issue';
  const isMobile = require('ismobilejs');

  export default {
    components: {
      searchComponent,
      navBar
    },
    data () {
      return { 
        relatedIssues: []
      }
    },
    mounted () {
     this.getData();

    },
    watch: { 
      '$route': 'getData'
    },
    computed: {
      issueId () {
        return this.$route.params.issueId || ''
      },
      issue () {
        return this.$store.getters.issueDetail
      },
      papers () {
        return this.$store.getters.latestPapers
      }
    },
    methods: {
      // 加入收藏夹
      addToFav () {
        //
      },
      // 在线阅读
      readPdf: function(issue){ 

        let pdfUrl = this.$store.state.MAGAZINES_PDF_SERVER_PREFIX + issue.pdf
        if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
          pdfUrl = this.$store.state.MAGAZINES_PDF_MOBILE_SERVER_PREFIX + issue.pdf
        }
        console.log(pdfUrl)
        window.location.href = pdfUrl
      },
      // 在线阅读
      toMagazineContent (magazineId) {
        this.$router.push({path: '/magazine/content/' + magazineId})
      },
      getData(){
         this.$store.dispatch('getIssueDetail', {'issueId': this.issueId});
          this.$store.dispatch('getLatestPapers', {'issueId': this.issueId});
          this.getRelatedIssues();
      },
      getRelatedIssues(){
        let promise = issueApi.getRelated(this.issueId)
        let self = this;
        promise.then(function(response){ 
           self.relatedIssues = response.data.data
        }, function(error){
          console.log(error);
        }); 
      }
    }
  }
</script>

