<template>
  <div class="search-component">
    <img class="img-bg" src="../../assets/images/search-background.png">
    <div class="inner">
      <div class="left">
        <img class="left-img" src="../../assets/images/search-word.png">
      </div>
      <div class="right">
        <div class="category">
          <span @click="setActiveLevelOneCategory(index)" :class="{'category-active': i.active}" v-for="i,index in categoryList">{{i.name}}</span>
        </div>
        <div class="search-content">
          <input id="search-input" @keydown.enter="clickSearch" v-model="searchContent" :placeholder="placeholder" class="search-input">
          <div class="search-btn" @click="clickSearch">
            <span>搜索</span>
          </div>
        </div>
        <div class="level-two-category">
          <div class="item" v-for="i,index in currentLevelOneCategory.children">
            <input type="checkbox" @click="setChildStatus(index,currentLevelOneCategory.name)">
            <label>{{i.name}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/public/searchComponent.scss";

</style>
<script>
  import {
    setCookie,
    getCookie
  } from "../../assets/js/cookie";

  export default {
    mounted: function () {},
    data() {
      return {
        searchContent_: "",
        placeholder: "全文检索"
      };
    },
    methods: {
      setActiveLevelOneCategory: function (index) {
        this.$store.commit("setActiveLevelOneCategory", index);
        console.log(this.currentLevelOneCategory.nickName);
        console.log(this.currentLevelOneCategory.nickName)
        switch (this.currentLevelOneCategory.nickName) {
          case "all":
            let p = {
              searchContent: this.searchContent
            };
            this.$store.dispatch("searchAll", p);
            this.$router.push("/search/result");
            break;
          case "book":
            var pp = this.levelOneCategoryList[1].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            let p1 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchBook", p1);
            this.$store.dispatch("searchBookLeftPanel", p1);
            this.$router.push("/search/result/context");
            this.$store.commit("setPaginatorCategory", {
              parent: "book",
              child: ""
            });
            //            //获取登录用户的所有收藏数列表
            // this.$store.dispatch('getUserFavoriteBooks')
            break;
          case "chapterTitle":
            let ppst = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: []
            };
            this.$store.dispatch("searchBookChapterDataList", ppst);
            this.$store.dispatch("searchBookLeftPanel", ppst);
            this.$router.push("/search/result/context");
            this.$store.commit("setPaginatorCategory", {
              parent: "bookChapter",
              child: ""
            });
            break;
          case "project":
            var pp = this.levelOneCategoryList[3].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            let p2 = {
              rows: 9,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchProject", p2);
            this.$store.dispatch("searchProjectLeftPanel", p2);
            this.$router.push("/search/result/media");
            this.$store.commit("setPaginatorCategory", {
              parent: "project",
              child: ""
            });
            break;
          case "engineer":
            var pp = this.levelOneCategoryList[4].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            let p3 = {
              rows: 9,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchEngineer", p3);
            this.$store.dispatch("searchEngineerLeftPanel", p3);
            this.$router.push("/search/result/media");
            this.$store.commit("setPaginatorCategory", {
              parent: "engineer",
              child: ""
            });
            break;
          case "pic":
            let p4 = {
              rows: 9,
              searchContent: this.searchContent,
              page: 1
            };
            this.$store.dispatch("searchMedia", p4);
            this.$router.push("/search/result/media");
            this.$store.dispatch("searchMediaLeftPanel", p4);
            this.$store.commit("setPaginatorCategory", {
              parent: "pic",
              child: ""
            });
            break;
          case "requirement":
            var pp = this.levelOneCategoryList[6].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            let p5 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchRequirement", p5);
            this.$store.dispatch("searchRequirementLeftPanel", p5);
            this.$router.push("/search/result/context");
            this.$store.commit("setPaginatorCategory", {
              parent: "requirement",
              child: ""
            });
            break;
          case "anli":
            var pp = this.levelOneCategoryList[7].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            let p6 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchLiterature", p6);
            this.$router.push("/search/result/context");
            this.$store.dispatch("searchLiteratureLeftPanel", p6);
            this.$store.commit("setPaginatorCategory", {
              parent: "anli",
              child: ""
            });
            break;
          case "knowledge":
            let p7 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1
            };
            this.$store.dispatch("searchExpertPatent", p7);
            this.$router.push("/search/result/context");
            this.$store.dispatch("searchKnowledgeLeftPanel", p7);
            this.$store.commit("setPaginatorCategory", {
              parent: "knowledge",
              child: ""
            });
            break;
          case "paper":
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 10,
              page: 1
            };
            this.$store.dispatch("searchPaper", p);
            this.$store.dispatch("searchPaperLeftPanel", p);
            this.$router.push("/search/result/context");
            this.$store.commit("setPaginatorCategory", {
              parent: "paper",
              child: ""
            });
            this.$store.dispatch("searchPaperLeftPanel", p);
          default:
            break;
        }
      },
      clickSearch: function () {
        let toot = {
          name: this.searchContent
        };
        this.$store.dispatch("updateHotWords", toot);
        this.$store.dispatch("getHotWordList");
        if (!this.currentLevelOneCategory) {
          this.$store.commit("setActiveLevelOneCategory", 0);
          this.$router.push("/search/result");
        }
        switch (this.currentLevelOneCategory.nickName) {
          case "all":
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_
            };
            this.$store.dispatch("searchAll", p);
            break;
          case "book":
            var pp = this.levelOneCategoryList[1].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 10,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchBook", p);
            this.$store.dispatch("searchBookLeftPanel", p);
            this.$router.push("/search/result/context");
            this.$store.commit("setPaginatorCategory", {
              parent: "book",
              child: ""
            });
            break;
          case "chapterTitle":
            let ppst = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: []
            };
            this.$store.dispatch("searchBookChapterDataList", ppst);
            this.$store.dispatch("searchBookLeftPanel", ppst);
            this.$router.push("/search/result/context");
            this.$store.commit("setPaginatorCategory", {
              parent: "bookChapter",
              child: ""
            });
            break;
          case "project":
            var pp = this.levelOneCategoryList[3].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 9,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchProject", p);
            this.$store.dispatch("searchProjectLeftPanel", p);
            this.$store.commit("setPaginatorCategory", {
              parent: "project",
              child: ""
            });
            break;
          case "engineer":
            var pp = this.levelOneCategoryList[4].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 9,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchEngineer", p);
            this.$store.dispatch("searchEngineerLeftPanel", p);
            this.$store.commit("setPaginatorCategory", {
              parent: "engineer",
              child: ""
            });
            break;
          case "pic":
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 9,
              page: 1
            };
            this.$store.dispatch("searchMedia", p);
            this.$router.push("/search/result/media");
            this.$store.dispatch("searchMediaLeftPanel", p);
            this.$store.commit("setPaginatorCategory", {
              parent: "pic",
              child: ""
            });
            break;
          case "requirement":
            var pp = this.levelOneCategoryList[6].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 10,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchRequirement", p);
            this.$store.dispatch("searchRequirementLeftPanel", p);
            this.$store.commit("setPaginatorCategory", {
              parent: "requirement",
              child: ""
            });
            break;
          case "anli":
            var pp = this.levelOneCategoryList[7].children;
            var keywords = [];
            for (var i = 0; i < pp.length; i++) {
              if (pp[i].active === true) {
                keywords.push(pp[i].keyword);
              }
            }
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 9,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchLiterature", p);
            this.$router.push("/search/result/context");
            this.$store.dispatch("searchLiteratureLeftPanel", p);
            this.$store.commit("setPaginatorCategory", {
              parent: "anli",
              child: ""
            });
            break;
          case "knowledge":
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 9,
              page: 1
            };
            this.$store.dispatch("searchExpertPatent", p);
            this.$store.commit("setPaginatorCategory", {
              parent: "knowledge",
              child: ""
            });
            this.$store.dispatch("searchKnowledgeLeftPanel", p);
            break;
          case "paper":
            var p = {
              searchContent: this.searchContent ?
                this.searchContent :
                this.searchContent_,
              rows: 10,
              page: 1
            };
            this.$store.dispatch("searchPaper", p);
            this.$store.commit("setPaginatorCategory", {
              parent: "paper",
              child: ""
            });
            this.$store.dispatch("searchPaperLeftPanel", p);
            // this.$store.dispatch('searchExpertPatent', p)
            // this.$store.commit('setPaginatorCategory', {parent: 'knowledge', child: ''})
            // this.$store.dispatch('searchKnowledgeLeftPanel', p)
            break;
          default:
            break;
        }
      },
      setChildStatus: function (a, b) {
        let p = {
          name: b,
          index: a
        };
        this.$store.commit("setLevelOneCategoryChildStatus", p);
      }
    },
    computed: {
      searchStatus: function () {
        return this.$store.state.search.searchStatus;
      },
      categoryList: function () {
        return this.$store.state.searchComponent.levelOneCategoryList;
      },
      searchContent: {
        get: function () {
          return this.$store.state.searchComponent.searchContent;
        },
        set: function (val) {
          this.searchContent_ = val;
        }
      },
      levelOneCategoryList: function () {
        return this.$store.state.searchComponent.levelOneCategoryList;
      },
      currentLevelOneCategory: function () {
        return this.$store.state.searchComponent.currentLevelOneCategory;
      }
    },
    watch: {
      searchContent_: function (val) {
        this.$store.commit("setSearchContent", val);
      }
    }
  };

</script>

<style>


</style>
