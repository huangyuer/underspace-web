<template>
  <div class="paper-info">
    <search-component></search-component>
    <nav-bar firstUrl="/" firstNav="首页" :secondUrl="'/magazine/info/' + paperId" secondNav="期刊"
             :thirdUrl="'/paper/info/' + paperId" :thirdNav="paper.title"></nav-bar>
    <div class="paper-info-wrapper">

      <div class="paper-info-left">
        <paper-info-left :papers="papers"></paper-info-left>
      </div>

      <div class="paper-info-center">
        <div class="paper-info-header">
          <div class="paper-info-title" v-text="paper.title">
            
          </div>
          <div class="paper-info-subtitle">
            <span>作者</span>
            <span v-text="paper.author"></span>
            <!--<span>贾留锁</span>-->
            <!--<span>王永</span>-->
            <span @click="readPdf(paper)" class="paper-info-btn">PDF阅读</span>
          </div>
          <!--内容-->
          <div class="paper-info-content" v-html="paper.contentRaw"></div>
        </div>

        <div class="paper-info-next">
          <span>下一篇：</span>
          <span @click="scrollToTop()" v-if="nextPaper"><router-link :to="'/paper/info/' + nextPaper._id">
          {{nextPaper.title}}
        </router-link></span>
        </div>
      </div>
      <div class="paper-info-right">
        <div class="paper-info-magazine-bar">所属期刊</div>
        <div class="paper-info-magazine-wrapper">
          <magazine-item :issue="paper.issue"></magazine-item>
        </div> 
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/paper/paperInfo";
</style>

<script>
  
  import searchComponent from '../public/searchComponent'
  import paperInfoLeft from './paperInfoLeft'
  import navBar from '../public/navBar'
  import paperApi from '../../store/api/paper';
  import magazineItem from '../magazine/magazineItem'
  const isMobile = require('ismobilejs');

  export default {
    components: { 
      searchComponent,
      magazineItem,
      paperInfoLeft,
      navBar
    },
    data () {
      return {
        paper: {},
        papers: []
      }
    },
    computed: {
      paperId () {
        return this.$route.params.paperId || ''
      },
      nextPaper(){
        let nextPaper = {'_id': '', 'title': ''}
        let currentIndex = 0
        let self = this;
        if(this.papers.length > 0){
          this.papers.forEach(function(paper, index){ 
            if(paper._id === self.paperId){
              currentIndex = index
            }
          }); 
        }
        if(currentIndex + 1 < this.papers.length){
          nextPaper = this.papers[currentIndex + 1] 
        }else{
          nextPaper = this.papers[0] 
        }
        return nextPaper
      }
    },
    watch: { 
      '$route': 'getData'
    },
    methods: {
      // 加入收藏夹
      addToFav () {
        //
      },
      // 在线阅读
      readPdf: function(paper){ 
        let pdfUrl = this.$store.state.MAGAZINES_PDF_SERVER_PREFIX + paper.pdf
        if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
          pdfUrl = this.$store.state.MAGAZINES_PDF_MOBILE_SERVER_PREFIX + issue.pdf
        }
        console.log(pdfUrl)
        window.location.href = pdfUrl
      }, 
      scrollToTop: function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      getData(){
        let promise = paperApi.getPaperDetails(this.paperId)
        let self = this;
        promise.then(function(response){ 
          console.log(response);
          self.paper = response.data;
          let promise1 = paperApi.getLatestPapers(self.paper.issue._id)
          let self1 = self;
          promise1.then(function(response){ 
            self1.papers = response.data.data
          }, function(error){
            console.log(error);
          });
        }, function(error){
          console.log(error);
        }); 
        //this.$store.dispatch('getPaperDetails', {'paperId': this.paperId}) 
        
      }
    },
    mounted () {
      this.getData();
    }

  }
</script>

