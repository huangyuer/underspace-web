<template>
  <div class="index_bg">
    <!-- <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="120"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="repulse"
      class="particles">
    </vue-particles> -->
    <div class="top">

      <!--web端-->
      <div class="top_menu">
        <!--左侧menu-->
        <ul class="nav">
          <li>
            <a href="/" class="menu_item link active">首页</a>
            <li>
              <li class="drop-down">
                <a href="javascript:;" @click="listBooks" class="menu_item link">工程数据库</a>
                <div class="triangle-up"></div>
                <ul class="drop-down-content">
                  <!-- <li v-for="lib in sublibs"><a @click="listBooksByLib(lib.name)" class="menu_item link" href="javascript:;"
                                            v-text="lib.name"></a>
              </li> -->
                  <li>
                    <router-link class="menu_item link" to="/book/list">图书</router-link>
                  </li>
                  <li>
                    <router-link class="menu_item link" to="/magazine/list">期刊</router-link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#/selected" class="menu_item link">工程师史</a>
              </li>
              <li>
                <a href="http://trade.tongjix.cn/#/" class="menu_item link">版权贸易</a>
              </li>
              <li>
                <a href="http://bbs.tongjix.cn/#/" class="menu_item link">工程技术论坛</a>
              </li>
              <li>
                <a href="http://www.tjdesignx.com/#/" class="menu_item link">同济设计在线</a>
              </li>
              <!--  <li><a href="http://bim.tjdesignx.com/#/" class="menu_item link">BIM培训中心</a></li> -->
        </ul>

        <!--右侧状态栏-->
        <div class="top_login" v-show="loggedIn">
          <router-link to="/user/info">
            <a href="javascript:;" class="login_btn1">个人中心</a>
          </router-link>
          <a href="javascript:;" class="reg_btn1" @click="logout()">退出登录</a>
        </div>
        <div class="top_login" v-show="!loggedIn">
          <router-link to="/auth/login">
            <a href="javascript:;" class="login_btn1">登录</a>
          </router-link>
          <router-link to="/auth/register">
            <a href="javascript:;" class="reg_btn1">注册</a>
          </router-link>
        </div>
      </div>

      <!--移动端-->
      <div class="top_wap_menu">
        <router-link to="/user/info">
          <img src="../assets/images/wap_avatar.png" />
        </router-link>
        <router-link to="/search/result">
          <img src="../assets/images/wap_search.png" />
        </router-link>
      </div>
    </div>
    <div class="clear"></div>

    <!--web端-->
    <div class="index_logo">
      <img src="../assets/images/index_logo.png" alt="">
    </div>
    <!--移动端-->
    <div class="wap_index_logo">
      <img src="../assets/images/wap_index_logo.png" alt="">
    </div>

    <!--web端-->
    <div class="search_l">
      <div class="search_ul">
        <ul>
          <li style="cursor: pointer;font-weight: bold" @click="setActiveLevelOneCategory(index)" :class="{'ul_cur':i.active}" v-for="i,index in levelOneCategoryList">
            <span style="font-size: 14px;" class="item-normal" :class="{'item-active':i.active}">{{i.name}}</span>
          </li>
        </ul>
      </div>
      <div class="clear"></div>
      <div class="slist">
        <form action="">
          <input @keydown.enter="clickSearch" v-model="searchContent" :placeholder="placeholder" type="text" class="s_in" style="outline: none">
          <input @click="clickSearch" class="s_btn" readonly value="搜索" style="cursor: pointer;outline: none">
        </form>
      </div>
    </div>

    <!--移动端-->
    <div class="wap_menu">
      <ul>
        <li>
          <a href="javascript:;" class="menu_item link" @click="toggleSubLibs()">工程数据库</a>
          <ul class="down-content" v-show="isSubLibsShow">
            <li v-for="lib in sublibs">
              <a @click="listBooksByLib(lib.name)" href="javascript:;" v-text="lib.name"></a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/#/selected">工程师史</a>
        </li>
        <li>
          <a href="http://trade.tongjix.cn/#/">版权贸易</a>
        </li>
        <li>
          <a href="http://bbs.tongjix.cn/#/">工程技术论坛</a>
        </li>
        <li>
          <a href="http://www.tjdesignx.com/#/">同济设计在线</a>
        </li>
        <!-- <li><a href="http://bim.tjdesignx.com/#/">BIM培训中心</a></li> -->
      </ul>
    </div>

    <!--web端-->
    <div class="bot">
      <div>Copyright @2017 Tongji.All Rights Reserved.
        <br> 同济大学出版社版权所有 上海市杨浦区赤峰路2号 021-65982478
      </div>
    </div>

    <!--移动端-->
    <div class="wap_bot">
      <div>
        沪ICP备11031396号
        <br> 同济大学出版社版权所有 上海市杨浦区赤峰路2号
        <br>
        <span class="copyright">Copyright @2017 Tongji.All Rights Reserved.</span>
      </div>
    </div>

  </div>
