<template>
  <div class="search-media">
    <tool-bar></tool-bar>
    <div class="inner">
      <div class="result">
        <span>找到<span style="width: 30px;text-align: center;display: inline-block;">{{total}}</span>条结果</span>
      </div>
      <div class="row" v-for="i in searchMediaData" :key="i.id">
        <image-item :obj="j" :clicks="j.clicks" :type="typess" :idd="j.id" :cover="j.url"
                    :title="j.title"
                    :summary="j.description"
                    v-for="j in i.children"
                    :key="i.id"></image-item>
      </div>
    </div>
    <paginator @pageClick="pageClick" :total="total"></paginator>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/search/searchMedia.scss';
</style>
<script>
  import toolBar from './toolBar.vue'
  import paginator from '../public/paginator.vue'
  import imageItem from './imageItem.vue'

  export default {
    mounted: function () {
      console.log('searchMedia mounted...')
    },
    components: {
      toolBar,
      paginator,
      imageItem,
    },
    data () {
      return {}
    },
    methods: {
      pageClick: function (p) {
        console.log(this.currentLevelOneCategory.nickName)
        let paginatorCategory = this.paginatorCategory
        console.log('parent: ' + paginatorCategory.parent + ', child:' + paginatorCategory.child)
        if (paginatorCategory.parent === 'project') {
          var pp = this.levelOneCategoryList[2].children
          var keywords = []
          for (var i = 0; i < pp.length; i++) {
            if (pp[i].active === true) {
              keywords.push(pp[i].keyword)
            }
          }
          switch (paginatorCategory.child) {
            case '':
              var p = {
                rows: 9,
                searchContent: this.searchContent,
                page: p.clickPage,
                keywords: keywords
              }
              this.$store.dispatch('searchProject', p)
              break
            case 'era':
              var p = {
                rows: 9,
                page: p.clickPage,
                searchContent: this.searchContent,
                content: paginatorCategory.content,
              }
              this.$store.dispatch('searchProjectEraChild', p)
              break
            case 'area':
              var p = {
                rows: 9,
                page: p.clickPage,
                searchContent: this.searchContent,
                content: paginatorCategory.content,
              }
              this.$store.dispatch('searchProjectAreaChild', p)
              break
            default:
              break
          }
        }
        if (paginatorCategory.parent === 'engineer') {
          var pp = this.levelOneCategoryList[3].children
          var keywords = []
          for (var i = 0; i < pp.length; i++) {
            if (pp[i].active === true) {
              keywords.push(pp[i].keyword)
            }
          }
          switch (paginatorCategory.child) {
            case '':
              var p = {
                rows: 9,
                searchContent: this.searchContent,
                page: p.clickPage,
                keywords: keywords,
              }
              this.$store.dispatch('searchEngineer', p)
              break
            case 'era':
              var p = {
                rows: 9,
                searchContent: this.searchContent,
                page: p.clickPage,
                keywords: keywords,
                content: paginatorCategory.content,
              }
              this.$store.dispatch('searchEngineerEraChild', p)
              break
            case 'trade':
              var p = {
                rows: 9,
                searchContent: this.searchContent,
                page: p.clickPage,
                keywords: keywords,
                content: paginatorCategory.content,
              }
              this.$store.dispatch('searchEngineerTradeChild', p)
              break
            default:
              break
          }
        }
        if (paginatorCategory.parent === 'pic') {
          var p = {
            rows: 9,
            page: p.clickPage,
            searchContent: this.searchContent,
          }
          switch (paginatorCategory.child) {
            case '':
              this.$store.dispatch('searchMedia', p)
              break
            case 'bookChart':
              this.$store.dispatch('searchBookchart', p)
              break
            case 'bookFormula':
              this.$store.dispatch('searchBookformula', p)
              break
            case 'bookImage':
              this.$store.dispatch('searchBookimage', p)
              break
            default:
              break
          }
        }
      }
    },
    computed: {
      total: function () {
        return this.$store.state.paginator.total
      },
      searchMediaData: function () {
        return this.$store.state.searchMedia.searchMediaData
      },
      typess: function () {
        let currentLevelOneCategory = this.$store.state.searchComponent.currentLevelOneCategory
        switch (currentLevelOneCategory.nickName) {
          case 'project':
            return '工程'
            break
          case 'engineer':
            return '工程师'
            break
          default:
            break
        }
      },
      categoryList: function () {
        return this.$store.state.searchComponent.levelOneCategoryList
      },
      searchContent: function () {
        return this.$store.state.searchComponent.searchContent
      },
      currentLevelOneCategory: function () {
        return this.$store.state.searchComponent.currentLevelOneCategory
      },
      levelOneCategoryList: function () {
        return this.$store.state.searchComponent.levelOneCategoryList
      },
      paginatorCategory: function () {
        return this.$store.state.paginator.paginatorCategory
      },
    },
    filters: {},
  }
</script>
