<template>
  <div class="search-all">
    <!--<div class="title">-->
    <!--<span>找到<span>77,638,132</span>条结果</span>-->
    <!--</div>-->
    <div class="subtitle" v-show="allPageBookList.length>0" :class="{'m-top-21':allPageBookList.length>0}">
      <div class="inner">
        <span>相关图书</span>
        <div class="right">
          <span @click="redirectSeeAll('book')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="inners">
      <image-text-item :obj="i" :idd="i.id" type="图书" :author="i.chiefEditor" :name="i.name" :year="i.publishedAt"
                       :content="i.highlight"
                       :cover="preFix+i.cover" :keywords="i.keywords" v-for="i in allPageBookList"
                       :key="i.id"></image-text-item>
    </div>


    <div class="subtitle" v-show="allChapterList.length>0" :class="{'m-top-21':allChapterList.length>0}">
      <div class="inner">
        <span>相关章节</span>
        <div class="right">
          <span @click="redirectSeeAll('chapter')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="inners">
      <image-text-item :obj="i" :idd="i.id" type="图书章节" :author="i.chiefEditor" :name="i.title" :year="i.publishedAt"
                       :content="i.content"
                       :cover="preFix+i.cover" :keywords="i.keywords" v-for="i in allChapterList"
                       :key="i.id"></image-text-item>
    </div>


    <!--论文-->
    <div class="subtitle">
      <div class="inner">
        <span>相关论文</span>
        <div class="right">
          <span @click="redirectSeeAll('paper')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="inners">
      <ul>
        <li v-for="paper in allPagePaperList">
          <paper-item :paper="paper"></paper-item>
        </li>
      </ul>
    </div>


    <div class="subtitle" v-show="allPageProjectList[0].children.length>0"
         :class="{'m-top-21':allPageProjectList[0].children.length>0}">
      <div class="inner">
        <span>相关工程</span>
        <div class="right">
          <span @click="redirectSeeAll('project')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="row" v-show="allPageProjectList[0].children.length>0" v-for="i in allPageProjectList" :key="i.id">
      <image-item :idd="j.id" type="工程" :cover="j.cover" :title="j.title" :summary="j.summary" v-for="j in i.children"
                  :key="i.id"></image-item>
    </div>
    <div class="subtitle" v-show="allPageEngineerList[0].children.length>0"
         :class="{'m-top-21':allPageEngineerList[0].children.length>0}">
      <div class="inner">
        <span>相关工程师</span>
        <div class="right">
          <span @click="redirectSeeAll('engineer')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="row" v-for="i in allPageEngineerList" :key="i.id" v-if="allPageEngineerList[0].children.length>0">
      <image-item :idd="j.id" type="工程师" :cover="j.avatar" :title="j.name" :summary="j.summary" v-for="j in i.children"
                  :key="i.id"></image-item>
    </div>


    <div id="mediaAll" class="subtitle" v-show="allPageMediaList[0].children.length>0"
         :class="{'m-top-21':allPageMediaList[0].children.length>0}">
      <div class="inner">
        <span>相关多媒体</span>
        <div class="right">
          <span @click="redirectSeeAll('media')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="row" v-for="i  in allPageMediaList" :key="i.id" v-if="allPageMediaList[0].children.length>0">
      <image-item :cover="preFix+j.url" :title="j.title" :summary="j.description" v-for="j in i.children"
                  :key="j.id"></image-item>
    </div>
    <div class="subtitle" v-show="allPageRequirementList.length>0"
         :class="{'m-top-21':allPageRequirementList.length>0}">
      <div class="inner">
        <span>企业需求</span>
        <div class="right">
          <span @click="redirectSeeAll('requirement')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="inners">
      <image-text-item :obj="i" type="企业需求" :name="i.name" :year="i.createdAt" :content="i.content"
                       :keywords="i.keywords" v-for="i in allPageRequirementList" :key="i.id"></image-text-item>
    </div>
    <div class="subtitle" v-show="allPageLiteratureList.length>0" :class="{'m-top-21':allPageLiteratureList.length>0}">
      <div class="inner">
        <span>工程文献</span>
        <div class="right">
          <span @click="redirectSeeAll('literature')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="inners">
      <image-text-item :obj="i" :idd="i.id" type="工程文献" :name="i.name" :year="i.createdAt" :content="i.summary"
                       v-for="i in allPageLiteratureList" :key="i.id"></image-text-item>
    </div>
    <div class="subtitle" v-show="allPageKnowledgeList.length>0" :class="{'m-top-21':allPageKnowledgeList.length>0}">
      <div class="inner">
        <span>知识产权</span>
        <div class="right">
          <span @click="redirectSeeAll('knowledge')">查看全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="inners">
      <image-text-item :obj="i" :type="i.type" :name="i.name" :year="i.createdAt" :content="i.summary"
                       v-for="i in allPageKnowledgeList" :key="i.id"></image-text-item>
    </div>
    <div style="margin-bottom: 80px;"></div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/search/searchAll.scss';