</template>
<script>
  import VueParticles from "vue-particles/src/vue-particles/vue-particles.vue";
  import {
    checkLoginCookie,
    deleteCookie,
    setCookie
  } from "../assets/js/cookie";

  export default {
    name: "index",
    data() {
      return {
        isSignedIn: false,
        isLibListShow: false,
        searchContent_: "",
        placeholder: "全文检索",
        isSubLibsShow: false
      };
    },
    components: {
      VueParticles
    },
    methods: {
      // toggleSubLibs wap 切换子菜单
      toggleSubLibs: function () {
        this.isSubLibsShow = !this.isSubLibsShow;
      },
      listBooks: function () {
        this.$router.push("/book/list");
      },
      listBooksByLib: function (lib) {
        this.$router.push("/book/list?lib=" + encodeURI(lib));
      },
      // 检查token是否失效
      checkToken: function () {
        if (checkLoginCookie()) {
          // 若未失效则登录注册切换显示个人中心
          this.isSignedIn = true;
        }
      },
      // 退出登录
      logout: function () {
        // 删除cookie检查状态成功则退出
        deleteCookie("sessionToken");
        deleteCookie('userId');
        deleteCookie('userInfo')
        this.$store.commit("setLoggedOut");
        window.history.go(0);
        this.$router.push("/");
      },
      clickSearch: function () {
        switch (this.currentLevelOneCategory.nickName) {
          case "all":
            var p = {
              searchContent: this.searchContent
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
            let p1 = {
              rows: 10,
              searchContent: this.searchContent,
              page: 1,
              keywords: keywords
            };
            this.$store.dispatch("searchBook", p1);
            this.$store.dispatch("searchBookLeftPanel", p1);
            this.$router.push("/search/result/context");
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
            // this.$store.commit("setPaginatorCategory", {
            //   parent: "bookChapter",
            //   child: ""
            // });
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
            break;
          case "engineer":
            var pp = this.levelOneCategoryList[5].children;
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
            break;
          case "pic":
            let p4 = {
              rows: 9,
              searchContent: this.searchContent,
              page: 1
            };
            this.$store.dispatch("searchMedia", p4);
            this.$store.dispatch("searchMediaLeftPanel", p4);
            this.$router.push("/search/result/media");
            break;
          case "requirement":
            var pp = this.levelOneCategoryList[7].children;
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
            break;
          case "anli":
            var pp = this.levelOneCategoryList[8].children;
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
            this.$store.dispatch("searchLiteratureLeftPanel", p6);
            this.$router.push("/search/result/context");
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
      setActiveLevelOneCategory(ind) {
        this.$store.commit("setActiveLevelOneCategory", ind);
      }
    },
    computed: {
      loggedIn() {
        try {
          let logged = this.$store.getters.loggedIn;
          if (logged) {
            return true;
          }
          let userInfo = getCookie("userInfo");
          if (userInfo) {
            try {
              let user = JSON.parse(userInfo);
              return user;
            } catch (e) {
              return this.$store.getters.userInfo;
            }
          } else {
            return this.$store.getters.userInfo;
          }
        } catch (e) {}
      },
      sublibs() {
        return this.$store.getters.sublibs;
      },
      levelOneCategoryList: function () {
        return this.$store.state.searchComponent.levelOneCategoryList;
      },
      currentLevelOneCategory: function () {
        return this.$store.state.searchComponent.currentLevelOneCategory;
      },
      searchContent: {
        get: function () {
          return this.$store.state.searchComponent.searchContent;
        },
        set: function (val) {
          setCookie("searchContent", val);
          this.$store.commit("setSearchContent", val);
          console.log(val);
          this.searchContent_ = val;
        }
      }
    },
    mounted() {
      this.$store.commit("setActiveLevelOneCategory", 0);
      this.checkToken();
      this.$store.dispatch("listSublibs", {});
    },
    watch: {
      searchContent: function (val) {},
      searchContent_: function (val) {
        this.$store.commit("setSearchContent", val);
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import "../assets/css/index.scss";

</style>
