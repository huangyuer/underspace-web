<template>
  <div class="list_left">
    <div class="class_title">
      <span>学科分类</span>
      <div class="title_img">
        <a href="javascript:;" @click="hideCategoryMenu" v-show="categoryMenuVisible">
          <span>-</span>
        </a>
        <a href="javascript:;" @click="showCategoryMenu" v-show="!categoryMenuVisible">
          <span>+</span>
        </a>
      </div>
    </div>
    <div class="list_class" v-show="categoryMenuVisible">
      <div class="list_title" v-for="category in categories">
        <a href="javascript:;"><p @click="listBooksByCategory(category.name)" v-text="category.name"></p></a>
      </div>
    </div>

    <!-- <div class="clear"></div>
    <div class="class_title">
      <span>中图分类</span>
      <div class="title_img">
        <a href="javascript:;" @click="hideClcMenu" v-show="clcMenuVisible">
          <span>-</span>
        </a>
        <a href="javascript:;" @click="showClcMenu" v-show="!clcMenuVisible">
          <span>+</span>
        </a>
      </div>
    </div>
    <div class="list_class" v-show="clcMenuVisible">
      <div class="list_title" v-for="clc in clcs">
        <a href="javascript:;"><p @click="listBooksByClc(clc.name)" v-text="clc.name"></p></a>
      </div>
    </div> -->

    <div class="class_title">
      <span>图书库</span>
      <div class="title_img">
        <a href="javascript:;" @click="hideLibMenu" v-show="libMenuVisible">
          <span>-</span>
        </a>
        <a href="javascript:;" @click="showLibMenu" v-show="!libMenuVisible">
          <span>+</span>
        </a>
      </div>
    </div>
    <div class="list_class" v-show="libMenuVisible">
      <div class="list_title"  v-for="lib in sublibs">
        <a href="javascript:;"><p @click="listBooksByLib(lib.name)" v-text="lib.name"></p></a>
      </div>
    </div>

    <div class="clear"></div>

    

    

    <!--wap left menu-->
    <div class="wap-left-menu" v-show="leftBookMenuVisible">

      <div class="class-title">
        <span>所有类别</span>
        <div class="title-img-close">
          <a href="javascript:;" @click="hideMenu()">
            <img src="../../assets/images/wap_cross.png" />
          </a>
        </div>
      </div>


      <div class="list-class">
        <div class="list-title">
          <a href="javascript:;"><p @click="listBooks">所有类别</p></a>
        </div>
      </div>

      <div class="clear"></div>
      <div class="class-title">
        <span>学科分类</span>
        <div class="title-img">
          <a href="javascript:;" @click="hideClcMenu" v-show="clcMenuVisible">
            <span>-</span>
          </a>
          <a href="javascript:;" @click="showClcMenu" v-show="!clcMenuVisible">
            <span>+</span>
          </a>
        </div>
      </div>

      <div class="clear"></div>

      <div class="list-class" v-show="clcMenuVisible">
        <div class="list-title" v-for="clc in clcs">
          <a href="javascript:;"><p @click="listBooksByClc(clc.name)" v-text="clc.name"></p></a>
        </div>
      </div>

      <div class="class-title">
        <span>图书库</span>
        <div class="title-img">
          <a href="javascript:;" @click="hideLibMenu" v-show="libMenuVisible">
            <span>-</span>
          </a>
          <a href="javascript:;" @click="showLibMenu" v-show="!libMenuVisible">
            <span>+</span>
          </a>
        </div>
      </div>

      <div class="clear"></div>

      <div class="list-class" v-show="libMenuVisible">
        <div class="list-title"  v-for="lib in sublibs">
          <a href="javascript:;"><p @click="listBooksByLib(lib.name)" v-text="lib.name"></p></a>
        </div>
      </div>


      <!-- <div class="class-title">
        <span>学科分类</span>
        <div class="title-img">
          <a href="javascript:;" @click="hideCategoryMenu" v-show="categoryMenuVisible">
            <span>-</span>
          </a>
          <a href="javascript:;" @click="showCategoryMenu" v-show="!categoryMenuVisible">
            <span>+</span>
          </a>
        </div>
      </div>

      <div class="clear"></div>

      <div class="list-class" v-show="categoryMenuVisible">
        <div class="list-title" v-for="category in categories">
          <a href="javascript:;"><p @click="listBooksByCategory(category.name)" v-text="category.name"></p></a>
        </div>
      </div>  -->
    </div> 
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/book/bookListLeft";
</style>

<script>
  export default {
    name: 'book_list',
    data () {
      return {
        url: 'http://118.178.238.202:9988/'
      }
    },
    props: {
    },
    components: {
    },
    mounted: function() {
      // 获取子库列表
      this.$store.dispatch('listSublibs', {});
      // 获取学科分类
      this.$store.dispatch('listSubjects', {});
      // 获取中图分类
      this.$store.dispatch('listClcs', {});
    },
    watch:{
    },
    computed: {
      sublibs(){
        return this.$store.getters.sublibs;
      },
      categories(){
        return this.$store.getters.subjects;
      },
      clcs(){
        return this.$store.getters.clcs;
      },
      libMenuVisible() {
        return this.$store.getters.libMenuVisible;
      },
      categoryMenuVisible() {
        return this.$store.getters.categoryMenuVisible;
      },
      clcMenuVisible() {
        return this.$store.getters.clcMenuVisible;
      },
      leftBookMenuVisible() {
        return this.$store.getters.leftBookMenuVisible;
      },
    },
    methods: {
      listBooks: function () {
        this.hideMenu()
        this.$store.commit('setLeftBookCategory', '所有类别')
        this.$router.push('/book/list');

      },
      listBooksByCategory: function(category){
        this.hideMenu()
        this.$store.commit('setLeftBookCategory', category)
        this.$router.push('/book/list?category=' + encodeURI(category));
        document.documentElement.scrollTop = 0;
      },

      listBooksByClc: function(clc){
        this.hideMenu()
        this.$store.commit('setLeftBookCategory', clc)
        this.$router.push('/book/list?clc=' + encodeURI(clc));
        document.documentElement.scrollTop = 0;
      },

      listBooksByLib: function(lib){
        this.hideMenu()
        this.$store.commit('setLeftBookCategory', lib)
        this.$router.push('/book/list?lib=' + encodeURI(lib));
        document.documentElement.scrollTop = 0;
      },
      showLibMenu: function () {
        this.$store.commit('showLibMenu')
      },
      hideLibMenu: function () {
        this.$store.commit('hideLibMenu')
      },
      showCategoryMenu: function () {
        this.$store.commit('showCategoryMenu')
      },
      hideCategoryMenu: function () {
        this.$store.commit('hideCategoryMenu')
      },
      showClcMenu: function () {
        this.$store.commit('showClcMenu')
      },
      hideClcMenu: function () {
        this.$store.commit('hideClcMenu')
      },
      hideMenu: function () {
        this.$store.commit('setLeftBookMenuVisible', false)
      }
    }
  }
</script>
