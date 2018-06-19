<template>
  <div class="list_left">

    <div class="class_title">
      <span>期刊分类</span>
      <div class="title_img">
        <a href="javascript:;" @click="togglePaperCategoryMenuVisible" v-if="paperCategoryMenuVisible">
          <span>-</span>
        </a>
        <a href="javascript:;" @click="togglePaperCategoryMenuVisible" v-else>
          <span>+</span>
        </a>
      </div>
    </div>
    <div class="list_class" v-show="paperCategoryMenuVisible">
      <div class="list_title" v-for="category in categories">
        <a href="javascript:;"><p @click="listPapersByCategory(category.name)" v-text="category.name"></p></a>
      </div>
    </div>

    <!--wap left menu-->
    <div class="wap-left-menu" v-show="leftPaperMenuVisible">

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
          <a href="javascript:;"><p @click="listPapers">所有类别</p></a>
        </div>
      </div>

      <div class="clear"></div>


      <div class="class-title">
        <span>论文分类</span>
        <div class="title-img">
          <a href="javascript:;" @click="togglePaperCategoryMenuVisible" v-if="paperCategoryMenuVisible">
            <span>-</span>
          </a>
          <a href="javascript:;" @click="togglePaperCategoryMenuVisible" v-else>
            <span>+</span>
          </a>
        </div>
      </div>

      <div class="clear"></div>

      <div class="list-class" v-show="paperCategoryMenuVisible">
        <div class="list-title" v-for="category in categories">
          <a href="javascript:;"><p @click="listPapersByCategory(category.name)" v-text="category.name"></p></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/paper/paperListLeft";
</style>

<script>
  export default {
    name: 'paperListLeft',
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
      // this.$store.dispatch('listSublibs', {});
      // 获取学科分类
      this.$store.dispatch('listSubjects', {});
      // 获取中图分类
      // this.$store.dispatch('listClcs', {});
    },
    watch:{
    },
    computed: {
      categories(){
        return this.$store.getters.subjects;
      },
      paperCategoryMenuVisible() {
        return this.$store.getters.paperCategoryMenuVisible;
      },
      leftPaperMenuVisible() {
        return this.$store.getters.leftPaperMenuVisible;
      },
    },
    methods: {
      listPapers: function () {
        this.hideMenu()
        this.$store.commit('setLeftPaperCategory', '所有类别')
        this.$router.push('/paper/list');

      },
      listPapersByCategory: function(category){
        this.hideMenu()
        this.$store.commit('setLeftPaperCategory', category)
        this.$router.push('/paper/list?category=' + encodeURI(category));
        document.documentElement.scrollTop = 0;
      },
      togglePaperCategoryMenuVisible: function () {
        this.$store.commit('setPaperCategoryMenuVisible', !this.paperCategoryMenuVisible)
      },
      hideMenu: function () {
        this.$store.commit('setLeftPaperMenuVisible', false)
      }
    }
  }
</script>
