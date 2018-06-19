<template>
  <div class="list_left">

    <div class="class_title">
      <span>期刊分类</span>
      <div class="title_img">
        <a href="javascript:;" @click="toggleMagazineCategoryMenuVisible" v-if="magazineCategoryMenuVisible">
          <span>-</span>
        </a>
        <a href="javascript:;" @click="toggleMagazineCategoryMenuVisible" v-else>
          <span>+</span>
        </a>
      </div>
    </div>
    <div class="list_class" v-show="magazineCategoryMenuVisible">
      <div class="list_title" v-for="category in categories">
        <a href="javascript:;"><p @click="listMagazinesByCategory(category.name)" v-text="category.name"></p></a>
      </div>
    </div>

    <!--wap left menu-->
    <div class="wap-left-menu" v-show="leftMagazineMenuVisible">

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
          <a href="javascript:;"><p @click="listMagazines">所有类别</p></a>
        </div>
      </div>

      <div class="clear"></div>


      <div class="class-title">
        <span>期刊分类</span>
        <div class="title-img">
          <a href="javascript:;" @click="toggleMagazineCategoryMenuVisible" v-if="magazineCategoryMenuVisible">
            <span>-</span>
          </a>
          <a href="javascript:;" @click="toggleMagazineCategoryMenuVisible" v-else>
            <span>+</span>
          </a>
        </div>
      </div>

      <div class="clear"></div>

      <div class="list-class" v-show="magazineCategoryMenuVisible">
        <div class="list-title" v-for="category in categories">
          <a href="javascript:;"><p @click="listMagazinesByCategory(category.name)" v-text="category.name"></p></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/magazine/magazineListLeft";
</style>

<script>
  export default {
    name: 'magazineListLeft',
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
      categories () {
        return this.$store.getters.subjects;
      },
      magazineCategoryMenuVisible() {
        return this.$store.getters.magazineCategoryMenuVisible;
      },
      leftMagazineMenuVisible() {
        return this.$store.getters.leftMagazineMenuVisible;
      },
    },
    methods: {
      listMagazines: function () {
        this.hideMenu()
        this.$store.commit('setLeftMagazineCategory', '所有类别')
        this.$router.push('/magazine/list');

      },
      listMagazinesByCategory: function(category){
        this.hideMenu()
        this.$store.commit('setLeftMagazineCategory', category)
        this.$router.push('/magazine/list?category=' + encodeURI(category));
        document.documentElement.scrollTop = 0;
      },
      toggleMagazineCategoryMenuVisible: function () {
        this.$store.commit('setMagazineCategoryMenuVisible', !this.magazineCategoryMenuVisible)
      },
      hideMenu: function () {
        this.$store.commit('setLeftMagazineMenuVisible', false)
      }
    }
  }
</script>
