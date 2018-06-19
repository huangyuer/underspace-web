<template>
  <div class="search-all">
    <tool-bar></tool-bar>
    <div class="inner">
      <div class="result">
        <span>找到<span style="width: 37px;text-align: center;display: inline-block;">{{total}}</span>条结果</span>
      </div>
      <image-text-item :obj="i" :idd="i.id" :type="i.type" :author="i.chiefEditor" :name="i.name" :year="i.publishedAt"
                       :cover="i.cover"
                       :keywords="i.keywords" v-for="i in searchContextData" :content="i.highlight"
                       :key="i.id"></image-text-item>
    </div>
    <patinator @pageClick="pageClick"></patinator>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/css/search/searchContext.scss";
</style>
<script>
import toolBar from "./toolBar.vue";
import imageTextItem from "./imageTextItem.vue";
import patinator from "../public/paginator.vue";

export default {
  mounted: function() {
    console.log("searchContext mounted...");
  },
  watch: {},
  components: {
    toolBar,
    imageTextItem,
    patinator
  },
  data() {
    return {};
  },
  methods: {
    pageClick: function(p) {
      console.log(p);
      console.log(this.currentLevelOneCategory.nickName);
      let paginatorCategory = this.paginatorCategory;
      if (paginatorCategory.parent === "book") {
        //点击图书的时候
        var pp = this.levelOneCategoryList[1].children;
        var keywords = [];
        for (var i = 0; i < pp.length; i++) {
          if (pp[i].active === true) {
            keywords.push(pp[i].keyword);
          }
        }
        switch (paginatorCategory.child) {
          case "":
            var p1 = {
              rows: 10,
              searchContent: this.searchContent,
              page: p.clickPage,
              keywords: keywords
            };
            this.$store.dispatch("searchBook", p1);
            this.$store.commit("setActiveLevelOneCategory", 1);
            this.$store.dispatch("searchBookLeftPanel", p1);
            break;
          case "clcs":
            var p1 = {
              rows: 10,
              searchContent: this.searchContent,
              page: p.clickPage,
              keywords: keywords,
              content: paginatorCategory.content
            };
            this.$store.dispatch("searchBookClcsDataList", p1);
            break;
          case "sublib":
            var p1 = {
              rows: 10,
              searchContent: this.searchContent,
              page: p.clickPage,
              keywords: keywords,
              content: paginatorCategory.content
            };
            this.$store.dispatch("searchBookSublibsDataList", p1);
            break;
          default:
            break;
        }
      }
      if (paginatorCategory.parent === "bookChapter") {
        var p1 = {
          rows: 10,
          searchContent: this.searchContent,
          page: p.clickPage
        };
        this.$store.dispatch("searchBookChapterDataList", p1);
      }
      if (paginatorCategory.parent === "requirement") {
        var pp = this.levelOneCategoryList[3].children;
        var keywords = [];
        for (var i = 0; i < pp.length; i++) {
          if (pp[i].active === true) {
            keywords.push(pp[i].keyword);
          }
        }
        switch (paginatorCategory.child) {
          case "":
            var pp = {
              rows: 10,
              searchContent: this.searchContent,
              page: p.clickPage,
              keywords: keywords
            };
            this.$store.dispatch("searchRequirement", pp);
            break;
          case "province":
            var pp = {
              rows: 10,
              page: p.clickPage,
              content: paginatorCategory.content,
              searchContent: this.searchContent
            };
            this.$store.dispatch("searchRequirementProvinceChild", pp);
            break;
          case "way":
            var pp = {
              rows: 10,
              page: p.clickPage,
              content: paginatorCategory.content,
              searchContent: this.searchContent
            };
            this.$store.dispatch("searchRequirementWayChild", pp);
            break;
        }
      }
      if (paginatorCategory.parent === "anli") {
        var pp = this.levelOneCategoryList[6].children;
        var keywords = [];
        for (var i = 0; i < pp.length; i++) {
          if (pp[i].active === true) {
            keywords.push(pp[i].keyword);
          }
        }
        switch (paginatorCategory.child) {
          case "":
            var pp = {
              rows: 10,
              searchContent: this.searchContent,
              page: p.clickPage,
              keywords: keywords
            };
            this.$store.dispatch("searchLiterature", pp);
            break;
          case "era":
            var pp = {
              rows: 10,
              searchContent: this.searchContent,
              page: p.clickPage,
              keywords: keywords
            };
            this.$store.dispatch("searchLiteratureEraChild", pp);
            break;
          case "category":
            var pp = {
              rows: 10,
              searchContent: this.searchContent,
              page: p.clickPage,
              keywords: keywords
            };
            this.$store.dispatch("searchLiteratureCategoryChild", pp);
            break;
          default:
            break;
        }
      }
      if (paginatorCategory.parent === "knowledge") {
        let pp = {
          rows: 10,
          searchContent: this.searchContent,
          page: p.clickPage
        };
        switch (paginatorCategory.child) {
          case "":
            this.$store.dispatch("searchExpertPatent", pp);
            break;
          case "expert":
            this.$store.dispatch("searchExpertChild", pp);
            break;
          case "patent":
            this.$store.dispatch("searchPatentChild", pp);
            break;
          case "achievement":
            this.$store.dispatch("searchAchievementChild", pp);
            break;
          default:
            break;
        }
      }
      if (paginatorCategory.parent === "paper") {
        let pp = {
          rows: 10,
          searchContent: this.searchContent,
          page: p.clickPage
        };
        switch (paginatorCategory.child) {
          case "":
            this.$store.dispatch("searchPaper", pp);
            break;
          default:
            break;
        }
      }
    }
  },
  computed: {
    bookList: function() {
      return this.$store.state.search.bookList;
    },
    total: function() {
      return this.$store.state.paginator.total;
    },
    searchContextData: function() {
      return this.$store.state.searchContext.searchContextData;
    },
    searchContent: function() {
      return this.$store.state.searchComponent.searchContent;
    },
    currentLevelOneCategory: function() {
      let d = this.$store.state.searchComponent.levelOneCategoryList;
      for (var i = 0; i < d.length; i++) {
        if (d[i].active === true) {
          return d[i];
        }
      }
    },
    levelOneCategoryList: function() {
      return this.$store.state.searchComponent.levelOneCategoryList;
    },
    paginatorCategory: function() {
      return this.$store.state.paginator.paginatorCategory;
    }
  },
  filters: {}
};
</script>
