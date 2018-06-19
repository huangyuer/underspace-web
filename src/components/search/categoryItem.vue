<template>

  <div class="category-item">
    <div class="level-1-category">
      <div class="inner">
        <span>{{obj.name}}</span>
        <svg @click="collapseClick" v-if="!collapse" class="icon" aria-hidden="true" height="30px" width="30px">
          <use xlink:href="#icon-jia"></use>
        </svg>
        <svg @click="collapseClick" v-else class="icon" aria-hidden="true" height="30px" width="30px">
          <use xlink:href="#icon-jianhao"></use>
        </svg>
      </div>
    </div>
    <div v-show="collapse" :class="{'level-2-active': i.active}" @click="setActiveLevel2Category(index,i)"
         class="level-2-category" v-for="i,index in obj.children" :key="i.id">
      <div class="inner">
        <span>{{i.name}}</span>
        <span>{{i.count}}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/search/categoryItem.scss';
</style>
<script>
  export default {
    props: ['obj', 'ids'],
    mounted: function () {

    },
    components: {},
    data () {
      return {
        collapse: true,
      }
    },
    methods: {
      collapseClick: function () {
        this.collapse = !this.collapse
      },
      setActiveLevel2Category: function (ids, obj) {
        let p = {
          parentIndex: this.ids,
          childIndex: ids
        }
        console.log(this.obj)
        console.log(obj.name)
        this.$store.commit('setActiveLevel2Category', p)
        if (obj.name === '图书' || obj.name === '图书章节' || obj.name === '企业需求' || obj.name === '工程文献' || obj.name === '知识产权') {
          switch (obj.name) {
            case '图书':
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
              this.$store.dispatch('searchBook', p1)
              this.$store.commit('setActiveLevelOneCategory', 1)
              this.$store.dispatch('searchBookLeftPanel', p1)
              this.$store.commit('setPaginatorCategory', {parent: 'book'})
              break
            case '图书章节':
              var pp = this.levelOneCategoryList[1].children
              var keywords = []
              for (var i = 0; i < pp.length; i++) {
                if (pp[i].active === true) {
                  keywords.push(pp[i].keyword)
                }
              }
              let ppt = {
                rows: 10,
                searchContent: this.searchContent,
                page: 1,
                keywords: keywords
              }
//              this.$store.dispatch('searchBookChapter', ppt)
              this.$store.dispatch('searchBookChapterDataList', ppt)
              this.$store.commit('setActiveLevelOneCategory', 1)
              this.$store.dispatch('searchBookLeftPanel', ppt)
              this.$store.commit('setPaginatorCategory', {parent: 'bookChapter'})
              break
            case '企业需求':
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
                keywords: keywords
              }
              this.$store.dispatch('searchRequirement', p5)
              this.$store.commit('setActiveLevelOneCategory', 5)
              this.$store.dispatch('searchRequirementLeftPanel', p5)
              this.$store.commit('setPaginatorCategory', {parent: 'requirement'})
              break
            case '工程文献':
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
                keywords: keywords
              }
              this.$store.dispatch('searchLiterature', p6)
              this.$store.commit('setActiveLevelOneCategory', 6)
              this.$store.dispatch('searchLiteratureLeftPanel', p6)
              this.$store.commit('setPaginatorCategory', {parent: 'anli'})
              break
            case '知识产权':
              let p7 = {
                rows: 10,
                searchContent: this.searchContent,
                page: 1,
              }
              this.$store.dispatch('searchExpertPatent', p7)
              this.$store.commit('setActiveLevelOneCategory', 7)
              this.$store.dispatch('searchKnowledgeLeftPanel', p7)
              this.$store.commit('setPaginatorCategory', {parent: 'knowledge'})
              break

            default:
              break
          }
          this.$router.push('/search/result/context')
        }
        if (obj.name === '工程' || obj.name === '工程师' || obj.name === '多媒体') {
          switch (obj.name) {
            case '工程':
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
                keywords: keywords
              }
              this.$store.dispatch('searchProject', p2)
              this.$store.commit('setActiveLevelOneCategory', 2)
              this.$store.dispatch('searchProjectLeftPanel', p2)
              this.$store.commit('setPaginatorCategory', {parent: 'project'})
              break
            case '工程师':
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
              }
              this.$store.dispatch('searchEngineer', p3)
              this.$store.commit('setActiveLevelOneCategory', 3)
              this.$store.dispatch('searchEngineerLeftPanel', p3)
              this.$store.commit('setPaginatorCategory', {parent: 'engineer'})
              break
            case '多媒体':
              let p4 = {
                rows: 9,
                searchContent: this.searchContent,
                page: 1,
              }
              this.$store.dispatch('searchMedia', p4)
              this.$store.dispatch('searchMediaLeftPanel', p4)
              this.$store.commit('setActiveLevelOneCategory', 4)
              this.$store.commit('setPaginatorCategory', {parent: 'pic'})
              break
            default:
              break

          }
          this.$router.push('/search/result/media')
        }
        //左边栏，点击图书以后
        if (this.obj.type === 'bookCategory') {
          var pp = {
            rows: 10,
            page: 1,
            content: obj.name,
            searchContent: this.searchContent
          }
          console.log(p.parentIndex)
          if (p.parentIndex === 0) {//中图分类
            this.$store.dispatch('searchBookClcsDataList', pp)
            this.$store.commit('setPaginatorCategory', {parent: 'book', child: 'clcs', content: obj.name})
          } else if (p.parentIndex === 1) {//字库分类
            this.$store.dispatch('searchBookSublibsDataList', pp)
            this.$store.commit('setPaginatorCategory', {parent: 'book', child: 'sublib', content: obj.name})
          } else if (p.parentIndex === 2) {//内容类别分类
            var pps = {
              rows: 10,
              page: 1,
              searchContent: this.searchContent
            }
            if (obj.name === '书籍章节') {
              this.$store.dispatch('searchBookChapterDataList', pps)
              this.$store.commit('setPaginatorCategory', {parent: 'bookChapter', child: ''})
            } else {
              var pp = this.levelOneCategoryList[1].children
              var keywords = []
              for (var i = 0; i < pp.length; i++) {
                if (pp[i].active === true) {
                  keywords.push(pp[i].keyword)
                }
              }
              var p1 = {
                rows: 10,
                searchContent: this.searchContent,
                page: 1,
                keywords: keywords
              }
              this.$store.dispatch('searchBook', p1)
              this.$store.commit('setPaginatorCategory', {parent: 'book', child: ''})
            }
          }
        }
        if (this.obj.type === 'projectSecond') {
          if (p.parentIndex === 0) {
            var ppt = {
              rows: 9,
              page: 1,
              searchContent: this.searchContent,
              content: obj.name
            }
            this.$store.dispatch('searchProjectEraChild', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'project', child: 'era', content: obj.name})
          } else if (p.parentIndex === 1) {
            var ppt = {
              rows: 9,
              page: 1,
              searchContent: this.searchContent,
              content: obj.name
            }
            this.$store.dispatch('searchProjectAreaChild', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'project', child: 'area', content: obj.name})
          }
        }
        if (this.obj.type === 'engineerCategory') {
          if (p.parentIndex === 0) {
            var ppt = {
              rows: 9,
              page: 1,
              searchContent: this.searchContent,
              content: obj.name
            }
            this.$store.dispatch('searchEngineerEraChild', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'engineer', child: 'era', content: obj.name})
          } else if (p.parentIndex === 1) {
            var ppt = {
              rows: 9,
              page: 1,
              searchContent: this.searchContent,
              content: obj.name
            }
            this.$store.dispatch('searchEngineerTradeChild', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'engineer', child: 'trade', content: obj.name})
          }
        }
        if (this.obj.type === 'mediaCateogry') {
          if (p.childIndex === 0) {
            var ppt = {
              searchContent: this.searchContent,
              rows: 9,
              page: 1
            }
            this.$store.dispatch('searchBookchart', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'pic', child: 'bookChart'})
          } else if (p.childIndex === 1) {
            var ppt = {
              searchContent: this.searchContent,
              rows: 9,
              page: 1
            }
            this.$store.dispatch('searchBookformula', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'pic', child: 'bookFormula'})
          } else if (p.childIndex === 2) {
            var ppt = {
              searchContent: this.searchContent,
              rows: 9,
              page: 1
            }
            this.$store.dispatch('searchBookimage', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'pic', child: 'bookImage'})
          }
        }
        if (this.obj.type === 'requirementCategory') {
          var pp = this.levelOneCategoryList[3].children
          var keywords = []
          for (var i = 0; i < pp.length; i++) {
            if (pp[i].active === true) {
              keywords.push(pp[i].keyword)
            }
          }
          var ppt = {
            searchContent: this.searchContent,
            content: obj.name,
            rows: 10,
            page: 1,
            keywords: keywords,
          }
          if (p.parentIndex === 0) {
            this.$store.dispatch('searchRequirementProvinceChild', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'requirement', child: 'province', content: obj.name})
          } else if (p.parentIndex === 1) {
            this.$store.commit('setPaginatorCategory', {parent: 'requirement', child: 'way', content: obj.name})
            this.$store.dispatch('searchRequirementWayChild', ppt)
          }
        }
        if (this.obj.type === 'literatureCategory') {
          var ppt = {
            searchContent: this.searchContent,
            content: obj.name,
            rows: 10,
            page: 1
          }
          if (p.parentIndex === 0) {
            this.$store.commit('setPaginatorCategory', {parent: 'anli', child: 'era', content: obj.name})
            this.$store.dispatch('searchLiteratureEraChild', ppt)
          } else if (p.parentIndex === 1) {
            this.$store.commit('setPaginatorCategory', {parent: 'anli', child: 'category', content: obj.name})
            this.$store.dispatch('searchLiteratureCategoryChild', ppt)
          }
        }
        if (this.obj.type === 'knowledgeCategory') {
          var ppt = {
            searchContent: this.searchContent,
            content: obj.name,
            rows: 10,
            page: 1
          }
          if (p.childIndex === 0) {
            this.$store.dispatch('searchExpertChild', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'knowledge', child: 'expert'})
          } else if (p.childIndex === 1) {
            this.$store.commit('setPaginatorCategory', {parent: 'knowledge', child: 'patent'})
            this.$store.dispatch('searchPatentChild', ppt)
          } else if (p.childIndex === 2) {
            this.$store.dispatch('searchAchievementChild', ppt)
            this.$store.commit('setPaginatorCategory', {parent: 'knowledge', child: 'achievement'})
          }
        }
      }
    },
    computed: {
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