</style>
<script>
  import imageTextItem from './imageTextItem.vue'
  import imageItem from './imageItem.vue'
  import PaperItem from "../paper/paperItem"

  export default {
    mounted: function () {
      console.log(this.allPageProjectList)
    },
    components: {
      PaperItem,
      imageTextItem,
      imageItem,
    },
    data () {
      return {
        preFix: this.$store.state.IMAGE_SERVER_PREFIX
      }
    },
    methods: {
      redirectSeeAll: function (category) {
        switch (category) {
          case 'book':
            var pp = this.levelOneCategoryList[1].children
            var keywords = []
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword)
              }
            }
            let p1 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords
            }
            this.$store.commit('setActiveLevelOneCategory', 1)
            this.$store.dispatch('searchBook', p1)
            this.$store.dispatch('searchBookLeftPanel', p1)
            this.$router.push('/search/result/context')
            break
          case 'project':
            var pp = this.levelOneCategoryList[2].children
            var keywords = []
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword)
              }
            }
            let p2 = {
              rows: 9,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords,
            }
            this.$store.commit('setActiveLevelOneCategory', 2)
            this.$store.dispatch('searchProject', p2)
            this.$router.push('/search/result/media')
            this.$store.dispatch('searchProjectLeftPanel', p2)
            break

          // 论文
          case 'paper':
            this.$router.push('/search/result/paper')
            break

          case 'engineer':
            var pp = this.levelOneCategoryList[3].children
            var keywords = []
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword)
              }
            }
            let p3 = {
              rows: 9,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords,
            }
            this.$store.commit('setActiveLevelOneCategory', 3)
            this.$store.dispatch('searchEngineer', p3)
            this.$router.push('/search/result/media')
            this.$store.dispatch('searchEngineerLeftPanel', p3)
            break
          case 'media':
            let p4 = {
              rows: 9,
              searchContent: this.searchContent,
              page: 1,
            }
            this.$store.commit('setActiveLevelOneCategory', 4)
            this.$store.dispatch('searchMedia', p4)
            this.$router.push('/search/result/media')
            this.$store.dispatch('searchMediaLeftPanel', p4)
            break
          case 'literature':
            var pp = this.levelOneCategoryList[6].children
            var keywords = []
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword)
              }
            }
            let p6 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords,
            }
            this.$store.commit('setActiveLevelOneCategory', 6)
            this.$store.dispatch('searchLiterature', p6)
            this.$router.push('/search/result/context')
            this.$store.dispatch('searchLiteratureLeftPanel', p6)
            break
          case 'knowledge':
            let p7 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
            }
            this.$store.commit('setActiveLevelOneCategory', 7)
            this.$store.dispatch('searchExpertPatent', p7)
            this.$router.push('/search/result/context')
            this.$store.dispatch('searchKnowledgeLeftPanel', p7)
            break
          case 'requirement':
            var pp = this.levelOneCategoryList[3].children
            var keywords = []
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword)
              }
            }
            let p5 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords,
            }
            this.$store.commit('setActiveLevelOneCategory', 5)
            this.$store.dispatch('searchRequirement', p5)
            this.$router.push('/search/result/context')
            this.$store.dispatch('searchRequirementLeftPanel', p5)
            break
          case 'chapter':
            var pp = this.levelOneCategoryList[1].children
            var keywords = []
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword)
              }
            }
            var p8 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords
            }
            this.$store.dispatch('searchBookChapterDataList', p8)
            this.$store.commit('setActiveLevelOneCategory', 1)
            this.$store.dispatch('searchBookLeftPanel', p8)
            this.$router.push('/search/result/context')
//            this.$store.commit('setPaginatorCategory', {parent: 'bookChapter'})
            break
          default:
            break
        }
      }
    },
    computed: {
      allPageBookList: function () {
        return this.$store.state.search.allPageBookList
      },
      allPageProjectList: function () {
        return this.$store.state.search.allPageProjectList
      },
      allPagePaperList: function () {
        return this.$store.state.search.allPagePaperList
      },
      allChapterList: function () {
        return this.$store.state.search.allChapterList
      },
      allPageEngineerList: function () {
        console.log('allPageEngineerList： ' + this.$store.state.search.allPageEngineerList)
        return this.$store.state.search.allPageEngineerList
      },
      allPageMediaList: function () {
        return this.$store.state.search.allPageMediaList
      },
      allPageRequirementList: function () {
        return this.$store.state.search.allPageRequirementList
      },
      allPageLiteratureList: function () {
        return this.$store.state.search.allPageLiteratureList
      },
      allPageKnowledgeList: function () {
        return this.$store.state.search.allPageKnowledgeList
      },
      searchContent: function () {
        return this.$store.state.searchComponent.searchContent
      },
      levelOneCategoryList: function () {
        return this.$store.state.searchComponent.levelOneCategoryList
      },
    },
    filters: {}

  }
</script>
